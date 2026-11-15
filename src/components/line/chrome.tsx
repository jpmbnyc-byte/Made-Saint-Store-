"use client";

import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";
import { useCloset } from "@/components/line/store";
import { copy } from "@/lib/copy";

const VIEWS = [
  { href: "/line", id: "featured", labelKey: "featured" as const },
  { href: "/line/lookbook", id: "lookbook", labelKey: "lookbook" as const },
  { href: "/line/campaign", id: "campaign", labelKey: "campaign" as const },
] as const;

export function CollectionChrome({
  view,
}: {
  view: "featured" | "lookbook" | "campaign" | "look" | "product" | "account";
}) {
  const closet = useCloset();
  const line = copy.line;

  return (
    <header className="bg-[#f7f7f5] text-[#1c1a17]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-5 md:h-[72px] md:px-8">
        <Link href="/" aria-label="MADE SAiNT — home" className="inline-flex h-11 items-center">
          <Wordmark className="h-6 w-auto md:h-7" />
        </Link>
        <nav aria-label="Line account" className="ms-nav-label flex items-center gap-1 text-[#1c1a17]/70">
          <Link href="/line#line-index" className="inline-flex h-11 items-center px-2 hover:text-[#1c1a17]">
            Index
          </Link>
          <Link href="/closet" className="inline-flex h-11 items-center px-2 hover:text-[#1c1a17]">
            Closet{closet.data.pieces.length > 0 ? ` ${closet.data.pieces.length}` : ""}
          </Link>
          <Link href="/wardrobe#introduction" className="inline-flex h-11 items-center px-2 hover:text-[#1c1a17]">
            Enquire
          </Link>
        </nav>
      </div>

      {view === "product" && (
        <div className="px-5 pb-6 pt-4 text-center md:px-8">
          <p className="ms-kicker">{line.eyebrow}</p>
        </div>
      )}

      {view !== "look" && view !== "account" && view !== "product" && (
        <div className="mx-auto max-w-[720px] px-5 pb-12 pt-10 text-center md:px-8 md:pb-16 md:pt-14">
          <p className="ms-kicker">{line.eyebrow}</p>
          <h1 className="ms-title mt-4 text-[clamp(2.5rem,6vw,4.25rem)]">{line.heading}</h1>
          <p className="ms-lede mx-auto mt-5 max-w-[34rem] text-[15px] leading-relaxed md:text-[16px]">{line.intro}</p>
          <nav aria-label="Collection" className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {VIEWS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.id === view ? "page" : undefined}
                className={`ms-meta inline-flex h-11 items-center tracking-[0.18em] ${
                  item.id === view ? "border-b border-[#1c1a17] text-[#1c1a17]" : "text-[#1c1a17]/55"
                }`}
              >
                {line.views[item.labelKey]}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
