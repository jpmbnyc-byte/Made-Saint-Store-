"use client";

import { useState } from "react";
import type { CatalogView } from "@/lib/catalog";

export function ProductGallery({ views }: { views: CatalogView[] }) {
  const [active, setActive] = useState(0);
  const current = views[active] ?? views[0];

  return (
    <div>
      <div className="bg-[#f1eee8] lg:hidden">
        <img src={current.src} alt={current.alt} className="aspect-[3/4] w-full object-contain" />
        {views.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-4 py-3">
            {views.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={v.label}
                aria-current={i === active}
                className={`h-16 w-14 shrink-0 bg-white ${i === active ? "ring-1 ring-[#1c1a17]" : "opacity-70"}`}
              >
                <img src={v.src} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden flex-col gap-3 lg:flex">
        {views.map((v) => (
          <figure key={v.src} className="bg-[#f1eee8]">
            <img src={v.src} alt={v.alt} className="mx-auto max-h-[920px] w-full object-contain" />
          </figure>
        ))}
      </div>
    </div>
  );
}
