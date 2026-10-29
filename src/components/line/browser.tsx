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
    <div>
      <div className="flex flex-col gap-4 border-b border-[#1c1a17]/12 pb-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-2">
          {TIERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTier(item)}
              className={`border px-3 py-2 text-[11px] tracking-[0.14em] uppercase ${tier === item ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/20"}`}
            >
              {item === "All" ? "All tiers" : item}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Name, code, color"
          className="h-11 w-full border border-[#1c1a17]/20 bg-white px-3 text-sm md:w-64"
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`shrink-0 border-b px-1 py-2 text-[11px] tracking-[0.12em] uppercase ${category === item ? "border-[#1c1a17]" : "border-transparent text-[#1c1a17]/50"}`}
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
                {card.image ? (
                  <img src={card.image} alt={card.alt} className="absolute inset-0 h-full w-full object-contain" />
                ) : (
                  <div className="flex h-full items-end p-3">
                    <p className="text-[11px] tracking-[0.14em] text-[#1c1a17]/45 uppercase">Photograph not assigned</p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-[11px] tracking-[0.14em] text-[#1c1a17]/45 uppercase">{card.tier} · {card.ref}</p>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-2xl leading-none group-hover:underline">{card.name}</h2>
                <p className="shrink-0 text-sm tabular-nums">{card.retail != null ? `$${card.retail.toLocaleString("en-US")}` : "Held"}</p>
              </div>
              <p className="mt-1 text-[12px] text-[#1c1a17]/55">{card.status === "held" ? "No price until the record is reconciled" : "Proposed list price"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
