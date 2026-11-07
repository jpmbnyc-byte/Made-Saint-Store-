import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/business";
import { ShopFooter } from "@/components/shop/chrome";
import { Mast } from "@/components/house/mast";
import { HouseLooks } from "@/components/house/examples";
import { Chapters } from "@/components/house/chapters";
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

  return (
    <div className="bg-[#f2eee8] text-[#2a3746]">
      <Mast />

      <section id="wardrobe" className="scroll-mt-24 border-b border-[#1c1a17]/10 bg-[#f6f1ea]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-10 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:gap-12 md:px-8 md:py-16">
          <div>
            <p className="text-sm text-[#B03236]">Private wardrobe</p>
            <h1 className="ms-rise mt-3 max-w-xl font-serif text-[44px] leading-[0.96] text-[#1c1a17] md:text-[68px]">
              Personal wardrobes for professional athletes.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#3c4650]">
              One fit, and one person, for travel, a public day, time off, and a formal hour. The conversation can be virtual. A fitting is physical, and it is arranged.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#arrival" className="inline-flex h-12 items-center bg-[#1c1a17] px-5 text-sm text-[#f6f4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]">
                Explore the wardrobe
              </a>
              <Link href="/wardrobe#introduction" className="inline-flex h-12 items-center border border-[#1c1a17]/30 px-5 text-sm text-[#1c1a17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]">
                Request a private introduction
              </Link>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[2/3] bg-[#ebe4d8]">
              <Image src="/line/f24.webp" alt="Full-length denim jacket with a Saint Gabriel study, khaki trouser, and a pale blue hiker" fill priority sizes="(min-width: 768px) 48vw, 100vw" className="ms-photo object-cover object-top" />
            </div>
            <figcaption className="ms-caption text-[#3c4650]">A lifestyle photograph. Not a client, and not an endorsement. The shoe is not a founding runner.</figcaption>
          </figure>
        </div>
      </section>

      <Chapters />

      <section id="service" className="scroll-mt-24 border-t border-[#f6f4ef]/10 bg-[#1c1a17] text-[#f6f4ef]">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
          <div>
            <p className="text-sm text-[#e7c3c4]">Private wardrobe</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.02] md:text-6xl">Once sinner. Made Saint.</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#f6f4ef]/80">
              The line is the founder&apos;s, for grace and a life changed. A purchase does not confer moral or spiritual standing. The house keeps a Christian name and welcomes a client of any belief.
            </p>
            <Link href="/wardrobe#introduction" className="mt-8 inline-flex h-12 items-center bg-[#f6f4ef] px-5 text-sm text-[#1c1a17]">
              Request a private introduction
            </Link>
          </div>
          <ol className="space-y-4">
            {[
              ["Conversation", "By video or phone."],
              ["Fitting", "Physical, and only when one is arranged."],
              ["Approval", "Looks, cloth, prices, and dates, before anything is cut."],
              ["Making", "A named person writes when a date moves."],
              ["Delivery and care", "A fit review after the clothes have been worn."],
            ].map(([title, line], index) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-4 border-t border-[#f6f4ef]/15 pt-4">
                <span className="font-serif text-2xl text-[#e7c3c4] italic">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-2xl">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#f6f4ef]/70">{line}</span>
                </span>
              </li>
            ))}
          </ol>
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
            <p className="text-sm text-[#8d7349]">2027 line</p>
            <h2 className="mt-3 font-serif text-4xl">Styles with a photograph.</h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#41505b]">
              Proposed list prices. A style without a large photograph stays on the record and off this grid.
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
