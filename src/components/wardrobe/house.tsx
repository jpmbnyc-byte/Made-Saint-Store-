"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  EMPTY_FIT,
  LIFESTYLES,
  OFFERINGS,
  PATHWAY_LABEL,
  fitReview,
  interpret,
  visiblePieces,
  type FitInput,
  type LifestyleId,
} from "@/lib/private-client";
import { Lookbooks } from "@/components/house/lookbooks";
import type { CommissionScope } from "@/lib/commission";
import { lineByRef } from "@/lib/line";
import { lookById, lookForLifestyle, offerFor } from "@/lib/looks";
import { usd } from "@/lib/wardrobe";

function clothingIds(ids: readonly string[]) {
  return ids.filter((id) => offerFor(id).kind === "commission");
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
  const opening = lookForLifestyle("arrival").pieces.map((piece) => piece.id);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState(false);
  const [lifestyleId, setLifestyleId] = useState<LifestyleId>("arrival");
  const [reply, setReply] = useState("");
  const [focusLookId, setFocusLookId] = useState<string | null>(null);
  const [roster, setRoster] = useState<string[]>(opening);
  const [selected, setSelected] = useState<string[]>(clothingIds(opening));
  const [lineRef, setLineRef] = useState("");
  const [scope, setScope] = useState<CommissionScope>("look");
  const [fit, setFit] = useState<FitInput>(EMPTY_FIT);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const lifestyle = LIFESTYLES.find((l) => l.id === lifestyleId) ?? LIFESTYLES[0];
  const review = useMemo(() => fitReview(fit), [fit]);
  const clothes = visiblePieces(selected);
  const heldLine = lineByRef(lineRef);
  const activeLook = focusLookId ? lookById(focusLookId) : roster.length ? lookForLifestyle(lifestyleId) : undefined;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const look = lookById(params.get("look") ?? "");
    const line = lineByRef(params.get("ref") ?? "");
    if (line) setLineRef(line.ref);
    if (look) {
      const ids = look.pieces.map((piece) => piece.id);
      setLifestyleId(look.lifestyle);
      setFocusLookId(look.id);
      setRoster(ids);
      setSelected(clothingIds(ids));
      return;
    }
    if (line) {
      setRoster([]);
      setSelected([]);
      setScope("piece");
    }
  }, []);

  function applyLook(ids: string[], nextLifestyle: LifestyleId, lookId: string) {
    setLifestyleId(nextLifestyle);
    setFocusLookId(lookId);
    setRoster(ids);
    setSelected(clothingIds(ids));
    setScope((current) => {
      if (current === "season" || current === "annual" || current === "expanded" || current === "atelier") return current;
      return "look";
    });
  }

  function ask(e: React.FormEvent) {
    e.preventDefault();
    const next = interpret(query);
    setReply(next.reply);
    setAsked(true);
    const look = lookForLifestyle(next.lifestyleId);
    applyLook(look.pieces.map((piece) => piece.id), next.lifestyleId, look.id);
    document.getElementById("compose")?.scrollIntoView({ behavior: "smooth" });
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          note,
          scope,
          lookId: activeLook?.id ?? "",
          pieceIds: selected,
          lineRef,
          fit,
        }),
      });
      const text = await res.text();
      let json: { error?: string; id?: string } = {};
      try {
        json = JSON.parse(text) as typeof json;
      } catch {
        throw new Error("The commission could not be sent from this page. Nothing was saved.");
      }
      if (!res.ok || !json.id) throw new Error(json.error ?? "The commission could not be sent.");
      setSent(json.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The commission could not be sent.");
      setBusy(false);
    }
  }

  function toggle(id: string) {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  return (
    <div>
      <section className="overflow-x-clip bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-20">
          <div className="order-2 md:order-1">
            <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/55 uppercase">The Private Wardrobe</p>
            <h1 className="mt-4 font-serif text-[44px] leading-[0.92] md:text-[72px]">
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
                <a key={href} href={href} className="inline-flex h-12 items-center border border-[#f6f4ef]/30 px-5 text-[11px] tracking-[0.18em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <figure className="order-1 bg-[#f6f4ef] md:order-2">
            <img src="/hero/saint-john.webp" alt="Camel Saint John jacket and trouser, front and back, on paper" className="h-auto w-full" />
          </figure>
        </div>
        <div className="border-t border-[#f6f4ef]/15">
          <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10">
            <p className="text-[11px] tracking-[0.18em] text-[#f6f4ef]/55 uppercase">The tonal collection</p>
            <div className="mt-4 w-full min-w-0 overflow-x-auto">
              <img src="/wardrobe/tonal-zip-system.webp" alt="Seven tonal zip suits, with the color name under each" className="h-auto w-[920px] max-w-none md:w-full" />
            </div>
            <p className="mt-3 text-[12px] text-[#f6f4ef]/55 md:hidden">Slide sideways to read each color.</p>
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
            placeholder="A flight, a public day, a suit."
            className="w-full resize-none bg-transparent py-3 text-[16px] leading-relaxed outline-none placeholder:text-[#1c1a17]/35"
          />
          <div className="flex justify-end pb-3">
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-6 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase sm:w-auto">
              Show a look
            </button>
          </div>
        </form>
        {asked && (
          <div className="mt-8">
            <p className="text-[15px] leading-relaxed text-[#1c1a17]/75">{reply}</p>
            <p className="mt-4 text-[11px] tracking-[0.16em] uppercase">{lifestyle.name}</p>
            <a href="#compose" className="mt-5 inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase sm:w-auto">
              Continue with this look
            </a>
          </div>
        )}
      </section>

      <section id="discover" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Discover</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl md:text-5xl">The same clothes. Two ways to have them made.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Choose the occasion. The look lists what is in it. A founding pair can be reserved. The clothes are commissioned, and a proportion changes the pathway, not the jacket.
          </p>
          <div className="mt-8">
            <Lookbooks
              heading={false}
              focusLookId={focusLookId}
              onLook={(look) => applyLook(look.pieces.map((piece) => piece.id), look.lifestyle, look.id)}
            />
          </div>
        </div>
      </section>

      <section id="compose" className="scroll-mt-28 border-t border-[#1c1a17]/10 bg-[#f1eee8]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">02 · Compose · {lifestyle.name}</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Choose what is made for you.</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
              Checked pieces go into the commission. A founding pair is reserved on the shop, and it is not part of this request.
            </p>
            <ul className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              {heldLine && (
                <li className="flex items-center gap-4 py-4">
                  <span className="grid size-11 shrink-0 place-items-center border border-[#1c1a17] text-[11px]">In</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-2xl">{heldLine.name}</span>
                    <span className="text-[13px] text-[#1c1a17]/60">{heldLine.ref} · 2027 line · proposed, not a checkout</span>
                  </span>
                </li>
              )}
              {visiblePieces(roster).map((piece) => {
                const offer = offerFor(piece.id);
                if (offer.kind !== "commission") {
                  return (
                    <li key={piece.id} className="flex items-center gap-4 py-4">
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{piece.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">
                          {offer.kind === "reserve" ? "Founding pair · reserved separately" : "Next run · not in this commission"}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block text-sm tabular-nums">{usd(offer.usd)}</span>
                        <Link href={offer.href} className="mt-1 inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                          {offer.kind === "reserve" ? "Reserve" : "Join the list"}
                        </Link>
                      </span>
                    </li>
                  );
                }
                const on = selected.includes(piece.id);
                return (
                  <li key={piece.id}>
                    <label className="flex min-h-11 cursor-pointer items-center gap-4 py-4">
                      <input type="checkbox" checked={on} onChange={() => toggle(piece.id)} className="size-5 accent-[#1c1a17]" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{piece.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">{piece.material}</span>
                      </span>
                      <span className="text-[11px] tracking-[0.14em] text-[#1c1a17]/55 uppercase">Commission</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <aside className="h-fit border border-[#1c1a17]/15 bg-[#f6f4ef] p-6 lg:sticky lg:top-28">
            <p className="text-[11px] tracking-[0.16em] uppercase">In this request</p>
            <p className="mt-3 font-serif text-4xl tabular-nums">{clothes.length + (heldLine ? 1 : 0)}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#1c1a17]/65">
              {clothes.length + (heldLine ? 1 : 0) === 1 ? "One piece to be made." : "Pieces to be made."} Nothing here is a checkout price.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {heldLine && <li>{heldLine.ref} · {heldLine.name}</li>}
              {clothes.map((piece) => (
                <li key={piece.id}>{piece.name}</li>
              ))}
            </ul>
            <a href="#commission" className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">
              Continue to the request
            </a>
          </aside>
        </div>
      </section>

      <section id="commission" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">03 · Commission</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Send the commission.</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            This writes a request. It does not take payment, and it does not reserve a founding pair. The year is still three collections, Arrival, Transit, and Occasion. A date can move. The silhouette does not.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={send} className="order-2 space-y-8 lg:order-1">
              {sent ? (
                <div className="border border-[#1c1a17]/15 p-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase">Received · {sent}</p>
                  <p className="mt-3 font-serif text-3xl">The request is with the house.</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#1c1a17]/70">
                    We will write to {email}. Nothing was charged. A founding pair, if you want one, is reserved from the shop.
                  </p>
                  <Link href="/shop#edition" className="mt-6 inline-flex h-12 items-center border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase">
                    Reserve a founding pair
                  </Link>
                </div>
              ) : (
                <>
                  <fieldset className="space-y-3">
                    <legend className="font-serif text-2xl">What this request covers</legend>
                    {OFFERINGS.map((offer) => (
                      <label key={offer.id} className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#1c1a17]/12 px-3">
                        <input
                          type="radio"
                          name="scope"
                          checked={scope === offer.id}
                          onChange={() => setScope(offer.id)}
                          className="accent-[#1c1a17]"
                        />
                        <span className="text-sm">{offer.name}</span>
                        <span className="ml-auto text-[12px] text-[#1c1a17]/55">{offer.investment}</span>
                      </label>
                    ))}
                    <p className="text-sm leading-relaxed text-[#1c1a17]/70">{OFFERINGS.find((offer) => offer.id === scope)?.note}</p>
                    {scope === "piece" && clothes.length > 1 && (
                      <p className="text-sm text-[#1c1a17]/70">This scope is one piece. Uncheck the others, or choose Complete look.</p>
                    )}
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-[11px] tracking-[0.12em] uppercase">
                      Name
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
                      />
                    </label>
                    <label className="block text-[11px] tracking-[0.12em] uppercase">
                      Email
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
                      />
                    </label>
                  </div>
                  <label className="block text-[11px] tracking-[0.12em] uppercase">
                    Note
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      className="mt-1 w-full border border-[#1c1a17]/20 bg-white/70 px-3 py-3 text-base normal-case tracking-normal"
                    />
                  </label>

                  <details className="border-t border-[#1c1a17]/12">
                    <summary className="flex min-h-12 cursor-pointer items-center font-serif text-2xl">Add measurements</summary>
                    <p className="max-w-lg text-sm leading-relaxed text-[#1c1a17]/65">
                      Optional. They describe the body. A photograph is not a measurement. The profile stays with this request. A private account is not open.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {MEASURES.map((m) => (
                        <label key={m.key} className="block text-[11px] tracking-[0.12em] uppercase">
                          {m.label}
                          {m.unit ? ` · ${m.unit}` : ""}
                          <input
                            inputMode="decimal"
                            value={fit[m.key]}
                            onChange={(e) => setFit({ ...fit, [m.key]: e.target.value })}
                            className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
                          />
                        </label>
                      ))}
                      <label className="block text-[11px] tracking-[0.12em] uppercase">
                        Shoe width
                        <select
                          value={fit.width}
                          onChange={(e) => setFit({ ...fit, width: e.target.value as FitInput["width"] })}
                          className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
                        >
                          <option value="">Not given</option>
                          <option value="standard">Standard</option>
                          <option value="wide">Wide</option>
                          <option value="extra-wide">Extra wide</option>
                        </select>
                      </label>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <label className="block text-[11px] tracking-[0.12em] uppercase">
                        Shoulder
                        <select
                          value={fit.shoulderStyle}
                          onChange={(e) => setFit({ ...fit, shoulderStyle: e.target.value as FitInput["shoulderStyle"] })}
                          className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
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
                          className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
                        >
                          <option value="">Not given</option>
                          <option value="close">Close</option>
                          <option value="standard">Standard</option>
                          <option value="generous">Generous</option>
                        </select>
                      </label>
                    </div>
                  </details>

                  {error && <p className="text-sm">{error}</p>}
                  <button type="submit" disabled={busy} className="inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-6 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase disabled:opacity-60 sm:w-auto">
                    {busy ? "Sending" : "Send the commission"}
                  </button>
                </>
              )}
            </form>

            <aside className="order-1 h-fit border border-[#1c1a17]/15 p-6 lg:sticky lg:top-28 lg:order-2">
              <p className="text-[11px] tracking-[0.16em] uppercase">This request</p>
              <h3 className="mt-3 font-serif text-3xl">{clothes.length === 0 && heldLine ? heldLine.name : (activeLook?.name ?? "A commission")}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {heldLine && <li>{heldLine.ref} · {heldLine.name}</li>}
                {clothes.map((piece) => (
                  <li key={piece.id}>{piece.name}</li>
                ))}
                {clothes.length === 0 && !heldLine && <li className="text-[#1c1a17]/60">No piece selected yet.</li>}
              </ul>
              <p className="mt-4 text-sm text-[#1c1a17]/70">{OFFERINGS.find((offer) => offer.id === scope)?.name}</p>
              <p className="mt-4 font-serif text-2xl">{review.measured ? PATHWAY_LABEL[review.pathway] : "Measurements not given"}</p>
              {review.measured && (
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[#1c1a17]/70">
                  {review.flags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/60">
                A person approves the pattern. Any extra charge is for development, cloth, or a last. It is not a charge for height or size.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
