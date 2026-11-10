"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = {
  id: string;
  label: string;
  caption: string;
  image: string;
  imageAlt: string;
};

const SLIDES: Slide[] = [
  {
    id: "terrace",
    label: "Terrace",
    caption: "Ivory knit, navy trouser",
    image: "/world/hero.webp",
    imageAlt: "A man in an ivory knit and navy trousers, standing full length on a stone terrace above the water",
  },
  {
    id: "walk",
    label: "The walk",
    caption: "Two friends, full length",
    image: "/world/walk.webp",
    imageAlt: "A woman in a navy suit and a man in an ivory knit walking and talking on a masonry street",
  },
  {
    id: "table",
    label: "The table",
    caption: "A shared table",
    image: "/world/gathering.webp",
    imageAlt: "Four adults talking at a shaded garden table",
  },
  {
    id: "water",
    label: "The water",
    caption: "Morning water",
    image: "/world/coast.webp",
    imageAlt: "A quiet shore, pale sand, clear water, and a green headland",
  },
];

const AUTOPLAY_MS = 7000;

export function EditorialHero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manualRef = useRef(false);
  const heroRef = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setPlaying(false);
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setPlaying(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const announce = useCallback((index: number) => {
    const slide = SLIDES[index];
    setAnnouncement(`${slide.label}. ${slide.caption}. Slide ${index + 1} of ${SLIDES.length}.`);
  }, []);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const go = useCallback(
    (index: number) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      manualRef.current = true;
      setPlaying(false);
      setActive(next);
      announce(next);
    },
    [announce],
  );

  useEffect(() => {
    if (!playing || reducedMotion) return;
    timerRef.current = setTimeout(() => advance(), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, reducedMotion, active, advance]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setPlaying(false);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slide = SLIDES[active];

  function onPointerDown(event: PointerEvent) {
    drag.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent) {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    go(active + (dx < 0 ? 1 : -1));
  }

  return (
    <section
      ref={heroRef}
      aria-label="Campaign"
      aria-roledescription="carousel"
      className="bg-[#f3eee6]"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => {
        if (!manualRef.current && !reducedMotion) setPlaying(true);
      }}
      onFocus={() => setPlaying(false)}
    >
      <div className="mx-auto w-full max-w-[1480px] md:grid md:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] md:items-start md:gap-x-8 md:px-8 md:py-8 lg:gap-x-12 lg:px-12 lg:py-10">
        <div
          className="relative aspect-[16/9] w-full touch-pan-y overflow-hidden bg-[#e7e1d6] md:col-start-2 md:row-start-1"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0"
              style={{
                opacity: i === active ? 1 : 0,
                transition: reducedMotion ? "none" : "opacity 650ms ease",
              }}
              aria-hidden={i !== active}
            >
              <Image
                src={s.image}
                alt={i === active ? s.imageAlt : ""}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 58vw, 100vw"
                className={`object-contain object-center ${i === active && !reducedMotion ? "ms-hero-img-settle" : ""}`}
              />
            </div>
          ))}
          <div className="absolute bottom-2 left-2 z-10 flex bg-[#f5f0e8]/90">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous campaign"
              className="grid h-11 w-11 place-items-center text-[#1c1a17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B03236]"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next campaign"
              className="grid h-11 w-11 place-items-center text-[#1c1a17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B03236]"
            >
              <ChevronRight className="size-4" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => {
                  manualRef.current = false;
                  setPlaying((p) => !p);
                }}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="grid h-11 w-11 place-items-center text-[#1c1a17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B03236]"
              >
                {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </button>
            )}
          </div>
        </div>

        <div className="px-3 py-2 md:col-start-2 md:row-start-2 md:px-0 md:pt-3">
          <div className="flex gap-1" role="tablist" aria-label="Campaign slides">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`slide-${s.id}`}
                aria-label={s.label}
                onClick={() => go(i)}
                className={`relative h-12 min-w-0 flex-1 overflow-hidden bg-[#e7e1d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] ${i === active ? "ring-2 ring-[#B03236] ring-inset" : "opacity-60"}`}
              >
                <Image src={s.image} alt="" fill sizes="72px" className="object-cover object-[center_30%]" />
              </button>
            ))}
          </div>
        </div>

        <div
          key={slide.id}
          id={`slide-${slide.id}`}
          role="tabpanel"
          aria-label={slide.label}
          className="px-5 pb-8 pt-3 md:col-start-1 md:row-start-1 md:row-span-2 md:self-center md:px-2 md:py-4 lg:px-4"
        >
          <p className="ms-hero-text-rise flex items-center gap-3 text-[11px] tracking-[0.28em] text-[#1c1a17] uppercase" style={{ animationDelay: "40ms" }}>
            <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
            Once sinner. Made Saint.
          </p>

          <h1
            className="mt-4 font-serif leading-[0.92] tracking-[-0.045em] text-[#1c1a17]"
            style={{ fontSize: "clamp(40px, 5vw, 84px)" }}
          >
            <span className="ms-hero-text-rise block" style={{ animationDelay: "120ms" }}>
              You are
            </span>
            <span className="ms-hero-text-rise block" style={{ animationDelay: "220ms" }}>
              what you become.
            </span>
          </h1>

          <p className="ms-hero-text-rise mt-4 max-w-sm text-[16px] leading-relaxed text-[#1c1a17]/75 md:text-[17px]" style={{ animationDelay: "320ms" }}>
            A wardrobe for the person you’re becoming.
          </p>

          <p className="ms-hero-text-rise mt-4 text-[12px] tracking-[0.16em] text-[#1c1a17]/70 uppercase" style={{ animationDelay: "400ms" }}>
            {slide.caption}
          </p>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#1c1a17]/55">
            Campaign frames. Not a finished location shoot.
          </p>

          <div className="ms-hero-text-rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "480ms" }}>
            <Link
              href="/shop#1101"
              className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.16em] text-[#f5f0e8] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Explore 1101
            </Link>
            <Link
              href="/wardrobe"
              className="inline-flex h-12 items-center px-3 text-[12px] tracking-[0.14em] text-[#1c1a17]/70 uppercase underline decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Private Wardrobe
            </Link>
          </div>
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
    </section>
  );
}
