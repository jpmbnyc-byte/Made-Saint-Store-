import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { EditorialHero } from "@/components/house/editorial-hero";
import { HomeSignature } from "@/components/house/home-signature";
import { Range1213 } from "@/components/house/range-1213";
import { WardrobeChapter } from "@/components/house/wardrobe-chapter";
import { HomeArchive } from "@/components/house/home-archive";
import { TheHouse } from "@/components/house/the-house";
import { ClosingCta } from "@/components/house/closing-cta";
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
 * Home sequence:
 * campaign hero → house signature → 1101 → Private Wardrobe → archive chapters → The House → enquire.
 */
export default function Home() {
  return (
    <div className="bg-[#f7f7f5] text-[#1c1a17]">
      <Mast />
      <EditorialHero />
      <HomeSignature />
      <Range1213 />
      <WardrobeChapter />
      <HomeArchive />
      <TheHouse />
      <ClosingCta />
      <ShopFooter />
    </div>
  );
}
