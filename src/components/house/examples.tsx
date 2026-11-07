"use client";

import { useState } from "react";
import Image from "next/image";
import { OCCASIONS, listedLooks, lookFrame, reserveTotal, type Look } from "@/lib/looks";
import { Lookbooks } from "@/components/house/lookbooks";
import { CardRail } from "@/components/house/slider";

function openLook(id: string, onOpen: (id: string) => void) {
  onOpen(id);
  document.getElementById("looks")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LookCard({ look, onOpen }: { look: Look; onOpen: (id: string) => void }) {
  const room = OCCASIONS.find((item) => item.id === look.occasion);
  const pair = reserveTotal(look);
  return (
    <button
      type="button"
      onClick={() => openLook(look.id, onOpen)}
      className="w-[78%] shrink-0 snap-start text-left sm:w-[46%] lg:w-[32%]"
    >
      <span className="relative block aspect-[3/4] overflow-hidden bg-[#f7f4ef]">
        <Image src={look.image} alt={look.alt} fill sizes="(min-width: 1024px) 32vw, 78vw" className={lookFrame(look)} />
      </span>
      <span className="mt-3 block text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">{room?.title}</span>
      <span className="mt-1 block font-serif text-3xl text-[#2a3746]">{look.name}</span>
      <span className="mt-2 block text-[13px] leading-relaxed text-[#41505b]">
        {pair > 0 ? `A founding pair is listed at $${pair}. The clothes are requested with the house.` : "The clothes are requested with the house."}
      </span>
    </button>
  );
}

export function HouseLooks() {
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <>
      <section id="examples" className="scroll-mt-24 border-t border-[#41505b]/10">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Examples</p>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#2a3746]">Open the day you are dressing for.</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#41505b]">
            A look with a photograph large enough to show. A founding pair, when one is listed, is separate from the clothes.
          </p>
          <div className="mt-8">
            <CardRail label="Look" count={listedLooks().length}>
              {listedLooks().map((look) => (
                <LookCard key={look.id} look={look} onOpen={setFocus} />
              ))}
            </CardRail>
          </div>
        </div>
      </section>
      <section id="looks" className="scroll-mt-24 border-t border-[#41505b]/10">
        <Lookbooks focusLookId={focus} />
      </section>
    </>
  );
}
