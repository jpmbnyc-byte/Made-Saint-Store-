import assert from "node:assert/strict";
import test from "node:test";
import { CAMPAIGN_BLOCKS, COLLECTION_LOOKS, FEATURED, catalogDiagnostics, customerStatus, lineAssetManifest } from "./line-shop";
import { lineByRef } from "./line";

test("published looks only list pieces already named on the frames", () => {
  const cobalt = COLLECTION_LOOKS.find((look) => look.slug === "cobalt");
  assert.deepEqual(cobalt?.pieces.map((item) => item.ref), ["R027"]);
  const stripe = COLLECTION_LOOKS.find((look) => look.slug === "stripe");
  assert.deepEqual(stripe?.pieces.map((item) => item.ref), ["R031", "R032"]);
  for (const look of COLLECTION_LOOKS) {
    for (const item of look.pieces) assert.ok(lineByRef(item.ref), item.ref);
  }
  assert.ok(COLLECTION_LOOKS.some((look) => look.slug === "velvet" && look.pieces.length === 0));
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "solene")?.pieces.map((item) => item.ref), ["R010"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "sage")?.pieces.map((item) => item.ref), ["N014", "R067"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "olive")?.pieces.map((item) => item.ref), ["R046"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "forerunner")?.pieces.map((item) => item.ref), ["R035"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "duffel")?.pieces.map((item) => item.ref), ["R067"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "amara")?.pieces.map((item) => item.ref), ["R010"]);
  assert.equal(COLLECTION_LOOKS[0]?.slug, "solene");
  assert.equal(COLLECTION_LOOKS[1]?.slug, "sage");
});

test("styling-only frames are not assigned a product", () => {
  for (const asset of lineAssetManifest()) {
    if (asset.mapping === "styling-only") assert.equal(asset.productIds.length, 0);
  }
});

test("a proposed garment price stays an enquiry", () => {
  const product = lineByRef("R027");
  assert.ok(product);
  const status = customerStatus(product);
  assert.equal(status.buyable, false);
  assert.match(status.label, /enquire/i);
  assert.match(status.detail, /not a checkout price/i);
});

test("catalog diagnostics count hidden records without publishing them as shopper copy", () => {
  const report = catalogDiagnostics();
  assert.ok(report.shown > 0);
  assert.ok(report.hidden >= 0);
  assert.equal(report.hidden, report.hiddenRefs.length);
});

test("editorial stills stay shoppable without inventing a tee sku", () => {
  const stills = [...FEATURED, ...CAMPAIGN_BLOCKS].filter((block) => block.kind === "still");
  assert.ok(stills.length >= 4);
  for (const still of stills) {
    assert.ok(still.href, still.src);
    assert.ok(still.name, still.src);
  }
  const runner = stills.find((still) => still.src.includes("navy-ivory-worn"));
  assert.equal(runner?.href, "/shop/ms-runner-chalk-navy");
  assert.equal(runner?.price, "$490");
  for (const still of stills.filter((block) => block.src.includes("tee-"))) {
    assert.equal(still.href, "/wardrobe#introduction");
    assert.equal(still.cta, "Enquire");
  }
});
