import Image from "next/image";
import Link from "next/link";
import { Pledge } from "@/components/house/pledge";
import { FOUNDER } from "@/lib/impact";

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
            alt={`${FOUNDER.name}, ${FOUNDER.role.toLowerCase()}, in low light`}
            width={1400}
            height={1875}
            className="h-auto w-full border border-[#1c1a17]/20"
          />
          <figcaption className="ms-caption mt-3 text-center text-[12px] tracking-[0.14em] text-[#1c1a17]/55 uppercase">
            {FOUNDER.name}
          </figcaption>
        </figure>
        <div>
          <p className="text-[11px] tracking-[0.28em] text-[#8d7349] uppercase">The House</p>
          <h2
            id="house-heading"
            className="mt-5 font-serif text-[#1c1a17]"
            style={{ fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Once sinner.
            <br />
            <em className="italic">Made Saint.</em>
          </h2>
          <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-[#41505b]">
            The line is {FOUNDER.name}&apos;s, for grace and a life changed. A purchase does not confer moral or spiritual standing. The house keeps a Christian name and welcomes a client of any belief.
          </p>
          <div className="mt-8">
            <Pledge />
          </div>
          <Link
            href="/brand"
            className="mt-10 inline-flex h-12 items-center border border-[#1c1a17]/30 px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]"
          >
            Read the house
          </Link>
        </div>
      </div>
    </section>
  );
}
