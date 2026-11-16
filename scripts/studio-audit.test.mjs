import assert from "node:assert/strict";
import test from "node:test";
import { releaseErrors } from "./studio-audit.mjs";

const source = "/collection/example.webp";
const asset = { source, disposition: "retouch", sha256: "original", blockers: [] };
const record = {
  status: "approved", sourceSha256: "original", masterSource: "/art/studio-v1/masters/example.png",
  masterSha256: "master", editor: "Retoucher", reviewedBy: "Reviewer", reviewedAt: "2026-11-16",
  target: "/art/studio-v1/collection/example.webp", outputSha256: "output",
  width: 1200, height: 1800, maxRenderWidth: 1200, maxRenderHeight: 1800,
  qa: { geometry: true, identity: true, color: true, texture: true, background: true, all_usages: true },
};
const inspect = async (src) => src.includes("/masters/")
  ? { sha256: "master", width: 1600, height: 2400 }
  : { sha256: "output", width: 1200, height: 1800 };
const check = (assets, records, reader = inspect) => releaseErrors({ assets }, { replacements: records }, reader);

test("an empty production manifest blocks every photo and unreviewed candidate", async () => {
  const errors = await check([asset, { ...asset, source: "/other.webp", disposition: "review_scope" }], {});
  assert.equal(errors.length, 2);
});

test("a complete reviewed replacement passes asset checks", async () => {
  assert.deepEqual(await check([asset], { [source]: record }), []);
});

test("generated proofs and incomplete visual reviews cannot release", async () => {
  assert.match((await check([asset], { [source]: { ...record, status: "proof" } })).join(), /no approved/);
  assert.match((await check([asset], { [source]: { ...record, qa: { ...record.qa, texture: null } } })).join(), /visual QA incomplete/);
});

test("changed sources, unchanged outputs and invented master provenance block release", async () => {
  const errors = await check([{ ...asset, sha256: "changed" }], { [source]: record }, async () => ({ sha256: "changed", width: 1200, height: 1800 }));
  assert.match(errors.join(), /source is missing or changed/);
  assert.match(errors.join(), /output hash is unverified or unchanged/);
  assert.match(errors.join(), /master provenance does not match/);
});

test("undersized outputs and enlargement beyond a master cannot release", async () => {
  const errors = await check([asset], { [source]: record }, async (src) => src.includes("/masters/")
    ? { sha256: "master", width: 400, height: 600 }
    : { sha256: "output", width: 800, height: 1200 });
  assert.match(errors.join(), /inadequate output resolution/);
  assert.match(errors.join(), /exceeds master resolution/);
});

test("missing source recovery and inconsistent aliases block release", async () => {
  const alias = "/collection/alias.webp";
  const errors = await check([{ ...asset, blockers: ["wrong_variant"] }, { ...asset, source: alias }], {
    [source]: record, [alias]: { ...record, target: "/art/studio-v1/collection/other.webp" },
  });
  assert.match(errors.join(), /source blocker has no resolution/);
  assert.match(errors.join(), /aliases resolve to different masters/);
});

test("a preserved graphic is exempt but an unknown replacement is rejected", async () => {
  assert.deepEqual(await check([{ ...asset, disposition: "preserve_graphic" }], {}), []);
  assert.match((await check([], { [source]: record })).join(), /absent from the inventory/);
});
