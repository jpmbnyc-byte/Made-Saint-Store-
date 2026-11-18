"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CAMPAIGN_BLOCKS,
  FEATURED_CHAPTERS,
  customerName,
  customerStatus,
  listedProducts,
  lookBySlug,
  publishedLooks,
  type CollectionLook,
  type EditorialBlock,
  type FeaturedChapter,
  type UseCase,
} from "@/lib/line-shop";
import { FRAMES, frameSrc, lineByRef } from "@/lib/line";
import { primaryFrame } from "@/lib/imagery";
import { CollectionChrome } from "@/components/line/chrome";
import { saveLook } from "@/lib/closet";
import { useCloset } from "@/components/line/store";
import { copy } from "@/lib/copy";

function Frame({
  src,
  alt,
  wide,
  priority = false,
}: {
  src: string;
  alt: string;
  wide?: boolean;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`ms-studio-stage w-full object-contain object-top ${wide ? "max-w-none" : ""}`}
    />
  );
}

function BlockFigure({
  block,
  priority = false,
  compact = false,
}: {
  block: EditorialBlock;
  priority?: boolean;
  compact?: boolean;
}) {
  const action = copy.line.lookAction;

  if (block.kind === "still") {
    const frame = <Frame src={block.src} alt={block.alt} wide={block.wide} priority={priority} />;
    return (
      <figure className={compact ? "text-left" : "text-center"}>
        {block.href ? <Link href={block.href}>{frame}</Link> : frame}
        {(block.name || block.price || block.cta) && (
          <figcaption className={`mt-4 ${compact ? "" : "mx-auto max-w-sm"}`}>
            {block.href && block.name ? (
              <Link href={block.href} className="text-[14px] tracking-[-0.01em] underline-offset-4 hover:underline">
                {block.name}
              </Link>
            ) : (
              block.name && <span className="text-[14px] tracking-[-0.01em]">{block.name}</span>
            )}
            {(block.price || block.cta) && (
              <span className="mt-1 block text-[13px] text-[#1c1a17]/55">{block.price ?? block.cta}</span>
            )}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.kind === "look") {
    const look = lookBySlug(block.slug);
    if (!look) return null;
    return (
      <figure className={compact ? "text-left" : "text-center"}>
        <Link href={`/line/looks/${look.slug}`}>
          <Frame src={look.image} alt={look.alt} wide={block.wide} priority={priority} />
        </Link>
        <figcaption className={`mt-4 ${compact ? "" : "mx-auto max-w-sm"}`}>
          <p className="ms-meta text-[#1c1a17]/45">Look {look.number}</p>
          <p className="mt-1 font-serif text-[1.35rem] leading-tight tracking-[-0.02em]">{look.title}</p>
          <Link href={`/line/looks/${look.slug}`} className="ms-link mt-1 text-[#1c1a17]/70">
            {action}
          </Link>
        </figcaption>
      </figure>
    );
  }

  const product = lineByRef(block.ref);
  if (!product) return null;
  const status = customerStatus(product);
  return (
    <figure className={compact ? "text-left" : "text-center"}>
      <Link href={`/line/${product.ref.toLowerCase()}`}>
        <Frame
          src={frameSrc(block.frame)}
          alt={FRAMES.find((frame) => frame.n === block.frame)?.alt ?? product.name}
          wide={block.wide}
          priority={priority}
        />
      </Link>
      <figcaption className={`mt-4 ${compact ? "" : "mx-auto max-w-sm"}`}>
        <Link
          href={`/line/${product.ref.toLowerCase()}`}
          className="text-[14px] tracking-[-0.01em] underline-offset-4 hover:underline"
        >
          {customerName(product)}
        </Link>
        {status.price && <span className="mt-1 block text-[13px] text-[#1c1a17]/55">{status.price}</span>}
      </figcaption>
    </figure>
  );
}

function ChapterSection({ chapter, first }: { chapter: FeaturedChapter; first?: boolean }) {
  const [lead, ...rest] = chapter.blocks;
  const wideLead = Boolean(lead && ("wide" in lead ? lead.wide : false));

  return (
    <section
      aria-labelledby={`chapter-${chapter.id}`}
      className={`border-t border-[#1c1a17]/10 ${first ? "border-t-0 pt-0" : "pt-16 md:pt-24"}`}
    >
      <header className="mx-auto max-w-[34rem] text-center">
        <p className="ms-meta text-[#1c1a17]/45">{chapter.eyebrow}</p>
        <h2 id={`chapter-${chapter.id}`} className="ms-title mt-3 text-[clamp(1.85rem,4vw,2.75rem)]">
          {chapter.title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#1c1a17]/65">{chapter.line}</p>
      </header>

      {lead && (
        <div className={`mx-auto mt-10 ${wideLead ? "max-w-[920px]" : "max-w-[520px]"}`}>
          <BlockFigure block={lead} priority={first} />
        </div>
      )}

      {rest.length > 0 && (
        <ul
          className={`mx-auto mt-12 grid gap-x-8 gap-y-14 md:mt-16 ${
            rest.length === 1 ? "max-w-[520px]" : rest.length === 2 ? "max-w-[900px] md:grid-cols-2" : "max-w-[1100px] md:grid-cols-3"
          }`}
        >
          {rest.map((block, index) => (
            <li key={`${chapter.id}-${index}`}>
              <BlockFigure block={block} compact />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function BlockList({ blocks, hero }: { blocks: EditorialBlock[]; hero: "featured" | "campaign" }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {blocks.map((block, index) => (
        <div key={`${block.kind}-${index}`} className="mx-auto max-w-[720px]">
          <BlockFigure block={block} priority={index === 0 && hero === "campaign"} />
        </div>
      ))}
    </div>
  );
}

export function FeaturedView() {
  const line = copy.line;
  const products = listedProducts();
  const categories = useMemo(() => {
    const preferred = line.categories.filter((item) => item === "All" || products.some((p) => p.category === item));
    const extras = Array.from(new Set(products.map((item) => item.category))).filter(
      (item) => !preferred.includes(item),
    );
    return [...preferred, ...extras];
  }, [products, line.categories]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const shown = products.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${item.ref} ${item.name} ${item.category} ${item.colors}`.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <CollectionChrome view="featured" />
      <main className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <div className="space-y-20 md:space-y-28">
          {FEATURED_CHAPTERS.map((chapter, index) => (
            <ChapterSection key={chapter.id} chapter={chapter} first={index === 0} />
          ))}
        </div>

        <section id="line-index" className="mt-24 scroll-mt-24 border-t border-[#1c1a17]/10 pt-16 md:mt-32 md:pt-20">
          <header className="mx-auto max-w-[34rem] text-center">
            <p className="ms-meta text-[#1c1a17]/45">Index</p>
            <h2 className="ms-title mt-3 text-[clamp(1.85rem,4vw,2.75rem)]">{line.indexHeading}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1c1a17]/65">{line.indexBody}</p>
          </header>

          <div className="mx-auto mt-10 flex max-w-[720px] flex-col items-center gap-6">
            <label className="block w-full max-w-sm text-center text-[11px] tracking-[0.16em] text-[#1c1a17]/55 uppercase">
              {line.searchLabel}
              <input
                id="line-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="mt-2 h-11 w-full border-0 border-b border-[#1c1a17]/25 bg-transparent px-0 text-center text-base normal-case tracking-normal text-[#1c1a17] outline-none focus:border-[#1c1a17]"
              />
            </label>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`h-10 px-1 text-[11px] tracking-[0.14em] uppercase ${
                    category === item ? "text-[#1c1a17]" : "text-[#1c1a17]/45"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-16 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
            {shown.map((item) => {
              const status = customerStatus(item);
              return (
                <li key={item.ref}>
                  <ProductCard refId={item.ref} name={customerName(item)} price={status.price} />
                </li>
              );
            })}
          </ul>
          {shown.length === 0 && <p className="mt-10 text-center text-sm text-[#1c1a17]/60">{line.searchEmpty}</p>}
        </section>
      </main>
    </div>
  );
}

function ProductCard({ refId, name, price }: { refId: string; name: string; price: string | null }) {
  const frame = firstFrame(refId);
  return (
    <Link href={`/line/${refId.toLowerCase()}`} className="group block">
      {frame ? (
        <img
          src={frameSrc(frame)}
          alt={name}
          className="ms-studio-stage aspect-[4/5] w-full object-contain transition-opacity duration-500 group-hover:opacity-90"
        />
      ) : (
        <span className="ms-studio-stage block aspect-[4/5]" />
      )}
      <span className="mt-4 block text-[13px] tracking-[-0.01em]">{name}</span>
      {price && <span className="mt-1 block text-[12px] text-[#1c1a17]/55">{price}</span>}
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
  const lookbook = copy.lookbook;

  function save(look: CollectionLook) {
    if (closet.data.groups.some((group) => group.lookId === look.slug)) {
      setNote(`${look.title} is already in My Closet.`);
      return;
    }
    closet.commit(
      saveLook(
        closet.data,
        { slug: look.slug, title: look.title, pieces: look.pieces.map((item) => ({ ref: item.ref, color: item.color })) },
        new Date().toISOString(),
      ),
    );
    setNote(`${look.title} is in My Closet.`);
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <CollectionChrome view="lookbook" />
      <main className="mx-auto max-w-[1100px] px-5 pb-24 md:px-8">
        <p className="mx-auto mb-10 max-w-md text-center text-[15px] leading-relaxed text-[#1c1a17]/65">{lookbook.intro}</p>
        <div className="mb-14 flex flex-wrap justify-center gap-x-6 gap-y-1">
          {(["All", "Tailoring", "Everyday", "Leisure"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={useCase === item}
              onClick={() => setUseCase(item)}
              className={`h-11 px-1 text-[11px] tracking-[0.14em] uppercase ${
                useCase === item ? "border-b border-[#1c1a17] text-[#1c1a17]" : "text-[#1c1a17]/45"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {looks.map((look) => (
            <li key={look.slug}>
              <LookCard look={look} onSave={() => save(look)} />
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">
          {note}
        </p>
        {note && <p className="mt-10 text-center text-sm text-[#1c1a17]/60">{note}</p>}
      </main>
    </div>
  );
}

function LookCard({ look, onSave }: { look: CollectionLook; onSave: () => void }) {
  return (
    <div className="text-left">
      <Link href={`/line/looks/${look.slug}`}>
        <img src={look.image} alt={look.alt} className="ms-studio-stage w-full object-contain" />
      </Link>
      <p className="ms-meta mt-5 text-[#1c1a17]/45">Look {look.number}</p>
      <p className="mt-1 font-serif text-[1.5rem] leading-tight tracking-[-0.02em]">{look.title}</p>
      <div className="mt-2 flex gap-6">
        <Link href={`/line/looks/${look.slug}`} className="ms-link text-[#1c1a17]/70">
          {copy.lookbook.viewAction}
        </Link>
        <button type="button" className="ms-link text-[#1c1a17]/55 no-underline" onClick={onSave}>
          {copy.lookbook.saveAction}
        </button>
      </div>
    </div>
  );
}

export function CampaignView() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <CollectionChrome view="campaign" />
      <main className="mx-auto max-w-[960px] px-5 pb-24 md:px-8">
        <p className="mx-auto mb-14 max-w-md text-center text-[15px] leading-relaxed text-[#1c1a17]/65">
          Campaign studies and the collection, worn. A quieter scroll through the frames.
        </p>
        <BlockList blocks={CAMPAIGN_BLOCKS} hero="campaign" />
      </main>
    </div>
  );
}
