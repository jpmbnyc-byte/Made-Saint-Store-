import Image from "next/image";
import Link from "next/link";
import { COLLECTION_LOOKS, lookPriceLine } from "@/lib/line-shop";

const FEATURED_LOOKS = ["solene", "amara", "forerunner", "sage", "olive", "malik"];

export function PeopleChapter() {
  const looks = FEATURED_LOOKS.map((slug) => COLLECTION_LOOKS.find((look) => look.slug === slug)).filter(
    (look): look is NonNullable<typeof look> => Boolean(look),
  );

  return (
    <section id="people" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]" aria-labelledby="people-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">The people</p>
        <h2 id="people-heading" className="ms-display mt-3 max-w-2xl">
          The same people return.
        </h2>
        <p className="ms-lede mt-5 max-w-xl">
          Amara, Solène, Inès, Lucien, Ren, and Malik wear the collection. Open a look to shop the mapped pieces. Garments are made through an enquiry. Runners are requested from the shop.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {looks.map((look) => {
            const price = lookPriceLine(look);
            return (
              <li key={look.slug}>
                <Link href={`/line/looks/${look.slug}`} className="block bg-[#e7e1d6]">
                  <span className="relative block aspect-[2/3]">
                    <Image src={look.image} alt={look.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover object-[center_18%]" />
                  </span>
                </Link>
                <p className="ms-meta mt-3">{look.title}</p>
                <p className="ms-note mt-2">{price ?? "Enquire to have it made."}</p>
                <Link href={`/line/looks/${look.slug}`} className="ms-link mt-1">
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
