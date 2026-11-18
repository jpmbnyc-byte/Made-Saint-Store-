"use client";

import { useState } from "react";
import type { SeriesStory } from "@/lib/series-story";

export function SeriesStoryPanel({ story, leadColorway }: { story: SeriesStory; leadColorway: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="ms-atelier-origin border-t border-[#dfd6ca]" aria-labelledby="origin-title">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-[4.5%] py-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:py-20 lg:py-24">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.22em] text-[#352a23] uppercase md:text-[12px]">{story.date}</p>
          <h2 id="origin-title" className="mt-6 font-serif text-[clamp(2.75rem,5.8vw,5.3rem)] leading-[1.08] tracking-[-0.025em] text-[#352a23]">
            {story.title}
          </h2>
          <p className="mt-8 text-[11px] tracking-[0.18em] text-[#352a23] uppercase">{story.feast}</p>
          <blockquote className="mt-10 max-w-xl font-serif text-[19px] leading-[1.65] text-[#352a23] italic md:text-[22px]">
            {story.quote}
          </blockquote>
          <button
            type="button"
            className="mt-10 border-b border-[#352a23] pb-1.5 text-left text-[10px] tracking-[0.13em] uppercase md:text-[11px]"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Close the founder’s reflection" : "Read the founder’s reflection"}
          </button>
        </div>
        <div className="min-w-0 bg-[#ece3d5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.detail}
            alt={`${story.series} materials and stitching, close view`}
            className={`w-full object-cover ${story.series === "1213" ? "aspect-square object-[50%_70%] md:aspect-auto md:h-[610px]" : "aspect-square md:aspect-auto md:h-[610px]"}`}
            loading="lazy"
          />
        </div>
        {expanded ? (
          <div className="md:col-span-2 mx-auto mt-4 max-w-[760px] border-t border-[#dfd6ca] pt-10 text-[17px] leading-[1.85] text-[#352a23] md:text-[18px]">
            <p className="mb-7 text-[11px] tracking-[0.22em] uppercase">From the founder · {story.series}</p>
            {story.reflection.map((paragraph) => (
              <p key={paragraph} className="mb-5">
                {paragraph}
              </p>
            ))}
            <p className="italic">— Founder, MADE SAiNT</p>
            <p className="mt-8 text-[13px] leading-relaxed text-[#75695d]">
              The date follows the Catholic calendar. The meaning of the digits is the founder’s personal reflection.
            </p>
            {!leadColorway ? (
              <p className="mt-4 text-[13px] leading-relaxed text-[#75695d]">
                Material notes below describe this colourway. The reflection belongs to the series as a whole.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function ProductBreakdown({
  parts,
  facts,
  leadName,
}: {
  parts: string[];
  facts: string[];
  leadName: string;
}) {
  return (
    <section className="ms-atelier-breakdown mx-auto max-w-[1600px] border-t border-[#dfd6ca] px-[4.5%] py-12 md:py-16">
      <p className="text-[11px] tracking-[0.22em] text-[#352a23] uppercase md:text-[12px]">
        Product breakdown <span className="tracking-[0.09em] text-[#75695d]">/ {leadName}</span>
      </p>
      <div className="mt-8 grid gap-0 md:grid-cols-3">
        {parts.map((part, index) => (
          <details
            key={part}
            className="border-b border-[#dfd6ca] py-5 md:border-b-0 md:border-r md:px-7 md:py-0 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[32px] leading-tight text-[#352a23] md:text-[40px]">
              {part}
              <span className="text-base text-[#75695d]">▾</span>
            </summary>
            <p className="mt-5 text-[15px] leading-relaxed text-[#75695d] md:text-[16px]">{facts[index]}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
