"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CATEGORIES, PALETTES, PIECES, TIERS, inTier, usd,
  type CategoryId, type PaletteId, type TierId,
} from "@/lib/wardrobe";

const TIER_ORDER: TierId[] = ["private", "signature", "atelier"];

export function WardrobeCatalog() {
  const [tier, setTier] = useState<TierId>("private");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [pal, setPal] = useState<PaletteId | "all">("all");

  const list = useMemo(() => {
    return PIECES.filter((p) => inTier(p, tier) && (cat === "all" || p.category === cat) && (pal === "all" || p.palettes.includes(pal)));
  }, [tier, cat, pal]);

  const t = TIERS[tier];
  const withImage = list.filter((p) => p.image).length;

  return (
    <div className="border-t border-[#1c1a17]/15 bg-[#f6f4ef] text-[#1c1a17]">
      <header className="border-b border-[#1c1a17]/10">
        <div className="mx-auto flex max-w-[1320px] items-end justify-between gap-6 px-5 py-8 md:px-8">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Visual register · {t.name}</p>
            <h2 className="mt-2 font-serif text-[36px] leading-none md:text-[48px]">{t.name} menu</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#1c1a17]/70">{t.idea} Higher tiers inherit every piece below them.</p>
          </div>
          <p className="shrink-0 font-serif text-3xl tabular-nums md:text-4xl">{usd(t.price)}<span className="ml-2 text-sm tracking-[0.16em] text-[#1c1a17]/50 uppercase">/ year</span></p>
        </div>
        <div className="mx-auto flex max-w-[1320px] flex-wrap gap-x-6 gap-y-2 px-5 pb-5 text-[11px] tracking-[0.16em] text-[#1c1a17]/55 uppercase md:px-8">
          <span>{t.garments} garments</span>
          <span>{t.looks} coordinated looks</span>
          <span>{t.deliveries} deliveries</span>
          <span>{t.palettes} palettes</span>
        </div>
      </header>

      <div className="sticky top-0 z-20 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-2 px-5 py-3 md:px-8">
          {TIER_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => setTier(id)}
              className={`px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase ${tier === id ? "bg-[#1c1a17] text-[#f6f4ef]" : "text-[#1c1a17]/65 hover:text-[#1c1a17]"}`}
            >
              {TIERS[id].name}
            </button>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-[#1c1a17]/15 sm:block" />
          <button onClick={() => setCat("all")} className={`text-[11px] tracking-[0.14em] uppercase ${cat === "all" ? "text-[#1c1a17]" : "text-[#1c1a17]/50"}`}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`text-[11px] tracking-[0.14em] uppercase ${cat === c.id ? "text-[#1c1a17]" : "text-[#1c1a17]/50"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-6 px-5 pb-3 md:px-8">
          <button onClick={() => setPal("all")} className={`text-[11px] tracking-[0.14em] uppercase ${pal === "all" ? "text-[#1c1a17]" : "text-[#1c1a17]/45"}`}>All palettes</button>
          {(Object.keys(PALETTES) as PaletteId[]).map((id) => (
            <button key={id} onClick={() => setPal(id)} className="flex items-center gap-2">
              <span className="flex">
                {PALETTES[id].chips.map((c) => (
                  <span key={c.hex} className="size-3.5 border border-black/10" style={{ background: c.hex }} />
                ))}
              </span>
              <span className={`text-[11px] tracking-[0.14em] uppercase ${pal === id ? "text-[#1c1a17]" : "text-[#1c1a17]/45"}`}>{PALETTES[id].name}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1320px] px-5 py-10 md:px-8">
        <p className="mb-6 text-[11px] tracking-[0.16em] text-[#1c1a17]/50 uppercase">
          {list.length} pieces · {withImage} with verified images · {list.length - withImage} image match pending
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((p) => (
            <article key={p.id} className="grid grid-cols-[minmax(0,0.9fr)_1.1fr] overflow-hidden border border-[#1c1a17]/12 bg-white">
              <div className="relative min-h-[220px] bg-[#ebe6dc]">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 28vw, 90vw" className="object-cover" />
                ) : (
                  <div className="flex h-full min-h-[220px] items-center justify-center px-4 text-center">
                    <p className="text-[12px] tracking-[0.16em] text-[#1c1a17]/40 uppercase">Image<br />match pending</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between p-4 md:p-5">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-[#9a3b2c]">{p.code}</p>
                  <h2 className="mt-1 font-serif text-2xl leading-tight">{p.name}</h2>
                  <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17]/50 uppercase">
                    {CATEGORIES.find((c) => c.id === p.category)?.label}
                    <span className="mx-2">·</span>
                    {p.palettes.map((id) => PALETTES[id].name).join(" / ")}
                  </p>
                  <div className="mt-2 flex gap-1">
                    {p.chips.map((c) => (
                      <span key={c.name + c.hex} title={c.name} className="size-4 border border-black/10" style={{ background: c.hex }} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-[12px] text-[#1c1a17]/60">{p.material}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-[12px] leading-relaxed text-[#1c1a17]/50">
          Archived design images. Physical samples and material approval pending. Color chips are editorial
          approximations, not mill-approved lab dips. Package prices and garment counts are commercial targets.
          R001–R067 are internal archive keys, not saleable SKUs. Footwear is an allocation exchange and does not
          use the apparel made-to-measure workflow.
        </p>
      </main>
    </div>
  );
}
