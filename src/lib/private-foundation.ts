import { PALETTES, usd, type Chip, type ProdClass } from "@/lib/wardrobe";

/** Indicative manufacturing bands. Not factory quotes. */
export const CLASS_BAND: Record<ProdClass, { lo: number; hi: number; mid: number; credits: number; examples: string }> = {
  A: { lo: 150, hi: 250, mid: 200, credits: 1, examples: "Premium polo / shirt" },
  B: { lo: 250, hi: 400, mid: 325, credits: 1, examples: "Fine-gauge knit / rugby" },
  C: { lo: 350, hi: 500, mid: 425, credits: 2, examples: "Tailored trouser" },
  D: { lo: 600, hi: 850, mid: 725, credits: 3, examples: "Structured jacket / overshirt" },
  E: { lo: 900, hi: 1500, mid: 1200, credits: 4, examples: "Advanced outerwear / footwear" },
};

export const FAMILIES = [
  {
    id: "arrival",
    name: "Arrival zip",
    master: "MS-001 Arrival Jacket + matching slack",
    garments: 2,
    menu: ["Athletic Relaxed / Regular / Tailored", "Body and sleeve length", "Cashmere-wool or silk-wool", "Midnight / Mineral / Cobalt", "Brushed nickel, tonal lining, micro embroidery"],
  },
  {
    id: "trouser",
    name: "Tailored trouser",
    master: "MS-002 Tapered dress slack",
    garments: 3,
    menu: ["Athletic Relaxed / Straight", "Rise and hem", "Same wool-silk as Arrival, or a lighter seasonal cloth", "Midnight / Charcoal / Stone", "Unfinished hem until first fitting"],
  },
  {
    id: "polo",
    name: "Knit polo",
    master: "MS-003 Fine-gauge polo",
    garments: 2,
    menu: ["Athletic / Regular", "Sleeve and body length", "Merino-silk or cotton-cashmere", "Ivory / Powder Blue", "Tonal buttons, no contrast tipping"],
  },
  {
    id: "rugby",
    name: "Rugby / leisure shirt",
    master: "MS-004 Silk-cotton rugby",
    garments: 2,
    menu: ["Athletic Relaxed", "Body length", "Long-staple cotton or silk-cotton", "Ivory / Midnight", "Rubber buttons, optional tonal collar"],
  },
  {
    id: "knit",
    name: "Fine-gauge knit",
    master: "MS-005 Crew and turtleneck from one pattern",
    garments: 2,
    menu: ["Crew / Turtleneck", "Body length", "Cashmere-merino", "Ivory / Cobalt", "Fully fashioned, no side seams"],
  },
  {
    id: "overshirt",
    name: "Seasonal overshirt",
    master: "MS-006 Double-face overshirt",
    garments: 1,
    menu: ["Athletic Relaxed", "Body length", "Wool-cashmere double face", "Powder Blue / Mineral", "Horn buttons, unlined"],
  },
] as const;

export type Slot = {
  id: string;
  family: (typeof FAMILIES)[number]["id"];
  code: string;
  name: string;
  color: Chip;
  klass: ProdClass;
  valueUsd: number;
  image?: string;
  photoNote?: string;
  pending?: boolean;
};

/**
 * The Private 12, engineered as one collection for Blue Hour.
 * Manufacturing $ figures are band midpoints, est. Allocated values sum to $20,000.
 */
export const PRIVATE_SLOTS: Slot[] = [
  { id: "j1", family: "arrival", code: "MS-P01", name: "Arrival Zip Jacket", color: { name: "Midnight", hex: "#1b2838" }, klass: "D", valueUsd: 2400, image: "/wardrobe/tonal-zip-system.webp", photoNote: "Tonal zip system board. Midnight is the left-hand Carbon/Midnight column." },
  { id: "j2", family: "arrival", code: "MS-P01b", name: "Arrival Zip Jacket", color: { name: "Mineral Blue", hex: "#6e8eae" }, klass: "D", valueUsd: 2400, image: "/wardrobe/arrival-art-suit-blue.webp", photoNote: "Existing four-view art jacket. Same Arrival pattern, second color." },
  { id: "t1", family: "trouser", code: "MS-P02", name: "Arrival Trouser", color: { name: "Midnight", hex: "#1b2838" }, klass: "C", valueUsd: 1800, image: "/wardrobe/arrival-trouser-look.webp" },
  { id: "t2", family: "trouser", code: "MS-P02b", name: "Arrival Trouser", color: { name: "Charcoal", hex: "#3a3a3e" }, klass: "C", valueUsd: 1800, image: "/wardrobe/look-crushed-nylon.webp", photoNote: "Charcoal slack from an existing look. Production cloth is the Arrival wool-silk, not nylon." },
  { id: "t3", family: "trouser", code: "MS-P02c", name: "Arrival Trouser", color: { name: "Charcoal", hex: "#3a3a3e" }, klass: "C", valueUsd: 1800, photoNote: "Second charcoal pair, same pattern. No separate board — it is a repeat of MS-P02b in the size run." },
  { id: "k1", family: "polo", code: "MS-P03", name: "Fine-Gauge Knit Polo", color: { name: "Ivory", hex: "#e6ddd0" }, klass: "A", valueUsd: 1100, pending: true },
  { id: "k2", family: "polo", code: "MS-P03b", name: "Fine-Gauge Knit Polo", color: { name: "Powder Blue", hex: "#b5d0e6" }, klass: "A", valueUsd: 1100, pending: true },
  { id: "r1", family: "rugby", code: "MS-P04", name: "Luxury Rugby", color: { name: "Ivory", hex: "#e6ddd0" }, klass: "B", valueUsd: 1300, pending: true },
  { id: "r2", family: "rugby", code: "MS-P04b", name: "Luxury Rugby", color: { name: "Midnight", hex: "#1b2838" }, klass: "B", valueUsd: 1300, pending: true },
  { id: "n1", family: "knit", code: "MS-P11", name: "Soft Turtleneck", color: { name: "Ivory", hex: "#e6ddd0" }, klass: "B", valueUsd: 1400, image: "/wardrobe/turtleneck-grey.webp", photoNote: "Grey technical board standing in. Blue Hour dyes this Ivory." },
  { id: "n2", family: "knit", code: "MS-P08", name: "Luxury Knit Crew", color: { name: "Cobalt", hex: "#2456c6" }, klass: "B", valueUsd: 1400, image: "/wardrobe/cable-knit-black.webp", photoNote: "Black cable board standing in. Blue Hour dyes the statement crew Cobalt." },
  { id: "o1", family: "overshirt", code: "MS-P05", name: "Double-Face Overshirt", color: { name: "Powder Blue", hex: "#b5d0e6" }, klass: "D", valueUsd: 2200, image: "/wardrobe/jacket-mauve-denim.webp", photoNote: "Mauve overshirt board. Same pattern family; Blue Hour runs it in Powder Blue." },
];

