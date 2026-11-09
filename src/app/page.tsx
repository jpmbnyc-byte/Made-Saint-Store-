import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { EditorialHero } from "@/components/house/editorial-hero";
import { RunnerChapter } from "@/components/house/runner-chapter";
import { Range1213 } from "@/components/house/range-1213";
import { WardrobeChapter } from "@/components/house/wardrobe-chapter";
import { CastEditorial } from "@/components/house/cast-editorial";
import { HouseLooks } from "@/components/house/examples";
import { MaterialStudy } from "@/components/house/material-study";
import { TheHouse } from "@/components/house/the-house";
import { ClosingCta } from "@/components/house/closing-cta";
import { OrderRule } from "@/components/shop/order-rule";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description: "Once sinner. Made Saint. The 1101, 1213, and 0929 runners, and a private wardrobe, made to order.",
  openGraph: {
    title: "MADE SAiNT",
    description: "Once sinner. Made Saint. The 1101, 1213, and 0929 runners, and a private wardrobe.",
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

      {/* 01 — Collection hero (1101 + Private Wardrobe) */}
      <EditorialHero />

      {/* 02 — 1101 leads, then the seven 1213 colorways */}
      <Range1213 />

      {/* 03 — 0929 runner */}
      <RunnerChapter />

      {/* Reservation rule — inline, brief */}
      <section className="border-t border-[#1c1a17]/10 bg-[#f5f0e8]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
          <p className="mb-5 text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">
            Founding runners · how a pair is made
          </p>
          <OrderRule />
        </div>
      </section>

      {/* 03 — Private Wardrobe: in-the-moment editorial */}
      <WardrobeChapter />

      {/* 04 — Campaign 001 cast: cinematic editorial */}
      <CastEditorial />

      {/* 05 — Styled looks (collection grid equivalent) */}
      <HouseLooks />

      {/* Material in close-up */}
      <MaterialStudy />

      {/* 06 — The House / brand statement */}
      <TheHouse />

      {/* Closing choice */}
      <ClosingCta />

      <ShopFooter />
    </div>
  );
}
