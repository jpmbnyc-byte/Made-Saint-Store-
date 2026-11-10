"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { visiblePieces, type LifestyleId } from "@/lib/private-client";
import type { CommissionScope } from "@/lib/commission";
import { lineByRef } from "@/lib/line";
import { lookById, lookForLifestyle, offerFor } from "@/lib/looks";
import { PIECES, type WardrobePiece } from "@/lib/wardrobe";
import { TONAL_COLORS, TonalSlideshow } from "@/components/wardrobe/tonal";

const CATALOG = PIECES.filter((piece) => Boolean(piece.image) && offerFor(piece.id).kind !== "waitlist");

function clothingIds(ids: readonly string[]) {
  return ids.filter((id) => offerFor(id).kind === "commission");
}

function AlternateCard({ piece, onAdd }: { piece: WardrobePiece; onAdd: () => void }) {
  const offer = offerFor(piece.id);
  const study = /reconstruction/i.test(piece.note ?? "");
  return (
    <div className="flex flex-col border border-[#1c1a17]/10 bg-white">
      <img src={piece.image} alt={piece.name} className="h-36 w-full bg-[#e7e0d4] object-contain" />
      <div className="flex flex-1 flex-col p-2">
        <p className="font-serif text-lg leading-tight">{piece.name}</p>
        <p className="mt-1 text-[12px] leading-snug text-[#1c1a17]/60">
          {study ? "Study. Not a physical sample. " : ""}
          {offer.kind === "commission" ? "Available to request" : `Available · $${offer.usd} · made to order`}
        </p>
        {offer.kind === "commission" ? (
          <button type="button" onClick={onAdd} className="mt-2 h-10 text-left text-[11px] tracking-[0.12em] uppercase underline underline-offset-4">
            Add
          </button>
        ) : (
          <Link href={offer.href} className="mt-2 inline-flex h-10 items-center text-[11px] tracking-[0.12em] uppercase underline underline-offset-4">
            Request this pair
          </Link>
        )}
      </div>
    </div>
  );
}

const EASES = [
  { id: "tailored", label: "Tailored", line: "Closer through the leg. Still room to sit." },
  { id: "easy", label: "Easy", line: "A little room to move. A clean, tapered line." },
  { id: "relaxed", label: "Relaxed", line: "More room through the thigh. The hem stays clean." },
] as const;

const SHOULDERS = [
  { id: "structured", label: "Structured", line: "A cleaner line through the shoulder." },
  { id: "relaxed", label: "Relaxed", line: "More room through the shoulder." },
] as const;

/** Starting sets follow the days a client dresses for. They are not client profiles. */
const STARTS = [
  {
    id: "schedule",
    name: "Changing days",
    line: "Travel and a public day, in one set you can repeat.",
    image: "/line/f35.webp",
    alt: "Navy zip jacket, white layer, and matching trouser, worn full length",
    lookId: "arrival",
    lifestyle: "arrival" as const,
    pieces: ["p01", "p02"],
  },
  {
    id: "repeat",
    name: "One look",
    line: "One tailored look, worn again instead of rebuilt.",
    image: "/editorial/saint-john-worn.webp",
    alt: "Lucien in the camel Saint John jacket and trouser, with a cap and a black backpack",
    lookId: "saint-john",
    lifestyle: "occasion" as const,
    pieces: ["s01"],
  },
  {
    id: "settings",
    name: "Across settings",
    line: "The public day and a formal hour, as one capsule you can adjust.",
    image: "/line/f35.webp",
    alt: "Malik in a navy zip jacket, white layer, and matching trouser, worn full length",
    frame: "object-center",
    lookId: "arrival",
    lifestyle: "arrival" as const,
    pieces: ["p01", "p02", "s01", "s02"],
  },
  {
    id: "everyday",
    name: "Ordinary days",
    line: "Denim, a knit, and a trouser. Exact pieces, not a whole wardrobe.",
    image: "/line/f28.webp",
    alt: "Washed denim jacket, yellow knit, jeans, and pale blue hikers",
    lookId: "off-duty",
    lifestyle: "off-duty" as const,
    pieces: ["p09", "p08", "p07"],
  },
  {
    id: "rose",
    name: "Rose set",
    line: "Dusty rose blouson and trouser, with a petrol teal turtleneck. Proposed, not approved.",
    image: "/line/f50.webp",
    alt: "Dusty rose zip blouson and trouser, worn over a petrol teal turtleneck. Not a client. The shoes are not a founding runner.",
    lookId: "rose",
    lifestyle: "off-duty" as const,
    pieces: ["p06", "p07", "p13"],
  },
] as const;

