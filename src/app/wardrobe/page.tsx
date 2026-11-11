import type { Metadata } from "next";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { PrivateHouse } from "@/components/wardrobe/house";

export const metadata: Metadata = {
  title: "The Private Wardrobe",
  description:
    "A private commission path for MADE SAiNT clothes. Discover a starting set, compose the pieces, and send an introduction — not a shop cart. Seasonal and annual figures are planning targets.",
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
