import type { Metadata } from "next";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { PrivateHouse } from "@/components/wardrobe/house";

export const metadata: Metadata = {
  title: "The Private Wardrobe",
  description: "Three annual collections. One personal fit. The same MADE SAiNT silhouettes, developed to the client.",
};

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <PrivateHouse />
      <ShopFooter />
    </div>
  );
}
