import assert from "node:assert/strict";
import test from "node:test";
import { parseCommission, reviewCommission } from "@/lib/commission";
import { EMPTY_FIT } from "@/lib/private-client";

const base = {
  name: "Jean Pierre",
  email: "jean@example.com",
  note: "",
  settings: "",
  desiredDates: "",
  scope: "look",
  lookId: "saint-john",
  pieceIds: ["s01"],
  lineRef: "",
  fit: EMPTY_FIT,
  role: "wearer",
  timing: "season",
  budget: "",
  privacyConsent: true,
};

test("a look commission names the client and the piece", () => {
  const parsed = parseCommission(base);
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.email, "jean@example.com");
  assert.deepEqual(parsed.value.pieceIds, ["s01"]);
  assert.equal(parsed.value.role, "wearer");
  assert.equal(parsed.value.privacyConsent, true);
});

test("a commission without a name, a piece, or a note is refused", () => {
  assert.equal(parseCommission({ ...base, name: " " }).ok, false);
  assert.equal(parseCommission({ ...base, email: "not-an-email" }).ok, false);
  assert.equal(parseCommission({ ...base, scope: "checkout" }).ok, false);
  assert.equal(parseCommission({ ...base, lookId: "missing" }).ok, false);
  assert.equal(parseCommission({ ...base, pieceIds: [], lineRef: "", note: "", settings: "" }).ok, false);
  const noted = parseCommission({ ...base, pieceIds: [], lookId: "", note: "A camel suit for June." });
  assert.equal(noted.ok, true);
});

test("an introduction can name the person and the days without choosing a package", () => {
  const parsed = parseCommission({
    name: "Alex",
    email: "alex@example.com",
    note: "Travel weeks and a formal appearance.",
    settings: "Flight, hotel arrival, dinner, broadcast, private day.",
    desiredDates: "March through May",
    role: "stylist",
    timing: "season",
    budget: "undisclosed",
    pieceIds: [],
    lookId: "",
    lineRef: "",
    fit: EMPTY_FIT,
    privacyConsent: true,
  });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.scope, "look");
  assert.equal(parsed.value.role, "stylist");
  assert.equal(parsed.value.budget, "undisclosed");
  assert.equal(parsed.value.settings.includes("Flight"), true);
  const earlier = parseCommission({ ...base, role: "representative" });
  assert.equal(earlier.ok, true);
  if (!earlier.ok) return;
  assert.equal(earlier.value.role, "stylist");
  const legacy = parseCommission({ ...base, role: "myself" });
  assert.equal(legacy.ok, true);
  if (!legacy.ok) return;
  assert.equal(legacy.value.role, "wearer");
});

test("photography consent is optional for an enquiry", () => {
  assert.equal(parseCommission({ ...base, privacyConsent: false }).ok, true);
  assert.equal(parseCommission({ ...base, privacyConsent: undefined }).ok, true);
});

test("a line style can be commissioned without a wardrobe piece", () => {
  const parsed = parseCommission({ ...base, lookId: "", pieceIds: [], lineRef: "R020" });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.lineRef, "R020");
});

test("a remote fitting consultation is optional and unpriced", () => {
  const off = parseCommission(base);
  assert.equal(off.ok, true);
  if (!off.ok) return;
  assert.equal(off.value.remoteFitting, false);
  const on = parseCommission({ ...base, remoteFitting: true });
  assert.equal(on.ok, true);
  if (!on.ok) return;
  assert.equal(on.value.remoteFitting, true);
  const junk = parseCommission({ ...base, remoteFitting: "yes" });
  assert.equal(junk.ok, true);
  if (!junk.ok) return;
  assert.equal(junk.value.remoteFitting, false);
});

test("measurements name a pathway and an empty profile does not", () => {
  assert.equal(reviewCommission(EMPTY_FIT).pathway, "not-given");
  assert.equal(reviewCommission({ ...EMPTY_FIT, height: "198", sleeve: "71" }).pathway, "technical-review");
  assert.equal(reviewCommission({ ...EMPTY_FIT, chest: "96" }).pathway, "made-to-measure");
});
