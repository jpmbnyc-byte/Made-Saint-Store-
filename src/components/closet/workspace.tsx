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
  const [name, setName] = useState("");

  function keyOf(piece: PieceSelection) {
    return `${piece.productRef}|${piece.color}|${piece.size}|${piece.lookId}`;
  }

  function label(ref: string) {
    return lineByRef(ref)?.name ?? PRODUCTS.find((item) => item.id === ref)?.name ?? ref;
  }

  function hrefOf(piece: PieceSelection) {
    if (piece.kind === "runner") return `/shop/${piece.productRef}`;
    return `/line/${piece.productRef.toLowerCase()}`;
  }

  function priceOf(piece: PieceSelection) {
    if (piece.kind === "runner") {
      const product = PRODUCTS.find((item) => item.id === piece.productRef);
      return product ? { text: usd(product.usd), lead: "Delivery is confirmed with your quotation.", buyable: product.launch } : { text: "Unavailable", lead: "", buyable: false };
    }
    const product = lineByRef(piece.productRef);
    if (!product) return { text: "Unavailable", lead: "", buyable: false };
    const status = customerStatus(product);
    return { text: status.price ?? "Enquire", lead: status.label, buyable: false };
  }

  function chosenPieces() {
    return closet.data.pieces.filter((piece) => selected.includes(keyOf(piece)));
  }

  function makeGroup() {
    const trimmed = name.trim();
    if (!trimmed) {
      setReport("Name the group before creating it.");
      return;
    }
    const chosen = chosenPieces();
    if (tab === "pieces" && chosen.length === 0) {
      setReport("Select at least one saved piece, then create the group.");
      return;
    }
    closet.commit(createGroup(closet.data, trimmed, new Date().toISOString(), chosen));
    setSelected([]);
    setName("");
    setTab("looks");
    setReport(chosen.length ? `${trimmed} now holds ${chosen.length} piece${chosen.length === 1 ? "" : "s"}.` : `${trimmed} is in My Closet.`);
  }

  function transfer() {
    const chosen = chosenPieces();
    if (chosen.length === 0) {
      setReport("Select a sized runner before adding to the bag.");
      return;
    }
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
        <div className="mt-8 flex flex-wrap gap-4 text-[11px] tracking-[0.16em] uppercase">
          <Link href="/line/lookbook" className="inline-flex h-11 items-center underline underline-offset-4">Lookbook</Link>
          <Link href="/line" className="inline-flex h-11 items-center underline underline-offset-4">The line</Link>
          <Link href="/shop#1101" className="inline-flex h-11 items-center underline underline-offset-4">The runners</Link>
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
        <>
          {closet.data.pieces.length === 0 ? (
            <p className="mt-8 text-sm">No pieces yet. Save a look, or add a style from the line.</p>
          ) : (
            <ul className="mt-8 divide-y divide-[#111]/10 border-y border-[#111]/10">
              {closet.data.pieces.map((piece) => {
                const offer = priceOf(piece);
                const id = keyOf(piece);
                return (
                  <li key={id} className="py-5">
                    <div className="flex items-start justify-between gap-4">
                      <label className="flex min-h-11 items-center gap-3">
                        <input type="checkbox" className="size-4" checked={selected.includes(id)} onChange={() => setSelected((cur) => cur.includes(id) ? cur.filter((item) => item !== id) : [...cur, id])} />
                        <Link href={hrefOf(piece)} className="text-[15px] underline underline-offset-4">{label(piece.productRef)}</Link>
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
                      {piece.kind === "line" && (
                        <Link href={`/wardrobe?ref=${piece.productRef}#introduction`} className="mt-3 inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Enquire</Link>
                      )}
                      {piece.kind === "runner" && piece.size && (
                        <Link href={`/shop/${piece.productRef}?size=${piece.size}`} className="mt-3 inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Request this pair</Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <form
            className="mt-8 flex flex-wrap items-end gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              makeGroup();
            }}
          >
            <label className="text-[11px] tracking-[0.14em] uppercase">
              New group from selected
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Travel week" className="mt-2 h-11 w-56 border border-[#111]/15 bg-white px-3 text-base normal-case tracking-normal" />
            </label>
            <button type="submit" className="inline-flex h-11 items-center border border-[#111] px-4 text-[11px] tracking-[0.14em] uppercase">Create group</button>
          </form>
        </>
      )}

      {tab === "looks" && (
        <div className="mt-8 space-y-8">
          {closet.data.groups.length === 0 && <p className="text-sm">No looks yet. Save a look from the lookbook, or create a group from selected pieces.</p>}
          {closet.data.groups.map((group) => {
            const look = group.lookId ? lookBySlug(group.lookId) : null;
            const pieces = closet.data.pieces.filter((piece) => piece.groupIds.includes(group.id) || (group.lookId && piece.lookId === group.lookId));
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
                {look && (
                  <Link href={`/line/looks/${look.slug}`} className="mt-4 block max-w-sm">
                    <img src={look.image} alt={look.alt} className="h-72 w-full bg-[#f3f3f1] object-contain" />
                  </Link>
                )}
                <ul className="mt-4 space-y-2 text-sm">
                  {pieces.map((piece) => (
                    <li key={keyOf(piece)}>
                      <Link href={hrefOf(piece)} className="underline underline-offset-4">{label(piece.productRef)}</Link>
                      {" · "}
                      {piece.size || "Size not chosen"}
                    </li>
                  ))}
                  {pieces.length === 0 && <li className="text-[#111]/55">{look ? "A season look. Enquire to have it made." : "No pieces in this group."}</li>}
                </ul>
                {look && (
                  <Link href={`/line/looks/${look.slug}`} className="mt-3 inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                    Open look
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="button" onClick={transfer} className="inline-flex h-12 items-center bg-[#111] px-5 text-[11px] tracking-[0.16em] text-[#f7f7f5] uppercase">Add selected to bag</button>
        {undo && (
          <button type="button" className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4" onClick={() => { closet.commit(restorePiece(closet.data, undo)); setUndo(null); setReport("Restored."); }}>
            Undo remove
          </button>
        )}
        <Link href="/wardrobe#introduction" className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Enquire</Link>
        <Link href="/shop#1101" className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Shop runners</Link>
      </div>
      <p className="sr-only" aria-live="polite">{report}</p>
      {report && <p className="mt-4 max-w-xl text-sm leading-relaxed">{report}</p>}
    </div>
  );
}
