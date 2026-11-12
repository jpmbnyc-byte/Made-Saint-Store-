import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { EditorialHero } from "@/components/house/editorial-hero";
import { Range1213 } from "@/components/house/range-1213";
import { PairEnquiry } from "@/components/house/pair-enquiry";
import { WardrobeChapter } from "@/components/house/wardrobe-chapter";
import { HouseLooks } from "@/components/house/examples";
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

export default function Home() {
  return (
    <div className="bg-[#f5f0e8] text-[#1c1a17]">
      <Mast />

      {/* 01 — Campaign */}
      <EditorialHero />

      {/* 02 — 1101 and colourways */}
      <Range1213 />

      {/* 03 — Curated looks */}
      <HouseLooks />

      {/* 04 — Azores world: landscape → person → look → detail → maker → fitting */}
      <Campaign002 />

      {/* 05 — Pair enquiry */}
      <PairEnquiry />

      {/* 06 — Private Wardrobe */}
      <WardrobeChapter />

      {/* 07 — The House */}
      <TheHouse />

      {/* Closing choice */}
      <ClosingCta />

      <ShopFooter />
    </div>
  );
}
