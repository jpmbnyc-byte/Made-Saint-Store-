import Image from "next/image";
import Link from "next/link";
import { AZORES_LOOKS, CAMPAIGN_002, campaign002Ready } from "@/lib/geography";

/**
 * Clothing presentation in the ISAIA collection register:
 * full look fills the frame on a light ground; name and pieces below.
 * No composite plates, no location tourism tiles.
 */
export function Campaign002() {
  if (!campaign002Ready()) return null;

  return (
    <section
      id="campaign-002"
      className="border-t border-[#1c1a17]/10 bg-[#f7f7f5] text-[#1c1a17]"
      aria-labelledby="campaign-002-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="ms-kicker">{CAMPAIGN_002.eyebrow}</p>
          <h2 id="campaign-002-heading" className="ms-display mt-3">
            {CAMPAIGN_002.title}
          </h2>
          <p className="mt-3 text-[13px] tracking-[0.12em] text-[#1c1a17]/50 uppercase">
            {CAMPAIGN_002.locationLabel}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-5 md:gap-y-14 lg:grid-cols-4">
          {AZORES_LOOKS.map((look) => (
            <li key={look.id}>
              <Link
                href={look.href}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
              >
                <span className="relative block aspect-[3/4] overflow-hidden bg-[#efefed]">
                  <Image
                    src={look.lookSrc}
                    alt={look.lookAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="mt-3 block text-[13px] leading-snug tracking-[0.02em]">
                  {look.lookName} — {look.pieces}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/line/lookbook" className="ms-cta border border-[#1c1a17]/30">
            View the lookbook
          </Link>
          <Link href="/shop#1101" className="ms-cta bg-[#1c1a17] text-[#f5f0e8]">
            Explore 1101
          </Link>
        </div>
      </div>
    </section>
  );
}
