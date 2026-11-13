"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play, X } from "lucide-react";
import { tonalRunner, tonalRunnerHref } from "@/lib/tonal-runners";

export const TONAL_COLORS = [
  { id: "carbon", name: "Carbon", description: "Soft charcoal black", hex: "#30312e" },
  { id: "midnight", name: "Midnight", description: "Deep navy", hex: "#1b283d" },
  { id: "indigo", name: "Indigo", description: "Muted blue", hex: "#758393" },
  { id: "camel", name: "Camel", description: "Warm camel", hex: "#b98958" },
  { id: "sand", name: "Sand", description: "Pale taupe beige", hex: "#b7a28e" },
  { id: "ivory", name: "Ivory", description: "Warm off white", hex: "#e9dfcc" },
  { id: "olive", name: "Olive", description: "Muted earthy grey olive", hex: "#646650" },
] as const;

const INTERVAL = 8000;

function Icon({ as: Component }: { as: typeof ArrowLeft }) {
  return <Component size={25} strokeWidth={1} aria-hidden="true" />;
}

function Swatches({ index, onSelect }: { index: number; onSelect: (index: number) => void }) {
  return (
    <div className="swatches" role="group" aria-label="Choose a colorway">
      {TONAL_COLORS.map((color, i) => (
        <button
          key={color.id}
          type="button"
          className={`swatch${i === index ? " selected" : ""}`}
          aria-label={`${color.name}, ${color.description}`}
          aria-pressed={i === index}
          title={color.name}
          onClick={() => onSelect(i)}
        >
          <span style={{ backgroundColor: color.hex }} />
        </button>
      ))}
    </div>
  );
}

