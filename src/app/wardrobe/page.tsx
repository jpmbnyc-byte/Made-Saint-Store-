import type { Metadata } from "next";
import Link from "next/link";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { PrivateHouse } from "@/components/wardrobe/house";

export const metadata: Metadata = {
  title: "The Private Wardrobe",
  description: "Three annual collections. One personal fit. The same MADE SAiNT silhouettes, developed to the client.",
};

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <section className="mx-auto max-w-[900px] px-5 py-10 md:px-8">
        <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/55 uppercase">From a look</p>
        <h2 className="mt-2 font-serif text-4xl">The clothes in a look are commissioned here.</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#1c1a17]/70">
          Business, the weekend, and the occasion are on the house page. A founding pair in a look is reserved from there. This page is the fit, and the year.
        </p>
        <Link href="/#looks" className="mt-5 inline-block text-[11px] tracking-[0.16em] uppercase underline underline-offset-4">
          Open the lookbooks
        </Link>
      </section>
      <PrivateHouse />
      <ShopFooter />
    </div>
  );
}
