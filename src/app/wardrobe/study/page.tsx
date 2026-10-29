import type { Metadata } from "next";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { WardrobeCatalog } from "@/components/wardrobe/catalog";
import { Foundation } from "@/components/wardrobe/foundation";

export const metadata: Metadata = {
  title: "Private wardrobe study",
  robots: { index: false, follow: false },
};

export default function WardrobeStudyPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef]">
      <ShopHeader />
      <Foundation />
      <WardrobeCatalog />
      <ShopFooter />
    </div>
  );
}
