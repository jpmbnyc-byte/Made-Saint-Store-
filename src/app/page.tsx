import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS, shipWindow } from "@/lib/business";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { OrderRule, orderWindowLine } from "@/components/shop/order-rule";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description:
    "A founding colorway is cut only after it is reserved. If the run is not confirmed, every reservation is refunded in full.",
  openGraph: {
    title: "MADE Saint",
    description: "Reserve a founding colorway. It is cut only if the run is confirmed.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MADE Saint" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const LEATHER = [
  { src: "/opening/runner-navy.webp", name: "Navy", alt: "Full navy all-leather runner" },
  { src: "/opening/runner-black.webp", name: "Black", alt: "Full black all-leather runner" },
  { src: "/opening/runner-butter.webp", name: "Butter", alt: "Full butter all-leather runner" },
] as const;

const short = (name: string) => name.replace("Runner, ", "");

export default function Home() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const from = Math.min(...launch.map((p) => p.usd));

  return (
    <div className="bg-[#f6f4ef] text-[#1c1a17]">
      <Mast />

      <section id="order" className="scroll-mt-24">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Made to order · Felgueiras</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[44px] leading-[0.95] md:text-[68px]">
            A pair is cut only after you reserve it.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">{orderWindowLine()}</p>
          <div className="mt-10">
            <OrderRule />
          </div>
        </div>

        <div className="mx-auto max-w-[1100px] px-5 pb-16 md:px-8 md:pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#1c1a17]/15 pt-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Open to reserve</p>
              <h2 className="mt-2 font-serif text-4xl">Three founding colorways</h2>
            </div>
            <p className="text-[13px] text-[#1c1a17]/60">From ${from} · ships {shipWindow()}</p>
          </div>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            {launch.map((p) => (
              <li key={p.id}>
                <Link href={`/shop/${p.id}`} className="block">
                  <span className="relative block aspect-square bg-[#f3efe8]">
                    <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-contain p-3" />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-serif text-2xl">{short(p.name)}</span>
                    <span className="text-sm tabular-nums">${p.usd}</span>
                  </span>
                  <span className="mt-1 block text-[13px] text-[#1c1a17]/60">{p.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/shop#edition" className="mt-10 inline-block bg-[#1c1a17] px-6 py-4 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">
            Reserve a pair
          </Link>
        </div>
      </section>

      <section id="leather" className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f3efe8]">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Shown, not reserved</p>
              <h2 className="mt-2 font-serif text-4xl">The leather runners</h2>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-[#1c1a17]/65">
              Navy, black, and butter, each shown in full. These are not the founding colorways, and they are not open to reserve.
            </p>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {LEATHER.map((runner) => (
              <li key={runner.name}>
                <div className="relative aspect-[3/4] bg-[#f6f4ef]">
                  <Image src={runner.src} alt={runner.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-contain" />
                </div>
                <p className="mt-3 text-center text-[11px] tracking-[0.2em] uppercase">{runner.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[#1c1a17]/10">
        <div className="mx-auto grid max-w-[1100px] md:grid-cols-2">
          <Link href="/line" className="block border-b border-[#1c1a17]/10 px-5 py-12 md:border-r md:border-b-0 md:px-8 md:py-16">
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Not a checkout</p>
            <h2 className="mt-3 font-serif text-4xl">The 2027 line</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#1c1a17]/70">
              Proposed styles and list prices. Nothing on the line can be reserved.
            </p>
          </Link>
          <Link href="/wardrobe" className="block px-5 py-12 md:px-8 md:py-16">
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Not a checkout</p>
            <h2 className="mt-3 font-serif text-4xl">The private wardrobe</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#1c1a17]/70">
              One fit, commissioned. A seasonal figure is a planning target until a price is approved.
            </p>
          </Link>
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
