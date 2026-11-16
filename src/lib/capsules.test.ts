import assert from "node:assert/strict";
import test from "node:test";
import { CAPSULES, capsuleBySlug, enquireCapsuleHref } from "@/lib/capsules";

test("twelve capsules stay in numerical order with paired plates", () => {
  assert.equal(CAPSULES.length, 12);
  assert.deepEqual(
    CAPSULES.map((capsule) => capsule.number),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
  );
  assert.equal(CAPSULES[0]?.title, "Miami Arrival");
  assert.equal(CAPSULES[11]?.title, "Weekend Residence");
  for (const capsule of CAPSULES) {
    assert.equal(capsule.width, 1536);
    assert.equal(capsule.height, 1024);
    assert.match(capsule.image, /^\/wardrobe\/capsules\/.+\.webp$/);
    assert.ok(capsule.men.length > 20);
    assert.ok(capsule.women.length > 20);
    assert.ok(capsule.palette.length >= 3);
    assert.equal(Boolean(capsuleBySlug(capsule.slug)), true);
  }
});

test("capsule enquire links place query params before the hash", () => {
  assert.equal(
    enquireCapsuleHref("miami-arrival", "women"),
    "/wardrobe?capsule=miami-arrival&side=women#introduction",
  );
});

test("public capsule copy keeps internal source metadata out", () => {
  const blob = JSON.stringify(CAPSULES);
  assert.equal(blob.includes("sha256"), false);
  assert.equal(blob.includes("chatgpt.com"), false);
  assert.equal(blob.includes("source_archive"), false);
  assert.equal(blob.includes("clothing_source"), false);
});
