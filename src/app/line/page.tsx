import type { Metadata } from "next";
import Link from "next/link";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { LineBrowser } from "@/components/line/browser";
import { FRAMES, LINE, frameSrc, framesFor, pricedLine } from "@/lib/line";

export const metadata: Metadata = {
  title: "The 2027 line",
  description: "Proposed MADE SAiNT styles for 2027. List prices are not checkout prices. Materials stay design intentions until a sample is approved.",
};

export default function LinePage() {
  const priced = pricedLine();
  const low = Math.min(...priced.map((item) => item.retail ?? 0));
  const high = Math.max(...priced.map((item) => item.retail ?? 0));
  const cards = LINE.map((item) => {
    const frame = framesFor(item.ref)[0];
    return {
      ref: item.ref,
      name: item.name,
      tier: item.tier,
      category: item.category,
      colors: item.colors,
      retail: item.retail,
      status: item.status,
      image: frame ? frameSrc(frame.n) : null,
      alt: frame?.alt ?? item.name,
    };
  });

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <main className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
        <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">2027 collection · 29 October 2026</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.92] md:text-7xl">The line, with the photographs we have.</h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#1c1a17]/75">
          {priced.length} styles carry a proposed list price, from ${low.toLocaleString("en-US")} to ${high.toLocaleString("en-US")}.
          A proposed price is not a checkout price. Cloth, color, and construction stay design intentions until a sample is approved.
          The Founding Edition runners are a separate offer and stay on the shop.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1c1a17]/60">
          Five archive records are listed without a price. Four collaboration concepts are not shown, because licensing is not established.
          A photograph is attached only when the frame matches the style. The other frames stay in the lookbook below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop#edition" className="border border-[#1c1a17] px-4 py-3 text-[11px] tracking-[0.16em] uppercase">Founding Edition</Link>
          <Link href="/wardrobe#commission" className="bg-[#1c1a17] px-4 py-3 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">Commission</Link>
        </div>

        <section className="mt-14">
          <LineBrowser cards={cards} />
        </section>

        <section className="mt-20">
          <p className="text-[11px] tracking-[0.18em] uppercase">All 59 photographs</p>
          <h2 className="mt-2 font-serif text-4xl">The sheets, in the order they arrived.</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {FRAMES.map((frame) => {
              const href = frame.refs[0] ? `/line/${frame.refs[0].toLowerCase()}` : undefined;
              const inner = (
                <>
                  <img src={frameSrc(frame.n)} alt={frame.alt} className="aspect-[4/5] w-full bg-[#f1eee8] object-contain" />
                  <p className="mt-2 text-[12px] leading-snug text-[#1c1a17]/70">{frame.alt}</p>
                  <p className="mt-1 text-[11px] tracking-[0.12em] text-[#1c1a17]/45 uppercase">{frame.refs.length ? frame.refs.join(" · ") : "Lookbook"}</p>
                </>
              );
              return (
                <li key={frame.n}>
                  {href ? <Link href={href}>{inner}</Link> : inner}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <ShopFooter />
    </div>
  );
}
