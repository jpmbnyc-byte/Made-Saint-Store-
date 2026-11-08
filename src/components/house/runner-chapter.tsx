"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LEAD_TIME, PRODUCTS, SERIES_PLATE, SIZES } from "@/lib/business";

const short = (name: string) => name.replace("Runner, ", "");

/**
 * Colorway map — links product IDs to verified image assets.
 * Add new colorways here when assets are confirmed by the founder.
 * Each colorway needs: a lateral or three-quarter view as the primary image,
 * and an optional on-model or overhead secondary.
 *
 * PENDING: New colorways to be assigned when founder uploads assets.
 */
export const RUNNER_COLORWAY_VIEWS: Record<
  string,
  { primary: string; primaryAlt: string; secondary?: string; secondaryAlt?: string; label: string }
> = {
  "ms-runner-chalk-navy": {
    primary: "/runners/navy-ivory-pair.webp",
    primaryAlt: "MADE SAiNT 0929 Runner — Navy / Ivory, the pair",
    secondary: "/runners/navy-ivory-overhead.webp",
    secondaryAlt: "MADE SAiNT 0929 Runner — Navy / Ivory, overhead",
    label: "Navy / Ivory",
  },
  "ms-runner-navy-intrecciato": {
    primary: "/runners/navy-sand-lateral.webp",
    primaryAlt: "MADE SAiNT 0929 Runner — Navy / Sand, lateral",
    secondary: "/runners/navy-sand-overhead.webp",
    secondaryAlt: "MADE SAiNT 0929 Runner — Navy / Sand, overhead",
    label: "Navy / Sand",
  },
  "ms-runner-washed-denim": {
    primary: "/runners/indigo-pair.webp",
    primaryAlt: "MADE SAiNT 0929 Runner — Washed / Indigo, the pair",
    secondary: "/runners/indigo-overhead.webp",
    secondaryAlt: "MADE SAiNT 0929 Runner — Washed / Indigo, overhead",
    label: "Washed / Indigo",
  },
  // New colorways — add when founder uploads assets:
  // "ms-runner-[id]": {
  //   primary: "/stories/[id].webp",
  //   primaryAlt: "...",
  //   label: "...",
  // },
};

export function RunnerChapter() {
  const launch = PRODUCTS.filter((p) => p.launch && p.series === "0929");
  const [activeId, setActiveId] = useState("ms-runner-chalk-navy");
  const product = launch.find((p) => p.id === activeId) ?? launch[0];
  const view = product ? RUNNER_COLORWAY_VIEWS[product.id] : null;

  if (!product || !view) return null;

  return (
    <section
      id="runner-1101"
      className="relative scroll-mt-24 border-t border-[#1c1a17]/08 bg-[#f5f0e8]"
      aria-labelledby="runner-heading"
    >
      {/* Warm limestone ambient surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 15%, rgba(240,220,180,0.28), transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(210,195,160,0.18), transparent 55%)",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/brand/grain.svg')",
          backgroundSize: "180px 180px",
          opacity: 0.08,
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:py-24 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:px-8">

        {/* Image panel */}
        <div className="relative mb-10 lg:mb-0">
          <div
            className="ms-resin relative overflow-hidden bg-[#ede6d8]"
            style={{ aspectRatio: "3/4" }}
          >
            {/* Primary image */}
            {launch.map((p) => {
              const v = RUNNER_COLORWAY_VIEWS[p.id];
              if (!v) return null;
              return (
                <Image
                  key={p.id}
                  src={v.primary}
                  alt={v.primaryAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-contain"
                  priority={p.id === launch[0]?.id}
                  style={{
                    opacity: p.id === activeId ? 1 : 0,
                    transition: "opacity 480ms ease",
                    position: "absolute",
                    inset: 0,
                  }}
                />
              );
            })}
          </div>

          {/* Colorway selectors */}
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="0929 colorway">
            {launch.map((p) => {
              const v = RUNNER_COLORWAY_VIEWS[p.id];
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(p.id)}
                  className="h-10 border px-4 text-[11px] tracking-[0.14em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a17]"
                  style={{
                    borderColor: isActive ? "#1c1a17" : "rgba(28,26,23,0.20)",
                    background: isActive ? "#1c1a17" : "transparent",
                    color: isActive ? "#f5f0e8" : "#1c1a17",
                  }}
                >
                  {v?.label ?? short(p.name)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Copy panel — Bible voice: short, emotionally direct, precise */}
        <div>
          <img src={SERIES_PLATE["0929"].src} alt={SERIES_PLATE["0929"].alt} className="h-16 w-auto max-w-full object-contain object-left sm:h-20" />

          {/* Headline: product name, large and serif — no decoration */}
          <h2
            id="runner-heading"
            className="mt-4 font-serif leading-[0.93] text-[#1c1a17]"
            style={{ fontSize: "clamp(28px, 3.4vw, 52px)", letterSpacing: "-0.03em" }}
          >
            {short(product.name)}
          </h2>

          {/* Line — precise material description per Bible §04 */}
          <p className="mt-5 text-[16px] leading-relaxed text-[#41505b]">
            {product.line}.
          </p>

          {/* Price — clear, tabular, no commentary */}
          <p className="mt-3 font-serif text-[36px] tabular-nums leading-none text-[#1c1a17]">
            ${product.usd}
          </p>
          <p className="mt-1.5 text-[13px] text-[#8d7349]">
            Available · made to order · ready in {LEAD_TIME}.
          </p>

          {/* Materials — verified per Bible §04 "precise product language" */}
          <ul className="mt-7 space-y-2.5 border-t border-[#1c1a17]/10 pt-6">
            {product.materials.map((m) => (
              <li key={m} className="flex items-start gap-2.5 text-[14px] text-[#41505b]">
                <span
                  className="mt-[0.45em] block size-1 shrink-0 rounded-full bg-[#B03236]"
                  aria-hidden="true"
                />
                {m}
              </li>
            ))}
          </ul>

          {/* Size — simple, legible, no ambiguity */}
          <div className="mt-7">
            <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/55 uppercase">
              US Men&apos;s 7 – 12
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {SIZES.map((size) => (
                <span
                  key={size}
                  className="grid h-9 w-11 place-items-center border border-[#1c1a17]/15 text-[12px] tabular-nums text-[#2a3746]"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/shop/${product.id}`}
              className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.18em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Request this pair
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center border border-[#1c1a17]/30 px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]"
            >
              All colorways
            </Link>
          </div>

          {/* No-payment note — per Bible: honest, no exaggerated claims */}
          <p className="mt-5 text-[12px] leading-relaxed text-[#1c1a17]/40">
            Made to order. Ready in {LEAD_TIME}. No payment is taken until checkout is connected.
          </p>
        </div>
      </div>
    </section>
  );
}
