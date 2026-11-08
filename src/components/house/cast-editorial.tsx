/**
 * Cast editorial strip.
 * Portraits are reference images per MS Bible v1.1 §05.
 * Names and character copy are suppressed until founder confirms assignments.
 * Third-party brands in reference images are styling references only.
 */

import Image from "next/image";
import { CAST } from "@/data/cast";

export function CastEditorial() {
  return (
    <section
      className="relative overflow-hidden border-t border-[#1c1a17]/10 bg-[#1a2232]"
      aria-labelledby="cast-heading"
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url('/brand/grain.svg')",
          backgroundSize: "180px 180px",
          opacity: 0.07,
          mixBlendMode: "screen",
        }}
      />

      {/* Header */}
      <div className="relative z-[2] mx-auto max-w-[1200px] px-5 pb-0 pt-14 md:px-8 md:pt-20">
        <p className="text-[11px] tracking-[0.28em] text-[#c0a477] uppercase">Campaign 001</p>
        <h2
          id="cast-heading"
          className="mt-3 font-serif text-[#f5f0e8]"
          style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em", lineHeight: 0.97 }}
        >
          Once sinner.
          <br />
          <em className="italic">Made Saint.</em>
        </h2>
        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#f5f0e8]/55">
          Five characters. One campaign. Shot on location and in studio.
          <br />
          <span className="mt-1 block text-[12px] text-[#f5f0e8]/30">
            Reference cast — names and character assignments pending founder approval.
          </span>
        </p>
      </div>

      {/* Portrait strip — horizontal scroll on mobile, asymmetric grid on desktop */}
      <div className="relative z-[2] mt-10 md:mt-14">
        {/* Mobile: horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto px-5 pb-10 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {CAST.map((c, i) => (
            <figure
              key={c.id}
              className="shrink-0"
              style={{ width: i === 4 ? "56vw" : "52vw" }}
            >
              <div
                className="ms-resin relative overflow-hidden bg-[#2a3030]"
                style={{ aspectRatio: i % 2 === 0 ? "3/4" : "2/3" }}
              >
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="52vw"
                  className="object-cover object-top"
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{ filter: i === 1 || i === 2 ? "grayscale(1)" : "none" }}
                />
              </div>
              <figcaption className="mt-2 text-[10px] tracking-[0.2em] text-[#f5f0e8]/30 uppercase">
                {c.archetype}
              </figcaption>
            </figure>
          ))}
          {/* Sixth slot placeholder */}
          <figure className="shrink-0" style={{ width: "52vw" }}>
            <div
              className="relative flex items-center justify-center overflow-hidden border border-dashed border-[#f5f0e8]/15 bg-[#1a2232]"
              style={{ aspectRatio: "3/4" }}
            >
              <span className="text-[11px] tracking-[0.2em] text-[#f5f0e8]/20 uppercase">Cast 06</span>
            </div>
            <figcaption className="mt-2 text-[10px] tracking-[0.2em] text-[#f5f0e8]/20 uppercase">
              Pending
            </figcaption>
          </figure>
        </div>

        {/* Desktop: asymmetric 5-column editorial grid */}
        <div className="hidden grid-cols-5 items-end gap-2 px-5 pb-14 md:grid md:px-8">
          {CAST.map((c, i) => {
            const heights = ["aspect-[3/4]", "aspect-[2/3]", "aspect-[3/4]", "aspect-[2/3]", "aspect-[3/4]"];
            const offsets = ["mb-0", "mb-10", "mb-0", "mb-14", "mb-6"];
            const isMonochrome = i === 1 || i === 2;
            return (
              <figure key={c.id} className={offsets[i]}>
                <div className={`ms-resin relative overflow-hidden bg-[#2a3030] ${heights[i]}`}>
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="20vw"
                    className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                    loading={i < 2 ? "eager" : "lazy"}
                    style={{ filter: isMonochrome ? "grayscale(1)" : "none" }}
                  />
                </div>
                <figcaption className="mt-3 text-[10px] tracking-[0.22em] text-[#f5f0e8]/30 uppercase">
                  {c.archetype}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
