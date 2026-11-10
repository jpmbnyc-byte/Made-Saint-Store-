import Image from "next/image";
import Link from "next/link";

const STEPS = [
  ["01", "Conversation", "By video or phone. Remote."],
  ["02", "Fitting", "Physical, and only when one is arranged."],
  ["03", "Approval", "Looks, cloth, prices, and dates — before anything is cut."],
  ["04", "Making", "A named person writes when a date moves."],
  ["05", "Delivery & care", "A fit review after the clothes have been worn."],
];

export function WardrobeChapter() {
  return (
    <section
      id="private-wardrobe"
      className="relative scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#1a2232] text-[#f5f0e8]"
      aria-labelledby="wardrobe-heading"
    >
      {/* Grain overlay */}
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

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:py-24 md:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] text-[#c0a477] uppercase">Private Wardrobe</p>
          <h2
            id="wardrobe-heading"
            className="mt-4 font-serif text-[#f5f0e8]"
            style={{ fontSize: "clamp(44px, 5vw, 76px)", letterSpacing: "-0.035em", lineHeight: 0.93 }}
          >
            A wardrobe,
            <br />
            <em className="italic">considered around you.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#f5f0e8]/75">
            One person coordinates the days. A fitting, if you add one, is remote. It is not held in person.
          </p>
        </div>

        {/* Grid — image + steps */}
        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          {/* Images */}
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
                  alt="Black zip blouson, front and back, a product sheet"
                  fill
                  sizes="(min-width: 768px) 12vw, 25vw"
                  className="object-contain"
                />
              </div>
              <div className="ms-resin relative aspect-square overflow-hidden bg-[#2a3030]">
                <Image
                  src="/collection/sage.webp"
                  alt="Ren in a sage fleece set, pale yellow turtleneck, and a yellow barrel bag, walking stairs"
                  fill
                  sizes="(min-width: 768px) 12vw, 25vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Steps + copy */}
          <div className="flex flex-col justify-center">
            <ol className="space-y-4">
              {STEPS.map(([n, title, body]) => (
                <li
                  key={n}
                  className="grid grid-cols-[auto_1fr] gap-4 border-t pt-4"
                  style={{ borderColor: "rgba(245, 240, 232, 0.12)" }}
                >
                  <span className="font-serif text-2xl italic text-[#c0a477]">{n}</span>
                  <span>
                    <span className="block font-serif text-2xl text-[#f5f0e8]">{title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[#f5f0e8]/65">{body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/wardrobe"
                className="inline-flex h-12 items-center bg-[#f5f0e8] px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
              >
                Discover Private Wardrobe
              </Link>
              <Link
                href="/wardrobe#introduction"
                className="inline-flex h-12 items-center border px-6 text-[12px] tracking-[0.18em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f0e8]"
                style={{ borderColor: "rgba(245, 240, 232, 0.35)" }}
              >
                Request an introduction
              </Link>
            </div>

            <p className="mt-6 text-[12px] leading-relaxed text-[#f5f0e8]/40">
              No payment in this form. A remote fitting consultation can be added. The house writes back after reviewing your introduction. A response time is not promised.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
