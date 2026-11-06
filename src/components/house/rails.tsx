"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SIZES, shipWindow, type Product } from "@/lib/business";
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
          <p className="text-[11px] tracking-[0.2em] text-[#8d7349] uppercase">Open to reserve</p>
          <h2 className="mt-3 font-serif text-5xl leading-none text-[#2a3746] md:text-6xl">{short(product.name)}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#41505b]">{product.line}</p>
          <p className="mt-5 font-serif text-4xl tabular-nums text-[#2a3746]">${product.usd}</p>
          <p className="mt-2 text-[13px] text-[#41505b]">Ships {shipWindow()} if the run is confirmed.</p>
          <div className="mt-6">
            <p className="text-[11px] tracking-[0.16em] text-[#41505b] uppercase">Size · US men&apos;s</p>
            <div className="mt-3 flex min-w-0 gap-1.5 overflow-x-auto pb-1">
              {SIZES.map((size) => (
                <Link
                  key={size}
                  href={`/shop/${product.id}?size=${size}`}
                  className="grid h-11 w-12 shrink-0 place-items-center border border-[#41505b]/20 text-sm tabular-nums text-[#2a3746] hover:border-[#c0a477]"
                >
                  {size}
                </Link>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-[#41505b]">Between sizes, take the half size up. The size is waiting on the reservation.</p>
          </div>
          <Link href={`/shop/${product.id}`} className="mt-6 inline-block bg-[#2a3746] px-6 py-4 text-[11px] tracking-[0.18em] text-[#f2eee8] uppercase">
            Reserve this pair
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
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 32vw, 78vw" className="object-contain p-6" />
          </span>
          <span className="mt-3 block text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">Not open</span>
          <span className="mt-1 block font-serif text-3xl text-[#2a3746]">{short(product.name)}</span>
          <span className="mt-2 block text-[13px] leading-relaxed text-[#41505b]">{product.line}. Leave a note for the next run. This pair cannot be reserved.</span>
        </Link>
      ))}
    </CardRail>
  );
}

export function LeatherSlider({
  runners,
}: {
  runners: readonly { src: string; name: string; alt: string; frame?: string }[];
}) {
  const slider = useSlider(runners.length);
  const runner = runners[slider.index];
  if (!runner) return null;

  return (
    <div>
      <div {...slider.bind} className="relative mx-auto aspect-[4/5] max-w-md touch-pan-y overflow-hidden bg-[#e7e0d4]">
        <Image src={runner.src} alt={runner.alt} fill sizes="(min-width: 768px) 28rem, 100vw" className={`object-cover ${runner.frame ?? "object-[center_62%]"}`} />
      </div>
      <p className="mt-4 text-center font-serif text-3xl text-[#2a3746]">{runner.name}</p>
      <p className="mt-1 text-center text-[12px] tracking-[0.16em] text-[#41505b] uppercase">Shown, not reserved</p>
      <SliderControls index={slider.index} count={runners.length} onPrev={slider.prev} onNext={slider.next} onGo={slider.go} label="Leather" />
    </div>
  );
}
