import Image from "next/image";
import Link from "next/link";

export type CampaignChip = {
  href: string;
  label: string;
  price?: string;
};

/**
 * ISAIA-style campaign hero: photograph stays clean (no text baked into or
 * overlaid on the image). Brand line, headline, and CTAs sit below the frame.
 * Portrait Cast looks use object-top so mobile side-crops stay subject-centred.
 */
export function CampaignBanner({
  src,
  alt,
  kicker,
  title,
  body,
  chips,
  primary,
  secondary,
  priority = false,
  tall = false,
  compact = false,
  heading = "h2",
  id,
}: {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  body: string;
  chips: CampaignChip[];
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  priority?: boolean;
  tall?: boolean;
  /** Shorter image so headline and CTA fit the first desktop viewport. */
  compact?: boolean;
  heading?: "h1" | "h2";
  id?: string;
}) {
  const Heading = heading;
  const frameClass = compact
    ? "relative mx-auto aspect-[4/5] max-h-[min(58vh,640px)] w-full max-w-[1440px] overflow-hidden bg-[#efefed] md:aspect-[16/10] md:max-h-[min(62vh,680px)]"
    : tall
      ? "relative mx-auto aspect-[3/4] w-full max-w-[1440px] overflow-hidden bg-[#efefed] sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5]"
      : "relative mx-auto aspect-[4/5] w-full max-w-[1440px] overflow-hidden bg-[#efefed] md:aspect-[3/4]";

  return (
    <section
      id={id}
      className={compact ? "flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden bg-[#f7f7f5] text-[#1c1a17]" : "overflow-hidden bg-[#f7f7f5] text-[#1c1a17]"}
      aria-label={kicker}
    >
      <div className={frameClass}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover object-[center_top] ${priority ? "ms-hero-img-settle" : ""}`}
        />
      </div>
      <div className={`mx-auto max-w-[720px] px-5 text-center md:px-10 ${compact ? "py-5 md:py-6" : "py-8 md:py-12"}`}>
        <p className="ms-kicker ms-hero-text-rise flex items-center justify-center gap-3" style={{ animationDelay: "40ms" }}>
          <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
          {kicker}
          <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
        </p>
        <Heading
          className="ms-display ms-hero-text-rise mt-3 md:mt-4"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </Heading>
        {body ? (
          <p className="ms-lede ms-hero-text-rise mx-auto mt-3 max-w-xl md:mt-4" style={{ animationDelay: "280ms" }}>
            {body}
          </p>
        ) : null}
        {chips.length > 0 && (
          <ul className="ms-hero-text-rise mt-4 flex flex-wrap justify-center gap-2 md:mt-6" style={{ animationDelay: "360ms" }}>
            {chips.map((chip) => (
              <li key={chip.href + chip.label}>
                <Link
                  href={chip.href}
                  className="ms-meta inline-flex h-11 items-center gap-2 border border-[#1c1a17]/35 bg-transparent px-3 text-[#1c1a17] transition-colors hover:border-[#1c1a17]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236]"
                >
                  <span>{chip.label}</span>
                  {chip.price && <span className="text-[#1c1a17]/70">{chip.price}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="ms-hero-text-rise mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6" style={{ animationDelay: "440ms" }}>
          <Link
            href={primary.href}
            className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="ms-link h-12 px-3 text-[#1c1a17]/85 decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
