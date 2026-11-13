import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

const NAV_LEFT = [
  { href: "/shop#1101", label: "1101" },
  { href: "/line", label: "The Line", short: "Line" },
  { href: "/wardrobe", label: "Private Wardrobe", short: "Wardrobe" },
  { href: "/brand", label: "The House", short: "House" },
];

const NAV_RIGHT = [
  { href: "/closet", label: "Closet" },
];

function NavLabel({ label, short }: { label: string; short?: string }) {
  if (!short) return <>{label}</>;
  return (
    <>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </>
  );
}

export function Mast() {
  return (
    <header className="ms-nav-glass sticky top-0 z-40">
      <div className="mx-auto flex max-w-[1440px] items-center gap-1 px-3 py-1.5 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-3 sm:px-6 sm:py-3">
        <Link href="/" className="inline-flex h-11 shrink-0 items-center sm:hidden" aria-label="MADE SAiNT — home">
          <Wordmark className="h-6 w-auto" />
        </Link>

        <div className="contents">
          <nav
            aria-label="Primary navigation"
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-none sm:gap-2"
          >
            {NAV_LEFT.map(({ href, label, short }) => (
              <Link
                key={href}
                href={href}
                className="ms-nav-label inline-flex h-11 shrink-0 items-center px-2 text-[#1c1a17] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] sm:px-3"
              >
                <NavLabel label={label} short={short} />
              </Link>
            ))}
            {NAV_RIGHT.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="ms-nav-label inline-flex h-11 shrink-0 items-center px-2 text-[#1c1a17] sm:hidden"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/wardrobe#introduction"
              className="ms-nav-label inline-flex h-11 shrink-0 items-center px-2 text-[#1c1a17] sm:hidden"
            >
              Enquire
            </Link>
          </nav>

          <Link href="/" className="hidden justify-self-center sm:block" aria-label="MADE SAiNT — home">
            <Wordmark />
          </Link>

          <nav
            aria-label="Secondary navigation"
            className="hidden justify-end gap-1 sm:flex sm:gap-2"
          >
            {NAV_RIGHT.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="ms-nav-label inline-flex h-11 shrink-0 items-center px-2 text-[#1c1a17] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] sm:px-3"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/wardrobe#introduction"
              className="ms-cta ml-2 h-11 bg-[#1c1a17] px-4 text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Enquire
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
