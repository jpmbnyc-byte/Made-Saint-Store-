"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LIFESTYLES, interpret, visiblePieces, type LifestyleId } from "@/lib/private-client";
import { Lookbooks } from "@/components/house/lookbooks";
import type { CommissionScope } from "@/lib/commission";
import { lineByRef } from "@/lib/line";
import { lookById, lookForLifestyle, offerFor } from "@/lib/looks";
import { usd } from "@/lib/wardrobe";

function clothingIds(ids: readonly string[]) {
  return ids.filter((id) => offerFor(id).kind === "commission");
}

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [role, setRole] = useState<"" | "athlete" | "representative">("");
  const [timing, setTiming] = useState<"" | "season" | "year" | "undecided">("");
  const [budget, setBudget] = useState<"" | "undisclosed" | "seasonal" | "annual" | "expanded" | "quoted">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const lifestyle = LIFESTYLES.find((l) => l.id === lifestyleId) ?? LIFESTYLES[0];
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
      setNote((current) => current || `${look.name}. ${look.read}`);
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
    setNote((current) => current || query.trim());
    const look = lookForLifestyle(next.lifestyleId);
    applyLook(look.pieces.map((piece) => piece.id), next.lifestyleId, look.id);
    document.getElementById("compose")?.scrollIntoView({ behavior: "smooth" });
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!role) return setError("Say whether you are the athlete or a representative.");
    if (!timing) return setError("Say when you need the wardrobe.");
    if (!note.trim() && selected.length === 0 && !lineRef) return setError("Say what you are dressing for.");
    setBusy(true);
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          note,
          role,
          timing,
          budget,
          scope,
          lookId: activeLook?.id ?? "",
          pieceIds: selected,
          lineRef,
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
            <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/55 uppercase">Private wardrobe</p>
            <h1 className="mt-4 font-serif text-[44px] leading-[0.92] md:text-[68px]">
              Personal wardrobes for professional athletes.
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#f6f4ef]/75">
              Fewer clothing decisions. One fit, carried across travel, a public day, time off, and a formal hour. A named person coordinates the conversation, the fitting, and the making.
            </p>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#f6f4ef]/60">
              The first conversation can be virtual. A fitting is physical, and it is arranged. There is no salon to walk into, and this page does not take payment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#introduction" className="inline-flex h-12 items-center bg-[#f6f4ef] px-5 text-[11px] tracking-[0.18em] text-[#1c1a17] uppercase">
                Request a private introduction
              </a>
              <a href="#discover" className="inline-flex h-12 items-center border border-[#f6f4ef]/30 px-5 text-[11px] tracking-[0.18em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                See the clothes
              </a>
            </div>
          </div>
          <figure className="order-1 bg-[#f6f4ef] md:order-2">
            <img src="/editorial/saint-john-worn.webp" alt="Camel Saint John jacket and trouser, worn, with a cap and a black backpack" className="h-auto w-full" />
            <figcaption className="px-4 py-3 text-[11px] tracking-[0.14em] text-[#1c1a17]/70 uppercase">Saint John, worn. Not a client, and not an endorsement. The shoes are not a founding runner.</figcaption>
          </figure>
        </div>
        <div className="border-t border-[#f6f4ef]/15">
          <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10">
            <p className="text-[11px] tracking-[0.18em] text-[#f6f4ef]/55 uppercase">The tonal collection</p>
            <div className="mt-4 w-full min-w-0 overflow-x-auto">
              <img src="/wardrobe/tonal-zip-system.webp" alt="Seven tonal zip suits, with the color name under each" className="h-auto w-[920px] max-w-none md:w-full" />
            </div>
            <p className="mt-3 text-[12px] text-[#f6f4ef]/55">A color study. Not a delivered wardrobe, and not a client.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1c1a17]/10">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">What a client receives</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">One wardrobe, not three launches.</h2>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-[#1c1a17]/75">
              {[
                "A conversation about the days you actually dress for.",
                "Arrival, off-duty, and occasion, coordinated as one wardrobe.",
                "A fit record, kept only with your consent.",
                "A written scope: clothes, price, date, and who corrects a mistake.",
                "Updates from one person, not a queue.",
                "Founding runners, if you want them, reserved on their own page.",
              ].map((line) => (
                <li key={line} className="border-t border-[#1c1a17]/12 pt-3">{line}</li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/55">
              The number of garments is set in that scope. It is not published here as a package.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">The journey</p>
            <ol className="mt-6 space-y-4">
              {[
                ["01", "Conversation", "By video or phone. Remote."],
                ["02", "Fitting", "Samples you can handle. Physical, and only when one is arranged."],
                ["03", "Approval", "Looks, cloth, itemized prices, and dates. Nothing is cut before you approve it."],
                ["04", "Making", "A named person writes when the date moves."],
                ["05", "Delivery and care", "A fit review after you have worn the clothes, then a way to write back."],
              ].map(([n, title, body]) => (
                <li key={n} className="grid grid-cols-[auto_1fr] gap-4 border-t border-[#1c1a17]/12 pt-4">
                  <span className="font-serif text-2xl text-[#8d7349] italic">{n}</span>
                  <span>
                    <span className="block font-serif text-2xl">{title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[#1c1a17]/70">{body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[760px] px-5 py-16 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">The house</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Once sinner. Made Saint.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#1c1a17]/75">
            The line is the founder&apos;s, for grace and a life changed. A purchase does not confer moral or spiritual standing. Sacred pictures on a garment are part of that design, and they are labeled as studies until a production photograph exists.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-[#1c1a17]/75">
            The house keeps a Christian name and welcomes a client of any belief. The longer account of grace, renewal, humility, and responsibility is his to write. It is not published here in his place.
          </p>
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
            <a href="#introduction" className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">
              Continue to the introduction
            </a>
          </aside>
        </div>
      </section>

      <div id="commission" className="scroll-mt-28" />
      <section id="introduction" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Private introduction</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Tell the house who you are dressing.</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            This writes an introduction. It does not take payment, confirm an appointment, or reserve a founding pair. The house writes back to the email you give. A response time is not promised. Measurements are taken with a person after this, not on this form.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={send} className="order-2 space-y-8 lg:order-1">
              {sent ? (
                <div className="border border-[#1c1a17]/15 p-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase">Received · {sent}</p>
                  <p className="mt-3 font-serif text-3xl">The request is with the house.</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#1c1a17]/70">
                    The house will write to {email}. This is not an appointment, and nothing was charged. A founding pair, if you want one, is reserved from the shop.
                  </p>
                  <Link href="/shop#edition" className="mt-6 inline-flex h-12 items-center border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase">
                    Reserve a founding pair
                  </Link>
                </div>
              ) : (
                <>
                  <fieldset>
                    <legend className="font-serif text-2xl">Who is writing</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {(
                        [
                          ["athlete", "The athlete"],
                          ["representative", "A representative"],
                        ] as const
                      ).map(([value, label]) => (
                        <label key={value} className="flex min-h-12 cursor-pointer items-center gap-3 border border-[#1c1a17]/12 px-3">
                          <input type="radio" name="role" checked={role === value} onChange={() => setRole(value)} className="accent-[#1c1a17]" />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
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
                    What are you dressing for?
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      placeholder="Travel weeks, a public day, time off, a formal hour."
                      className="mt-1 w-full border border-[#1c1a17]/20 bg-white/70 px-3 py-3 text-base normal-case tracking-normal placeholder:text-[#1c1a17]/35"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-[11px] tracking-[0.12em] uppercase">
                      Timing
                      <select value={timing} onChange={(e) => setTiming(e.target.value as typeof timing)} className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal">
                        <option value="">Choose</option>
                        <option value="season">This season</option>
                        <option value="year">This year</option>
                        <option value="undecided">Not decided</option>
                      </select>
                    </label>
                    <label className="block text-[11px] tracking-[0.12em] uppercase">
                      Budget, if you want to say
                      <select value={budget} onChange={(e) => setBudget(e.target.value as typeof budget)} className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal">
                        <option value="">Not given</option>
                        <option value="undisclosed">Prefer not to say</option>
                        <option value="seasonal">Near the seasonal figure</option>
                        <option value="annual">Near the annual figure</option>
                        <option value="expanded">Near the expanded figure</option>
                        <option value="quoted">Ask for a quotation</option>
                      </select>
                    </label>
                  </div>

                  {error && <p className="text-sm">{error}</p>}
                  <button type="submit" disabled={busy} className="inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-6 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase disabled:opacity-60 sm:w-auto">
                    {busy ? "Sending" : "Send the introduction"}
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
              <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/70">
                Planning figures, not a choice on this form and not a checkout: seasonal from $6,500, annual from $20,000, expanded from $35,000, atelier quoted. Inclusions are published only after they are costed.
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/60">
                Arrival, off-duty, and occasion are contexts in one wardrobe. A date can move. The silhouette does not.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
