"use client";

import Link from "next/link";
import type { SeriesId } from "@/lib/business";
import { seriesHref } from "@/lib/business";

const SERIES: SeriesId[] = ["1101", "1213", "0929"];

function scrollToSeries(series: SeriesId) {
  const el = document.getElementById(series);
  if (!el) return false;
  window.history.pushState(null, "", seriesHref(series));
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/** Sticky shop header series jumps — always land on the series title, even on same-page soft nav. */
export function ShopSeriesLinks({ className }: { className?: string }) {
  return (
    <>
      {SERIES.map((series) => (
        <Link
          key={series}
          href={seriesHref(series)}
          className={className ?? "inline-flex h-11 shrink-0 items-center px-2 hover:opacity-70"}
          onClick={(event) => {
            if (typeof window === "undefined") return;
            if (window.location.pathname !== "/shop") return;
            event.preventDefault();
            scrollToSeries(series);
          }}
        >
          {series}
        </Link>
      ))}
    </>
  );
}
