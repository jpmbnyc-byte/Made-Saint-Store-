"use client";

import Image from "next/image";
import { MuleFlat } from "@/components/flats/mule";
import { RunnerFlat } from "@/components/flats/runner";
import {
  FAMILY_LABEL, RECIPES, STYLES, VERDICT_INFO, driveView, thumbSrc,
  type Line, type RecipeId, type SlotResult, type StyleId,
} from "@/lib/collection";
import { inkOn } from "@/lib/color";
import { eur, pct, usd, type LookCost } from "@/lib/costing";
import { cn } from "@/lib/utils";

const PAPER = "#f7f3ea";

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-md border border-[#22201d]/20 bg-white/60 p-0.5 print:hidden">
      {options.map((o) => (
        <button
          key={o.id}
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "rounded px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
            value === o.id ? "bg-[#22201d] text-[#f7f3ea]" : "text-[#22201d]/70 hover:bg-[#22201d]/8",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Flat({ style, colors, view }: { style: StyleId; colors: Record<string, string>; view: "lateral" | "top" }) {
  const F = style === "runner" ? RunnerFlat : MuleFlat;
  return <F colors={colors} view={view} paper={PAPER} className="w-full [&_svg]:h-auto [&_svg]:w-full" />;
}

function Chip({ hex, size = "size-5" }: { hex: string; size?: string }) {
  return <span className={cn("inline-block shrink-0 rounded-sm border border-black/15", size)} style={{ background: hex }} />;
}

function VerdictBadge({ line }: { line: Line }) {
  const v = VERDICT_INFO[line.verdict];
  return (
    <span title={v.rule} className={cn("inline-flex whitespace-nowrap rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]", v.tone)}>
      {v.label}
    </span>
  );
}

type RenderInfo = { file: string; swatches: string[] };

function SpecRow({ line, eurPerPair }: { line: Line; eurPerPair?: number }) {
  const m = line.match;
  return (
    <tr className="border-t border-[#22201d]/10 align-top">
      <td className="py-2 pr-3">
        <div className="flex items-start gap-2">
          <Chip hex={line.hex} />
          <div>
            <p className="text-[13px] font-medium leading-tight">{line.component.label}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#22201d]/55">
              {line.tone.replace("body", "body ").trim()} · {line.hex}
            </p>
          </div>
        </div>
      </td>
      <td className="py-2 pr-3">
        {m ? (
          <div className="flex items-start gap-2">
            <a href={driveView(m.article.id)} target="_blank" rel="noreferrer" className="shrink-0" title="Open the MEES card on Google Drive">
              <Image src={thumbSrc(m.article.id)} alt={`${m.article.ref} card`} width={44} height={44} unoptimized className="size-11 rounded-sm border border-black/10 object-cover" />
            </a>
            <div className="min-w-0">
              <p className="text-[13px] leading-tight">
                <span className="font-mono text-[12px]">{m.article.ref}</span> · {FAMILY_LABEL[m.article.family]}
              </p>
              <p className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-[#22201d]/55">
                card <Chip hex={m.cardHex} size="size-3" /> {m.cardHex} · ΔE {m.dE.toFixed(1)}
                {line.reused && <span className="ml-1 rounded-sm bg-[#22201d]/10 px-1">shared</span>}
              </p>
              {line.sole && <p className="mt-0.5 text-[11px] text-[#22201d]/65">Compound color on {line.sole.label.toLowerCase()} ({line.sole.path})</p>}
              {line.alternatives.length > 0 && (
                <p className="mt-1 flex items-center gap-1 print:hidden">
                  <span className="font-mono text-[10px] text-[#22201d]/45">alts</span>
                  {line.alternatives.map((a) => (
                    <a key={a.article.id} href={driveView(a.article.id)} target="_blank" rel="noreferrer" title={`${a.article.ref} · ΔE ${a.dE.toFixed(1)}`}>
                      <Image src={thumbSrc(a.article.id)} alt={a.article.ref} width={22} height={22} unoptimized className="size-5.5 rounded-[2px] border border-black/10 object-cover" />
                    </a>
                  ))}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-[12px] leading-snug text-[#22201d]/70">{line.component.spec}</p>
        )}
      </td>
      <td className="py-2 text-right">
        <VerdictBadge line={line} />
        {eurPerPair !== undefined && eurPerPair > 0 && <p className="mt-1 font-mono text-[10px] text-[#22201d]/55">{eur(eurPerPair)}/pr est.</p>}
      </td>
    </tr>
  );
}

export function LookCard({
  result, cost, render, onStyle, onRecipe,
}: {
  result: SlotResult;
  cost?: LookCost;
  render?: RenderInfo;
  onStyle: (s: StyleId) => void;
  onRecipe: (r: RecipeId) => void;
}) {
  const style = STYLES[result.style];
  const groups = ["Upper", "Lining", "Trim", "Bottom", "Decoration"] as const;
  const keyColors = [...new Set(result.lines.filter((l) => l.component.group !== "Decoration").map((l) => l.hex))];
  return (
    <article className="break-inside-avoid overflow-hidden rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] print:break-after-page">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22201d]/10 px-4 py-3">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl leading-none">Look 0{result.index + 1}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#22201d]/60">
            {style.short} · {RECIPES[result.recipe].label}
          </span>
          {cost && (
            <span className="font-mono text-[11px] text-[#22201d]/80">
              FOB {eur(cost.fob)} · total {usd(cost.totalUsd, 2)} · retail {usd(cost.retailUsd)} · {pct(cost.dtcMargin)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Segmented label="Locked flat" value={result.style} onChange={onStyle} options={[{ id: "runner", label: "Runner" }, { id: "mule", label: "Trail Mule" }]} />
          <Segmented label="Recipe" value={result.recipe} onChange={onRecipe} options={(Object.keys(RECIPES) as RecipeId[]).map((id) => ({ id, label: RECIPES[id].label }))} />
        </div>
      </header>

      {render && (
        <figure className="relative border-b border-[#22201d]/10 bg-[#ece6da]">
          <Image src={render.file} alt={`Look 0${result.index + 1} hero render`} width={1600} height={900} unoptimized className="h-auto max-h-[560px] w-full object-cover" />
          <figcaption className="absolute bottom-2 left-2 flex flex-wrap items-center gap-1.5 rounded-md bg-[#fbf8f2]/90 px-2 py-1 text-[11px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#a2362f]">AI render</span>
            from the locked flat and MEES swatch photos {render.swatches.join(", ")}. Not a sample photo.
          </figcaption>
        </figure>
      )}

      <div className="grid gap-px bg-[#22201d]/10 md:grid-cols-2">
        <figure className="bg-[#f7f3ea] p-3">
          <Flat style={result.style} colors={result.colors} view="lateral" />
          <figcaption className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#22201d]/50">Lateral</figcaption>
        </figure>
        <figure className="bg-[#f7f3ea] p-3">
          <Flat style={result.style} colors={result.colors} view="top" />
          <figcaption className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#22201d]/50">Top</figcaption>
        </figure>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#22201d]/10 px-4 py-2.5">
        <div className="flex">
          {keyColors.map((h) => (
            <span key={h} className="-ml-0.5 first:ml-0 grid h-6 w-10 place-items-center border border-black/10 font-mono text-[8px]" style={{ background: h, color: inkOn(h) }}>
              {h.slice(1)}
            </span>
          ))}
        </div>
        <p className="text-[12px] text-[#22201d]/65">{RECIPES[result.recipe].idea}</p>
      </div>

      <div className="overflow-x-auto px-4 pb-3">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#22201d]/50">
              <th className="py-2 font-normal">Component · target</th>
              <th className="py-2 font-normal">MEES article</th>
              <th className="py-2 text-right font-normal">Sourcing</th>
            </tr>
          </thead>
          {groups.map((g) => {
            const rows = result.lines.filter((l) => l.component.group === g);
            if (!rows.length) return null;
            return (
              <tbody key={g}>
                <tr>
                  <td colSpan={3} className="pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a2362f]">{g}</td>
                </tr>
                {rows.map((l) => (
                  <SpecRow key={l.component.id} line={l} eurPerPair={cost?.lines.find((c) => c.id === l.component.id)?.eur} />
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
    </article>
  );
}
