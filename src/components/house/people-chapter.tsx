import Image from "next/image";
import Link from "next/link";
import { COLLECTION_LOOKS, lookPriceLine } from "@/lib/line-shop";

const FEATURED_LOOKS = ["solene", "amara", "forerunner", "sage", "olive", "midnight"];

export function PeopleChapter() {
  const looks = FEATURED_LOOKS.map((slug) => COLLECTION_LOOKS.find((look) => look.slug === slug)).filter(
    (look): look is NonNullable<typeof look> => Boolean(look),
  );

  return (
    <section id="people" className="border-t border-[#262626]/08 bg-[#f3efe6]" aria-labelledby="people-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">The people</p>
        <h2 id="people-heading" className="mt-4 max-w-2xl font-serif text-[40px] font-light leading-[0.95] tracking-[-0.03em] md:text-[52px]">
          The same people return.
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-[#262626]/60">
          Amara, Solène, Inès, Lucien, Ren, and Malik wear the collection. Open a look to view the pieces.
        </p>
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 md:gap-x-10 md:gap-y-16">
          {looks.map((look) => {
            const price = lookPriceLine(look);
            return (
              <li key={look.slug}>
                <Link href={`/line/looks/${look.slug}`} className="group block">
                  <span className="relative block aspect-[2/3] bg-[#f1eee8]">
                    <Image src={look.image} alt={look.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover object-top transition-opacity duration-500 group-hover:opacity-90" />
                  </span>
                </Link>
                <p className="mt-4 font-serif text-[20px] font-light tracking-[-0.02em]">{look.title}</p>
                <p className="mt-1 text-[12px] tracking-[0.04em] text-[#262626]/50">{price ?? "Enquire to have it made."}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
