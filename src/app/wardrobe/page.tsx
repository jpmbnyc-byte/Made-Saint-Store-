import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { PrivateHouse } from "@/components/wardrobe/house";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: { absolute: copy.seo.wardrobe.title },
  description: copy.seo.wardrobe.description,
};

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <Mast />
      <PrivateHouse />
      <ShopFooter />
    </div>
  );
}
