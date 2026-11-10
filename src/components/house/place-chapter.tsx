import Image from "next/image";
import Link from "next/link";

const FRAMES = [
  {
    src: "/world/milot.webp",
    title: "Milot",
    alt: "Cast 003 standing in the ruins at Milot, a campaign study of Sans-Souci",
    caption: "A campaign study of the ruins at Sans-Souci. Not a location shoot.",
    href: "/line/lookbook",
    wide: true,
  },
  {
    src: "/world/coastline.webp",
    title: "The coast",
    alt: "MADE SAiNT runners, duffel, and tees on the north coast, a campaign study",
    caption: "Product branding on the north coast. The house is not pictured.",
    href: "/shop#1101",
    wide: true,
  },
  {
    src: "/editorial/saint-john-worn.webp",
    title: "Saint John",
    alt: "Lucien in the camel Saint John jacket and trouser, with a cap and a black backpack",
    caption: "Lucien, in Saint John. Open the wardrobe to enquire.",
    href: "/wardrobe",
    wide: false,
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
          The house is set in Cap-Haïtien and the north of Haiti. Milot is neighboring historic ground, and no house has been chosen. The wide frames are campaign studies of Sans-Souci and the north coast. They are not documentary photographs of a site, and they are not a claim of a factory there.
        </p>
        <ul className="mt-10 grid gap-8">
          {FRAMES.map((frame) => (
            <li key={frame.title}>
              <Link href={frame.href} className="block bg-[#e7e1d6]">
                <span className={`relative block ${frame.wide ? "aspect-[21/9]" : "aspect-[3/4] max-w-md"}`}>
                  <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 1100px, 100vw" className="object-cover" />
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
