"use client";

import { useState } from "react";
import Link from "next/link";
import { addPiece, hasPiece } from "@/lib/closet";
import { useCloset } from "@/components/line/store";

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
  const bag = /accessories|bag|duffel|backpack/i.test(category ?? "");
  const preferences = bag ? BAG_SIZES : GARMENT_SIZES;
  const [size, setSize] = useState("");
  const [note, setNote] = useState("");
  const saved = hasPiece(closet.data, { productRef: refId, color, size, lookId: lookSlug ?? "" });
  const enquire = new URLSearchParams({ ref: refId });
  if (color) enquire.set("color", color);
  if (size) enquire.set("size", size);
  if (lookSlug) enquire.set("look", lookSlug);
  if (image) enquire.set("image", image);
  const enquireHref = `/wardrobe?${enquire.toString()}#introduction`;

  return (
    <div className="mt-8 space-y-4">
      <label className="block text-[11px] tracking-[0.14em] uppercase">
        {bag ? "Bag size" : "Size preference"}
        <select value={size} onChange={(event) => setSize(event.target.value)} className="mt-2 h-11 w-full border border-[#111]/20 bg-white px-3 text-base normal-case tracking-normal">
          {preferences.map((item) => (
            <option key={item || "none"} value={item}>
              {item || "Not chosen"}
              {bag && item === "Standard" ? " — measures confirmed with enquiry" : ""}
            </option>
          ))}
        </select>
      </label>
      <p className="text-[13px] leading-relaxed text-[#111]/65">
        {bag
          ? "Published bag dimensions are not listed yet. A size here is a preference for the enquiry, not a confirmed measure."
          : "A size here is a preference for the enquiry. It is not a confirmed size run, and it is not a purchase."}
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
            closet.commit(addPiece(closet.data, { productRef: refId, kind: "line", color, size, lookId: lookSlug ?? "" }, new Date().toISOString()));
            setNote(size ? `${name} is in My Closet.` : `${name} is in My Closet. Choose a size before any purchase.`);
          }}
        >
          {saved ? "In Closet" : "Add to Closet"}
        </button>
        <Link href={enquireHref} className="inline-flex h-12 items-center bg-[#111] px-5 text-[11px] tracking-[0.16em] text-[#f7f7f5] uppercase">
          Enquire
        </Link>
        <Link href="/closet" className="inline-flex h-12 items-center px-3 text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
          My Closet
        </Link>
      </div>
      <p className="text-[13px] text-[#111]/70">This style is made through an enquiry.</p>
      <p className="sr-only" aria-live="polite">{note}</p>
      {note && <p className="text-sm">{note}</p>}
      {closet.warning && <p className="text-sm">{closet.warning}</p>}
    </div>
  );
}
