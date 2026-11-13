import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LEAD_TIME, offerLine, productsIn, statusLine, type Product } from "@/lib/business";
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
      <SeriesPlate series={product.series} size="sm" className="mt-3" />
      <span className="mt-2 block font-serif text-2xl leading-none">{colorOf(product.name)}</span>
      <span className="mt-2 block text-sm tabular-nums">${product.usd}</span>
    </Link>
  );
}

export const metadata: Metadata = {
  title: "1101",
  description: "The 1101, 1213, and 0929 runners. Made to order.",
};

export default async function ShopPage() {
  const lead = productsIn("1101");
  const sculpted = productsIn("1213");
  const founding = productsIn("0929");
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section id="1101" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-12 md:px-8 md:py-16">
        <SeriesPlate series="1101" size="md" />
        <h1 className="mt-4 max-w-3xl font-serif text-[44px] leading-[0.95] text-[#1c1a17] md:text-[64px]">The lead runner.</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">$550. Listed first. {offerLine("1101")}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Brown Mesh leads with dark chocolate suede and tan open-mesh panels. Other 1101 colorways follow.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {lead.map((p) => (
            <li key={p.id}>
              <Listing product={p} frame="aspect-square" />
            </li>
          ))}
        </ul>
      </section>

      <section id="1213" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
          <SeriesPlate series="1213" size="md" />
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Seven colorways. Espresso, Olive, Mineral Blue, Midnight, Chestnut, Sacred Light, and Graphite. $550. {offerLine("1213")}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {sculpted.map((p) => (
              <Listing key={p.id} product={p} frame="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-12 md:px-8 md:py-16">
        <SeriesPlate series="0929" size="md" />
        <h2 className="mt-4 max-w-3xl font-serif text-[44px] leading-[0.95] text-[#1c1a17] md:text-[64px]">A pair, made for you.</h2>
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
