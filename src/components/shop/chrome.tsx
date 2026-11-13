import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";
import { copy } from "@/lib/copy";

export function ShopHeader({ status }: { status?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#262626]/08 bg-[#f3efe6]/92 backdrop-blur-md">
      {status && (
        <div className="border-b border-[#262626]/10 bg-transparent px-4 py-2 text-center text-[10px] tracking-[0.2em] text-[#262626]/55 uppercase">{status}</div>
      )}
      <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-3 sm:px-5 md:px-8">
        <Link href="/" className="inline-flex h-11 items-center self-center sm:hidden">
          <Wordmark className="h-8 w-auto" />
        </Link>
        <div className="grid grid-cols-1 items-center sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          <nav aria-label="Primary navigation" className="flex min-w-0 items-center justify-between gap-1 overflow-x-auto text-[10px] tracking-[0.18em] text-[#262626] uppercase [scrollbar-width:none] sm:justify-start sm:gap-1 [&::-webkit-scrollbar]:hidden">
            <Link href="/shop#1101" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">1101</Link>
            <Link href="/shop#bags" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">Bags</Link>
            <Link href="/shop#1213" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">1213</Link>
            <Link href="/shop#mules" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">Mules</Link>
            <Link href="/shop#0929" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">0929</Link>
            <Link href="/line" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">
              <span className="sm:hidden">Line</span>
              <span className="hidden sm:inline">The Line</span>
            </Link>
            <Link href="/wardrobe" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">
              <span className="sm:hidden">Wardrobe</span>
              <span className="hidden sm:inline">Private Wardrobe</span>
            </Link>
            <Link href="/brand" className="inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70">
              <span className="sm:hidden">House</span>
              <span className="hidden sm:inline">The House</span>
            </Link>
          </nav>
          <Link href="/" className="hidden justify-self-center sm:block" aria-label="MADE SAiNT — home">
            <Wordmark />
          </Link>
          <nav aria-label="Secondary navigation" className="hidden items-center justify-end gap-3 sm:flex">
            <Link href="/closet" className="inline-flex h-11 items-center px-2 text-[10px] tracking-[0.18em] uppercase text-[#262626]/70 hover:text-[#262626]">
              Closet
            </Link>
            <Link href="/wardrobe#introduction" className="inline-flex h-11 items-center border border-[#262626] px-5 text-[10px] tracking-[0.18em] text-[#262626] uppercase hover:bg-[#262626] hover:text-[#f3efe6]">
              Enquire
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function ShopFooter() {
  return (
    <footer className="border-t border-[#262626]/10 bg-[#efeae0]">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-serif text-3xl font-light tracking-[-0.02em] text-[#262626]">MADE SAiNT</p>
          <p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-[#262626]/60">
            {copy.footer.brandLine} Explore the 1101, 1213 and 0929. Clothes beyond a pair are planned through the Private Wardrobe.
          </p>
        </div>
        <div className="space-y-2.5 text-[14px]">
          <p className="text-[10px] tracking-[0.2em] text-[#262626]/45 uppercase">Footwear</p>
          <Link href="/shop#1101" className="block text-[#262626]/65 hover:text-[#262626]">The 1101 runner</Link>
          <Link href="/shop#bags" className="block text-[#262626]/65 hover:text-[#262626]">The 1101 backpack</Link>
          <Link href="/shop#1213" className="block text-[#262626]/65 hover:text-[#262626]">The 1213 runner</Link>
          <Link href="/shop#mules" className="block text-[#262626]/65 hover:text-[#262626]">Trail &amp; City Mule</Link>
          <Link href="/shop#0929" className="block text-[#262626]/65 hover:text-[#262626]">The 0929 runners</Link>
          <Link href="/shop#faq" className="block text-[#262626]/65 hover:text-[#262626]">Care &amp; questions</Link>
        </div>
        <div className="space-y-2.5 text-[14px]">
          <p className="text-[10px] tracking-[0.2em] text-[#262626]/45 uppercase">Private Wardrobe</p>
          <Link href="/wardrobe" className="block text-[#262626]/65 hover:text-[#262626]">Private Wardrobe</Link>
          <Link href="/wardrobe#build" className="block text-[#262626]/65 hover:text-[#262626]">Choose your pieces</Link>
          <Link href="/wardrobe#introduction" className="block text-[#262626]/65 hover:text-[#262626]">Enquire</Link>
          <Link href="/line/lookbook" className="block text-[#262626]/65 hover:text-[#262626]">Lookbook</Link>
          <Link href="/closet" className="block text-[#262626]/65 hover:text-[#262626]">Closet</Link>
        </div>
        <div className="space-y-2.5 text-[14px]">
          <p className="text-[10px] tracking-[0.2em] text-[#262626]/45 uppercase">The House</p>
          <Link href="/brand" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">About</Link>
          <Link href="/line" className="block text-[#1c1a17]/70 hover:text-[#1c1a17]">The Line</Link>
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
