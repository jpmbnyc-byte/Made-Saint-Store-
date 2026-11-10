"use client";

import { useState } from "react";
import Link from "next/link";
import { customerStatus, lookBySlug } from "@/lib/line-shop";
import { lineByRef, usd } from "@/lib/line";
import { PRODUCTS, SIZES as RUNNER_SIZES } from "@/lib/business";
import { addToBag, createGroup, decideBag, loadBag, removePiece, renameGroup, restorePiece, setPieceSize, writeBag, type PieceSelection } from "@/lib/closet";
import { useBag, useCloset } from "@/components/line/store";

const SIZES = ["", "S", "M", "L", "XL"];

export function ClosetWorkspace() {
  const closet = useCloset();
  const bag = useBag();
  const [tab, setTab] = useState<"pieces" | "looks">("pieces");
  const [selected, setSelected] = useState<string[]>([]);
  const [undo, setUndo] = useState<PieceSelection | null>(null);
  const [report, setReport] = useState("");
  const [name, setName] = useState("A wardrobe");

  function keyOf(piece: PieceSelection) {
    return `${piece.productRef}|${piece.color}|${piece.size}|${piece.lookId}`;
  }

  function label(ref: string) {
    return lineByRef(ref)?.name ?? PRODUCTS.find((item) => item.id === ref)?.name ?? ref;
  }

  function priceOf(piece: PieceSelection) {
    if (piece.kind === "runner") {
      const product = PRODUCTS.find((item) => item.id === piece.productRef);
      return product ? { text: usd(product.usd), lead: "Made to order. Ready in 4 to 6 weeks.", buyable: product.launch } : { text: "Unavailable", lead: "", buyable: false };
    }
    const product = lineByRef(piece.productRef);
    if (!product) return { text: "Unavailable", lead: "", buyable: false };
    const status = customerStatus(product);
    return { text: status.price ?? "Enquire", lead: status.label, buyable: false };
  }

  function transfer() {
    const chosen = closet.data.pieces.filter((piece) => selected.includes(keyOf(piece)));
    const decisions = chosen.map((piece) => decideBag({
      productRef: piece.productRef,
      kind: piece.kind,
      size: piece.size,
      launch: piece.kind === "runner" && Boolean(PRODUCTS.find((item) => item.id === piece.productRef)?.launch),
    }));
    const store = {
      getItem: (key: string) => localStorage.getItem(key),
      setItem: (key: string, value: string) => localStorage.setItem(key, value),
    };
    const next = addToBag(loadBag(store), decisions);
    try {
      writeBag(store, next.bag);
      window.dispatchEvent(new Event("ms-store"));
    } catch {
      bag.commit(next.bag);
    }
    const blocked = next.blocked.map((item) => `${label(item.productRef)}: ${item.reason}`).join(" ");
    const added = next.added.length ? `${next.added.length} pair${next.added.length === 1 ? "" : "s"} recorded in the bag.` : "Nothing new was added to the bag.";
    setReport(`${added} ${blocked} Saved pieces stay in the closet.`.trim());
  }

  if (closet.data.pieces.length === 0 && closet.data.groups.length === 0) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-20">
        <h1 className="text-[12px] tracking-[0.22em] uppercase">My Closet</h1>
        <p className="mt-6 text-[15px] leading-relaxed">Nothing is saved yet. A saved piece stays on this browser. It does not reserve stock, and it does not follow you to another device.</p>
        <div className="mt-8 flex gap-4 text-[11px] tracking-[0.16em] uppercase">
          <Link href="/line" className="inline-flex h-11 items-center underline underline-offset-4">Featured</Link>
          <Link href="/line/lookbook" className="inline-flex h-11 items-center underline underline-offset-4">Lookbook</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[980px] px-5 py-12">
      <h1 className="text-[12px] tracking-[0.22em] uppercase">My Closet</h1>
      <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#111]/70">Saving does not reserve stock or lock a price. Selections stay on this browser. Cross-device sync needs an account, and this house does not keep one here.</p>
      {closet.warning && <p className="mt-3 text-sm">{closet.warning}</p>}
      <div className="mt-6 flex gap-4">
        <button type="button" aria-pressed={tab === "pieces"} onClick={() => setTab("pieces")} className={`h-11 text-[11px] tracking-[0.16em] uppercase ${tab === "pieces" ? "border-b border-[#111]" : "text-[#111]/50"}`}>Saved pieces</button>
        <button type="button" aria-pressed={tab === "looks"} onClick={() => setTab("looks")} className={`h-11 text-[11px] tracking-[0.16em] uppercase ${tab === "looks" ? "border-b border-[#111]" : "text-[#111]/50"}`}>Saved looks</button>
      </div>

      {tab === "pieces" && (
        <ul className="mt-8 divide-y divide-[#111]/10 border-y border-[#111]/10">
          {closet.data.pieces.map((piece) => {
            const offer = priceOf(piece);
            const id = keyOf(piece);
            return (
              <li key={id} className="py-5">
                <div className="flex items-start justify-between gap-4">
                  <label className="flex min-h-11 items-center gap-3">
                    <input type="checkbox" className="size-4" checked={selected.includes(id)} onChange={() => setSelected((cur) => cur.includes(id) ? cur.filter((item) => item !== id) : [...cur, id])} />
                    <span className="text-[15px]">{label(piece.productRef)}</span>
                  </label>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase"
                    onClick={() => {
                      const result = removePiece(closet.data, piece.productRef, piece.color, piece.size, piece.lookId);
                      closet.commit(result.data);
                      setUndo(result.removed);
                      setReport("Removed. Undo is below.");
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 pl-7 text-[13px] text-[#111]/70">
                  <p>{piece.color || "Color not confirmed"}</p>
                  <p className="mt-1">{offer.text}. {offer.lead}</p>
                  {!piece.size && <p className="mt-1">Choose a size before purchase.</p>}
                  <label className="mt-3 block text-[11px] tracking-[0.12em] uppercase">
                    Size
                    <select
                      value={piece.size}
                      onChange={(event) => closet.commit(setPieceSize(closet.data, piece.productRef, piece.color, piece.size, piece.lookId, event.target.value, new Date().toISOString()))}
                      className="mt-1 h-11 w-full border border-[#111]/15 bg-white px-2 text-base normal-case tracking-normal md:w-36"
                    >
                      {(piece.kind === "runner" ? ["", ...RUNNER_SIZES] : SIZES).map((size) => <option key={size || "none"} value={size}>{size || "Not chosen"}</option>)}
                    </select>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {tab === "looks" && (
        <div className="mt-8 space-y-8">
          {closet.data.groups.map((group) => {
            const look = group.lookId ? lookBySlug(group.lookId) : null;
            const pieces = closet.data.pieces.filter((piece) => piece.groupIds.includes(group.id) || piece.lookId === group.lookId);
            return (
              <article key={group.id} className="border-t border-[#111]/10 pt-6">
                <label className="block text-[11px] tracking-[0.14em] uppercase">
                  Name
                  <input
                    value={group.name}
                    onChange={(event) => closet.commit(renameGroup(closet.data, group.id, event.target.value))}
                    className="mt-2 h-11 w-full border border-[#111]/15 bg-white px-3 text-base normal-case tracking-normal"
                  />
                </label>
                {look && <img src={look.image} alt={look.alt} className="mt-4 h-72 w-full max-w-sm bg-[#f3f3f1] object-contain" />}
                <ul className="mt-4 space-y-2 text-sm">
                  {pieces.map((piece) => <li key={keyOf(piece)}>{label(piece.productRef)} · {piece.size || "Size not chosen"}</li>)}
                  {pieces.length === 0 && <li className="text-[#111]/55">No pieces in this group.</li>}
                </ul>
              </article>
            );
          })}
          <form
            className="flex flex-wrap gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              closet.commit(createGroup(closet.data, name, new Date().toISOString()));
            }}
          >
            <label className="text-[11px] tracking-[0.14em] uppercase">
              New group
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 border border-[#111]/15 bg-white px-3 text-base normal-case tracking-normal" />
            </label>
            <button type="submit" className="mt-6 inline-flex h-11 items-center border border-[#111] px-4 text-[11px] tracking-[0.14em] uppercase">Create</button>
          </form>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="button" onClick={transfer} className="inline-flex h-12 items-center bg-[#111] px-5 text-[11px] tracking-[0.16em] text-[#f7f7f5] uppercase">Add selected to bag</button>
        {undo && (
          <button type="button" className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4" onClick={() => { closet.commit(restorePiece(closet.data, undo)); setUndo(null); setReport("Restored."); }}>
            Undo remove
          </button>
        )}
        <Link href="/bag" className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Open bag {bag.data.items.length}</Link>
      </div>
      <p className="sr-only" aria-live="polite">{report}</p>
      {report && <p className="mt-4 max-w-xl text-sm leading-relaxed">{report}</p>}
    </div>
  );
}
