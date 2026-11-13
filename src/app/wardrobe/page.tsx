import type { Metadata } from "next";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { PrivateHouse } from "@/components/wardrobe/house";

export const metadata: Metadata = {
  title: "The Private Wardrobe",
  description:
    "A private commission path for MADE SAiNT clothes. Start with one look or a small capsule, compose the pieces, and send an introduction with settings and dates — not a shop cart.",
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
