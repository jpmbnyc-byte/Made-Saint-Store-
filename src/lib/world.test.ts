import assert from "node:assert/strict";
import test from "node:test";
import { ASSET_MANIFEST } from "@/lib/asset-manifest";
import { offerLine } from "@/lib/business";
import { IMPACT } from "@/lib/impact";

test("the pledge names a rate and stays a promise until a year is reported", () => {
  assert.equal(IMPACT.publishEnabled, true);
  assert.equal(IMPACT.nameLogoPermission, true);
  assert.equal(IMPACT.rateOrAmount, "5% of annual net profits");
  assert.equal(IMPACT.relationshipStatus, "pledged");
  assert.equal(IMPACT.verifiedReportUrl, null);
});

test("research references stay out of the site and campaign frames are marked as concept", () => {
  const refs = ASSET_MANIFEST.filter((asset) => asset.representation === "reference");
  assert.equal(refs.length, 9);
  for (const asset of refs) {
    assert.equal(asset.deployable, false);
    assert.equal(asset.path.startsWith("reference_only/"), true);
    assert.equal(asset.path.startsWith("/"), false);
  }
  const campaign = ASSET_MANIFEST.filter((asset) => asset.path.startsWith("/world/"));
  assert.equal(campaign.length, 5);
  for (const asset of campaign) {
    assert.equal(asset.deployable, true);
    assert.equal(asset.representation, "concept");
    assert.match(asset.location, /not a documented site/);
  }
});

test("every runner is live on the same make time", () => {
  for (const series of ["1101", "1213", "0929"] as const) {
    assert.match(offerLine(series), /Made to order\. Ready in 4 to 6 weeks/);
  }
});
