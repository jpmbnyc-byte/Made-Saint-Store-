import type { Metadata } from "next";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { PrivateHouse } from "@/components/wardrobe/house";

export const metadata: Metadata = {
  title: "The Private Wardrobe",
  description: "Choose a starting set, adjust the pieces, and set a fit preference. A fitting is arranged with a person.",
};

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1a17]">
      <ShopHeader />
      <PrivateHouse />
      <ShopFooter />
    </div>
  );
}
