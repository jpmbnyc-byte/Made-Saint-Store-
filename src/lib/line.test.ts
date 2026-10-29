import assert from "node:assert/strict";
import test from "node:test";
import { FRAMES, LINE, framesFor, pricedLine } from "./line";

test("the 2027 line keeps proposed prices and leaves licensing concepts off the page", () => {
  const priced = pricedLine();
  assert.equal(priced.length, 75);
  assert.equal(LINE.filter((item) => item.status === "held").length, 5);
  assert.equal(LINE.some((item) => /dunkin/i.test(item.name)), false);
  const hat = LINE.find((item) => item.ref === "R043");
  const cape = LINE.find((item) => item.ref === "R056");
  const runner = LINE.find((item) => item.ref === "N001");
  assert.equal(hat?.retail, 110);
  assert.equal(cape?.retail, 3450);
  assert.equal(runner?.retail, 695);
  assert.equal(LINE.find((item) => item.ref === "R005")?.retail, null);
  for (const frame of FRAMES) {
    for (const ref of frame.refs) assert.ok(LINE.some((item) => item.ref === ref), ref);
  }
  assert.equal(FRAMES.length, 59);
  assert.equal(framesFor("R067").length, 2);
  assert.equal(framesFor("R043").length, 3);
  assert.equal(framesFor("N005").length, 0);
});
