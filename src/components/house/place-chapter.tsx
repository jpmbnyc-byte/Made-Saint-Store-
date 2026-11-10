import Image from "next/image";
import Link from "next/link";

const FRAMES = [
  {
    src: "/line/f30.webp",
    title: "A day out",
    alt: "Amara in a beige jacket, printed jersey, shorts, and a brown backpack",
    caption: "Amara, in the day look. The city is not pictured.",
    href: "/line/looks/day",
  },
  {
    src: "/line/f25.webp",
    title: "The jersey",
    alt: "Ren in the printed jersey, shirt, tie, and chinos",
    caption: "Ren, in the printed jersey. The coast is not pictured.",
    href: "/line/looks/jersey",
  },
  {
    src: "/editorial/saint-john-worn.webp",
    title: "Saint John",
    alt: "Lucien in the camel Saint John jacket and trouser, with a cap and a black backpack",
    caption: "Lucien, in Saint John. Milot is not pictured.",
    href: "/wardrobe",
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
          The house is set in Cap-Haïtien and the north of Haiti. Milot is neighboring historic ground, and no house has been chosen. The photographs here are the collection on the cast. They are not pictures of the city, the coast, or Milot.
        </p>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {FRAMES.map((frame) => (
            <li key={frame.title}>
              <Link href={frame.href} className="block bg-[#e7e1d6]">
                <span className="relative block aspect-[2/3]">
                  <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
                </span>
              </Link>
              <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">{frame.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#1c1a17]/70">{frame.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
