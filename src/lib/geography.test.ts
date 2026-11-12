import assert from "node:assert/strict";
import test from "node:test";
import {
  AZORES_SEQUENCE,
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
  assert.match(CAMPAIGN_002.sequenceLine, /Landscape → person → complete look → product detail → maker → fitting/i);
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
  assert.notEqual(CAMPAIGN_002.locationLabel, WORKSHOP_CHAPTER.title);
});

test("Azores sequence keeps landscape, person, look, detail, and maker", () => {
  const kinds = new Set(AZORES_SEQUENCE.map((frame) => frame.kind));
  for (const kind of ["landscape", "person", "look", "detail", "maker", "arrival", "context"] as const) {
    assert.ok(kinds.has(kind), `missing ${kind}`);
  }
  assert.ok(AZORES_SEQUENCE.some((frame) => /Praia de São Roque/.test(frame.locationLabel)));
  assert.ok(AZORES_SEQUENCE.some((frame) => /Igreja de São Roque/.test(frame.locationLabel)));
  const procession = AZORES_SEQUENCE.find((frame) => frame.id === "context-procession");
  assert.ok(procession);
  assert.doesNotMatch(procession!.locationLabel, /Azores|São Miguel/);
  const workshop = AZORES_SEQUENCE.find((frame) => frame.kind === "maker");
  assert.ok(workshop);
  assert.match(workshop!.locationLabel, /Oliveira de Azeméis/);
  assert.match(workshop!.caption, /Separate from the Azores/i);
});
