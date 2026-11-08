import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { LEAD_TIME, statusLine } from "@/lib/business";
import { RANGE_1213, colorName, rangeBySlug } from "@/lib/range-1213";
import { ProductGallery } from "@/components/shop/gallery";
import { RangeRequest } from "@/components/shop/range-request";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";

export function generateStaticParams() {
  return RANGE_1213.map((colorway) => ({ slug: colorway.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const colorway = rangeBySlug((await params).slug);
  return { title: colorway?.name ?? "1213" };
}

export default async function RangePage({ params }: { params: Promise<{ slug: string }> }) {
  const colorway = rangeBySlug((await params).slug);
  if (!colorway) notFound();
  const views = colorway.views.map((view) => ({ id: "product" as const, ...view }));

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />
      <main className="mx-auto max-w-[1320px] px-5 py-8 md:px-8">
        <Link href="/shop#1213" className="inline-flex items-center gap-1 text-[11px] tracking-[0.16em] uppercase">
          <ChevronLeft className="size-3.5" /> 1213
        </Link>
        <div className="mt-4 grid min-w-0 items-start gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-14">
          <ProductGallery views={views} />
          <div className="min-w-0 px-0 pb-12 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] tracking-[0.22em] text-[#B03236] uppercase">1213</p>
            <h1 className="mt-3 font-serif text-4xl leading-none md:text-5xl">{colorway.name}</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#1c1a17]/75">{colorway.line}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#1c1a17]/65">
              A product photograph. Materials are not confirmed. A price is not listed. Made to order. Ready in {LEAD_TIME}.
            </p>
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] uppercase">Colorway</p>
              <div className="mt-3 flex min-w-0 gap-3 overflow-x-auto">
                {RANGE_1213.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/shop/1213/${item.slug}`}
                    aria-current={item.slug === colorway.slug ? "page" : undefined}
                    className={`w-16 min-w-16 shrink-0 overflow-hidden ${item.slug === colorway.slug ? "ring-1 ring-[#1c1a17]" : "opacity-80 hover:opacity-100"}`}
                  >
                    <span className="relative block aspect-square bg-[#f1eee8]">
                      <Image src={item.image} alt="" fill sizes="64px" className="object-contain" />
                    </span>
                    <span className="mt-1 block truncate text-center text-[10px] tracking-[0.08em] uppercase">{colorName(item.name)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <RangeRequest colorway={colorway.name} />
            </div>
          </div>
        </div>
        {colorway.references && (
          <section className="mt-16 border-t border-[#1c1a17]/10 pt-10">
            <h2 className="font-serif text-3xl">Shown beside the pair</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#1c1a17]/65">
              These are styling references. They are not included with the runner, and they are not for sale.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {colorway.references.map((item) => (
                <figure key={item.src}>
                  <div className="relative aspect-[4/5] bg-[#f1eee8]">
                    <Image src={item.src} alt={item.alt} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-contain" />
                  </div>
                  <figcaption className="ms-caption mt-3 text-[12px] normal-case tracking-normal text-[#1c1a17]/65">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </main>
      <ShopFooter />
    </div>
  );
}
