"use client";

import { useState } from "react";
import Link from "next/link";
import { SIZES } from "@/lib/business";
import { addPiece } from "@/lib/closet";
import { useCloset } from "@/components/line/store";

export function SaveRunner({ productId, color }: { productId: string; color: string }) {
  const closet = useCloset();
  const [size, setSize] = useState("");
  const [note, setNote] = useState("");
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
      <button
        type="button"
        className="mt-3 inline-flex h-11 items-center border border-[#1c1a17] px-4 text-[11px] tracking-[0.14em] uppercase"
        onClick={() => {
          closet.commit(addPiece(closet.data, { productRef: productId, kind: "runner", color, size, lookId: "" }, new Date().toISOString()));
          setNote(size ? "Saved. It is not in the bag until you add it from My Closet." : "Saved. Choose a size before purchase.");
        }}
      >
        Add to Closet
      </button>
      <p className="mt-2 text-[13px] text-[#1c1a17]/65">Saving does not reserve the pair or start payment.</p>
      {note && <p className="mt-2 text-sm">{note} <Link href="/closet" className="underline underline-offset-4">My Closet</Link></p>}
    </div>
  );
}