const ROSE_SHEETS = [
  { src: "/wardrobe/blouson-rose-sheet.webp", alt: "Dusty rose zip blouson, front and back, a proposed sample sheet" },
  { src: "/wardrobe/trouser-rose-sheet.webp", alt: "Dusty rose tailored trouser, front and back, a proposed sample sheet" },
  { src: "/wardrobe/turtleneck-teal-sheet.webp", alt: "Petrol teal turtleneck, front and back, with a red MADE Saint study at the neck" },
] as const;

export function PrivateHouse() {
  const [lifestyleId, setLifestyleId] = useState<LifestyleId>("arrival");
  const [startId, setStartId] = useState("");
  const [focusLookId, setFocusLookId] = useState<string | null>(null);
  const [roster, setRoster] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [lineRef, setLineRef] = useState("");
  const [scope, setScope] = useState<CommissionScope>("look");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [role, setRole] = useState<"" | "myself" | "client">("");
  const [timing, setTiming] = useState<"" | "season" | "year" | "undecided">("");
  const [budget, setBudget] = useState<"" | "undisclosed" | "seasonal" | "annual" | "expanded" | "quoted">("");
  const [toneAt, setToneAt] = useState(0);
  const [easeId, setEaseId] = useState<(typeof EASES)[number]["id"]>("easy");
  const [shoulderId, setShoulderId] = useState<(typeof SHOULDERS)[number]["id"]>("structured");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [remoteFitting, setRemoteFitting] = useState(false);

  const ease = EASES.find((item) => item.id === easeId) ?? EASES[1];
  const shoulder = SHOULDERS.find((item) => item.id === shoulderId) ?? SHOULDERS[0];
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
      const clothing = clothingIds(ids);
      const match = STARTS.find((start) => start.lookId === look.id && start.pieces.length === clothing.length && start.pieces.every((id) => clothing.includes(id)));
      setStartId(match?.id ?? "");
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

  function applyStart(start: (typeof STARTS)[number]) {
    setStartId(start.id);
    applyLook([...start.pieces], start.lifestyle, start.lookId);
    setNote((current) => {
      const without = current.replace(/Starting set: [^.]+\.(\s[^.]+\.)?/, "").replace(/\s+/g, " ").trim();
      return `Starting set: ${start.name}. ${start.line}${without ? ` ${without}` : ""}`;
    });
    document.getElementById("pieces")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!role) return setError("Say whether this is for yourself or for a client.");
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
          remoteFitting,
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

  function writeTone(index: number, easeLabel?: string, shoulderLabel?: string) {
    const chosen = TONAL_COLORS[index] ?? TONAL_COLORS[0];
    const colorLine = `Tonal color: ${chosen.name}.`;
    const easeLine = easeLabel ? ` Trouser ease: ${easeLabel}.` : "";
    const shoulderLine = shoulderLabel ? ` Shoulder: ${shoulderLabel}.` : "";
    setNote((current) => {
      const without = current
        .replace(/Tonal color: [^.]+\./, "")
        .replace(/Trouser ease: [^.]+\./, "")
        .replace(/Shoulder: [^.]+\./, "")
        .replace(/\s+/g, " ")
        .trim();
      return `${without}${without ? " " : ""}${colorLine}${easeLine}${shoulderLine}`.trim();
    });
  }

  function rememberFit() {
    writeTone(toneAt, ease.label, shoulder.label);
    document.getElementById("introduction")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function requestTone(index: number) {
    setToneAt(index);
    writeTone(index, ease.label, shoulder.label);
    document.getElementById("introduction")?.scrollIntoView({ behavior: "smooth" });
  }

  function toggle(id: string) {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  function addPiece(id: string) {
    setRoster((cur) => (cur.includes(id) ? cur : [...cur, id]));
    if (offerFor(id).kind === "commission") {
      setSelected((cur) => (cur.includes(id) ? cur : [...cur, id]));
    }
  }

  const alternates = CATALOG.filter((piece) => !roster.includes(piece.id));

  return (
    <div>
      <section id="build" className="scroll-mt-28">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-12">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Start here</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[0.95] md:text-5xl">Choose a set and adjust it.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Start from the day, or from the rose sample. Every piece with a photograph can be requested. A fitting, if you add one, is remote. It is not held in person.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {STARTS.map((start) => {
              const on = start.id === startId;
              return (
                <button
                  key={start.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => applyStart(start)}
                  className={`text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a17] ${on ? "ring-2 ring-[#1c1a17]" : ""}`}
                >
                  <span className="block bg-[#e7e0d4]">
                    <img src={start.image} alt={start.alt} className={`h-40 w-full object-cover sm:aspect-[4/5] sm:h-auto ${"frame" in start ? start.frame : "object-top"}`} />
                  </span>
                  <span className="mt-2 block font-serif text-2xl">{start.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-[#1c1a17]/70">{start.line}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-[#1c1a17]/65">
            A single pair does not open a wardrobe.{" "}
            <Link href="/shop#edition" className="underline underline-offset-4">
              Request one founding pair
            </Link>
            , in US men&apos;s 7 through 12.
          </p>
        </div>
      </section>

      <section id="pieces" className="scroll-mt-28 border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">{startId ? `Adjust · ${STARTS.find((start) => start.id === startId)?.name}` : "Adjust"}</p>
            <h2 className="mt-3 font-serif text-4xl">Keep what you want made.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1c1a17]/70">
              {startId
                ? "Uncheck a piece to leave it out. The photographs below are recommended alternates, from pieces that already have an image."
                : "The pieces with photographs are listed below. Choose a starting set, or add any of them."}
            </p>
            {startId === "rose" && (
              <div className="mt-6">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {ROSE_SHEETS.map((sheet) => (
                    <img key={sheet.src} src={sheet.src} alt={sheet.alt} className="h-auto w-full bg-white object-contain" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/65">
                  Sample sheets. Reconstructions, not physical samples. Proposed, not approved. Cloth is unconfirmed, and no price is listed. The measures in the pack are not shown here.
                </p>
              </div>
            )}
            <ul className="mt-6 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              {heldLine && (
                <li className="flex items-center gap-4 py-3">
                  <span className="grid size-11 shrink-0 place-items-center border border-[#1c1a17] text-[11px]">In</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-2xl">{heldLine.name}</span>
                    <span className="text-[13px] text-[#1c1a17]/60">{heldLine.ref} · 2027 line · proposed, not a checkout</span>
                  </span>
                </li>
              )}
              {visiblePieces(roster).length === 0 && !heldLine && <li className="py-4 text-sm text-[#1c1a17]/60">Nothing kept yet. Add a piece from the photographs below.</li>}
              {visiblePieces(roster).map((piece) => {
                const offer = offerFor(piece.id);
                if (offer.kind !== "commission") {
                  return (
                    <li key={piece.id} className="flex items-center gap-4 py-3">
                      {piece.image && <img src={piece.image} alt="" className="size-14 shrink-0 bg-[#e7e0d4] object-contain" />}
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{piece.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">Available · ${offer.usd} · made to order</span>
                      </span>
                      <Link href={offer.href} className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                        Request this pair
                      </Link>
                    </li>
                  );
                }
                const on = selected.includes(piece.id);
                return (
                  <li key={piece.id}>
                    <label className="flex min-h-11 cursor-pointer items-center gap-4 py-3">
                      <input type="checkbox" checked={on} onChange={() => toggle(piece.id)} className="size-5 accent-[#1c1a17]" />
                      {piece.image && <img src={piece.image} alt="" className="size-14 shrink-0 bg-[#e7e0d4] object-contain" />}
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{piece.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">Available to request</span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">{startId ? "Recommended alternates" : "Available now"}</p>
              {alternates.length === 0 ? (
                <p className="mt-3 text-sm text-[#1c1a17]/60">Every photographed piece is in the list above.</p>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {alternates.map((piece) => (
                    <AlternateCard key={piece.id} piece={piece} onAdd={() => addPiece(piece.id)} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div id="fit" className="scroll-mt-28 border border-[#1c1a17]/15 bg-[#1c1a17] p-4 text-[#f6f4ef] md:p-5">
            <p className="text-[11px] tracking-[0.16em] text-[#f6f4ef]/55 uppercase">Virtual fit</p>
            <h2 className="mt-2 font-serif text-4xl">Find your ease.</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <figure className="bg-[#2a2824]">
                <img src="/editorial/saint-john-worn.webp" alt="Lucien in the camel Saint John jacket and trouser, worn as a fit reference" className="h-56 w-full object-contain md:h-64" />
                <figcaption className="ms-caption px-2 pb-2 text-xs text-[#f6f4ef]/70">Lucien, in Saint John. Worn. Not a client. The shoes are not a founding runner.</figcaption>
              </figure>
              <figure className="bg-[#2a2824]">
                <img src="/editorial/saint-michael-back.webp" alt="Back of the olive Saint Michael jacket, with Saint Michael the Archangel" className="h-56 w-full object-contain md:h-64" />
                <figcaption className="ms-caption px-2 pb-2 text-xs text-[#f6f4ef]/70">Saint Michael, the back. A different study from the worn photograph.</figcaption>
              </figure>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#f6f4ef]/75">The fitting is remote. It is not held in person. Measurements are not entered here. A remote fitting consultation can be added with the introduction. It has no listed price.</p>
            <p className="mt-5 text-sm text-[#f6f4ef]/80">How should the shoulder feel?</p>
            <div className="mt-2 grid grid-cols-2 gap-2" role="tablist" aria-label="Shoulder">
              {SHOULDERS.map((item) => {
                const on = item.id === shoulder.id;
                return (
                  <button key={item.id} type="button" role="tab" aria-selected={on} onClick={() => setShoulderId(item.id)} className={`h-12 text-sm ${on ? "bg-[#f6f4ef] text-[#1c1a17]" : "border border-[#f6f4ef]/30 text-[#f6f4ef]"}`}>
                    {item.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-5 text-sm text-[#f6f4ef]/80">How should the trousers feel?</p>
            <div className="mt-2 grid grid-cols-3 gap-2" role="tablist" aria-label="Trouser ease">
              {EASES.map((item) => {
                const on = item.id === ease.id;
                return (
                  <button key={item.id} type="button" role="tab" aria-selected={on} onClick={() => setEaseId(item.id)} className={`h-12 text-sm ${on ? "bg-[#f6f4ef] text-[#1c1a17]" : "border border-[#f6f4ef]/30 text-[#f6f4ef]"}`}>
                    {item.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#f6f4ef]/75">{shoulder.line} {ease.line} A preference for the conversation, not a measurement.</p>
            <button type="button" onClick={rememberFit} className="mt-5 inline-flex h-12 w-full items-center justify-center bg-[#f6f4ef] px-5 text-sm tracking-[0.12em] text-[#1c1a17] uppercase">
              Carry this into the introduction
            </button>
          </div>
        </div>
      </section>

      <TonalSlideshow onIndex={setToneAt} onRequest={requestTone} />
      <div id="commission" className="scroll-mt-28" />
      <section id="introduction" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Private introduction</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Send the set you built.</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            This writes the set and who is writing. No payment is taken. A fitting, if you add one, is remote, and it is not an appointment. The house writes back to the email you give. A response time is not promised.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={send} className="order-2 space-y-8 lg:order-1">
              {sent ? (
                <div className="border border-[#1c1a17]/15 p-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase">Received · {sent}</p>
                  <p className="mt-3 font-serif text-3xl">The request is with the house.</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#1c1a17]/70">
                    The house will write to {email}. This is not an appointment, and nothing was charged.
                    {remoteFitting ? " A remote fitting consultation is part of this request. It is not booked on a calendar, and it has no listed price." : ""}
                    {" "}A founding pair, if you want one, is requested from the shop.
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
                          ["myself", "Myself"],
                          ["client", "On behalf of a client"],
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
                        <option value="quoted">Ask for a quotation</option>
                      </select>
                    </label>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 border border-[#1c1a17]/15 p-4">
                    <input type="checkbox" checked={remoteFitting} onChange={(e) => setRemoteFitting(e.target.checked)} className="mt-1 size-5 accent-[#1c1a17]" />
                    <span>
                      <span className="block font-serif text-2xl">Add a remote fitting consultation</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[#1c1a17]/70">Optional. The fitting is remote, and it is not held in person. This asks the house to include that conversation. It is not a measurement, it is not an appointment, and it has no listed price.</span>
                    </span>
                  </label>

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
