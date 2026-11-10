import assert from "node:assert/strict";
import test from "node:test";
import { ASSET_MANIFEST } from "@/lib/asset-manifest";
import { offerLine } from "@/lib/business";
import { IMPACT } from "@/lib/impact";

test("the contribution stays unpublished until a rate and a permission exist", () => {
  assert.equal(IMPACT.publishEnabled, false);
  assert.equal(IMPACT.nameLogoPermission, false);
  assert.equal(IMPACT.rateOrAmount, null);
  assert.equal(IMPACT.relationshipStatus, "proposed");
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

test("only the 0929 promises a make time", () => {
  assert.match(offerLine("0929"), /Ready in 4 to 6 weeks/);
  assert.match(offerLine("1101"), /ship date is not promised/);
  assert.match(offerLine("1213"), /ship date is not promised/);
  assert.doesNotMatch(offerLine("1101"), /4 to 6 weeks/);
  assert.doesNotMatch(offerLine("1213"), /4 to 6 weeks/);
});
