import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LEAD_TIME, PRODUCTS, statusLine } from "@/lib/business";
import { RANGE_1213, colorName } from "@/lib/range-1213";
import { QUESTIONS } from "@/lib/questions";
import { OrderRule, orderWindowLine } from "@/components/shop/order-rule";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { CancelledBanner } from "@/components/shop/live";

export const metadata: Metadata = {
  title: "0929",
  description: "The 0929 runners, made to order, and the 1213 runner, with no price listed.",
};

export default async function ShopPage() {
  const launch = PRODUCTS.filter((p) => p.launch);
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section id="order" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-12 md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.28em] text-[#B03236] uppercase">0929 · Made to order</p>
        <h1 className="mt-4 max-w-3xl font-serif text-[44px] leading-[0.95] text-[#1c1a17] md:text-[64px]">A pair, made for you.</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">{orderWindowLine()}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Anyone the size fits can request a pair, in US men&apos;s 7 through 12. Other sizes are not offered. A pair does not open a wardrobe.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
          {launch.map((p) => (
            <li key={p.id}>
              <Link href={`/shop/${p.id}`} className="block">
                <span className="relative block aspect-[2/3] bg-[#f3efe8]">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 30vw, 33vw" className="object-contain" />
                </span>
                <span className="mt-2 block font-serif text-lg leading-none sm:text-2xl">{p.name.replace("Runner, ", "")}</span>
                <span className="mt-1 block text-[12px] tabular-nums">${p.usd}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <OrderRule />
        </div>
      </section>

      <section id="edition" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 pb-14 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#1c1a17]/15 pt-8">
          <h2 className="font-serif text-4xl">Available now</h2>
          <p className="text-[13px] text-[#1c1a17]/60">From ${Math.min(...launch.map((p) => p.usd))} · ready in {LEAD_TIME}</p>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {launch.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
              <div className="relative aspect-[2/3] overflow-hidden bg-[#f3efe8]">
                <Image src={p.image} alt={`MADE SAiNT ${p.name}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl">{p.name.replace("Runner, ", "")}</h3>
                <p className="text-sm tabular-nums">${p.usd}</p>
              </div>
              <p className="mt-1 text-[13px] text-[#1c1a17]/60">The Runner · {p.line}</p>
              <p className="mt-3 text-[12px] tracking-[0.12em] text-[#8d7349] uppercase">Available · made to order · {LEAD_TIME}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="1213" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
          <p className="text-[11px] tracking-[0.28em] text-[#B03236] uppercase">1213</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">A second runner.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Seven colorways on a sculpted sole. Separate from the 0929. Six colorways have one view. Sacred Light also has a profile, an overhead, a rear, and two worn studies. A price is not listed. Materials are not confirmed.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {RANGE_1213.map((colorway) => (
              <Link key={colorway.slug} href={`/shop/1213/${colorway.slug}`} className="block">
                <span className="relative block aspect-square bg-[#f3efe8]">
                  <Image src={colorway.image} alt={colorway.name} fill sizes="(min-width: 640px) 30vw, 50vw" className="object-contain" />
                </span>
                <span className="mt-3 block font-serif text-xl leading-tight">{colorName(colorway.name)}</span>
                <span className="mt-1 block text-[12px] text-[#1c1a17]/60">{colorway.palette}</span>
                <span className="mt-2 block text-[12px] tracking-[0.12em] text-[#8d7349] uppercase">Request · no price listed</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[900px] scroll-mt-28 px-5 py-20 md:px-8">
        <h2 className="font-serif text-4xl md:text-5xl">Questions</h2>
        <div className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
          {QUESTIONS.map((f) => (
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
