"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAMPAIGN_BLOCKS, COLLECTION_LOOKS, FEATURED, customerStatus, listedProducts, lookBySlug, type CollectionLook, type UseCase } from "@/lib/line-shop";
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
      className={`mx-auto w-full bg-[#f3f3f1] object-contain object-top ${wide ? "max-w-[960px]" : "max-w-[600px]"}`}
    />
  );
}

function ShopLook({ slug }: { slug: string }) {
  return (
    <Link href={`/line/looks/${slug}`} className="mt-3 inline-flex h-11 items-center text-[11px] tracking-[0.18em] uppercase underline underline-offset-4">
      Shop the look
    </Link>
  );
}

export function BlockList({ blocks, hero }: { blocks: typeof FEATURED; hero: "featured" | "campaign" }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {blocks.map((block, index) => {
        if (block.kind === "still") {
          return (
            <figure key={`${block.src}-${index}`} className="text-center">
              <Frame src={block.src} alt={block.alt} wide={block.wide ?? hero === "campaign"} priority={index === 0} />
            </figure>
          );
        }
        if (block.kind === "look") {
          const look = lookBySlug(block.slug);
          if (!look) return null;
          return (
            <figure key={look.slug} className="text-center">
              <Frame src={look.image} alt={look.alt} wide={block.wide} priority={index === 0} />
              <figcaption className="mt-3">
                <ShopLook slug={look.slug} />
              </figcaption>
            </figure>
          );
        }
        const product = lineByRef(block.ref);
        if (!product) return null;
        const status = customerStatus(product);
        return (
          <figure key={`${block.ref}-${block.frame}`} className="text-center">
            <Link href={`/line/${product.ref.toLowerCase()}`}>
              <Frame src={frameSrc(block.frame)} alt={FRAMES.find((frame) => frame.n === block.frame)?.alt ?? product.name} wide={block.wide} />
            </Link>
            <figcaption className="mt-3 text-[13px]">
              <Link href={`/line/${product.ref.toLowerCase()}`} className="underline underline-offset-4">{product.name}</Link>
              {status.price && <span className="mt-1 block text-[#111]/60">{status.price} · proposed</span>}
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
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="featured" />
      <main className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
        <BlockList blocks={FEATURED} hero="featured" />
        <section className="mx-auto mt-20 max-w-[1100px] border-t border-[#111]/15 pt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <label className="block text-[11px] tracking-[0.16em] uppercase">
              Search the line
              <input
                id="line-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="mt-2 h-11 w-full border border-[#111]/20 bg-white px-3 text-base normal-case tracking-normal md:w-72"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {["All", "CORE", "VELOCITY", "GRAIL"].map((item) => (
                <button key={item} type="button" aria-pressed={tier === item} onClick={() => setTier(item)} className={`h-11 px-3 text-[11px] tracking-[0.14em] uppercase ${tier === item ? "border-b border-[#111]" : "text-[#111]/60"}`}>{item}</button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`h-11 shrink-0 px-2 text-[11px] tracking-[0.12em] uppercase ${category === item ? "text-[#111]" : "text-[#111]/50"}`}>{item}</button>
            ))}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((item) => {
              const status = customerStatus(item);
              const frame = item && status;
              return (
                <li key={item.ref}>
                  <ProductCard refId={item.ref} name={item.name} price={frame.price} />
                </li>
              );
            })}
          </ul>
          {shown.length === 0 && <p className="mt-8 text-sm">No style matches that search.</p>}
        </section>
      </main>
    </div>
  );
}

function ProductCard({ refId, name, price }: { refId: string; name: string; price: string | null }) {
  const product = lineByRef(refId);
  const frame = product ? firstFrame(refId) : null;
  return (
    <Link href={`/line/${refId.toLowerCase()}`} className="block">
      {frame ? <img src={frameSrc(frame)} alt={name} className="aspect-[4/5] w-full bg-[#f3f3f1] object-contain" /> : <span className="block aspect-[4/5] bg-[#f3f3f1]" />}
      <span className="mt-3 block text-[13px]">{name}</span>
      {price && <span className="mt-1 block text-[12px] text-[#111]/60">{price}</span>}
    </Link>
  );
}

function firstFrame(ref: string) {
  return primaryFrame(ref)?.n ?? null;
}

export function LookbookView() {
  const [useCase, setUseCase] = useState<UseCase | "All">("All");
  const looks = COLLECTION_LOOKS.filter((look) => useCase === "All" || look.use === useCase);
  const closet = useCloset();
  const [note, setNote] = useState("");
  function save(look: CollectionLook) {
    closet.commit(saveLook(closet.data, { slug: look.slug, title: look.title, pieces: look.pieces.map((item) => ({ ref: item.ref, color: item.color })) }, new Date().toISOString()));
    setNote(`${look.title} is in My Closet.`);
  }
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="lookbook" />
      <main className="mx-auto max-w-[1100px] px-4 pb-20 md:px-8">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(["All", "Tailoring", "Everyday", "Leisure"] as const).map((item) => (
            <button key={item} type="button" aria-pressed={useCase === item} onClick={() => setUseCase(item)} className={`h-11 px-3 text-[11px] tracking-[0.14em] uppercase ${useCase === item ? "border-b border-[#111]" : "text-[#111]/55"}`}>{item}</button>
          ))}
        </div>
        {looks[0] && (
          <div className="mx-auto max-w-[400px] text-center">
            <LookCard look={looks[0]} onSave={() => save(looks[0])} />
          </div>
        )}
        <ul className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {looks.slice(1).map((look) => (
            <li key={look.slug} className="text-center">
              <LookCard look={look} onSave={() => save(look)} />
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">{note}</p>
        {note && <p className="mt-8 text-center text-sm">{note}</p>}
      </main>
    </div>
  );
}

function LookCard({ look, onSave }: { look: CollectionLook; onSave: () => void }) {
  return (
    <>
      <Link href={`/line/looks/${look.slug}`}>
        <img src={look.image} alt={look.alt} className="mx-auto w-full bg-[#f3f3f1] object-contain" />
      </Link>
      <p className="mt-4 text-[11px] tracking-[0.2em] uppercase">Look {look.number}</p>
      <div className="mt-2 flex justify-center gap-4">
        <Link href={`/line/looks/${look.slug}`} className="inline-flex h-11 items-center text-[11px] tracking-[0.16em] uppercase underline underline-offset-4">Shop the look</Link>
        <button type="button" className="inline-flex h-11 items-center text-[11px] tracking-[0.16em] uppercase" onClick={onSave}>Save look</button>
      </div>
    </>
  );
}

export function CampaignView() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="campaign" />
      <main className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
        <p className="mb-10 text-center text-[12px] tracking-[0.22em] uppercase">Campaign 001 / Once sinner. Made Saint.</p>
        <BlockList blocks={CAMPAIGN_BLOCKS} hero="campaign" />
        <p className="mx-auto mt-16 max-w-md text-center text-[13px] leading-relaxed text-[#111]/70">
          These frames are the collection, worn. A shoppable look lists only the pieces already mapped to that photograph.
        </p>
      </main>
    </div>
  );
}
