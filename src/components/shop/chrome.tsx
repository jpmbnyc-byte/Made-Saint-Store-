import Link from "next/link";

export function ShopHeader({ status }: { status?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/90 backdrop-blur">
      {status && (
        <div className="bg-[#1c1a17] px-4 py-2 text-center text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">{status}</div>
      )}
      <div className="mx-auto grid max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5 md:px-8">
        <nav className="flex gap-3 text-[10px] tracking-[0.14em] text-[#1c1a17]/70 uppercase sm:gap-5 sm:text-[11px] sm:tracking-[0.16em]">
          <Link href="/shop#edition" className="whitespace-nowrap hover:text-[#1c1a17]"><span className="hidden sm:inline">Founding </span>Edition</Link>
          <Link href="/#atelier" className="hover:text-[#1c1a17]">Atelier</Link>
        </nav>
        <Link href="/" className="whitespace-nowrap font-serif text-[22px] leading-none tracking-[0.02em] sm:text-[28px] md:text-[34px]">
          MADE SAiNT
        </Link>
        <nav className="flex justify-end gap-3 text-[10px] tracking-[0.14em] text-[#1c1a17]/70 uppercase sm:gap-5 sm:text-[11px] sm:tracking-[0.16em]">
          <Link href="/shop#edition" className="whitespace-nowrap hover:text-[#1c1a17]">Reserve</Link>
        </nav>
      </div>
    </header>
  );
}

export function ShopFooter() {
  return (
    <footer className="border-t border-[#1c1a17]/10 bg-[#efece5]">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-serif text-3xl">MADE SAiNT</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#1c1a17]/65">
            Made to order in Felgueiras, Portugal, in small numbered runs. We make what has been reserved, and nothing more.
          </p>
        </div>
        <div className="space-y-2 text-sm text-[#1c1a17]/70">
          <p className="text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">Client care</p>
          <p>Size exchanges within 30 days of delivery</p>
          <p>Free insured shipping in the US</p>
          <p>Care and repair through client care</p>
        </div>
        <div className="space-y-2 text-sm text-[#1c1a17]/70">
          <p className="text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">House</p>
          <Link href="/shop#edition" className="block hover:text-[#1c1a17]">The Founding Edition</Link>
          <Link href="/#atelier" className="block hover:text-[#1c1a17]">The atelier</Link>
          <Link href="/shop#how" className="block hover:text-[#1c1a17]">How a pair is made</Link>
          <Link href="/shop#faq" className="block hover:text-[#1c1a17]">Care and questions</Link>
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
