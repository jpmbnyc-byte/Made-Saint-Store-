import Image from "next/image";
import Link from "next/link";
import { Pledge } from "@/components/house/pledge";
import { FOUNDER } from "@/lib/impact";
import { copy } from "@/lib/copy";

export function TheHouse() {
  return (
    <section
      id="the-house"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f2eee8]"
      aria-labelledby="house-heading"
    >
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-5 py-16 md:grid-cols-[340px_minmax(0,1fr)] md:gap-14 md:px-8 md:py-24">
        <figure className="mx-auto w-full max-w-[340px]">
          <Image
            src="/house/founder.webp"
            alt={`${FOUNDER.name}, ${FOUNDER.role.toLowerCase()}, in the acid-wash tee`}
            width={1792}
            height={2400}
            className="h-auto w-full border border-[#1c1a17]/20"
          />
          <figcaption className="ms-caption mt-3 text-center text-[12px] tracking-[0.14em] text-[#1c1a17]/55 uppercase">
            {FOUNDER.name}
          </figcaption>
        </figure>
        <div>
          <p className="ms-kicker">The House</p>
          <h2 id="house-heading" className="ms-display mt-5">
            {copy.house.heading}
          </h2>
          <p className="ms-lede mt-7 max-w-lg">{copy.house.founder}</p>
          <p className="ms-lede mt-4 max-w-lg">{copy.house.collection}</p>
          <div className="mt-8">
            <Pledge />
          </div>
          <Link
            href="/brand"
            className="ms-cta mt-10 border border-[#1c1a17]/30 text-[#1c1a17] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]"
          >
            Read the house
          </Link>
        </div>
      </div>
    </section>
  );
}
