import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { CAMPAIGN, PRODUCTS, SIZES, campaignStatus, fmtDate, productById, shipWindow, statusLine } from "@/lib/business";
import { stripeEnabled } from "@/lib/stripe";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { LiveProgress } from "@/components/shop/live";
import { ReserveForm } from "@/components/shop/reserve";
import { WaitlistForm } from "@/components/shop/waitlist";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = productById((await params).id);
  return { title: p ? p.name : "The Founding Edition" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();
  const others = PRODUCTS.filter((p) => p.launch && p.id !== product.id);

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader status={statusLine()} />
      <main className="mx-auto max-w-[1320px] px-5 py-6 md:px-8">
        <Link href="/shop#edition" className="inline-flex items-center gap-1 text-[11px] tracking-[0.16em] text-[#1c1a17]/60 uppercase hover:text-[#1c1a17]">
          <ChevronLeft className="size-3.5" /> The Founding Edition
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#ebebeb] lg:sticky lg:top-32 lg:self-start">
            <Image src={product.image} alt={`MADE SAiNT ${product.name}, top view`} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>

          <div className="pb-10">
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">The Runner · Edition 001</p>
            <h1 className="mt-3 font-serif text-5xl leading-none md:text-6xl">{product.name.replace("Runner, ", "")}</h1>
            <p className="mt-3 text-[15px] text-[#1c1a17]/70">{product.line}</p>
            <p className="mt-6 text-2xl tabular-nums">${product.usd}</p>

            {product.launch ? (
              <>
                <div className="mt-6">
                  <LiveProgress productId={product.id} of={CAMPAIGN.threshold} />
                </div>
                <div className="mt-8">
                  <ReserveForm
                    productId={product.id}
                    priceUsd={product.usd}
                    payments={stripeEnabled() ? "stripe" : "mock"}
                    closed={campaignStatus() === "closed"}
                    shipWindow={shipWindow()}
                    sizes={SIZES}
                  />
                </div>
              </>
            ) : (
              <div className="mt-8 border border-[#1c1a17]/15 p-5">
                <p className="text-sm">In development for Edition 002. Join the list to be offered the run before it opens.</p>
                <WaitlistForm productId={product.id} />
              </div>
            )}

            <div className="mt-12 space-y-8 border-t border-[#1c1a17]/15 pt-8">
              <div>
                <h2 className="text-[11px] tracking-[0.16em] uppercase">Materials</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-[#1c1a17]/75">
                  {product.materials.map((m) => (
                    <li key={m} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-[#1c1a17]/40" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-[11px] tracking-[0.16em] uppercase">Made to order</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/75">
                  Reservations close {fmtDate(CAMPAIGN.closes)}. If {CAMPAIGN.threshold} pairs are reserved, the run goes to our
                  workshop in Felgueiras, Portugal, and pairs ship {shipWindow()}. If not, your payment is refunded in full within five
                  business days.
                </p>
              </div>
              <div>
                <h2 className="text-[11px] tracking-[0.16em] uppercase">In the box</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/75">
                  Rigid box, tissue, cotton dust bag, a spare pair of laces, and a card bearing your founding number.
                </p>
              </div>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <section className="border-t border-[#1c1a17]/15 py-14">
            <h2 className="font-serif text-3xl">Also in the edition</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} className="group grid grid-cols-[120px_1fr] items-center gap-5">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ebebeb]">
                    <Image src={p.image} alt={p.name} fill sizes="120px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-serif text-2xl group-hover:underline">{p.name.replace("Runner, ", "")}</p>
                    <p className="mt-1 text-sm text-[#1c1a17]/60">{p.line} · ${p.usd}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <ShopFooter />
    </div>
  );
}
