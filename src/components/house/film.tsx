"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HouseFilm() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlay(wide.matches && !still.matches);
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  return (
    <figure>
      <Image
        src="/hero/chalk-tall.webp"
        alt="Runner, Chalk, on limestone"
        width={1856}
        height={2304}
        priority
        className="h-auto w-full md:hidden"
      />
      <div className="relative hidden md:block">
        <Image
          src="/hero/chalk-wide.webp"
          alt="Runner, Chalk, on limestone"
          width={2752}
          height={1536}
          priority
          className="h-auto w-full"
        />
        {play ? (
          <video
            className="ms-film absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero/chalk-wide.webp"
            aria-label="Runner, Chalk, on limestone"
          >
            <source src="/hero/chalk-film.mp4" type="video/mp4" />
          </video>
        ) : null}
      </div>
      <figcaption className="mt-3 text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">Chalk · a founding colorway</figcaption>
    </figure>
  );
}
