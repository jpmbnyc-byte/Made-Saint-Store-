"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type LineCard = {
  ref: string;
  name: string;
  tier: string;
  category: string;
  colors: string;
  retail: number | null;
  status: "proposed" | "held";
  image: string | null;
  alt: string;
};

const TIERS = ["All", "CORE", "VELOCITY", "GRAIL"] as const;

export function LineBrowser({ cards }: { cards: LineCard[] }) {
  const [tier, setTier] = useState<(typeof TIERS)[number]>("All");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => ["All", ...Array.from(new Set(cards.map((card) => card.category)))], [cards]);
  const [category, setCategory] = useState("All");

  const shown = cards.filter((card) => {
    if (tier !== "All" && card.tier !== tier) return false;
    if (category !== "All" && card.category !== category) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${card.ref} ${card.name} ${card.category} ${card.colors}`.toLowerCase().includes(q);
  });

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-4 border-b border-[#1c1a17]/12 pb-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-2">
          {TIERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTier(item)}
              className={`h-11 border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a17] ${tier === item ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/20"}`}
            >
              {item === "All" ? "All tiers" : item}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Name, code, color"
          className="h-11 w-full border border-[#1c1a17]/20 bg-white px-3 text-base md:w-64"
        />
      </div>
      <div className="mt-4 flex min-w-0 gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`inline-flex h-11 shrink-0 items-center border-b px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a17] ${category === item ? "border-[#1c1a17] text-[#1c1a17]" : "border-transparent text-[#1c1a17]/60"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-[#1c1a17]/55">{shown.length} styles</p>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((card) => (
          <li key={card.ref}>
            <Link href={`/line/${card.ref.toLowerCase()}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f1eee8]">
                {card.image && <img src={card.image} alt={card.alt} className="absolute inset-0 h-full w-full object-contain" />}
              </div>
              <p className="mt-3 text-sm text-[#1c1a17]/55">{card.tier} · {card.ref}</p>
              <h2 className="mt-1 font-serif text-xl leading-tight group-hover:underline">{card.name}</h2>
              <p className="mt-1 text-sm tabular-nums">{card.retail != null ? `$${card.retail.toLocaleString("en-US")}` : "Held"}</p>
              <p className="mt-1 text-sm text-[#1c1a17]/60">Proposed list price</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
