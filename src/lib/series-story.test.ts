import assert from "node:assert/strict";
import { test } from "node:test";
import { SERIES_ORDER } from "./business";
import { SERIES_STORIES, breakdownForProduct, seriesStory } from "./series-story";

test("series stories cover every launched series with feast and reflection", () => {
  for (const series of SERIES_ORDER) {
    const story = seriesStory(series);
    assert.equal(story.series, series);
    assert.ok(story.title.length > 0);
    assert.ok(story.feast.length > 0);
    assert.ok(story.reflection.length >= 3);
    assert.ok(story.editorialHero.startsWith("/runners/atelier/"));
    assert.ok(story.detail.startsWith("/runners/atelier/"));
    assert.equal(story.parts.length, 3);
    assert.equal(story.facts.length, 3);
    assert.equal(story.nameReading.length, 4);
    assert.equal(story.nameReading.map((item) => item.digit).join(""), series);
    for (const item of story.nameReading) assert.ok(item.meaning.length > 0);
  }
  assert.equal(Object.keys(SERIES_STORIES).length, 3);
});

test("breakdown uses lead parts only for the lead colourway", () => {
  const story = seriesStory("1101");
  const lead = breakdownForProduct(story, story.leadProductId, ["Other"], "Brown Mesh");
  assert.deepEqual(lead.parts, story.parts);
  const sibling = breakdownForProduct(story, "ms-runner-1101-teal", ["Deep teal leather", "Ivory wave panels", "Braided laces"], "Teal");
  assert.deepEqual(sibling.parts, ["Deep teal leather", "Ivory wave panels", "Braided laces"]);
  assert.match(sibling.facts[0]!, /Teal colourway/);
});
