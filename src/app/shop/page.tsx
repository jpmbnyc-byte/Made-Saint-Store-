import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LEAD_TIME, bagsIn, constructionIn, offerLine, productsIn, statusLine, type BagProduct, type Product } from "@/lib/business";
import { QUESTIONS } from "@/lib/questions";
import { OrderRule, orderWindowLine } from "@/components/shop/order-rule";
import { SeriesPlate } from "@/components/shop/series-plate";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { CancelledBanner } from "@/components/shop/live";
import { frameSrc, lineByRef } from "@/lib/line";
import { customerName, customerStatus } from "@/lib/line-shop";
import { primaryFrame } from "@/lib/imagery";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

function Listing({ product, frame }: { product: Product; frame: string }) {
  return (
    <Link href={`/shop/${product.id}`} className="block group">
      <span className={`relative block bg-[#f1eee8] ${frame}`}>
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain p-3 transition-opacity duration-500 group-hover:opacity-90" />
      </span>
      <span className="mt-5 block font-serif text-[22px] font-light leading-none tracking-[-0.02em] md:text-2xl">{colorOf(product.name)}</span>
      <span className="mt-2 block text-[12px] tracking-[0.06em] tabular-nums text-[#262626]/55">${product.usd}</span>
    </Link>
  );
}

