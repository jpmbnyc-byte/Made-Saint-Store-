import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { EditorialHero } from "@/components/house/editorial-hero";
import { PlaceChapter } from "@/components/house/place-chapter";
import { PeopleChapter } from "@/components/house/people-chapter";
import { CourtyardChapter } from "@/components/house/courtyard-chapter";
import { RunnerChapter } from "@/components/house/runner-chapter";
import { Range1213 } from "@/components/house/range-1213";
import { WardrobeChapter } from "@/components/house/wardrobe-chapter";
import { HouseLooks } from "@/components/house/examples";
import { MaterialStudy } from "@/components/house/material-study";
import { TheHouse } from "@/components/house/the-house";
import { ClosingCta } from "@/components/house/closing-cta";
import { OrderRule } from "@/components/shop/order-rule";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description: "Once sinner. Made Saint. The house is set in Cap-Haïtien and the north of Haiti. The 1101 leads.",
  openGraph: {
    title: "MADE SAiNT",
    description: "Once sinner. Made Saint. The house is set in Cap-Haïtien and the north of Haiti.",
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

      {/* 02 — The place */}
      <PlaceChapter />

      {/* 03 — 1101 leads, then the seven 1213 colorways */}
      <Range1213 />

      {/* 04 — The people */}
      <PeopleChapter />

      {/* 04b — Courtyard arcade looks */}
      <CourtyardChapter />

      {/* 05 — 0929 runner, the only series with a confirmed make time */}
      <RunnerChapter />

      <section className="border-t border-[#1c1a17]/10 bg-[#f5f0e8]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
          <p className="ms-kicker mb-5">
            The 0929 · how a pair is made
          </p>
          <OrderRule />
        </div>
      </section>

      {/* 04 — Private Wardrobe */}
      <WardrobeChapter />

      {/* 05 — Styled looks */}
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
