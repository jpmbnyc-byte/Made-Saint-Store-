"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SIZES, offerLine, type Product } from "@/lib/business";
import { CardRail, SliderControls, useSlider } from "@/components/house/slider";

const short = (name: string) => name.replace("Runner, ", "");

export function EditionSlider({ products }: { products: Product[] }) {
  const slider = useSlider(products.length);
  const product = products[slider.index];
  if (!product) return null;

  return (
    <div className="min-w-0">
      <div className="grid min-w-0 items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
        <div {...slider.bind} className="relative aspect-[2/3] min-w-0 touch-pan-y bg-[#f7f4ef]">
          <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-contain" priority={slider.index === 0} />
        </div>
        <div className="min-w-0">
          <p className="ms-kicker">Open to reserve</p>
          <h2 className="ms-display mt-3">{short(product.name)}</h2>
          <p className="ms-lede mt-4">{product.line}</p>
          <p className="ms-title mt-5 tabular-nums">${product.usd}</p>
          <p className="mt-2 text-[13px] text-[#41505b]">{offerLine(product.series)}</p>
          <div className="mt-6">
            <p className="text-[11px] tracking-[0.16em] text-[#41505b] uppercase">Size · US men&apos;s</p>
            <div className="mt-3 flex min-w-0 gap-1.5 overflow-x-auto pb-1">
              {SIZES.map((size) => (
                <Link
                  key={size}
                  href={`/shop/${product.id}?size=${size}#title`}
                  className="grid h-11 w-12 shrink-0 place-items-center border border-[#41505b]/20 text-sm tabular-nums text-[#1c1a17] hover:border-[#c0a477]"
                >
                  {size}
                </Link>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-[#41505b]">Between sizes, take the half size up. The size is waiting on the reservation.</p>
          </div>
          <p className="mt-6 text-sm text-[#41505b]">The price above is the listed price. This page does not take payment.</p>
          <Link href={`/shop/${product.id}#title`} className="mt-4 inline-flex h-12 items-center bg-[#2a3746] px-6 text-sm text-[#f2eee8]">
            Continue to this pair
          </Link>
        </div>
      </div>
      <SliderControls index={slider.index} count={products.length} onPrev={slider.prev} onNext={slider.next} onGo={slider.go} label="Colorway" />
    </div>
  );
}

export function ListRail() {
  const waiting = PRODUCTS.filter((product) => !product.launch);
  return (
    <CardRail label="Colorway" count={waiting.length}>
      {waiting.map((product) => (
        <Link key={product.id} href="/shop#list" className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]">
          <span className="relative block aspect-[2/3] bg-[#f7f4ef]">
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 32vw, 78vw" className="object-contain" />
          </span>
          <span className="mt-3 block text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">Available</span>
          <span className="mt-1 block font-serif text-3xl text-[#1c1a17]">{short(product.name)}</span>
          <span className="mt-2 block text-[13px] leading-relaxed text-[#41505b]">{product.line}. {offerLine(product.series)}</span>
        </Link>
      ))}
    </CardRail>
  );
}

export function LeatherSlider({
  runners,
  label,
}: {
  runners: readonly { src: string; name: string; alt: string; note: string }[];
  label: string;
}) {
  const slider = useSlider(runners.length);
  const runner = runners[slider.index];
  if (!runner) return null;

  return (
    <div>
      <div {...slider.bind} className="relative mx-auto aspect-[4/5] max-w-md touch-pan-y overflow-hidden bg-[#e7e0d4]">
        <Image src={runner.src} alt={runner.alt} fill sizes="(min-width: 768px) 28rem, 100vw" className="object-contain" />
      </div>
      <p className="mt-4 text-center font-serif text-3xl text-[#1c1a17]">{runner.name}</p>
      <p className="mt-1 text-center text-sm text-[#41505b]">{runner.note}</p>
      <SliderControls index={slider.index} count={runners.length} onPrev={slider.prev} onNext={slider.next} onGo={slider.go} label={label} />
    </div>
  );
}
