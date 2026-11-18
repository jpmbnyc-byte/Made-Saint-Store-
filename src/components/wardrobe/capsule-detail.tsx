"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  enquireCapsuleHref,
  type Capsule,
  type CapsuleSide,
  capsuleOutfit,
} from "@/lib/capsules";
import { copy } from "@/lib/copy";

export function CapsuleDetail({ capsule }: { capsule: Capsule }) {
  const [side, setSide] = useState<CapsuleSide>("men");
  const [enlarged, setEnlarged] = useState(false);
  const dialogId = useId();
  const outfit = capsuleOutfit(capsule, side);
  const wardrobe = copy.wardrobe;

  return (
    <article className="bg-[#f7f7f5] text-[#1c1a17]">
      <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14">
        <p className="ms-kicker">Capsule {capsule.number}</p>
        <h1 className="ms-title mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">{capsule.title}</h1>
        <p className="mt-4 max-w-[36rem] text-[15px] leading-relaxed text-[#1c1a17]/65">{capsule.line}</p>

        <figure className="mt-10 md:mt-14">
          <button
            type="button"
            onClick={() => setEnlarged(true)}
            className="group relative block w-full overflow-hidden bg-[#efefed] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349]"
            aria-haspopup="dialog"
            aria-controls={dialogId}
            aria-expanded={enlarged}
          >
            <span className="relative block aspect-[3/2] w-full">
              <Image
                src={capsule.image}
                alt={capsule.alt}
                width={capsule.width}
                height={capsule.height}
                priority
                sizes="(min-width: 1100px) 1100px, 94vw"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="pointer-events-none absolute bottom-3 right-3 bg-[#1c1a17]/75 px-3 py-1.5 text-[10px] tracking-[0.16em] text-[#f7f7f5] uppercase opacity-90 transition-opacity group-hover:opacity-100">
              Enlarge
            </span>
          </button>
          <figcaption className="mt-3 text-[12px] leading-relaxed text-[#1c1a17]/50">
            Men on the left · Women on the right. The full plate stays visible — faces, hems and footwear included.
          </figcaption>
        </figure>

        <div className="mt-10 grid gap-10 border-t border-[#1c1a17]/10 pt-10 md:mt-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 md:pt-14">
          <div>
            <div
              role="tablist"
              aria-label="Outfit side"
              className="flex gap-8 border-b border-[#1c1a17]/10"
            >
              {(
                [
                  { id: "men", label: wardrobe.capsuleMenLabel },
                  { id: "women", label: wardrobe.capsuleWomenLabel },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={side === item.id}
                  onClick={() => setSide(item.id)}
                  className={`h-11 text-[11px] tracking-[0.16em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349] ${
                    side === item.id
                      ? "border-b border-[#1c1a17] text-[#1c1a17]"
                      : "text-[#1c1a17]/45"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-[11px] tracking-[0.14em] text-[#1c1a17]/45 uppercase">
              {side === "men" ? wardrobe.capsuleMenLabel : wardrobe.capsuleWomenLabel}
            </p>
            <p className="mt-3 max-w-[40rem] font-serif text-[1.35rem] leading-snug tracking-[-0.01em] md:text-[1.5rem]">
              {outfit}
            </p>
            <p className="mt-4 max-w-[40rem] text-[14px] leading-relaxed text-[#1c1a17]/55">
              Selecting men or women updates the outfit note only. The photograph remains the paired plate.
            </p>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.14em] text-[#1c1a17]/45 uppercase">Palette</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {capsule.palette.map((swatch) => (
                <li key={swatch.name} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-8 w-8 shrink-0 border border-[#1c1a17]/15"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-[13px]">{swatch.name}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[11px] tracking-[0.14em] text-[#1c1a17]/45 uppercase">Texture</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#1c1a17]/70">{capsule.texture}</p>

            <p className="mt-8 text-[11px] tracking-[0.14em] text-[#1c1a17]/45 uppercase">Color</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#1c1a17]/70">{capsule.colorLogic}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[#1c1a17]/10 pt-10 md:mt-16">
          <Link
            href={enquireCapsuleHref(capsule.slug, side)}
            className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.14em] text-[#f7f7f5] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349]"
          >
            {wardrobe.capsuleEnquireAction}
          </Link>
          <Link
            href="/wardrobe/capsules"
            className="inline-flex h-12 items-center border-b border-[#1c1a17]/30 px-1 text-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349]"
          >
            {wardrobe.capsulesBackAction}
          </Link>
        </div>
      </div>

      {enlarged && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label={`${capsule.title} — enlarged plate`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1a17]/88 p-4 md:p-8"
          onClick={() => setEnlarged(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setEnlarged(false);
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 h-11 px-3 text-[11px] tracking-[0.16em] text-[#f7f7f5] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477] md:right-8 md:top-8"
            onClick={() => setEnlarged(false)}
          >
            Close
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-[1400px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={capsule.largeImage}
              alt={capsule.alt}
              width={capsule.width}
              height={capsule.height}
              sizes="94vw"
              className="mx-auto max-h-[90vh] w-auto object-contain"
              priority
            />
          </div>
        </div>
      )}
    </article>
  );
}
