"use client";

import { useMemo, useState } from "react";
import type { CatalogView } from "@/lib/catalog";

/**
 * Warm Atelier sneaker media: ivory ground, editorial pair / studio toggle,
 * enlarge dialog. No dark player well, no overlay captions.
 */
export function ProductGallery({
  views,
  editorialHero,
  productName,
}: {
  views: CatalogView[];
  editorialHero?: string | null;
  productName: string;
}) {
  const ordered = useMemo(() => {
    const preferred = ["hero", "product", "threequarter", "reverse", "detail", "study"];
    return [...views].sort((a, b) => {
      const ai = preferred.indexOf(a.id);
      const bi = preferred.indexOf(b.id);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [views]);

  const hasEditorial = Boolean(editorialHero);
  const [mode, setMode] = useState<"editorial" | "studio">(hasEditorial ? "editorial" : "studio");
  const [studioIndex, setStudioIndex] = useState(0);
  const [enlarge, setEnlarge] = useState(false);

  const studio = ordered[Math.min(studioIndex, Math.max(ordered.length - 1, 0))];
  const currentSrc =
    mode === "editorial" && editorialHero ? editorialHero : studio?.src ?? editorialHero ?? "";
  const currentAlt =
    mode === "editorial" && editorialHero
      ? `${productName}, the pair`
      : studio?.alt ?? productName;

  if (!currentSrc) return null;

  return (
    <div className="group min-w-0">
      <button
        type="button"
        className="relative block w-full overflow-hidden bg-[#ece3d5]"
        style={{ aspectRatio: "0.765" }}
        onClick={() => setEnlarge(true)}
        aria-label={`Enlarge ${productName} photograph`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentSrc} alt={currentAlt} className="h-full w-full object-cover" fetchPriority="high" />
        <span className="absolute right-3 bottom-3 bg-[#f6f2eb] px-2.5 py-2 text-[11px] tracking-[0.14em] text-[#352a23] uppercase opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          Enlarge
        </span>
      </button>

      <div className="mt-4 flex items-center gap-5 text-[10px] tracking-[0.12em] text-[#75695d] uppercase md:text-[11px]">
        {hasEditorial ? (
          <>
            <button
              type="button"
              className={`pb-1 ${mode === "editorial" ? "border-b border-[#352a23] text-[#352a23]" : ""}`}
              onClick={() => setMode("editorial")}
            >
              The pair
            </button>
            <button
              type="button"
              className={`pb-1 ${mode === "studio" ? "border-b border-[#352a23] text-[#352a23]" : ""}`}
              onClick={() => setMode("studio")}
            >
              Studio view
            </button>
            <span className="ml-auto tabular-nums">{mode === "editorial" ? "01" : "02"} / 02</span>
          </>
        ) : (
          <span className="ml-auto">Studio view</span>
        )}
      </div>

      {ordered.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ordered.map((view, index) => {
            const active = mode === "studio" && index === studioIndex;
            return (
              <button
                key={`${view.src}-${view.label}-${index}`}
                type="button"
                onClick={() => {
                  setStudioIndex(index);
                  setMode("studio");
                }}
                aria-label={view.label}
                aria-pressed={active}
                className={`relative h-16 w-16 shrink-0 overflow-hidden bg-[#ece3d5] ${active ? "ring-1 ring-[#352a23]" : "opacity-75 hover:opacity-100"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={view.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-3 hidden flex-col gap-2 lg:flex">
        {ordered.slice(0, 3).map((view, index) => (
          <figure key={`${view.src}-stack-${index}`} className="bg-[#ece3d5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={view.src}
              alt={view.alt}
              className="mx-auto max-h-[720px] w-full object-contain object-center p-8 xl:p-10"
              loading="lazy"
            />
          </figure>
        ))}
      </div>

      {enlarge ? (
        <dialog
          open
          className="fixed inset-0 z-[80] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-[#261e16a8] p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setEnlarge(false);
          }}
          onCancel={(event) => {
            event.preventDefault();
            setEnlarge(false);
          }}
        >
          <div className="relative max-h-[90dvh] w-full max-w-[1000px] border border-[#dfd6ca] bg-[#f6f2eb] p-4 md:p-8">
            <button
              type="button"
              className="absolute top-3 right-3 z-10 px-2 text-[11px] tracking-[0.16em] uppercase"
              onClick={() => setEnlarge(false)}
            >
              Close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentSrc} alt={`${productName}, enlarged`} className="mx-auto max-h-[80dvh] object-contain" />
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
