import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS, SIZES, productById, statusLine } from "@/lib/business";
import { SeriesPlate } from "@/components/shop/series-plate";
import { OrderRule } from "@/components/shop/order-rule";
import { viewsFor } from "@/lib/catalog";
import { withPublished } from "@/lib/atelier/publish";
import { stripeEnabled } from "@/lib/stripe";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { ProductGallery } from "@/components/shop/gallery";
import { ReserveForm } from "@/components/shop/reserve";

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

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />
      <main className="mx-auto max-w-[1440px] px-0 py-0 md:px-8 md:py-8">
        <div className="px-5 pt-5 md:px-0 md:pt-0">
          <Link href={`/shop#${product.series}`} className="inline-flex items-center gap-1 text-[11px] tracking-[0.16em] text-[#1c1a17]/60 uppercase hover:text-[#1c1a17]">
            <ChevronLeft className="size-3.5" /> {product.series}
          </Link>
        </div>

        <div className="mt-4 grid min-w-0 items-start gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-14">
          <ProductGallery views={views} />

          <div className="min-w-0 px-5 pb-12 lg:sticky lg:top-28 lg:self-start lg:px-0 lg:pb-0">
            <SeriesPlate series={product.series} size="lg" />
            <h1 className="mt-4 font-serif text-4xl leading-none md:text-5xl">{color(product.name)}</h1>
            <p className="mt-4 text-lg tabular-nums">${product.usd}</p>
            {product.notice && <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#1c1a17]/65">{product.notice}</p>}
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/75">{product.line}. Made to order. Ready in 4 to 6 weeks.</p>
            {product.launch && (
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#1c1a17]/65">
                {product.series === "0929"
                  ? "US men's 7 through 12. Anyone that size fits can request this pair. It does not open a wardrobe."
                  : "US men's 7 through 12 can be requested. A measured fit is not certified. A pair does not open a wardrobe."}
              </p>
            )}

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] uppercase">Colorway</p>
              <div className="mt-3 flex min-w-0 gap-3 overflow-x-auto">
                <Link href={`/shop/${product.id}`} aria-current="page" className="w-16 min-w-16 shrink-0 overflow-hidden ring-1 ring-[#1c1a17]">
                  <span className="relative block aspect-square bg-[#f1eee8]">
                    <Image src={product.image} alt="" fill sizes="64px" className="object-contain" />
                  </span>
                  <span className="mt-1 block truncate text-center text-[10px] tracking-[0.08em] uppercase">{color(product.name)}</span>
                </Link>
                {siblings.map((p) => (
                  <Link key={p.id} href={`/shop/${p.id}`} className="w-16 min-w-16 shrink-0 overflow-hidden opacity-80 hover:opacity-100">
                    <span className="relative block aspect-square bg-[#f1eee8]">
                      <Image src={p.image} alt="" fill sizes="64px" className="object-contain" />
                    </span>
                    <span className="mt-1 block truncate text-center text-[10px] tracking-[0.08em] uppercase">{color(p.name)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {product.launch && (
              <div className="mt-8">
                <p className="text-[11px] tracking-[0.16em] uppercase">How this pair is made</p>
                <div className="mt-3">
                  <OrderRule compact />
                </div>
              </div>
            )}

            <div className="mt-8">
              <Suspense fallback={null}>
                <ReserveForm
                  productId={product.id}
                  priceUsd={product.usd}
                  payments={stripeEnabled() ? "stripe" : "mock"}
                  sizes={SIZES}
                />
              </Suspense>
            </div>

            <div className="mt-10 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              <details open className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] tracking-[0.14em] uppercase">
                  Product details
                  <span className="text-lg leading-none text-[#1c1a17]/40 group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#1c1a17]/75">
                  <ul className="space-y-1.5">
                    {product.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <p>
                    {product.series === "0929"
                      ? "Tongue wordmark printed MADE SAiNT, lowercase i. Calf lined. Nub-lug sole."
                      : product.id === "ms-runner-1213-sacred-light"
                        ? "Tongue wordmark printed MADE SAiNT. The sole is sculpted. Materials are not confirmed."
                        : "Leather and 29 Gris Medio mesh. Five eyelet pairs. A photograph does not certify the lining, the tooling, or the fit."}
                  </p>
                  <p className="text-[12px] tracking-[0.08em] text-[#1c1a17]/50 uppercase">Code {product.id}</p>
                </div>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] tracking-[0.14em] uppercase">
                  Care
                  <span className="text-lg leading-none text-[#1c1a17]/40 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#1c1a17]/75">
                  Brush suede and woven leather with a soft crepe brush. Treat once before the first wear. Store in the dust bag, away from direct sun. Size exchanges are free within 30 days of delivery.
                </p>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] tracking-[0.14em] uppercase">
                  Shipping and returns
                  <span className="text-lg leading-none text-[#1c1a17]/40 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#1c1a17]/75">
                  Free insured shipping in the US. In the box: rigid box, tissue, cotton dust bag, spare laces, and a card. A request can be withdrawn before the pair is started. A paid checkout follows the terms shown there.
                </p>
              </details>
            </div>
          </div>
        </div>
        {product.id === "ms-runner-1213-sacred-light" && (
          <section className="mx-auto mt-16 max-w-[1100px] border-t border-[#1c1a17]/10 px-5 pt-10 md:px-0">
            <h2 className="font-serif text-3xl">Shown beside the pair</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#1c1a17]/65">
              These are styling references. They are not included with the runner, and they are not for sale.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <figure>
                <div className="relative aspect-[4/5] bg-[#f1eee8]">
                  <Image src="/runners/1213/shoulder-bag-plum.webp" alt="A plum shoulder bag, shown as a styling reference" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="ms-caption mt-3 text-[12px] normal-case tracking-normal text-[#1c1a17]/65">A plum shoulder bag. A styling reference. Not included with the pair, and not for sale.</figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[4/5] bg-[#f1eee8]">
                  <Image src="/runners/1213/tongue-wallet.webp" alt="A lace-on tongue wallet shown beside the Sacred Light runner" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="ms-caption mt-3 text-[12px] normal-case tracking-normal text-[#1c1a17]/65">A lace-on tongue wallet, shown beside the runner. Not included, and not for sale.</figcaption>
              </figure>
            </div>
          </section>
        )}
      </main>
      <ShopFooter />
    </div>
  );
}
