import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionChrome } from "@/components/line/chrome";
import { ProductActions } from "@/components/line/product-actions";
import { customerStatus, looksForRef } from "@/lib/line-shop";
import { LINE, frameSrc, lineByRef } from "@/lib/line";
import { FRAME_PX, largeFramesFor } from "@/lib/imagery";

export function generateStaticParams() {
  return LINE.map((item) => ({ ref: item.ref.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ ref: string }> }): Promise<Metadata> {
  const product = lineByRef((await params).ref);
  const status = product ? customerStatus(product) : null;
  return {
    title: product ? product.name : "The 2027 line",
    description: product && status?.price
      ? `${product.name}. Proposed list price ${status.price}. Not a checkout price.`
      : "The 2027 line",
  };
}

export default async function LineProductPage({ params }: { params: Promise<{ ref: string }> }) {
  const product = lineByRef((await params).ref);
  if (!product) notFound();
  const frames = largeFramesFor(product.ref);
  const status = customerStatus(product);
  const looks = looksForRef(product.ref);
  const companions = looks.flatMap((look) => look.pieces.filter((item) => item.ref !== product.ref).map((item) => ({ ...item, look })));

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="product" />
      <main className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
        <div className="grid min-w-0 gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.7fr)] md:gap-16">
          <div className="grid gap-4">
            {frames.map((frame, index) => {
              const size = FRAME_PX[frame.n];
              return (
                <img
                  key={frame.n}
                  src={frameSrc(frame.n)}
                  alt={frame.alt}
                  width={size?.[0]}
                  height={size?.[1]}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full bg-[#f3f3f1] object-contain"
                />
              );
            })}
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#111]/50">{product.category}</p>
            <h1 className="mt-3 text-2xl tracking-tight md:text-3xl">{product.name}</h1>
            <p className="mt-5 text-lg">{status.price ?? "Not offered"}</p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#111]/70">{status.detail}</p>
            <p className="mt-3 text-[13px]">{status.label}</p>
            <dl className="mt-8 space-y-4 border-t border-[#111]/10 pt-6 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Color</dt>
                <dd className="mt-1">{product.colors}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Material</dt>
                <dd className="mt-1 leading-relaxed">{product.material}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Fit</dt>
                <dd className="mt-1 leading-relaxed">A size guide is not published for this style. The size preference is for the enquiry.</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Delivery</dt>
                <dd className="mt-1 leading-relaxed">No ship date is set. The runner lead time does not apply to this garment.</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Returns</dt>
                <dd className="mt-1 leading-relaxed">A return term is not published, because this style is not for sale.</dd>
              </div>
            </dl>
            {product.ref === "N015" && (
              <p className="mt-6 text-sm leading-relaxed text-[#111]/70">
                The photographs show a suede lace mule, including a D-ring and a brown upper. The written colorways are stone, midnight, and espresso. Brown is the espresso study. The D-ring is in the photograph and is not in the written specification.
              </p>
            )}
            {product.ref === "N001" && (
              <p className="mt-6 text-sm leading-relaxed text-[#111]/70">
                This plum and ivory runner is not a Founding Edition colorway. Those pairs, and their prices, stay on the shop.
              </p>
            )}
            {product.ref === "N014" && (
              <p className="mt-6 text-sm leading-relaxed text-[#111]/70">
                The frames show a wordmark neck under another jacket. Cashmere is the target fiber and is not certified by these photographs.
              </p>
            )}
            <ProductActions refId={product.ref} name={product.name} color={product.colors} />
          </div>
        </div>

        {looks.length > 0 && (
          <section className="mt-16 border-t border-[#111]/10 pt-10">
            <h2 className="text-[11px] tracking-[0.18em] uppercase">Worn in</h2>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {looks.map((look) => (
                <li key={look.slug}>
                  <Link href={`/line/looks/${look.slug}`}>
                    <img src={look.image} alt={look.alt} className="aspect-[4/5] w-full max-w-sm bg-[#f3f3f1] object-contain" />
                    <span className="mt-3 block text-[15px] underline underline-offset-4">Look {look.number} · {look.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {companions.length > 0 && (
          <section className="mt-16 border-t border-[#111]/10 pt-10">
            <h2 className="text-[11px] tracking-[0.18em] uppercase">Complete the look</h2>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {companions.map((item) => {
                const other = lineByRef(item.ref);
                const offer = other ? customerStatus(other) : null;
                return (
                  <li key={`${item.look.slug}-${item.ref}`}>
                    <Link href={`/line/${item.ref.toLowerCase()}`}>
                      <img src={item.look.image} alt={item.look.alt} className="aspect-[4/5] w-full max-w-sm bg-[#f3f3f1] object-contain" />
                      <span className="mt-3 block text-[15px] underline underline-offset-4">{other?.name}</span>
                    </Link>
                    <p className="mt-1 text-[13px] text-[#111]/60">{item.color}{offer?.price ? ` · ${offer.price}` : ""}</p>
                    <Link href={`/line/looks/${item.look.slug}`} className="mt-2 inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase">Look {item.look.number}</Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
