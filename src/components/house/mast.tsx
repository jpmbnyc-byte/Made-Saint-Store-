"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Mast() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.62);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-[#1c1a17]/10 bg-[#f6f4ef]/92 backdrop-blur transition duration-500 ${
        shown ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 sm:px-6 md:py-4">
        <nav className="flex gap-4 text-[10px] tracking-[0.16em] text-[#1c1a17]/70 uppercase sm:text-[11px]">
          <Link href="#edition" className="hover:text-[#1c1a17]">
            Edition
          </Link>
          <Link href="#wardrobe" className="hover:text-[#1c1a17]">
            Private
          </Link>
        </nav>
        <Link href="#open" className="font-serif text-[22px] leading-none sm:text-[28px]">
          MADE SAiNT
        </Link>
        <nav className="flex justify-end">
          <Link href="/shop#edition" className="text-[10px] tracking-[0.16em] text-[#1c1a17]/70 uppercase hover:text-[#1c1a17] sm:text-[11px]">
            Reserve
          </Link>
        </nav>
      </div>
    </header>
  );
}
