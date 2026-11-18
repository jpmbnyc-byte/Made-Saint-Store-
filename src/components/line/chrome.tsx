"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/house/site-chrome";
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
  const active =
    view === "account" ? "closet" : view === "product" || view === "look" || view === "featured" || view === "lookbook" || view === "campaign"
      ? "collection"
      : "collection";

  return (
    <header className="bg-[#f5f0e8] text-[#1c1a17]">
      <SiteHeader active={active} />
      {view === "account" ? (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 text-[12px] md:px-8">
          <p className="tracking-[0.14em] text-[#1c1a17]/55 uppercase">My Closet</p>
          <p className="tabular-nums text-[#1c1a17]/55">
            {closet.data.pieces.length} piece{closet.data.pieces.length === 1 ? "" : "s"}
          </p>
        </div>
      ) : null}

      {view === "product" && (
        <div className="px-5 pb-6 pt-4 text-center md:px-8">
          <p className="ms-kicker text-[#B03236]">{line.eyebrow}</p>
        </div>
      )}

      {view !== "look" && view !== "account" && view !== "product" && (
        <div className="mx-auto max-w-[720px] px-5 pb-12 pt-10 text-center md:px-8 md:pb-16 md:pt-14">
          <p className="ms-kicker text-[#B03236]">{line.eyebrow}</p>
          <h1 className="ms-title mt-4 text-[clamp(2.5rem,6vw,4.25rem)]">{line.heading}</h1>
          <p className="ms-lede mx-auto mt-5 max-w-[34rem] text-[15px] leading-relaxed md:text-[16px]">{line.intro}</p>
          <nav aria-label="Collection" className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {VIEWS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.id === view ? "page" : undefined}
                className={`ms-meta inline-flex h-11 items-center tracking-[0.18em] ${
                  item.id === view ? "border-b border-[#B03236] text-[#B03236]" : "text-[#1c1a17]/55"
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
