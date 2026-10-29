"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CAMPAIGN, fmtDate, productById, shipWindow } from "@/lib/business";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";

export function ConfirmedClient() {
  const params = useSearchParams();
  const id = params.get("r") ?? "";
  const productId = params.get("product") ?? "";
  const size = params.get("size") ?? "";
  const product = productById(productId);

  if (!id && !product) {
    return (
      <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
        <ShopHeader />
        <main className="mx-auto max-w-[1000px] px-5 py-16 md:px-8">
          <div className="py-20 text-center">
            <h1 className="font-serif text-5xl">We could not find that reservation</h1>
            <p className="mt-4 text-sm text-[#1c1a17]/65">If you completed payment, a receipt is on its way to your inbox.</p>
            <Link href="/shop" className="mt-8 inline-block border-b border-[#1c1a17] pb-1 text-[11px] tracking-[0.18em] uppercase">
              Return to the edition
            </Link>
          </div>
        </main>
        <ShopFooter />
      </div>
    );
  }

  const shown = product ?? productById("ms-runner-chalk-navy");

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <main className="mx-auto max-w-[1000px] px-5 py-16 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
          {shown && (
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ebebeb]">
              <Image src={shown.image} alt={shown.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          )}
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">Reservation received</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-6xl">Thank you</h1>
            <dl className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12 text-sm">
              {[
                ["Colorway", shown?.name ?? "Founding Edition"],
                ["Size", size ? `US ${size}` : "As selected"],
                ["Reference", id || "We will confirm by email"],
                ["Run confirmed when", `${CAMPAIGN.threshold} pairs are reserved, by ${fmtDate(CAMPAIGN.closes)}`],
                ["Ships", shipWindow()],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3">
                  <dt className="text-[#1c1a17]/55">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-[#1c1a17]/70">
              We will write when the run is confirmed and again from the bench in Felgueiras. If the run is not confirmed, your
              payment is returned in full.
            </p>
            <Link href="/shop" className="mt-8 inline-block border-b border-[#1c1a17] pb-1 text-[11px] tracking-[0.18em] uppercase">
              Return to the edition
            </Link>
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
}
