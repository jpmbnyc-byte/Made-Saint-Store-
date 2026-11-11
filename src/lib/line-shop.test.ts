import assert from "node:assert/strict";
import test from "node:test";
import { CAMPAIGN_BLOCKS, COLLECTION_LOOKS, FEATURED, catalogDiagnostics, customerMaterial, customerName, customerStatus, lineAssetManifest, publishedLooks } from "./line-shop";
import { lineByRef } from "./line";
import { listedLine } from "./imagery";

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
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "parachute")?.pieces.map((item) => item.ref), ["R010"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "olive-wool")?.pieces.map((item) => item.ref), ["R046"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "rust")?.pieces.map((item) => item.ref), []);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "camel")?.pieces.map((item) => item.ref), ["N005", "N006"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "midnight")?.pieces.map((item) => item.ref), ["N005", "N006"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "onyx")?.pieces.map((item) => item.ref), ["N005", "N006"]);
  assert.deepEqual(COLLECTION_LOOKS.find((look) => look.slug === "mauve-nylon")?.pieces.map((item) => item.ref), ["N003"]);
  assert.equal(COLLECTION_LOOKS.find((look) => look.slug === "jersey")?.listed, false);
  assert.ok(COLLECTION_LOOKS.some((look) => look.slug === "malik"));
  assert.equal(publishedLooks().some((look) => look.slug === "jersey"), false);
  const courtyard = COLLECTION_LOOKS.filter((look) => look.series === "courtyard");
  assert.equal(courtyard.length, 11);
  for (const look of courtyard) {
    assert.ok(look.image.startsWith("/collection/"), look.slug);
    for (const offer of look.offers ?? []) {
      if (offer.kind === "runner") {
        assert.match(offer.href, /^\/shop\/ms-runner-/);
        assert.equal(offer.price, "$550");
      } else {
        assert.equal(offer.href, "/wardrobe#introduction");
        assert.equal(offer.price, "Enquire");
      }
    }
  }
});

test("styling-only frames are not assigned a product", () => {
  for (const asset of lineAssetManifest()) {
    if (asset.mapping === "styling-only") assert.equal(asset.productIds.length, 0);
  }
});

test("a garment price stays an enquiry", () => {
  const product = lineByRef("R027");
  assert.ok(product);
  const status = customerStatus(product);
  assert.equal(status.buyable, false);
  assert.match(status.label, /enquire/i);
  assert.match(status.detail, /not a checkout price/i);
  assert.equal(status.label.includes("Development"), false);
  const n001 = lineByRef("N001");
  assert.ok(n001);
  assert.equal(/goatskin/i.test(customerMaterial(n001)), false);
  assert.equal(/goatskin/i.test(customerName(n001)), false);
  const mule = lineByRef("R046");
  assert.ok(mule);
  assert.equal(listedLine(mule), true);
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
  const mule = stills.find((still) => still.src.includes("trail-mule"));
  assert.equal(mule?.href, "/line/r046");
  assert.equal(mule?.price, "$450");
  const grids = [...FEATURED, ...CAMPAIGN_BLOCKS].filter((block) => block.kind === "look");
  assert.equal(grids.some((block) => block.slug === "jersey"), false);
  assert.ok(grids.some((block) => block.slug === "malik"));
});
