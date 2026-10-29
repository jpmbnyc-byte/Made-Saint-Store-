import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { testPlanSelection } from "./catalog";
import { costFromUsage } from "./cost";
import { writeDerivatives } from "./derivatives";
import { createBatch, planBatch, reviewJob, workNext } from "./jobs";
import { assetBase } from "./names";
import { buildRequest } from "./provider";
import { assessImage } from "./qa";
import { atelierProduct } from "./catalog";
import { modelById } from "./models";
import { VIEWS } from "./spec";

test("the first production plan is fifteen images and is not priced in advance", () => {
  const lines = testPlanSelection().map((line) => ({ ...line, views: VIEWS.map((view) => view.id) }));
  const plan = planBatch(lines);
  assert.equal(plan.items.length, 15);
  assert.equal(plan.estimate.usd, null);
  assert.match(plan.estimate.reason, /does not publish a fixed output-token count/);
  const models = new Set(plan.items.map((item) => item.modelId));
  assert.ok(models.has("mod-none"));
  assert.ok(models.has("mod-tall-01"));
  assert.ok(models.has("mod-editorial-01"));
  const jacket = plan.items.filter((item) => item.product.id === "p01");
  assert.ok(jacket.every((item) => item.conceptual));
  assert.equal(plan.providerConfigured, false);
});

test("names follow the export pattern", () => {
  assert.equal(assetBase("RN-ESPRESSO", "espresso", "hero", 1), "MS_RNESPRESSO_ESPRESSO_HERO_V01");
  assert.equal(assetBase("P01", "mineral-blue", "detail", 2), "MS_P01_MINERALBLUE_DETAIL_V02");
});

test("actual cost uses published token rates and refuses a partial usage block", () => {
  const usd = costFromUsage({
    input_tokens_details: { image_tokens: 1_000_000, text_tokens: 1_000_000 },
    output_tokens_details: { image_tokens: 1_000_000 },
    output_tokens: 1_000_000,
  });
  assert.equal(usd, 43);
  assert.equal(costFromUsage({ output_tokens: 100 }), null);
});

test("an edit request is reference-locked and does not invent fidelity controls", async () => {
  const built = await buildRequest({
    prompt: "test",
    size: "1536x1024",
    referenceFiles: [path.join(process.cwd(), "public/stories/espresso-oxblood.webp")],
  });
  assert.equal(built.kind, "edits");
  assert.equal(built.body.model, "gpt-image-2.5-sunburst");
  assert.equal("input_fidelity" in built.body, false);
  assert.equal(built.body.n, 1);
  assert.equal(built.body.quality, "high");
  assert.match(built.body.images[0].image_url, /^data:image\/png;base64,/);
});

test("a batch is refused when the provider key is missing", async () => {
  const previous = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const dir = await mkdtemp(path.join(tmpdir(), "atelier-"));
  process.env.ATELIER_DIR = dir;
  await assert.rejects(
    () => createBatch(testPlanSelection().map((line) => ({ ...line, views: VIEWS.map((view) => view.id) })), 25),
    /no image was generated/i,
  );
  if (previous) process.env.OPENAI_API_KEY = previous;
  else delete process.env.OPENAI_API_KEY;
  await rm(dir, { recursive: true, force: true });
});

test("a fixture image can be reviewed and is not treated as approved", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "atelier-"));
  process.env.ATELIER_DIR = dir;
  process.env.OPENAI_API_KEY = "test-key-not-used";
  const png = await sharp({ create: { width: 1536, height: 1024, channels: 3, background: "#F1EEE8" } }).png().toBuffer();
  const line = testPlanSelection()[0];
  await createBatch([{ ...line, views: ["hero"] }], null);
  const result = await workNext(async () => ({ bytes: png, usage: null }));
  assert.equal(result.worked, true);
  if (!result.worked) return;
  assert.equal(result.status, "quality_review");
  await reviewJob(result.jobId, "approved");
  const product = atelierProduct("ms-runner-espresso");
  const model = modelById("mod-none");
  assert.ok(product && model);
  const qa = await assessImage({ bytes: png, requestedSize: "1536x1024", product, model, view: "hero", studioId: "ivory" });
  assert.equal(qa.flags.some((flag) => flag.includes("Dimensions")), false);
  const derivatives = await writeDerivatives(png, path.join(dir, "web"), "MS_TEST_HERO_V01");
  const zoom = derivatives.find((item) => item.role === "zoom");
  assert.ok(zoom);
  assert.ok(zoom.width <= 1536);
  delete process.env.OPENAI_API_KEY;
  await rm(dir, { recursive: true, force: true });
});
