import { PRODUCTS, type Product } from "@/lib/business";

/** Approved store views. The overhead photograph is the pair. */
export type ViewId = "product" | "threequarter" | "reverse" | "detail" | "hero" | "study";

export type CatalogView = {
  id: ViewId;
  src: string;
  label: string;
  alt: string;
};

const overhead = (p: Product): CatalogView => ({
  id: "product",
  src: p.image,
  label: "Overhead",
  alt: `${p.name}, overhead`,
});

const EXTRA: Record<string, CatalogView[]> = {
  "ms-runner-chalk-navy": [
    { id: "threequarter", src: "/stories/chalk-threequarter.webp", label: "Three-quarter", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, three-quarter" },
    { id: "hero", src: "/hero/navy-ivory.webp", label: "On limestone", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, with the MADE SAINT tongue mark" },
  ],
  "ms-runner-washed-denim": [
    { id: "threequarter", src: "/stories/washed-denim-threequarter.webp", label: "Three-quarter", alt: "MADE SAiNT 0929 Runner — Washed / Indigo, three-quarter" },
  ],
};

/** Overhead first, so both sides of the mark are the image a client meets. */
export function viewsFor(product: Product): CatalogView[] {
  return [overhead(product), ...(EXTRA[product.id] ?? [])];
}

export function viewsById(id: string): CatalogView[] {
  const product = PRODUCTS.find((p) => p.id === id);
  return product ? viewsFor(product) : [];
}

/**
 * Wardrobe garments have no locked model and no approved five-view set.
 * They stay off the client shop until a reference is approved.
 */
export const IMAGE_HOLD = [
  "Private Wardrobe garments",
  "MS-TM01 Trail Mule",
] as const;
