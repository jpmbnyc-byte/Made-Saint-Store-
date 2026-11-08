import Image from "next/image";
import Link from "next/link";
import { productsIn } from "@/lib/business";
import { SeriesPlate } from "@/components/shop/series-plate";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

export function Range1213() {
  const sculpted = productsIn("1101");
  const sacred = productsIn("1223");
  return (
    <section className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <SeriesPlate series="1101" className="h-16 w-auto max-w-full object-contain object-left sm:h-20" />
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Six colorways. Leather and 29 Gris Medio mesh. $550. A sample and a measured fit are still pending.
        </p>
        <ul className="mt-8 flex min-w-0 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sculpted.map((product) => (
            <li key={product.id} className="w-36 shrink-0 sm:w-44">
              <Link href={`/shop/${product.id}`} className="block">
                <span className="relative block aspect-square bg-[#f3efe8]">
                  <Image src={product.image} alt={product.name} fill sizes="176px" className="object-contain" />
                </span>
                <span className="mt-2 block text-[12px] tracking-[0.08em] uppercase">{colorOf(product.name)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid items-center gap-8 border-t border-[#1c1a17]/10 pt-12 sm:grid-cols-[220px_1fr]">
          <SeriesPlate series="1223" className="h-16 w-auto max-w-full object-contain object-left" />
          {sacred.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`} className="flex items-center gap-4">
              <span className="relative block size-28 shrink-0 bg-[#f3efe8]">
                <Image src={product.image} alt={product.name} fill sizes="112px" className="object-contain" />
              </span>
              <span>
                <span className="block font-serif text-3xl">Sacred Light</span>
                <span className="mt-1 block text-sm tabular-nums">$550</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
