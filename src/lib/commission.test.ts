import assert from "node:assert/strict";
import test from "node:test";
import { parseCommission, reviewCommission } from "@/lib/commission";
import { EMPTY_FIT } from "@/lib/private-client";

const base = {
  name: "Jean Pierre",
  email: "jean@example.com",
  note: "",
  scope: "look",
  lookId: "saint-john",
  pieceIds: ["s01"],
  lineRef: "",
  fit: EMPTY_FIT,
};

test("a look commission names the client and the piece", () => {
  const parsed = parseCommission(base);
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.email, "jean@example.com");
  assert.deepEqual(parsed.value.pieceIds, ["s01"]);
});

test("a commission without a name, a piece, or a note is refused", () => {
  assert.equal(parseCommission({ ...base, name: " " }).ok, false);
  assert.equal(parseCommission({ ...base, email: "not-an-email" }).ok, false);
  assert.equal(parseCommission({ ...base, scope: "checkout" }).ok, false);
  assert.equal(parseCommission({ ...base, lookId: "missing" }).ok, false);
  assert.equal(parseCommission({ ...base, pieceIds: [], lineRef: "", note: "" }).ok, false);
  const noted = parseCommission({ ...base, pieceIds: [], lookId: "", note: "A camel suit for June." });
  assert.equal(noted.ok, true);
});

test("an introduction can name the person and the days without choosing a package", () => {
  const parsed = parseCommission({
    name: "Alex",
    email: "alex@example.com",
    note: "Travel weeks and a formal appearance.",
    role: "representative",
    timing: "season",
    budget: "undisclosed",
    pieceIds: [],
    lookId: "",
    lineRef: "",
    fit: EMPTY_FIT,
  });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.scope, "look");
  assert.equal(parsed.value.role, "representative");
  assert.equal(parsed.value.budget, "undisclosed");
});

test("a line style can be commissioned without a wardrobe piece", () => {
  const parsed = parseCommission({ ...base, lookId: "", pieceIds: [], lineRef: "R020" });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.lineRef, "R020");
});

test("measurements name a pathway and an empty profile does not", () => {
  assert.equal(reviewCommission(EMPTY_FIT).pathway, "not-given");
  assert.equal(reviewCommission({ ...EMPTY_FIT, height: "198", sleeve: "71" }).pathway, "technical-review");
  assert.equal(reviewCommission({ ...EMPTY_FIT, chest: "96" }).pathway, "made-to-measure");
});
