"use client";

import { useRef, useState } from "react";

export function useSlider(count: number) {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);

  function go(next: number) {
    if (count <= 0) return;
    setIndex((next + count) % count);
  }

  const bind = {
    onPointerDown: (event: React.PointerEvent) => {
      start.current = event.clientX;
    },
    onPointerUp: (event: React.PointerEvent) => {
      if (start.current == null) return;
      const delta = event.clientX - start.current;
      start.current = null;
      if (delta > 48) go(index - 1);
      else if (delta < -48) go(index + 1);
    },
  };

  return {
    index,
    go,
    prev: () => go(index - 1),
    next: () => go(index + 1),
    bind,
  };
}

export function SliderControls({
  index,
  count,
  onPrev,
  onNext,
  onGo,
  label,
}: {
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  onGo: (index: number) => void;
  label: string;
}) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <p className="text-[11px] tracking-[0.16em] text-[#41505b] uppercase">
        {label} {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </p>
      <div className="flex items-center gap-2">
        <div className="mr-2 flex gap-1.5" role="tablist" aria-label={label}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${label} ${i + 1}`}
              onClick={() => onGo(i)}
              className={`h-1.5 w-6 ${i === index ? "bg-[#c0a477]" : "bg-[#41505b]/25"}`}
            />
          ))}
        </div>
        <button type="button" onClick={onPrev} aria-label={`Previous ${label}`} className="grid size-10 place-items-center border border-[#41505b]/25 text-[#41505b] hover:border-[#c0a477]">
          ‹
        </button>
        <button type="button" onClick={onNext} aria-label={`Next ${label}`} className="grid size-10 place-items-center border border-[#41505b]/25 text-[#41505b] hover:border-[#c0a477]">
          ›
        </button>
      </div>
    </div>
  );
}
