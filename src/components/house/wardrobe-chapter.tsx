import Image from "next/image";
import Link from "next/link";
import { FEATURED_ARCHIVE_CHAPTERS } from "@/lib/archive-chapters";
import { copy } from "@/lib/copy";

export function WardrobeChapter() {
  const { eyebrow, heading, body, action } = copy.home.wardrobe;
  const steps = copy.wardrobe.steps;
  const look = FEATURED_ARCHIVE_CHAPTERS[0]!;

  return (
    <section
      id="private-wardrobe"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f7f7f5] text-[#1c1a17]"
      aria-labelledby="wardrobe-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-14">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#efefed] md:aspect-[4/5]">
            <Image
              src={look.primary.src}
              alt={look.primary.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="ms-kicker">{eyebrow}</p>
            <h2 id="wardrobe-heading" className="ms-display mt-4">
              {heading}
            </h2>
            <p className="ms-lede mt-5 max-w-lg">{body}</p>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#1c1a17]/70">
              <span className="font-serif text-xl text-[#1c1a17]">{look.title}.</span> {look.line}
            </p>
            <ol className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <li key={step.title} className="border-t border-[#1c1a17]/10 pt-4">
                  <span className="text-[11px] tracking-[0.16em] text-[#1c1a17]/45 uppercase">
                    {String(index + 1).padStart(2, "0")} · {step.title}
                  </span>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#1c1a17]/70">{step.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/wardrobe" className="ms-cta inline-flex bg-[#1c1a17] text-[#f5f0e8]">
                {action}
              </Link>
              <Link
                href={`/wardrobe/archive/${look.slug}`}
                className="ms-cta inline-flex border border-[#1c1a17]/25"
              >
                {look.action}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
