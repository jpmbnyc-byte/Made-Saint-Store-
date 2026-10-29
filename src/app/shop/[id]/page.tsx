import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { CAMPAIGN, PRODUCTS, SIZES, campaignStatus, fmtDate, productById, shipWindow, statusLine } from "@/lib/business";
import { viewsFor } from "@/lib/catalog";
import { withPublished } from "@/lib/atelier/publish";
import { stripeEnabled } from "@/lib/stripe";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { ProductGallery } from "@/components/shop/gallery";
import { ReserveForm } from "@/components/shop/reserve";
import { WaitlistForm } from "@/components/shop/waitlist";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = productById((await params).id);
  return { title: p ? p.name : "The Founding Edition" };
}

const short = (name: string) => name.replace("Runner, ", "");

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();
  const views = await withPublished(product.id, viewsFor(product));
  const siblings = PRODUCTS.filter((p) => p.launch === product.launch && p.id !== product.id);
  const closed = campaignStatus() === "closed";

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />
      <main className="mx-auto max-w-[1440px] px-0 py-0 md:px-8 md:py-8">
        <div className="px-5 pt-5 md:px-0 md:pt-0">
          <Link href="/shop#edition" className="inline-flex items-center gap-1 text-[11px] tracking-[0.16em] text-[#1c1a17]/60 uppercase hover:text-[#1c1a17]">
            <ChevronLeft className="size-3.5" /> The Founding Edition
          </Link>
        </div>

        <div className="mt-4 grid items-start gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-14">
          <ProductGallery views={views} />

          <div className="px-5 pb-12 lg:sticky lg:top-28 lg:self-start lg:px-0 lg:pb-0">
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">The Runner · Edition 001</p>
            <h1 className="mt-3 font-serif text-4xl leading-none md:text-5xl">{short(product.name)}</h1>
            <p className="mt-4 text-lg tabular-nums">${product.usd}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/75">{product.line}. Made to order in Felgueiras.</p>

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] uppercase">Colorway</p>
              <div className="mt-3 flex gap-3 overflow-x-auto">
                <Link href={`/shop/${product.id}`} aria-current="page" className="w-16 shrink-0 ring-1 ring-[#1c1a17]">
                  <span className="relative block aspect-square bg-[#f1eee8]">
                    <Image src={product.image} alt="" fill sizes="64px" className="object-contain" />
                  </span>
                  <span className="mt-1 block text-center text-[10px] tracking-[0.08em] uppercase">{short(product.name)}</span>
                </Link>
                {siblings.map((p) => (
                  <Link key={p.id} href={`/shop/${p.id}`} className="w-16 shrink-0 opacity-80 hover:opacity-100">
                    <span className="relative block aspect-square bg-[#f1eee8]">
                      <Image src={p.image} alt="" fill sizes="64px" className="object-contain" />
                    </span>
                    <span className="mt-1 block text-center text-[10px] tracking-[0.08em] uppercase">{short(p.name)}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8">
              {product.launch ? (
                <ReserveForm
                  productId={product.id}
                  priceUsd={product.usd}
                  payments={stripeEnabled() ? "stripe" : "mock"}
                  closed={closed}
                  shipWindow={shipWindow()}
                  sizes={SIZES}
                />
              ) : (
                <div className="border border-[#1c1a17]/15 p-5">
                  <p className="text-sm">In development for Edition 002. Join the list to be offered the run before it opens.</p>
                  <WaitlistForm productId={product.id} />
                </div>
              )}
            </div>

            <div className="mt-10 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
              <details open className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] tracking-[0.14em] uppercase">
                  Product details
                  <span className="text-lg leading-none text-[#1c1a17]/40 group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#1c1a17]/75">
                  <p>The three-peak wave is molded on the mesh of both quarters, lateral and medial, and matches the overhead photograph.</p>
                  <ul className="space-y-1.5">
                    {product.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <p>Tongue wordmark printed MADE SAiNT, lowercase i. Calf lined. Nub-lug sole.</p>
                  <p className="text-[12px] tracking-[0.08em] text-[#1c1a17]/50 uppercase">Code {product.id}</p>
                </div>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] tracking-[0.14em] uppercase">
                  Made to order
                  <span className="text-lg leading-none text-[#1c1a17]/40 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#1c1a17]/75">
                  {product.launch
                    ? `Reservations close ${fmtDate(CAMPAIGN.closes)}. If ${CAMPAIGN.threshold} pairs are reserved, the run is cut in Felgueiras and ships ${shipWindow()}. If not, the reservation is refunded in full within five business days.`
                    : "This colorway is not open for reservation. The list is offered the run before it opens."}
                </p>
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
                  Free insured shipping in the US. In the box: rigid box, tissue, cotton dust bag, spare laces, and a card with the founding number. Cancel for a full refund any time before {fmtDate(CAMPAIGN.closes)}.
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
}
