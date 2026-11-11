import Image from "next/image";
import Link from "next/link";

const PATH = [
  {
    n: "01",
    title: "Choose a starting set",
    body: "Begin with one look or a small capsule for the days you dress. The photographs are clothes that can be requested — each marked study, proposed, or pending.",
  },
  {
    n: "02",
    title: "Keep what you want made",
    body: "Uncheck what does not belong. Add another piece from the register. Prefer a shoulder and a trouser ease for the conversation.",
  },
  {
    n: "03",
    title: "Send an introduction",
    body: "No payment is taken here. Name the settings and dates you know. The house reads the set, writes back, and owns corrections once a scope is agreed. A remote fitting can be added; it is not held in person.",
  },
] as const;

const LADDER = [
  {
    href: "#build",
    label: "Start with one look",
    line: "A complete combination you can adjust.",
    primary: true,
  },
  {
    href: "#build",
    label: "Plan a small capsule",
    line: "Travel, appearance, or ordinary days — narrowly scoped.",
    primary: false,
  },
  {
    href: "#introduction",
    label: "Send an introduction",
    line: "After you know the set. Annual planning comes later.",
    primary: false,
  },
] as const;

const DISTINCT = [
  {
    title: "What this is",
    body: "A private commission path for the same house silhouettes — one look or a capsule first, planned with one person before cloth is cut.",
  },
  {
    title: "What this is not",
    body: "Not a second shop cart. Not a membership checkout. Founding runners are requested on the shop. Seasonal and annual figures are planning targets only after a first scope is proven.",
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
            Start with one look or a small capsule. Discover, compose, then introduce yourself to the house. No payment on this page. An annual wardrobe is discussed only after fit, wear, and delivery are proven.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {LADDER.map((step) => (
              <a
                key={step.label}
                href={step.href}
                className={`block border px-4 py-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477] ${
                  step.primary ? "border-transparent bg-[#f5f0e8] text-[#1c1a17]" : "border-[#f5f0e8]/30 text-[#f5f0e8]"
                }`}
              >
                <span className="block text-[11px] tracking-[0.16em] uppercase">{step.label}</span>
                <span className={`mt-2 block text-sm leading-snug ${step.primary ? "text-[#1c1a17]/70" : "text-[#f5f0e8]/65"}`}>
                  {step.line}
                </span>
              </a>
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-[#f5f0e8]/55">
            Prefer a founding pair only?{" "}
            <Link href="/shop#edition" className="underline underline-offset-4">
              Request one on the shop
            </Link>
            . That path does not open a wardrobe.
          </p>
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
            Arrival set. A study worn as a starting point — not a finished order, not a hand sample.
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
