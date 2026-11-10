"use client";

import { useState } from "react";
import Link from "next/link";
import { SIZES } from "@/lib/business";
import { addPiece, addToBag, decideBag, hasPiece, loadBag, writeBag } from "@/lib/closet";
import { useBag, useCloset } from "@/components/line/store";

export function SaveRunner({ productId, color }: { productId: string; color: string }) {
  const closet = useCloset();
  const bag = useBag();
  const [size, setSize] = useState("");
  const [note, setNote] = useState("");
  const saved = hasPiece(closet.data, { productRef: productId, color, size, lookId: "" });

  function persistBag(next: ReturnType<typeof addToBag>) {
    const store = {
      getItem: (key: string) => localStorage.getItem(key),
      setItem: (key: string, value: string) => localStorage.setItem(key, value),
    };
    try {
      writeBag(store, next.bag);
      window.dispatchEvent(new Event("ms-store"));
    } catch {
      bag.commit(next.bag);
    }
  }

  return (
    <div className="mt-6 border-t border-[#1c1a17]/10 pt-6">
      <p className="text-[11px] tracking-[0.14em] uppercase">My Closet</p>
      <label className="mt-3 block text-[13px]">
        Size for the closet
        <select value={size} onChange={(event) => setSize(event.target.value)} className="mt-2 h-11 w-full border border-[#1c1a17]/20 bg-white px-3">
          <option value="">Not chosen</option>
          {SIZES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex h-11 items-center border border-[#1c1a17] px-4 text-[11px] tracking-[0.14em] uppercase"
          onClick={() => {
            if (saved) {
              setNote("This pair is already in My Closet.");
              return;
            }
            closet.commit(addPiece(closet.data, { productRef: productId, kind: "runner", color, size, lookId: "" }, new Date().toISOString()));
            setNote(size ? "Saved. Request the pair below, or add it to the bag from here." : "Saved. Choose a size before purchase.");
          }}
        >
          {saved ? "In Closet" : "Add to Closet"}
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center bg-[#1c1a17] px-4 text-[11px] tracking-[0.14em] text-[#f5f0e8] uppercase"
          onClick={() => {
            const decision = decideBag({ productRef: productId, kind: "runner", size, launch: true });
            const store = {
              getItem: (key: string) => localStorage.getItem(key),
              setItem: (key: string, value: string) => localStorage.setItem(key, value),
            };
            const next = addToBag(loadBag(store), [decision]);
            persistBag(next);
            if (!decision.ok) setNote(decision.reason);
            else if (next.alreadyThere.length) setNote("This pair is already in the bag.");
            else setNote("Recorded in the bag. Payment is taken on the pair page, not here.");
          }}
        >
          Add to bag
        </button>
        <Link href="/closet" className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">My Closet</Link>
        <Link href="/bag" className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Bag</Link>
      </div>
      <p className="mt-2 text-[13px] text-[#1c1a17]/65">Saving does not reserve the pair or start payment. A sized pair can be requested below.</p>
      {note && <p className="mt-2 text-sm">{note}</p>}
    </div>
  );
}
