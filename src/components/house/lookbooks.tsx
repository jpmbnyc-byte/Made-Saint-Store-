"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LOOKS,
  OCCASIONS,
  lookById,
  looksIn,
  lookFrame,
  offerFor,
  reserveTotal,
  resolvePiece,
  type Look,
  type OccasionId,
} from "@/lib/looks";
import { SliderControls } from "@/components/house/slider";
import { usd } from "@/lib/wardrobe";

export function Lookbooks({
  heading = true,
  focusLookId,
  onLook,
}: {
  heading?: boolean;
  /** Set from outside, for example after the concierge names an occasion. Choosing a look does not write this. */
  focusLookId?: string | null;
  onLook?: (look: Look) => void;
}) {
  const [occasion, setOccasion] = useState<OccasionId>("business");
  const [lookId, setLookId] = useState(LOOKS[0].id);

  useEffect(() => {
    if (!focusLookId) return;
    const match = lookById(focusLookId);
    if (!match) return;
    setOccasion(match.occasion);
    setLookId(match.id);
  }, [focusLookId]);

  const group = looksIn(occasion);
  const active = group.find((look) => look.id === lookId) ?? group[0];
  const room = OCCASIONS.find((item) => item.id === occasion)!;

  function chooseOccasion(next: OccasionId) {
    const first = looksIn(next)[0];
    setOccasion(next);
    setLookId(first.id);
    onLook?.(first);
  }

  function chooseLook(look: Look) {
    setLookId(look.id);
    onLook?.(look);
  }

  function stepLook(delta: number) {
    const at = group.findIndex((look) => look.id === active.id);
    const next = group[(at + delta + group.length) % group.length];
    chooseLook(next);
  }

  return (
    <div className={`mx-auto grid max-w-[1100px] items-start gap-8 px-5 md:grid-cols-[1.05fr_0.95fr] md:px-8 ${heading ? "py-14 md:py-20" : "py-4"}`}>
      <div>
        {heading && (
          <>
            <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Lookbooks</p>
            <h2 className="mt-4 font-serif text-[40px] leading-[0.95] text-[#2a3746] md:text-[52px]">Shop the day you are dressing for.</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#41505b]">
              Open a look. A founding pair is listed on its own. The clothes are requested with the house.
            </p>
          </>
        )}

        <div className={`flex flex-wrap gap-2 ${heading ? "mt-8" : ""}`} role="tablist" aria-label="Occasions">
          {OCCASIONS.map((item) => {
            const on = item.id === occasion;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => chooseOccasion(item.id)}
                className={`border px-4 py-3 text-[11px] tracking-[0.16em] uppercase ${on ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/20 text-[#1c1a17]/70"}`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] text-[#1c1a17]/60">{room.subtitle}</p>

        <ul className="mt-5 flex gap-3">
          {group.map((look, index) => {
            const on = look.id === active.id;
            return (
              <li key={look.id} className="w-24">
                <button type="button" onClick={() => chooseLook(look)} aria-pressed={on} className="block w-full text-left">
                  <span className={`relative block aspect-[3/4] bg-[#f7f4ef] ${on ? "outline outline-1 outline-[#c0a477]" : ""}`}>
                    <Image src={look.image} alt="" fill sizes="96px" className={lookFrame(look)} />
                  </span>
                  <span className="mt-2 block text-[10px] tracking-[0.14em] text-[#1c1a17]/50 uppercase">Look {String(index + 1).padStart(2, "0")}</span>
                  <span className={`mt-1 block font-serif text-base leading-none ${on ? "" : "text-[#1c1a17]/70"}`}>{look.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 md:hidden">
          <LookFigure look={active} />
        </div>
        <LookBill look={active} />
        <SliderControls
          index={Math.max(0, group.findIndex((look) => look.id === active.id))}
          count={group.length}
          onPrev={() => stepLook(-1)}
          onNext={() => stepLook(1)}
          onGo={(index) => chooseLook(group[index])}
          label="Look"
        />
      </div>
      <div className="sticky top-24 hidden md:block">
        <LookFigure look={active} />
      </div>
    </div>
  );
}

function LookFigure({ look }: { look: Look }) {
  return (
    <div className="relative aspect-[3/4] bg-[#f3efe8]">
      <Image src={look.image} alt={look.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className={lookFrame(look)} />
    </div>
  );
}

function LookBill({ look }: { look: Look }) {
  const total = reserveTotal(look);
  const reservable = look.pieces.map((piece) => ({ piece, offer: offerFor(piece.id) })).filter((row) => row.offer.kind === "reserve");

  return (
    <div className="mt-8">
      <div>
        <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/55 uppercase">This look</p>
        <h3 className="mt-2 font-serif text-4xl">{look.name}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/75">{look.read}</p>
        {look.aside && <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#1c1a17]/60">{look.aside}</p>}

        <ul className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
          {look.pieces.map((entry) => {
            const piece = resolvePiece(entry.id);
            const offer = offerFor(entry.id);
            return (
              <li key={entry.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/50 uppercase">
                    {entry.role}
                    {!entry.shown && " · alternative, not in the photograph"}
                  </p>
                  <p className="mt-1 font-serif text-2xl leading-none">{piece.name}</p>
                  <p className="mt-1 text-[13px] text-[#1c1a17]/60">{piece.material}</p>
                </div>
                <div className="shrink-0 text-right">
                  {offer.kind === "reserve" && (
                    <>
                      <p className="text-sm tabular-nums">{usd(offer.usd)}</p>
                      <Link href={offer.href} className="mt-2 inline-block text-sm underline underline-offset-4">
                        See the pair
                      </Link>
                    </>
                  )}
                  {offer.kind === "waitlist" && (
                    <>
                      <p className="text-sm tabular-nums">{usd(offer.usd)}</p>
                      <Link href={offer.href} className="mt-2 inline-block text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                        Join the list
                      </Link>
                    </>
                  )}
                  {offer.kind === "commission" && (
                    <>
                      <p className="text-sm text-[#1c1a17]/60">Requested with the house</p>
                      <Link href={`/wardrobe?look=${look.id}#introduction`} className="mt-2 inline-block text-sm underline underline-offset-4">
                        Introduce this piece
                      </Link>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          {total > 0 && reservable.length > 0 ? (
            <>
              <p className="text-sm text-[#1c1a17]/55">Listed pair</p>
              <p className="mt-2 font-serif text-4xl tabular-nums">{usd(total)}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#1c1a17]/65">
                That figure is the founding {reservable.length === 1 ? "pair" : "pairs"} only. This page does not take payment.
              </p>
              <Link href={reservable[0].offer.kind === "reserve" ? reservable[0].offer.href : "/shop#edition"} className="mt-5 inline-flex h-12 items-center bg-[#1c1a17] px-6 text-sm text-[#f6f4ef]">
                Continue to the pair
              </Link>
            </>
          ) : (
            <>
              <p className="max-w-md text-base leading-relaxed text-[#1c1a17]/75">The clothes in this look are requested with the house.</p>
              <Link href={`/wardrobe?look=${look.id}#introduction`} className="mt-5 inline-flex h-12 items-center bg-[#1c1a17] px-6 text-sm text-[#f6f4ef]">
                Request an introduction
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
