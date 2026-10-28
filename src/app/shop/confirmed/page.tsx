import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CAMPAIGN, fmtDate, productById, shipWindow } from "@/lib/business";
import { findReservation, markPaid } from "@/lib/preorders";
import { getCheckout, stripeEnabled } from "@/lib/stripe";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "MADE SAiNT · Reservation confirmed" };

export default async function Confirmed({ searchParams }: { searchParams: Promise<{ r?: string; session_id?: string }> }) {
  const { r: id, session_id } = await searchParams;
  let r = id ? await findReservation(id) : undefined;

  if (r && session_id && stripeEnabled() && r.status === "pending") {
    try {
      const s = await getCheckout(session_id);
      if (s.payment_status === "paid" && s.metadata?.reservation === r.id) r = (await markPaid(r.id, s.id)) ?? r;
    } catch {
      // The webhook will confirm the payment if Stripe is briefly unreachable here.
    }
  }

  const product = r ? productById(r.productId) : undefined;

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <main className="mx-auto max-w-[1000px] px-5 py-16 md:px-8">
        {!r || !product ? (
          <div className="py-20 text-center">
            <h1 className="font-serif text-5xl">We could not find that reservation</h1>
            <p className="mt-4 text-sm text-[#1c1a17]/65">If you completed payment, a receipt is on its way to your inbox.</p>
            <Link href="/shop" className="mt-8 inline-block border-b border-[#1c1a17] pb-1 text-[11px] tracking-[0.18em] uppercase">Return to the edition</Link>
          </div>
        ) : (
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ebebeb]">
              <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/60 uppercase">
                {r.status === "pending" ? "Payment processing" : "Reservation confirmed"}
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-6xl">
                {r.number ? (
                  <>
                    Founding pair
                    <br />
                    <em>No. {String(r.number).padStart(3, "0")}</em>
                  </>
                ) : (
                  "Thank you"
                )}
              </h1>
              <dl className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12 text-sm">
                {[
                  ["Colorway", product.name],
                  ["Size", `US ${r.size}`],
                  ["Reference", r.id],
                  ["Email", r.email.replace(/^(.).*(@.*)$/, "$1•••$2")],
                  ["Amount", r.status === "reserved" ? `$${r.amountUsd} · no card taken yet` : `$${r.amountUsd}`],
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
        )}
      </main>
      <ShopFooter />
    </div>
  );
}
