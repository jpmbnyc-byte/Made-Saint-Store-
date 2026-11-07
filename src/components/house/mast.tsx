import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

export function Mast() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-3 sm:px-6">
        <Link href="#wardrobe" className="inline-flex h-11 items-center self-center sm:hidden">
          <Wordmark className="h-8 w-auto" />
        </Link>
        <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
          <nav className="flex min-w-0 gap-3 overflow-x-auto text-[11px] tracking-[0.12em] text-[#1c1a17] uppercase [scrollbar-width:none] sm:flex-wrap sm:gap-4 sm:tracking-[0.14em] [&::-webkit-scrollbar]:hidden">
            {[
              ["#wardrobe", "Wardrobe"],
              ["#looks", "Looks"],
              ["#order", "Runners"],
              ["#leather", "Leather"],
              ["/line", "Line"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17]">
                {label}
              </Link>
            ))}
          </nav>
          <Link href="#wardrobe" className="hidden justify-self-center sm:block">
            <Wordmark />
          </Link>
          <nav className="hidden justify-end sm:flex">
            <Link href="/wardrobe#introduction" className="inline-flex h-12 items-center bg-[#1c1a17] px-4 text-[11px] tracking-[0.14em] text-[#f6f4ef] uppercase">
              Introduction
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
