/**
 * Approved still photographs for priced Line refs that lack a large linked frame.
 * Sources are existing look/collection masters already used on the site.
 * Prices remain the LIVE list figures from the 17 Nov 2026 working price sheet.
 */

export type ProductStill = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Stills that unlock a public product page when a frame is missing. */
export const PRODUCT_STILLS: Record<string, ProductStill> = {
  N003: {
    src: "/collection/mauve-nylon.webp",
    width: 819,
    height: 1024,
    alt: "Crushed nylon tailored trouser in mauve, worn full length",
  },
  N005: {
    src: "/line/f35.webp",
    width: 1024,
    height: 1536,
    alt: "Arrival zip jacket in navy, worn with the matching trouser",
  },
  N006: {
    src: "/collection/midnight.webp",
    width: 682,
    height: 1024,
    alt: "Arrival tailored trouser in midnight, worn with the matching zip jacket",
  },
};

export function productStill(ref: string): ProductStill | null {
  return PRODUCT_STILLS[ref.toUpperCase()] ?? null;
}
