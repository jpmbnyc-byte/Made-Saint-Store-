import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Mast } from "@/components/house/mast";
import { ShopFooter } from "@/components/shop/chrome";
import { Pledge } from "@/components/house/pledge";
import { PlaceChapter } from "@/components/house/place-chapter";
import { Campaign002 } from "@/components/house/campaign-002";
import { FOUNDER } from "@/lib/impact";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.seo.house.title,
  description: copy.seo.house.description,
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#f4f0e7] text-[#1c1a17]">
      <Mast />
      <main>
        <section className="mx-auto max-w-[820px] px-5 py-16 md:px-8 md:py-24">
          <p className="ms-kicker">The House</p>
          <h1 className="ms-display mt-5">{copy.house.heading}</h1>
          <p className="ms-lede mt-8 max-w-xl">{copy.house.founder}</p>
          <p className="ms-lede mt-4 max-w-xl">{copy.house.collection}</p>
        </section>

        <section className="border-t border-[#1c1a17]/10">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-[280px_minmax(0,1fr)] md:px-8 md:py-20">
            <div className="bg-[#f4f0e7] p-6">
              <Image src="/brand/wordmark.png" alt="MADE Saint" width={1864} height={462} className="h-auto w-full" />
            </div>
            <div className="max-w-xl space-y-5 text-[16px] leading-relaxed text-[#1c1a17]/80">
              <h2 className="ms-title">{copy.house.peopleHeading}</h2>
              <p>{copy.house.people}</p>
              <p className="text-[14px] text-[#1c1a17]/60">{copy.house.peopleDisclosure}</p>
              <h2 className="ms-title pt-4">The world</h2>
              <p>
                Campaign 002 places the collection in São Roque, São Miguel — looks first, Atlantic light as atmosphere. The mainland workshop in São Roque, Oliveira de Azeméis, is a separate making chapter once partnership is confirmed.
              </p>
              <h2 className="ms-title pt-4">The pairs</h2>
              <p>
                The 1101 leads. The 1213 is the sculpted-sole runner. The 0929 is the studded-sole runner. Enquire about a colourway to confirm availability, price and delivery.
              </p>
              <div className="pt-6">
                <Pledge />
              </div>
            </div>
          </div>
        </section>

        <PlaceChapter />
        <Campaign002 />

        <section className="border-t border-[#1c1a17]/10">
          <div className="mx-auto flex max-w-[1100px] flex-wrap gap-3 px-5 py-14 md:px-8">
            <Link href="/shop#1101" className="ms-cta bg-[#1c1a17] text-[#f5f0e8]">
              Explore 1101
            </Link>
            <Link href="/wardrobe" className="ms-cta border border-[#1c1a17]/30">
              Private Wardrobe
            </Link>
          </div>
        </section>
      </main>
      <ShopFooter />
    </div>
  );
}
