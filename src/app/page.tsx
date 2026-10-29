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
    description: "Made for the individual. Footwear and a private wardrobe, cut to order in Felgueiras.",
    images: [{ url: "/hero/look1-runner-hero.webp", width: 1280, height: 720, alt: "MADE SAiNT Runner, Chalk" }],
  },
};

const POSTER = ["ms-runner-chalk-navy", "ms-runner-navy-intrecciato", "ms-runner-washed-denim"] as const;

const short = (name: string) => name.replace("Runner, ", "");

export default function Home() {
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  const poster = POSTER.map((id) => byId.get(id)).filter((p) => p != null);
  const launch = PRODUCTS.filter((p) => p.launch);
  const from = Math.min(...launch.map((p) => p.usd));

  return (
    <div className="bg-[#f6f4ef] text-[#1c1a17]">
      <Mast />

      <section id="open" className="flex h-svh flex-col overflow-hidden">
        <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-3">
          {poster.map((p, i) => (
            <Link
              key={p.id}
              href={`/shop/${p.id}`}
              className={`relative block h-full min-h-0 overflow-hidden bg-[#f3f0ea] ${i === 0 ? "" : "hidden sm:block"}`}
            >
              <Image
                src={p.image}
                alt={`MADE SAiNT ${p.name}, overhead`}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 640px) 34vw, 100vw" : "34vw"}
                className="object-cover object-center"
              />
            </Link>
          ))}
        </div>
        <div className="bg-[#1c1a17] px-5 py-6 text-[#f6f4ef] sm:px-8 md:px-12 md:py-10">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] tracking-[0.24em] text-[#f6f4ef]/55 uppercase">The house · Felgueiras</p>
              <h1 className="mt-2 font-serif text-[56px] leading-[0.84] tracking-[-0.03em] sm:text-[80px] md:text-[104px]">
                MADE
                <br />
                <em>SAiNT</em>
              </h1>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#f6f4ef]/75">
                Made for the individual. A founding edition of runners, and a private wardrobe developed around the person wearing it.
              </p>
            </div>
            <div className="flex flex-col gap-6 md:items-end">
              <div className="flex flex-wrap gap-3">
                <Link href="#edition" className="border border-[#f6f4ef]/35 px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:bg-[#f6f4ef] hover:text-[#1c1a17]">
                  The edition
                </Link>
                <Link href="#wardrobe" className="bg-[#f6f4ef] px-5 py-3 text-[11px] tracking-[0.18em] text-[#1c1a17] uppercase">
                  The wardrobe
                </Link>
              </div>
              <p className="text-[11px] tracking-[0.2em] text-[#f6f4ef]/45 uppercase">Scroll</p>
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
          <Link href="/wardrobe" className="block bg-[#f1eee8]">
            <Image
              src="/wardrobe/denim-pastel-knit.webp"
              alt="MADE SAiNT washed denim and knit, three color stories"
              width={1200}
              height={900}
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
