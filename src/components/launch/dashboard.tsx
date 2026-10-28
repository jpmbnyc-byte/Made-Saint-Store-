"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BENCHMARKS, CAMPAIGN, DTC, LUXURY_SPEC, LUXURY_UPCHARGE, PRODUCTS, SIZES,
  FUNDING, campaignStatus, fmtDate, fundingTimeline, launchEconomics, shipWindow, sizeRun,
} from "@/lib/business";
import { DEFAULT_ASSUMPTIONS, eur, pct, usd } from "@/lib/costing";
import type { Reservation, Tally } from "@/lib/preorders";
import type { FundingId } from "@/lib/business";

const LAUNCH = PRODUCTS.filter((p) => p.launch);
const a = DEFAULT_ASSUMPTIONS;
const card = "rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-4 md:p-5";
const label = "font-mono text-[10px] uppercase tracking-[0.12em] text-[#22201d]/55";
const Est = () => <span className="ml-1 rounded bg-[#22201d]/8 px-1 font-mono text-[9px] tracking-[0.08em] text-[#22201d]/55 uppercase">est.</span>;

const CHANNELS = [
  { name: "Sample shoot and launch film", share: 0.3, why: "Still life on the gray ground of the renders, plus on-foot in a city setting. Every channel runs on this content." },
  { name: "Founder-led content", share: 0.1, why: "Weekly posts from Felgueiras: cutting, closing, lasting. The pre-order is the story; progress updates are the content." },
  { name: "Seeding and private previews", share: 0.25, why: "Try-on appointments with samples for 25 to 40 tastemakers in menswear, travel and alpine circles, where Bogner customers already are." },
  { name: "Paid social, retargeting only", share: 0.25, why: "Spend only against the list and site visitors during the window. No cold prospecting at launch." },
  { name: "Press kit and trade outreach", share: 0.1, why: "Made-to-order in Portugal, numbered pairs, refund promise. Pitched to menswear editors and newsletters." },
];

const PILLARS = [
  { t: "Quiet, not loud", d: "No logo on the upper beyond the tongue wordmark. Cucinelli's restraint, priced where a Bogner customer can say yes." },
  { t: "Made after you choose it", d: "Made-to-order is the luxury, not a funding mechanism. Say it plainly: we make only what is reserved." },
  { t: "Numbered, never discounted", d: "Each founding pair carries its number. One price, first day to last. No codes, no sale, no outlet." },
  { t: "Proof of the bench", d: "Show the hands and the materials. Every claim (calf lining, hand finishing) is photographed in the workshop." },
];

const KPIS = [
  { k: "List before the window", v: "3,000 emails", d: "From content, seeding and the waitlist on the shop." },
  { k: "List to reservation", v: "8 to 12%", d: "Typical for a warm list on a limited drop; 3,000 at 10% is 300 pairs." },
  { k: "Marketing per pair sold", v: "Under $60", d: "Below 10% of the average price." },
  { k: "Colorways confirmed", v: "3 of 3", d: `Each needs ${CAMPAIGN.threshold} pairs by ${fmtDate(CAMPAIGN.closes)}.` },
  { k: "Size exchanges", v: "Under 8%", d: "Fit notes on every product page; half size up when between." },
];

