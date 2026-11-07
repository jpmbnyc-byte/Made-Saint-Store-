import { PRODUCTS, RUNNER_1101, type Product } from "@/lib/business";

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
    { id: "threequarter", src: "/stories/chalk-threequarter.webp", label: "Three-quarter", alt: "Runner, Chalk, three-quarter" },
  ],
  "ms-runner-washed-denim": [
    { id: "threequarter", src: "/stories/washed-denim-threequarter.webp", label: "Three-quarter", alt: "Runner, Washed Denim, three-quarter" },
  ],
  "ms-1101-black": [
    { id: "threequarter", src: "/1101/black-side.jpg", label: "Side", alt: "1101 Runner, Black, side view" },
    { id: "reverse", src: "/1101/black-pair.jpg", label: "Pair", alt: "1101 Runner, Black, pair view" },
    { id: "hero", src: "/1101/black-worn.jpg", label: "Worn", alt: "1101 Runner, Black, worn on foot" },
  ],
  "ms-1101-navy": [
    { id: "threequarter", src: "/1101/navy-side.jpg", label: "Side", alt: "1101 Runner, Navy, side view" },
    { id: "reverse", src: "/1101/navy-pair.jpg", label: "Pair", alt: "1101 Runner, Navy, pair view" },
    { id: "hero", src: "/1101/navy-worn.jpg", label: "Worn", alt: "1101 Runner, Navy, worn on foot" },
  ],
  "ms-1101-teal": [
    { id: "threequarter", src: "/1101/teal-side.jpg", label: "Side", alt: "1101 Runner, Teal, side view" },
    { id: "reverse", src: "/1101/teal-pair.jpg", label: "Pair", alt: "1101 Runner, Teal, pair view" },
    { id: "hero", src: "/1101/teal-worn.jpg", label: "Worn", alt: "1101 Runner, Teal, worn on foot" },
  ],
  "ms-1101-espresso": [
    { id: "threequarter", src: "/1101/espresso-side.jpg", label: "Side", alt: "1101 Runner, Espresso, side view" },
    { id: "reverse", src: "/1101/espresso-pair.jpg", label: "Pair", alt: "1101 Runner, Espresso, pair view" },
    { id: "hero", src: "/1101/espresso-worn.jpg", label: "Worn", alt: "1101 Runner, Espresso, worn on foot" },
  ],
  "ms-1101-mocha": [
    { id: "threequarter", src: "/1101/mocha-side.jpg", label: "Side", alt: "1101 Runner, Mocha, side view" },
    { id: "reverse", src: "/1101/mocha-pair.jpg", label: "Pair", alt: "1101 Runner, Mocha, pair view" },
    { id: "hero", src: "/1101/mocha-worn.jpg", label: "Worn", alt: "1101 Runner, Mocha, worn on foot" },
  ],
};

/** Overhead first, so both sides of the mark are the image a client meets. */
export function viewsFor(product: Product): CatalogView[] {
  return [overhead(product), ...(EXTRA[product.id] ?? [])];
}

export function viewsById(id: string): CatalogView[] {
  const product = [...PRODUCTS, ...RUNNER_1101].find((p) => p.id === id);
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
