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

const worn = "Worn study. Not a client.";

const EXTRA: Record<string, CatalogView[]> = {
  "ms-runner-chalk-navy": [
    { id: "threequarter", src: "/runners/navy-ivory-pair.webp", label: "Pair", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, the pair" },
    { id: "threequarter", src: "/runners/navy-ivory-threequarter.webp", label: "Three-quarter", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, three-quarter" },
    { id: "reverse", src: "/runners/navy-ivory-lateral.webp", label: "Lateral", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, lateral" },
    { id: "reverse", src: "/runners/navy-ivory-medial.webp", label: "Medial", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, medial" },
    { id: "reverse", src: "/runners/navy-ivory-rear.webp", label: "Rear", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, rear" },
    { id: "detail", src: "/runners/navy-ivory-detail.webp", label: "Detail", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, wave and sole" },
    { id: "study", src: "/runners/navy-ivory-worn.webp", label: "Worn", alt: `MADE SAiNT 0929 Runner — Navy / Ivory. ${worn}` },
    { id: "hero", src: "/hero/navy-ivory.webp", label: "On limestone", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, with the MADE SAINT tongue mark" },
  ],
  "ms-runner-navy-intrecciato": [
    { id: "threequarter", src: "/runners/navy-sand-lateral.webp", label: "Lateral", alt: "MADE SAiNT 0929 Runner — Navy / Sand, lateral" },
    { id: "reverse", src: "/runners/navy-sand-medial.webp", label: "Medial", alt: "MADE SAiNT 0929 Runner — Navy / Sand, medial" },
    { id: "detail", src: "/runners/navy-sand-detail.webp", label: "Detail", alt: "MADE SAiNT 0929 Runner — Navy / Sand, wave and sole" },
    { id: "study", src: "/runners/navy-sand-worn.webp", label: "Worn", alt: `MADE SAiNT 0929 Runner — Navy / Sand. ${worn}` },
  ],
  "ms-runner-washed-denim": [
    { id: "threequarter", src: "/runners/indigo-pair.webp", label: "Pair", alt: "MADE SAiNT 0929 Runner — Washed / Indigo, the pair" },
    { id: "reverse", src: "/runners/indigo-lateral.webp", label: "Lateral", alt: "MADE SAiNT 0929 Runner — Washed / Indigo, lateral" },
    { id: "reverse", src: "/runners/indigo-medial.webp", label: "Medial", alt: "MADE SAiNT 0929 Runner — Washed / Indigo, medial" },
    { id: "reverse", src: "/runners/indigo-rear.webp", label: "Rear", alt: "MADE SAiNT 0929 Runner — Washed / Indigo, rear" },
    { id: "detail", src: "/runners/indigo-detail.webp", label: "Detail", alt: "MADE SAiNT 0929 Runner — Washed / Indigo, wave and sole" },
    { id: "study", src: "/runners/indigo-worn.webp", label: "Worn", alt: `MADE SAiNT 0929 Runner — Washed / Indigo. ${worn}` },
  ],
  "ms-runner-1101-mesh-black": [
    { id: "threequarter", src: "/runners/1213/vintage/mesh-black-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Black Vintage Mesh, the pair" },
    { id: "reverse", src: "/runners/1213/vintage/mesh-black-lateral-a.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Black Vintage Mesh, lateral" },
    { id: "reverse", src: "/runners/1213/vintage/mesh-black-lateral-b.webp", label: "Profile", alt: "MADE SAiNT 1101 Runner — Black Vintage Mesh, profile" },
    { id: "detail", src: "/runners/1213/vintage/mesh-black-detail.webp", label: "Detail", alt: "MADE SAiNT 1101 Runner — Black Vintage Mesh, mesh and tongue" },
  ],
  "ms-runner-1101-mesh-cocoa": [
    { id: "threequarter", src: "/runners/1213/vintage/mesh-cocoa-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Cocoa Mesh, the pair" },
    { id: "reverse", src: "/runners/1213/vintage/mesh-cocoa-lateral-a.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Cocoa Mesh, lateral" },
    { id: "reverse", src: "/runners/1213/vintage/mesh-cocoa-lateral-b.webp", label: "Profile", alt: "MADE SAiNT 1101 Runner — Cocoa Mesh, profile" },
    { id: "detail", src: "/runners/1213/vintage/mesh-cocoa-detail.webp", label: "Detail", alt: "MADE SAiNT 1101 Runner — Cocoa Mesh, mesh and tongue" },
  ],
  "ms-runner-1101-mesh-stone": [
    { id: "threequarter", src: "/runners/1213/vintage/mesh-stone-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Stone Mesh, the pair" },
    { id: "reverse", src: "/runners/1213/vintage/mesh-stone-lateral-a.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Stone Mesh, lateral" },
    { id: "reverse", src: "/runners/1213/vintage/mesh-stone-lateral-b.webp", label: "Profile", alt: "MADE SAiNT 1101 Runner — Stone Mesh, profile" },
    { id: "detail", src: "/runners/1213/vintage/mesh-stone-detail.webp", label: "Detail", alt: "MADE SAiNT 1101 Runner — Stone Mesh, mesh and tongue" },
  ],
  "ms-runner-1101-leather-espresso": [
    { id: "threequarter", src: "/runners/1213/vintage/leather-espresso-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Espresso Leather, the pair" },
    { id: "reverse", src: "/runners/1213/vintage/leather-espresso-lateral-a.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Espresso Leather, lateral" },
    { id: "reverse", src: "/runners/1213/vintage/leather-espresso-lateral-b.webp", label: "Profile", alt: "MADE SAiNT 1101 Runner — Espresso Leather, profile" },
    { id: "detail", src: "/runners/1213/vintage/leather-espresso-detail.webp", label: "Detail", alt: "MADE SAiNT 1101 Runner — Espresso Leather, upper and tongue" },
  ],
  "ms-runner-1101-leather-navy": [
    { id: "threequarter", src: "/runners/1213/vintage/leather-navy-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Navy Leather, the pair" },
    { id: "reverse", src: "/runners/1213/vintage/leather-navy-lateral-a.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Navy Leather, lateral" },
    { id: "reverse", src: "/runners/1213/vintage/leather-navy-lateral-b.webp", label: "Profile", alt: "MADE SAiNT 1101 Runner — Navy Leather, profile" },
    { id: "detail", src: "/runners/1213/vintage/leather-navy-detail.webp", label: "Detail", alt: "MADE SAiNT 1101 Runner — Navy Leather, upper and tongue" },
  ],
  "ms-runner-1101-leather-taupe": [
    { id: "threequarter", src: "/runners/1213/vintage/leather-taupe-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Taupe Leather, the pair" },
    { id: "reverse", src: "/runners/1213/vintage/leather-taupe-lateral-a.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Taupe Leather, lateral" },
    { id: "reverse", src: "/runners/1213/vintage/leather-taupe-lateral-b.webp", label: "Profile", alt: "MADE SAiNT 1101 Runner — Taupe Leather, profile" },
    { id: "detail", src: "/runners/1213/vintage/leather-taupe-detail.webp", label: "Detail", alt: "MADE SAiNT 1101 Runner — Taupe Leather, upper and tongue" },
  ],
  "ms-runner-1101-butter": [
    { id: "threequarter", src: "/runners/1213/1101-butter-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Brown Mesh, the pair" },
    { id: "study", src: "/runners/1213/1101-brown-atelier.webp", label: "Atelier", alt: "MADE SAiNT 1101 Runner — Brown Mesh, atelier floor" },
    { id: "product", src: "/runners/1213/1101-brown-pair.webp", label: "Studio", alt: "MADE SAiNT 1101 Runner — Brown Mesh, studio pair" },
  ],
  "ms-runner-1101-teal": [
    { id: "threequarter", src: "/runners/1213/1101-teal-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Teal, the pair" },
  ],
  "ms-runner-1101-navy": [
    { id: "threequarter", src: "/runners/1213/1101-navy-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Navy, the pair" },
    { id: "reverse", src: "/runners/1213/1101-navy-lateral.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Navy, lateral" },
  ],
  "ms-runner-1101-bronze": [
    { id: "threequarter", src: "/runners/1213/1101-bronze-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Bronze, the pair" },
    { id: "reverse", src: "/runners/1213/1101-bronze-lateral.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Bronze, lateral" },
  ],
  "ms-runner-1101-blush": [
    { id: "threequarter", src: "/runners/1213/1101-blush-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Blush, the pair" },
    { id: "reverse", src: "/runners/1213/1101-blush-lateral.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Blush, lateral" },
  ],
  "ms-runner-1101-onyx": [
    { id: "threequarter", src: "/runners/1213/1101-onyx-pair.webp", label: "Pair", alt: "MADE SAiNT 1101 Runner — Onyx, the pair" },
    { id: "reverse", src: "/runners/1213/1101-onyx-lateral.webp", label: "Lateral", alt: "MADE SAiNT 1101 Runner — Onyx, lateral" },
  ],
  "ms-runner-1213-sacred-light": [
    { id: "threequarter", src: "/runners/1213/sacred-light.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Sacred Light, three-quarter" },
    { id: "reverse", src: "/runners/1213/sacred-light-profile.webp", label: "Profile", alt: "MADE SAiNT 1213 Runner — Sacred Light, profile" },
    { id: "product", src: "/runners/1213/sacred-light-overhead.webp", label: "Overhead", alt: "MADE SAiNT 1213 Runner — Sacred Light, overhead" },
    { id: "reverse", src: "/runners/1213/sacred-light-rear.webp", label: "Rear", alt: "MADE SAiNT 1213 Runner — Sacred Light, rear" },
    { id: "study", src: "/runners/1213/sacred-light-worn-plum.webp", label: "Worn, plum", alt: `MADE SAiNT 1213 Runner — Sacred Light, worn with a plum bag. ${worn}` },
    { id: "study", src: "/runners/1213/sacred-light-worn-butter.webp", label: "Worn, butter", alt: `MADE SAiNT 1213 Runner — Sacred Light, worn with a butter bag. ${worn}` },
  ],
};

/** Overhead first, so both sides of the mark are the image a client meets. */
export function viewsFor(product: Product): CatalogView[] {
  const extra = EXTRA[product.id] ?? [];
  if (extra.some((view) => view.src === product.image)) return extra;
  if (extra.length) return product.series === "0929" ? [overhead(product), ...extra] : extra;
  if (product.series === "0929") return [overhead(product)];
  return [{ id: "threequarter", src: product.image, label: "Three-quarter", alt: `${product.name}, three-quarter` }];
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
