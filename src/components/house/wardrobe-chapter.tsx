import Image from "next/image";
import Link from "next/link";

const STEPS = [
  ["01", "Discover", "Open a starting set for the days you dress — one look or a small capsule."],
  ["02", "Compose", "Keep the pieces you want made. Prefer a shoulder and a trouser ease for the conversation."],
  ["03", "Introduce", "Send settings and dates. No payment. A remote fitting can be added; it is not held in person."],
  ["04", "Approve", "Looks, cloth, prices, and dates — before anything is cut. Corrections stay with the house."],
  ["05", "Make & deliver", "A named person writes when a date moves. A fit review follows after the clothes have been worn."],
];

const DOORS = [
  {
    href: "/shop#edition",
    label: "A pair",
    line: "Founding runners, requested from the shop.",
  },
  {
    href: "/wardrobe#build",
    label: "A look",
    line: "One complete combination you adjust.",
  },
  {
    href: "/wardrobe#build",
    label: "A capsule",
    line: "A narrowly scoped set for real dates.",
  },
] as const;

export function WardrobeChapter() {
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
          <p className="ms-kicker text-[#c0a477]">Private Wardrobe</p>
          <h2 id="wardrobe-heading" className="ms-display mt-4">
            Not another cart.
            <br />
            <em className="italic">A wardrobe planned with the house.</em>
          </h2>
          <p className="ms-lede mt-5 max-w-lg">
            Same silhouettes as the line — begin with a pair, one look, or a small capsule. An annual plan is discussed only after fit and delivery are proven.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {DOORS.map((door) => (
            <Link
              key={door.label}
              href={door.href}
              className="border border-[#f5f0e8]/25 px-4 py-4 text-[#f5f0e8] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
            >
              <span className="block font-serif text-2xl">{door.label}</span>
              <span className="mt-2 block text-sm leading-snug text-[#f5f0e8]/65">{door.line}</span>
            </Link>
          ))}
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
                className="ms-cta bg-[#f5f0e8] text-[#1c1a17] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
              >
                Open Private Wardrobe
              </Link>
              <Link
                href="/wardrobe#how-it-works"
                className="ms-cta border text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f0e8]"
                style={{ borderColor: "rgba(245, 240, 232, 0.35)" }}
              >
                See how it works
              </Link>
            </div>

            <p className="mt-6 text-[12px] leading-relaxed text-[#f5f0e8]/40">
              Planning figures for a season or year stay off the first step. This path is discover, compose, then introduce. A response time is not promised.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
