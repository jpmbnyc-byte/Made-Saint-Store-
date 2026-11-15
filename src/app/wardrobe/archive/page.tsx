import type { Metadata } from "next";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { ArchiveGrid } from "@/components/wardrobe/archive-grid";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Archive chapters",
  description: copy.seo.wardrobe.description,
};

export default function ArchiveIndexPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <ShopHeader />
      <main>
        <div className="mx-auto max-w-[1200px] px-5 pt-10 md:px-8 md:pt-14">
          <p className="ms-kicker">Private Wardrobe</p>
          <h1 className="ms-display mt-4">Twelve archive chapters.</h1>
          <p className="ms-lede mt-4 max-w-2xl">
            Begin with a look you recognize. Each chapter holds a primary silhouette and alternate views from the archive.
          </p>
        </div>
        <ArchiveGrid />
      </main>
      <ShopFooter />
    </div>
  );
}
