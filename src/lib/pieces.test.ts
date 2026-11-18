import assert from "node:assert/strict";
import test from "node:test";
import { PRODUCTS } from "./business";
import {
  WARDROBE_LOOKS,
  WARDROBE_PIECES,
  enquireHrefForPiece,
  lookBySlug,
  pieceBySlug,
  piecesForLook,
} from "./pieces";

test("every wardrobe look resolves pieces and a live 0106 runner", () => {
  assert.ok(WARDROBE_LOOKS.length >= 8);
  assert.ok(WARDROBE_PIECES.length >= 12);
  for (const look of WARDROBE_LOOKS) {
    const pieces = piecesForLook(look);
    assert.equal(pieces.length, look.pieceSlugs.length, look.slug);
    if (look.runnerId) {
      const runner = PRODUCTS.find((product) => product.id === look.runnerId);
      assert.ok(runner, look.runnerId);
      assert.equal(runner?.series, "0106");
      assert.equal(runner?.launch, true);
    }
  }
});

test("piece enquire links carry the selection into Private Wardrobe", () => {
  const piece = pieceBySlug("crew-knit-ivory");
  assert.ok(piece);
  const href = enquireHrefForPiece(piece!);
  assert.match(href, /\/wardrobe\?/);
  assert.match(href, /ref=crew-knit-ivory/);
  assert.match(href, /#introduction$/);
  assert.equal(lookBySlug("ivory-forest")?.title, "Ivory and forest");
});