export const LOOKS: { id: string; name: string; pieces: string[]; wear: string }[] = [
  { id: "l1", name: "Midnight set", pieces: ["j1", "t1"], wear: "Jacket and matching trouser. The January delivery, the fit proof." },
  { id: "l2", name: "Midnight on charcoal", pieces: ["j1", "t2"], wear: "Same jacket, second trouser. Why two charcoal pairs exist." },
  { id: "l3", name: "Mineral on charcoal", pieces: ["j2", "t3"], wear: "Second Arrival color on the spare charcoal slack." },
  { id: "l4", name: "Ivory rugby", pieces: ["r1", "t2"], wear: "Leisure shirt into the same trouser as the jacket looks." },
  { id: "l5", name: "Powder polo", pieces: ["k2", "t3"], wear: "Knit polo, charcoal trouser. Warm-weather delivery." },
  { id: "l6", name: "Ivory knit", pieces: ["n1", "t1"], wear: "Turtleneck under or instead of the midnight jacket." },
  { id: "l7", name: "Cobalt statement", pieces: ["n2", "t2"], wear: "The cobalt crew as the only loud piece, on charcoal." },
  { id: "l8", name: "Overshirt day", pieces: ["o1", "k2", "t3"], wear: "Powder overshirt over the powder polo. September delivery still matches January trousers." },
  { id: "l9", name: "Layered midnight", pieces: ["j1", "r1", "t2"], wear: "Jacket over ivory rugby. One outfit, two pattern families." },
  { id: "l10", name: "Mineral polo", pieces: ["j2", "k1", "t1"], wear: "Mineral jacket, ivory polo, midnight trouser." },
];

export const MENU = [
  { n: "01", choose: "Fit", factory: "Approved measurements and pattern adjustments" },
  { n: "02", choose: "Silhouette", factory: "Existing master pattern (one of six)" },
  { n: "03", choose: "Material", factory: "Fabric code and construction" },
  { n: "04", choose: "Palette", factory: "Fabric-color and trim codes" },
  { n: "05", choose: "Finish", factory: "Bill of materials and finishing" },
];

export const ENVELOPE = [
  { k: "Garment manufacturing, materials, trims", cap: 5900 },
  { k: "Quality control, packaging, shipping", cap: 650 },
  { k: "Fit services and wardrobe coordination", cap: 750 },
  { k: "Customer acquisition and onboarding", cap: 700 },
];

export const TIER_ECONOMICS = [
  { id: "private" as const, price: 20000, garments: 12, mfg: 5900, other: 2100, contrib: 12000, margin: 0.6 },
  { id: "signature" as const, price: 35000, garments: 18, mfg: 11500, other: 4500, contrib: 19000, margin: 0.543 },
  { id: "atelier" as const, price: 55000, garments: 26, mfg: 19000, other: 7000, contrib: 29000, margin: 0.527 },
];

export const FOUNDING_MIX = [
  { id: "private" as const, clients: 12, value: 240000, contrib: 144000, garments: 144 },
  { id: "signature" as const, clients: 6, value: 210000, contrib: 114000, garments: 108 },
  { id: "atelier" as const, clients: 2, value: 110000, contrib: 58000, garments: 52 },
];

export function slotCost(s: Slot, which: "mid" | "lo" | "hi") {
  return CLASS_BAND[s.klass][which];
}

export function collectionCost(which: "mid" | "lo" | "hi") {
  return PRIVATE_SLOTS.reduce((n, s) => n + slotCost(s, which), 0);
}

export const MFG_CAP = 5900;
export const PRIVATE_PRICE = 20000;
export const CREDIT_BUDGET = PRIVATE_SLOTS.reduce((n, s) => n + CLASS_BAND[s.klass].credits, 0);

export const mfg = {
  lo: collectionCost("lo"),
  mid: collectionCost("mid"),
  hi: collectionCost("hi"),
};

export const holdsAtMid = mfg.mid <= MFG_CAP;
export const holdsAtHi = mfg.hi <= MFG_CAP;

export { PALETTES, usd };
