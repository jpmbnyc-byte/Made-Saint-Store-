"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SIZES, shipWindow } from "@/lib/business";

const short = (name: string) => name.replace("Runner, ", "");

const RUNNER_VIEWS = [
  { src: "/stories/chalk-threequarter.webp", alt: "Chalk founding runner, three-quarter view", label: "Chalk" },
  { src: "/stories/navy-intrecciato.webp", alt: "Navy Intrecciato founding runner", label: "Navy Intrecciato" },
  { src: "/stories/washed-denim.webp", alt: "Washed Denim founding runner", label: "Washed Denim" },
];

export function RunnerChapter() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const [active, setActive] = useState(0);
  const product = launch[active];
  const view = RUNNER_VIEWS[active];

  if (!product || !view) return null;

  return (
    <section
      id="runner-1101"
      className="scroll-mt-24 ms-stone ms-grain border-t border-[#1c1a17]/08"
      aria-labelledby="runner-heading"
    >
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="ms-light-pool"
          style={{
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, rgba(240,220,180,0.22), transparent 70%)",
            top: "10%",
            right: "5%",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] items-center gap-10 px-5 py-16 md:py-24 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-8">
        {/* Image panel */}
        <div className="relative mb-10 lg:mb-0">
          <div className="ms-resin relative aspect-[3/4] overflow-hidden bg-[#ede6d8]">
            {RUNNER_VIEWS.map((v, i) => (
              <Image
                key={v.src}
                src={v.src}
                alt={v.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain"
                priority={i === 0}
                style={{
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 500ms ease",
                  position: "absolute",
                  inset: 0,
                }}
              />
            ))}
          </div>

          {/* Colorway selectors */}
          <div className="mt-4 flex gap-2" role="tablist" aria-label="Colorway">
            {RUNNER_VIEWS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="h-10 border px-3 text-[11px] tracking-[0.14em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a17]"
                style={{
                  borderColor: i === active ? "#1c1a17" : "rgba(28,26,23,0.20)",
                  background: i === active ? "#1c1a17" : "transparent",
                  color: i === active ? "#f5f0e8" : "#1c1a17",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Copy panel */}
        <div>
          <p className="text-[11px] tracking-[0.28em] text-[#B03236] uppercase">1101 · Inaugural Series</p>
          <h2
            id="runner-heading"
            className="mt-4 font-serif leading-[0.93] text-[#1c1a17]"
            style={{ fontSize: "clamp(48px, 5.5vw, 80px)", letterSpacing: "-0.035em" }}
          >
            {short(product.name)}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#41505b]">{product.line}.</p>
          <p className="mt-2 font-serif text-4xl tabular-nums text-[#2a3746]">${product.usd}</p>
          <p className="mt-2 text-[13px] text-[#8d7349]">
            Ships {shipWindow()} if the run is confirmed.
          </p>

          {/* Materials */}
          <ul className="mt-6 space-y-2 border-t border-[#1c1a17]/10 pt-6">
            {product.materials.map((m) => (
              <li key={m} className="flex gap-2 text-[14px] text-[#41505b]">
                <span className="mt-[0.4em] block size-1 shrink-0 rounded-full bg-[#B03236]" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>

          {/* Size preview */}
          <div className="mt-8">
            <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/55 uppercase">US Men&apos;s</p>
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
            <p className="mt-2 text-[12px] text-[#1c1a17]/50">Select your exact size on the product page. Between sizes, take the half size up.</p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/shop/${product.id}`}
              className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.18em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Explore 1101
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center border border-[#1c1a17]/30 px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]"
            >
              All colorways
            </Link>
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-[#1c1a17]/45">
            No payment today. A pair is cut only after the run is confirmed. US men&apos;s 7 through 12 only.
          </p>
        </div>
      </div>
    </section>
  );
}
