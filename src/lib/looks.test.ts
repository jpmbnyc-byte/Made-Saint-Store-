import assert from "node:assert/strict";
import test from "node:test";
import { LOOKS, OCCASIONS, offerFor, reserveTotal, resolvePiece } from "./looks";

test("a look can be reserved only for a founding pair", () => {
  for (const look of LOOKS) {
    assert.ok(OCCASIONS.some((occasion) => occasion.id === look.occasion), look.id);
    for (const piece of look.pieces) {
      resolvePiece(piece.id);
      const offer = offerFor(piece.id);
      if (!piece.shown) assert.equal(offer.kind, "reserve", `${look.id} offers ${piece.id} beside the photograph`);
    }
  }

  assert.equal(reserveTotal(LOOKS.find((look) => look.id === "arrival")!), 595);
  assert.equal(reserveTotal(LOOKS.find((look) => look.id === "off-duty")!), 545);
  assert.equal(reserveTotal(LOOKS.find((look) => look.id === "transit")!), 695);
  assert.equal(reserveTotal(LOOKS.find((look) => look.id === "course")!), 0);
  assert.equal(reserveTotal(LOOKS.find((look) => look.id === "saint-john")!), 0);

  assert.equal(offerFor("rn02").kind, "reserve");
  assert.equal(offerFor("p01").kind, "commission");
  assert.equal(LOOKS.reduce((sum, look) => sum + reserveTotal(look), 0), 595 + 545 + 695);
});
