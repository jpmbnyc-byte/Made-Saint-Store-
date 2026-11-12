import assert from "node:assert/strict";
import test from "node:test";
import { addPiece, addToBag, createGroup, decideBag, emptyBag, emptyCloset, hasPiece, loadCloset, readJson, removePiece, restorePiece, saveLook, type Store } from "./closet";

function memory(): Store {
  const map = new Map<string, string>();
  return { getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) };
}

test("a saved piece survives reload and does not duplicate", () => {
  const store = memory();
  const once = addPiece(emptyCloset(), { productRef: "R027", kind: "line", color: "Cobalt", size: "", lookId: "" }, "t1");
  const twice = addPiece(once, { productRef: "R027", kind: "line", color: "Cobalt", size: "", lookId: "" }, "t2");
  assert.equal(twice.pieces.length, 1);
  store.setItem("ms.closet.v1", JSON.stringify(twice));
  const loaded = loadCloset(store);
  assert.equal(loaded.pieces[0]?.size, "");
  assert.equal(loaded.pieces.length, 1);
});

test("saving a look keeps the group and does not duplicate on a second save", () => {
  const look = { slug: "cobalt", title: "Cobalt", pieces: [{ ref: "R027", color: "Cobalt" }] };
  const once = saveLook(emptyCloset(), look, "t1");
  const twice = saveLook(once, look, "t2");
  assert.equal(twice.groups.length, 1);
  assert.equal(twice.pieces.length, 1);
  assert.equal(twice.pieces[0]?.groupIds.length, 1);
});

test("a different size is a separate selection, and undo restores a removal", () => {
  let data = addPiece(emptyCloset(), { productRef: "R027", kind: "line", color: "Cobalt", size: "M", lookId: "" }, "t1");
  data = addPiece(data, { productRef: "R027", kind: "line", color: "Cobalt", size: "L", lookId: "" }, "t2");
  assert.equal(data.pieces.length, 2);
  const removed = removePiece(data, "R027", "Cobalt", "M", "");
  assert.equal(removed.data.pieces.length, 1);
  assert.ok(removed.removed);
  const restored = restorePiece(removed.data, removed.removed!);
  assert.equal(restored.pieces.length, 2);
});

test("a wardrobe group can be created beside a saved look", () => {
  const data = createGroup(saveLook(emptyCloset(), { slug: "stripe", title: "Grouped stripe", pieces: [] }, "t1"), "Travel week", "t2");
  assert.equal(data.groups.length, 2);
  assert.equal(data.groups[1]?.name, "Travel week");
});

test("creating a group names it, attaches selected pieces, and refuses a blank name", () => {
  const withPiece = addPiece(emptyCloset(), { productRef: "R027", kind: "line", color: "Cobalt", size: "M", lookId: "" }, "t1");
  const blank = createGroup(withPiece, "   ", "t2", withPiece.pieces);
  assert.equal(blank.groups.length, 0);
  const named = createGroup(withPiece, "Travel week", "t2", withPiece.pieces);
  assert.equal(named.groups.length, 1);
  assert.equal(named.groups[0]?.id, "group-t2-1");
  assert.deepEqual(named.pieces[0]?.groupIds, ["group-t2-1"]);
  const second = createGroup(named, "Evening", "t2", []);
  assert.equal(second.groups[1]?.id, "group-t2-2");
  assert.equal(hasPiece(named, { productRef: "R027", color: "Cobalt", size: "M", lookId: "" }), true);
});

test("only a launched runner with a size can enter the bag, and a retry does not duplicate", () => {
  const line = decideBag({ productRef: "R027", kind: "line", size: "M", launch: false });
  const bare = decideBag({ productRef: "ms-runner-1101-mesh-black", kind: "runner", size: "", launch: true });
  const pair = decideBag({ productRef: "ms-runner-1101-mesh-black", kind: "runner", size: "9", launch: true });
  assert.equal(line.ok, false);
  assert.equal(bare.ok, false);
  assert.equal(pair.ok, true);
  const first = addToBag(emptyBag(), [line, bare, pair]);
  assert.deepEqual(first.added, ["ms-runner-1101-mesh-black"]);
  assert.equal(first.blocked.length, 2);
  const second = addToBag(first.bag, [pair]);
  assert.deepEqual(second.added, []);
  assert.deepEqual(second.alreadyThere, ["ms-runner-1101-mesh-black"]);
  assert.equal(second.bag.items.length, 1);
});

test("a corrupt or old closet record opens empty", () => {
  assert.equal(readJson("nope", emptyCloset(), 1).pieces.length, 0);
  assert.equal(readJson(JSON.stringify({ version: 0, pieces: [{ productRef: "R027" }] }), emptyCloset(), 1).pieces.length, 0);
  const store = memory();
  store.setItem("ms.closet.v1", "{");
  assert.equal(loadCloset(store).pieces.length, 0);
});
