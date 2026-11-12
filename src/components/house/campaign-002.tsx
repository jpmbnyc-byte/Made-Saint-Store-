import Image from "next/image";
import Link from "next/link";
import {
  AZORES_SEQUENCE,
  CAMPAIGN_002,
  WORKSHOP_CHAPTER,
  campaign002Ready,
  workshopChapterReady,
} from "@/lib/geography";

/**
 * Campaign 002 — São Roque, São Miguel, Azores.
 * Sequence: landscape → person → look → detail → maker → fitting invitation.
 */
export function Campaign002() {
  if (!campaign002Ready()) return null;

  const frames = AZORES_SEQUENCE.filter((frame) => frame.kind !== "invite");

  return (
    <section
      id="campaign-002"
      className="border-t border-[#1c1a17]/10 bg-[#102033] text-[#f5f0e8]"
      aria-labelledby="campaign-002-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker text-[#c0a477]">{CAMPAIGN_002.eyebrow}</p>
        <h2 id="campaign-002-heading" className="ms-display mt-3 max-w-3xl text-[#f5f0e8]">
          {CAMPAIGN_002.title}
        </h2>
        <p className="ms-meta mt-4 text-[#f5f0e8]/70">{CAMPAIGN_002.locationLabel}</p>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#f5f0e8]/55">
          {CAMPAIGN_002.placeDetail}
        </p>
        <p className="ms-lede mt-5 max-w-2xl text-[#f5f0e8]/80">{CAMPAIGN_002.body}</p>
        <p className="mt-4 max-w-2xl text-[13px] tracking-[0.04em] text-[#c0a477]/90">
          {CAMPAIGN_002.sequenceLine}
        </p>

        <ol className="mt-12 grid gap-10">
          {frames.map((frame, index) => {
            const media = (
              <span
                className={`relative block overflow-hidden bg-[#1a2a3d] ${
                  frame.constrained
                    ? "aspect-square max-w-[280px]"
                    : frame.wide
                      ? "aspect-[21/9]"
                      : "aspect-[4/5] max-w-xl"
                }`}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes={
                    frame.constrained
                      ? "280px"
                      : frame.wide
                        ? "(min-width: 768px) 1200px, 100vw"
                        : "(min-width: 768px) 36vw, 90vw"
                  }
                  className="object-cover"
                />
              </span>
            );

            return (
              <li key={frame.id} className="grid gap-4 border-t border-[#f5f0e8]/10 pt-8 md:grid-cols-[auto_1fr] md:gap-8">
                <span className="font-serif text-2xl italic text-[#c0a477]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  {frame.href ? (
                    <Link href={frame.href} className="block transition-opacity hover:opacity-90">
                      {media}
                    </Link>
                  ) : (
                    media
                  )}
                  <p className="ms-meta mt-3 text-[#f5f0e8]/55">{frame.title}</p>
                  <p className="mt-1 text-[13px] text-[#f5f0e8]/70">{frame.locationLabel}</p>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#f5f0e8]/75">{frame.caption}</p>
                  {frame.credit && (
                    <p className="mt-2 text-[11px] tracking-[0.08em] text-[#f5f0e8]/40 uppercase">{frame.credit}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div
          id="fitting-invitation"
          className="mt-14 grid gap-6 border-t border-[#f5f0e8]/15 pt-10 md:grid-cols-[1.2fr_0.8fr] md:items-end"
        >
          <div>
            <p className="ms-kicker text-[#c0a477]">Fitting invitation</p>
            <h3 className="mt-3 font-serif text-3xl text-[#f5f0e8] md:text-4xl">
              Wear it in this world.
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#f5f0e8]/70">
              Start with a pair or a look. Tell us where you will wear it. We confirm availability, price and delivery before you order.
            </p>
            {!workshopChapterReady() && (
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-[#f5f0e8]/45">
                {WORKSHOP_CHAPTER.title} {WORKSHOP_CHAPTER.body}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/shop#1101"
              className="ms-cta bg-[#f5f0e8] text-[#102033] transition-opacity hover:opacity-90"
            >
              Enquire about 1101
            </Link>
            <Link
              href="/wardrobe#introduction"
              className="ms-cta border border-[#f5f0e8]/35 text-[#f5f0e8] transition-opacity hover:opacity-85"
            >
              Plan your wardrobe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
