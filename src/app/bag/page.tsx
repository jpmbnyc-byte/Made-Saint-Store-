import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/house/site-chrome";
import { CheckoutBag } from "@/components/shop/checkout-bag";

export const metadata: Metadata = {
  title: { absolute: "Checkout — MADE Saint" },
  description: "Review priced pieces and complete checkout or request a quotation.",
};

export default function BagPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <SiteHeader active="checkout" />
      <main className="mx-auto max-w-[900px] px-5 py-12 md:px-8 md:py-16">
        <p className="text-[11px] tracking-[0.2em] text-[#B03236] uppercase">Checkout</p>
        <h1 className="mt-3 font-serif text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
          Review and continue.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Footwear can proceed to payment when Stripe is configured. Apparel list prices from the house
          register are confirmed by quotation before production.
        </p>
        <CheckoutBag />
      </main>
      <SiteFooter />
    </div>
  );
}
