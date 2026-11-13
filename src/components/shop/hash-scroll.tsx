"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scroll to the URL hash after App Router navigations (sticky header uses scroll-mt on targets). */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const go = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      // Wait a frame so sticky header / images have laid out.
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [pathname]);

  return null;
}
