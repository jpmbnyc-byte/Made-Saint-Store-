"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { visiblePieces, type FitInput, type LifestyleId } from "@/lib/private-client";
import type { CommissionScope } from "@/lib/commission";
import { lineByRef } from "@/lib/line";
import { customerName, lookBySlug } from "@/lib/line-shop";
import { lookById, lookForLifestyle, offerFor } from "@/lib/looks";
import { PIECES, type WardrobePiece } from "@/lib/wardrobe";
import { StatusMark } from "@/components/house/status-mark";
import { WardrobeIntro } from "@/components/wardrobe/intro";
import { PreviewTrigger, WardrobePreview, type PreviewFrame } from "@/components/wardrobe/preview";
import { TONAL_COLORS, TonalSlideshow } from "@/components/wardrobe/tonal";
import { IMAGE_STATUS_LABEL, IMAGE_STATUS_MARK, statusFromNote } from "@/lib/image-status";
import { tonalRunner } from "@/lib/tonal-runners";
import { copy } from "@/lib/copy";

const CATALOG = PIECES.filter((piece) => {
  if (!piece.image || offerFor(piece.id).kind === "waitlist") return false;
  return statusFromNote(piece.note, Boolean(piece.image)) !== "proposed";
});

function clothingIds(ids: readonly string[]) {
  return ids.filter((id) => offerFor(id).kind === "commission");
}

