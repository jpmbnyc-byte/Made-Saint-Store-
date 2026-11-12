import Image from "next/image";
import Link from "next/link";
import { CAMPAIGN_001 } from "@/lib/geography";

const FRAMES = [
  {
    src: "/world/milot.webp",
    title: "Milot",
    alt: "Cast 003 standing in the ruins at Milot — Campaign 001 study of Sans-Souci",
    caption: "Campaign 001 study of the ruins at Sans-Souci. Not a location shoot, and not Portugal.",
    href: "/line/lookbook",
    wide: true,
  },
  {
    src: "/world/coastline.webp",
    title: "The north coast",
    alt: "MADE SAiNT runners, duffel, and tees on the north coast — Campaign 001 study",
    caption: "Campaign 001 product study on the north coast. The house is not pictured.",
    href: "/shop#1101",
    wide: true,
  },
  {
    src: "/editorial/saint-john-worn.webp",
    title: "Saint John",
    alt: "Lucien in the camel Saint John jacket and trouser, with a cap and a black backpack",
    caption: "Lucien, in Saint John. Plan a wardrobe to enquire.",
    href: "/wardrobe",
    wide: false,
  },
] as const;

/** Campaign 001 archive — Haiti imagery kept under its original geography. */
export function PlaceChapter() {
  if (!CAMPAIGN_001.published) return null;

  return (
    <section id="place" className="border-t border-[#1c1a17]/10 bg-[#f4f0e7]" aria-labelledby="place-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">{CAMPAIGN_001.eyebrow}</p>
        <h2 id="place-heading" className="ms-display mt-3 max-w-2xl">
          {CAMPAIGN_001.title}
        </h2>
        <p className="ms-meta mt-4">{CAMPAIGN_001.locationLabel}</p>
        <p className="ms-lede mt-5 max-w-xl">{CAMPAIGN_001.body}</p>
        <ul className="mt-10 grid gap-8">
          {FRAMES.map((frame) => (
            <li key={frame.title}>
              <Link href={frame.href} className="block bg-[#e7e1d6]">
                <span className={`relative block ${frame.wide ? "aspect-[21/9]" : "aspect-[3/4] max-w-md"}`}>
                  <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 1100px, 100vw" className="object-cover" />
                </span>
              </Link>
              <p className="ms-meta mt-3">{frame.title}</p>
              <p className="ms-note mt-2">{frame.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