function BagListing({ bag }: { bag: BagProduct }) {
  return (
    <Link href="/wardrobe#introduction" className="block group">
      <span className="relative block aspect-[3/4] bg-[#f1eee8]">
        <Image src={bag.image} alt={bag.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain p-4 transition-opacity duration-500 group-hover:opacity-90" />
      </span>
      <span className="mt-5 block font-serif text-[22px] font-light leading-none tracking-[-0.02em] md:text-2xl">{colorOf(bag.name)}</span>
      <span className="mt-2 block text-[12px] tracking-[0.06em] tabular-nums text-[#262626]/55">${bag.usd}</span>
    </Link>
  );
}

const MULE_REFS = ["R046", "N015"] as const;

export const metadata: Metadata = {
  title: "1101",
  description: "The 1101 vintage runner in mesh and leather, Trail Mule, City Mule, and the 1101 backpack.",
};

export default async function ShopPage() {
  const mesh = constructionIn("1101", "mesh");
  const leather = constructionIn("1101", "leather");
  const sculpted = productsIn("1213");
  const founding = productsIn("0929");
  const bagMesh = bagsIn("mesh");
  const bagLeather = bagsIn("leather");
  const mules = MULE_REFS.map((ref) => lineByRef(ref)).filter(Boolean);
  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />

      <Suspense fallback={null}>
        <CancelledBanner />
      </Suspense>

      <section id="1101" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-14 md:px-8 md:py-20">
        <SeriesPlate series="1101" size="md" />
        <h1 className="mt-5 max-w-3xl font-serif text-[42px] font-light leading-[0.95] tracking-[-0.03em] text-[#1c1a17] md:text-[60px]">
          Black vintage 1101.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-[#1c1a17]/65">
          $550. Three mesh colorways and three leather colorways, photographed on the same frame. {offerLine("1101")}
        </p>

        <div id="mesh" className="mt-16 scroll-mt-28">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Mesh</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3">
            {mesh.map((p) => (
              <li key={p.id}>
                <Listing product={p} frame="aspect-[4/5]" />
              </li>
            ))}
          </ul>
        </div>

        <div id="leather" className="mt-20 scroll-mt-28 border-t border-[#262626]/08 pt-16">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Leather</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3">
            {leather.map((p) => (
              <li key={p.id}>
                <Listing product={p} frame="aspect-[4/5]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="bags" className="border-t border-[#1c1a17]/08 bg-[#efeae0]">
        <div className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-14 md:px-8 md:py-20">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">1101 · Backpack</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[36px] font-light leading-[0.95] tracking-[-0.03em] md:text-[48px]">
            Flap backpack.
          </h2>
          <div className="mt-14">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Mesh</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3">
              {bagMesh.map((bag) => (
                <li key={bag.id}>
                  <BagListing bag={bag} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Leather</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3">
              {bagLeather.map((bag) => (
                <li key={bag.id}>
                  <BagListing bag={bag} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="1213" className="border-t border-[#1c1a17]/08 bg-[#f6f3ec]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-20">
          <SeriesPlate series="1213" size="md" />
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#1c1a17]/65">
            Seven colorways. Espresso, Olive, Mineral Blue, Midnight, Chestnut, Sacred Light, and Graphite. $550. {offerLine("1213")}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
            {sculpted.map((p) => (
              <Listing key={p.id} product={p} frame="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      <section id="mules" className="border-t border-[#1c1a17]/08 bg-[#f7f5f0]">
        <div className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-14 md:px-8 md:py-20">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#1c1a17]/40">Footwear · line</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[36px] font-light leading-[0.95] tracking-[-0.03em] md:text-[48px]">Trail Mule &amp; City Mule.</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#1c1a17]/65">
            MS-TM01 Trail Mule and the City Leather Mule — product views from the tech packs.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
            {mules.map((product) => {
              if (!product) return null;
              const frame = primaryFrame(product.ref);
              const status = customerStatus(product);
              const image =
                product.ref === "R046"
                  ? "/mules/trail-powder-blue.webp"
                  : product.ref === "N015"
                    ? "/mules/city-espresso.webp"
                    : frame
                      ? frameSrc(frame.n)
                      : "/mules/trail-powder-blue.webp";
              return (
                <li key={product.ref}>
                  <Link href={`/line/${product.ref.toLowerCase()}`} className="block group">
                    <span className="relative block aspect-square bg-[#f1eee8]">
                      <Image src={image} alt={customerName(product)} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain p-4 transition-opacity duration-500 group-hover:opacity-90" />
                    </span>
                    <span className="mt-4 block text-[10px] tracking-[0.2em] uppercase text-[#1c1a17]/45">{product.ref}</span>
                    <span className="mt-1 block font-serif text-[22px] leading-none tracking-[-0.02em] md:text-2xl">{customerName(product)}</span>
                    <span className="mt-2 block text-[13px] tabular-nums text-[#1c1a17]/70">{status.price}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="order" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-14 md:px-8 md:py-20">
        <SeriesPlate series="0929" size="md" />
        <h2 className="mt-5 max-w-3xl font-serif text-[36px] font-light leading-[0.95] tracking-[-0.03em] md:text-[48px]">A pair, made for you.</h2>
        <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#1c1a17]/65">{orderWindowLine()}</p>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#1c1a17]/55">
          Anyone the size fits can request a pair, in US men&apos;s 7 through 12. Other sizes are not offered. A pair does not open a wardrobe.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
          {founding.map((p) => (
            <li key={p.id}>
              <Listing product={p} frame="aspect-[2/3]" />
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <OrderRule />
        </div>
      </section>

      <section id="0929" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 pb-16 md:px-8">
        <div id="edition" className="flex scroll-mt-28 flex-wrap items-end justify-between gap-4 border-t border-[#1c1a17]/10 pt-10">
          <h2 className="font-serif text-3xl font-light tracking-[-0.02em] md:text-4xl">Available now</h2>
          <p className="text-[12px] tracking-[0.08em] text-[#1c1a17]/50 uppercase">$490 · ready in {LEAD_TIME}</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {founding.map((p) => (
            <Listing key={p.id} product={p} frame="aspect-[2/3]" />
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[900px] scroll-mt-28 px-5 py-20 md:px-8">
        <h2 className="font-serif text-3xl font-light tracking-[-0.02em] md:text-4xl">Questions</h2>
        <div className="mt-10 divide-y divide-[#1c1a17]/10 border-y border-[#1c1a17]/10">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] tracking-[0.04em]">
                {item.q}
                <span className="text-lg leading-none text-[#1c1a17]/30 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#1c1a17]/65">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
