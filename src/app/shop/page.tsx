import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { productsIn, runnerHref, statusLine, type Product } from "@/lib/business";
import { QUESTIONS } from "@/lib/questions";
import { OrderRule } from "@/components/shop/order-rule";
import { SeriesPlate } from "@/components/shop/series-plate";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { CancelledBanner } from "@/components/shop/live";
import { HashScroll } from "@/components/shop/hash-scroll";
import { copy } from "@/lib/copy";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

function Listing({ product, frame }: { product: Product; frame: string }) {
  return (
    <Link href={runnerHref(product.id)} className="block">
      <span className={`relative block bg-[#f3efe8] ${frame}`}>
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain" />
      </span>
      <SeriesPlate series={product.series} size="sm" className="mt-3" />
      <span className="mt-2 block font-serif text-2xl leading-none">{colorOf(product.name)}</span>
      <span className="mt-2 block text-sm tabular-nums">${product.usd}</span>
      <span className="mt-2 block text-[11px] tracking-[0.14em] uppercase">{copy.footwearCollection.cardAction}</span>
    </Link>
  );
}

export const metadata: Metadata = {
  title: { absolute: copy.seo.shop.title },
  description: copy.seo.shop.description,
};

export default async function ShopPage() {
  const lead = productsIn("1101");
  const sculpted = productsIn("1213");
  const founding = productsIn("0929");
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />
      <HashScroll />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section className="mx-auto max-w-[1100px] px-5 pt-12 md:px-8 md:pt-16">
        <h1 className="font-serif text-[44px] leading-[0.95] text-[#1c1a17] md:text-[64px]">{copy.footwearCollection.heading}</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">{copy.footwearCollection.intro}</p>
      </section>

      <section id="1101" className="mx-auto max-w-[1100px] scroll-mt-36 px-5 py-12 md:scroll-mt-28 md:px-8 md:py-16">
        <SeriesPlate series="1101" size="md" />
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">
          Brown Mesh, Teal, Navy, Blush and Onyx. $550.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {lead.map((p) => (
            <li key={p.id}>
              <Listing product={p} frame="aspect-square" />
            </li>
          ))}
        </ul>
      </section>

      <section id="1213" className="scroll-mt-36 border-t border-[#1c1a17]/10 bg-[#f6f4ef] md:scroll-mt-28">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
          <SeriesPlate series="1213" size="md" />
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Espresso, Olive, Mineral Blue, Midnight, Chestnut, Sacred Light and Graphite. $550.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {sculpted.map((p) => (
              <Listing key={p.id} product={p} frame="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      <section id="0929" className="mx-auto max-w-[1100px] scroll-mt-36 px-5 py-12 md:scroll-mt-28 md:px-8 md:py-16">
        <div id="order" className="scroll-mt-36 md:scroll-mt-28" />
        <div id="edition" className="scroll-mt-36 md:scroll-mt-28" />
        <SeriesPlate series="0929" size="md" />
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">
          Navy / Ivory, Navy / Sand and Washed / Indigo. $490.
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          {copy.footwearCollection.helpHeading}{" "}
          <Link href="/shop/ms-runner-chalk-navy#title" className="underline underline-offset-4">
            {copy.footwearCollection.helpAction}
          </Link>
          .
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
