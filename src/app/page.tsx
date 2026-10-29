import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, shipWindow } from "@/lib/business";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description:
    "Runners made to order in Felgueiras, Portugal. The Founding Edition is numbered and reserved before a pair is cut.",
  openGraph: {
    title: "MADE SAiNT",
    description: "Made to order in Felgueiras. Three runners, numbered, reserved before they are cut.",
    images: [{ url: "/hero/look1-runner-hero.webp", width: 1280, height: 720, alt: "MADE SAiNT Runner, Chalk" }],
  },
};

const short = (name: string) => name.replace("Runner, ", "");

export default function Home() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const next = PRODUCTS.filter((p) => !p.launch);
  const chalk = launch.find((p) => p.id === "ms-runner-chalk-navy") ?? launch[0];

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />

      <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-4 pt-6 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:gap-12 md:px-10 md:pb-8 md:pt-10">
        <div className="order-2 md:order-1">
          <p className="text-[11px] tracking-[0.24em] text-[#1c1a17]/55 uppercase">Edition 001 · Felgueiras</p>
          <h1 className="mt-4 font-serif text-[52px] leading-[0.92] tracking-[-0.02em] md:text-[86px]">
            Made after
            <br />
            <em>you choose it.</em>
          </h1>
          <p className="mt-6 max-w-[28rem] text-[16px] leading-relaxed text-[#1c1a17]/75">
            Three runners in woven calf, bouclé and washed denim, on our nub sole. Leather lined, numbered, and cut in Portugal
            only once the run is reserved.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/shop#edition"
              className="inline-flex items-center gap-3 bg-[#1c1a17] px-7 py-4 text-[11px] tracking-[0.2em] text-[#f6f4ef] uppercase transition hover:bg-[#1c1a17]/85"
            >
              Reserve a pair <ArrowRight className="size-3.5" />
            </Link>
            <p className="text-[12px] tracking-[0.04em] text-[#1c1a17]/55">From ${Math.min(...launch.map((p) => p.usd))} · ships {shipWindow()}</p>
          </div>
        </div>
        <Link href={`/shop/${chalk.id}`} className="order-1 block bg-white md:order-2">
          <Image
            src="/hero/look1-runner-hero.webp"
            alt="MADE SAiNT Runner in chalk bouclé and navy canvas"
            width={1280}
            height={720}
            priority
            className="h-auto w-full"
          />
        </Link>
      </section>

      <section id="edition" className="mx-auto max-w-[1440px] scroll-mt-28 px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1c1a17]/15 pb-5">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">The Founding Edition</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Three colorways</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#1c1a17]/65">
            Open for reservation now. If a colorway is not confirmed, every reservation for it is refunded in full.
          </p>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {launch.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image
                  src={p.image}
                  alt={`MADE SAiNT ${p.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl">{short(p.name)}</h3>
                <p className="text-sm tabular-nums">${p.usd}</p>
              </div>
              <p className="mt-1 text-[13px] text-[#1c1a17]/60">{p.line}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="atelier" className="scroll-mt-28 bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
          <div className="bg-[#241c19]">
            <Image
              src="/hero/look3-runner-inverse.webp"
              alt="MADE SAiNT Runner in espresso calf suede"
              width={1280}
              height={720}
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/55 uppercase">The atelier</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
              Felgueiras,
              <br />
              <em>northern Portugal.</em>
            </h2>
            <div className="mt-6 max-w-md space-y-4 text-[15px] leading-relaxed text-[#f6f4ef]/75">
              <p>
                Each pair is cut, closed and lasted in the Felgueiras footwear cluster. Uppers are calf and woven textile. The
                lining is calf. Edges are painted by hand.
              </p>
              <p>
                We make in small numbered runs. Small enough that your founding number is on the card in the box. Large enough
                that the price is the materials, not the scarcity.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#f6f4ef]/20 pt-6">
              {[
                ["Calf lined", "Inside and out"],
                ["Numbered", "One card per pair"],
                ["Hand finished", "Edges painted"],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="font-serif text-xl md:text-2xl">{a}</dt>
                  <dd className="mt-1 text-[12px] text-[#f6f4ef]/55">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Edition 002</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">On the list</h2>
          </div>
          <Link href="/shop#list" className="text-[11px] tracking-[0.18em] uppercase underline underline-offset-4">
            Join before the run opens
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {next.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image src={p.image} alt={`MADE SAiNT ${p.name}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="font-serif text-2xl">{short(p.name)}</h3>
                <p className="text-[12px] text-[#1c1a17]/50">In development</p>
              </div>
              <p className="mt-1 text-[13px] text-[#1c1a17]/60">{p.line}</p>
            </Link>
          ))}
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
