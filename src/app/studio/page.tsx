"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Download, ImageUp, Plus, Printer, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Flat, LookCard } from "@/components/studio/look";
import {
  CONCEPT_PALETTE, FAMILY_LABEL, RECIPES, ROLE_INFO, VERDICT_INFO,
  assignRoles, buildCollection, driveView, summarize, thumbSrc, toCsv,
  type RecipeId, type Role, type SlotConfig, type StyleId, type Verdict,
} from "@/lib/collection";
import { extractPalette, inkOn, normalizeHex } from "@/lib/color";

const DEFAULT_SLOTS: SlotConfig[] = [
  { style: "runner", recipe: "hero" },
  { style: "mule", recipe: "tonal" },
  { style: "runner", recipe: "inverse" },
];
const STORE = "ms-studio-v1";
const MAX = 7;

type Saved = { palette: string[]; slots: SlotConfig[] };

function ColorField({ hex, onChange, onRemove, canRemove }: { hex: string; onChange: (h: string) => void; onRemove: () => void; canRemove: boolean }) {
  const [draft, setDraft] = useState(hex);
  useEffect(() => setDraft(hex), [hex]);
  return (
    <div className="group flex items-center gap-1.5 rounded-lg border border-[#22201d]/15 bg-white/70 p-1 pr-1.5">
      <label className="relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-md border border-black/10" style={{ background: hex }}>
        <input type="color" value={hex} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label={`Pick color ${hex}`} />
      </label>
      <input
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          const n = normalizeHex(e.target.value);
          if (n) onChange(n);
        }}
        onBlur={() => setDraft(hex)}
        spellCheck={false}
        className="w-[74px] bg-transparent font-mono text-[12px] uppercase outline-none"
        aria-label="Hex value"
      />
      <button onClick={onRemove} disabled={!canRemove} className="rounded p-0.5 text-[#22201d]/40 hover:bg-black/5 hover:text-[#22201d] disabled:invisible" aria-label="Remove color">
        <X className="size-3.5" />
      </button>
    </div>
  );
}

