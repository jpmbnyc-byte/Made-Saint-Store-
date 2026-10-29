import { PRODUCTS, type Product } from "@/lib/business";

/** Approved store views. Overhead is the placement lock for the wave on both quarters. */
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
  alt: `${p.name}, overhead, wave on both quarters`,
});

const EXTRA: Record<string, CatalogView[]> = {
  "ms-runner-chalk-navy": [
    {
      id: "threequarter",
      src: "/hero/look1-runner-hero.webp",
      label: "Three-quarter",
      alt: "Runner, Chalk, three-quarter pair",
    },
    {
      id: "detail",
      src: "/catalog/ms-runner-chalk-navy/detail.webp",
      label: "Mark",
      alt: "Runner, Chalk, three-peak wave on the quarter mesh",
    },
  ],
  "ms-runner-espresso": [
    {
      id: "threequarter",
      src: "/hero/look3-runner-inverse.webp",
      label: "Three-quarter",
      alt: "Runner, Espresso, three-quarter pair",
    },
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
