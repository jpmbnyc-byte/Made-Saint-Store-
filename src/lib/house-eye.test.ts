import assert from "node:assert/strict";
import test from "node:test";
import { HOUSE_DETAIL_CROPS, HOUSE_EYE } from "@/lib/house-eye";

test("the house eye states underlit photography and detail as proof", () => {
  assert.match(HOUSE_EYE.title, /low light/i);
  assert.match(HOUSE_EYE.lede, /underlit/i);
  assert.equal(HOUSE_EYE.principles.length, 3);
  assert.ok(HOUSE_EYE.principles.some((item) => /detail/i.test(item.title)));
  assert.match(HOUSE_EYE.closing, /MADE SAiNT/);
});

test("detail crops use existing house assets", () => {
  assert.ok(HOUSE_DETAIL_CROPS.length >= 4);
  for (const crop of HOUSE_DETAIL_CROPS) {
    assert.ok(crop.src.startsWith("/"));
    assert.ok(crop.label.length > 0);
    assert.ok(crop.crop.includes("object") || crop.crop.includes("scale"));
  }
});
