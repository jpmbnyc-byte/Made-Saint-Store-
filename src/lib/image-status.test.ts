import assert from "node:assert/strict";
import test from "node:test";
import { runnerImageStatus, statusFromNote } from "@/lib/image-status";

test("proposed packs stay proposed", () => {
  assert.equal(
    statusFromNote("Sample pack MS-RB-J01-ROS. Proposed, not approved. The sheet is a reconstruction, not a physical sample."),
    "proposed",
  );
});

test("campaign and board notes read as studies", () => {
  assert.equal(statusFromNote("Campaign look, not a factory sample."), "study");
  assert.equal(statusFromNote("Existing design board. Cashmere/suede blend needs validation."), "study");
  assert.equal(statusFromNote("Exact original product asset."), "study");
});

test("missing images stay pending", () => {
  assert.equal(statusFromNote("Image match pending.", false), "pending");
  assert.equal(statusFromNote(undefined, false), "pending");
});

test("a photograph without a note defaults to study, not physical", () => {
  assert.equal(statusFromNote(undefined, true), "study");
});

test("runner photographs are studies, not hand samples", () => {
  assert.equal(runnerImageStatus(), "study");
});
