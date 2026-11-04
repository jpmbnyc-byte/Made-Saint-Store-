import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

export function Mast() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-3 sm:px-6">
        <Link href="#open" className="self-center sm:hidden">
          <Wordmark className="h-8 w-auto" />
        </Link>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <nav className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] tracking-[0.14em] text-[#1c1a17]/70 uppercase sm:gap-4 sm:text-[11px] sm:tracking-[0.16em]">
            <Link href="#order" className="hover:text-[#1c1a17]">
              Order
            </Link>
            <Link href="#looks" className="hover:text-[#1c1a17]">
              Looks
            </Link>
            <Link href="#leather" className="hover:text-[#1c1a17]">
              Leather
            </Link>
            <Link href="/line" className="hover:text-[#1c1a17]">
              Line
            </Link>
            <Link href="/wardrobe" className="hover:text-[#1c1a17]">
              Private
            </Link>
          </nav>
          <Link href="#open" className="hidden justify-self-center sm:block">
            <Wordmark />
          </Link>
          <nav className="flex justify-end">
            <Link href="/shop#edition" className="text-[10px] tracking-[0.16em] text-[#1c1a17]/70 uppercase hover:text-[#1c1a17] sm:text-[11px]">
              Reserve
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
