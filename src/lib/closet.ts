export const CLOSET_KEY = "ms.closet.v1";
export const BAG_KEY = "ms.bag.v1";

export type Store = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export type PieceSelection = {
  productRef: string;
  kind: "line" | "runner";
  color: string;
  size: string;
  qty: number;
  lookId: string;
  groupIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type OutfitGroup = {
  id: string;
  name: string;
  lookId: string;
  createdAt: string;
};

export type ClosetData = {
  version: 1;
  pieces: PieceSelection[];
  groups: OutfitGroup[];
};

export type BagItem = {
  productId: string;
  size: string;
  qty: number;
};

export type BagData = { version: 1; items: BagItem[] };

export const emptyCloset = (): ClosetData => ({ version: 1, pieces: [], groups: [] });
export const emptyBag = (): BagData => ({ version: 1, items: [] });

const pieceKey = (piece: Pick<PieceSelection, "productRef" | "color" | "size" | "lookId">) =>
  [piece.productRef, piece.color, piece.size, piece.lookId].join("|");

export function readJson<T>(raw: string | null, fallback: T, version: 1): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as { version?: number };
    if (!parsed || parsed.version !== version) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function loadCloset(store: Store): ClosetData {
  const data = readJson<ClosetData>(store.getItem(CLOSET_KEY), emptyCloset(), 1);
  if (!Array.isArray(data.pieces) || !Array.isArray(data.groups)) return emptyCloset();
  return data;
}

export function loadBag(store: Store): BagData {
  const data = readJson<BagData>(store.getItem(BAG_KEY), emptyBag(), 1);
  if (!Array.isArray(data.items)) return emptyBag();
  return data;
}

export function writeCloset(store: Store, data: ClosetData) {
  store.setItem(CLOSET_KEY, JSON.stringify(data));
}

export function writeBag(store: Store, data: BagData) {
  store.setItem(BAG_KEY, JSON.stringify(data));
}

export function hasPiece(
  data: ClosetData,
  input: Pick<PieceSelection, "productRef" | "color" | "size" | "lookId">,
) {
  const key = pieceKey(input);
  return data.pieces.some((piece) => pieceKey(piece) === key);
}

export function addPiece(
  data: ClosetData,
  input: Omit<PieceSelection, "qty" | "groupIds" | "createdAt" | "updatedAt"> & { groupId?: string },
  now: string,
): ClosetData {
  const key = pieceKey({ ...input, size: input.size });
  const found = data.pieces.find((piece) => pieceKey(piece) === key);
  if (found) {
    const groupIds = input.groupId && !found.groupIds.includes(input.groupId) ? [...found.groupIds, input.groupId] : found.groupIds;
    return {
      ...data,
      pieces: data.pieces.map((piece) => (piece === found ? { ...piece, groupIds, updatedAt: now } : piece)),
    };
  }
  return {
    ...data,
    pieces: [
      ...data.pieces,
      {
        productRef: input.productRef,
        kind: input.kind,
        color: input.color,
        size: input.size,
        qty: 1,
        lookId: input.lookId,
        groupIds: input.groupId ? [input.groupId] : [],
        createdAt: now,
        updatedAt: now,
      },
    ],
  };
}

export function saveLook(
  data: ClosetData,
  look: { slug: string; title: string; pieces: { ref: string; color: string }[] },
  now: string,
): ClosetData {
  const existing = data.groups.find((group) => group.lookId === look.slug);
  const group: OutfitGroup = existing ?? { id: `look-${look.slug}`, name: look.title, lookId: look.slug, createdAt: now };
  let next: ClosetData = existing ? data : { ...data, groups: [...data.groups, group] };
  for (const item of look.pieces) {
    next = addPiece(next, { productRef: item.ref, kind: "line", color: item.color, size: "", lookId: look.slug, groupId: group.id }, now);
  }
  return next;
}

export function removePiece(data: ClosetData, productRef: string, color: string, size: string, lookId: string): { data: ClosetData; removed: PieceSelection | null } {
  const key = pieceKey({ productRef, color, size, lookId });
  const removed = data.pieces.find((piece) => pieceKey(piece) === key) ?? null;
  return { data: { ...data, pieces: data.pieces.filter((piece) => pieceKey(piece) !== key) }, removed };
}

export function restorePiece(data: ClosetData, piece: PieceSelection): ClosetData {
  return addPiece(data, { ...piece, groupId: piece.groupIds[0] }, piece.updatedAt);
}

export function renameGroup(data: ClosetData, id: string, name: string): ClosetData {
  return { ...data, groups: data.groups.map((group) => (group.id === id ? { ...group, name: name.slice(0, 60) } : group)) };
}

export function createGroup(data: ClosetData, name: string, now: string, selected: PieceSelection[] = []): ClosetData {
  const trimmed = name.trim().slice(0, 60);
  if (!trimmed) return data;
  const id = `group-${now}-${data.groups.length + 1}`;
  const keys = new Set(selected.map((piece) => pieceKey(piece)));
  return {
    ...data,
    groups: [...data.groups, { id, name: trimmed, lookId: "", createdAt: now }],
    pieces: data.pieces.map((piece) =>
      keys.has(pieceKey(piece)) && !piece.groupIds.includes(id)
        ? { ...piece, groupIds: [...piece.groupIds, id], updatedAt: now }
        : piece,
    ),
  };
}

export function setPieceSize(data: ClosetData, productRef: string, color: string, fromSize: string, lookId: string, size: string, now: string): ClosetData {
  const key = pieceKey({ productRef, color, size: fromSize, lookId });
  const source = data.pieces.find((piece) => pieceKey(piece) === key);
  if (!source || fromSize === size) return data;
  const dest = pieceKey({ productRef, color, size, lookId });
  const clash = data.pieces.find((piece) => pieceKey(piece) === dest);
  if (clash) {
    const groupIds = [...new Set([...clash.groupIds, ...source.groupIds])];
    return {
      ...data,
      pieces: data.pieces
        .filter((piece) => pieceKey(piece) !== key)
        .map((piece) => (piece === clash ? { ...piece, groupIds, updatedAt: now } : piece)),
    };
  }
  return {
    ...data,
    pieces: data.pieces.map((piece) => (pieceKey(piece) === key ? { ...piece, size, updatedAt: now } : piece)),
  };
}

export type BagDecision =
  | { ok: true; productId: string; size: string; qty: number }
  | { ok: false; productRef: string; reason: string };

/** Runners with a size can be requested through the existing pair page. Line styles cannot. */
export function decideBag(input: { productRef: string; kind: "line" | "runner"; size: string; launch: boolean }): BagDecision {
  if (input.kind !== "runner" || !input.launch) {
    return { ok: false, productRef: input.productRef, reason: "Development preview — available to enquire. This style is not a checkout item." };
  }
  if (!input.size) return { ok: false, productRef: input.productRef, reason: "Choose a size before purchase." };
  return { ok: true, productId: input.productRef, size: input.size, qty: 1 };
}

export function addToBag(bag: BagData, decisions: BagDecision[]): { bag: BagData; added: string[]; blocked: { productRef: string; reason: string }[]; alreadyThere: string[] } {
  const added: string[] = [];
  const blocked: { productRef: string; reason: string }[] = [];
  const alreadyThere: string[] = [];
  let items = bag.items;
  for (const decision of decisions) {
    if (!decision.ok) {
      blocked.push({ productRef: decision.productRef, reason: decision.reason });
      continue;
    }
    const existing = items.find((item) => item.productId === decision.productId && item.size === decision.size);
    if (existing) {
      alreadyThere.push(decision.productId);
      continue;
    }
    items = [...items, { productId: decision.productId, size: decision.size, qty: decision.qty }];
    added.push(decision.productId);
  }
  return { bag: { version: 1, items }, added, blocked, alreadyThere };
}
