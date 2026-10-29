import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { LINE, frameSrc, framesFor, lineByRef, usd } from "@/lib/line";

export function generateStaticParams() {
  return LINE.map((item) => ({ ref: item.ref.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ ref: string }> }): Promise<Metadata> {
  const product = lineByRef((await params).ref);
  return {
    title: product ? product.name : "The 2027 line",
    description: product
      ? `${product.name}. ${product.retail != null ? `Proposed list price ${usd(product.retail)}.` : "Held, no list price."} Not a checkout price.`
      : "The 2027 line",
  };
}

export default async function LineProductPage({ params }: { params: Promise<{ ref: string }> }) {
  const product = lineByRef((await params).ref);
  if (!product) notFound();
  const frames = framesFor(product.ref);
  const siblings = LINE.filter((item) => item.category === product.category && item.ref !== product.ref).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <ShopHeader />
      <main className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12">
        <Link href="/line" className="inline-flex items-center gap-1 text-[11px] tracking-[0.16em] text-[#1c1a17]/55 uppercase">
          <ChevronLeft className="size-3.5" /> The 2027 line
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <div className="grid gap-3">
            {frames.length ? (
              frames.map((frame) => (
                <img key={frame.n} src={frameSrc(frame.n)} alt={frame.alt} className="w-full bg-[#f1eee8]" />
              ))
            ) : (
              <div className="flex min-h-[420px] items-end bg-[#f1eee8] p-6">
                <p className="max-w-sm text-sm leading-relaxed text-[#1c1a17]/70">
                  No photograph in this set matches {product.name}. Unassigned frames stay in the lookbook rather than standing in for this style.
                </p>
              </div>
            )}
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/50 uppercase">{product.tier} · {product.category} · {product.ref}</p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.95] md:text-6xl">{product.name}</h1>
            <p className="mt-6 font-serif text-3xl">{product.retail != null ? usd(product.retail) : "Held"}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#1c1a17]/70">
              {product.status === "held"
                ? "This record is an archive duplicate or an unresolved variant. It has no list price."
                : "Proposed list price from the 29 October 2026 framework. It is not a checkout price, and it is not evidence of what a client will pay."}
            </p>
            <dl className="mt-8 space-y-4 border-t border-[#1c1a17]/12 pt-6 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/45">Colorways on the record</dt>
                <dd className="mt-1">{product.colors}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/45">Material story</dt>
                <dd className="mt-1 leading-relaxed">{product.material}</dd>
              </div>
            </dl>
            {product.ref === "N015" && (
              <p className="mt-6 text-sm leading-relaxed text-[#1c1a17]/70">
                The photographs show a suede lace mule, including a D-ring and a brown upper. The written colorways are stone, midnight, and espresso. Brown is shown as the espresso study. The D-ring is in the photograph and is not yet written into this style&apos;s specification.
              </p>
            )}
            {product.ref === "N001" && (
              <p className="mt-6 text-sm leading-relaxed text-[#1c1a17]/70">
                This plum and ivory runner is not one of the Founding Edition colorways. Those pairs, and their published prices, stay on the shop.
              </p>
            )}
            {product.ref === "N014" && (
              <p className="mt-6 text-sm leading-relaxed text-[#1c1a17]/70">
                The frames show a wordmark neck under another jacket. Cashmere is the target fiber and is not certified by these photographs.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/wardrobe#commission" className="bg-[#1c1a17] px-5 py-3 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase">Commission</Link>
              <Link href="/shop#edition" className="border border-[#1c1a17] px-5 py-3 text-[11px] tracking-[0.16em] uppercase">Founding runners</Link>
            </div>
          </div>
        </div>

        {siblings.length > 0 && (
          <section className="mt-16 border-t border-[#1c1a17]/12 pt-10">
            <h2 className="font-serif text-3xl">Also in {product.category}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((item) => (
                <li key={item.ref}>
                  <Link href={`/line/${item.ref.toLowerCase()}`} className="block border border-[#1c1a17]/10 p-4 hover:border-[#1c1a17]">
                    <p className="text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/45">{item.ref}</p>
                    <p className="mt-2 font-serif text-2xl">{item.name}</p>
                    <p className="mt-2 text-sm">{item.retail != null ? usd(item.retail) : "Held"}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <ShopFooter />
    </div>
  );
}
