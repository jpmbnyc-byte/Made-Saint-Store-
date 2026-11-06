import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/business";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { HouseLooks } from "@/components/house/examples";
import { Paths } from "@/components/house/paths";
import { EditionSlider, LeatherSlider, ListRail } from "@/components/house/rails";
import { HouseFilm } from "@/components/house/film";
import { Fit, Questions, Tensions } from "@/components/house/terms";
import { OrderRule, orderWindowLine } from "@/components/shop/order-rule";

export const metadata: Metadata = {
  title: { absolute: "MADE SAiNT" },
  description:
    "A founding colorway is cut only after it is reserved. If the run is not confirmed, every reservation is refunded in full.",
  openGraph: {
    title: "MADE Saint",
    description: "Reserve a founding colorway. It is cut only if the run is confirmed.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MADE Saint" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const LEATHER = [
  { src: "/hero/leather-navy.webp", name: "Navy", alt: "Navy leather runner on plaster", frame: "object-center" },
  { src: "/opening/runner-black.webp", name: "Black", alt: "Full black all-leather runner" },
  { src: "/opening/runner-butter.webp", name: "Butter", alt: "Full butter all-leather runner" },
] as const;

export default function Home() {
  const launch = PRODUCTS.filter((p) => p.launch);
  const from = Math.min(...launch.map((p) => p.usd));

  return (
    <div className="bg-[#f2eee8] text-[#2a3746]">
      <Mast />

      <section id="order" className="ms-liquid scroll-mt-24">
        <div className="relative z-[1] mx-auto max-w-[1100px] px-5 py-12 md:px-8 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Made to order · Felgueiras</p>
              <h1 className="mt-4 max-w-3xl font-serif text-[42px] leading-[0.92] text-[#2a3746] md:text-[68px]">
                A pair is cut only after you reserve it.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#41505b]">{orderWindowLine()}</p>
            </div>
            <HouseFilm />
          </div>
          <div className="mt-10 md:mt-14">
            <OrderRule />
          </div>
        </div>
      </section>

      <Tensions />

      <section id="edition" className="scroll-mt-24 border-t border-[#41505b]/10">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">The founding edition</p>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#2a3746]">Three colorways. Slide to the pair.</h2>
          <div className="mt-10">
            <EditionSlider products={launch} />
          </div>
        </div>
      </section>

      <section id="ways" className="scroll-mt-24 border-t border-[#41505b]/10">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Three ways in</p>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95]">A pair, a look, or the year.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#41505b]">
            The same house, sized to what you want made. A seasonal or annual figure is a planning target. It is not added at checkout.
          </p>
          <div className="mt-8">
            <Paths from={from} />
          </div>
        </div>
      </section>

      <HouseLooks />

      <section id="leather" className="scroll-mt-24 border-t border-[#41505b]/10">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Shown, not reserved</p>
            <h2 className="mt-3 font-serif text-5xl">The leather runners</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#41505b]">
              Navy, black, and butter, each shown in full. These are not the founding colorways, and they are not open to reserve.
            </p>
          </div>
          <div className="mt-8">
            <LeatherSlider runners={LEATHER} />
          </div>
        </div>
      </section>

      <section className="border-t border-[#41505b]/10">
        <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">The list</p>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#2a3746]">Three more colorways. Not this run.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#41505b]">
            Espresso, Graphite, and Navy and Rust gather a note for the next run. They are not reserved with the founding edition.
          </p>
          <div className="mt-8">
            <ListRail />
          </div>
        </div>
      </section>

      <Fit />
      <Questions />

      <section className="border-t border-[#41505b]/10">
        <div className="mx-auto grid max-w-[1100px] md:grid-cols-2">
          <Link href="/line" className="block border-b border-[#41505b]/10 px-5 py-12 md:border-r md:border-b-0 md:px-8 md:py-16">
            <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Not a checkout</p>
            <h2 className="mt-3 font-serif text-4xl">The 2027 line</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#41505b]">
              Proposed styles and list prices. Nothing on the line can be reserved.
            </p>
          </Link>
          <Link href="/wardrobe" className="block px-5 py-12 md:px-8 md:py-16">
            <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Not a checkout</p>
            <h2 className="mt-3 font-serif text-4xl">The private wardrobe</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#41505b]">
              One fit, commissioned. A seasonal figure is a planning target until a price is approved.
            </p>
          </Link>
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
