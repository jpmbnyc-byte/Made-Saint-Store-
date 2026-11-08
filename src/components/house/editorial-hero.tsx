"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = {
  id: string;
  label: string;
  eyebrow: string;
  title: [string, string];
  body: string;
  caption?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image: string;
  imageAlt: string;
  fit: "contain" | "cover";
  tone: "stone" | "ink";
};

const SLIDES: Slide[] = [
  {
    id: "runner-0929",
    label: "0929",
    eyebrow: "Once sinner. Made Saint.",
    title: ["You are", "what you become."],
    body: "A wardrobe for the person you’re becoming.",
    caption: "0929 v1 — Navy / Ivory",
    primaryHref: "/shop/ms-runner-chalk-navy",
    primaryLabel: "Discover 0929",
    secondaryHref: "/wardrobe",
    secondaryLabel: "Private Wardrobe",
    image: "/hero/navy-ivory.webp",
    imageAlt: "MADE SAiNT 0929 Runner — Navy / Ivory, with the MADE SAINT tongue mark, on limestone",
    fit: "contain",
    tone: "stone",
  },
  {
    id: "private-wardrobe",
    label: "Private Wardrobe",
    eyebrow: "Private Wardrobe",
    title: ["A wardrobe,", "considered around you."],
    body: "One person coordinates the days. Made to order, ready in 4 to 6 weeks. A fitting is remote, and it is not held in person.",
    primaryHref: "/wardrobe",
    primaryLabel: "Discover",
    secondaryHref: "/wardrobe#introduction",
    secondaryLabel: "Request an introduction",
    image: "/editorial/saint-john-worn.webp",
    imageAlt: "MADE SAiNT Saint John The Forerunner — camel wool jacket and trouser, worn editorial against limestone columns",
    fit: "cover",
    tone: "ink",
  },
];

const AUTOPLAY_MS = 8000;

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
  const stone = slide.tone === "stone";
  const ink = stone ? "#1c1a17" : "#f5f0e8";
  const muted = stone ? "rgba(28,26,23,0.72)" : "rgba(245,240,232,0.78)";

  return (
    <section
      ref={heroRef}
      aria-label="Featured editorial"
      aria-roledescription="carousel"
      className="relative overflow-hidden"
      style={{ backgroundColor: stone ? "#d4c3b2" : "#1a2232" }}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => {
        if (!manualRef.current && !reducedMotion) setPlaying(true);
      }}
      onFocus={() => setPlaying(false)}
    >
      <div className="md:grid md:min-h-[min(88svh,840px)] md:grid-cols-[minmax(300px,0.86fr)_minmax(0,1.14fr)] md:items-stretch">
        <div
          className={`relative order-1 w-full overflow-hidden md:order-2 md:h-full md:aspect-auto ${stone ? "aspect-[1024/571] ms-hero-stone-fade" : "aspect-square"}`}
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
                key={`${s.id}-${i === active ? "on" : "off"}`}
                src={s.image}
                alt={i === active ? s.imageAlt : ""}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`${s.fit === "contain" ? "object-contain object-center" : "object-cover object-[center_20%]"} ${i === active ? "ms-hero-img-settle" : ""}`}
              />
            </div>
          ))}
          <div className="ms-hero-atmosphere" aria-hidden="true" />
          {!stone && (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,34,50,0.92) 0%, rgba(26,34,50,0.28) 42%, rgba(26,34,50,0.12) 100%)",
              }}
            />
          )}
        </div>

        <div
          key={slide.id}
          id={`slide-${slide.id}`}
          role="tabpanel"
          aria-label={slide.label}
          className="relative z-[3] order-2 px-5 pb-8 pt-7 md:order-1 md:flex md:items-center md:px-12 md:py-16 lg:px-16"
        >
          <div className="max-w-[34rem]">
            <p
              className="ms-hero-text-rise flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase"
              style={{ color: ink, animationDelay: "40ms" }}
            >
              <span aria-hidden="true" className="inline-block h-px w-6" style={{ background: "#B03236" }} />
              {slide.eyebrow}
            </p>

            <h1
              className="mt-4 font-serif leading-[0.9] tracking-[-0.045em]"
              style={{ color: ink, fontSize: "clamp(52px, 7.4vw, 104px)" }}
            >
              <span className="ms-hero-text-rise block" style={{ animationDelay: "120ms" }}>
                {slide.title[0]}
              </span>
              <span className="ms-hero-text-rise block" style={{ animationDelay: "240ms" }}>
                {slide.title[1]}
              </span>
            </h1>

            <p
              className="ms-hero-text-rise mt-5 max-w-sm text-[16px] leading-relaxed md:text-[17px]"
              style={{ color: muted, animationDelay: "380ms" }}
            >
              {slide.body}
            </p>

            {slide.caption && (
              <p
                className="ms-hero-text-rise mt-4 text-[12px] tracking-[0.16em] uppercase"
                style={{ color: muted, animationDelay: "480ms" }}
              >
                {slide.caption}
              </p>
            )}

            <div className="ms-hero-text-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "560ms" }}>
              <Link
                href={slide.primaryHref}
                className="inline-flex h-12 items-center px-6 text-[12px] tracking-[0.16em] uppercase transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
                style={{
                  background: stone ? "#1c1a17" : "#f5f0e8",
                  color: stone ? "#f5f0e8" : "#1c1a17",
                }}
              >
                {slide.primaryLabel}
              </Link>
              {slide.secondaryHref && slide.secondaryLabel && (
                <Link
                  href={slide.secondaryHref}
                  className="inline-flex h-12 items-center px-3 text-[12px] tracking-[0.14em] uppercase underline decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
                  style={{ color: muted }}
                >
                  {slide.secondaryLabel}
                </Link>
              )}
            </div>

            <div className="mt-8 flex items-center gap-1" role="tablist" aria-label="Editorial slide navigation">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`slide-${s.id}`}
                  onClick={() => go(i)}
                  className="inline-flex h-11 items-center px-3 text-[11px] tracking-[0.16em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236]"
                  style={{
                    color: i === active ? ink : muted,
                    boxShadow: i === active ? "inset 0 -1px 0 #B03236" : undefined,
                  }}
                >
                  {s.label}
                </button>
              ))}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid h-11 w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B03236]"
                style={{ color: muted }}
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid h-11 w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B03236]"
                style={{ color: muted }}
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
                  className="grid h-11 w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B03236]"
                  style={{ color: muted }}
                >
                  {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
