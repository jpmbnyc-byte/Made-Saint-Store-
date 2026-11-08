import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { EditorialHero } from "@/components/house/editorial-hero";
import { RunnerChapter } from "@/components/house/runner-chapter";
import { WardrobeChapter } from "@/components/house/wardrobe-chapter";
import { HouseLooks } from "@/components/house/examples";
import { MaterialStudy } from "@/components/house/material-study";
import { TheHouse } from "@/components/house/the-house";
import { ClosingCta } from "@/components/house/closing-cta";
import { OrderRule } from "@/components/shop/order-rule";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description:
    "1101 — the inaugural runner. Made to order in Felgueiras. Private Wardrobe for a considered life.",
  openGraph: {
    title: "MADE SAiNT",
    description: "1101. A life becoming. The inaugural runner and a private wardrobe, from MADE SAiNT.",
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

      {/* A — Editorial hero slideshow */}
      <EditorialHero />

      {/* B — 1101 product chapter */}
      <RunnerChapter />

      {/* B.5 — Reservation rule (brief inline) */}
      <section className="border-t border-[#1c1a17]/10 bg-[#f5f0e8]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
          <p className="mb-5 text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">
            Founding runners · how a pair is made
          </p>
          <OrderRule />
        </div>
      </section>

      {/* C — Private Wardrobe chapter */}
      <WardrobeChapter />

      {/* D — Styled worlds (looks) */}
      <HouseLooks />

      {/* E — Material in close-up */}
      <MaterialStudy />

      {/* F — The House */}
      <TheHouse />

      {/* G — Closing choice */}
      <ClosingCta />

      <ShopFooter />
    </div>
  );
}
