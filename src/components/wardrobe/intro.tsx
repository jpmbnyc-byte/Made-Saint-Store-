import Image from "next/image";
import Link from "next/link";

const PATH = [
  {
    n: "01",
    title: "Choose a starting set",
    body: "Pick the days you dress for — travel, one look, ordinary days, or a sample set. The photographs are the clothes that can be requested.",
  },
  {
    n: "02",
    title: "Keep what you want made",
    body: "Uncheck what does not belong. Add another piece from the register. Prefer a shoulder and a trouser ease for the conversation.",
  },
  {
    n: "03",
    title: "Send an introduction",
    body: "No payment is taken here. The house reads the set and writes to the email you give. A remote fitting consultation can be added; it is not held in person.",
  },
] as const;

const DISTINCT = [
  {
    title: "What this is",
    body: "A private commission path for the same house silhouettes — a look, a season, or a year — planned with one person before cloth is cut.",
  },
  {
    title: "What this is not",
    body: "Not a second shop cart. Not a membership checkout. Founding runners are reserved on the shop; this page only requests clothes and a conversation.",
  },
] as const;

export function WardrobeIntro() {
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
          <p className="ms-kicker text-[#c0a477]">Private Wardrobe</p>
          <h1 id="wardrobe-intro-heading" className="ms-display mt-4">
            Clothes for the days you keep,
            <br />
            <em className="italic">planned before they are cut.</em>
          </h1>
          <p className="ms-lede mt-5 max-w-xl">
            Discover a starting set, compose the pieces, and commission the house. Seasonal figures from $6,500 and annual figures from $20,000 are planning targets — not a price at checkout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#build"
              className="ms-cta bg-[#f5f0e8] text-[#1c1a17] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
            >
              Start with a set
            </a>
            <a
              href="#how-it-works"
              className="ms-cta border text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f0e8]"
              style={{ borderColor: "rgba(245, 240, 232, 0.35)" }}
            >
              How it works
            </a>
            <Link
              href="/shop#edition"
              className="ms-cta border text-[#f5f0e8]/70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f0e8]"
              style={{ borderColor: "rgba(245, 240, 232, 0.2)" }}
            >
              Reserve a founding pair instead
            </Link>
          </div>
        </div>

        <figure className="ms-resin relative aspect-[4/5] overflow-hidden bg-[#2a3030] md:aspect-[5/6]">
          <Image
            src="/line/f35.webp"
            alt="Malik in a navy zip jacket, white layer, and matching trouser — a wardrobe starting set worn full length"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-contain"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a2232]/90 to-transparent px-4 pb-4 pt-16 text-[12px] leading-relaxed text-[#f5f0e8]/70">
            Arrival set. A starting point you adjust — not a finished order.
          </figcaption>
        </figure>
      </div>

      <div id="how-it-works" className="relative scroll-mt-28 border-t border-[#f5f0e8]/10">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
          <p className="ms-kicker text-[#c0a477]">How it works</p>
          <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {PATH.map((step) => (
              <li key={step.n} className="ms-on-dark">
                <span className="font-serif text-2xl italic text-[#c0a477]">{step.n}</span>
                <h2 className="mt-3 font-serif text-3xl text-[#f5f0e8]">{step.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#f5f0e8]/65">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 border-t border-[#f5f0e8]/10 pt-10 md:grid-cols-2">
            {DISTINCT.map((item) => (
              <div key={item.title} className="ms-on-dark">
                <h3 className="font-serif text-2xl text-[#f5f0e8]">{item.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#f5f0e8]/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
