import Image from "next/image";
import Link from "next/link";
import { RANGE_1213, colorName } from "@/lib/range-1213";

export function Range1213() {
  return (
    <section id="runner-1213" className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] tracking-[0.28em] text-[#B03236] uppercase">1213</p>
        <h2 className="mt-4 max-w-xl font-serif text-4xl leading-none md:text-5xl">A second runner.</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1c1a17]/70">
          Seven colorways on a sculpted sole. Separate from the 0929. A price is not listed, and materials are not confirmed.
        </p>
        <ul className="mt-8 flex min-w-0 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {RANGE_1213.map((colorway) => (
            <li key={colorway.slug} className="w-36 shrink-0 sm:w-44">
              <Link href={`/shop/1213/${colorway.slug}`} className="block">
                <span className="relative block aspect-square bg-[#f3efe8]">
                  <Image src={colorway.image} alt={colorway.name} fill sizes="176px" className="object-contain" />
                </span>
                <span className="mt-2 block text-[12px] tracking-[0.08em] uppercase">{colorName(colorway.name)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/shop#1213" className="mt-6 inline-flex h-11 items-center border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase">
          See the 1213
        </Link>
      </div>
    </section>
  );
}
