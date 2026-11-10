import Image from "next/image";
import Link from "next/link";

const FRAMES = [
  {
    src: "/collection/solene.webp",
    alt: "Solène in the printed jersey over a white shirt, navy tie, and black trousers",
    caption: "Solène, jersey",
    note: "A season look. Not a listed price.",
    href: "/line/looks/solene",
  },
  {
    src: "/collection/sage.webp",
    alt: "Ren in a sage fleece set, pale yellow turtleneck, and a yellow barrel bag, walking stairs",
    caption: "Ren, sage",
    note: "A season look. Not a listed price.",
    href: "/line/looks/sage",
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
          Amara, Solène, Inès, Lucien, Ren, and Malik wear the collection. These two are season looks from the edit. They are not priced. Open a look to save it or enquire.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {FRAMES.map((frame) => (
            <li key={frame.caption}>
              <Link href={frame.href} className="block bg-[#e7e1d6]">
                <span className="relative block aspect-[2/3]">
                  <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
                </span>
              </Link>
              <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">{frame.caption}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#1c1a17]/70">{frame.note}</p>
              <Link href={frame.href} className="mt-2 inline-flex h-11 items-center text-[11px] tracking-[0.16em] uppercase underline underline-offset-4">
                See the look
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
