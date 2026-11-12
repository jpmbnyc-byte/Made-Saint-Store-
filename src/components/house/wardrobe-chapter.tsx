import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/copy";

export function WardrobeChapter() {
  const { eyebrow, heading, body, action } = copy.home.wardrobe;
  const steps = copy.wardrobe.steps;

  return (
    <section
      id="private-wardrobe"
      className="relative scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#1a2232] text-[#f5f0e8]"
      aria-labelledby="wardrobe-heading"
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

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="ms-on-dark max-w-2xl">
          <p className="ms-kicker text-[#c0a477]">{eyebrow}</p>
          <h2 id="wardrobe-heading" className="ms-display mt-4">
            {heading}
          </h2>
          <p className="ms-lede mt-5 max-w-lg">{body}</p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <div className="grid grid-cols-2 gap-3">
            <div className="ms-resin relative aspect-[2/3] overflow-hidden bg-[#2a3030]">
              <Image
                src="/line/f35.webp"
                alt="Malik in a navy zip jacket, white layer, and matching trouser, worn full length"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="mt-8 grid gap-3">
              <div className="ms-resin relative aspect-square overflow-hidden bg-[#2a3030]">
                <Image
                  src="/wardrobe/blouson-black-zip.webp"
                  alt="Black zip blouson, front and back"
                  fill
                  sizes="(min-width: 768px) 12vw, 25vw"
                  className="object-contain"
                />
              </div>
              <div className="ms-resin relative aspect-square overflow-hidden bg-[#2a3030]">
                <Image
                  src="/collection/sage.webp"
                  alt="Ren in a sage fleece set, pale yellow turtleneck, and a yellow barrel bag"
                  fill
                  sizes="(min-width: 768px) 12vw, 25vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[auto_1fr] gap-4 border-t pt-4"
                  style={{ borderColor: "rgba(245, 240, 232, 0.12)" }}
                >
                  <span className="font-serif text-2xl italic text-[#c0a477]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-serif text-2xl text-[#f5f0e8]">{step.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[#f5f0e8]/65">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Link
                href="/wardrobe"
                className="ms-cta bg-[#f5f0e8] text-[#1c1a17] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
              >
                {action}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
