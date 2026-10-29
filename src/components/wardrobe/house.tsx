"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  EMPTY_FIT,
  LIFESTYLES,
  OFFERINGS,
  PATHWAY_LABEL,
  SEASONS,
  allocation,
  fitReview,
  interpret,
  pieceById,
  retailOf,
  shopHref,
  visiblePieces,
  type FitInput,
  type LifestyleId,
} from "@/lib/private-client";
import { usd } from "@/lib/wardrobe";

function PieceCard({ id, onAdapt }: { id: string; onAdapt?: () => void }) {
  const piece = pieceById(id);
  if (!piece) return null;
  const price = retailOf(id);
  const href = shopHref(id);
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f1eee8]">
        {piece.image ? (
          <img src={piece.image} alt={piece.name} className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <div className="flex h-full items-end p-4">
            <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/45 uppercase">Photograph pending</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl leading-none">{piece.name}</h3>
        <p className="text-sm tabular-nums">{price != null ? usd(price) : "Price pending"}</p>
      </div>
      <p className="mt-1 text-[13px] text-[#1c1a17]/60">{piece.material}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] tracking-[0.14em] uppercase">
        {href && (
          <Link href={href} className="border-b border-[#1c1a17] pb-0.5">
            Purchase
          </Link>
        )}
        {onAdapt && (
          <button type="button" onClick={onAdapt} className="border-b border-[#1c1a17]/40 pb-0.5 text-[#1c1a17]/70">
            Adapt to my measurements
          </button>
        )}
      </div>
    </article>
  );
}

const MEASURES: { key: keyof FitInput; label: string; unit: string }[] = [
  { key: "height", label: "Height", unit: "cm" },
  { key: "chest", label: "Chest", unit: "cm" },
  { key: "shoulder", label: "Shoulder", unit: "cm" },
  { key: "sleeve", label: "Sleeve", unit: "cm" },
  { key: "bicep", label: "Bicep", unit: "cm" },
  { key: "waist", label: "Waist", unit: "cm" },
  { key: "hip", label: "Hip", unit: "cm" },
  { key: "thigh", label: "Thigh", unit: "cm" },
  { key: "inseam", label: "Inseam", unit: "cm" },
  { key: "shoe", label: "Shoe, US", unit: "" },
];

