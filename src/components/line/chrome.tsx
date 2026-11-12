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
    <header className="bg-[#f5f0e8] text-[#1c1a17]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 md:h-[72px] md:px-8">
        <Link href="/" aria-label="MADE SAiNT — home" className="inline-flex h-11 items-center">
          <Wordmark className="h-6 w-auto md:h-7" />
        </Link>
        <nav aria-label="Line account" className="ms-nav-label flex items-center gap-1">
          <Link href="/line#line-search" className="inline-flex h-11 items-center px-2">Search</Link>
          <Link href="/closet" className="inline-flex h-11 items-center px-2">Closet {closet.data.pieces.length}</Link>
          <Link href="/wardrobe#introduction" className="inline-flex h-11 items-center px-2">Enquire</Link>
        </nav>
      </div>
      {view !== "look" && view !== "account" && (
        <div className="px-4 pt-10 pb-8 text-center md:pt-16 md:pb-10">
          {view === "product" ? (
            <p className="ms-kicker text-[#1c1a17]">The 2027 line</p>
          ) : (
            <h1 className="ms-kicker text-[#1c1a17]">The 2027 line</h1>
          )}
          <nav aria-label="Collection" className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {VIEWS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.id === view ? "page" : undefined}
                className={`ms-meta inline-flex h-11 items-center ${item.id === view ? "border-b border-[#1c1a17]" : "text-[#1c1a17]/70"}`}
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
