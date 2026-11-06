import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

export function Mast() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-3 sm:px-6">
        <Link href="#order" className="inline-flex h-11 items-center self-center sm:hidden">
          <Wordmark className="h-8 w-auto" />
        </Link>
        <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
          <nav className="flex min-w-0 gap-3 overflow-x-auto text-[10px] tracking-[0.14em] text-[#1c1a17]/70 uppercase sm:flex-wrap sm:gap-4 sm:text-[11px] sm:tracking-[0.16em]">
            {[
              ["#order", "Order"],
              ["#looks", "Looks"],
              ["#leather", "Leather"],
              ["/line", "Line"],
              ["/wardrobe", "Private"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17]">
                {label}
              </Link>
            ))}
            <Link href="/shop#edition" className="inline-flex h-11 shrink-0 items-center hover:text-[#1c1a17] sm:hidden">
              Reserve
            </Link>
          </nav>
          <Link href="#order" className="hidden justify-self-center sm:block">
            <Wordmark />
          </Link>
          <nav className="hidden justify-end sm:flex">
            <Link href="/shop#edition" className="inline-flex h-11 items-center text-[11px] tracking-[0.16em] text-[#1c1a17]/70 uppercase hover:text-[#1c1a17]">
              Reserve
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
