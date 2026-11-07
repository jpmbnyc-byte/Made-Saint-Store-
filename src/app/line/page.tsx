import type { Metadata } from "next";
import Link from "next/link";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { LineBrowser } from "@/components/line/browser";
import { LINE, frameSrc } from "@/lib/line";
import { listedLine, primaryFrame, publicFrames } from "@/lib/imagery";

export const metadata: Metadata = {
  title: "The 2027 line",
  description: "Proposed MADE SAiNT styles for 2027. List prices are not checkout prices. Materials stay design intentions until a sample is approved.",
};

export default function LinePage() {
  const shown = LINE.filter(listedLine);
  const low = Math.min(...shown.map((item) => item.retail ?? 0));
  const high = Math.max(...shown.map((item) => item.retail ?? 0));
  const cards = shown.map((item) => {
    const frame = primaryFrame(item.ref)!;
    return {
      ref: item.ref,
      name: item.name,
      tier: item.tier,
      category: item.category,
      colors: item.colors,
      retail: item.retail,
      status: item.status,
      image: frameSrc(frame.n),
      alt: frame.alt,
    };
  });
  const hidden = LINE.length - shown.length;

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <main className="mx-auto min-w-0 max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
        <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">2027 collection · 29 October 2026</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.92] md:text-7xl">The line, where a photograph can carry it.</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#1c1a17]/75">
          {shown.length} styles are shown, from ${low.toLocaleString("en-US")} to ${high.toLocaleString("en-US")}.
          A proposed price is a list price. Cloth, color, and construction stay design intentions until a sample is approved.{" "}
          {hidden} records stay in the data without a public card, because the photograph is missing, too small, or the price is held.
          The founding runners stay on the shop. A photographed style can be read by anyone it fits. The private wardrobe remains a service for an athlete.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop#edition" className="border border-[#1c1a17] px-4 py-3 text-[11px] tracking-[0.16em] uppercase">Founding Edition</Link>
          <Link href="/wardrobe#commission" className="inline-flex h-12 items-center bg-[#1c1a17] px-4 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">Commission</Link>
        </div>

        <section className="mt-14">
          <LineBrowser cards={cards} />
        </section>

        <section className="mt-20">
          <p className="text-sm text-[#1c1a17]/55">Photographs</p>
          <h2 className="mt-2 font-serif text-4xl">Large enough to show.</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {publicFrames().map((frame) => {
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
