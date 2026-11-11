import Image from "next/image";
import Link from "next/link";

export type CampaignChip = {
  href: string;
  label: string;
  price?: string;
};

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
  heading?: "h1" | "h2";
  id?: string;
}) {
  const Heading = heading;
  return (
    <section id={id} className="relative overflow-hidden bg-[#1c1a17]" aria-label={kicker}>
      <div
        className={
          tall
            ? "relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[21/9]"
            : "relative aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]"
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover object-[center_38%] ${priority ? "ms-hero-img-settle" : ""}`}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[#1c1a17]/85 via-[#1c1a17]/20 to-transparent md:block" />
      </div>
      <div className="ms-on-dark px-5 py-8 md:absolute md:inset-x-0 md:bottom-0 md:px-10 md:pb-10 md:pt-28 lg:px-14 lg:pb-12">
        <p className="ms-kicker ms-hero-text-rise flex items-center gap-3" style={{ animationDelay: "40ms" }}>
          <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
          {kicker}
        </p>
        <Heading
          className="ms-display ms-hero-text-rise mt-3 max-w-3xl md:mt-4"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </Heading>
        <p className="ms-lede ms-hero-text-rise mt-3 max-w-xl md:mt-4" style={{ animationDelay: "280ms" }}>
          {body}
        </p>
        {chips.length > 0 && (
          <ul className="ms-hero-text-rise mt-4 flex flex-wrap gap-2 md:mt-6" style={{ animationDelay: "360ms" }}>
            {chips.map((chip) => (
              <li key={chip.href + chip.label}>
                <Link
                  href={chip.href}
                  className="ms-meta inline-flex h-11 items-center gap-2 border border-[#f5f0e8]/25 bg-[#1c1a17]/35 px-3 text-[#f5f0e8] backdrop-blur-sm transition-colors hover:border-[#f5f0e8]/60 hover:bg-[#1c1a17]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236]"
                >
                  <span>{chip.label}</span>
                  {chip.price && <span className="text-[#f5f0e8]/70">{chip.price}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="ms-hero-text-rise mt-5 flex flex-wrap items-center gap-3 md:mt-6" style={{ animationDelay: "440ms" }}>
          <Link
            href={primary.href}
            className="ms-cta bg-[#f5f0e8] text-[#1c1a17] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="ms-link h-12 px-3 text-[#f5f0e8]/80 decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
