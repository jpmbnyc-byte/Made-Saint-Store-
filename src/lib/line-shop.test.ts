import assert from "node:assert/strict";
import test from "node:test";
import { COLLECTION_LOOKS, catalogDiagnostics, customerStatus, lineAssetManifest } from "./line-shop";
import { lineByRef } from "./line";

test("published looks only list pieces already named on the frames", () => {
  const cobalt = COLLECTION_LOOKS.find((look) => look.slug === "cobalt");
  assert.deepEqual(cobalt?.pieces.map((item) => item.ref), ["R027"]);
  const stripe = COLLECTION_LOOKS.find((look) => look.slug === "stripe");
  assert.deepEqual(stripe?.pieces.map((item) => item.ref), ["R031", "R032"]);
  for (const look of COLLECTION_LOOKS) {
    for (const item of look.pieces) assert.ok(lineByRef(item.ref), item.ref);
  }
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
