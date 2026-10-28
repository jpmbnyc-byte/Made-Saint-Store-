import type { Line, SlotResult, StyleId } from "@/lib/collection";

/**
 * Per-pair cost model. MEES publishes start-up costs (design, sampling, outsole molds, MOQ) but not a
 * per-pair production price, so every per-pair figure here is an editable estimate until MEES quotes.
 */
export type Assumptions = {
  fx: number; // USD per EUR
  makeRunner: number; // € per pair, cutting, closing, lasting, factory overhead and margin
  makeMule: number;
  soleRunner: number; // € per pair, catalog sole unit
  soleMule: number;
  packaging: number; // € per pair
  freight: number; // € per pair to the US
  duty: number; // % of FOB
  units: number; // pairs per look (colorway)
  customDyeUpcharge: number; // % on material cost for components that need dyeing to target
  designFee: number; // € per style, MEES published
  samplingFee: number; // € per style, MEES published
  customOutsole: boolean;
  moldPerSize: number; // € per size, MEES published range 1600–2850
  sizes: number;
  retailMultiple: number; // retail price as a multiple of total cost per pair
};

export const DEFAULT_ASSUMPTIONS: Assumptions = {
  fx: 1.08,
  makeRunner: 19,
  makeMule: 14,
  soleRunner: 11.5,
  soleMule: 8.5,
  packaging: 2.8,
  freight: 2.5,
  duty: 20,
  units: 150,
  customDyeUpcharge: 15,
  designFee: 500,
  samplingFee: 2250,
  customOutsole: false,
  moldPerSize: 1600,
  sizes: 8,
  retailMultiple: 4,
};

export const PUBLISHED = new Set<keyof Assumptions>(["designFee", "samplingFee", "moldPerSize"]);

/** € per dm² of cut material, waste included. Estimates. */
const RATE: Record<string, number> = {
  suede: 0.3, "vegan-suede": 0.15, "leather-smooth": 0.28, "leather-exotic": 0.34, "leather-patent": 0.3, "leather-quilted": 0.4,
  "vegan-smooth": 0.12, "vegan-exotic": 0.14, "vegan-crackle": 0.13, mesh: 0.06, knit: 0.08, stretch: 0.04, canvas: 0.05, nylon: 0.07, felt: 0.09,
  pile: 0.08, print: 0.07, check: 0.07, natural: 0.06, cork: 0.1, neoprene: 0.08,
};

/** dm² per pair (both shoes) for a mid-run size, from the flats. Estimates. */
const USAGE: Record<string, number> = {
  "runner.mudguard": 4, "runner.eyestay": 2, "runner.saddle": 1.4, "runner.quarter": 4.5, "runner.tongue": 1.8,
  "runner.mesh": 5, "runner.lining": 6, "runner.sockliner": 2.5,
  "mule.shell": 9, "mule.collar": 1.5, "mule.lining": 8, "mule.tab": 0.4, "mule.footbed": 2.5,
};

/** Flat € per pair for trims and decoration. Estimates. */
const FLAT: Record<string, number> = {
  "runner.laces": 0.35, "runner.eyelets": 0.6, "runner.label": 0.5, "runner.emblem": 0, "runner.print": 0.8, "runner.thread": 0.2,
  "runner.midsole": 2, "mule.grid": 1.2, "mule.thread": 0.15,
};

export type LineCost = { id: string; eur: number; kind: "material" | "trim" | "sole" };

export function lineCost(style: StyleId, line: Line, a: Assumptions): LineCost {
  const key = `${style}.${line.component.id}`;
  const id = line.component.id;
  if (line.component.id === "outsole") return { id, eur: style === "runner" ? a.soleRunner : a.soleMule, kind: "sole" };
  if (key in FLAT) return { id, eur: FLAT[key], kind: line.component.sole ? "sole" : "trim" };
  const family = line.match?.article.family;
  const base = (USAGE[key] ?? 0) * (family ? RATE[family] ?? 0.1 : 0.1);
  const up = line.verdict === "custom" ? 1 + a.customDyeUpcharge / 100 : 1;
  return { id, eur: base * up, kind: "material" };
}

export type LookCost = {
  index: number;
  style: StyleId;
  lines: LineCost[];
  materials: number;
  trims: number;
  sole: number;
  make: number;
  packaging: number;
  fob: number;
  freight: number;
  duty: number;
  landed: number;
  devPerPair: number;
  totalEur: number;
  totalUsd: number;
  retailUsd: number;
  wholesaleUsd: number;
  dtcMargin: number;
  wholesaleMargin: number;
  units: number;
};

export type CollectionCost = {
  looks: LookCost[];
  devByStyle: Record<string, number>;
  units: number;
  fobTotal: number;
  devTotal: number;
  landedTotal: number;
  cashOutEur: number;
  retailValueUsd: number;
  blendedDtcMargin: number;
};

const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
const roundRetail = (usd: number) => Math.max(5, Math.ceil(usd / 5) * 5);

export function costCollection(results: SlotResult[], a: Assumptions): CollectionCost {
  const styles = [...new Set(results.map((r) => r.style))];
  const devByStyle: Record<string, number> = {};
  for (const s of styles) devByStyle[s] = a.designFee + a.samplingFee + (a.customOutsole ? a.moldPerSize * a.sizes : 0);
  const unitsByStyle = (s: StyleId) => results.filter((r) => r.style === s).length * a.units;

  const looks = results.map((r): LookCost => {
    const lines = r.lines.map((l) => lineCost(r.style, l, a));
    const materials = sum(lines.filter((l) => l.kind === "material").map((l) => l.eur));
    const trims = sum(lines.filter((l) => l.kind === "trim").map((l) => l.eur));
    const sole = sum(lines.filter((l) => l.kind === "sole").map((l) => l.eur));
    const make = r.style === "runner" ? a.makeRunner : a.makeMule;
    const fob = materials + trims + sole + make + a.packaging;
    const duty = (fob * a.duty) / 100;
    const landed = fob + a.freight + duty;
    const devPerPair = devByStyle[r.style] / Math.max(1, unitsByStyle(r.style));
    const totalEur = landed + devPerPair;
    const totalUsd = totalEur * a.fx;
    const retailUsd = roundRetail(totalUsd * a.retailMultiple);
    const wholesaleUsd = Math.round(retailUsd / 2);
    return {
      index: r.index, style: r.style, lines, materials, trims, sole, make, packaging: a.packaging, fob,
      freight: a.freight, duty, landed, devPerPair, totalEur, totalUsd, retailUsd, wholesaleUsd,
      dtcMargin: 1 - totalUsd / retailUsd, wholesaleMargin: 1 - totalUsd / wholesaleUsd, units: a.units,
    };
  });

  const units = sum(looks.map((l) => l.units));
  const fobTotal = sum(looks.map((l) => l.fob * l.units));
  const devTotal = sum(Object.values(devByStyle));
  const landedTotal = sum(looks.map((l) => l.landed * l.units));
  const retailValueUsd = sum(looks.map((l) => l.retailUsd * l.units));
  return {
    looks, devByStyle, units, fobTotal, devTotal, landedTotal,
    cashOutEur: landedTotal + devTotal,
    retailValueUsd,
    blendedDtcMargin: 1 - ((landedTotal + devTotal) * a.fx) / retailValueUsd,
  };
}

export const eur = (n: number, d = 2) => `€${n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
export const usd = (n: number, d = 0) => `$${n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
export const pct = (n: number) => `${Math.round(n * 100)}%`;
