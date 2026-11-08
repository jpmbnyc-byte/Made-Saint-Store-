import Link from "next/link";

export function ClosingCta() {
  return (
    <section
      className="ms-liquid border-t border-[#1c1a17]/10"
      aria-label="Choose your path"
    >
      <div className="relative z-[1] mx-auto max-w-[1100px] px-5 py-16 md:py-24 md:px-8">
        <div className="grid gap-px bg-[#1c1a17]/10 md:grid-cols-2">
          {/* 1101 path */}
          <div className="flex flex-col bg-[#f5f0e8] p-8 md:p-12">
            <p className="text-[11px] tracking-[0.28em] text-[#B03236] uppercase">1101</p>
            <h2
              className="mt-4 font-serif text-[#1c1a17]"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
            >
              A founding pair,
              <br />
              made for you.
            </h2>
            <p className="mt-5 max-w-sm flex-1 text-[15px] leading-relaxed text-[#41505b]">
              Three colorways. Made to order in Felgueiras. No payment today — a pair is cut only after the run is confirmed.
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.18em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
              >
                Explore 1101
              </Link>
            </div>
          </div>

          {/* Private Wardrobe path */}
          <div className="flex flex-col bg-[#ede6d8] p-8 md:p-12">
            <p className="text-[11px] tracking-[0.28em] text-[#8d7349] uppercase">Private Wardrobe</p>
            <h2
              className="mt-4 font-serif text-[#1c1a17]"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
            >
              Begin your
              <br />
              <em className="italic">wardrobe.</em>
            </h2>
            <p className="mt-5 max-w-sm flex-1 text-[15px] leading-relaxed text-[#41505b]">
              A conversation about the days you actually dress for. A fitting arranged. One person coordinates everything.
            </p>
            <div className="mt-8">
              <Link
                href="/wardrobe#introduction"
                className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.18em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349]"
              >
                Begin your wardrobe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
