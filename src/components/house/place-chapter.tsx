import Image from "next/image";

const FRAMES = [
  {
    src: "/world/courtyard.webp",
    title: "The city",
    alt: "A shaded masonry courtyard in morning light, campaign frame",
    caption: "A campaign frame for the city the house is set in. Not a named address.",
  },
  {
    src: "/world/coast.webp",
    title: "The coast",
    alt: "Blue water and a green headland in early light, campaign frame",
    caption: "The house returns to the shore at Cormier. This frame is the campaign’s water, not a photograph of a named beach.",
  },
  {
    src: "/world/hero.webp",
    title: "The north",
    alt: "Solène on a stone terrace above the water, campaign frame",
    caption: "Milot is neighboring historic ground. It is not pictured here as a monument, and it is not a property the house owns.",
  },
] as const;

export function PlaceChapter() {
  return (
    <section id="place" className="border-t border-[#1c1a17]/10 bg-[#f4f0e7]" aria-labelledby="place-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">The place</p>
        <h2 id="place-heading" className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#1c1a17]">
          Cap-Haïtien, and the north.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">
          The house is set in Cap-Haïtien and the north of Haiti. The city, the coast, and Milot are the places it returns to. Milot is neighboring historic ground. It is not the city, and no house has been chosen. These frames are the campaign. They are not a finished location shoot.
        </p>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {FRAMES.map((frame) => (
            <li key={frame.title}>
              <span className="relative block aspect-[4/3] bg-[#e7e1d6]">
                <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </span>
              <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">{frame.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#1c1a17]/70">{frame.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
