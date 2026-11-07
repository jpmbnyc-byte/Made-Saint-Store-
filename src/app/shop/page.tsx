import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CAMPAIGN, PRODUCTS, shipWindow, statusLine } from "@/lib/business";
import { QUESTIONS } from "@/lib/questions";
import { OrderRule, orderWindowLine } from "@/components/shop/order-rule";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { CancelledBanner, LiveProgress, LiveWaitlistCount } from "@/components/shop/live";
import { WaitlistForm } from "@/components/shop/waitlist";

export const metadata: Metadata = {
  title: "The Founding Edition",
  description: "Three runners, made to order in Portugal. Numbered, reserved before they are made.",
};

export default async function ShopPage() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const next = PRODUCTS.filter((p) => !p.launch);

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section id="order" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-12 md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">Made to order · Felgueiras</p>
        <h1 className="mt-4 max-w-3xl font-serif text-[44px] leading-[0.95] md:text-[64px]">A pair is cut only after you reserve it.</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">{orderWindowLine()}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Anyone the size fits can request a pair, in US men&apos;s 7 through 12. Other sizes are not offered. A pair does not open a wardrobe.
        </p>
        <ul className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
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
          <h2 className="font-serif text-4xl">Three founding colorways</h2>
          <p className="text-[13px] text-[#1c1a17]/60">From ${Math.min(...launch.map((p) => p.usd))} · ships {shipWindow()}</p>
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
              <div className="mt-4">
                <LiveProgress productId={p.id} of={CAMPAIGN.threshold} />
              </div>
            </Link>
          ))}
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
              These cannot be reserved. Leave an email and you are offered the run before it opens.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {next.map((p) => (
              <div key={p.id}>
                <div className="relative aspect-[2/3] overflow-hidden bg-[#f3efe8]">
                  <Image src={p.image} alt={`MADE SAiNT ${p.name}, in development`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-contain" />
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
