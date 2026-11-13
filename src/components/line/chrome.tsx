"use client";

import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";
import { useCloset } from "@/components/line/store";

const VIEWS = [
  { href: "/line", id: "featured", label: "Featured" },
  { href: "/line/lookbook", id: "lookbook", label: "Lookbook" },
  { href: "/line/campaign", id: "campaign", label: "Campaign" },
] as const;

export function CollectionChrome({ view }: { view: "featured" | "lookbook" | "campaign" | "look" | "product" | "account" }) {
  const closet = useCloset();
  return (
    <header className="border-b border-[#262626]/08 bg-[#f3efe6] text-[#262626]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 md:h-[72px] md:px-8">
        <Link href="/" aria-label="MADE SAiNT — home" className="inline-flex h-11 items-center">
          <Wordmark className="h-6 w-auto md:h-7" />
        </Link>
        <nav aria-label="Line account" className="flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase">
          <Link href="/line#line-search" className="inline-flex h-11 items-center px-2 text-[#262626]/65 hover:text-[#262626]">Search</Link>
          <Link href="/closet" className="inline-flex h-11 items-center px-2 text-[#262626]/65 hover:text-[#262626]">Closet {closet.data.pieces.length}</Link>
          <Link href="/wardrobe#introduction" className="inline-flex h-11 items-center px-2 text-[#262626]/65 hover:text-[#262626]">Enquire</Link>
        </nav>
      </div>
      {view !== "look" && view !== "account" && (
        <div className="px-4 pb-8 pt-6 text-center md:pb-10 md:pt-8">
          <nav aria-label="Collection" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {VIEWS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.id === view ? "page" : undefined}
                className={`inline-flex h-11 items-center text-[10px] tracking-[0.2em] uppercase ${item.id === view ? "border-b border-[#262626] text-[#262626]" : "text-[#262626]/45"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
