"use client";

import { STYLES } from "@/lib/collection";
import { DEFAULT_ASSUMPTIONS, PUBLISHED, eur, pct, usd, type Assumptions, type CollectionCost } from "@/lib/costing";
import { cn } from "@/lib/utils";

type Field = { key: keyof Assumptions; label: string; unit: string; step?: number };

const GROUPS: { title: string; fields: Field[] }[] = [
  {
    title: "Factory, per pair",
    fields: [
      { key: "makeRunner", label: "Make, runner", unit: "€" },
      { key: "makeMule", label: "Make, Trail Mule", unit: "€" },
      { key: "soleRunner", label: "Sole unit, runner", unit: "€" },
      { key: "soleMule", label: "Sole unit, mule", unit: "€" },
      { key: "packaging", label: "Box and packing", unit: "€", step: 0.1 },
      { key: "customDyeUpcharge", label: "Dye-to-target upcharge", unit: "%" },
    ],
  },
  {
    title: "Landing in the US",
    fields: [
      { key: "freight", label: "Freight", unit: "€/pr", step: 0.1 },
      { key: "duty", label: "Duty on FOB", unit: "%" },
      { key: "fx", label: "USD per EUR", unit: "", step: 0.01 },
    ],
  },
  {
    title: "Development (MEES published)",
    fields: [
      { key: "designFee", label: "Design, per style", unit: "€" },
      { key: "samplingFee", label: "Sampling, per style", unit: "€" },
      { key: "moldPerSize", label: "Outsole mold, per size", unit: "€" },
      { key: "sizes", label: "Sizes in the run", unit: "" },
    ],
  },
  {
    title: "Buy and price",
    fields: [
      { key: "units", label: "Pairs per look", unit: "pr", step: 10 },
      { key: "retailMultiple", label: "Retail ÷ total cost", unit: "×", step: 0.1 },
    ],
  },
];

export function AssumptionsPanel({ value, onChange }: { value: Assumptions; onChange: (a: Assumptions) => void }) {
  const set = (k: keyof Assumptions, v: number | boolean) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {GROUPS.map((g) => (
        <fieldset key={g.title} className="space-y-1.5">
          <legend className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#22201d]/55">{g.title}</legend>
          {g.fields.map((f) => (
            <label key={f.key} className="flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-1.5">
                {f.label}
                <span className={cn("rounded-[2px] px-1 font-mono text-[8px] uppercase", PUBLISHED.has(f.key) ? "bg-emerald-700/15 text-emerald-800" : "bg-amber-500/20 text-amber-900")}>
                  {PUBLISHED.has(f.key) ? "MEES" : "est."}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  step={f.step ?? 1}
                  value={value[f.key] as number}
                  onChange={(e) => set(f.key, Number(e.target.value) || 0)}
                  className="w-[76px] rounded border border-[#22201d]/15 bg-white/80 px-1.5 py-0.5 text-right font-mono text-[12px] outline-none focus:border-[#22201d]/50"
                />
                <span className="w-7 font-mono text-[10px] text-[#22201d]/50">{f.unit}</span>
              </span>
            </label>
          ))}
          {g.title.startsWith("Development") && (
            <label className="flex items-center gap-2 pt-1 text-[12px]">
              <input type="checkbox" checked={value.customOutsole} onChange={(e) => set("customOutsole", e.target.checked)} />
              Custom outsole molds (otherwise MEES catalog soles)
            </label>
          )}
        </fieldset>
      ))}
    </div>
  );
}

export function CostTable({ cost }: { cost: CollectionCost }) {
  const rows: { label: string; get: (i: number) => string; strong?: boolean; hint?: string }[] = [
    { label: "Upper and lining materials", get: (i) => eur(cost.looks[i].materials) },
    { label: "Trims and decoration", get: (i) => eur(cost.looks[i].trims) },
    { label: "Sole unit", get: (i) => eur(cost.looks[i].sole) },
    { label: "Make", get: (i) => eur(cost.looks[i].make) },
    { label: "Packaging", get: (i) => eur(cost.looks[i].packaging) },
    { label: "FOB Portugal", get: (i) => eur(cost.looks[i].fob), strong: true },
    { label: "Freight + duty", get: (i) => eur(cost.looks[i].freight + cost.looks[i].duty) },
    { label: "Landed", get: (i) => eur(cost.looks[i].landed), strong: true },
    { label: "Development per pair", get: (i) => eur(cost.looks[i].devPerPair), hint: "Design and sampling spread over every pair of that style" },
    { label: "Total cost per pair", get: (i) => `${eur(cost.looks[i].totalEur)} · ${usd(cost.looks[i].totalUsd, 2)}`, strong: true },
    { label: "Retail", get: (i) => usd(cost.looks[i].retailUsd), strong: true },
    { label: "Wholesale (half of retail)", get: (i) => usd(cost.looks[i].wholesaleUsd) },
    { label: "Margin, direct", get: (i) => pct(cost.looks[i].dtcMargin) },
    { label: "Margin, wholesale", get: (i) => pct(cost.looks[i].wholesaleMargin) },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-left text-[13px]">
        <thead>
          <tr className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#22201d]/55">
            <th className="py-2 font-normal">Per pair</th>
            {cost.looks.map((l) => (
              <th key={l.index} className="py-2 text-right font-normal">
                Look 0{l.index + 1} · {STYLES[l.style].short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={cn("border-t border-[#22201d]/10", r.strong && "bg-[#22201d]/[0.035] font-medium")}>
              <td className="py-1.5 pr-3" title={r.hint}>{r.label}</td>
              {cost.looks.map((l, i) => (
                <td key={l.index} className="py-1.5 text-right font-mono text-[12px]">{r.get(i)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CostTotals({ cost }: { cost: CollectionCost }) {
  const items = [
    ["Pairs", cost.units.toLocaleString("en-US")],
    ["Production at FOB", eur(cost.fobTotal, 0)],
    ["Development", eur(cost.devTotal, 0)],
    ["Cash out, landed + dev", eur(cost.cashOutEur, 0)],
    ["Retail value", usd(cost.retailValueUsd)],
    ["Blended direct margin", pct(cost.blendedDtcMargin)],
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#22201d]/10 bg-[#22201d]/10 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(([k, v]) => (
        <div key={k} className="bg-[#fbf8f2] p-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#22201d]/55">{k}</dt>
          <dd className="mt-1 font-serif text-2xl leading-none">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export { DEFAULT_ASSUMPTIONS };
