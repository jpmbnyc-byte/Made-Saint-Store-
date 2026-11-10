import Image from "next/image";

const FRAMES = [
  {
    src: "/world/walk.webp",
    alt: "Two people walking a masonry street, full length, campaign frame",
    caption: "A walk",
  },
  {
    src: "/world/gathering.webp",
    alt: "Four adults talking at a shaded table, campaign frame",
    caption: "A table",
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
          An original cast, dressed for the day. Adults, in conversation. These frames are the campaign, not a finished location shoot.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {FRAMES.map((frame) => (
            <li key={frame.caption}>
              <span className="relative block aspect-[4/3] bg-[#e7e1d6]">
                <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[center_30%]" />
              </span>
              <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">{frame.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
