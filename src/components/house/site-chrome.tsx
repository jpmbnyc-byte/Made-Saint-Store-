"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

const PRIMARY = [
  { href: "/line", label: "Collection" },
  { href: "/wardrobe", label: "Private Wardrobe" },
] as const;

const SECONDARY = [
  { href: "/closet", label: "My Closet" },
  { href: "/bag", label: "Checkout" },
  { href: "/wardrobe#introduction", label: "Enquire" },
] as const;

/** SET12-style house chrome: upright wordmark, cream bar, red accents. */
export function SiteBanner({ message = "ONCE SINNER. MADE SAINT." }: { message?: string }) {
  return (
    <div className="bg-[#1c1a17] px-4 py-2 text-center text-[10px] tracking-[0.22em] text-[#f6f4ef] uppercase md:text-[11px]">
      {message}
    </div>
  );
}

export function SiteHeader({
  active,
  showBanner = true,
}: {
  active?: "collection" | "wardrobe" | "closet" | "checkout" | "enquire" | "shop" | "house";
  showBanner?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const linkClass = (key: string) =>
    `text-[12px] tracking-[0.08em] transition-opacity hover:opacity-70 ${
      active === key ? "text-[#B03236] underline decoration-[#B03236] underline-offset-8" : "text-[#1c1a17]"
    }`;

  return (
    <header ref={rootRef} className="sticky top-0 z-40 border-b border-[#1c1a17]/08 bg-[#f5f0e8]/95 backdrop-blur-md">
      {showBanner ? <SiteBanner /> : null}
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 md:px-8 md:py-4">
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {PRIMARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.label === "Collection" ? "collection" : "wardrobe")}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/shop" className={linkClass("shop")}>
            Footwear
          </Link>
        </nav>

        <Link href="/" className="justify-self-start md:justify-self-center" aria-label="MADE Saint — home" onClick={() => setOpen(false)}>
          <Wordmark className="text-[1.35rem] md:text-[1.65rem]" />
        </Link>

        <div className="flex items-center justify-end gap-4 md:gap-6">
          <nav className="hidden items-center gap-5 md:flex" aria-label="Account">
            {SECONDARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(
                  item.label === "My Closet" ? "closet" : item.label === "Checkout" ? "checkout" : "enquire",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-10 items-center gap-2 text-[12px] tracking-[0.14em] uppercase md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-[#1c1a17]/10 bg-[#f5f0e8] px-4 py-6 md:hidden"
      >
        <ul className="space-y-4 text-[14px]">
          {[...PRIMARY, { href: "/shop", label: "Footwear" }, ...SECONDARY, { href: "/brand", label: "The House" }, { href: "/line/lookbook", label: "Lookbook" }].map(
            (item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-1" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1c1a17]/10 bg-[#f5f0e8] text-[#1c1a17]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <Wordmark className="text-[1.25rem]" />
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] tracking-[0.08em]" aria-label="Footer">
          <Link href="/brand" className="hover:opacity-70">
            About
          </Link>
          <Link href="/line/lookbook" className="hover:opacity-70">
            Lookbook
          </Link>
          <Link href="/line/campaign" className="hover:opacity-70">
            Campaign
          </Link>
          <Link href="/wardrobe#introduction" className="hover:opacity-70">
            Client Care
          </Link>
          <Link href="/shop#faq" className="hover:opacity-70">
            Fit
          </Link>
          <Link href="/wardrobe#introduction" className="hover:opacity-70">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