function addDays(iso: string, d: number) {
  const t = new Date(iso + "T12:00:00Z");
  t.setUTCDate(t.getUTCDate() + d);
  return t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function LaunchDashboard({
  tally,
  reservations,
  adminProtected,
  payments,
  now,
}: {
  tally: Tally;
  reservations: Reservation[] | null;
  adminProtected: boolean;
  payments: "stripe" | "mock";
  now: string;
}) {
  const launch = LAUNCH;
  const [pairs, setPairs] = useState(CAMPAIGN.threshold);
  const [fundingId, setFundingId] = useState<FundingId>("render");
  const model = FUNDING.find((f) => f.id === fundingId) ?? FUNDING[0];
  const [marketing, setMarketing] = useState(model.marketingUsd);

  const econ = useMemo(() => launchEconomics(pairs), [pairs]);
  const timelineInput = useMemo(
    () => ({
      pairs: launch.map(() => pairs),
      prices: launch.map((p) => p.usd),
      landedUsd: econ.map((e) => e.landedUsd + DTC.fulfilmentUsd),
      fobUsd: econ.map((e) => e.fobUsd),
      devUsdPerStyle: (a.designFee + a.samplingFee) * a.fx,
    }),
    [pairs, econ, launch],
  );
  const cash = useMemo(() => fundingTimeline(model, { ...timelineInput, marketingUsd: marketing }), [model, timelineInput, marketing]);
  const compare = useMemo(
    () =>
      FUNDING.map((f) => {
        const t = fundingTimeline(f, { ...timelineInput, marketingUsd: f.marketingUsd });
        return { f, owner: -Math.min(0, ...t.map((c) => c.balance)), profit: t[t.length - 1].balance };
      }),
    [timelineInput],
  );
  const peak = Math.min(0, ...cash.map((c) => c.balance));
  const profit = cash[cash.length - 1].balance;
  const reservedTotal = launch.reduce((s, p) => s + (tally.pairs[p.id] ?? 0), 0);
  const revenueReserved = launch.reduce((s, p) => s + (tally.pairs[p.id] ?? 0) * p.usd, 0);
  const status = campaignStatus(new Date(now));
  const daysTo = (iso: string) => Math.max(0, Math.ceil((new Date(iso + "T05:00:00Z").getTime() - new Date(now).getTime()) / 864e5));
  const run = sizeRun(pairs);

  const scaleMin = 250;
  const scaleMax = 1450;
  const x = (v: number) => `${((v - scaleMin) / (scaleMax - scaleMin)) * 100}%`;

  function exportCsv() {
    if (!reservations) return;
    const head = ["id", "kind", "status", "product", "size", "number", "name", "email", "amount_usd", "created_at", "paid_at", "stripe_session"];
    const lines = reservations.map((r) =>
      [r.id, r.kind, r.status, r.productId, r.size ?? "", r.number ?? "", r.name ?? "", r.email, r.amountUsd, r.createdAt, r.paidAt ?? "", r.stripeSession ?? ""]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const el = document.createElement("a");
    el.href = URL.createObjectURL(blob);
    el.download = "MADE-SAiNT-reservations.csv";
    el.click();
    URL.revokeObjectURL(el.href);
  }

  return (
    <div className="min-h-screen bg-[#efe9dd] text-[#22201d]">
      <header className="sticky top-0 z-20 border-b border-[#22201d]/10 bg-[#efe9dd]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-serif text-2xl leading-none">MADE SAiNT</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[#22201d]/60 uppercase">Launch plan · pre-order, pricing, cash, marketing</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.1em] text-[#22201d]/60 uppercase">
            <Link href="/studio" className="hover:text-[#22201d]">Studio</Link>
            <Link href="/" className="hover:text-[#22201d]">Trail Mule</Link>
            <Link href="/shop" className="rounded-md bg-[#22201d] px-3 py-1.5 text-[#f7f3ea] hover:bg-[#22201d]/85">Open the shop</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-6">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Campaign", status === "upcoming" ? "Private access" : status === "open" ? "Window open" : "Closed", `${fmtDate(CAMPAIGN.opens)} to ${fmtDate(CAMPAIGN.closes)}`],
            status === "upcoming"
              ? ["Days to the window", String(daysTo(CAMPAIGN.opens)), `${daysTo(CAMPAIGN.closes)} days to close · ships ${shipWindow()}`]
              : ["Days to close", String(daysTo(CAMPAIGN.closes)), `Ships ${shipWindow()}`],
            ["Pairs reserved", `${reservedTotal} / ${CAMPAIGN.threshold * launch.length}`, `${launch.length} colorways × ${CAMPAIGN.threshold}`],
            ["Reserved revenue", usd(revenueReserved), payments === "stripe" ? "Paid through Stripe" : "Recorded, payments not connected"],
            ["Waitlist, Edition 002", String(Object.values(tally.waitlist).reduce((s, n) => s + n, 0)), "Emails across three colorways"],
          ].map(([k, v, d]) => (
            <div key={k} className={card}>
              <p className={label}>{k}</p>
              <p className="mt-2 font-serif text-3xl leading-none">{v}</p>
              <p className="mt-2 text-[12px] text-[#22201d]/60">{d}</p>
            </div>
          ))}
        </section>

        <section className={card}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-serif text-3xl">Price position</h2>
            <p className="max-w-xl text-[13px] text-[#22201d]/65">
              Above Bogner&apos;s top full-price sneaker, well under Cucinelli&apos;s entry runner. Close enough to Cucinelli to borrow the
              frame of reference, priced for the Bogner customer trading up.
            </p>
          </div>
          <div className="relative mt-10 mb-14 h-px bg-[#22201d]/25">
            {[300, 500, 700, 900, 1100, 1300].map((v) => (
              <span key={v} className="absolute top-3 -translate-x-1/2 font-mono text-[10px] text-[#22201d]/45" style={{ left: x(v) }}>${v}</span>
            ))}
            {BENCHMARKS.map((b) => (
              <span
                key={b.item}
                title={`${b.brand} ${b.item} $${b.usd}`}
                className={`absolute -top-[5px] size-[11px] -translate-x-1/2 rounded-full border-2 ${b.brand === "Bogner" ? "border-[#8a6a43] bg-[#efe9dd]" : "border-[#22201d] bg-[#efe9dd]"}`}
                style={{ left: x(b.usd) }}
              />
            ))}
            {launch.map((p) => (
              <span key={p.id} className="absolute -top-[7px] size-[15px] -translate-x-1/2 rounded-full bg-[#9a3b2c]" style={{ left: x(p.usd) }} title={`${p.name} $${p.usd}`} />
            ))}
            <span className="absolute -top-8 -translate-x-1/2 font-mono text-[10px] text-[#8a6a43] uppercase" style={{ left: x(445) }}>Bogner $339–550</span>
            <span className="absolute -top-8 -translate-x-1/2 font-mono text-[10px] text-[#9a3b2c] uppercase" style={{ left: x(620) }}>MADE SAiNT $545–695</span>
            <span className="absolute -top-8 -translate-x-1/2 font-mono text-[10px] uppercase" style={{ left: x(1100) }}>Brunello Cucinelli $795–1,400</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className={`${label} border-b border-[#22201d]/15 text-left`}>
                  <th className="py-2 font-normal">Brand</th><th className="font-normal">Sneaker</th><th className="font-normal">Made in</th><th className="font-normal">Lining</th><th className="text-right font-normal">US list</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((b) => (
                  <tr key={b.item} className="border-b border-[#22201d]/8">
                    <td className="py-2">{b.brand}</td>
                    <td><a href={b.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">{b.item}<ExternalLink className="size-3 opacity-50" /></a></td>
                    <td>{b.made}</td><td>{b.lining}</td><td className="text-right tabular-nums">{usd(b.usd)}</td>
                  </tr>
                ))}
                {launch.map((p) => (
                  <tr key={p.id} className="border-b border-[#22201d]/8 bg-[#9a3b2c]/6">
                    <td className="py-2 font-medium">MADE SAiNT</td><td>{p.name}</td><td>Portugal</td><td>Calf leather (planned)</td><td className="text-right font-medium tabular-nums">{usd(p.usd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[#22201d]/55">US list prices from the brands&apos; own stores and authorised retailers, read October 2026. Both houses line their sneakers in leather or wool; the MADE SAiNT price requires the luxury spec below.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className={card}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl">Unit economics at luxury spec</h2>
                <p className="mt-1 text-[13px] text-[#22201d]/65">Per pair. Studio FOB from the matched MEES materials, plus the luxury upgrades, landed in the US.</p>
              </div>
              <label className="flex items-center gap-2 text-[13px]">
                <span className={label}>Pairs per colorway</span>
                <input type="number" min={50} max={2000} step={10} value={pairs} onChange={(e) => setPairs(Math.max(1, Number(e.target.value) || 1))} className="w-20 rounded-md border border-[#22201d]/20 bg-white px-2 py-1 tabular-nums" />
              </label>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] text-[13px] tabular-nums">
                <thead>
                  <tr className={`${label} border-b border-[#22201d]/15 text-right`}>
                    <th className="py-2 text-left font-normal">Per pair</th>
                    {econ.map((e) => <th key={e.product.id} className="font-normal">{e.product.name.replace("Runner, ", "")}</th>)}
                  </tr>
                </thead>
                <tbody className="text-right">
                  {([
                    ["Studio FOB, MEES materials", (e) => eur(e.studioFobEur), true],
                    ["Luxury spec upgrades", (e) => eur(e.luxuryEur), true],
                    ["FOB Portugal", (e) => eur(e.fobEur), false],
                    [`Duty ${a.duty}% and freight`, (e) => eur(e.dutyEur + a.freight), true],
                    ["Landed", (e) => eur(e.landedEur), false],
                    [`Design and sampling over ${pairs} pairs`, (e) => eur(e.devEur), false],
                    ["Fulfilment, card fees, exchange reserve", (e) => usd(e.dtcUsd), true],
                    ["All-in cost", (e) => usd(e.allInUsd), false],
                    ["Price", (e) => usd(e.product.usd), false],
                    ["Gross profit", (e) => usd(e.marginUsd), false],
                    ["Gross margin", (e) => pct(e.margin), false],
                    ["Price ÷ landed", (e) => `${e.multiple.toFixed(1)}×`, false],
                  ] as [string, (e: (typeof econ)[number]) => string, boolean][]).map(([k, f, est], i) => (
                    <tr key={k} className={`border-b border-[#22201d]/8 ${i === 7 || i === 10 ? "font-medium" : ""}`}>
                      <td className="py-1.5 text-left">{k}{est && <Est />}</td>
                      {econ.map((e) => <td key={e.product.id}>{f(e)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[12px] text-[#22201d]/55">
              MEES publishes design (€{a.designFee}) and sampling (€{a.samplingFee}) per style but not per-pair production prices, so every per-pair line is an estimate until MEES quotes.
              Development is charged per colorway here, which is conservative. Duty depends on the HTS classification of each upper (leather, textile, denim) and current EU tariffs; confirm with a customs broker.
            </p>
          </div>

          <div className={card}>
            <h2 className="font-serif text-3xl">What the price demands</h2>
            <p className="mt-1 text-[13px] text-[#22201d]/65">Upgrades over the studio spec, so the shoe holds up next to Cucinelli in hand.</p>
            <ul className="mt-4 divide-y divide-[#22201d]/8 text-[13px]">
              {LUXURY_SPEC.map((s) => (
                <li key={s.item} className="flex justify-between gap-4 py-2">
                  <span>{s.item}</span>
                  <span className="shrink-0 tabular-nums">{eur(s.eur)}<Est /></span>
                </li>
              ))}
              <li className="flex justify-between py-2 font-medium"><span>Per pair</span><span className="tabular-nums">{eur(LUXURY_UPCHARGE)}</span></li>
            </ul>
            <div className="mt-4 rounded-lg bg-[#9a3b2c]/8 p-3 text-[12px] leading-relaxed">
              Navy Intrecciato is priced as a hand-woven calf upper. MEES&apos;s library has woven-effect embossed leathers (MEES-020, MEES-021), not true intrecciato. Ask MEES to quote real woven calf before the window opens; if they cannot, sell it as woven-embossed calf at $595.
            </div>
          </div>
        </section>

        <section className={card}>
          <h2 className="font-serif text-3xl">Pre-order tracker</h2>
          <p className="mt-1 text-[13px] text-[#22201d]/65">
            Live from the shop. A colorway goes to MEES only if it reaches {CAMPAIGN.threshold} pairs, which sits inside MEES&apos;s 100 to 150 pair minimum per colorway.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {launch.map((p) => {
              const n = tally.pairs[p.id] ?? 0;
              const go = n >= CAMPAIGN.threshold;
              const bySize = tally.bySize[p.id] ?? {};
              const max = Math.max(1, ...Object.values(bySize));
              return (
                <div key={p.id} className="rounded-lg border border-[#22201d]/12 bg-white/50 p-4">
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-xl">{p.name.replace("Runner, ", "")}</p>
                    <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase ${go ? "bg-[#2f5d3a] text-white" : "bg-[#22201d]/10"}`}>{go ? "Go" : `${CAMPAIGN.threshold - n} to go`}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-[#22201d]/10">
                    <div className="h-full rounded-full bg-[#22201d]" style={{ width: `${Math.min(100, (n / CAMPAIGN.threshold) * 100)}%` }} />
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-[#22201d]/60">{n} of {CAMPAIGN.threshold} · {usd(n * p.usd)}</p>
                  <div className="mt-4 flex h-16 items-end gap-1">
                    {SIZES.map((s) => (
                      <div key={s} className="flex flex-1 flex-col items-center gap-1">
                        <div className="w-full rounded-sm bg-[#22201d]/70" style={{ height: `${((bySize[s] ?? 0) / max) * 44}px` }} title={`US ${s}: ${bySize[s] ?? 0}`} />
                        <span className="font-mono text-[8px] text-[#22201d]/50">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[12px] text-[#22201d]/60">
            If a colorway misses: refund every reservation for it within five business days of {fmtDate(CAMPAIGN.closes)}, or offer a switch to a colorway that made it. Never extend the window more than once.
          </p>
        </section>

        <section className={card} id="funding">
          <h2 className="font-serif text-3xl">Funding model</h2>
          <p className="mt-1 max-w-3xl text-[13px] text-[#22201d]/65">
            How much of your own cash each route needs before customers pay, at {pairs} pairs per colorway. MEES charges design and sampling upfront, so the only way to need no
            capital is to sample after the money is in.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {compare.map(({ f, owner, profit: p }) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFundingId(f.id);
                  setMarketing(f.marketingUsd);
                }}
                aria-pressed={f.id === fundingId}
                className={`flex flex-col rounded-lg border p-4 text-left transition ${f.id === fundingId ? "border-[#22201d] bg-white shadow-sm" : "border-[#22201d]/12 bg-white/40 hover:border-[#22201d]/40"}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-serif text-xl">{f.name}</p>
                  {f.id === "render" && <span className="rounded bg-[#2f5d3a] px-1.5 py-0.5 font-mono text-[9px] text-white uppercase">Suggested</span>}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className={label}>Your cash</p>
                    <p className={`font-serif text-2xl ${owner < 1000 ? "text-[#2f5d3a]" : ""}`}>{usd(owner)}</p>
                  </div>
                  <div>
                    <p className={label}>Gross profit</p>
                    <p className="font-serif text-2xl">{usd(p)}</p>
                  </div>
                </div>
                <p className="mt-1 font-mono text-[10px] text-[#22201d]/50 uppercase">{f.extraWeeks ? `Delivery about ${f.extraWeeks} weeks later` : `Ships ${shipWindow()}`}</p>
                <p className="mt-3 text-[12px] leading-relaxed text-[#22201d]/70">{f.idea}</p>
                <ul className="mt-3 space-y-1 text-[12px]">
                  {f.pros.map((x) => <li key={x} className="flex gap-2"><span className="text-[#2f5d3a]">+</span>{x}</li>)}
                  {f.risks.map((x) => <li key={x} className="flex gap-2 text-[#22201d]/70"><span className="text-[#9a2a1f]">−</span>{x}</li>)}
                </ul>
              </button>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[#22201d]/55">
            Estimates. Your cash is the lowest point of the cash timeline. Under render-first and crowdfunding, the pre-order money pays for samples, so refunds after a failed sample come from what has not yet gone to MEES: never pay the production deposit before the sample is approved.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className={card}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl">Cash flow · {model.name}</h2>
                <p className="mt-1 text-[13px] text-[#22201d]/65">
                  {pairs} pairs in each of {launch.length} colorways, paid in full. MEES: design and sampling paid before work starts, production 50% at order, 50% before dispatch, FOB.
                </p>
              </div>
              <label className="flex items-center gap-2 text-[13px]">
                <span className={label}>Marketing $</span>
                <input type="number" min={0} step={1000} value={marketing} onChange={(e) => setMarketing(Math.max(0, Number(e.target.value) || 0))} className="w-24 rounded-md border border-[#22201d]/20 bg-white px-2 py-1 tabular-nums" />
              </label>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-[13px] tabular-nums">
                <thead>
                  <tr className={`${label} border-b border-[#22201d]/15 text-right`}>
                    <th className="py-2 text-left font-normal">When</th><th className="text-left font-normal">What</th><th className="font-normal">In</th><th className="font-normal">Out</th><th className="font-normal">Balance</th>
                  </tr>
                </thead>
                <tbody className="text-right">
                  {cash.map((c, i) => (
                    <tr key={i} className="border-b border-[#22201d]/8">
                      <td className="py-1.5 text-left whitespace-nowrap text-[#22201d]/60">{c.when}</td>
                      <td className="text-left">{c.what}</td>
                      <td>{c.inUsd ? usd(c.inUsd) : ""}</td>
                      <td>{c.outUsd ? usd(c.outUsd) : ""}</td>
                      <td className={c.balance < 0 ? "text-[#9a2a1f]" : ""}>{usd(c.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-[#22201d] p-3 text-[#f7f3ea]">
                <p className="font-mono text-[10px] tracking-[0.12em] text-[#f7f3ea]/60 uppercase">Your cash needed</p>
                <p className="mt-1 font-serif text-3xl">{usd(-peak)}</p>
                <p className="mt-1 text-[12px] text-[#f7f3ea]/70">{model.sampleFirst === 0 ? "Only pre-launch marketing. Samples and production are paid from the proceeds." : "Samples and marketing before launch. Production is funded by the pre-orders."}</p>
              </div>
              <div className="rounded-lg border border-[#22201d]/15 p-3">
                <p className={label}>Gross profit after delivery</p>
                <p className="mt-1 font-serif text-3xl">{usd(profit)}</p>
                <p className="mt-1 text-[12px] text-[#22201d]/60">Before overheads, tax and exchanges. Estimate.</p>
              </div>
            </div>
          </div>

          <div className={card}>
            <h2 className="font-serif text-3xl">Size run per colorway</h2>
            <p className="mt-1 text-[13px] text-[#22201d]/65">
              The PO goes to MEES from actual reservations. Until then, a typical men&apos;s curve over {pairs} pairs. MEES&apos;s nub sole covers EU 39 to 46.
            </p>
            <table className="mt-4 w-full text-[13px] tabular-nums">
              <thead>
                <tr className={`${label} border-b border-[#22201d]/15 text-right`}>
                  <th className="py-2 text-left font-normal">US</th><th className="font-normal">Curve</th>
                  {launch.map((p) => <th key={p.id} className="font-normal">{p.name.replace("Runner, ", "").split(" ")[0]}</th>)}
                </tr>
              </thead>
              <tbody className="text-right">
                {run.map((r) => (
                  <tr key={r.size} className="border-b border-[#22201d]/8">
                    <td className="py-1 text-left">{r.size}</td>
                    <td>{r.n}</td>
                    {launch.map((p) => <td key={p.id} className="text-[#22201d]/60">{tally.bySize[p.id]?.[r.size] ?? 0}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[12px] text-[#22201d]/55">Colorway columns are live reservations. Order 3 to 5% over in the middle sizes (9 to 10.5) to cover exchanges.</p>
          </div>
        </section>

        <section className={card}>
          <h2 className="font-serif text-3xl">Marketing plan</h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed">
            <em className="font-serif text-xl">Positioning.</em> MADE SAiNT is the quiet runner for people who know Cucinelli and buy Bogner: calf-lined, made to order in Portugal,
            numbered, and never discounted. It costs half of what the Italian houses ask, because we make only what is reserved.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.t} className="border-t border-[#22201d]/20 pt-3">
                <p className="font-serif text-xl">{p.t}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#22201d]/70">{p.d}</p>
              </div>
            ))}
          </div>

          <h3 className={`${label} mt-10`}>Launch sequence</h3>
          <ol className="mt-3 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              ["Now to Dec", "Samples", "Pay MEES design and sampling for the three colorways. Confirm calf lining, woven calf and per-pair quotes. Fit-test the sample size on 10 feet."],
              [`By ${addDays(CAMPAIGN.opens, -42)}`, "Content", "Shoot the samples: gray-ground still life matching the renders, on-foot, and the workshop. Cut the launch film."],
              [`${addDays(CAMPAIGN.opens, -28)} to ${addDays(CAMPAIGN.opens, -1)}`, "Build the list", "Shop live with the waitlist. Private try-on previews with samples. Founder posts from Felgueiras."],
              [`${fmtDate(CAMPAIGN.opens)}`, "Private access", "The list gets 48 hours first. Founding numbers start at 001. Email: the story, the promise, the date it closes."],
              [`To ${fmtDate(CAMPAIGN.closes)}`, "Window", `Weekly progress posts ("82 of ${CAMPAIGN.threshold}"). Retargeting only. A last-call email 48 hours before close. No discounts.`],
              [`${addDays(CAMPAIGN.closes, 1)} on`, "Make and deliver", `Go or no-go per colorway, refunds within five days, PO to MEES. Bench updates every two weeks. Ships ${shipWindow()}.`],
            ].map(([when, t, d], i) => (
              <li key={t} className="rounded-lg border border-[#22201d]/12 bg-white/50 p-3">
                <p className="font-mono text-[10px] text-[#22201d]/50 uppercase">{String(i + 1).padStart(2, "0")} · {when}</p>
                <p className="mt-1 font-serif text-lg">{t}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#22201d]/70">{d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className={label}>Channels and budget<Est /></h3>
              <ul className="mt-3 divide-y divide-[#22201d]/8 text-[13px]">
                {CHANNELS.map((c) => (
                  <li key={c.name} className="py-2.5">
                    <div className="flex justify-between gap-4"><span className="font-medium">{c.name}</span><span className="tabular-nums">{usd(marketing * c.share)}</span></div>
                    <p className="mt-0.5 text-[12px] text-[#22201d]/60">{c.why}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={label}>Targets</h3>
              <ul className="mt-3 divide-y divide-[#22201d]/8 text-[13px]">
                {KPIS.map((k) => (
                  <li key={k.k} className="py-2.5">
                    <div className="flex justify-between gap-4"><span className="font-medium">{k.k}</span><span>{k.v}</span></div>
                    <p className="mt-0.5 text-[12px] text-[#22201d]/60">{k.d}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-[#22201d]/5 p-3 text-[12px] leading-relaxed text-[#22201d]/70">
                Rules for the brand: never show a strike-through price; no influencer discount codes; use photographs of the real samples, not renders, once samples exist;
                say &quot;estimated&quot; on any ship date until MEES confirms production.
              </p>
            </div>
          </div>
        </section>

        <section className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl">Reservations</h2>
              <p className="mt-1 text-[13px] text-[#22201d]/65">
                {payments === "stripe" ? "Stripe is connected; paid reservations are confirmed by the webhook or the return page." : "Stripe is not connected: reservations are recorded without payment. Add STRIPE_SECRET_KEY to take payments."}
              </p>
            </div>
            {reservations && (
              <Button size="sm" onClick={exportCsv} className="bg-[#22201d] text-[#f7f3ea] hover:bg-[#22201d]/85"><Download /> CSV</Button>
            )}
          </div>
          {!reservations ? (
            <p className="mt-4 text-[13px] text-[#22201d]/60">
              {adminProtected ? "Add ?token=… to the URL to see customer details." : "Customer details are hidden in production until ADMIN_TOKEN is set."}
            </p>
          ) : reservations.length === 0 ? (
            <p className="mt-4 rounded-lg border border-dashed border-[#22201d]/20 p-6 text-center text-[13px] text-[#22201d]/60">
              No reservations yet. They appear here as soon as someone reserves on the shop.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-[12px]">
                <thead>
                  <tr className={`${label} border-b border-[#22201d]/15 text-left`}>
                    <th className="py-2 font-normal">Ref</th><th className="font-normal">Type</th><th className="font-normal">Status</th><th className="font-normal">Colorway</th><th className="font-normal">Size</th><th className="font-normal">No.</th><th className="font-normal">Customer</th><th className="text-right font-normal">Amount</th><th className="text-right font-normal">Created (ET)</th>
                  </tr>
                </thead>
                <tbody>
                  {[...reservations].reverse().map((r) => (
                    <tr key={r.id} className="border-b border-[#22201d]/8">
                      <td className="py-1.5 font-mono">{r.id}</td>
                      <td>{r.kind}</td>
                      <td><span className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase ${r.status === "paid" ? "bg-[#2f5d3a] text-white" : r.status === "reserved" ? "bg-[#22201d]/10" : "bg-[#9a3b2c]/15"}`}>{r.status}</span></td>
                      <td>{PRODUCTS.find((p) => p.id === r.productId)?.name.replace("Runner, ", "") ?? r.productId}</td>
                      <td>{r.size ?? ""}</td>
                      <td className="tabular-nums">{r.number ? String(r.number).padStart(3, "0") : ""}</td>
                      <td>{r.name ? `${r.name} · ` : ""}{r.email}</td>
                      <td className="text-right tabular-nums">{r.amountUsd ? usd(r.amountUsd) : ""}</td>
                      <td className="text-right whitespace-nowrap text-[#22201d]/60">{new Date(r.createdAt).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <footer className="mx-auto max-w-[1400px] px-4 pb-10 text-[11px] text-[#22201d]/50">
        Figures marked est. are estimates. Campaign dates are placeholders until MEES confirms the sampling lead time.
      </footer>
    </div>
  );
}