function AlternateCard({
  piece,
  onAdd,
  onPreview,
}: {
  piece: WardrobePiece;
  onAdd: () => void;
  onPreview: (frame: PreviewFrame) => void;
}) {
  const offer = offerFor(piece.id);
  const status = statusFromNote(piece.note, Boolean(piece.image));
  return (
    <div className="flex flex-col border border-[#1c1a17]/10 bg-white">
      <div className="relative bg-[#e7e0d4]">
        {piece.image ? (
          <PreviewTrigger
            src={piece.image}
            alt={piece.name}
            caption={`${IMAGE_STATUS_LABEL[status]}. Click stays a study — not a checkout.`}
            className="relative block w-full"
            imgClassName="h-44 w-full object-contain sm:h-52"
            onOpen={onPreview}
          >
            <StatusMark status={status} className="pointer-events-none absolute left-2 top-2" />
            <span className="pointer-events-none absolute bottom-2 right-2 bg-[#1c1a17]/75 px-2 py-1 text-[10px] tracking-[0.14em] text-[#f5f0e8] uppercase">
              View
            </span>
          </PreviewTrigger>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="font-serif text-lg leading-tight">{piece.name}</p>
        <p className="mt-1 text-[12px] leading-snug text-[#1c1a17]/60">
          {IMAGE_STATUS_LABEL[status]}.{" "}
          {offer.kind === "commission" ? "Available to request" : `Available · $${offer.usd} · made to order`}
        </p>
        {offer.kind === "commission" ? (
          <button type="button" onClick={onAdd} className="mt-3 h-10 text-left text-[11px] tracking-[0.12em] uppercase underline underline-offset-4">
            Add to request
          </button>
        ) : (
          <Link href={offer.href} className="mt-3 inline-flex h-10 items-center text-[11px] tracking-[0.12em] uppercase underline underline-offset-4">
            Request this pair
          </Link>
        )}
      </div>
    </div>
  );
}

const EASES = [
  { id: "tailored", label: "Tailored", line: "Closer through the leg. Still room to sit.", fit: "close" as const },
  { id: "easy", label: "Easy", line: "A little room to move. A clean, tapered line.", fit: "standard" as const },
  { id: "relaxed", label: "Relaxed", line: "More room through the thigh. The hem stays clean.", fit: "generous" as const },
] as const;

const SHOULDERS = [
  { id: "structured", label: "Structured", line: "A cleaner line through the shoulder." },
  { id: "relaxed", label: "Relaxed", line: "More room through the shoulder." },
] as const;

const PHYSIQUES = [
  {
    id: "athletic-tall",
    label: "Athletic · tall",
    line: "Longer sleeve and rise. Structured shoulder. Tailored through the leg with room to move.",
  },
  {
    id: "athletic",
    label: "Athletic",
    line: "Broader through the chest and thigh. Clean hem.",
  },
  {
    id: "standard",
    label: "Standard",
    line: "House base proportions.",
  },
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
] as const;

export function PrivateHouse() {
  const [lifestyleId, setLifestyleId] = useState<LifestyleId>("arrival");
  const [startId, setStartId] = useState("");
  const [focusLookId, setFocusLookId] = useState<string | null>(null);
  const [roster, setRoster] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [lineRef, setLineRef] = useState("");
  const [lineColor, setLineColor] = useState("");
  const [lineSize, setLineSize] = useState("");
  const [lineImage, setLineImage] = useState("");
  const [collectionLook, setCollectionLook] = useState("");
  const [matchingPieces, setMatchingPieces] = useState<string[]>([]);
  const [scope, setScope] = useState<CommissionScope>("look");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [settings, setSettings] = useState("");
  const [desiredDates, setDesiredDates] = useState("");
  const [role, setRole] = useState<"" | "wearer" | "stylist" | "payer" | "assistant">("");
  const [timing, setTiming] = useState<"" | "season" | "year" | "undecided">("");
  const [budget, setBudget] = useState<"" | "undisclosed" | "seasonal" | "annual" | "expanded" | "quoted">("");
  const [toneAt, setToneAt] = useState(0);
  const [easeId, setEaseId] = useState<(typeof EASES)[number]["id"]>("tailored");
  const [shoulderId, setShoulderId] = useState<(typeof SHOULDERS)[number]["id"]>("structured");
  const [physiqueId, setPhysiqueId] = useState<(typeof PHYSIQUES)[number]["id"]>("athletic-tall");
  const [preview, setPreview] = useState<PreviewFrame | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [remoteFitting, setRemoteFitting] = useState(false);

  const ease = EASES.find((item) => item.id === easeId) ?? EASES[0];
  const shoulder = SHOULDERS.find((item) => item.id === shoulderId) ?? SHOULDERS[0];
  const physique = PHYSIQUES.find((item) => item.id === physiqueId) ?? PHYSIQUES[0];
  const clothes = visiblePieces(selected);
  const heldLine = lineByRef(lineRef);
  const castLook = collectionLook ? lookBySlug(collectionLook) : undefined;
  const activeLook = focusLookId ? lookById(focusLookId) : roster.length ? lookForLifestyle(lifestyleId) : undefined;
  const requestTitle = castLook?.title
    ?? (clothes.length === 0 && heldLine ? customerName(heldLine) : activeLook?.name)
    ?? "A commission";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lookParam = params.get("look") ?? "";
    const wardrobeLook = lookById(lookParam);
    const cast = lookBySlug(lookParam);
    const line = lineByRef(params.get("ref") ?? "");
    const color = (params.get("color") ?? "").trim();
    const size = (params.get("size") ?? "").trim();
    const image = (params.get("image") ?? "").trim();
    const match = (params.get("match") ?? "")
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
    if (line) setLineRef(line.ref);
    if (color) setLineColor(color);
    if (size) setLineSize(size);
    if (image.startsWith("/")) setLineImage(image);
    if (match.length) setMatchingPieces(match);
    if (wardrobeLook) {
      const ids = wardrobeLook.pieces.map((piece) => piece.id);
      const clothing = clothingIds(ids);
      const startMatch = STARTS.find((start) => start.lookId === wardrobeLook.id && start.pieces.length === clothing.length && start.pieces.every((id) => clothing.includes(id)));
      setStartId(startMatch?.id ?? "");
      setLifestyleId(wardrobeLook.lifestyle);
      setFocusLookId(wardrobeLook.id);
      setRoster(ids);
      setSelected(clothingIds(ids));
      setNote((current) => current || `${wardrobeLook.name}. ${wardrobeLook.read}`);
      return;
    }
    if (cast) {
      setCollectionLook(cast.slug);
      setLineImage((current) => current || cast.image);
      setLineColor((current) => current || cast.pieces[0]?.color || "");
      if (line || cast.pieces[0]) setLineRef(line?.ref ?? cast.pieces[0]!.ref);
      setRoster([]);
      setSelected([]);
      setScope("piece");
      const matchNames = match.length
        ? match
        : (cast.offers ?? []).filter((offer) => offer.kind === "runner").map((offer) => offer.name);
      if (matchNames.length) setMatchingPieces(matchNames);
      setNote((current) => current || `${cast.title}. ${cast.styling[0] ?? "Printed jersey enquiry."}`);
      return;
    }
    if (line) {
      setRoster([]);
      setSelected([]);
      setScope("piece");
      if (color) setNote((current) => current || `${customerName(line)}${color ? ` — ${color}` : ""}.`);
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
    if (!note.trim() && !settings.trim() && selected.length === 0 && !lineRef && !collectionLook) {
      return setError("Say what you are dressing for, or choose the pieces you want to discuss.");
    }
    setBusy(true);
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          note,
          settings,
          desiredDates,
          role,
          timing,
          budget,
          scope,
          lookId: activeLook?.id ?? "",
          collectionLook,
          pieceIds: selected,
          lineRef,
          lineColor,
          lineSize,
          lineImage,
          matchingPieces,
          fit: {
            shoulderStyle: shoulder.id,
            ease: ease.fit,
            height: physiqueId === "athletic-tall" ? "196" : "",
            thigh: physiqueId === "athletic" || physiqueId === "athletic-tall" ? "66" : "",
            sleeve: physiqueId === "athletic-tall" ? "70" : "",
            inseam: physiqueId === "athletic-tall" ? "90" : "",
          } satisfies Partial<FitInput>,
          remoteFitting,
          privacyConsent: false,
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

  function writeTone(index: number, easeLabel?: string, shoulderLabel?: string, physiqueLabel?: string) {
    const chosen = TONAL_COLORS[index] ?? TONAL_COLORS[0];
    const runner = tonalRunner(chosen.id);
    const colorLine = `Tonal color: ${chosen.name}.`;
    const runnerLine = runner ? ` Matching runner: ${runner.name}.` : "";
    const easeLine = easeLabel ? ` Trouser ease: ${easeLabel}.` : "";
    const shoulderLine = shoulderLabel ? ` Shoulder: ${shoulderLabel}.` : "";
    const physiqueLine = physiqueLabel ? ` Physique: ${physiqueLabel}.` : "";
    setNote((current) => {
      const without = current
        .replace(/Tonal color: [^.]+\./, "")
        .replace(/Matching runner: [^.]+\./, "")
        .replace(/Trouser ease: [^.]+\./, "")
        .replace(/Shoulder: [^.]+\./, "")
        .replace(/Physique: [^.]+\./, "")
        .replace(/\s+/g, " ")
        .trim();
      return `${without}${without ? " " : ""}${colorLine}${runnerLine}${easeLine}${shoulderLine}${physiqueLine}`.trim();
    });
    if (runner) setMatchingPieces([runner.name]);
  }

  function rememberFit() {
    writeTone(toneAt, ease.label, shoulder.label, physique.label);
    document.getElementById("style")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function requestTone(index: number) {
    setToneAt(index);
    writeTone(index, ease.label, shoulder.label, physique.label);
    setScope((current) => {
      if (current === "season" || current === "annual" || current === "expanded" || current === "atelier") return current;
      return "look";
    });
    document.getElementById("introduction")?.scrollIntoView({ behavior: "smooth" });
  }

  function choosePhysique(id: (typeof PHYSIQUES)[number]["id"]) {
    setPhysiqueId(id);
    if (id === "athletic-tall" || id === "athletic") {
      setShoulderId("structured");
      setEaseId("tailored");
    }
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
      <WardrobeIntro />
      <WardrobePreview frame={preview} onClose={() => setPreview(null)} />

      <section id="build" className="scroll-mt-28">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-12">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Step 01 · {copy.wardrobe.selectionHeading}</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[0.95] md:text-5xl">Choose a look or a selection of pieces.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            {copy.wardrobe.selectionBody} Open any photograph for the full study, then keep only what you want to discuss.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STARTS.map((start) => {
              const on = start.id === startId;
              return (
                <article
                  key={start.id}
                  className={`flex flex-col text-left ${on ? "ring-2 ring-[#1c1a17] ring-offset-4 ring-offset-[#f5f0e8]" : ""}`}
                >
                  <PreviewTrigger
                    src={start.image}
                    alt={start.alt}
                    caption={start.line}
                    className="relative block w-full bg-[#e7e0d4]"
                    imgClassName={`aspect-[4/5] w-full object-cover ${"frame" in start ? start.frame : "object-top"}`}
                    onOpen={setPreview}
                  >
                    <StatusMark status="study" className="pointer-events-none absolute left-2 top-2" />
                    <span className="pointer-events-none absolute bottom-2 right-2 bg-[#1c1a17]/75 px-2 py-1 text-[10px] tracking-[0.14em] text-[#f5f0e8] uppercase">
                      View look
                    </span>
                  </PreviewTrigger>
                  <h3 className="mt-3 font-serif text-2xl">{start.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-snug text-[#1c1a17]/70">{start.line}</p>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => applyStart(start)}
                    className={`mt-4 inline-flex h-11 items-center justify-center px-4 text-[11px] tracking-[0.14em] uppercase ${
                      on ? "bg-[#1c1a17] text-[#f5f0e8]" : "border border-[#1c1a17] text-[#1c1a17]"
                    }`}
                  >
                    {on ? "Selected" : "Use this set"}
                  </button>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#pieces" className="inline-flex h-12 items-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f5f0e8] uppercase">
              Continue to pieces
            </a>
            <p className="text-sm text-[#1c1a17]/65">
              Prefer a pair first?{" "}
              <Link href="/shop#1101" className="underline underline-offset-4">
                Enquire about 1101
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="pieces" className="scroll-mt-28 border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">{startId ? `Step 02 · Adjust · ${STARTS.find((start) => start.id === startId)?.name}` : "Step 02 · Adjust"}</p>
            <h2 className="mt-3 font-serif text-4xl">Keep what you want made.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1c1a17]/70">
              {startId
                ? "These are the clothes in your set. Uncheck a piece to leave it out. The photographs below are recommended alternates you can add."
                : "Nothing is selected yet. Choose a look above, or add any photographed piece below."}
            </p>
            <ul className="mt-6 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              {heldLine && (
                <li className="flex items-center gap-4 py-3">
                  {(lineImage || castLook?.image) && (
                    <PreviewTrigger
                      src={lineImage || castLook!.image}
                      alt={castLook?.alt ?? customerName(heldLine)}
                      caption="Line piece held for this enquiry."
                      className="relative shrink-0"
                      imgClassName="size-20 bg-[#e7e0d4] object-cover object-top"
                      onOpen={setPreview}
                    />
                  )}
                  {!lineImage && !castLook?.image && (
                    <span className="grid size-11 shrink-0 place-items-center border border-[#1c1a17] text-[11px]">In</span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-2xl">{castLook?.title ?? customerName(heldLine)}</span>
                    <span className="text-[13px] text-[#1c1a17]/60">
                      {heldLine.ref}
                      {lineColor ? ` · ${lineColor}` : ""}
                      {lineSize ? ` · size ${lineSize}` : ""}
                      {" · 2027 line · enquire"}
                    </span>
                  </span>
                </li>
              )}
              {visiblePieces(roster).length === 0 && !heldLine && <li className="py-4 text-sm text-[#1c1a17]/60">Nothing kept yet. Add a piece from the photographs below.</li>}
              {visiblePieces(roster).map((piece) => {
                const offer = offerFor(piece.id);
                const status = statusFromNote(piece.note, Boolean(piece.image));
                if (offer.kind !== "commission") {
                  return (
                    <li key={piece.id} className="flex items-center gap-4 py-3">
                      {piece.image && (
                        <PreviewTrigger
                          src={piece.image}
                          alt={piece.name}
                          caption={`${IMAGE_STATUS_LABEL[status]} · $${offer.usd}`}
                          className="relative shrink-0"
                          imgClassName="size-20 bg-[#e7e0d4] object-contain"
                          onOpen={setPreview}
                        >
                          <StatusMark status={status} className="pointer-events-none absolute -left-1 -top-1 scale-90" />
                        </PreviewTrigger>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{piece.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">{IMAGE_STATUS_LABEL[status]} · ${offer.usd} · made to order</span>
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
                    <div className="flex min-h-11 items-center gap-4 py-3">
                      <input type="checkbox" checked={on} onChange={() => toggle(piece.id)} className="size-5 accent-[#1c1a17]" aria-label={`Keep ${piece.name}`} />
                      {piece.image && (
                        <PreviewTrigger
                          src={piece.image}
                          alt={piece.name}
                          caption={`${IMAGE_STATUS_LABEL[status]} · available to request`}
                          className="relative shrink-0"
                          imgClassName="size-20 bg-[#e7e0d4] object-contain"
                          onOpen={setPreview}
                        >
                          <StatusMark status={status} className="pointer-events-none absolute -left-1 -top-1 scale-90" />
                        </PreviewTrigger>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl">{piece.name}</span>
                        <span className="text-[13px] text-[#1c1a17]/60">{IMAGE_STATUS_LABEL[status]} · available to request</span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">{startId ? "Recommended alternates" : "Available to request"}</p>
              {alternates.length === 0 ? (
                <p className="mt-3 text-sm text-[#1c1a17]/60">Every photographed piece is in the list above.</p>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {alternates.map((piece) => (
                    <AlternateCard key={piece.id} piece={piece} onAdd={() => addPiece(piece.id)} onPreview={setPreview} />
                  ))}
                </div>
              )}
            </div>
            <a href="#fit" className="mt-8 inline-flex h-12 items-center border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase lg:hidden">
              Continue to fit
            </a>
          </div>

          <div id="fit" className="scroll-mt-28 border border-[#1c1a17]/15 bg-[#1c1a17] p-4 text-[#f6f4ef] md:p-5">
            <p className="text-[11px] tracking-[0.16em] text-[#f6f4ef]/55 uppercase">Step 02 · {copy.wardrobe.preferencesHeading}</p>
            <h2 className="mt-2 font-serif text-4xl">Share the fit you prefer.</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <figure className="bg-[#2a2824]">
                <PreviewTrigger
                  src="/editorial/saint-john-worn.webp"
                  alt="Lucien in the camel Saint John jacket and trouser, worn as a fit reference"
                  caption="Lucien, in Saint John. Worn. Not a client."
                  className="relative block w-full"
                  imgClassName="h-56 w-full object-contain md:h-64"
                  onOpen={setPreview}
                />
                <figcaption className="ms-caption px-2 pb-2 text-xs text-[#f6f4ef]/70">Lucien, in Saint John. Open for the full frame.</figcaption>
              </figure>
              <figure className="bg-[#2a2824]">
                <PreviewTrigger
                  src="/editorial/saint-michael-back.webp"
                  alt="Back of the olive Saint Michael jacket, with Saint Michael the Archangel"
                  caption="Saint Michael, the back. A different study from the worn photograph."
                  className="relative block w-full"
                  imgClassName="h-56 w-full object-contain md:h-64"
                  onOpen={setPreview}
                />
                <figcaption className="ms-caption px-2 pb-2 text-xs text-[#f6f4ef]/70">Saint Michael, the back. Open for the full frame.</figcaption>
              </figure>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#f6f4ef]/75">
              {copy.wardrobe.preferencesNote}
            </p>
            <p className="mt-5 text-sm text-[#f6f4ef]/80">Physique</p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3" role="tablist" aria-label="Physique">
              {PHYSIQUES.map((item) => {
                const on = item.id === physique.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => choosePhysique(item.id)}
                    className={`h-12 text-sm ${on ? "bg-[#f6f4ef] text-[#1c1a17]" : "border border-[#f6f4ef]/30 text-[#f6f4ef]"}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
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
            <p className="mt-4 text-sm leading-relaxed text-[#f6f4ef]/75">
              {physique.line} {shoulder.line} {ease.line} A preference for the conversation, not a measurement.
            </p>
            <button type="button" onClick={rememberFit} className="mt-5 inline-flex h-12 w-full items-center justify-center bg-[#f6f4ef] px-5 text-sm tracking-[0.12em] text-[#1c1a17] uppercase">
              Continue to tonal color
            </button>
          </div>
        </div>
      </section>

      <TonalSlideshow onIndex={setToneAt} onRequest={requestTone} />

      <div className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-8">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-[#8d7349] uppercase">Next</p>
            <p className="mt-2 max-w-xl font-serif text-2xl md:text-3xl">Pieces, fit and colour — ready to enquire.</p>
          </div>
          <a href="#introduction" className="inline-flex h-12 items-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f5f0e8] uppercase">
            {copy.enquiry.submit}
          </a>
        </div>
      </div>

      <div id="commission" className="scroll-mt-28" />
      <section id="introduction" className="scroll-mt-28 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Step 04 · Your enquiry</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Send your enquiry.</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Tell us about the pieces, fit, use and any dates you have in mind. No payment is taken with this enquiry.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={send} className="order-2 space-y-8 lg:order-1">
              {sent ? (
                <div className="border border-[#1c1a17]/15 p-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase">Received · {sent}</p>
                  <p className="mt-3 font-serif text-3xl">Enquiry received.</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#1c1a17]/70">
                    Your selected pieces and notes have been sent to MADE SAiNT. We will write to {email}.
                    {remoteFitting ? " A remote fitting note is included with this enquiry." : ""}
                  </p>
                  <Link href="/shop#1101" className="mt-6 inline-flex h-12 items-center border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase">
                    Enquire about 1101
                  </Link>
                </div>
              ) : (
                <>
                  <fieldset>
                    <legend className="font-serif text-2xl">Ordering for</legend>
                    <p className="mt-2 text-sm text-[#1c1a17]/65">Optional.</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {(
                        [
                          ["wearer", "Myself"],
                          ["stylist", "Someone else"],
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
                        required
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
                        required
                        className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal"
                      />
                    </label>
                  </div>
                  <label className="block text-[11px] tracking-[0.12em] uppercase">
                    Delivery country
                    <input
                      value={settings}
                      onChange={(e) => setSettings(e.target.value)}
                      placeholder="Optional"
                      className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal placeholder:text-[#1c1a17]/35"
                    />
                  </label>
                  <label className="block text-[11px] tracking-[0.12em] uppercase">
                    Date needed, if any
                    <input
                      value={desiredDates}
                      onChange={(e) => setDesiredDates(e.target.value)}
                      placeholder="Optional"
                      className="mt-1 h-12 w-full border border-[#1c1a17]/20 bg-white/70 px-3 text-base normal-case tracking-normal placeholder:text-[#1c1a17]/35"
                    />
                  </label>
                  <label className="block text-[11px] tracking-[0.12em] uppercase">
                    What are you dressing for?
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      placeholder="Work, travel, occasions — or anything else we should know."
                      className="mt-1 w-full border border-[#1c1a17]/20 bg-white/70 px-3 py-3 text-base normal-case tracking-normal placeholder:text-[#1c1a17]/35"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 border border-[#1c1a17]/15 p-4">
                    <input type="checkbox" checked={remoteFitting} onChange={(e) => setRemoteFitting(e.target.checked)} className="mt-1 size-5 accent-[#1c1a17]" />
                    <span>
                      <span className="block font-serif text-2xl">Ask about fit</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[#1c1a17]/70">Optional. Include a fit note with this enquiry. It does not confirm that a size or adjustment is available.</span>
                    </span>
                  </label>

                  {error && <p className="text-sm">{error}</p>}
                  <button type="submit" disabled={busy} className="inline-flex h-12 w-full items-center justify-center bg-[#1c1a17] px-6 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase disabled:opacity-60 sm:w-auto">
                    {busy ? "Sending…" : "Send enquiry"}
                  </button>
                </>
              )}
            </form>

            <aside className="order-1 h-fit border border-[#1c1a17]/15 p-6 lg:sticky lg:top-28 lg:order-2">
              <p className="text-[11px] tracking-[0.16em] uppercase">This request</p>
              <h3 className="mt-3 font-serif text-3xl">{requestTitle}</h3>
              {(lineImage || castLook?.image) && (
                <PreviewTrigger
                  src={lineImage || castLook!.image}
                  alt={castLook?.alt ?? requestTitle}
                  caption="Held for this enquiry."
                  className="relative mt-4 block w-full max-w-[220px]"
                  imgClassName="aspect-[3/4] w-full bg-[#e7e0d4] object-cover object-top"
                  onOpen={setPreview}
                >
                  <span className="pointer-events-none absolute bottom-2 right-2 bg-[#1c1a17]/75 px-2 py-1 text-[10px] tracking-[0.14em] text-[#f5f0e8] uppercase">
                    View
                  </span>
                </PreviewTrigger>
              )}
              <ul className="mt-4 space-y-2 text-sm">
                {heldLine && (
                  <li>
                    {heldLine.ref} · {customerName(heldLine)}
                    {lineColor ? ` · ${lineColor}` : ""}
                    {lineSize ? ` · size ${lineSize}` : ""}
                  </li>
                )}
                <li className="text-[#1c1a17]/70">
                  Fit · {physique.label} · {shoulder.label} shoulder · {ease.label} ease
                </li>
                {matchingPieces.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {clothes.map((piece) => (
                  <li key={piece.id}>
                    {piece.name}
                    <span className="text-[#1c1a17]/50"> · {IMAGE_STATUS_MARK[statusFromNote(piece.note, Boolean(piece.image))]}</span>
                  </li>
                ))}
                {clothes.length === 0 && !heldLine && <li className="text-[#1c1a17]/60">No piece selected yet — color and fit can still go in the note.</li>}
              </ul>
              <div className="mt-6 space-y-3 border-t border-[#1c1a17]/10 pt-4 text-[13px] leading-relaxed text-[#1c1a17]/70">
                <p>
                  <span className="font-medium text-[#1c1a17]">No payment is taken with this enquiry.</span> We will confirm materials, price and delivery before you order.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a href="#build" className="underline underline-offset-4">
                    Edit set
                  </a>
                  <a href="#style" className="underline underline-offset-4">
                    Edit color
                  </a>
                  <a href="#fit" className="underline underline-offset-4">
                    Edit fit
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
