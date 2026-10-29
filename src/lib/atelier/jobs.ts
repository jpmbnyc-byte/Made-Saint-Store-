import { randomUUID } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { atelierProduct, type AtelierProduct } from "./catalog";
import { costFromUsage, estimateBatch } from "./cost";
import { writeDerivatives } from "./derivatives";
import { modelById } from "./models";
import { assetBase } from "./names";
import { buildPrompt } from "./prompt";
import { generateImage, providerConfigured, publicToFile, type GenerationRequest } from "./provider";
import { assessImage } from "./qa";
import { IMAGE_MODEL, PROMPT_VERSION, VIEWS, viewSize, type ViewId } from "./spec";
import { atelierRoot, readDb, updateDb, type AtelierJob, type JobStatus } from "./store";

export type PlanLine = {
  productId: string;
  colorwayId: string;
  modelId: string;
  views: ViewId[];
};

const ALL_VIEWS = VIEWS.map((view) => view.id);

export function planBatch(lines: PlanLine[]) {
  const items: {
    product: AtelierProduct;
    colorwayId: string;
    modelId: string;
    view: ViewId;
    conceptual: boolean;
    blockers: string[];
  }[] = [];
  const rejected: string[] = [];
  for (const line of lines) {
    const product = atelierProduct(line.productId);
    if (!product) {
      rejected.push(`Unknown product ${line.productId}.`);
      continue;
    }
    const color = product.colorways.find((item) => item.id === line.colorwayId);
    if (!color) {
      rejected.push(`${product.name} has no colorway ${line.colorwayId}.`);
      continue;
    }
    const model = modelById(line.modelId);
    if (!model) {
      rejected.push(`Unknown model ${line.modelId}.`);
      continue;
    }
    const views = line.views.length ? line.views : ALL_VIEWS;
    for (const view of views) {
      if (!ALL_VIEWS.includes(view)) {
        rejected.push(`Unknown view ${view}.`);
        continue;
      }
      items.push({
        product,
        colorwayId: color.id,
        modelId: model.id,
        view,
        conceptual: product.materialStatus !== "verified" || color.status !== "approved",
        blockers: product.blockers,
      });
    }
  }
  return { items, rejected, estimate: estimateBatch(items.length), providerConfigured: providerConfigured() };
}

export async function createBatch(lines: PlanLine[], ceilingUsd: number | null) {
  if (!providerConfigured()) {
    throw new Error("OPENAI_API_KEY is not set. The batch was not queued, and no image was generated.");
  }
  const plan = planBatch(lines);
  if (plan.rejected.length) throw new Error(plan.rejected.join(" "));
  if (plan.items.length === 0) throw new Error("The batch has no images.");
  const db = await readDb();
  const locked = new Set(
    db.jobs.filter((job) => job.status === "approved" || job.status === "published").map((job) => job.idempotencyKey),
  );
  const batchId = randomUUID();
  const now = new Date().toISOString();
  const jobs: AtelierJob[] = [];
  const skipped: string[] = [];
  for (const item of plan.items) {
    const key = `${item.product.id}:${item.colorwayId}:${item.view}:${PROMPT_VERSION}`;
    if (locked.has(key)) {
      skipped.push(key);
      continue;
    }
    const prompt = buildPrompt(item.product, item.colorwayId, item.view, item.modelId);
    jobs.push({
      id: randomUUID(),
      batchId,
      idempotencyKey: key,
      productId: item.product.id,
      sku: item.product.sku,
      colorwayId: item.colorwayId,
      view: item.view,
      modelId: item.modelId,
      studioId: "ivory",
      promptVersion: prompt.version,
      prompt: prompt.text,
      referenceIds: item.product.references.map((ref) => ref.id),
      provider: "openai-images",
      modelIdentifier: IMAGE_MODEL,
      parameters: { size: viewSize(item.product.category, item.view), quality: "high", background: "opaque", output_format: "png", n: 1 },
      status: "queued",
      retryCount: 0,
      estimatedCostUsd: null,
      actualCostUsd: null,
      usage: null,
      conceptual: item.conceptual,
      output: null,
      error: null,
      createdAt: now,
      completedAt: null,
    });
  }
  if (jobs.length === 0) throw new Error("Every image in this batch is already approved. Nothing was regenerated.");
  await updateDb((state) => {
    state.batches.push({
      id: batchId,
      status: "queued",
      ceilingUsd,
      jobIds: jobs.map((job) => job.id),
      createdAt: now,
      note: plan.estimate.reason,
    });
    state.jobs.push(...jobs);
  });
  return { batchId, queued: jobs.length, skipped, estimate: plan.estimate };
}

export async function setBatchStatus(batchId: string, status: "paused" | "cancelled" | "queued") {
  await updateDb((state) => {
    const batch = state.batches.find((item) => item.id === batchId);
    if (!batch) throw new Error("Unknown batch.");
    batch.status = status;
  });
}

function spent(jobs: AtelierJob[], batchId: string) {
  return jobs
    .filter((job) => job.batchId === batchId && job.actualCostUsd != null)
    .reduce((sum, job) => sum + (job.actualCostUsd ?? 0), 0);
}

