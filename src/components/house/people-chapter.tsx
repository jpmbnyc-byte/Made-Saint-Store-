import Image from "next/image";

const FRAMES = [
  {
    src: "/collection/velvet.webp",
    alt: "Lucien in a forest velvet zip jacket and matching trousers",
    caption: "Lucien, velvet",
    note: "A season look. Not a listed price.",
  },
  {
    src: "/collection/sage.webp",
    alt: "Ren in a sage fleece set, pale yellow turtleneck, and a yellow barrel bag",
    caption: "Ren, sage",
    note: "A season look. Not a listed price.",
  },
] as const;

export function PeopleChapter() {
  return (
    <section id="people" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]" aria-labelledby="people-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">The people</p>
        <h2 id="people-heading" className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#1c1a17]">
          The same people return.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">
          Amara, Solène, Inès, Lucien, Ren, and Malik wear the collection. These two are the season looks kept from the edit. They are not priced, and they are not a place.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {FRAMES.map((frame) => (
            <li key={frame.caption}>
              <span className="relative block aspect-[2/3] bg-[#e7e1d6]">
                <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
              </span>
              <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">{frame.caption}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#1c1a17]/70">{frame.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
