import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/copy";

export function WardrobeIntro() {
  const { eyebrow, heading, intro, primaryAction, steps } = copy.wardrobe;

  return (
    <section
      className="relative overflow-hidden bg-[#1a2232] text-[#f5f0e8]"
      aria-labelledby="wardrobe-intro-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/brand/grain.svg')",
          backgroundSize: "180px 180px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-end md:gap-14 md:px-8 md:py-20">
        <div className="ms-on-dark">
          <p className="ms-kicker text-[#c0a477]">{eyebrow}</p>
          <h1 id="wardrobe-intro-heading" className="ms-display mt-4">
            {heading}
          </h1>
          <p className="ms-lede mt-5 max-w-xl">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#introduction"
              className="inline-flex h-12 items-center bg-[#f5f0e8] px-5 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
            >
              {primaryAction}
            </a>
            <a
              href="#build"
              className="inline-flex h-12 items-center border border-[#f5f0e8]/30 px-5 text-[11px] tracking-[0.16em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
            >
              {copy.wardrobe.selectionHeading}
            </a>
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-[#f5f0e8]/55">
            Prefer a founding pair only?{" "}
            <Link href="/shop#1101" className="underline underline-offset-4">
              Enquire about 1101
            </Link>
            .
          </p>
        </div>

        <figure className="ms-resin relative aspect-[4/5] overflow-hidden bg-[#2a3030] md:aspect-[5/6]">
          <Image
            src="/line/f35.webp"
            alt="Malik in a navy zip jacket, white layer, and matching trouser — a wardrobe starting set"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-contain"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a2232]/90 to-transparent px-4 pb-4 pt-16 text-[12px] leading-relaxed text-[#f5f0e8]/70">
            Design preview. A starting look for the enquiry.
          </figcaption>
        </figure>
      </div>

      <div id="how-it-works" className="relative scroll-mt-28 border-t border-[#f5f0e8]/10">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
          <p className="ms-kicker text-[#c0a477]">How it works</p>
          <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((step, index) => (
              <li key={step.title} className="ms-on-dark">
                <span className="font-serif text-2xl italic text-[#c0a477]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-serif text-3xl text-[#f5f0e8]">{step.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#f5f0e8]/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
