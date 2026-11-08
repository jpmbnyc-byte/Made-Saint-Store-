import Image from "next/image";

export function HouseFilm() {
  return (
    <figure>
      <Image
        src="/stories/chalk-navy.webp"
        alt="MADE SAiNT 0929 Runner — Navy / Ivory, overhead"
        width={1080}
        height={1440}
        priority
        className="mx-auto h-auto w-full max-w-[420px]"
      />
      <figcaption className="mt-3 text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">Navy / Ivory · a 0929 colorway</figcaption>
    </figure>
  );
}
