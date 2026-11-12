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
  assert.match(CAMPAIGN_001.body, /not a Portugal/i);
  assert.equal(CAMPAIGN_001.published, true);
});

test("Campaign 002 names São Roque on São Miguel, Azores", () => {
  assert.match(CAMPAIGN_002.locationLabel, /São Miguel, Azores/);
  assert.match(CAMPAIGN_002.placeDetail, /Ponta Delgada/);
  assert.equal(CAMPAIGN_002.published, true);
  assert.equal(campaign002Ready(), true);
  assert.match(CAMPAIGN_002.body, /looks first/i);
});

test("workshop chapter is Oliveira de Azeméis and stays gated for partnership claims", () => {
  assert.match(WORKSHOP_CHAPTER.title, /Oliveira de Azeméis/);
  assert.equal(WORKSHOP_CHAPTER.published, false);
  assert.equal(WORKSHOP_CHAPTER.notEditorial, true);
  assert.equal(workshopChapterReady(), false);
});

test("the two São Roques are not conflated", () => {
  assert.match(CAMPAIGN_002.locationLabel, /Azores/);
  assert.doesNotMatch(WORKSHOP_CHAPTER.title, /Azores|São Miguel/);
});

test("Campaign 002 plates are looks, not travel frames", () => {
  assert.ok(AZORES_LOOKS.length >= 3);
  for (const plate of AZORES_LOOKS) {
    assert.ok(plate.lookSrc.startsWith("/collection/"), `${plate.id} must lead with a collection look`);
    assert.ok(plate.lookName.length > 0);
    assert.ok(plate.pieces.length > 0);
    assert.ok(plate.href.startsWith("/line"));
    if (plate.settingSrc) {
      assert.ok(plate.settingSrc.startsWith("/world/azores/"), `${plate.id} setting must stay under azores refs`);
      assert.equal(plate.settingAlt, "", `${plate.id} setting must be decorative atmosphere`);
    }
  }
  assert.ok(AZORES_LOOKS.some((plate) => plate.settingSrc));
  assert.ok(AZORES_LOOKS.some((plate) => !plate.settingSrc), "some looks stand without a setting plate");
});
