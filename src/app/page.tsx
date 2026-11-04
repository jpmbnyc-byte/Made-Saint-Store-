import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS, shipWindow } from "@/lib/business";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description:
    "Made for the individual. A founding edition of runners, and a private wardrobe cut to the client, made to order in Felgueiras.",
  openGraph: {
    title: "MADE SAiNT",
    description: "A Saint cannot campaign or be elected, they can only be made.",
    images: [
      {
        url: "/opening/leather.webp",
        width: 1086,
        height: 1448,
        alt: "Navy leather runner. A Saint cannot campaign or be elected, they can only be made.",
      },
    ],
  },
};

const OPENING_ALT =
  "Navy leather runner, worn with a navy knit and sand trousers. The line reads: A Saint cannot campaign or be elected, they can only be made.";

const short = (name: string) => name.replace("Runner, ", "");

export default function Home() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const from = Math.min(...launch.map((p) => p.usd));

  return (
    <div className="bg-[#f6f4ef] text-[#1c1a17]">
      <Mast />

      <section id="open" className="flex h-svh flex-col overflow-hidden bg-[#1c1a17]">
        <div className="relative min-h-0 flex-1 bg-[#6b4e3c]">
          <Image src="/opening/leather.webp" alt="" fill aria-hidden sizes="100vw" className="scale-110 object-cover blur-3xl" />
          <Image
            src="/opening/leather-tall.webp"
            alt={OPENING_ALT}
            fill
            priority
            sizes="100vw"
            className="object-contain object-center md:hidden"
          />
          <Image
            src="/opening/leather.webp"
            alt={OPENING_ALT}
            fill
            priority
            sizes="100vw"
            className="hidden object-contain object-center md:block"
          />
        </div>
        <div className="bg-[#1c1a17] px-5 py-4 text-[#f6f4ef] sm:px-8 md:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-[#f6f4ef]/55 uppercase">The house · Felgueiras</p>
              <h1 className="font-serif text-[32px] leading-none sm:text-[40px]">
                MADE <em>SAiNT</em>
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="#edition" className="border border-[#f6f4ef]/35 px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                The edition
              </Link>
              <Link href="#wardrobe" className="bg-[#f6f4ef] px-5 py-3 text-[11px] tracking-[0.18em] text-[#1c1a17] uppercase">
                The wardrobe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="edition" className="scroll-mt-20 border-t border-[#1c1a17]/10">
        <div className="mx-auto grid min-h-svh max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-16 md:px-12 md:py-24">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Edition 001</p>
            <h2 className="mt-4 font-serif text-[46px] leading-[0.92] md:text-[72px]">
              Made after
              <br />
              <em>you choose it.</em>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#1c1a17]/75">
              Three runners in woven calf, bouclé and washed denim. Cut in Portugal only once the run is reserved. If a colorway is not confirmed, every reservation for it is refunded in full.
            </p>
            <ul className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              {launch.map((p) => (
                <li key={p.id}>
                  <Link href={`/shop/${p.id}`} className="flex items-baseline justify-between gap-4 py-4">
                    <span>
                      <span className="block font-serif text-3xl">{short(p.name)}</span>
                      <span className="text-[13px] text-[#1c1a17]/60">{p.line}</span>
                    </span>
                    <span className="text-sm tabular-nums">${p.usd}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/shop#edition" className="bg-[#1c1a17] px-6 py-4 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">
                Reserve a pair
              </Link>
              <p className="text-[12px] text-[#1c1a17]/55">From ${from} · ships {shipWindow()}</p>
            </div>
          </div>
          <Link href="/shop/ms-runner-chalk-navy" className="block bg-white">
            <Image
              src="/hero/look1-runner-hero.webp"
              alt="MADE SAiNT Runner in chalk bouclé and navy canvas"
              width={1280}
              height={720}
              className="h-auto w-full"
            />
          </Link>
        </div>
      </section>

      <section id="line" className="scroll-mt-20 border-t border-[#1c1a17]/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-12 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">The 2027 line</p>
              <h2 className="mt-4 font-serif text-[46px] leading-[0.92] md:text-[68px]">
                Seventy-five styles.
                <br />
                <em>Proposed, not checked out.</em>
              </h2>
            </div>
            <Link href="/line" className="bg-[#1c1a17] px-6 py-4 text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">
              Open the line
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              ["/line/f23.webp", "Denim-trim duffel in butter yellow", "/line/r067"],
              ["/line/f12.webp", "Suede lace mule", "/line/n015"],
              ["/line/f06.webp", "Shirt-and-tie jersey", "/line/r010"],
              ["/line/f33.webp", "Grouped-stripe suit on a course", "/line/r031"],
              ["/line/f01.webp", "Arch script cap", "/line/r043"],
              ["/line/f47.webp", "Wordmark neck under a sage jacket", "/line/n014"],
            ].map(([src, alt, href]) => (
              <Link key={src} href={href} className="block bg-[#f1eee8]">
                <Image src={src} alt={alt} width={1024} height={1280} className="h-auto w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="wardrobe" data-theme="dark" className="scroll-mt-20 bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto grid min-h-svh max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-14 md:px-12 md:py-20">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/55 uppercase">The Private Wardrobe</p>
            <h2 className="mt-4 font-serif text-[46px] leading-[0.92] md:text-[68px]">
              Three annual
              <br />
              <em>collections.</em>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#f6f4ef]/75">
              One personal fit. The silhouettes stay the same whether a client buys one piece or commissions the year. Exceptional proportions change the pattern, not the design.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/wardrobe#discover" className="border border-[#f6f4ef]/35 px-5 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                Discover
              </Link>
              <Link href="/wardrobe#compose" className="border border-[#f6f4ef]/35 px-5 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                Compose
              </Link>
              <Link href="/wardrobe#commission" className="bg-[#f6f4ef] px-5 py-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">
                Commission
              </Link>
            </div>
          </div>
          <Link href="/line/r031" className="block bg-[#f1eee8]">
            <Image
              src="/line/f32.webp"
              alt="Grouped-stripe jacket and trouser, photographed on a course"
              width={1536}
              height={1024}
              className="h-auto w-full"
            />
          </Link>
        </div>
      </section>

      <section id="atelier" className="scroll-mt-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">
          <div className="bg-white">
            <Image
              src="/hero/look3-runner-inverse.webp"
              alt="MADE SAiNT Runner in espresso calf suede"
              width={1280}
              height={720}
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">The atelier</p>
            <h2 className="mt-4 font-serif text-[42px] leading-[0.95] md:text-[60px]">
              Felgueiras,
              <br />
              <em>northern Portugal.</em>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#1c1a17]/75">
              Each pair is cut, closed and lasted in the footwear cluster. Uppers are calf and woven textile. The lining is calf. Edges are painted by hand. The founding number is on the card in the box.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#1c1a17]/15 pt-6">
              {[
                ["Calf lined", "Inside and out"],
                ["Numbered", "One card per pair"],
                ["Hand finished", "Edges painted"],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="font-serif text-xl md:text-2xl">{a}</dt>
                  <dd className="mt-1 text-[12px] text-[#1c1a17]/55">{b}</dd>
                </div>
              ))}
            </dl>
            <Link href="/shop#list" className="mt-8 inline-block text-[11px] tracking-[0.18em] uppercase underline underline-offset-4">
              Three further colorways, on the list
            </Link>
          </div>
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
