import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, SERIES_ORDER, SIZES, productById, runnerHref, seriesHref } from "@/lib/business";
import { viewsFor } from "@/lib/catalog";
import { withPublished } from "@/lib/atelier/publish";
import { stripeEnabled } from "@/lib/stripe";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { ProductGallery } from "@/components/shop/gallery";
import { ReserveForm } from "@/components/shop/reserve";
import { SaveRunner } from "@/components/shop/save-runner";
import { HashScroll } from "@/components/shop/hash-scroll";
import { ProductBreakdown, SeriesStoryPanel } from "@/components/shop/series-story";
import { breakdownForProduct, seriesStory } from "@/lib/series-story";
import { runnerStatusCopy } from "@/lib/image-status";

export function generateStaticParams() {
  return PRODUCTS.filter((p) => p.launch).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = productById((await params).id);
  return { title: p?.launch ? p.name : "0929" };
}

const short = (name: string) => name.replace("Runner, ", "");
const color = (name: string) => name.split("—").pop()?.trim() || short(name);

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product?.launch) notFound();
  const views = await withPublished(product.id, viewsFor(product));
  const siblings = PRODUCTS.filter((p) => p.launch && p.series === product.series && p.id !== product.id);
  const statusCopy = runnerStatusCopy();
  const story = seriesStory(product.series);
  const leadColorway = product.id === story.leadProductId;
  const editorialHero = leadColorway ? story.editorialHero : null;
  const colourway = color(product.name);
  const breakdown = breakdownForProduct(story, product.id, product.materials, colourway);

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#352a23]">
      <ShopHeader />
      <HashScroll />
      <main>
        <section className="mx-auto grid max-w-[1600px] items-start gap-8 px-[4.5%] pt-8 pb-6 md:gap-10 md:pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:gap-14 lg:pb-10" aria-label={`${product.series} ${colourway}`}>
          <ProductGallery views={views} editorialHero={editorialHero} productName={product.name} />

          <div className="min-w-0 pb-8 lg:sticky lg:top-28 lg:self-start lg:pb-0">
            <div id="title" className="scroll-mt-36 md:scroll-mt-28">
              <p className="text-[11px] tracking-[0.22em] text-[#352a23] uppercase md:text-[12px]">Series</p>
              <p className="mt-2 font-serif text-[clamp(4.5rem,9vw,7.5rem)] leading-none tracking-[-0.04em] text-[#352a23]">
                {product.series}
              </p>
              <h1 className="mt-3 font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.02em]">
                {colourway}
              </h1>
            </div>

            <p className="mt-6 text-[11px] tracking-[0.18em] text-[#352a23] uppercase">{statusCopy.mark}</p>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[#352a23] md:text-[17px]">
              {leadColorway ? product.line : `${colourway} · Series ${product.series}`}
            </p>
            {product.notice ? (
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#75695d]">{product.notice}</p>
            ) : null}
            <p className="mt-6 font-serif text-[clamp(2rem,3vw,2.6rem)] tabular-nums tracking-[-0.02em]">
              ${product.usd}
            </p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#75695d]">{statusCopy.line}</p>

            <div className="mt-9">
              <p className="text-[11px] tracking-[0.18em] uppercase">
                Colour <span className="tracking-[0.08em] text-[#75695d]">/ {colourway}</span>
              </p>
              <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto pb-1">
                <Link
                  href={runnerHref(product.id)}
                  aria-current="page"
                  className="w-[57px] min-w-[57px] shrink-0 overflow-hidden ring-1 ring-[#352a23]"
                >
                  <span className="relative block aspect-square bg-[#ece3d5]">
                    <Image src={product.image} alt="" fill sizes="57px" className="object-contain p-1" />
                  </span>
                </Link>
                {siblings.map((p) => (
                  <Link
                    key={p.id}
                    href={runnerHref(p.id)}
                    className="w-[57px] min-w-[57px] shrink-0 overflow-hidden opacity-75 hover:opacity-100"
                    title={color(p.name)}
                  >
                    <span className="relative block aspect-square bg-[#ece3d5]">
                      <Image src={p.image} alt="" fill sizes="57px" className="object-contain p-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-9 border-t border-[#dfd6ca] pt-8">
              <Suspense fallback={null}>
                <ReserveForm
                  productId={product.id}
                  priceUsd={product.usd}
                  payments={stripeEnabled() ? "stripe" : "mock"}
                  sizes={SIZES}
                />
              </Suspense>
              {product.launch ? <SaveRunner productId={product.id} color={product.line} /> : null}
            </div>

            <div className="mt-10 divide-y divide-[#dfd6ca] border-y border-[#dfd6ca]">
              <details open className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] tracking-[0.16em] uppercase">
                  Fit &amp; sizing
                  <span className="text-base leading-none text-[#75695d]">▾</span>
                </summary>
                <p className="mt-4 text-[15px] leading-relaxed text-[#75695d]">
                  Choose your usual US men&apos;s size as your preferred size. Tell us about your current shoes and any
                  fit concerns in your enquiry. Fit and availability will be discussed before you order.
                </p>
              </details>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] tracking-[0.16em] uppercase">
                  Ordering &amp; delivery
                  <span className="text-base leading-none text-[#75695d]">▾</span>
                </summary>
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#75695d]">
                  <p>
                    Send your preferred style, colour and size. Availability, final price and delivery are confirmed with
                    your quotation. No payment is taken with an enquiry.
                  </p>
                  <p>
                    Prefer a wardrobe around this pair?{" "}
                    <Link href="/wardrobe" className="underline underline-offset-4">
                      Plan your wardrobe
                    </Link>
                    .
                  </p>
                </div>
              </details>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] tracking-[0.16em] uppercase">
                  Materials
                  <span className="text-base leading-none text-[#75695d]">▾</span>
                </summary>
                <ul className="mt-4 space-y-1.5 text-[15px] leading-relaxed text-[#75695d]">
                  {product.materials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[12px] tracking-[0.08em] text-[#75695d] uppercase">Code {product.id}</p>
              </details>
            </div>
          </div>
        </section>

        <SeriesStoryPanel story={story} leadColorway={leadColorway} />
        <ProductBreakdown parts={breakdown.parts} facts={breakdown.facts} leadName={breakdown.leadName} />

        <nav
          aria-label="Series"
          className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t border-[#dfd6ca] px-[4.5%] py-10"
        >
          <p className="text-[11px] tracking-[0.18em] uppercase">Continue in the house</p>
          <div className="flex flex-wrap gap-6">
            {SERIES_ORDER.map((series) => (
              <Link
                key={series}
                href={series === product.series ? runnerHref(product.id) : seriesHref(series)}
                aria-current={series === product.series ? "page" : undefined}
                className={`text-[13px] tracking-[0.16em] uppercase ${
                  series === product.series ? "border-b border-[#352a23] pb-1" : "text-[#75695d] hover:text-[#352a23]"
                }`}
              >
                {series}
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <ShopFooter />
    </div>
  );
}
