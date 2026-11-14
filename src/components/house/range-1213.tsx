import Image from "next/image";
import Link from "next/link";
import { productsIn } from "@/lib/business";
import { SeriesPlate } from "@/components/shop/series-plate";
import { copy } from "@/lib/copy";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

function Rail({ ids }: { ids: ReturnType<typeof productsIn> }) {
  return (
    <ul className="mt-8 flex min-w-0 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {ids.map((product) => (
        <li key={product.id} className="w-36 shrink-0 sm:w-44">
          <Link href={`/shop/${product.id}#title`} className="block">
            <span className="relative block aspect-square bg-[#f3f3f1]">
              <Image src={product.image} alt={product.name} fill sizes="176px" className="object-contain p-2" />
            </span>
            <span className="ms-meta mt-2 block">{colorOf(product.name)}</span>
            <span className="mt-1 block text-[12px] tabular-nums">${product.usd}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Range1213() {
  const lead = productsIn("1101");
  const sculpted = productsIn("1213");
  return (
    <section className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">{copy.home.runner.eyebrow}</p>
        <h2 className="ms-title mt-3">{copy.home.runner.heading}</h2>
        <p className="ms-lede mt-4 max-w-xl">{copy.home.runner.body}</p>
        <Link
          href="/shop#1101"
          className="mt-5 inline-flex border-b border-[#1c1a17] pb-1 text-[11px] tracking-[0.16em] uppercase"
        >
          {copy.home.runner.action}
        </Link>
        <Rail ids={lead} />
        <div className="mt-12 border-t border-[#1c1a17]/10 pt-12">
          <SeriesPlate series="1213" size="md" />
          <p className="ms-lede mt-4 max-w-xl">
            Espresso, Olive, Mineral Blue, Midnight, Chestnut, Sacred Light and Graphite.
          </p>
          <Rail ids={sculpted} />
        </div>
      </div>
    </section>
  );
}
