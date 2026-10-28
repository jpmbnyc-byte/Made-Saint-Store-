import type { Metadata } from "next";
import Link from "next/link";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { WardrobeCatalog } from "@/components/wardrobe/catalog";
import { statusLine } from "@/lib/business";

export const metadata: Metadata = {
  title: "MADE SAiNT · The Private Wardrobe",
  description: "Three annual collections. One personal fit. A wardrobe that evolves with you.",
};

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef]">
      <ShopHeader status={statusLine()} />
      <div className="border-b border-[#1c1a17]/10 bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-6 px-5 py-10 md:px-8 md:py-14">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#f6f4ef]/55 uppercase">MADE SAiNT</p>
            <h1 className="mt-3 font-serif text-[48px] leading-[0.95] md:text-[72px]">
              The Private
              <br />
              <em>Wardrobe</em>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#f6f4ef]/75">
              Three annual collections. One personal fit. A wardrobe that evolves with you. The client buys the
              year, not access to a shop.
            </p>
          </div>
          <Link href="/shop" className="text-[11px] tracking-[0.18em] uppercase text-[#f6f4ef]/70 hover:text-[#f6f4ef]">
            Founding Edition shop →
          </Link>
        </div>
      </div>
      <WardrobeCatalog />
      <ShopFooter />
    </div>
  );
}
