import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MADE SAiNT · wordmark",
  description: "The house mark is the wordmark: MADE in the block, Saint in the blackletter.",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#efe9dd] text-[#22201d]">
      <header className="sticky top-0 z-20 border-b border-[#22201d]/10 bg-[#efe9dd]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-serif text-2xl leading-none">MADE SAiNT</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[#22201d]/60 uppercase">Wordmark</p>
          </div>
          <nav className="flex flex-wrap gap-4 font-mono text-[11px] tracking-[0.1em] text-[#22201d]/60 uppercase">
            <Link href="/studio" className="hover:text-[#22201d]">Studio</Link>
            <Link href="/launch" className="hover:text-[#22201d]">Launch plan</Link>
            <Link href="/shop" className="hover:text-[#22201d]">Shop</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <section className="grid items-center gap-6 rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-5 md:grid-cols-[320px_1fr]">
          <div className="rounded-lg bg-[#1c1a17] p-6 text-[#b9bbbd]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/wordmark.png" alt="MADE Saint" className="w-full" />
          </div>
          <div>
            <h1 className="font-serif text-4xl leading-none">The wordmark</h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#22201d]/75">
              MADE in the block, Saint in the blackletter. This is the mark on the house.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
