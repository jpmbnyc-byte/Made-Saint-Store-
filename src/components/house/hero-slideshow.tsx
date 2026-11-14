"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { HOME_HERO_SLIDES } from "@/lib/home-hero-slides";
import { copy } from "@/lib/copy";

const INTERVAL_MS = 6500;

/**
 * Full-viewport swipeable home hero.
 * Touch swipe, arrows, dots, keyboard, and gentle autoplay.
 */
export function HeroSlideshow() {
  const slides = HOME_HERO_SLIDES;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useRef(false);

  const select = useCallback(
    (next: number) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion.current) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || reduceMotion.current) return;
    const id = window.setInterval(() => select(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, index, select]);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      select(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      select(slides.length - 1);
    }
  }

  const slide = slides[index]!;

  return (
    <section
      className="relative bg-[#1c1a17] text-[#f5f0e8] outline-none"
      aria-label="MADE SAiNT campaign"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <h1 className="sr-only">
        {copy.home.hero.heading} {copy.home.runner.heading}
      </h1>

      <div
        className="relative h-[min(92dvh,1100px)] w-full overflow-hidden md:h-[min(88dvh,980px)]"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => {
          if (!reduceMotion.current) setPlaying(true);
        }}
        onTouchStart={(event) => {
          touch.current = { x: event.touches[0]!.clientX, y: event.touches[0]!.clientY };
        }}
        onTouchEnd={(event) => {
          if (!touch.current) return;
          const dx = event.changedTouches[0]!.clientX - touch.current.x;
          const dy = event.changedTouches[0]!.clientY - touch.current.y;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.35) {
            select(index + (dx < 0 ? 1 : -1));
          }
          touch.current = null;
        }}
      >
        {slides.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            {item.desktopSrc ? (
              <>
                <Image
                  src={item.src}
                  alt={i === index ? item.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={90}
                  className="object-cover md:hidden"
                  style={{ objectPosition: item.position ?? "center" }}
                  draggable={false}
                />
                <Image
                  src={item.desktopSrc}
                  alt={i === index ? item.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={90}
                  className="hidden object-cover md:block"
                  style={{ objectPosition: item.position ?? "center" }}
                  draggable={false}
                />
              </>
            ) : (
              <Image
                src={item.src}
                alt={i === index ? item.alt : ""}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={90}
                className="object-cover"
                style={{ objectPosition: item.position ?? "center" }}
                draggable={false}
              />
            )}
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1c1a17cc] to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 md:px-10 md:pb-8">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="pointer-events-auto max-w-xl">
              <p className="text-[11px] tracking-[0.22em] text-[#f5f0e8]/75 uppercase">
                {copy.home.hero.eyebrow}
              </p>
              <p className="mt-2 font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
                {slide.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={slide.href}
                  className="inline-flex h-12 items-center bg-[#f5f0e8] px-5 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase transition-opacity hover:opacity-90"
                >
                  {index === 0 ? copy.home.hero.primaryAction : `View ${slide.label}`}
                </Link>
                <Link
                  href="/line"
                  className="inline-flex h-12 items-center border-b border-[#f5f0e8]/70 px-1 text-[11px] tracking-[0.16em] text-[#f5f0e8] uppercase"
                >
                  {copy.home.hero.secondaryAction}
                </Link>
              </div>
            </div>

            <div className="pointer-events-auto flex items-center gap-3 self-end md:self-auto">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-[#f5f0e8]/35 text-[#f5f0e8]"
                aria-label="Previous slide"
                onClick={() => select(index - 1)}
              >
                ‹
              </button>
              <p className="min-w-[4.5rem] text-center text-[11px] tracking-[0.16em] tabular-nums uppercase" aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-[#f5f0e8]/35 text-[#f5f0e8]"
                aria-label="Next slide"
                onClick={() => select(index + 1)}
              >
                ›
              </button>
              <button
                type="button"
                className="ml-1 inline-flex h-11 items-center px-3 text-[10px] tracking-[0.16em] text-[#f5f0e8]/80 uppercase"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                onClick={() => setPlaying((value) => !value)}
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-[1440px] gap-1.5" role="tablist" aria-label="Hero slides">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${item.label}`}
                className={`h-1 flex-1 transition-colors ${i === index ? "bg-[#f5f0e8]" : "bg-[#f5f0e8]/30"}`}
                onClick={() => select(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
