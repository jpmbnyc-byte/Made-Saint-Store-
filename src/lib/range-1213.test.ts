import assert from "node:assert/strict";
import test from "node:test";
import { RANGE_1213 } from "./range-1213";

test("the 1213 runner is seven colorways with no shared photographs", () => {
  assert.equal(RANGE_1213.length, 7);
  const primaries = RANGE_1213.map((colorway) => colorway.image);
  assert.equal(new Set(primaries).size, 7);
  const sacred = RANGE_1213.find((colorway) => colorway.slug === "sacred-light");
  assert.ok(sacred);
  assert.equal(sacred.views.length, 6);
  for (const colorway of RANGE_1213) {
    assert.equal("usd" in colorway, false);
    for (const view of colorway.views) {
      assert.equal(view.src.includes("0929"), false);
      assert.equal(view.src.includes("navy-ivory"), false);
    }
  }
});
