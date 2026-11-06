import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CommissionDraft, CommissionReview } from "@/lib/commission";

export type CommissionRecord = CommissionDraft &
  CommissionReview & {
    id: string;
    lookName: string;
    pieceNames: string[];
    lineName: string;
    createdAt: string;
  };

const FILE = process.env.COMMISSION_DB ?? path.join(process.cwd(), "data", "commissions.json");

let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<CommissionRecord[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as CommissionRecord[];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function save(rows: CommissionRecord[]) {
  await mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(rows, null, 2));
  await rename(tmp, FILE);
}

function mutate<T>(fn: (rows: CommissionRecord[]) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const rows = await load();
    const out = await fn(rows);
    await save(rows);
    return out;
  });
  queue = run.catch(() => undefined);
  return run;
}

export async function listCommissions() {
  await queue;
  return load();
}

export function createCommission(input: Omit<CommissionRecord, "id" | "createdAt">) {
  return mutate((rows) => {
    const record: CommissionRecord = {
      ...input,
      id: `MC-${randomBytes(4).toString("hex").toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    rows.push(record);
    return record;
  });
}
