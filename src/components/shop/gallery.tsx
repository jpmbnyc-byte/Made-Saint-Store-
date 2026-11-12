"use client";

import { useMemo, useState } from "react";
import type { CatalogView } from "@/lib/catalog";

/**
 * ISAIA-style sneaker media: light ground, full product reads, no dark player well,
 * no underlit crops, no overlay captions.
 */
export function ProductGallery({ views }: { views: CatalogView[] }) {
  const ordered = useMemo(() => {
    const preferred = ["hero", "product", "threequarter", "reverse", "detail", "study"];
    return [...views].sort((a, b) => {
      const ai = preferred.indexOf(a.id);
      const bi = preferred.indexOf(b.id);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [views]);

  const [active, setActive] = useState(0);
  const current = ordered[active] ?? ordered[0];
  if (!current) return null;

  return (
    <div className="min-w-0">
      {/* Mobile: one large frame + quiet thumbs */}
      <div className="lg:hidden">
        <div className="bg-[#f3f3f1]">
          <img
            src={current.src}
            alt={current.alt}
            className="aspect-[4/5] w-full object-contain object-center p-6"
          />
        </div>
        {ordered.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ordered.map((view, index) => (
              <button
                key={`${view.src}-${view.label}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={view.label}
                aria-current={index === active}
                className={`h-[72px] w-[58px] shrink-0 bg-[#f3f3f1] ${
                  index === active ? "ring-1 ring-[#1c1a17]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={view.src} alt="" className="h-full w-full object-contain p-1" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: stacked clean frames — scroll the product, not a media player */}
      <div className="hidden flex-col gap-2 lg:flex">
        {ordered.map((view) => (
          <figure key={`${view.src}-${view.label}`} className="bg-[#f3f3f1]">
            <img
              src={view.src}
              alt={view.alt}
              className="mx-auto max-h-[880px] w-full object-contain object-center p-8 xl:p-12"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
