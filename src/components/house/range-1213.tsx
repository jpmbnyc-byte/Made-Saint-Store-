import Image from "next/image";
import Link from "next/link";
import { productsIn } from "@/lib/business";
import { SeriesPlate } from "@/components/shop/series-plate";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

function Rail({ ids }: { ids: ReturnType<typeof productsIn> }) {
  return (
    <ul className="mt-8 flex min-w-0 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {ids.map((product) => (
        <li key={product.id} className="w-36 shrink-0 sm:w-44">
          <Link href={`/shop/${product.id}`} className="block">
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
        <SeriesPlate series="1101" size="md" />
        <p className="ms-lede mt-4 max-w-xl">
          The 1101 runner. Brown Mesh, Teal, Navy, Bronze, Blush and Onyx.
        </p>
        <Rail ids={lead} />
        <div className="mt-12 border-t border-[#1c1a17]/10 pt-12">
          <SeriesPlate series="1213" size="md" />
          <p className="ms-lede mt-4 max-w-xl">
            The 1213 runner. Espresso, Olive, Mineral Blue, Midnight, Chestnut, Sacred Light and Graphite.
          </p>
          <Rail ids={sculpted} />
        </div>
      </div>
    </section>
  );
}
