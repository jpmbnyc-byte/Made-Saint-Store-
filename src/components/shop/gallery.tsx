"use client";

import { useMemo, useState } from "react";
import type { CatalogView } from "@/lib/catalog";

function rank(view: CatalogView) {
  if (view.id === "detail") return 0;
  if (view.id === "study") return 1;
  if (view.id === "threequarter") return 2;
  if (view.id === "reverse") return 3;
  if (view.id === "hero") return 4;
  return 5;
}

export function ProductGallery({ views }: { views: CatalogView[] }) {
  const ordered = useMemo(() => {
    const next = [...views];
    next.sort((a, b) => rank(a) - rank(b));
    // Keep a full product/overhead near the front when present, after the first detail.
    const product = next.find((view) => view.id === "product");
    if (product && next[0]?.id === "detail") {
      const without = next.filter((view) => view !== product);
      without.splice(1, 0, product);
      return without;
    }
    return next;
  }, [views]);

  const [active, setActive] = useState(0);
  const current = ordered[active] ?? ordered[0];
  const isDetail = current?.id === "detail" || current?.id === "study";

  return (
    <div className="min-w-0">
      <div className="ms-gallery-well lg:hidden">
        <div className={`relative ${isDetail ? "ms-underlit" : ""}`}>
          <img
            src={current.src}
            alt={current.alt}
            className={`aspect-[2/3] w-full object-contain ${isDetail ? "ms-detail-crop scale-[1.18] object-center" : ""}`}
          />
          <p className="absolute bottom-3 left-3 z-[3] text-[10px] tracking-[0.16em] text-[#f5f0e8]/70 uppercase">
            {current.label}
            {isDetail ? " · crop" : ""}
          </p>
        </div>
        {ordered.length > 1 && (
          <div className="flex min-w-0 gap-2 overflow-x-auto px-4 py-3">
            {ordered.map((v, i) => (
              <button
                key={`${v.src}-${v.label}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={v.label}
                aria-current={i === active}
                className={`h-16 w-14 shrink-0 bg-[#12151c] ${i === active ? "ring-1 ring-[#f5f0e8]" : "opacity-70"}`}
              >
                <img src={v.src} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden flex-col gap-3 lg:flex">
        {ordered.map((v) => {
          const detail = v.id === "detail" || v.id === "study";
          return (
            <figure key={`${v.src}-${v.label}`} className={`ms-gallery-well relative ${detail ? "ms-underlit" : ""}`}>
              <img
                src={v.src}
                alt={v.alt}
                className={`mx-auto max-h-[920px] w-full object-contain ${detail ? "ms-detail-crop scale-[1.12] object-center py-8" : ""}`}
              />
              <figcaption className="absolute bottom-3 left-3 z-[3] text-[10px] tracking-[0.16em] text-[#f5f0e8]/65 uppercase">
                {v.label}
                {detail ? " · detail" : ""}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
