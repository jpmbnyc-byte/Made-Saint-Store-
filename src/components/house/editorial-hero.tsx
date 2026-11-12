"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { CampaignBanner } from "@/components/house/campaign-banner";
import { lookBySlug, lookPriceLine, customerStatus } from "@/lib/line-shop";
import { lineByRef } from "@/lib/line";

type Slide = {
  id: string;
  label: string;
  caption: string;
  image: string;
  imageAlt: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    id: "solene",
    label: "Jersey",
    caption: "Solène, printed jersey",
    image: "/collection/solene.webp",
    imageAlt: "Solène in the printed jersey over a white shirt, navy tie, and black trousers",
    href: "/line/looks/solene",
  },
  {
    id: "sage",
    label: "Sage",
    caption: "Ren, sage set",
    image: "/collection/sage.webp",
    imageAlt: "Ren in a sage fleece set, pale yellow turtleneck, and a yellow barrel bag, walking stairs",
    href: "/line/looks/sage",
  },
  {
    id: "forerunner",
    label: "Forerunner",
    caption: "Inès, Saint John",
    image: "/collection/forerunner.webp",
    imageAlt: "Inès in the camel Saint John jacket, the back print facing the camera",
    href: "/line/looks/forerunner",
  },
  {
    id: "olive",
    label: "Olive",
    caption: "Lucien, olive set",
    image: "/collection/olive.webp",
    imageAlt: "Lucien in an olive zip set and olive mules, seated at a boathouse",
    href: "/line/looks/olive",
  },
  {
    id: "camel",
    label: "Camel",
    caption: "Solène, camel set",
    image: "/collection/camel.webp",
    imageAlt: "Solène in a camel zip jacket and matching trouser, with bronze 1101 runners, in the limestone arcade",
    href: "/line/looks/camel",
  },
  {
    id: "parachute",
    label: "Jersey",
    caption: "Amara, jersey and navy",
    image: "/collection/parachute.webp",
    imageAlt: "Amara in the printed jersey over a white shirt and navy tie, with navy parachute trousers and navy 1101 runners",
    href: "/line/looks/parachute",
  },
  {
    id: "rust",
    label: "Rust",
    caption: "Inès, rust cord",
    image: "/collection/rust.webp",
    imageAlt: "Inès walking in a rust cord zip jacket and matching trousers, with blush 1101 runners, in the limestone arcade",
    href: "/line/looks/rust",
  },
  {
    id: "forest",
    label: "Velvet",
    caption: "Solène, forest velvet",
    image: "/collection/forest.webp",
    imageAlt: "Solène in a forest velvet zip jacket and matching trousers, with teal 1101 runners, in the limestone arcade",
    href: "/line/looks/forest",
  },
];

const AUTOPLAY_MS = 7000;

function chipPrice(ref: string) {
  const product = lineByRef(ref);
  const status = product ? customerStatus(product) : null;
  return status?.price ?? undefined;
}

const MILOT_CHIPS = [
  { href: "/line/looks/solene", label: "Jersey", price: chipPrice("R010") },
  { href: "/line/looks/sage", label: "Sage", price: chipPrice("N014") },
  { href: "/line/looks/forerunner", label: "Saint John", price: chipPrice("R035") },
  { href: "/line/looks/olive", label: "Olive mule", price: chipPrice("R046") },
  { href: "/line/r067", label: "Duffel", price: chipPrice("R067") },
];

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

  const look = lookBySlug(slide.id);
  const lookPrice = look ? lookPriceLine(look) : null;

  return (
    <>
    <CampaignBanner
      src="/world/milot.webp"
      alt="Campaign visualization — Cast 003 in the ruins at Milot, Campaign 001"
      kicker="MADE SAiNT"
      title="Once sinner. Made Saint."
      body="Campaign visualization. Explore the 1101, or open the collection."
      chips={MILOT_CHIPS}
      primary={{ href: "/shop#1101", label: "Explore 1101" }}
      secondary={{ href: "/line", label: "View the collection" }}
      priority
      tall
      heading="h1"
    />
    <section
      ref={heroRef}
      aria-label="Campaign looks"
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
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Campaign slides">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`slide-${s.id}`}
                aria-label={s.label}
                onClick={() => go(i)}
                className={`relative h-12 w-11 shrink-0 overflow-hidden bg-[#e7e1d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B03236] md:h-14 md:w-auto md:min-w-0 md:flex-1 ${i === active ? "ring-2 ring-[#B03236] ring-inset" : "opacity-60"}`}
              >
                <Image src={s.image} alt="" fill sizes="72px" className="object-cover object-[center_18%]" />
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
          <p className="ms-kicker ms-hero-text-rise flex items-center gap-3 text-[#1c1a17]" style={{ animationDelay: "40ms" }}>
            <span aria-hidden="true" className="inline-block h-px w-6 bg-[#B03236]" />
            Once sinner. Made Saint.
          </p>

          <h2 className="ms-title mt-4">
            <span className="ms-hero-text-rise block" style={{ animationDelay: "120ms" }}>
              {slide.caption}
            </span>
          </h2>

          <p className="ms-lede ms-hero-text-rise mt-4 max-w-sm" style={{ animationDelay: "320ms" }}>
            The collection, worn. Open a look to view the pieces. Garments are made through an enquiry.
          </p>

          {lookPrice && (
            <p className="ms-meta ms-hero-text-rise mt-4 text-[#1c1a17]/70" style={{ animationDelay: "400ms" }}>
              {lookPrice}
            </p>
          )}

          <div className="ms-hero-text-rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "480ms" }}>
            <Link
              href={slide.href}
              className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
            >
              Shop the look
            </Link>
            <Link
              href="/wardrobe"
              className="ms-link h-12 px-3 text-[#1c1a17]/70 decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
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
    </>
  );
}
