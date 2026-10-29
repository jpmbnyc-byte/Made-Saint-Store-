import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type JobStatus = "queued" | "generating" | "generated" | "quality_review" | "approved" | "rejected" | "failed" | "published";

export type Derivative = { role: string; file: string; width: number; height: number; upscaled: false };

export type AtelierJob = {
  id: string;
  batchId: string;
  idempotencyKey: string;
  productId: string;
  sku: string;
  colorwayId: string;
  view: string;
  modelId: string;
  studioId: string;
  promptVersion: string;
  prompt: string;
  referenceIds: string[];
  provider: "openai-images";
  modelIdentifier: string;
  parameters: { size: string; quality: "high"; background: "opaque"; output_format: "png"; n: 1 };
  status: JobStatus;
  retryCount: number;
  estimatedCostUsd: null;
  actualCostUsd: number | null;
  usage: unknown;
  conceptual: boolean;
  output: null | { masterFile: string; derivatives: Derivative[]; qa: string[]; width: number; height: number };
  error: string | null;
  createdAt: string;
  completedAt: string | null;
};

export type AtelierBatch = {
  id: string;
  status: "queued" | "running" | "paused" | "cancelled" | "complete";
  ceilingUsd: number | null;
  jobIds: string[];
  createdAt: string;
  note: string;
};

export type PublishedAsset = {
  jobId: string;
  productId: string;
  colorwayId: string;
  view: string;
  src: string;
  priceUsd: number | null;
  priceStatus: "approved" | "pending";
};

export type AtelierDb = {
  batches: AtelierBatch[];
  jobs: AtelierJob[];
  published: PublishedAsset[];
};

const empty = (): AtelierDb => ({ batches: [], jobs: [], published: [] });

export function atelierRoot() {
  return process.env.ATELIER_DIR ?? path.join(process.cwd(), "data", "atelier");
}

const file = () => path.join(atelierRoot(), "db.json");

let chain: Promise<unknown> = Promise.resolve();

export async function readDb(): Promise<AtelierDb> {
  try {
    const raw = await readFile(file(), "utf8");
    return JSON.parse(raw) as AtelierDb;
  } catch {
    return empty();
  }
}

export function updateDb<T>(fn: (db: AtelierDb) => Promise<T> | T): Promise<T> {
  const run = chain.then(async () => {
    const db = await readDb();
    const result = await fn(db);
    await mkdir(atelierRoot(), { recursive: true });
    const tmp = `${file()}.tmp`;
    await writeFile(tmp, JSON.stringify(db, null, 2));
    await rename(tmp, file());
    return result;
  });
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}
