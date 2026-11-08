import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LEAD_TIME, productsIn, statusLine, type Product } from "@/lib/business";
import { QUESTIONS } from "@/lib/questions";
import { OrderRule, orderWindowLine } from "@/components/shop/order-rule";
import { SeriesPlate } from "@/components/shop/series-plate";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { CancelledBanner } from "@/components/shop/live";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

function Listing({ product, frame }: { product: Product; frame: string }) {
  return (
    <Link href={`/shop/${product.id}`} className="block">
      <span className={`relative block bg-[#f3efe8] ${frame}`}>
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain" />
      </span>
      <SeriesPlate series={product.series} className="mt-3 h-12 w-auto max-w-full object-contain object-left" />
      <span className="mt-2 block font-serif text-2xl leading-none">{colorOf(product.name)}</span>
      <span className="mt-2 block text-sm tabular-nums">${product.usd}</span>
    </Link>
  );
}

export const metadata: Metadata = {
  title: "0929",
  description: "The 0929, 1101, and 1223 runners, made to order. $490 and $550.",
};

export default async function ShopPage() {
  const founding = productsIn("0929");
  const sculpted = productsIn("1101");
  const sacred = productsIn("1223");
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section id="order" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-12 md:px-8 md:py-16">
        <SeriesPlate series="0929" className="h-16 w-auto max-w-full object-contain object-left sm:h-20" />
        <h1 className="mt-4 max-w-3xl font-serif text-[44px] leading-[0.95] text-[#1c1a17] md:text-[64px]">A pair, made for you.</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">{orderWindowLine()}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Anyone the size fits can request a pair, in US men&apos;s 7 through 12. Other sizes are not offered. A pair does not open a wardrobe.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {founding.map((p) => (
            <li key={p.id}>
              <Listing product={p} frame="aspect-[2/3]" />
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <OrderRule />
        </div>
      </section>

      <section id="0929" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 pb-14 md:px-8">
        <div id="edition" className="flex scroll-mt-28 flex-wrap items-end justify-between gap-4 border-t border-[#1c1a17]/15 pt-8">
          <h2 className="font-serif text-4xl">Available now</h2>
          <p className="text-[13px] text-[#1c1a17]/60">$490 · ready in {LEAD_TIME}</p>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {founding.map((p) => (
            <Listing key={p.id} product={p} frame="aspect-[2/3]" />
          ))}
        </div>
      </section>

      <section id="1101" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
          <SeriesPlate series="1101" className="h-16 w-auto max-w-full object-contain object-left sm:h-20" />
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Six colorways on a sculpted sole. $550. One view each. Materials are not confirmed. Made to order. Ready in {LEAD_TIME}.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {sculpted.map((p) => (
              <Listing key={p.id} product={p} frame="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      <section id="1223" className="border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
          <SeriesPlate series="1223" className="h-16 w-auto max-w-full object-contain object-left sm:h-20" />
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Sacred Light. Deep plum and pale gold. $550. A profile, an overhead, a rear, and two worn studies. Materials are not confirmed.
          </p>
          <div className="mt-10 max-w-sm">
            {sacred.map((p) => (
              <Listing key={p.id} product={p} frame="aspect-square" />
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
