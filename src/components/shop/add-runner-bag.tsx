"use client";

import Link from "next/link";
import { useState } from "react";
import { addToBag, decideBag } from "@/lib/closet";
import { useBag } from "@/components/line/store";

export function AddRunnerBag({ productId, launch }: { productId: string; launch: boolean }) {
  const bag = useBag();
  const [size, setSize] = useState("");
  const [note, setNote] = useState("");
  const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];

  return (
    <div className="mt-4 space-y-3">
      <label className="block text-[11px] tracking-[0.14em] uppercase">
        Add to Checkout · size
        <select
          value={size}
          onChange={(event) => setSize(event.target.value)}
          className="mt-2 h-11 w-full border border-[#1c1a17]/20 bg-white px-3 text-base normal-case tracking-normal"
        >
          <option value="">Choose size</option>
          {sizes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex h-11 items-center border border-[#1c1a17] px-4 text-[11px] tracking-[0.14em] uppercase"
          onClick={() => {
            const decision = decideBag({ productRef: productId, kind: "runner", size, launch });
            const next = addToBag(bag.data, [decision], { kind: "runner" });
            bag.commit(next.bag);
            if (next.added.length) setNote("Added to Checkout.");
            else if (next.alreadyThere.length) setNote("Already in Checkout.");
            else setNote(next.blocked[0]?.reason ?? "Could not add.");
          }}
        >
          Add to Checkout
        </button>
        <Link href="/bag" className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
          View Checkout
        </Link>
      </div>
      {note ? <p className="text-sm text-[#1c1a17]/70">{note}</p> : null}
    </div>
  );
}
