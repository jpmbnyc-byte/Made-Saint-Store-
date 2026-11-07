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
    "Personal wardrobes for professional athletes. The founding runners are a separate reservation.",
  openGraph: {
    title: "MADE Saint",
    description: "A personal wardrobe, and a founding runner reserved on its own.",
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

      <section id="wardrobe" className="scroll-mt-24 border-b border-[#41505b]/10">
        <div className="mx-auto grid max-w-[1100px] items-end gap-10 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-20">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Private wardrobe</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[42px] leading-[0.92] text-[#2a3746] md:text-[64px]">
              Personal wardrobes for professional athletes.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#41505b]">
              Fewer clothing decisions, one fit, and one person for travel, a public day, time off, and a formal hour. The conversation can be virtual. A fitting is physical, and it is arranged.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/wardrobe#introduction" className="inline-flex h-12 items-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">
                Request a private introduction
              </Link>
              <a href="#order" className="inline-flex h-12 items-center border border-[#1c1a17]/25 px-5 text-[11px] tracking-[0.16em] uppercase">
                Founding runners
              </a>
            </div>
          </div>
          <ul className="space-y-3 text-[15px] leading-relaxed text-[#41505b]">
            {[
              ["Arrival", "The hour before the room."],
              ["Off-duty", "An ordinary day, with nothing scheduled."],
              ["Occasion", "When the day asks for a suit."],
            ].map(([name, line]) => (
              <li key={name} className="border-t border-[#c0a477]/50 pt-3">
                <span className="block font-serif text-3xl text-[#2a3746]">{name}</span>
                <span className="mt-1 block">{line} One wardrobe, not a separate launch.</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="order" className="ms-liquid scroll-mt-24">
        <div className="relative z-[1] mx-auto max-w-[1100px] px-5 py-12 md:px-8 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Founding runners · a separate reservation</p>
              <h2 className="mt-4 max-w-3xl font-serif text-[42px] leading-[0.92] text-[#2a3746] md:text-[60px]">
                A pair is cut only after you reserve it.
              </h2>
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
            <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">For an athlete</p>
            <h2 className="mt-3 font-serif text-4xl">The private wardrobe</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#41505b]">
              A private introduction. A fitting is arranged. A seasonal figure is a planning target, not a checkout price.
            </p>
          </Link>
        </div>
      </section>

      <ShopFooter />
    </div>
  );
}