export function PrivateHouse() {
  const [query, setQuery] = useState("I need clothing for travel and appearances during basketball season.");
  const [asked, setAsked] = useState(false);
  const [lifestyleId, setLifestyleId] = useState<LifestyleId>("arrival");
  const [reply, setReply] = useState("");
  const [selected, setSelected] = useState<string[]>([...LIFESTYLES[0].pieces]);
  const [commitment, setCommitment] = useState<number | null>(null);
  const [fit, setFit] = useState<FitInput>(EMPTY_FIT);
  const [reviewed, setReviewed] = useState(false);

  const lifestyle = LIFESTYLES.find((l) => l.id === lifestyleId) ?? LIFESTYLES[0];
  const review = useMemo(() => fitReview(fit), [fit]);
  const money = allocation(selected, commitment ?? 0);

  function ask(e: React.FormEvent) {
    e.preventDefault();
    const next = interpret(query);
    setLifestyleId(next.lifestyleId);
    setReply(next.reply);
    setAsked(true);
    const life = LIFESTYLES.find((l) => l.id === next.lifestyleId);
    if (life) setSelected([...life.pieces]);
  }

  function toggle(id: string) {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  return (
    <div>
      <section className="bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/55 uppercase">The Private Wardrobe</p>
            <h1 className="mt-4 font-serif text-[52px] leading-[0.92] md:text-[84px]">
              Three annual
              <br />
              <em>collections.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#f6f4ef]/75">
              One personal fit. A wardrobe that evolves with you. The silhouettes stay the same whether the client buys one piece or commissions the year. Exceptional proportions change the pattern, not the design.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                ["#discover", "Discover"],
                ["#compose", "Compose"],
                ["#commission", "Commission"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="border border-[#f6f4ef]/30 px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="bg-[#f1eee8]">
            <img src="/wardrobe/tonal-zip-system.webp" alt="MADE SAiNT tonal zip jacket, the same silhouette offered ready and made to measure" className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-16 md:px-8">
        <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Concierge</p>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">What are you dressing for?</h2>
        <form onSubmit={ask} className="mt-8 border-b border-[#1c1a17]">
          <label htmlFor="intent" className="sr-only">
            What are you dressing for?
          </label>
          <textarea
            id="intent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
            className="w-full resize-none bg-transparent py-3 text-[16px] leading-relaxed outline-none"
          />
          <div className="flex justify-end pb-3">
            <button type="submit" className="bg-[#1c1a17] px-6 py-3 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">
              Assemble from the register
            </button>
          </div>
        </form>
        {asked && (
          <div className="mt-8">
            <p className="text-[15px] leading-relaxed text-[#1c1a17]/75">{reply}</p>
            <p className="mt-4 text-[11px] tracking-[0.16em] uppercase">{lifestyle.name}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-[11px] tracking-[0.16em] uppercase">
              <a href="#discover" className="border border-[#1c1a17] px-4 py-3">Purchase individually</a>
              <a href="#compose" className="border border-[#1c1a17] px-4 py-3">Compose the look</a>
              <a href="#commission" className="bg-[#1c1a17] px-4 py-3 text-[#f6f4ef]">Commission a wardrobe</a>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {visiblePieces(lifestyle.pieces).map((p) => (
                <PieceCard key={p.id} id={p.id} onAdapt={() => document.getElementById("commission")?.scrollIntoView({ behavior: "smooth" })} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="discover" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Discover</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl md:text-5xl">The same clothes. Two ways to have them made.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            A client with exceptional proportions is not sent to another collection. Height, shoulder, and thigh change the manufacturing pathway. They do not change the jacket.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {LIFESTYLES.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setLifestyleId(l.id);
                  setSelected([...l.pieces]);
                }}
                className={`border p-4 text-left ${l.id === lifestyleId ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/15"}`}
              >
                <p className="text-[11px] tracking-[0.16em] uppercase">{l.n}</p>
                <p className="mt-2 font-serif text-2xl leading-none">{l.name.replace("The ", "")}</p>
                <p className={`mt-3 text-[13px] leading-relaxed ${l.id === lifestyleId ? "text-[#f6f4ef]/70" : "text-[#1c1a17]/60"}`}>{l.purpose}</p>
              </button>
            ))}
          </div>
          <div className="mt-10 grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {visiblePieces(lifestyle.pieces).map((p) => (
              <PieceCard key={p.id} id={p.id} onAdapt={() => document.getElementById("commission")?.scrollIntoView({ behavior: "smooth" })} />
            ))}
          </div>
        </div>
      </section>

      <section id="compose" className="scroll-mt-28 border-t border-[#1c1a17]/10 bg-[#f1eee8]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Compose · {lifestyle.name}</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Build the look from approved pieces.</h2>
            <ul className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              {visiblePieces(lifestyle.pieces).map((p) => {
                const on = selected.includes(p.id);
                const price = retailOf(p.id);
                return (
                  <li key={p.id}>
                    <label className="flex cursor-pointer items-center gap-4 py-4">
                      <input type="checkbox" checked={on} onChange={() => toggle(p.id)} className="size-4 accent-[#1c1a17]" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{p.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">{p.material}</span>
                      </span>
                      <span className="text-sm tabular-nums">{price != null ? usd(price) : "Pending"}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <aside className="h-fit border border-[#1c1a17]/15 bg-[#f6f4ef] p-6 lg:sticky lg:top-28">
            <p className="text-[11px] tracking-[0.16em] uppercase">This look</p>
            <p className="mt-3 font-serif text-4xl tabular-nums">{usd(money.approved)}</p>
            <p className="mt-2 text-sm text-[#1c1a17]/65">
              {money.pending === 0
                ? "Every selected piece has a published price."
                : `${money.pending} selected ${money.pending === 1 ? "piece has" : "pieces have"} no approved price, so ${money.pending === 1 ? "it is" : "they are"} not in this total.`}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <label className="flex items-start gap-3">
                <input
                  type="radio"
                  name="commitment"
                  checked={commitment === null}
                  onChange={() => setCommitment(null)}
                  className="mt-1 accent-[#1c1a17]"
                />
                <span>Purchase the look. No annual commitment.</span>
              </label>
              {OFFERINGS.filter((o) => "commitment" in o).map((o) => (
                <label key={o.id} className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="commitment"
                    checked={commitment === o.commitment}
                    onChange={() => setCommitment(o.commitment)}
                    className="mt-1 accent-[#1c1a17]"
                  />
                  <span>
                    {o.name}. {o.investment}. Preliminary target.
                  </span>
                </label>
              ))}
            </div>
            {commitment != null && (
              <dl className="mt-6 space-y-2 border-t border-[#1c1a17]/15 pt-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#1c1a17]/60">Preliminary commitment</dt>
                  <dd className="tabular-nums">{usd(commitment)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#1c1a17]/60">Allocated, approved prices</dt>
                  <dd className="tabular-nums">{usd(money.approved)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#1c1a17]/60">Unpriced pieces</dt>
                  <dd>{money.pending}</dd>
                </div>
              </dl>
            )}
            <p className="mt-4 text-[12px] leading-relaxed text-[#1c1a17]/55">
              Taxes, shipping, fittings, and pattern development are quoted separately. A remaining balance is not shown while any selected price is pending.
            </p>
            <a href="#commission" className="mt-6 inline-block bg-[#1c1a17] px-5 py-3 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">
              Review the fit
            </a>
          </aside>
        </div>
      </section>

      <section id="commission" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Commission</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">One design. Individual proportions.</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            The product stays the same. The pathway changes: a published size, an approved made-to-measure adjustment, or a technical review. Not every silhouette can be made for every body.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {SEASONS.map((s) => (
              <article key={s.id} className="border border-[#1c1a17]/15 p-5">
                <p className="text-[11px] tracking-[0.16em] uppercase">Collection {s.id}</p>
                <h3 className="mt-2 font-serif text-3xl">{s.name}</h3>
                <p className="mt-3 text-sm text-[#1c1a17]/70">{s.purpose}. {s.direction}.</p>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm text-[#1c1a17]/60">An athlete’s calendar can move a delivery. The three collections stay. The dates do not have to.</p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((o) => (
              <article key={o.id} className="border border-[#1c1a17]/12 p-5">
                <h3 className="font-serif text-2xl">{o.name}</h3>
                <p className="mt-2 text-sm">{o.investment}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#1c1a17]/65">{o.note}</p>
                {o.preliminary && <p className="mt-3 text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/45">Preliminary target</p>}
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReviewed(true);
              }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-3xl">Fit profile</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#1c1a17]/65">
                  Measurements describe the body. Preferences describe how the garment should sit. A photograph is not a measurement. This profile stays in the browser for this visit. A private account is not open.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {MEASURES.map((m) => (
                  <label key={m.key} className="block text-[11px] tracking-[0.12em] uppercase">
                    {m.label}
                    {m.unit ? ` · ${m.unit}` : ""}
                    <input
                      inputMode="decimal"
                      value={fit[m.key]}
                      onChange={(e) => setFit({ ...fit, [m.key]: e.target.value })}
                      className="mt-1 h-11 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-sm normal-case tracking-normal"
                    />
                  </label>
                ))}
                <label className="block text-[11px] tracking-[0.12em] uppercase">
                  Shoe width
                  <select
                    value={fit.width}
                    onChange={(e) => setFit({ ...fit, width: e.target.value as FitInput["width"] })}
                    className="mt-1 h-11 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-sm normal-case tracking-normal"
                  >
                    <option value="">Not given</option>
                    <option value="standard">Standard</option>
                    <option value="wide">Wide</option>
                    <option value="extra-wide">Extra wide</option>
                  </select>
                </label>
              </div>
              <fieldset className="space-y-3">
                <legend className="font-serif text-2xl">Fit preferences</legend>
                <p className="max-w-lg text-sm text-[#1c1a17]/65">Kept apart from the measurements above. They do not change the pathway.</p>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-[11px] tracking-[0.12em] uppercase">
                    Shoulder
                    <select
                      value={fit.shoulderStyle}
                      onChange={(e) => setFit({ ...fit, shoulderStyle: e.target.value as FitInput["shoulderStyle"] })}
                      className="mt-1 h-11 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-sm normal-case tracking-normal"
                    >
                      <option value="">Not given</option>
                      <option value="relaxed">Relaxed</option>
                      <option value="structured">Structured</option>
                    </select>
                  </label>
                  <label className="block text-[11px] tracking-[0.12em] uppercase">
                    Ease
                    <select
                      value={fit.ease}
                      onChange={(e) => setFit({ ...fit, ease: e.target.value as FitInput["ease"] })}
                      className="mt-1 h-11 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-sm normal-case tracking-normal"
                    >
                      <option value="">Not given</option>
                      <option value="close">Close</option>
                      <option value="standard">Standard</option>
                      <option value="generous">Generous</option>
                    </select>
                  </label>
                </div>
              </fieldset>
              <button type="submit" className="bg-[#1c1a17] px-6 py-4 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">
                Ask for a pathway
              </button>
            </form>

            <aside className="border border-[#1c1a17]/15 p-6">
              <p className="text-[11px] tracking-[0.16em] uppercase">Fit architect</p>
              {!reviewed && <p className="mt-4 text-sm leading-relaxed text-[#1c1a17]/70">Enter what you know, then ask. An empty form is not a standard size.</p>}
              {reviewed && !review.measured && (
                <p className="mt-4 text-sm leading-relaxed">No measurements yet. The pathway cannot be named.</p>
              )}
              {reviewed && review.measured && (
                <div className="mt-4">
                  <p className="font-serif text-3xl">{PATHWAY_LABEL[review.pathway]}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#1c1a17]/75">
                    {review.flags.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  {(fit.shoulderStyle || fit.ease) && (
                    <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/70">
                      Preferences noted{fit.shoulderStyle ? `: ${fit.shoulderStyle} shoulder` : ""}
                      {fit.ease ? `${fit.shoulderStyle ? ", " : ": "}${fit.ease} ease` : ""}. They describe the sit of the garment, not the body.
                    </p>
                  )}
                  <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/60">
                    A person approves the pattern. Any extra charge is for development, cloth, or a last. It is not a charge for height or size.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
