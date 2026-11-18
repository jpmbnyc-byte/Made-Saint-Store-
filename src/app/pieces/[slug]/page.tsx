import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/house/site-chrome";
import { PRODUCTS, runnerHref } from "@/lib/business";
import {
  WARDROBE_LOOKS,
  WARDROBE_PIECES,
  enquireHrefForPiece,
  lookHref,
  pieceBySlug,
  pieceHref,
} from "@/lib/pieces";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WARDROBE_PIECES.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = pieceBySlug(slug);
  if (!piece) return { title: "Piece" };
  return {
    title: `${piece.name} — ${piece.color}`,
    description: `${piece.line} Made to order. Enquire with the house.`,
  };
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params;
  const piece = pieceBySlug(slug);
  if (!piece) notFound();

  const runner = piece.runnerId ? PRODUCTS.find((product) => product.id === piece.runnerId) : null;
  const looks = WARDROBE_LOOKS.filter((look) => look.pieceSlugs.includes(piece.slug));
  const related = WARDROBE_PIECES.filter(
    (item) => item.slug !== piece.slug && looks.some((look) => look.pieceSlugs.includes(item.slug)),
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <SiteHeader active="pieces" />

      <article className="mx-auto grid max-w-[1100px] gap-10 px-5 py-12 md:grid-cols-2 md:gap-14 md:px-8 md:py-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe6dc]">
          <Image src={piece.image} alt={piece.alt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-top" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#1c1a17]/55">{piece.category}</p>
          <h1 className="mt-3 font-serif text-[40px] leading-[0.95] md:text-[52px]">{piece.name}</h1>
          <p className="mt-3 text-[18px]">{piece.color}</p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/75">{piece.line}</p>
          <p className="mt-4 text-[13px] leading-relaxed text-[#1c1a17]/60">
            Apparel is made to order. Price and timing are confirmed by written quotation — not listed as instant checkout.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={enquireHrefForPiece(piece)}
              className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.16em] text-[#f5f0e8] uppercase"
            >
              Enquire
            </Link>
            <Link
              href="/pieces#looks"
              className="inline-flex h-12 items-center px-6 text-[12px] tracking-[0.16em] uppercase underline underline-offset-4"
            >
              All looks
            </Link>
          </div>

          {runner ? (
            <div className="mt-10 border-t border-[#1c1a17]/10 pt-8">
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#1c1a17]/50">Worn with</p>
              <Link href={runnerHref(runner.id)} className="mt-3 flex items-center gap-4 group">
                <span className="relative block h-20 w-28 shrink-0 bg-[#ebe6dc]">
                  <Image src={runner.image} alt="" fill sizes="112px" className="object-contain p-1" />
                </span>
                <span>
                  <span className="block font-serif text-xl leading-none group-hover:underline">{runner.name.split("—").pop()?.trim()}</span>
                  <span className="mt-2 block text-sm tabular-nums">${runner.usd}</span>
                </span>
              </Link>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-10 border-t border-[#1c1a17]/10 pt-8">
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#1c1a17]/50">In the same look</p>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={pieceHref(item.slug)} className="text-[15px] underline-offset-4 hover:underline">
                      {item.name} — {item.color}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {looks.length > 0 ? (
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#1c1a17]/50">Looks</p>
              <ul className="mt-3 space-y-2">
                {looks.map((look) => (
                  <li key={look.slug}>
                    <Link href={lookHref(look.slug)} className="text-[14px] underline-offset-4 hover:underline">
                      {look.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
