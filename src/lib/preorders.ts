import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Reservation store. A JSON file is enough for a founding run of a few hundred pairs on one server;
 * move to a database before running on serverless hosting, where the filesystem does not persist.
 */
export type Reservation = {
  id: string;
  kind: "preorder" | "waitlist";
  productId: string;
  size?: string;
  email: string;
  name?: string;
  amountUsd: number;
  /** reserved: recorded without payment (no Stripe key). pending: sent to Stripe. paid: Stripe confirmed. */
  status: "reserved" | "pending" | "paid" | "refunded" | "cancelled";
  number?: number;
  stripeSession?: string;
  createdAt: string;
  paidAt?: string;
};

const FILE = process.env.PREORDER_DB ?? path.join(process.cwd(), "data", "preorders.json");

let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<Reservation[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as Reservation[];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function save(rows: Reservation[]) {
  await mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(rows, null, 2));
  await rename(tmp, FILE);
}

/** Serialises read-modify-write so concurrent checkouts cannot hand out the same founding number. */
function mutate<T>(fn: (rows: Reservation[]) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const rows = await load();
    const out = await fn(rows);
    await save(rows);
    return out;
  });
  queue = run.catch(() => undefined);
  return run;
}

export const counts = (r: Reservation) => r.kind === "preorder" && (r.status === "paid" || r.status === "reserved");

function nextNumber(rows: Reservation[], productId: string) {
  return rows.filter((r) => r.productId === productId && r.number).reduce((m, r) => Math.max(m, r.number ?? 0), 0) + 1;
}

export async function listReservations() {
  await queue;
  return load();
}

export function createReservation(input: Omit<Reservation, "id" | "createdAt" | "number">) {
  return mutate((rows) => {
    const r: Reservation = {
      ...input,
      id: `MS-${randomBytes(4).toString("hex").toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    if (counts(r)) r.number = nextNumber(rows, r.productId);
    rows.push(r);
    return r;
  });
}

export function updateReservation(id: string, patch: Partial<Reservation>) {
  return mutate((rows) => {
    const r = rows.find((x) => x.id === id);
    if (!r) return undefined;
    Object.assign(r, patch);
    return r;
  });
}

/** Idempotent: a webhook and the confirmation page may both report the same payment. */
export function markPaid(id: string, session?: string) {
  return mutate((rows) => {
    const r = rows.find((x) => x.id === id);
    if (!r) return undefined;
    if (r.status !== "paid") {
      r.status = "paid";
      r.paidAt = new Date().toISOString();
      if (session) r.stripeSession = session;
      r.number ??= nextNumber(rows, r.productId);
    }
    return r;
  });
}

export async function findReservation(id: string) {
  return (await listReservations()).find((r) => r.id === id);
}

export type Tally = { pairs: Record<string, number>; waitlist: Record<string, number>; bySize: Record<string, Record<string, number>> };

export function tally(rows: Reservation[]): Tally {
  const t: Tally = { pairs: {}, waitlist: {}, bySize: {} };
  for (const r of rows) {
    if (counts(r)) {
      t.pairs[r.productId] = (t.pairs[r.productId] ?? 0) + 1;
      const s = (t.bySize[r.productId] ??= {});
      if (r.size) s[r.size] = (s[r.size] ?? 0) + 1;
    } else if (r.kind === "waitlist" && r.status !== "cancelled") {
      t.waitlist[r.productId] = (t.waitlist[r.productId] ?? 0) + 1;
    }
  }
  return t;
}
