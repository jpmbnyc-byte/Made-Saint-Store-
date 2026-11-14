import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/copy";

/**
 * Home hero: 1101 runner feature plate — full-bleed link to footwear.
 * Art-directed assets for mobile portrait and desktop landscape.
 * Baked-in plate type carries the product line; HTML supplies brand CTAs.
 */
export function EditorialHero() {
  return (
    <section
      className="overflow-hidden bg-[#d6d9e0] text-[#1c1a17]"
      aria-label={copy.home.hero.eyebrow}
    >
      <h1 className="sr-only">
        {copy.home.hero.heading} {copy.home.runner.heading}
      </h1>

      <Link
        href="/shop#1101"
        className="group relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
        aria-label={`${copy.home.hero.primaryAction} — The 1101 runner`}
      >
        {/* Mobile / tablet portrait plate */}
        <span className="relative block aspect-[9/16] w-full md:hidden">
          <Image
            src="/hero/1101-runner-hero-mobile-2x.webp"
            alt="MADE SAiNT 1101 runner in motion — a study in form, made for movement"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center transition duration-500 group-hover:scale-[1.01]"
          />
        </span>

        {/* Desktop landscape plate with matched ground */}
        <span className="relative hidden aspect-[16/9] w-full md:block md:max-h-[min(78vh,900px)]">
          <Image
            src="/hero/1101-runner-hero-desktop.webp"
            alt="MADE SAiNT 1101 runner in motion — a study in form, made for movement"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center transition duration-500 group-hover:scale-[1.01]"
          />
        </span>
      </Link>

      <div className="mx-auto max-w-[720px] bg-[#f7f7f5] px-5 py-6 text-center md:px-10 md:py-8">
        <p className="ms-kicker ms-hero-text-rise flex items-center justify-center gap-3" style={{ animationDelay: "40ms" }}>
          <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
          {copy.home.hero.eyebrow}
          <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
        </p>
        <p className="ms-display ms-hero-text-rise mt-3 md:mt-4" style={{ animationDelay: "120ms" }}>
          {copy.home.hero.heading}
        </p>
        <div
          className="ms-hero-text-rise mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6"
          style={{ animationDelay: "280ms" }}
        >
          <Link
            href="/shop#1101"
            className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
          >
            {copy.home.hero.primaryAction}
          </Link>
          <Link
            href="/line"
            className="inline-flex h-12 items-center border-b border-[#1c1a17] px-1 text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
          >
            {copy.home.hero.secondaryAction}
          </Link>
        </div>
      </div>
    </section>
  );
}
