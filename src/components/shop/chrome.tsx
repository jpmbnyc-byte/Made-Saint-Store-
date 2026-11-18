import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/house/site-chrome";
import { seriesHref } from "@/lib/business";

export function ShopHeader({ status }: { status?: string }) {
  return (
    <>
      <SiteHeader active="shop" showBanner={!status} />
      {status ? (
        <div className="bg-[#1c1a17] px-4 py-2 text-center text-[11px] tracking-[0.18em] text-[#f6f4ef] uppercase">
          {status}
        </div>
      ) : null}
      <nav
        aria-label="Footwear series"
        className="border-b border-[#1c1a17]/08 bg-[#f5f0e8] px-4 py-2 md:px-8"
      >
        <div className="mx-auto flex max-w-[1440px] gap-4 overflow-x-auto text-[11px] tracking-[0.16em] uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href={seriesHref("0106")} className="inline-flex h-10 shrink-0 items-center hover:text-[#B03236]">
            0106
          </Link>
          <Link href={seriesHref("1101")} className="inline-flex h-10 shrink-0 items-center hover:text-[#B03236]">
            1101
          </Link>
          <Link href={seriesHref("1213")} className="inline-flex h-10 shrink-0 items-center hover:text-[#B03236]">
            1213
          </Link>
          <Link href={seriesHref("0929")} className="inline-flex h-10 shrink-0 items-center hover:text-[#B03236]">
            0929
          </Link>
          <Link href="/pieces" className="inline-flex h-10 shrink-0 items-center hover:text-[#B03236]">
            Pieces
          </Link>
          <Link href="/shop#faq" className="inline-flex h-10 shrink-0 items-center hover:text-[#B03236]">
            Care
          </Link>
        </div>
      </nav>
    </>
  );
}

export function ShopFooter() {
  return <SiteFooter />;
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
