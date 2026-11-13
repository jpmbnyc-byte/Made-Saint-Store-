import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS, SIZES, productById } from "@/lib/business";
import { viewsFor } from "@/lib/catalog";
import { withPublished } from "@/lib/atelier/publish";
import { stripeEnabled } from "@/lib/stripe";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { ProductGallery } from "@/components/shop/gallery";
import { ReserveForm } from "@/components/shop/reserve";
import { SaveRunner } from "@/components/shop/save-runner";
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

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <ShopHeader />
      <main className="mx-auto max-w-[1440px] px-0 py-0 md:px-8 md:py-8">
        <div className="px-5 pt-5 md:px-0 md:pt-0">
          <Link href={`/shop#${product.series}`} className="inline-flex items-center gap-1 text-[11px] tracking-[0.16em] text-[#1c1a17]/60 uppercase hover:text-[#1c1a17]">
            <ChevronLeft className="size-3.5" /> {product.series}
          </Link>
        </div>

        <div className="mt-4 grid min-w-0 items-start gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-12">
          <div className="min-w-0">
            <ProductGallery views={views} />
          </div>

          <div className="min-w-0 px-5 pb-12 lg:sticky lg:top-28 lg:self-start lg:px-0 lg:pb-0">
            <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/55 uppercase">
              MADE SAiNT · {product.series}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-none md:text-5xl">{color(product.name)}</h1>
            <p className="mt-4 text-lg tabular-nums">${product.usd}</p>
            <p className="mt-2 text-[12px] tracking-[0.08em] text-[#1c1a17]/50 uppercase">{statusCopy.mark}</p>
            {product.notice && <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#1c1a17]/65">{product.notice}</p>}
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/75">{product.line}</p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#1c1a17]/65">{statusCopy.line}</p>

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] uppercase">Colour</p>
              <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto">
                <Link href={`/shop/${product.id}`} aria-current="page" className="w-14 min-w-14 shrink-0 overflow-hidden ring-1 ring-[#1c1a17]">
                  <span className="relative block aspect-square bg-[#f3f3f1]">
                    <Image src={product.image} alt="" fill sizes="56px" className="object-contain p-1" />
                  </span>
                </Link>
                {siblings.map((p) => (
                  <Link key={p.id} href={`/shop/${p.id}`} className="w-14 min-w-14 shrink-0 overflow-hidden opacity-70 hover:opacity-100">
                    <span className="relative block aspect-square bg-[#f3f3f1]">
                      <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Suspense fallback={null}>
                <ReserveForm
                  productId={product.id}
                  priceUsd={product.usd}
                  payments={stripeEnabled() ? "stripe" : "mock"}
                  sizes={SIZES}
                />
              </Suspense>
              {product.launch && <SaveRunner productId={product.id} color={product.line} />}
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
                        ? "Tongue wordmark printed MADE SAiNT. The sole is sculpted. An angel is printed on the insole."
                        : product.id === "ms-runner-1101-butter"
                          ? "Dark chocolate suede with tan open-mesh panels. Five eyelet pairs. Tongue wordmark printed MADE SAiNT."
                          : product.materials.some((item) => /gris medio/i.test(item))
                            ? "Leather and 29 Gris Medio mesh. Five eyelet pairs. Tongue wordmark printed MADE SAiNT."
                            : "Leather with open-mesh or wave panels. Five eyelet pairs. Tongue wordmark printed MADE SAiNT."}
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
                  Delivery
                  <span className="text-lg leading-none text-[#1c1a17]/40 group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#1c1a17]/75">
                  <p>Delivery is confirmed with your quotation.</p>
                  <p>
                    An enquiry records your interest only. No payment is taken with the enquiry. When checkout is offered, it follows the terms shown there.
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
            </div>
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
}
