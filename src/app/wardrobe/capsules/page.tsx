import type { Metadata } from "next";
import { Mast } from "@/components/house/mast";
import { ShopFooter } from "@/components/shop/chrome";
import { CapsuleGrid } from "@/components/wardrobe/capsule-grid";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Capsules — Private Wardrobe",
  description: copy.wardrobe.capsulesIntro,
};

export default function CapsulesPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <Mast />
      <CapsuleGrid />
      <ShopFooter />
    </div>
  );
}
