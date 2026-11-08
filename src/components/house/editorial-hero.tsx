"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  titleItalic?: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image: string;
  imageMobile: string;
  imageAlt: string;
  imagePosition?: string;
  bg: string;
  textTone: "light" | "dark";
  accentColor: string;
};

const SLIDES: Slide[] = [
  {
    id: "runner-1101",
    label: "1101",
    eyebrow: "INAUGURAL SERIES",
    title: "1101",
    body: "A life becoming.",
    primaryHref: "/shop",
    primaryLabel: "Request this pair",
    secondaryHref: "/wardrobe",
    secondaryLabel: "Private Wardrobe",
    image: "/stories/chalk-threequarter.webp",
    imageMobile: "/stories/chalk-navy.webp",
    imageAlt: "MADE SAiNT 1101 founding runner, Chalk colorway, three-quarter view",
    imagePosition: "object-center",
    bg: "#1a2232",
    textTone: "light",
    accentColor: "#B03236",
  },
  {
    id: "private-wardrobe",
    label: "Private Wardrobe",
    eyebrow: "PRIVATE WARDROBE",
    title: "A wardrobe,",
    titleItalic: "considered around you.",
    body: "One person coordinates the days. A conversation is remote. A fitting is arranged.",
    primaryHref: "/wardrobe",
    primaryLabel: "Discover",
    secondaryHref: "/wardrobe#introduction",
    secondaryLabel: "Request an introduction",
    image: "/wardrobe/arrival-trouser-look.webp",
    imageMobile: "/wardrobe/arrival-trouser-look.webp",
    imageAlt: "Full-length editorial wardrobe look — arrival trouser set",
    imagePosition: "object-top",
    bg: "#2a3030",
    textTone: "light",
    accentColor: "#c0a477",
  },
];

const AUTOPLAY_MS = 8000;
const CROSSFADE_MS = 650;

export function EditorialHero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manualRef = useRef(false);
  const heroRef = useRef<HTMLElement>(null);

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

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const go = useCallback((index: number) => {
    manualRef.current = true;
    setPlaying(false);
    setActive(index);
  }, []);

  const prev = useCallback(() => {
    manualRef.current = true;
    setPlaying(false);
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    manualRef.current = true;
    setPlaying(false);
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  /* Autoplay timer */
  useEffect(() => {
    if (!playing || reducedMotion) return;
    timerRef.current = setTimeout(() => advance(), AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, reducedMotion, active, advance]);

  /* Pause when hidden */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* Intersection observer — pause when off screen */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setPlaying(false); },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slide = SLIDES[active];
  return (
    <section
      ref={heroRef}
      aria-label="Featured editorial"
      className="relative overflow-hidden"
      style={{ minHeight: "min(90svh, 900px)", backgroundColor: slide.bg }}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => { if (!manualRef.current && !reducedMotion) setPlaying(true); }}
      onFocus={() => setPlaying(false)}
    >
      {/* Background images — crossfade */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="ms-slide"
            style={{
              opacity: i === active ? 1 : 0,
              zIndex: i === active ? 1 : 0,
              transition: reducedMotion ? "none" : `opacity ${CROSSFADE_MS}ms ease`,
            }}
          >
            {/* Light pool — decorative */}
            {i === active && (
              <div
                className="ms-light-pool"
                style={{
                  width: "60vw",
                  height: "60vw",
                  background: "radial-gradient(circle, rgba(255,248,220,0.18), transparent 70%)",
                  top: "-10%",
                  left: "-5%",
                }}
              />
            )}
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              sizes="100vw"
              className={`object-cover ${s.imagePosition ?? "object-center"}`}
              priority={i === 0}
              style={{ opacity: 0.72 }}
            />
            {/* Gradient overlay — ensures text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.12) 100%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ backgroundImage: "url('/brand/grain.svg')", backgroundSize: "180px 180px", opacity: 0.07 }}
      />

      {/* Content */}
      <div className="relative z-[3] flex h-full min-h-[inherit] flex-col">
        {/* Main editorial content */}
        <div className="flex flex-1 items-end px-6 pb-20 pt-24 md:items-center md:px-16 md:pb-32 md:pt-32 lg:px-24">
          <div className="max-w-[520px]">
            {/* Eyebrow */}
            <p
              className="text-[11px] tracking-[0.32em] uppercase"
              style={{ color: slide.accentColor }}
            >
              {slide.eyebrow}
            </p>

            {/* Title */}
            <h1
              className="mt-4 font-serif leading-[0.93]"
              style={{
                color: "#f5f0e8",
                fontSize: "clamp(60px, 8vw, 112px)",
                letterSpacing: "-0.04em",
              }}
            >
              {slide.title}
              {slide.titleItalic && (
                <span className="block italic">{slide.titleItalic}</span>
              )}
            </h1>

            {/* Body */}
            <p
              className="mt-5 max-w-sm text-[16px] leading-relaxed"
              style={{ color: "rgba(245, 240, 232, 0.80)" }}
            >
              {slide.body}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={slide.primaryHref}
                className="inline-flex h-12 items-center bg-[#f5f0e8] px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
              >
                {slide.primaryLabel}
              </Link>
              {slide.secondaryHref && slide.secondaryLabel && (
                <Link
                  href={slide.secondaryHref}
                  className="inline-flex h-12 items-center border border-[rgba(245,240,232,0.40)] px-6 text-[12px] tracking-[0.18em] text-[#f5f0e8] uppercase transition-opacity hover:border-[rgba(245,240,232,0.70)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f0e8]"
                >
                  {slide.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Controls dock */}
        <div
          className="relative z-[4] flex items-center justify-between gap-4 px-6 py-5 md:px-16 lg:px-24"
          style={{
            background: "rgba(26, 34, 50, 0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(245, 240, 232, 0.10)",
          }}
        >
          {/* Slide selectors — labelled buttons */}
          <div className="flex items-center gap-1" role="tablist" aria-label="Editorial slide navigation">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                aria-controls={`slide-${s.id}`}
                onClick={() => go(i)}
                className="relative h-10 px-4 text-[11px] tracking-[0.18em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f0e8]"
                style={{
                  color: i === active ? "#f5f0e8" : "rgba(245, 240, 232, 0.50)",
                  borderBottom: i === active ? "1px solid #B03236" : "1px solid transparent",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center text-[rgba(245,240,232,0.60)] transition-colors hover:text-[#f5f0e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f5f0e8]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center text-[rgba(245,240,232,0.60)] transition-colors hover:text-[#f5f0e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f5f0e8]"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Play / Pause — only shown when autoplay is available */}
            {!reducedMotion && (
              <button
                onClick={() => {
                  manualRef.current = false;
                  setPlaying((p) => !p);
                }}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="grid h-10 w-10 place-items-center text-[rgba(245,240,232,0.60)] transition-colors hover:text-[#f5f0e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f5f0e8]"
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hidden live region — does NOT announce automatic changes */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id={`slide-${slide.id}`}
      >
        {/* Only populated on explicit user navigation, not autoplay — controlled by aria-selected */}
      </div>
    </section>
  );
}
