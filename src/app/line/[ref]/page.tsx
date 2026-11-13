import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionChrome } from "@/components/line/chrome";
import { ProductActions } from "@/components/line/product-actions";
import {
  customerColors,
  customerMaterial,
  customerName,
  customerStatus,
  jerseyColorway,
  JERSEY_COLORWAYS,
  lookBySlug,
  looksForRef,
} from "@/lib/line-shop";
import { LINE, frameSrc, lineByRef } from "@/lib/line";
import { FRAME_PX, largeFramesFor } from "@/lib/imagery";

export function generateStaticParams() {
  return LINE.map((item) => ({ ref: item.ref.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ ref: string }> }): Promise<Metadata> {
  const product = lineByRef((await params).ref);
  const status = product ? customerStatus(product) : null;
  return {
    title: product ? customerName(product) : "The 2027 line",
    description: product && status?.price
      ? `${customerName(product)}. ${status.price}. Enquire with the house.`
      : "The 2027 line",
  };
}

export default async function LineProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ ref: string }>;
  searchParams: Promise<{ color?: string; from?: string }>;
}) {
  const product = lineByRef((await params).ref);
  if (!product) notFound();
  const query = await searchParams;
  const fromLook = query.from ? lookBySlug(query.from) : undefined;
  const selectedColorway = jerseyColorway(query.color) ?? (fromLook ? jerseyColorway(fromLook.pieces[0]?.color) : null);
  const frames = largeFramesFor(product.ref);
  const status = customerStatus(product);
  const looks = looksForRef(product.ref);
  const companions = looks.flatMap((look) => look.pieces.filter((item) => item.ref !== product.ref).map((item) => ({ ...item, look })));
  const isJersey = product.ref === "R010";
  const activeColor = selectedColorway?.color ?? (isJersey ? "Sand" : customerColors(product));
  const heroImage = selectedColorway?.image ?? fromLook?.image ?? looks.find((look) => look.slug === "sand-jersey")?.image;
  const lookSlug = selectedColorway?.look ?? fromLook?.slug;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="product" />
      <main className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
        <div className="grid min-w-0 gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.7fr)] md:gap-16">
          <div className="grid gap-4">
            {isJersey && heroImage && (
              <img
                src={heroImage}
                alt={selectedColorway ? `${selectedColorway.label} printed jersey` : fromLook?.alt ?? "Printed jersey"}
                className="w-full bg-[#f3f3f1] object-contain"
              />
            )}
            {!isJersey && frames.map((frame, index) => {
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
            {!isJersey && frames.length === 0 && looks[0] && (
              <img src={looks[0].image} alt={looks[0].alt} className="w-full bg-[#f3f3f1] object-contain" />
            )}
            {isJersey && frames.map((frame) => (
              <img key={frame.n} src={frameSrc(frame.n)} alt={frame.alt} className="w-full bg-[#f3f3f1] object-contain" />
            ))}
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#111]/50">{product.category}</p>
            <h1 className="mt-3 text-2xl tracking-tight md:text-3xl">
              {isJersey && selectedColorway ? `${selectedColorway.color} printed jersey` : customerName(product)}
            </h1>
            <p className="mt-5 text-lg">{status.price ?? "Not offered"}</p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#111]/70">{status.detail}</p>
            {isJersey && (
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#111]/70">
                The list price is for the printed jersey only. Shirt, tie, and trousers in the photographs are styling and are not included.
              </p>
            )}
            <p className="mt-3 text-[13px]">{status.label}</p>
            <dl className="mt-8 space-y-4 border-t border-[#111]/10 pt-6 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Color</dt>
                <dd className="mt-1">
                  {isJersey ? (
                    <ul className="flex flex-wrap gap-2">
                      {JERSEY_COLORWAYS.map((way) => {
                        const active = way.color === activeColor;
                        return (
                          <li key={way.color}>
                            <Link
                              href={`/line/r010?color=${encodeURIComponent(way.color)}&from=${way.look}`}
                              className={`inline-flex h-11 items-center border px-3 text-[13px] ${active ? "border-[#111] bg-[#111] text-[#f7f7f5]" : "border-[#111]/25"}`}
                              aria-current={active ? "page" : undefined}
                            >
                              {way.color}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    customerColors(product)
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Material</dt>
                <dd className="mt-1 leading-relaxed">{customerMaterial(product)}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Included</dt>
                <dd className="mt-1 leading-relaxed">
                  {isJersey
                    ? "Printed jersey body with ribbed collar and cuffs. Shirt, tie, and trousers in photographs are not included."
                    : "Confirmed with the enquiry."}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Fit</dt>
                <dd className="mt-1 leading-relaxed">
                  {product.category === "Accessories"
                    ? "Bag measures are confirmed with the enquiry."
                    : "A size guide is confirmed with the enquiry."}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Delivery</dt>
                <dd className="mt-1 leading-relaxed">Made to order. A date is confirmed with the enquiry.</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] uppercase text-[#111]/45">Returns</dt>
                <dd className="mt-1 leading-relaxed">Return terms are confirmed with the order.</dd>
              </div>
            </dl>
            {product.ref === "N001" && (
              <p className="mt-6 text-sm leading-relaxed text-[#111]/70">
                This plum and ivory runner is not a Founding Edition colorway. Those pairs, and their prices, stay on the shop.
              </p>
            )}
            {product.ref === "N014" && (
              <p className="mt-6 text-sm leading-relaxed text-[#111]/70">
                The iconic frame is the Cast turtleneck worn as the outer knit. Earlier neck-only crops under another jacket remain studies.
              </p>
            )}
            {(product.ref === "R046" || product.ref === "N015" || product.ref === "R049" || product.ref === "R048" || product.ref === "R047" || product.ref === "N016") && (
              <p className="mt-6 text-sm leading-relaxed text-[#111]/70">
                This mule style is held. Product photographs are not published until clean studio stills are approved.
              </p>
            )}
            <ProductActions
              refId={product.ref}
              name={isJersey && selectedColorway ? `${selectedColorway.color} printed jersey` : customerName(product)}
              color={isJersey ? activeColor : customerColors(product)}
              category={product.category}
              lookSlug={lookSlug}
              image={heroImage}
            />
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
                      <span className="mt-3 block text-[15px] underline underline-offset-4">{other ? customerName(other) : item.role}</span>
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