export default function Studio() {
  const [palette, setPalette] = useState<string[]>(CONCEPT_PALETTE);
  const [slots, setSlots] = useState<SlotConfig[]>(DEFAULT_SLOTS);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) ?? "null") as Saved | null;
      if (s?.palette?.length) setPalette(s.palette);
      if (s?.slots?.length === 3) setSlots(s.slots);
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(STORE, JSON.stringify({ palette, slots }));
  }, [palette, slots, loaded]);

  const tones = useMemo(() => assignRoles(palette), [palette]);
  const results = useMemo(() => buildCollection(tones, slots), [tones, slots]);
  const summary = useMemo(() => summarize(results), [results]);
  const sourced = results.reduce((n, r) => n + r.lines.filter((l) => l.match).length, 0);

  function setSlot(i: number, patch: Partial<SlotConfig>) {
    setSlots((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  }

  async function onImage(file: File) {
    setError(null);
    setExtracting(true);
    try {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("That file could not be read as an image."));
        img.src = url;
      });
      const scale = Math.min(1, 160 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * scale));
      c.height = Math.max(1, Math.round(img.height * scale));
      const ctx = c.getContext("2d");
      if (!ctx) throw new Error("Canvas is unavailable in this browser.");
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      const out = extractPalette(ctx.getImageData(0, 0, c.width, c.height).data, 6);
      if (out.length < 2) throw new Error("Not enough color in that image. Try a swatch board or a product shot on a plain ground.");
      setPalette(out.slice(0, MAX));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed.");
    } finally {
      setExtracting(false);
    }
  }

  function exportCsv() {
    const blob = new Blob([toCsv(results)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "MADE-SAiNT-collection-materials.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const roles = Object.keys(ROLE_INFO) as Role[];

  return (
    <div className="min-h-screen bg-[#efe9dd] text-[#22201d] print:bg-white">
      <header className="sticky top-0 z-20 border-b border-[#22201d]/10 bg-[#efe9dd]/95 backdrop-blur print:static">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-serif text-2xl leading-none">MADE SAiNT</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#22201d]/60">Collection Studio · materials sourced from MEES</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <Link href="/" className="px-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#22201d]/60 hover:text-[#22201d]">
              Trail Mule package
            </Link>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer /> Print
            </Button>
            <Button size="sm" onClick={exportCsv} className="bg-[#22201d] text-[#f7f3ea] hover:bg-[#22201d]/85">
              <Download /> Material list CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-6">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h1 className="font-serif text-3xl leading-none">Palette</h1>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#22201d]/50">{palette.length} of {MAX}</span>
            </div>
            <p className="mt-2 max-w-prose text-[13px] text-[#22201d]/70">
              Type hex values, pick colors, or pull them from an image. Each color is given a job on the shoe. Anything missing is derived and marked.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {palette.map((h, i) => (
                <ColorField
                  key={i}
                  hex={h}
                  canRemove={palette.length > 1}
                  onChange={(v) => setPalette((p) => p.map((x, j) => (j === i ? v : x)))}
                  onRemove={() => setPalette((p) => p.filter((_, j) => j !== i))}
                />
              ))}
              {palette.length < MAX && (
                <Button variant="outline" className="h-[42px] border-dashed bg-transparent" onClick={() => setPalette((p) => [...p, "#9a8f82"])}>
                  <Plus /> Add
                </Button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onImage(e.target.files[0])} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={extracting}>
                <ImageUp /> {extracting ? "Reading image…" : "Extract from image"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setPalette(CONCEPT_PALETTE); setSlots(DEFAULT_SLOTS); }}>
                <RotateCcw /> Concept palette
              </Button>
            </div>
            {error && <p role="alert" className="mt-3 rounded-md bg-rose-100 px-3 py-2 text-[13px] text-rose-900">{error}</p>}
            {tones.unused.length > 0 && (
              <p className="mt-3 text-[12px] text-[#22201d]/60">
                Not used by any role: {tones.unused.join(", ")}. Five roles is the ceiling for a clean collection.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4">
            <h2 className="font-serif text-3xl leading-none">Roles</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {roles.map((r) => (
                <div key={r} className="overflow-hidden rounded-lg border border-black/10">
                  <div className="flex h-16 items-end justify-between p-2" style={{ background: tones[r], color: inkOn(tones[r]) }}>
                    <span className="font-mono text-[11px] uppercase">{tones[r]}</span>
                    {tones.derived.includes(r) && <span className="rounded-sm bg-black/25 px-1 font-mono text-[9px] uppercase text-white">derived</span>}
                  </div>
                  <div className="bg-white/70 p-2">
                    <p className="text-[13px] font-medium">{ROLE_INFO[r].label}</p>
                    <p className="text-[11px] leading-snug text-[#22201d]/60">{ROLE_INFO[r].job}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-[#22201d]/65">
              <span className="flex items-center gap-1.5"><span className="size-3.5 rounded-sm border border-black/10" style={{ background: tones.bodyTint }} /> body tint {tones.bodyTint}</span>
              <span className="flex items-center gap-1.5"><span className="size-3.5 rounded-sm border border-black/10" style={{ background: tones.bodyShade }} /> body shade {tones.bodyShade}</span>
              <span>Lining and emblem stay fixed across all three looks.</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="lineup" className="rounded-xl border border-[#22201d]/15 bg-[#f7f3ea] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="lineup" className="font-serif text-3xl leading-none">The collection</h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#22201d]/50">
              {summary.articles.length} MEES articles · {sourced} sourced components · {summary.soles.length} sole units
            </p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {results.map((r) => (
              <div key={r.index}>
                <Flat style={r.style} colors={r.colors} view="lateral" />
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#22201d]/60">
                  0{r.index + 1} · {r.style === "runner" ? "Runner" : "Trail Mule"} · {RECIPES[r.recipe].label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          {results.map((r, i) => (
            <LookCard key={i} result={r} onStyle={(s: StyleId) => setSlot(i, { style: s })} onRecipe={(rc: RecipeId) => setSlot(i, { recipe: rc })} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4">
            <h2 className="font-serif text-3xl leading-none">Material consolidation</h2>
            <p className="mt-2 text-[13px] text-[#22201d]/65">
              Every MEES card the collection draws on, with where it is used. A card shared across looks means one minimum order covers several colorways.
            </p>
            <ul className="mt-4 divide-y divide-[#22201d]/10">
              {summary.articles.map(({ article, uses }) => (
                <li key={article.id} className="flex gap-3 py-2.5">
                  <a href={driveView(article.id)} target="_blank" rel="noreferrer" className="shrink-0">
                    <Image src={thumbSrc(article.id)} alt={`${article.ref} card`} width={56} height={56} unoptimized className="size-14 rounded-md border border-black/10 object-cover" />
                  </a>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px]">
                      <span className="font-mono">{article.ref}</span> · {FAMILY_LABEL[article.family]}
                      <span className="ml-2 font-mono text-[10px] text-[#22201d]/45">{article.path} / {article.name}</span>
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {[...new Map(uses.map((u) => [`${u.slot}${u.hex}`, u])).values()].map((u) => (
                        <span key={`${u.slot}${u.hex}`} className="inline-flex items-center gap-1 rounded-sm bg-[#22201d]/6 px-1.5 py-0.5 text-[11px]">
                          <span className="size-2.5 rounded-[2px] border border-black/10" style={{ background: u.hex }} />
                          Look 0{u.slot} · {uses.filter((x) => x.slot === u.slot && x.hex === u.hex).map((x) => x.component).join(", ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4">
              <h2 className="font-serif text-2xl leading-none">Sourcing verdicts</h2>
              <ul className="mt-3 space-y-2">
                {(Object.keys(VERDICT_INFO) as Verdict[]).map((v) => (
                  <li key={v} className="flex items-start gap-2 text-[12px]">
                    <span className={`mt-0.5 min-w-8 rounded-sm px-1.5 text-center font-mono text-[11px] ${VERDICT_INFO[v].tone}`}>{summary.verdicts[v]}</span>
                    <span><b className="font-medium">{VERDICT_INFO[v].label}.</b> <span className="text-[#22201d]/65">{VERDICT_INFO[v].rule}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4">
              <h2 className="font-serif text-2xl leading-none">Sole units</h2>
              <ul className="mt-3 space-y-3">
                {summary.soles.map((s) => (
                  <li key={s.id} className="flex gap-3">
                    <a href={driveView(s.id)} target="_blank" rel="noreferrer" className="shrink-0">
                      <Image src={thumbSrc(s.id)} alt={s.label} width={64} height={64} unoptimized className="size-16 rounded-md border border-black/10 object-cover" />
                    </a>
                    <div className="text-[12px]">
                      <p className="text-[13px] font-medium">{s.label}</p>
                      <p className="font-mono text-[10px] text-[#22201d]/50">{s.path} / {s.name} · {s.sizes}</p>
                      <p className="mt-0.5 text-[#22201d]/65">{s.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4">
              <h2 className="font-serif text-2xl leading-none">Trims to specify</h2>
              <p className="mt-2 text-[12px] text-[#22201d]/65">Not in the MEES library. Send these targets to MEES for trim sourcing.</p>
              <ul className="mt-3 space-y-1.5">
                {summary.trims.map((t) => (
                  <li key={t.label} className="flex items-center justify-between gap-2 text-[13px]">
                    <span>{t.label}</span>
                    <span className="flex gap-1">
                      {[...t.hexes].map((h) => (
                        <span key={h} title={h} className="size-4 rounded-sm border border-black/10" style={{ background: h }} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#a2362f]/30 bg-[#fbf8f2] p-4 text-[13px] leading-relaxed text-[#22201d]/75">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#a2362f]">Read before sending to MEES</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Card colors are measured from MEES photos on Google Drive. Lighting shifts them, so every ΔE is a starting point. Confirm against physical swatch cards.</li>
            <li>Texture families are a visual read of each card. Confirm the article, weight, and minimum with MEES before costing.</li>
            <li>Sole compound colors are pigment-matched by the sole maker. The verdict there tells you how far the target sits from their standard colors.</li>
            <li>The winged emblem comes from the founder file. The flats show a placeholder block in its position and color only.</li>
            <li>Wordmark is MADE SAiNT with a lowercase i. The runner concept image shows an uppercase I. The flats follow the brand rule.</li>
            <li>No style codes or SKUs are assigned here. Look 03 reuses the runner flat until a third locked flat is supplied.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
