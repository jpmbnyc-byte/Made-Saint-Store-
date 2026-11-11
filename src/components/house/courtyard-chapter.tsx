import Image from "next/image";
import Link from "next/link";
import { COURTYARD_LOOKS, lookPriceLine } from "@/lib/line-shop";

export function CourtyardChapter() {
  return (
    <section id="courtyard" className="border-t border-[#1c1a17]/10 bg-[#f5f0e8]" aria-labelledby="courtyard-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">The courtyard</p>
        <h2 id="courtyard-heading" className="ms-display mt-3 max-w-2xl">
          The arcade, worn.
        </h2>
        <p className="ms-lede mt-5 max-w-xl">
          Cast 003 in the limestone arcade. Open a look to shop the mapped pieces. Garment prices stay proposed. Founding runners on the foot are requested from the shop.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
          {COURTYARD_LOOKS.map((look) => {
            const price = lookPriceLine(look);
            return (
              <li key={look.slug}>
                <Link href={`/line/looks/${look.slug}`} className="block bg-[#e7e1d6]">
                  <span className="relative block aspect-[2/3]">
                    <Image src={look.image} alt={look.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover object-[center_18%]" />
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
