import type { Metadata } from "next";
import Link from "next/link";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { PrivateHouse } from "@/components/wardrobe/house";
import { frameSrc } from "@/lib/line";

export const metadata: Metadata = {
  title: "The Private Wardrobe",
  description: "Three annual collections. One personal fit. The same MADE SAiNT silhouettes, developed to the client.",
};

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <section className="mx-auto grid max-w-[1320px] gap-6 px-5 py-10 md:grid-cols-[0.7fr_1.3fr] md:px-8">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/55 uppercase">Photographs</p>
          <h2 className="mt-2 font-serif text-4xl">The sheets behind the commission.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/70">
            Caps, the denim-trim duffel, the suede mule, and the course suits are in the 2027 line. Proposed prices live there. A commission still uses this page.
          </p>
          <Link href="/line" className="mt-5 inline-block text-[11px] tracking-[0.16em] uppercase underline underline-offset-4">
            Open the line
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            [23, "Butter yellow denim-trim duffel"],
            [33, "Grouped-stripe suit on a course"],
            [16, "Brown suede lace mule"],
          ].map(([n, alt]) => (
            <img key={n} src={frameSrc(Number(n))} alt={String(alt)} className="aspect-[3/4] w-full bg-[#f1eee8] object-contain" />
          ))}
        </div>
      </section>
      <PrivateHouse />
      <ShopFooter />
    </div>
  );
}
