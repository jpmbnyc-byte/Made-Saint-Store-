import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

const NAV_LEFT = [
  { href: "/shop#1101", label: "1101" },
  { href: "/shop#1213", label: "1213" },
  { href: "/shop#0929", label: "0929" },
  { href: "/line", label: "The Line" },
  { href: "/wardrobe", label: "Private Wardrobe" },
];

const NAV_RIGHT = [
  { href: "/#looks", label: "Looks" },
  { href: "/closet", label: "Closet" },
  { href: "/brand", label: "The House" },
];

export function Mast() {
  return (
    <header className="ms-nav-glass sticky top-0 z-40">
      <div className="mx-auto flex max-w-[1440px] items-center gap-1 px-3 py-1.5 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-3 sm:px-6 sm:py-3">
        <Link href="/" className="inline-flex h-11 shrink-0 items-center sm:hidden" aria-label="MADE SAiNT — home">
          <Wordmark className="h-6 w-auto" />
        </Link>

        {/* Desktop: left nav | wordmark | right nav. On a phone the wordmark shares one row with the links. */}
        <div className="contents">
          {/* Left nav */}
          <nav
            aria-label="Primary navigation"
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-none sm:gap-2"
          >
            {NAV_LEFT.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex h-11 shrink-0 items-center px-2 text-[11px] tracking-[0.08em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] sm:px-3 sm:tracking-[0.14em]"
              >
                {label}
              </Link>
            ))}
            <Link href="/brand" className="inline-flex h-11 shrink-0 items-center px-2 text-[11px] tracking-[0.08em] text-[#1c1a17] uppercase sm:hidden">
              The House
            </Link>
            <Link href="/wardrobe#introduction" className="inline-flex h-11 shrink-0 items-center px-2 text-[11px] tracking-[0.08em] text-[#1c1a17] uppercase sm:hidden">
              Introduction
            </Link>
          </nav>

          {/* Wordmark — desktop only */}
          <Link href="/" className="hidden justify-self-center sm:block" aria-label="MADE SAiNT — home">
            <Wordmark />
          </Link>

          {/* Right nav */}
          <nav
            aria-label="Secondary navigation"
            className="hidden justify-end gap-1 sm:flex sm:gap-2"
          >
            {NAV_RIGHT.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex h-11 shrink-0 items-center px-2 text-[11px] tracking-[0.08em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] sm:px-3 sm:tracking-[0.14em]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/wardrobe#introduction"
              className="ml-2 inline-flex h-11 items-center bg-[#1c1a17] px-4 text-[11px] tracking-[0.14em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Introduction
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
