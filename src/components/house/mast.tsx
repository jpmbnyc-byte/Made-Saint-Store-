"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/house/wordmark";

type NavLink = { href: string; label: string; note?: string };

type NavGroup = {
  title: string;
  links: NavLink[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Footwear",
    links: [
      { href: "/shop#1101", label: "1101", note: "The lead runner" },
      { href: "/shop#1213", label: "1213", note: "Sculpted sole" },
      { href: "/shop#0929", label: "0929", note: "Studded sole" },
      { href: "/shop#faq", label: "Care & questions" },
    ],
  },
  {
    title: "The Line",
    links: [
      { href: "/line", label: "Collection" },
      { href: "/line/lookbook", label: "Lookbook" },
    ],
  },
  {
    title: "Private Wardrobe",
    links: [
      { href: "/wardrobe", label: "Private Wardrobe" },
      { href: "/wardrobe#build", label: "Choose your pieces" },
      { href: "/wardrobe#introduction", label: "Enquire" },
    ],
  },
  {
    title: "The House",
    links: [
      { href: "/brand", label: "About" },
      { href: "/closet", label: "Closet" },
    ],
  },
];

export function Mast() {
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
      if (target && rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
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

  return (
    <header ref={rootRef} className="ms-nav-glass sticky top-0 z-40">
      <button
        type="button"
        aria-label="Dismiss navigation"
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-40 bg-[#1c1a17]/20 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <div className="relative z-50 mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 sm:py-3">
        <Link href="/" className="inline-flex h-11 shrink-0 items-center" aria-label="MADE SAiNT — home" onClick={() => setOpen(false)}>
          <Wordmark className="h-7 w-auto sm:h-auto" />
        </Link>

        <div className="relative flex items-center gap-2 sm:gap-3">
          <Link
            href="/wardrobe#introduction"
            className="ms-nav-label hidden h-11 items-center px-3 text-[#1c1a17] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] sm:inline-flex"
            onClick={() => setOpen(false)}
          >
            Enquire
          </Link>

          <button
            ref={buttonRef}
            type="button"
            className="ms-nav-label inline-flex h-11 items-center gap-2.5 px-2 text-[#1c1a17] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] sm:px-3"
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="dialog"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-[#1c1a17] transition duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-full bg-[#1c1a17] transition duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-[#1c1a17] transition duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>

          <div
            id={panelId}
            role="dialog"
            aria-label="Site menu"
            aria-hidden={!open}
            className={`absolute right-0 top-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-2rem))] origin-top-right border border-[#1c1a17]/12 bg-[#f7f4ee] shadow-[0_18px_48px_rgba(28,26,23,0.12)] transition duration-300 ease-out ${
              open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
            }`}
          >
            <div className="max-h-[min(78vh,40rem)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <p className="ms-kicker text-[#1c1a17]/45">MADE SAiNT</p>
              <nav aria-label="Site categories" className="mt-5 space-y-6">
                {NAV_GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="font-serif text-[1.35rem] leading-none tracking-[-0.01em] text-[#1c1a17]">{group.title}</p>
                    <ul className="mt-3 space-y-1 border-t border-[#1c1a17]/10 pt-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-baseline justify-between gap-4 py-2 text-[#1c1a17] transition-opacity hover:opacity-70"
                            onClick={() => setOpen(false)}
                          >
                            <span className="ms-nav-label">{link.label}</span>
                            {link.note ? <span className="text-[11px] tracking-[0.04em] text-[#1c1a17]/45">{link.note}</span> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="mt-6 border-t border-[#1c1a17]/10 pt-5 sm:hidden">
                <Link
                  href="/wardrobe#introduction"
                  className="ms-cta inline-flex h-11 w-full items-center justify-center bg-[#1c1a17] px-4 text-[#f5f0e8]"
                  onClick={() => setOpen(false)}
                >
                  Enquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
