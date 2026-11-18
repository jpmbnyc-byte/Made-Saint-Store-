import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/house/site-chrome";
import { PRODUCTS, runnerHref } from "@/lib/business";
import {
  WARDROBE_LOOKS,
  enquireHrefForPiece,
  lookBySlug,
  pieceHref,
  piecesForLook,
} from "@/lib/pieces";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WARDROBE_LOOKS.map((look) => ({ slug: look.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const look = lookBySlug(slug);
  if (!look) return { title: "Look" };
  return {
    title: look.title,
    description: look.alt,
  };
}

export default async function LookPage({ params }: Props) {
  const { slug } = await params;
  const look = lookBySlug(slug);
  if (!look) notFound();

  const pieces = piecesForLook(look);
  const runner = look.runnerId ? PRODUCTS.find((product) => product.id === look.runnerId) : null;

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <SiteHeader active="pieces" />

      <article>
        <div className="relative min-h-[75vh] bg-[#1c1a17]">
          <Image
            src={look.image}
            alt={look.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="mx-auto max-w-[900px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#1c1a17]/55">Look</p>
          <h1 className="mt-3 font-serif text-[40px] leading-[0.95] md:text-[56px]">{look.title}</h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">{look.alt}</p>

          <section className="mt-12 border-t border-[#1c1a17]/10 pt-10">
            <h2 className="font-serif text-3xl">Pieces in this look</h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {pieces.map((piece) => (
                <li key={piece.slug}>
                  <Link href={pieceHref(piece.slug)} className="group block">
                    <span className="relative block aspect-[3/4] overflow-hidden bg-[#ebe6dc]">
                      <Image
                        src={piece.image}
                        alt={piece.alt}
                        fill
                        sizes="(min-width: 640px) 40vw, 100vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="mt-3 block text-[15px]">
                      {piece.name} — {piece.color}
                    </span>
                    <span className="mt-1 block text-[11px] tracking-[0.14em] uppercase">Enquire</span>
                  </Link>
                  <Link
                    href={enquireHrefForPiece(piece)}
                    className="mt-3 inline-flex h-11 items-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f5f0e8] uppercase"
                  >
                    Enquire for this piece
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {runner ? (
            <section className="mt-12 border-t border-[#1c1a17]/10 pt-10">
              <h2 className="font-serif text-3xl">0106 Runner</h2>
              <Link href={runnerHref(runner.id)} className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <span className="relative block aspect-[2/1] w-full max-w-md bg-[#ebe6dc] sm:w-72">
                  <Image src={runner.image} alt={runner.name} fill sizes="320px" className="object-contain p-2" />
                </span>
                <span>
                  <span className="block font-serif text-2xl leading-none">{runner.name.split("—").pop()?.trim()}</span>
                  <span className="mt-3 block text-sm tabular-nums">${runner.usd}</span>
                  <span className="mt-3 block text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                    Open on the shop
                  </span>
                </span>
              </Link>
            </section>
          ) : null}

          <p className="mt-14">
            <Link href="/pieces" className="text-[12px] tracking-[0.16em] uppercase underline underline-offset-4">
              All pieces
            </Link>
          </p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
