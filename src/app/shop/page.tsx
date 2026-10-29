import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CAMPAIGN, PRODUCTS, fmtDate, shipWindow, statusLine } from "@/lib/business";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { CancelledBanner, LiveProgress, LiveWaitlistCount } from "@/components/shop/live";
import { WaitlistForm } from "@/components/shop/waitlist";

export const metadata: Metadata = {
  title: "MADE SAiNT · The Founding Edition",
  description: "Three runners, made to order in Portugal. Numbered, reserved before they are made.",
};

const STEPS = [
  { n: "I", t: "Reserve", d: `Choose your colorway and size. Your pair is paid for today and given a founding number.` },
  { n: "II", t: "The run is confirmed", d: `When a colorway reaches ${CAMPAIGN.threshold} pairs, we place the order with our workshop in Felgueiras.` },
  { n: "III", t: "Made for you", d: `Each pair is cut, closed and lasted to order. We send photographs from the bench as it happens.` },
  { n: "IV", t: "Delivered", d: `Pairs ship ${shipWindow()}, boxed with a spare set of laces and your numbered card.` },
];

const FAQ = [
  { q: "What happens if a colorway does not reach its run?", a: `Every reservation for that colorway is refunded in full, to the original card, within five business days of ${fmtDate(CAMPAIGN.closes)}. Or you may move it to another colorway.` },
  { q: "Why pre-order?", a: "Made-to-order means no overproduction, no end-of-season markdowns and no warehouse of unsold pairs. You get a pair made for you; we make only what is wanted." },
  { q: "How do they fit?", a: "True to size for most. If you are between sizes, take the half size up. The leather lining relaxes slightly with wear. Size exchanges are free within 30 days of delivery." },
  { q: "Can I cancel?", a: `Yes, for a full refund at any time before ${fmtDate(CAMPAIGN.closes)}, when the order goes to the workshop.` },
  { q: "Will there be a sale?", a: "No. The price is the same for everyone, on the first day and the last." },
  { q: "Caring for suede and woven leather", a: "Brush with a soft crepe or nylon brush after wear. Treat once with a suede protector before the first wear. Store in the dust bag, away from direct sun." },
];

export default async function ShopPage() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const next = PRODUCTS.filter((p) => !p.launch);
  const hero = launch[0];

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-10 md:grid-cols-[1fr_1.05fr] md:px-8 md:py-16">
        <div className="order-2 md:order-1">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">Edition 001 · Made in Portugal</p>
          <h1 className="mt-5 font-serif text-[52px] leading-[0.95] md:text-[84px]">
            The Founding
            <br />
            <em>Edition</em>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/75">
            Three runners in woven calf, bouclé and washed denim, on our nub sole. Made to order in Felgueiras, numbered, and
            reserved before a single pair is cut.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="#edition"
              className="inline-flex items-center gap-3 bg-[#1c1a17] px-7 py-4 text-[11px] tracking-[0.2em] text-[#f6f4ef] uppercase transition hover:bg-[#1c1a17]/85"
            >
              Reserve a pair <ArrowRight className="size-3.5" />
            </Link>
            <p className="text-[12px] text-[#1c1a17]/60">
              From ${Math.min(...launch.map((p) => p.usd))} · ships {shipWindow()}
            </p>
          </div>
        </div>
        <Link href={`/shop/${hero.id}`} className="relative order-1 block aspect-[4/5] overflow-hidden bg-[#ebebeb] md:order-2">
          <Image src={hero.image} alt={`MADE SAiNT ${hero.name}, top view`} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <span className="absolute bottom-4 left-4 bg-[#f6f4ef]/90 px-3 py-2 text-[10px] tracking-[0.18em] uppercase">{hero.name}</span>
        </Link>
      </section>

      <section id="edition" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 py-14 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1c1a17]/15 pb-5">
          <h2 className="font-serif text-4xl md:text-5xl">Three colorways</h2>
          <p className="max-w-sm text-sm text-[#1c1a17]/65">
            Each runs only if {CAMPAIGN.threshold} pairs are reserved by {fmtDate(CAMPAIGN.closes)}. Otherwise, a full refund.
          </p>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {launch.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ebebeb]">
                <Image src={p.image} alt={`MADE SAiNT ${p.name}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl">{p.name.replace("Runner, ", "")}</h3>
                <p className="text-sm tabular-nums">${p.usd}</p>
              </div>
              <p className="mt-1 text-[13px] text-[#1c1a17]/60">The Runner · {p.line}</p>
              <div className="mt-4">
                <LiveProgress productId={p.id} of={CAMPAIGN.threshold} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="scroll-mt-28 bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8">
          <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/60 uppercase">How the Founding Edition works</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Made after you choose it, never before.</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t border-[#f6f4ef]/20 pt-5">
                <p className="font-serif text-3xl italic text-[#f6f4ef]/50">{s.n}</p>
                <p className="mt-3 text-[13px] tracking-[0.14em] uppercase">{s.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#f6f4ef]/70">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-14 max-w-2xl border-l border-[#f6f4ef]/30 pl-5 text-sm leading-relaxed text-[#f6f4ef]/80">
            Our promise: if a colorway does not reach {CAMPAIGN.threshold} pairs, every reservation for it is refunded in full within
            five business days. No credit notes, no conditions.
          </p>
        </div>
      </section>

      <section id="atelier" className="mx-auto grid max-w-[1320px] scroll-mt-28 gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">The atelier</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Felgueiras, northern Portugal.</h2>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-[#1c1a17]/75">
          <p>
            Our pairs are developed and made in the Felgueiras footwear cluster, the heart of Portuguese shoemaking, where each
            shoe is cut, closed and lasted on site. Uppers are calf leather and woven textiles; every pair is lined in calf leather
            and finished by hand.
          </p>
          <p>
            We make in runs of a few hundred pairs. That is small enough to number each one, and large enough that the price
            reflects the materials, not the scarcity.
          </p>
          <dl className="grid grid-cols-3 gap-4 border-t border-[#1c1a17]/15 pt-6 text-center">
            {[
              ["Leather lined", "Calf, inside and out"],
              ["Numbered", `1 to ${CAMPAIGN.threshold}+ per color`],
              ["Hand finished", "Edges painted by hand"],
            ].map(([a, b]) => (
              <div key={a}>
                <dt className="font-serif text-xl">{a}</dt>
                <dd className="mt-1 text-[12px] text-[#1c1a17]/55">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="list" className="scroll-mt-28 border-y border-[#1c1a17]/10 bg-[#efece5]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">Edition 002, in development</p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">The List</h2>
            </div>
            <p className="max-w-sm text-sm text-[#1c1a17]/65">
              Colorways we are sampling now. Members of the list are offered the run before it opens.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {next.map((p) => (
              <div key={p.id}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ebebeb]">
                  <Image src={p.image} alt={`MADE SAiNT ${p.name}, in development`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover opacity-90" />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <h3 className="font-serif text-xl">{p.name.replace("Runner, ", "")}</h3>
                  <LiveWaitlistCount productId={p.id} />
                </div>
                <p className="mt-1 text-[13px] text-[#1c1a17]/60">{p.line}</p>
                <WaitlistForm productId={p.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[900px] scroll-mt-28 px-5 py-20 md:px-8">
        <h2 className="font-serif text-4xl md:text-5xl">Questions</h2>
        <div className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px]">
                {f.q}
                <span className="text-xl leading-none text-[#1c1a17]/40 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1c1a17]/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
