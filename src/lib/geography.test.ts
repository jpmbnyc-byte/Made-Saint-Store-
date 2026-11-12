import assert from "node:assert/strict";
import test from "node:test";
import {
  AZORES_LOOKS,
  CAMPAIGN_001,
  CAMPAIGN_002,
  WORKSHOP_CHAPTER,
  campaign002Ready,
  workshopChapterReady,
} from "@/lib/geography";

test("Campaign 001 archive stays Haiti and remains published", () => {
  assert.match(CAMPAIGN_001.locationLabel, /Haiti/i);
  assert.equal(CAMPAIGN_001.published, true);
});

test("Campaign 002 names São Roque on São Miguel, Azores", () => {
  assert.match(CAMPAIGN_002.locationLabel, /São Miguel, Azores/);
  assert.equal(CAMPAIGN_002.published, true);
  assert.equal(campaign002Ready(), true);
});

test("workshop chapter is Oliveira de Azeméis and stays gated", () => {
  assert.match(WORKSHOP_CHAPTER.title, /Oliveira de Azeméis/);
  assert.equal(WORKSHOP_CHAPTER.published, false);
  assert.equal(workshopChapterReady(), false);
});

test("Campaign 002 is a look register without location composite plates", () => {
  assert.ok(AZORES_LOOKS.length >= 6);
  for (const look of AZORES_LOOKS) {
    assert.ok(look.lookSrc.startsWith("/collection/"));
    assert.ok(look.href.startsWith("/line"));
    assert.ok(look.lookName.length > 0);
    assert.ok(look.pieces.length > 0);
    assert.equal("settingSrc" in look, false);
  }
});
