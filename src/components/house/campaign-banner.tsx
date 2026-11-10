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
            ? "relative min-h-[78vh] w-full overflow-hidden md:min-h-0 md:aspect-[21/9]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/85 via-[#1c1a17]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 pt-28 md:px-10 md:pb-10 lg:px-14 lg:pb-12">
          <p className="ms-hero-text-rise flex items-center gap-3 text-[11px] tracking-[0.28em] text-[#f5f0e8]/80 uppercase" style={{ animationDelay: "40ms" }}>
            <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
            {kicker}
          </p>
          <Heading
            className="ms-hero-text-rise mt-4 max-w-3xl font-serif leading-[0.92] tracking-[-0.045em] text-[#f5f0e8]"
            style={{ fontSize: "clamp(36px, 4.6vw, 76px)", animationDelay: "120ms" }}
          >
            {title}
          </Heading>
          <p className="ms-hero-text-rise mt-4 max-w-xl text-[15px] leading-relaxed text-[#f5f0e8]/80 md:text-[16px]" style={{ animationDelay: "280ms" }}>
            {body}
          </p>
          {chips.length > 0 && (
            <ul className="ms-hero-text-rise mt-6 flex flex-wrap gap-2" style={{ animationDelay: "360ms" }}>
              {chips.map((chip) => (
                <li key={chip.href + chip.label}>
                  <Link
                    href={chip.href}
                    className="inline-flex h-11 items-center gap-2 border border-[#f5f0e8]/25 bg-[#1c1a17]/35 px-3 text-[11px] tracking-[0.14em] text-[#f5f0e8] uppercase backdrop-blur-sm transition-colors hover:border-[#f5f0e8]/60 hover:bg-[#1c1a17]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236]"
                  >
                    <span>{chip.label}</span>
                    {chip.price && <span className="text-[#f5f0e8]/70">{chip.price}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="ms-hero-text-rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "440ms" }}>
            <Link
              href={primary.href}
              className="inline-flex h-12 items-center bg-[#f5f0e8] px-6 text-[12px] tracking-[0.16em] text-[#1c1a17] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex h-12 items-center px-3 text-[12px] tracking-[0.14em] text-[#f5f0e8]/80 uppercase underline decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
