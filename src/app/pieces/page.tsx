import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/house/site-chrome";
import { WARDROBE_LOOKS, WARDROBE_PIECES, lookHref, pieceHref } from "@/lib/pieces";
import { runnerHref } from "@/lib/business";

export const metadata: Metadata = {
  title: "Pieces",
  description: "Wardrobe pieces that work together — knits, columns, and the 0106 Runner. Enquire to begin.",
};

export default function PiecesPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <SiteHeader active="pieces" />

      <section className="relative min-h-[70vh] overflow-hidden bg-[#1c1a17] text-[#f5f0e8]">
        <Image
          src="/looks/set12/hero-set12.webp"
          alt="MADE SAiNT wardrobe look"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/85 via-[#1c1a17]/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1100px] flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#f5f0e8]/70">Wardrobe</p>
          <h1 className="mt-3 font-serif text-[44px] leading-[0.95] md:text-[68px]">Pieces that work together.</h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#f5f0e8]/80">
            Knits, columns, and the 0106 Runner — photographed as worn. Apparel is made to order by enquiry.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-[12px] tracking-[0.16em] uppercase">
            <Link href="/shop#0106" className="border border-[#f5f0e8]/40 px-5 py-3 hover:bg-[#f5f0e8] hover:text-[#1c1a17]">
              0106 Runner
            </Link>
            <Link href="#looks" className="px-5 py-3 underline underline-offset-4">
              The looks
            </Link>
          </div>
        </div>
      </section>

      <section id="looks" className="mx-auto max-w-[1100px] scroll-mt-28 px-5 py-16 md:px-8 md:py-20">
        <h2 className="font-serif text-4xl md:text-5xl">Looks</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Each look is a starting point. Open a piece to enquire, or open the runner on the shop.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {WARDROBE_LOOKS.map((look) => (
            <li key={look.slug}>
              <Link href={lookHref(look.slug)} className="group block">
                <span className="relative block aspect-[3/4] overflow-hidden bg-[#ebe6dc]">
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="mt-4 block font-serif text-2xl leading-none">{look.title}</span>
                <span className="mt-2 block text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/55">Open look</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="pieces" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-serif text-4xl md:text-5xl">The pieces</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            Listed without invented prices. Confirm material, size, and timing with the house.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {WARDROBE_PIECES.map((piece) => (
              <li key={piece.slug}>
                <Link href={pieceHref(piece.slug)} className="group block">
                  <span className="relative block aspect-[3/4] overflow-hidden bg-[#ebe6dc]">
                    <Image
                      src={piece.image}
                      alt={piece.alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, 45vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </span>
                  <span className="mt-3 block text-[13px] tracking-[-0.01em]">
                    {piece.name}
                  </span>
                  <span className="mt-1 block text-[12px] text-[#1c1a17]/55">{piece.color}</span>
                  <span className="mt-2 block text-[11px] tracking-[0.14em] uppercase">Enquire</span>
                </Link>
                {piece.runnerId ? (
                  <Link
                    href={runnerHref(piece.runnerId)}
                    className="mt-2 inline-block text-[11px] tracking-[0.12em] text-[#1c1a17]/50 uppercase underline-offset-4 hover:underline"
                  >
                    Matching 0106
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
