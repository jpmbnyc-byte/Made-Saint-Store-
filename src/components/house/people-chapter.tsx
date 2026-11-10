import Image from "next/image";
import Link from "next/link";
import { COLLECTION_LOOKS, customerStatus } from "@/lib/line-shop";
import { lineByRef } from "@/lib/line";

const FEATURED_LOOKS = ["solene", "sage", "olive", "forerunner", "duffel", "amara"];

export function PeopleChapter() {
  const looks = FEATURED_LOOKS.map((slug) => COLLECTION_LOOKS.find((look) => look.slug === slug)).filter(
    (look): look is NonNullable<typeof look> => Boolean(look),
  );

  return (
    <section id="people" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]" aria-labelledby="people-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">The people</p>
        <h2 id="people-heading" className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#1c1a17]">
          The same people return.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/75">
          Amara, Solène, Inès, Lucien, Ren, and Malik wear the collection. Open a look to shop the mapped pieces. Garment prices stay proposed. Runners are requested from the shop.
        </p>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {looks.map((look) => {
            const prices = look.pieces
              .map((item) => {
                const product = lineByRef(item.ref);
                return product ? customerStatus(product).price : null;
              })
              .filter(Boolean);
            return (
              <li key={look.slug}>
                <Link href={`/line/looks/${look.slug}`} className="block bg-[#e7e1d6]">
                  <span className="relative block aspect-[2/3]">
                    <Image src={look.image} alt={look.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-[center_18%]" />
                  </span>
                </Link>
                <p className="mt-3 text-[11px] tracking-[0.16em] text-[#1c1a17] uppercase">{look.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#1c1a17]/70">
                  {prices.length ? `${prices.join(" · ")} · proposed` : "Enquire to have it made."}
                </p>
                <Link href={`/line/looks/${look.slug}`} className="mt-2 inline-flex h-11 items-center text-[11px] tracking-[0.16em] uppercase underline underline-offset-4">
                  Shop the look
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
