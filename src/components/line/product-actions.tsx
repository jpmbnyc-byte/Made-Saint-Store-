"use client";

import { useState } from "react";
import Link from "next/link";
import { addPiece, addToBag, decideBag, hasPiece } from "@/lib/closet";
import { useBag, useCloset } from "@/components/line/store";
import { listPriceFor, formatUsd } from "@/lib/pricing";

const GARMENT_SIZES = ["", "S", "M", "L", "XL"];
/** Bag sizes until measured dimensions are published. */
const BAG_SIZES = ["", "Standard"];

export function ProductActions({
  refId,
  name,
  color,
  category,
  lookSlug,
  image,
}: {
  refId: string;
  name: string;
  color: string;
  category?: string;
  lookSlug?: string;
  image?: string;
}) {
  const closet = useCloset();
  const bag = useBag();
  const bagCategory = /accessories|bag|duffel|backpack/i.test(category ?? "");
  const preferences = bagCategory ? BAG_SIZES : GARMENT_SIZES;
  const [size, setSize] = useState("");
  const [note, setNote] = useState("");
  const saved = hasPiece(closet.data, { productRef: refId, color, size, lookId: lookSlug ?? "" });
  const price = listPriceFor(refId);
  const enquire = new URLSearchParams({ ref: refId });
  if (color) enquire.set("color", color);
  if (size) enquire.set("size", size);
  if (lookSlug) enquire.set("look", lookSlug);
  if (image) enquire.set("image", image);
  const enquireHref = `/wardrobe?${enquire.toString()}#introduction`;

  return (
    <div className="mt-8 space-y-4">
      {price != null ? (
        <p className="font-serif text-[1.75rem] tabular-nums tracking-[-0.02em]">{formatUsd(price)}</p>
      ) : null}
      <label className="block text-[11px] tracking-[0.14em] uppercase">
        {bagCategory ? "Bag size" : "Size preference"}
        <select
          value={size}
          onChange={(event) => setSize(event.target.value)}
          className="mt-2 h-11 w-full border border-[#111]/20 bg-white px-3 text-base normal-case tracking-normal"
        >
          {preferences.map((item) => (
            <option key={item || "none"} value={item}>
              {item || "Not chosen"}
              {bagCategory && item === "Standard" ? " — measures confirmed with quotation" : ""}
            </option>
          ))}
        </select>
      </label>
      <p className="text-[13px] leading-relaxed text-[#111]/65">
        {bagCategory
          ? "Published bag dimensions are not listed yet. A size here is a preference for checkout quotation."
          : "A size preference helps the quotation. Final size is confirmed before production."}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex h-12 items-center border border-[#111] px-5 text-[11px] tracking-[0.16em] uppercase"
          onClick={() => {
            if (saved) {
              setNote(`${name} is already in My Closet.`);
              return;
            }
            closet.commit(
              addPiece(closet.data, { productRef: refId, kind: "line", color, size, lookId: lookSlug ?? "" }, new Date().toISOString()),
            );
            setNote(`${name} is in My Closet.`);
          }}
        >
          {saved ? "In Closet" : "Add to Closet"}
        </button>
        {price != null ? (
          <button
            type="button"
            className="inline-flex h-12 items-center bg-[#B03236] px-5 text-[11px] tracking-[0.16em] text-white uppercase"
            onClick={() => {
              const decision = decideBag({ productRef: refId, kind: "line", size, launch: false, priced: true });
              const next = addToBag(bag.data, [decision], { kind: "line", color });
              bag.commit(next.bag);
              if (next.added.length) setNote(`${name} is in Checkout.`);
              else if (next.alreadyThere.length) setNote(`${name} is already in Checkout.`);
              else setNote(next.blocked[0]?.reason ?? "Could not add to Checkout.");
            }}
          >
            Add to Checkout
          </button>
        ) : null}
        <Link href={enquireHref} className="inline-flex h-12 items-center border border-[#111] px-5 text-[11px] tracking-[0.16em] uppercase">
          Enquire
        </Link>
        <Link href="/bag" className="inline-flex h-12 items-center px-3 text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
          Checkout
        </Link>
      </div>
      <p className="text-[13px] text-[#111]/70">
        List prices follow the house register. Apparel is confirmed by quotation before production.
      </p>
      <p className="sr-only" aria-live="polite">
        {note}
      </p>
      {note && <p className="text-sm">{note}</p>}
      {closet.warning && <p className="text-sm">{closet.warning}</p>}
    </div>
  );
}
