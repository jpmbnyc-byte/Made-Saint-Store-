import Image from "next/image";
import {
  CLASS_BAND, CREDIT_BUDGET, ENVELOPE, FAMILIES, FOUNDING_MIX, LOOKS, MENU, MFG_CAP,
  PALETTES, PRIVATE_PRICE, PRIVATE_SLOTS, TIER_ECONOMICS, holdsAtHi, holdsAtMid, mfg, usd,
} from "@/lib/private-foundation";
import { TIERS } from "@/lib/wardrobe";

const blue = PALETTES["blue-hour"];

function Money({ n }: { n: number }) {
  return <span className="tabular-nums">{usd(n)}</span>;
}

export function Foundation() {
  return (
    <div className="bg-[#f6f4ef] text-[#1c1a17]">
      <section className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Private · the $20,000 founding collection</p>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
          Twelve garments. Six patterns. One Blue Hour wardrobe.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Not a theoretical assortment. These are existing MADE SAiNT silhouettes, assigned a pattern family,
          a manufacturing class, a wardrobe value, and the looks they combine into. Manufacturing figures are
          band midpoints, est. — not factory quotes.
        </p>

        <div className={`mt-10 grid gap-4 md:grid-cols-3 ${holdsAtMid ? "border-[#1c1a17]/15" : ""}`}>
          <div className="border border-[#1c1a17]/15 bg-white p-5">
            <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/50 uppercase">Manufacturing, midpoint est.</p>
            <p className="mt-2 font-serif text-4xl"><Money n={mfg.mid} /></p>
            <p className="mt-2 text-[13px] text-[#1c1a17]/65">Cap <Money n={MFG_CAP} /> · headroom <Money n={MFG_CAP - mfg.mid} /></p>
          </div>
          <div className="border border-[#1c1a17]/15 bg-white p-5">
            <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/50 uppercase">If every piece hits the top of its band</p>
            <p className="mt-2 font-serif text-4xl"><Money n={mfg.hi} /></p>
            <p className="mt-2 text-[13px] text-[#1c1a17]/65">{holdsAtHi ? "Still inside the cap." : `Over the cap by ${usd(mfg.hi - MFG_CAP)}. Two cashmere jackets at $850 each are enough to break it.`}</p>
          </div>
          <div className="border border-[#1c1a17]/15 bg-[#1c1a17] p-5 text-[#f6f4ef]">
            <p className="text-[11px] tracking-[0.16em] text-[#f6f4ef]/55 uppercase">Verdict</p>
            <p className="mt-2 font-serif text-3xl leading-tight">{holdsAtMid && !holdsAtHi ? "Holds at the midpoint. Fails at the ceiling." : holdsAtMid ? "Holds." : "Does not hold."}</p>
            <p className="mt-3 text-[13px] text-[#f6f4ef]/70">Private is defensible only if Arrival jackets stay near the middle of class D and cashmere-silk is the exception, not the default.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#1c1a17]/10 bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-8 md:px-8">
          <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/50 uppercase">Blue Hour · the worked example</p>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            {blue.chips.map((c) => (
              <span key={c.name} className="flex items-center gap-2 text-[13px]">
                <span className="size-6 border border-black/10" style={{ background: c.hex }} />
                {c.name}
              </span>
            ))}
            <span className="text-[13px] text-[#1c1a17]/50">+ Charcoal trousers, which coordinate with every jacket.</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-serif text-3xl">The twelve</h3>
          <p className="text-[12px] text-[#1c1a17]/55">{PRIVATE_SLOTS.length} garments · {CREDIT_BUDGET} credits · allocated values sum to {usd(PRIVATE_PRICE)}</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRIVATE_SLOTS.map((s) => {
            const band = CLASS_BAND[s.klass];
            return (
              <article key={s.id} className="border border-[#1c1a17]/12 bg-white">
                <div className="relative aspect-[5/4] bg-[#ebe6dc]">
                  {s.image && !s.pending ? (
                    <Image src={s.image} alt={s.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center">
                      <p className="text-[11px] tracking-[0.16em] text-[#1c1a17]/40 uppercase">Image<br />match pending</p>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 bg-[#f6f4ef]/90 px-2 py-1 text-[10px] tracking-[0.14em] uppercase">{s.color.name}</span>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-[#9a3b2c]">{s.code} · family {s.family}</p>
                  <h4 className="mt-1 font-serif text-xl">{s.name}</h4>
                  <dl className="mt-3 grid grid-cols-3 gap-2 text-[11px] tracking-[0.08em] uppercase text-[#1c1a17]/55">
                    <div>Class {s.klass}<p className="mt-0.5 font-serif text-lg tracking-normal text-[#1c1a17] normal-case"><Money n={band.mid} /></p></div>
                    <div>Credits<p className="mt-0.5 font-serif text-lg tracking-normal text-[#1c1a17] normal-case">{band.credits}</p></div>
                    <div>Wardrobe value<p className="mt-0.5 font-serif text-lg tracking-normal text-[#1c1a17] normal-case"><Money n={s.valueUsd} /></p></div>
                  </dl>
                  {s.photoNote && <p className="mt-3 text-[12px] leading-relaxed text-[#1c1a17]/55">{s.photoNote}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[#1c1a17]/10 bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8">
          <h3 className="font-serif text-3xl">Six pattern families</h3>
          <p className="mt-2 max-w-2xl text-[14px] text-[#1c1a17]/65">Twelve distinct garments without twelve unrelated production patterns. The factory receives a master pattern plus permitted variations.</p>
          <div className="mt-8 grid gap-px bg-[#1c1a17]/10 md:grid-cols-2">
            {FAMILIES.map((f) => (
              <div key={f.id} className="bg-[#f6f4ef] p-5 md:p-6">
                <p className="font-mono text-[11px] tracking-[0.14em] text-[#1c1a17]/50 uppercase">{f.garments} garment{f.garments > 1 ? "s" : ""}</p>
                <h4 className="mt-1 font-serif text-2xl">{f.name}</h4>
                <p className="mt-1 text-[13px] text-[#1c1a17]/65">{f.master}</p>
                <ol className="mt-4 space-y-1 text-[13px] text-[#1c1a17]/75">
                  {f.menu.map((m) => <li key={m}>— {m}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8">
        <h3 className="font-serif text-3xl">Eight looks, from twelve pieces</h3>
        <p className="mt-2 max-w-2xl text-[14px] text-[#1c1a17]/65">The look count is a styling target, not extra garments. A jacket reserved in January is cut to work with trousers delivered in September.</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {LOOKS.map((l, i) => {
            const parts = l.pieces.map((id) => PRIVATE_SLOTS.find((s) => s.id === id)!);
            return (
              <li key={l.id} className="flex gap-4 border-t border-[#1c1a17]/15 pt-4">
                <span className="font-serif text-2xl text-[#1c1a17]/35">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-serif text-xl">{l.name}</p>
                  <p className="mt-1 text-[13px] text-[#1c1a17]/65">{l.wear}</p>
                  <p className="mt-2 flex flex-wrap gap-3 text-[12px] text-[#1c1a17]/80">
                    {parts.map((p) => (
                      <span key={p.id} className="inline-flex items-center gap-1.5">
                        <span className="size-3 border border-black/10" style={{ background: p.color.hex }} />
                        {p.name.split(" ").slice(-1)} · {p.color.name}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-y border-[#1c1a17]/10 bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-14 md:grid-cols-2 md:px-8">
          <div>
            <h3 className="font-serif text-3xl">The $8,000 envelope</h3>
            <p className="mt-2 text-[14px] text-[#1c1a17]/65">At {usd(PRIVATE_PRICE)} revenue, {usd(12000)} contribution requires variable costs at or below {usd(8000)}. Est.</p>
            <table className="mt-6 w-full text-[13px]">
              <tbody>
                {ENVELOPE.map((r) => (
                  <tr key={r.k} className="border-b border-[#1c1a17]/10">
                    <td className="py-2.5 pr-4">{r.k}</td>
                    <td className="py-2.5 text-right tabular-nums"><Money n={r.cap} /></td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 font-medium">Client contribution</td>
                  <td className="py-3 text-right font-medium tabular-nums"><Money n={12000} /></td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-[12px] text-[#1c1a17]/50">This collection&apos;s manufacturing midpoint is {usd(mfg.mid)} of the {usd(MFG_CAP)} materials cap. The remaining envelope is QC, fit, and acquisition — not more garment.</p>
          </div>
          <div>
            <h3 className="font-serif text-3xl">What production receives</h3>
            <ol className="mt-6 space-y-4">
              {MENU.map((m) => (
                <li key={m.n} className="grid grid-cols-[48px_1fr] gap-3 border-b border-[#1c1a17]/10 pb-4">
                  <span className="font-serif text-2xl text-[#1c1a17]/35">{m.n}</span>
                  <div>
                    <p className="text-[13px] tracking-[0.14em] uppercase">{m.choose}</p>
                    <p className="mt-1 text-[13px] text-[#1c1a17]/65">{m.factory}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8">
        <h3 className="font-serif text-3xl">Three tiers, one quality standard</h3>
        <p className="mt-2 max-w-2xl text-[14px] text-[#1c1a17]/65">The upgrade is material, silhouette count, and service — never construction. Figures are design targets, est.</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] text-[13px]">
            <thead>
              <tr className="border-b border-[#1c1a17]/15 text-left text-[11px] tracking-[0.14em] text-[#1c1a17]/50 uppercase">
                <th className="py-2 font-normal"> </th>
                {TIER_ECONOMICS.map((t) => <th key={t.id} className="py-2 font-normal">{TIERS[t.id].name}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ["Annual price", (t: typeof TIER_ECONOMICS[0]) => usd(t.price)],
                ["Garments", (t: typeof TIER_ECONOMICS[0]) => String(t.garments)],
                ["Looks (minimum)", (t: typeof TIER_ECONOMICS[0]) => TIERS[t.id].looks],
                ["Deliveries", (t: typeof TIER_ECONOMICS[0]) => String(TIERS[t.id].deliveries)],
                ["Manufacturing allowance", (t: typeof TIER_ECONOMICS[0]) => usd(t.mfg)],
                ["Other attributable costs", (t: typeof TIER_ECONOMICS[0]) => usd(t.other)],
                ["Annual contribution", (t: typeof TIER_ECONOMICS[0]) => usd(t.contrib)],
                ["Contribution margin", (t: typeof TIER_ECONOMICS[0]) => `${(t.margin * 100).toFixed(1)}%`],
              ].map(([label, cell]) => (
                <tr key={String(label)} className="border-b border-[#1c1a17]/8">
                  <td className="py-2.5 pr-4 text-[#1c1a17]/65">{label as string}</td>
                  {TIER_ECONOMICS.map((t) => <td key={t.id} className="py-2.5 tabular-nums">{(cell as (t: typeof TIER_ECONOMICS[0]) => string)(t)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-14 font-serif text-3xl">Twenty clients by month six</h3>
        <p className="mt-2 max-w-2xl text-[14px] text-[#1c1a17]/65">Target for contracts in force, not cash collected in the first half-year. Full-year values if the mix and unit economics hold.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-[13px]">
            <thead>
              <tr className="border-b border-[#1c1a17]/15 text-left text-[11px] tracking-[0.14em] text-[#1c1a17]/50 uppercase">
                <th className="py-2 font-normal">Tier</th>
                <th className="py-2 text-right font-normal">Clients</th>
                <th className="py-2 text-right font-normal">Contracted value</th>
                <th className="py-2 text-right font-normal">Contribution</th>
                <th className="py-2 text-right font-normal">Garments / year</th>
              </tr>
            </thead>
            <tbody>
              {FOUNDING_MIX.map((r) => (
                <tr key={r.id} className="border-b border-[#1c1a17]/8">
                  <td className="py-2.5">{TIERS[r.id].name}</td>
                  <td className="py-2.5 text-right tabular-nums">{r.clients}</td>
                  <td className="py-2.5 text-right tabular-nums"><Money n={r.value} /></td>
                  <td className="py-2.5 text-right tabular-nums"><Money n={r.contrib} /></td>
                  <td className="py-2.5 text-right tabular-nums">{r.garments}</td>
                </tr>
              ))}
              <tr>
                <td className="py-3 font-medium">Total</td>
                <td className="py-3 text-right font-medium tabular-nums">20</td>
                <td className="py-3 text-right font-medium tabular-nums"><Money n={560000} /></td>
                <td className="py-3 text-right font-medium tabular-nums"><Money n={316000} /></td>
                <td className="py-3 text-right font-medium tabular-nums">304</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12px] text-[#1c1a17]/50">About 25 garments a month. Average client {usd(28000)} revenue, {usd(15800)} contribution — above the {usd(12000)} minimum, if the mix is achieved.</p>
      </section>
    </div>
  );
}