export function TonalSlideshow({ onIndex, onRequest }: { onIndex?: (index: number) => void; onRequest: (index: number) => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const explore = useRef<HTMLButtonElement>(null);
  const touch = useRef<[number, number] | null>(null);
  const elapsedRef = useRef(0);
  const onIndexRef = useRef(onIndex);
  onIndexRef.current = onIndex;
  const color = TONAL_COLORS[index];
  const runner = tonalRunner(color.id);
  const active = playing && !hovered && !pageHidden && !detailOpen && assetsReady;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off = new URLSearchParams(window.location.search).get("autoplay") === "off";
    if (!reduce && !off) setPlaying(true);
    let pending = TONAL_COLORS.length;
    for (const item of TONAL_COLORS) {
      const image = new Image();
      const done = () => {
        pending -= 1;
        if (pending === 0) setAssetsReady(true);
      };
      image.onload = done;
      image.onerror = done;
      image.src = `/editorial/tonal/${item.id}.webp`;
    }
    const change = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);

  useEffect(() => {
    onIndexRef.current?.(index);
  }, [index]);

  useEffect(() => {
    if (!active) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const next = elapsedRef.current + (now - last);
      last = now;
      if (next >= INTERVAL) {
        elapsedRef.current = 0;
        setElapsed(0);
        setIndex((value) => (value + 1) % TONAL_COLORS.length);
      } else {
        elapsedRef.current = next;
        setElapsed(next);
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (detailOpen) {
      if (!node.open) node.showModal();
      document.body.style.overflow = "hidden";
    } else if (node.open) {
      node.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [detailOpen]);

  function select(value: number) {
    setIndex((value + TONAL_COLORS.length) % TONAL_COLORS.length);
    elapsedRef.current = 0;
    setElapsed(0);
    setPlaying(false);
  }

  function openDetails() {
    setPlaying(false);
    setDetailOpen(true);
  }

  function closeDetails() {
    setDetailOpen(false);
    explore.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (detailOpen) return;
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
      select(TONAL_COLORS.length - 1);
    }
    if (event.key === "Enter" || event.key === " ") {
      // handled by explore / photo buttons
    }
  }

  return (
    <>
      <section id="style" className="ms-tonal scroll-mt-28" aria-label="The Tonal Collection" aria-roledescription="carousel" onKeyDown={onKeyDown}>
        <div className="mx-auto max-w-[1100px] px-5 pb-6 pt-10 md:px-8 md:pb-8 md:pt-12">
          <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Step 03 · Color</p>
          <p className="mt-3 max-w-2xl font-serif text-4xl leading-[0.95] text-[#1c1a17] md:text-5xl">The Tonal Collection.</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
            One jacket and trouser silhouette in seven tones. Open a color to inspect the study, then carry it into your wardrobe enquiry with a matching runner.
          </p>
        </div>
        <div
          className="hero"
          aria-label={`${color.name} editorial`}
          onTouchStart={(event) => {
            touch.current = [event.touches[0].clientX, event.touches[0].clientY];
          }}
          onTouchEnd={(event) => {
            if (!touch.current || detailOpen) return;
            const dx = event.changedTouches[0].clientX - touch.current[0];
            const dy = event.changedTouches[0].clientY - touch.current[1];
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) select(index + (dx < 0 ? 1 : -1));
            touch.current = null;
          }}
        >
          <button type="button" className="photography" aria-label={`Open ${color.name} study`} onClick={openDetails}>
            {TONAL_COLORS.map((item, i) => (
              <img
                key={item.id}
                className={`editorial-photo${i === index ? " is-visible" : ""}`}
                src={`/editorial/tonal/${item.id}.webp`}
                alt={i === index ? `${item.name} collared jacket and pleated trouser, a garment study. Not a client.` : ""}
                aria-hidden={i !== index}
                fetchPriority={i === 0 ? "high" : "auto"}
                draggable={false}
              />
            ))}
          </button>
          <div className="editorial-copy">
            <p className="eyebrow">Silk-cashmere direction</p>
            <h2>
              <span>Made for</span>
              <span>the everyday.</span>
            </h2>
            <p className="collection-title">The Tonal Collection</p>
            <p className="study-note">
              A garment study for an athletic, tall physique — longer sleeve and rise, structured shoulder, tailored ease. Click the photograph to enlarge.
            </p>
            {runner ? (
              <p className="study-note">
                Matching runner: {runner.name} · {runner.price}
              </p>
            ) : null}
            <button ref={explore} className="explore" type="button" onClick={openDetails}>
              <span>Explore {color.name}</span>
              <Icon as={ArrowRight} />
            </button>
          </div>
        </div>
        <div id="colors" className="control-rail scroll-mt-28" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div className="color-caption" aria-live={playing ? "off" : "polite"}>
            <strong>{color.name}</strong>
            <span> / </span>
            <span>{color.description}</span>
          </div>
          <Swatches index={index} onSelect={select} />
          <nav className="slide-navigation" aria-label="Slideshow navigation">
            <button type="button" className="icon-button" aria-label="Previous colorway" onClick={() => select(index - 1)}>
              <Icon as={ArrowLeft} />
            </button>
            <span className="slide-counter" aria-live={playing ? "off" : "polite"}>
              {String(index + 1).padStart(2, "0")} / {String(TONAL_COLORS.length).padStart(2, "0")}
            </span>
            <button type="button" className="icon-button" aria-label="Next colorway" onClick={() => select(index + 1)}>
              <Icon as={ArrowRight} />
            </button>
          </nav>
          <div className="playback">
            <button
              type="button"
              className="icon-button"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              onClick={() => {
                setPlaying((value) => !value);
                setHovered(false);
              }}
            >
              {playing ? <Pause size={23} strokeWidth={1} aria-hidden="true" /> : <Play size={23} strokeWidth={1} aria-hidden="true" />}
            </button>
            <div
              className="progress"
              role="progressbar"
              aria-label="Time until next colorway"
              aria-valuenow={Math.min(100, Math.round((elapsed / INTERVAL) * 100))}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ transform: `scaleX(${Math.min(1, elapsed / INTERVAL)})` }} />
            </div>
          </div>
        </div>
      </section>
      <dialog
        ref={dialog}
        className="ms-tonal-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeDetails();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) closeDetails();
        }}
        aria-labelledby="tonal-detail-title"
      >
        <div className="detail-layout">
          <div className="detail-image">
            <img
              src={`/editorial/tonal/${color.id}.webp`}
              alt={`${color.name} jacket and trouser, a garment study for an athletic tall physique.`}
            />
            {runner ? (
              <div className="mt-4 flex items-center gap-4 border border-[#1c1a17]/10 bg-[#f7f4ee] p-3 text-[#1c1a17]">
                <img src={runner.image} alt="" className="h-16 w-16 object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/55">Matching runner</p>
                  <p className="mt-1 font-serif text-xl leading-tight">{runner.name}</p>
                  <p className="mt-1 text-[13px] text-[#1c1a17]/65">
                    {runner.note} · {runner.price}
                  </p>
                </div>
                <Link href={tonalRunnerHref(color.id)} className="shrink-0 text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                  View
                </Link>
              </div>
            ) : null}
          </div>
          <div className="detail-copy">
            <button className="icon-button close-dialog" type="button" aria-label="Close collection details" onClick={closeDetails}>
              <Icon as={X} />
            </button>
            <p className="eyebrow">The Tonal Collection</p>
            <h2 id="tonal-detail-title">{color.name}</h2>
            <p className="detail-shade">{color.description}</p>
            <p className="detail-description">
              A clean collared jacket and considered pleat, developed for an athletic tall physique — longer sleeve and rise, structured shoulder, tailored through the leg.
              <br />
              One silhouette, in seven tones. A garment study, not a client.
            </p>
            <Swatches index={index} onSelect={select} />
            <dl>
              <div>
                <dt>Silhouette</dt>
                <dd>Collared jacket and pleated trouser</dd>
              </div>
              <div>
                <dt>Fit</dt>
                <dd>Athletic tall · structured shoulder · tailored ease</dd>
              </div>
              <div>
                <dt>Detail</dt>
                <dd>Tonal chest signature · plain back</dd>
              </div>
              <div>
                <dt>Cloth</dt>
                <dd>Silk-cashmere direction. Not a confirmed cloth.</dd>
              </div>
              {runner ? (
                <div>
                  <dt>Runner</dt>
                  <dd>
                    {runner.name} · {runner.price}
                  </dd>
                </div>
              ) : null}
            </dl>
            <button
              className="back-to-collection"
              type="button"
              onClick={() => {
                onRequest(index);
                closeDetails();
              }}
            >
              Carry {color.name} into enquiry
              <Icon as={ArrowRight} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
