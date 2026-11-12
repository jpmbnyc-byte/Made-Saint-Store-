import Image from "next/image";
import Link from "next/link";
import {
  AZORES_DETAIL,
  AZORES_LOOKS,
  CAMPAIGN_002,
  WORKSHOP_CHAPTER,
  campaign002Ready,
  workshopChapterReady,
} from "@/lib/geography";

/**
 * Campaign 002 — fashion first.
 * Location references sit behind looks as atmosphere, never as travel frames.
 */
export function Campaign002() {
  if (!campaign002Ready()) return null;

  return (
    <section
      id="campaign-002"
      className="border-t border-[#1c1a17]/10 bg-[#f3eee6] text-[#1c1a17]"
      aria-labelledby="campaign-002-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">{CAMPAIGN_002.eyebrow}</p>
        <h2 id="campaign-002-heading" className="ms-display mt-3 max-w-3xl">
          {CAMPAIGN_002.title}
        </h2>
        <p className="ms-meta mt-4 text-[#1c1a17]/55">{CAMPAIGN_002.locationLabel}</p>
        <p className="ms-lede mt-5 max-w-xl">{CAMPAIGN_002.body}</p>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {AZORES_LOOKS.map((plate) => (
            <li key={plate.id}>
              <Link href={plate.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]">
                <span className="relative block aspect-[3/4] overflow-hidden bg-[#e7e1d6]">
                  {plate.settingSrc && (
                    <Image
                      src={plate.settingSrc}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-35 scale-110 transition-transform duration-700 group-hover:scale-115"
                      aria-hidden
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/35 via-transparent to-[#1c1a17]/10" aria-hidden />
                  <span className="absolute inset-0 flex items-end justify-center p-3 md:p-4">
                    <span className="relative h-[88%] w-[78%]">
                      <Image
                        src={plate.lookSrc}
                        alt={plate.lookAlt}
                        fill
                        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 80vw"
                        className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(28,26,23,0.35)] transition-transform duration-500 group-hover:translate-y-[-2%]"
                      />
                    </span>
                  </span>
                </span>
                <span className="mt-4 block font-serif text-2xl">{plate.lookName}</span>
                <span className="mt-1 block text-[14px] leading-snug text-[#1c1a17]/65">{plate.pieces}</span>
                {plate.settingCredit && (
                  <span className="mt-2 block text-[10px] tracking-[0.08em] text-[#1c1a17]/35 uppercase">
                    {plate.settingCredit}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid items-center gap-8 border-t border-[#1c1a17]/10 pt-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Link href={AZORES_DETAIL.href} className="relative aspect-square max-w-md overflow-hidden bg-[#e7e1d6]">
            <Image
              src={AZORES_DETAIL.src}
              alt={AZORES_DETAIL.alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-contain p-6"
            />
          </Link>
          <div>
            <p className="ms-kicker">Product detail</p>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">{AZORES_DETAIL.title}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#1c1a17]/70">
              After the look — the pair, clear and accurate. Enquire to confirm availability, price and delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop#1101" className="ms-cta bg-[#1c1a17] text-[#f5f0e8]">
                Enquire about 1101
              </Link>
              <Link href="/wardrobe#introduction" className="ms-cta border border-[#1c1a17]/30">
                Plan your wardrobe
              </Link>
            </div>
            {!workshopChapterReady() && (
              <p className="mt-6 max-w-md text-[12px] leading-relaxed text-[#1c1a17]/40">
                Making: {WORKSHOP_CHAPTER.title} Partnership pending — separate from this campaign.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
