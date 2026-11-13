"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAMPAIGN_BLOCKS, FEATURED, customerName, customerStatus, listedProducts, lookBySlug, publishedLooks, type CollectionLook, type UseCase } from "@/lib/line-shop";
import { FRAMES, frameSrc, lineByRef } from "@/lib/line";
import { primaryFrame } from "@/lib/imagery";
import { CollectionChrome } from "@/components/line/chrome";
import { saveLook } from "@/lib/closet";
import { useCloset } from "@/components/line/store";

function Frame({ src, alt, wide, priority = false }: { src: string; alt: string; wide?: boolean; priority?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`mx-auto w-full bg-[#f1eee8] object-contain object-top ${wide ? "max-w-[1080px]" : "max-w-[720px]"}`}
    />
  );
}

export function BlockList({ blocks, hero }: { blocks: typeof FEATURED; hero: "featured" | "campaign" }) {
  return (
    <div className="space-y-24 md:space-y-36">
      {blocks.map((block, index) => {
        if (block.kind === "still") {
          const frame = <Frame src={block.src} alt={block.alt} wide={block.wide ?? hero === "campaign"} priority={index === 0} />;
          return (
            <figure key={`${block.src}-${index}`} className="mx-auto max-w-[1080px] text-center">
              {block.href ? <Link href={block.href} className="block">{frame}</Link> : frame}
              {(block.name || block.price) && (
                <figcaption className="mt-6 space-y-1">
                  {block.name && (
                    block.href ? (
                      <Link href={block.href} className="font-serif text-[22px] font-light tracking-[-0.02em] text-[#262626] hover:opacity-70">
                        {block.name}
                      </Link>
                    ) : (
                      <span className="font-serif text-[22px] font-light tracking-[-0.02em]">{block.name}</span>
                    )
                  )}
                  {block.price && <p className="text-[12px] tracking-[0.08em] text-[#262626]/50">{block.price}</p>}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.kind === "look") {
          const look = lookBySlug(block.slug);
          if (!look) return null;
          return (
            <figure key={look.slug} className="mx-auto max-w-[1080px] text-center">
              <Link href={`/line/looks/${look.slug}`} className="block">
                <Frame src={look.image} alt={look.alt} wide={block.wide} priority={index === 0} />
              </Link>
              <figcaption className="mt-6">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Look {look.number}</p>
                <Link href={`/line/looks/${look.slug}`} className="mt-2 inline-block font-serif text-[22px] font-light tracking-[-0.02em] text-[#262626] hover:opacity-70">
                  {look.title}
                </Link>
              </figcaption>
            </figure>
          );
        }
        const product = lineByRef(block.ref);
        if (!product) return null;
        const status = customerStatus(product);
        return (
          <figure key={`${block.ref}-${block.frame}`} className="mx-auto max-w-[1080px] text-center">
            <Link href={`/line/${product.ref.toLowerCase()}`} className="block">
              <Frame src={frameSrc(block.frame)} alt={FRAMES.find((frame) => frame.n === block.frame)?.alt ?? product.name} wide={block.wide} />
            </Link>
            <figcaption className="mt-6 space-y-1">
              <Link href={`/line/${product.ref.toLowerCase()}`} className="font-serif text-[22px] font-light tracking-[-0.02em] text-[#262626] hover:opacity-70">
                {customerName(product)}
              </Link>
              {status.price && <p className="text-[12px] tracking-[0.08em] text-[#262626]/50">{status.price}</p>}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export function FeaturedView() {
  const products = listedProducts();
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((item) => item.category)))], [products]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tier, setTier] = useState("All");
  const shown = products.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (tier !== "All" && item.tier !== tier) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${item.ref} ${item.name} ${item.category} ${item.colors}`.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#262626]">
      <CollectionChrome view="featured" />
      <main className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        <header className="mx-auto max-w-[720px] py-14 text-center md:py-20">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">The 2027 line</p>
          <h1 className="mt-4 font-serif text-[40px] font-light leading-[0.95] tracking-[-0.03em] md:text-[56px]">
            Featured.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.7] text-[#262626]/60">
            One photograph at a time. Garments are made through an enquiry. Founding runners are requested from the shop.
          </p>
        </header>
        <BlockList blocks={FEATURED} hero="featured" />
        <section className="mx-auto mt-28 max-w-[1100px] border-t border-[#262626]/10 pt-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">The full line</p>
              <p className="mt-2 font-serif text-[28px] font-light tracking-[-0.02em]">Browse by style</p>
            </div>
            <label className="block text-[10px] tracking-[0.18em] uppercase text-[#262626]/45">
              Search
              <input
                id="line-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="mt-2 h-11 w-full border-0 border-b border-[#262626]/20 bg-transparent px-0 text-base normal-case tracking-normal text-[#262626] outline-none md:w-64"
              />
            </label>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
            {["All", "CORE", "VELOCITY", "GRAIL"].map((item) => (
              <button key={item} type="button" aria-pressed={tier === item} onClick={() => setTier(item)} className={`h-10 text-[10px] tracking-[0.18em] uppercase ${tier === item ? "text-[#262626]" : "text-[#262626]/40"}`}>{item}</button>
            ))}
          </div>
          <div className="mt-2 flex gap-4 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`h-10 shrink-0 text-[10px] tracking-[0.16em] uppercase ${category === item ? "text-[#262626]" : "text-[#262626]/35"}`}>{item}</button>
            ))}
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((item) => {
              const status = customerStatus(item);
              return (
                <li key={item.ref}>
                  <ProductCard refId={item.ref} name={customerName(item)} price={status.price} />
                </li>
              );
            })}
          </ul>
          {shown.length === 0 && <p className="mt-8 text-sm text-[#262626]/55">No style matches that search.</p>}
        </section>
      </main>
    </div>
  );
}

function ProductCard({ refId, name, price }: { refId: string; name: string; price: string | null }) {
  const product = lineByRef(refId);
  const frame = product ? firstFrame(refId) : null;
  return (
    <Link href={`/line/${refId.toLowerCase()}`} className="group block">
      {frame ? (
        <img src={frameSrc(frame)} alt={name} className="aspect-[4/5] w-full bg-[#f1eee8] object-contain transition-opacity duration-500 group-hover:opacity-90" />
      ) : (
        <span className="block aspect-[4/5] bg-[#f1eee8]" />
      )}
      <span className="mt-4 block font-serif text-[17px] font-light tracking-[-0.01em]">{name}</span>
      {price && <span className="mt-1 block text-[12px] tracking-[0.06em] text-[#262626]/50">{price}</span>}
    </Link>
  );
}

function firstFrame(ref: string) {
  return primaryFrame(ref)?.n ?? null;
}

export function LookbookView() {
  const [useCase, setUseCase] = useState<UseCase | "All">("All");
  const looks = publishedLooks().filter((look) => useCase === "All" || look.use === useCase);
  const closet = useCloset();
  const [note, setNote] = useState("");
  function save(look: CollectionLook) {
    if (closet.data.groups.some((group) => group.lookId === look.slug)) {
      setNote(`${look.title} is already in My Closet.`);
      return;
    }
    closet.commit(saveLook(closet.data, { slug: look.slug, title: look.title, pieces: look.pieces.map((item) => ({ ref: item.ref, color: item.color })) }, new Date().toISOString()));
    setNote(`${look.title} is in My Closet.`);
  }
  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#262626]">
      <CollectionChrome view="lookbook" />
      <main className="mx-auto max-w-[1100px] px-5 pb-24 md:px-10">
        <header className="mx-auto max-w-[560px] py-14 text-center md:py-16">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Lookbook</p>
          <h1 className="mt-4 font-serif text-[36px] font-light tracking-[-0.03em] md:text-[48px]">The looks.</h1>
        </header>
        <div className="mb-14 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {(["All", "Tailoring", "Everyday", "Leisure"] as const).map((item) => (
            <button key={item} type="button" aria-pressed={useCase === item} onClick={() => setUseCase(item)} className={`h-10 text-[10px] tracking-[0.18em] uppercase ${useCase === item ? "text-[#262626]" : "text-[#262626]/40"}`}>{item}</button>
          ))}
        </div>
        {looks[0] && (
          <div className="mx-auto max-w-[520px] text-center">
            <LookCard look={looks[0]} onSave={() => save(looks[0])} />
          </div>
        )}
        <ul className="mt-20 grid gap-x-12 gap-y-20 md:grid-cols-2">
          {looks.slice(1).map((look) => (
            <li key={look.slug} className="text-center">
              <LookCard look={look} onSave={() => save(look)} />
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">{note}</p>
        {note && <p className="mt-10 text-center text-sm text-[#262626]/55">{note}</p>}
      </main>
    </div>
  );
}

function LookCard({ look, onSave }: { look: CollectionLook; onSave: () => void }) {
  return (
    <>
      <Link href={`/line/looks/${look.slug}`} className="block">
        <img src={look.image} alt={look.alt} className="mx-auto w-full bg-[#f1eee8] object-contain" />
      </Link>
      <p className="mt-5 text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Look {look.number}</p>
      <p className="mt-2 font-serif text-[22px] font-light tracking-[-0.02em]">{look.title}</p>
      <div className="mt-4 flex justify-center gap-6 text-[11px] tracking-[0.14em] uppercase text-[#262626]/55">
        <Link href={`/line/looks/${look.slug}`} className="hover:text-[#262626]">View</Link>
        <button type="button" className="hover:text-[#262626]" onClick={onSave}>Save</button>
      </div>
    </>
  );
}

export function CampaignView() {
  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#262626]">
      <CollectionChrome view="campaign" />
      <main className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        <header className="mx-auto max-w-[640px] py-14 text-center md:py-20">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#262626]/40">Campaign 001</p>
          <h1 className="mt-4 font-serif text-[40px] font-light leading-[0.95] tracking-[-0.03em] md:text-[56px]">
            Once sinner. Made Saint.
          </h1>
        </header>
        <BlockList blocks={CAMPAIGN_BLOCKS} hero="campaign" />
      </main>
    </div>
  );
}
