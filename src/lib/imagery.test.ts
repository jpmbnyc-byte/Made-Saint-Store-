import assert from "node:assert/strict";
import test from "node:test";
import { LINE } from "./line";
import { LOOKS } from "./looks";
import { EDITORIAL_HEROES, MIN_EDGE, UNRESOLVED, lineAssignments, listedLine, publicFrames } from "./imagery";
import { productById } from "./business";
import { viewsFor } from "./catalog";
import { studioImage } from "./studio-image";
import { TONAL_RUNNERS } from "./tonal-runners";

test("Brown Mesh uses one studio master across listing, gallery and tonal pairing", () => {
  const target = studioImage("/runners/1213/1101-brown-pair.webp");
  const product = productById("ms-runner-1101-butter")!;
  assert.equal(target, "/art/studio-v1/brown-mesh.webp");
  assert.equal(studioImage("/runners/1213/1101-butter-pair.webp"), target);
  assert.equal(product.image, target);
  assert.ok(viewsFor(product).every((view) => view.src === target));
  assert.equal(TONAL_RUNNERS.camel.image, target);
  assert.equal(studioImage("/collection/solene.webp"), "/collection/solene.webp");
});

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
  assert.ok(lineAssignments().find((row) => row.id === "N005")?.primary);
  assert.ok(lineAssignments().find((row) => row.id === "N003")?.primary);
  assert.ok(listed.some((item) => item.ref === "N006"));
});

test("editorial heroes are not enlarged thumbnails, and unresolved shoes stay marked", () => {
  for (const hero of EDITORIAL_HEROES) {
    if (hero.src.startsWith("/stories/")) continue;
    if (hero.src === "/editorial/saint-john-worn.webp") {
      assert.equal(hero.width, 682);
      assert.equal(hero.height, 1024);
      continue;
    }
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