export async function workNext(generate: (input: GenerationRequest) => Promise<{ bytes: Buffer; usage: import("./spec").Usage | null }> = generateImage) {
  const snapshot = await readDb();
  const batch = snapshot.batches.find((item) => item.status === "queued" || item.status === "running");
  if (!batch) return { worked: false as const, reason: "No open batch." };
  if (batch.ceilingUsd != null && spent(snapshot.jobs, batch.id) >= batch.ceilingUsd) {
    await setBatchStatus(batch.id, "paused");
    return { worked: false as const, reason: "Spend ceiling reached. Batch paused." };
  }
  const job = snapshot.jobs.find((item) => item.batchId === batch.id && item.status === "queued");
  if (!job) {
    await updateDb((state) => {
      const current = state.batches.find((item) => item.id === batch.id);
      if (current && current.status !== "cancelled" && current.status !== "paused") current.status = "complete";
    });
    return { worked: false as const, reason: "Batch complete." };
  }
  await updateDb((state) => {
    const current = state.batches.find((item) => item.id === batch.id);
    if (current) current.status = "running";
    const row = state.jobs.find((item) => item.id === job.id);
    if (row) row.status = "generating";
  });
  const product = atelierProduct(job.productId);
  const model = modelById(job.modelId);
  if (!product || !model) {
    await fail(job.id, "Product or model disappeared from the catalog.");
    return { worked: true as const, jobId: job.id, status: "failed" as const };
  }
  try {
    const result = await generate({
      prompt: job.prompt,
      size: job.parameters.size as GenerationRequest["size"],
      referenceFiles: product.references.map((ref) => publicToFile(ref.src)),
    });
    const base = assetBase(job.sku, job.colorwayId, job.view as ViewId, 1);
    const dir = path.join(atelierRoot(), "masters", job.id);
    await mkdir(dir, { recursive: true });
    const masterFile = `${base}.png`;
    await writeFile(path.join(dir, masterFile), result.bytes);
    const derivatives = await writeDerivatives(result.bytes, path.join(dir, "web"), base);
    const qa = await assessImage({
      bytes: result.bytes,
      requestedSize: job.parameters.size,
      product,
      model,
      view: job.view as ViewId,
      studioId: job.studioId,
    });
    const actual = costFromUsage(result.usage);
    await updateDb((state) => {
      const row = state.jobs.find((item) => item.id === job.id);
      if (!row) return;
      row.status = "quality_review";
      row.actualCostUsd = actual;
      row.usage = result.usage;
      row.output = { masterFile, derivatives, qa: qa.flags, width: qa.width ?? 0, height: qa.height ?? 0 };
      row.completedAt = new Date().toISOString();
      row.error = null;
    });
    return { worked: true as const, jobId: job.id, status: "quality_review" as const };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";
    const retry = /returned 429|returned 5/.test(message) && job.retryCount < 2;
    await updateDb((state) => {
      const row = state.jobs.find((item) => item.id === job.id);
      if (!row) return;
      row.error = message;
      row.retryCount += 1;
      row.status = retry ? "queued" : "failed";
      row.completedAt = retry ? null : new Date().toISOString();
    });
    return { worked: true as const, jobId: job.id, status: (retry ? "queued" : "failed") as JobStatus };
  }
}

async function fail(id: string, message: string) {
  await updateDb((state) => {
    const row = state.jobs.find((item) => item.id === id);
    if (!row) return;
    row.status = "failed";
    row.error = message;
    row.completedAt = new Date().toISOString();
  });
}

export async function reviewJob(id: string, decision: "approved" | "rejected") {
  await updateDb((state) => {
    const row = state.jobs.find((item) => item.id === id);
    if (!row) throw new Error("Unknown job.");
    if (row.status !== "quality_review" && row.status !== "rejected" && row.status !== "approved") {
      throw new Error("Only a generated image can be approved or rejected.");
    }
    row.status = decision;
  });
}

export async function requeue(id: string) {
  const db = await readDb();
  const existing = db.jobs.find((item) => item.id === id);
  if (!existing) throw new Error("Unknown job.");
  if (existing.status === "approved" || existing.status === "published") {
    throw new Error("An approved image is not regenerated unless you explicitly requeue it after rejecting it.");
  }
  await updateDb((state) => {
    const row = state.jobs.find((item) => item.id === id);
    if (!row) return;
    row.status = "queued";
    row.error = null;
    row.output = null;
    row.completedAt = null;
  });
}

export async function publishJob(id: string) {
  const db = await readDb();
  const job = db.jobs.find((item) => item.id === id);
  if (!job?.output) throw new Error("Nothing to publish.");
  if (job.status !== "approved") throw new Error("Publish requires an approved image.");
  const product = atelierProduct(job.productId);
  if (!product) throw new Error("Unknown product.");
  const web = job.output.derivatives.find((item) => item.role === "detail") ?? job.output.derivatives[0];
  const destDir = path.join(process.cwd(), "public", "atelier");
  await mkdir(destDir, { recursive: true });
  const src = path.join(atelierRoot(), "masters", job.id, "web", web.file);
  await copyFile(src, path.join(destDir, web.file));
  const record = {
    jobId: job.id,
    productId: job.productId,
    colorwayId: job.colorwayId,
    view: job.view,
    src: `/atelier/${web.file}`,
    priceUsd: product.retailUsd,
    priceStatus: product.priceStatus,
  };
  await updateDb((state) => {
    const row = state.jobs.find((item) => item.id === id);
    if (row) row.status = "published";
    state.published = state.published.filter((item) => !(item.productId === record.productId && item.view === record.view));
    state.published.push(record);
  });
  return record;
}

export async function summary() {
  const db = await readDb();
  const count = (status: JobStatus) => db.jobs.filter((job) => job.status === status).length;
  const actual = db.jobs.reduce((sum, job) => sum + (job.actualCostUsd ?? 0), 0);
  return {
    jobs: db.jobs.length,
    queued: count("queued"),
    generating: count("generating"),
    review: count("quality_review"),
    approved: count("approved"),
    rejected: count("rejected"),
    failed: count("failed"),
    published: count("published"),
    actualCostUsd: Math.round(actual * 10_000) / 10_000,
    batches: db.batches,
  };
}
