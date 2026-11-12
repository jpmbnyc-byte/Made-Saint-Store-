import assert from "node:assert/strict";
import test from "node:test";
import { CAMPAIGN_001, CAMPAIGN_002, WORKSHOP_CHAPTER, campaign002Ready, workshopChapterReady } from "@/lib/geography";

test("Campaign 001 archive stays Haiti and remains published", () => {
  assert.match(CAMPAIGN_001.locationLabel, /Haiti/i);
  assert.match(CAMPAIGN_001.body, /not a Portugal/i);
  assert.equal(CAMPAIGN_001.published, true);
});

test("Campaign 002 Azores chapter stays gated until imagery is approved", () => {
  assert.match(CAMPAIGN_002.locationLabel, /São Miguel, Azores/);
  assert.equal(CAMPAIGN_002.published, false);
  assert.equal(campaign002Ready(), false);
});

test("workshop chapter is Oliveira de Azeméis and stays gated", () => {
  assert.match(WORKSHOP_CHAPTER.title, /Oliveira de Azeméis/);
  assert.equal(WORKSHOP_CHAPTER.published, false);
  assert.equal(WORKSHOP_CHAPTER.notEditorial, true);
  assert.equal(workshopChapterReady(), false);
});

test("the two São Roques are not conflated", () => {
  assert.notEqual(CAMPAIGN_002.locationLabel, WORKSHOP_CHAPTER.title);
  assert.match(CAMPAIGN_002.locationLabel, /Azores/);
  assert.doesNotMatch(WORKSHOP_CHAPTER.title, /Azores|São Miguel/);
});
