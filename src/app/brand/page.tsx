import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Mast } from "@/components/house/mast";
import { ShopFooter } from "@/components/shop/chrome";
import { Pledge } from "@/components/house/pledge";
import { offerLine } from "@/lib/business";

export const metadata: Metadata = {
  title: "The House",
  description: "Once sinner. Made Saint. The house is set in Cap-Haïtien and the north of Haiti.",
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#f4f0e7] text-[#1c1a17]">
      <Mast />
      <main>
        <section className="mx-auto max-w-[820px] px-5 py-16 md:px-8 md:py-24">
          <p className="text-[11px] tracking-[0.28em] text-[#8d7349] uppercase">The House</p>
          <h1 className="mt-5 font-serif text-[#1c1a17]" style={{ fontSize: "clamp(44px, 6vw, 80px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
            Once sinner.
            <br />
            <em className="italic">Made Saint.</em>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed">
            The line is the founder’s, for grace and a life changed. A purchase does not confer moral or spiritual standing. The house keeps a Christian name and welcomes a client of any belief.
          </p>
        </section>

        <section className="border-t border-[#1c1a17]/10">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-[280px_minmax(0,1fr)] md:px-8 md:py-20">
            <div className="bg-[#f4f0e7] p-6">
              <Image src="/brand/wordmark.png" alt="MADE Saint" width={1864} height={462} className="h-auto w-full" />
            </div>
            <div className="max-w-xl space-y-5 text-[16px] leading-relaxed text-[#1c1a17]/80">
              <h2 className="font-serif text-4xl text-[#1c1a17]">The place</h2>
              <p>
                The house is set in Cap-Haïtien and the north of Haiti. The city, the shore at Cormier, and Milot are the places it returns to. Milot is neighboring historic ground. It is not the city, and it is not a house the brand owns. No property has been chosen.
              </p>
              <p>
                The photographs are the collection, worn by the cast, or the product itself. They are not pictures of the city, the shore at Cormier, or Milot, and they are not photographs of the cathedral, a palace, or the Citadelle.
              </p>
              <h2 className="pt-4 font-serif text-4xl text-[#1c1a17]">The people</h2>
              <p>
                Amara, Solène, Inès, Lucien, Ren, and Malik wear the collection. A shoppable look lists only the pieces already mapped to that photograph. A season look that is not priced stays a look.
              </p>
              <h2 className="pt-4 font-serif text-4xl text-[#1c1a17]">The pairs</h2>
              <p>
                The 1101 leads, at $550. The 1213 is the sculpted-sole runner, also $550, in seven colorways. The 0929 is the studded-sole runner, at $490. Every colorway is live. {offerLine("1101")}
              </p>
              <p>
                Brush suede with a soft crepe or nylon brush after wear. Treat it once before the first wear. Store a pair in the dust bag, away from direct sun.
              </p>
              <div className="pt-6">
                <Pledge />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1c1a17]/10">
          <div className="mx-auto flex max-w-[1100px] flex-wrap gap-3 px-5 py-14 md:px-8">
            <Link href="/shop#1101" className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.16em] text-[#f5f0e8] uppercase">
              Explore 1101
            </Link>
            <Link href="/wardrobe" className="inline-flex h-12 items-center border border-[#1c1a17]/30 px-6 text-[12px] tracking-[0.16em] uppercase">
              Private Wardrobe
            </Link>
          </div>
        </section>
      </main>
      <ShopFooter />
    </div>
  );
}
