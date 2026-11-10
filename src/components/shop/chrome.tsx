import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

export function ShopHeader({ status }: { status?: string }) {
  return (
    <header className="ms-nav-glass sticky top-0 z-30">
      {status && (
        <div className="bg-[#1c1a17] px-4 py-2 text-center text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">{status}</div>
      )}
      <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-3 sm:px-5 md:px-8">
        <Link href="/" className="inline-flex h-11 items-center self-center sm:hidden">
          <Wordmark className="h-8 w-auto" />
        </Link>
        <div className="grid grid-cols-1 items-center sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          <nav aria-label="Primary navigation" className="flex min-w-0 items-center justify-between gap-1 overflow-x-auto text-[11px] tracking-[0.14em] text-[#1c1a17] uppercase [scrollbar-width:none] sm:justify-start sm:gap-2 [&::-webkit-scrollbar]:hidden">
            <Link href="/shop#1101" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">1101</Link>
            <Link href="/shop#1213" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">1213</Link>
            <Link href="/shop#0929" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">0929</Link>
            <Link href="/line" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">The Line</Link>
            <Link href="/wardrobe" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">Private Wardrobe</Link>
            <Link href="/#looks" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">Looks</Link>
            <Link href="/brand" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">The House</Link>
          </nav>
          <Link href="/" className="hidden justify-self-center sm:block" aria-label="MADE SAiNT — home">
            <Wordmark />
          </Link>
          <nav aria-label="Secondary navigation" className="hidden justify-end sm:flex">
            <Link href="/wardrobe#introduction" className="inline-flex h-11 items-center bg-[#1c1a17] px-4 text-[11px] tracking-[0.14em] text-[#f5f0e8] uppercase hover:opacity-80">
              Introduction
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function ShopFooter() {
  return (
    <footer className="border-t border-[#1c1a17]/10 bg-[#ede6d8]">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-serif text-3xl text-[#1c1a17]">MADE SAiNT</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#1c1a17]/65">
            Every runner is live and made to order, ready in 4 to 6 weeks. A fitting, if you add one, is remote.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">1101</p>
          <Link href="/shop#1101" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">The 1101 runner</Link>
          <Link href="/shop#1213" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">The 1213 runner</Link>
          <Link href="/shop#0929" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">The 0929 runners</Link>
          <Link href="/shop#edition" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">All colorways</Link>
          <Link href="/shop#faq" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">Care &amp; questions</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">Private Wardrobe</p>
          <Link href="/wardrobe" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">Discover</Link>
          <Link href="/wardrobe#introduction" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">Request an introduction</Link>
          <Link href="/#looks" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">Looks</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">The House</p>
          <Link href="/brand" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">About</Link>
          <Link href="/line" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">2027 line</Link>
          <div className="mt-3 space-y-1 text-[12px] text-[#1c1a17]/50">
            <p>Size exchanges within 30 days of delivery</p>
            <p>Free insured shipping in the US</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Progress({ n, of, dark }: { n: number; of: number; dark?: boolean }) {
  const p = Math.min(1, n / of);
  return (
    <div>
      <div className={`h-[3px] w-full ${dark ? "bg-[#f6f4ef]/20" : "bg-[#1c1a17]/10"}`}>
        <div className={`h-full ${dark ? "bg-[#f6f4ef]" : "bg-[#1c1a17]"} transition-all`} style={{ width: `${Math.max(p * 100, n ? 2 : 0)}%` }} />
      </div>
      <p className={`mt-2 text-[11px] tracking-[0.14em] uppercase ${dark ? "text-[#f6f4ef]/70" : "text-[#1c1a17]/60"}`}>
        {n >= of ? `${n} reserved · run confirmed` : `${n} of ${of} reserved to confirm the run`}
      </p>
    </div>
  );
}
