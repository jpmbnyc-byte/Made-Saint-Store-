import assert from "node:assert/strict";
import test from "node:test";
import { LINE } from "./line";
import { LOOKS } from "./looks";
import { EDITORIAL_HEROES, MIN_EDGE, UNRESOLVED, lineAssignments, listedLine, publicFrames } from "./imagery";

test("public line cards use a large linked photograph", () => {
  const listed = LINE.filter(listedLine);
  assert.ok(listed.length > 0);
  assert.ok(listed.length < LINE.length);
  for (const item of listed) {
    const record = lineAssignments().find((row) => row.id === item.ref);
    assert.ok(record?.primary, item.ref);
    assert.equal(record?.confidence, "high");
    assert.ok((record?.width ?? 0) >= MIN_EDGE && (record?.height ?? 0) >= MIN_EDGE, item.ref);
  }
  assert.equal(publicFrames().some((frame) => frame.n === 45 || frame.n === 54), false);
  assert.equal(lineAssignments().find((row) => row.id === "N005")?.primary, null);
});

test("editorial heroes are not enlarged thumbnails, and unresolved shoes stay marked", () => {
  for (const hero of EDITORIAL_HEROES) {
    if (hero.src.startsWith("/stories/")) continue;
    assert.ok(Math.min(hero.width, hero.height) >= MIN_EDGE, hero.src);
  }
  const listed = LOOKS.filter((look) => look.listed !== false);
  for (const look of listed) {
    assert.ok(EDITORIAL_HEROES.some((hero) => hero.src === look.image) || look.image.startsWith("/wardrobe/"), look.id);
  }
  const off = LOOKS.find((look) => look.id === "off-duty");
  assert.equal(off?.image, "/line/f28.webp");
  assert.equal(off?.pieces.find((piece) => piece.id === "rn06")?.shown, false);
  assert.equal(LOOKS.find((look) => look.id === "transit")?.listed, false);
  assert.ok(UNRESOLVED.some((row) => row.id === "rn06-in-off-duty"));
});
