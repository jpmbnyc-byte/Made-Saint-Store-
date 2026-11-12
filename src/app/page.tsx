import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { EditorialHero } from "@/components/house/editorial-hero";
import { Range1213 } from "@/components/house/range-1213";
import { WardrobeChapter } from "@/components/house/wardrobe-chapter";
import { TheHouse } from "@/components/house/the-house";
import { ClosingCta } from "@/components/house/closing-cta";
import { Campaign002 } from "@/components/house/campaign-002";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: { absolute: copy.seo.home.title },
  description: copy.seo.home.description,
  openGraph: {
    title: copy.seo.home.title,
    description: copy.seo.home.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MADE SAiNT" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

/**
 * Home sequence after audit:
 * campaign → footwear → clothing look register → wardrobe → house → enquire.
 * Removed: lookbook player, Azores composite plates, duplicate pair-enquiry block.
 */
export default function Home() {
  return (
    <div className="bg-[#f7f7f5] text-[#1c1a17]">
      <Mast />
      <EditorialHero />
      <Range1213 />
      <Campaign002 />
      <WardrobeChapter />
      <TheHouse />
      <ClosingCta />
      <ShopFooter />
    </div>
  );
}
