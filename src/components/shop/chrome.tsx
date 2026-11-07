import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

export function ShopHeader({ status }: { status?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/90 backdrop-blur">
      {status && (
        <div className="bg-[#1c1a17] px-4 py-2 text-center text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">{status}</div>
      )}
      <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-3 sm:px-5 md:px-8">
        <Link href="/" className="inline-flex h-11 items-center self-center sm:hidden">
          <Wordmark className="h-8 w-auto" />
        </Link>
        <div className="grid grid-cols-1 items-center sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          <nav className="flex min-w-0 items-center justify-between gap-3 overflow-x-auto text-[11px] tracking-[0.12em] text-[#1c1a17] uppercase [scrollbar-width:none] sm:justify-start sm:gap-5 sm:tracking-[0.14em] [&::-webkit-scrollbar]:hidden">
            <Link href="/shop#1101" className="inline-flex h-11 shrink-0 items-center whitespace-nowrap hover:text-[#1c1a17]">1101 Runner</Link>
            <Link href="/shop#edition" className="inline-flex h-11 shrink-0 items-center whitespace-nowrap hover:text-[#1c1a17]"><span className="hidden sm:inline">Founding </span>Edition</Link>
            <Link href="/#looks" className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17]">Looks</Link>
            <Link href="/line" className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17]">Line</Link>
            <Link href="/wardrobe" className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17]">Private</Link>
            <Link href="/shop#1101" className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17] sm:hidden">Pairs</Link>
          </nav>
          <Link href="/" className="hidden justify-self-center sm:block">
            <Wordmark />
          </Link>
          <nav className="hidden justify-end sm:flex">
            <Link href="/shop#1101" className="inline-flex h-11 items-center text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">Pairs</Link>
          </nav>
        </div>
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
          <Link href="/shop#1101" className="block hover:text-[#1c1a17]">The 1101 Runner</Link>
          <Link href="/shop#edition" className="block hover:text-[#1c1a17]">The Founding Edition</Link>
          <Link href="/#looks" className="block hover:text-[#1c1a17]">Lookbooks</Link>
          <Link href="/line" className="block hover:text-[#1c1a17]">The 2027 line</Link>
          <Link href="/wardrobe" className="block hover:text-[#1c1a17]">The Private Wardrobe</Link>
          <Link href="/#leather" className="block hover:text-[#1c1a17]">The leather runners</Link>
          <Link href="/#order" className="block hover:text-[#1c1a17]">How a pair is made</Link>
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
