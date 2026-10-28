/** The Private Wardrobe visual register, mapped from the 28 Oct 2026 catalog. */

export type PaletteId = "blue-hour" | "morning-light" | "earth-sky" | "after-dark";
export type CategoryId = "tailoring" | "trousers" | "outerwear" | "knitwear" | "leisure" | "denim" | "footwear" | "accessories";
export type TierId = "private" | "signature" | "atelier";
export type ProdClass = "A" | "B" | "C" | "D" | "E";

export type Chip = { name: string; hex: string };

export type WardrobePiece = {
  id: string;
  code: string;
  name: string;
  category: CategoryId;
  palettes: PaletteId[];
  chips: Chip[];
  material: string;
  /** Lowest tier that includes this piece. Higher tiers inherit it. */
  tier: TierId;
  image?: string;
  register?: string;
  klass: ProdClass;
  note?: string;
};

export const PALETTES: Record<PaletteId, { name: string; chips: Chip[] }> = {
  "blue-hour": {
    name: "Blue Hour",
    chips: [
      { name: "Midnight", hex: "#1b2838" },
      { name: "Ivory", hex: "#e6ddd0" },
      { name: "Mineral Blue", hex: "#9eb6c8" },
      { name: "Cobalt", hex: "#2456c6" },
    ],
  },
  "morning-light": {
    name: "Morning Light",
    chips: [
      { name: "Camel", hex: "#c4965a" },
      { name: "Butter Yellow", hex: "#e4c45c" },
      { name: "Stone", hex: "#cbbba4" },
      { name: "Powder Blue", hex: "#b5d0e6" },
    ],
  },
  "earth-sky": {
    name: "Earth & Sky",
    chips: [
      { name: "Chocolate", hex: "#4a3228" },
      { name: "Sage", hex: "#7e8c6c" },
      { name: "Dusty Rose", hex: "#c48a82" },
      { name: "Ivory", hex: "#e6ddd0" },
    ],
  },
  "after-dark": {
    name: "After Dark",
    chips: [
      { name: "Carbon", hex: "#161618" },
      { name: "Graphite", hex: "#5a5a5e" },
      { name: "Mauve", hex: "#8d7380" },
      { name: "Soft Lavender", hex: "#b8a6c0" },
    ],
  },
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "tailoring", label: "Tailoring" },
  { id: "trousers", label: "Trousers" },
  { id: "outerwear", label: "Outerwear" },
  { id: "knitwear", label: "Knitwear" },
  { id: "leisure", label: "Leisure" },
  { id: "denim", label: "Denim" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
];

export const TIERS: Record<TierId, {
  name: string;
  price: number;
  garments: number;
  looks: string;
  deliveries: number;
  palettes: number;
  idea: string;
}> = {
  private: {
    name: "Private",
    price: 20000,
    garments: 12,
    looks: "8+",
    deliveries: 3,
    palettes: 2,
    idea: "The essential wardrobe. Twelve garments, two palettes, three deliveries. Foundation silhouettes only.",
  },
  signature: {
    name: "Signature",
    price: 35000,
    garments: 18,
    looks: "14+",
    deliveries: 4,
    palettes: 3,
    idea: "The expanded wardrobe. Additional tailoring families, cashmere-silk access, signature outerwear.",
  },
  atelier: {
    name: "Atelier",
    price: 55000,
    garments: 26,
    looks: "22+",
    deliveries: 6,
    palettes: 4,
    idea: "The personal collection. Advanced outerwear, named concierge, footwear exchange of equivalent allocation.",
  },
};

const TIER_RANK: Record<TierId, number> = { private: 0, signature: 1, atelier: 2 };

export const inTier = (piece: WardrobePiece, tier: TierId) => TIER_RANK[piece.tier] <= TIER_RANK[tier];

export const PIECES: WardrobePiece[] = [
  {
    id: "p01", code: "MS-P01", name: "Arrival Zip Jacket", category: "tailoring",
    palettes: ["blue-hour"], chips: [{ name: "Mineral Blue", hex: "#6e8eae" }],
    material: "Wool-cashmere / silk-wool direction",
    tier: "private", image: "/wardrobe/arrival-art-suit-blue.webp", register: "R036", klass: "D",
    note: "Existing four-view art jacket board. Artwork application and blend still need production approval.",
  },
  {
    id: "p02", code: "MS-P02", name: "Arrival Trouser", category: "trousers",
    palettes: ["blue-hour"], chips: [{ name: "Midnight", hex: "#1b2838" }],
    material: "Premium wool / wool-silk direction",
    tier: "private", image: "/wardrobe/arrival-trouser-look.webp", register: "R037", klass: "C",
    note: "Campaign look, not a factory sample. Matching slack to the Arrival jacket family.",
  },
  {
    id: "p03", code: "MS-P03", name: "Fine-Gauge Knit Polo", category: "knitwear",
    palettes: ["morning-light"], chips: PALETTES["morning-light"].chips,
    material: "Merino-silk / cotton-cashmere",
    tier: "private", klass: "A",
    note: "Image match pending. A production-class A knit; no verified board in the 28 Oct register.",
  },
  {
    id: "p04", code: "MS-P04", name: "Luxury Rugby", category: "leisure",
    palettes: ["blue-hour"], chips: PALETTES["blue-hour"].chips,
    material: "Long-staple cotton / silk-cotton",
    tier: "private", klass: "B",
    note: "Image match pending. Register rugby records R001–R005 have no verified image link.",
  },
  {
    id: "p05", code: "MS-P05", name: "Double-Face Overshirt", category: "outerwear",
    palettes: ["earth-sky"], chips: [{ name: "Mauve", hex: "#8d7380" }],
    material: "Wool-cashmere blend direction",
    tier: "private", image: "/wardrobe/jacket-mauve-denim.webp", register: "R026", klass: "D",
    note: "Original product board. Not a confirmed made-to-measure supplier pattern.",
  },
  {
    id: "p06", code: "MS-P06", name: "Leisure Blouson", category: "outerwear",
    palettes: ["earth-sky"], chips: [{ name: "Dusty Rose", hex: "#c48a82" }],
    material: "Wool-silk / technical cloth",
    tier: "private", image: "/wardrobe/blouson-dusty-rose.webp", klass: "D",
    note: "Existing front / rear detail board. Proposed premium option.",
  },
  {
    id: "p07", code: "MS-P07", name: "Relaxed Tailored Trouser", category: "trousers",
    palettes: ["earth-sky"], chips: [{ name: "Dusty Rose", hex: "#c48a82" }],
    material: "Lightweight wool / premium blend",
    tier: "private", image: "/wardrobe/trouser-terracotta.webp", klass: "C",
  },
  {
    id: "p08", code: "MS-P08", name: "Luxury Knit Crew", category: "knitwear",
    palettes: ["after-dark"], chips: [{ name: "Carbon", hex: "#161618" }],
    material: "Cashmere-merino / silk-cashmere",
    tier: "private", image: "/wardrobe/cable-knit-black.webp", klass: "B",
    note: "Exact earlier product-development board.",
  },
  {
    id: "p09", code: "MS-P09", name: "Washed Denim Jacket", category: "denim",
    palettes: ["after-dark"], chips: [{ name: "Carbon", hex: "#161618" }],
    material: "Premium cotton denim",
    tier: "private", image: "/wardrobe/jacket-black-denim.webp", klass: "D",
  },
  {
    id: "p10", code: "MS-P10", name: "Athletic-Fit Denim", category: "denim",
    palettes: ["blue-hour"], chips: PALETTES["blue-hour"].chips.slice(0, 2),
    material: "Premium washed denim",
    tier: "private", klass: "C",
    note: "Image match pending. Register denim records R022–R024 have no verified image link.",
  },
  {
    id: "p11", code: "MS-P11", name: "Soft Turtleneck", category: "knitwear",
    palettes: ["after-dark"], chips: [{ name: "Graphite", hex: "#5a5a5e" }],
    material: "Merino-cashmere",
    tier: "private", image: "/wardrobe/turtleneck-grey.webp", klass: "B",
    note: "Existing technical fashion board.",
  },
  {
    id: "p12", code: "MS-P12", name: "Tonal Zip Jacket System", category: "tailoring",
    palettes: ["morning-light", "blue-hour", "earth-sky", "after-dark"],
    chips: [
      { name: "Carbon", hex: "#2a2c30" }, { name: "Midnight", hex: "#1b2838" }, { name: "Indigo", hex: "#3d4e6b" },
      { name: "Camel", hex: "#c4965a" }, { name: "Sand", hex: "#cbbba4" }, { name: "Ivory", hex: "#e6ddd0" }, { name: "Olive", hex: "#6e7a58" },
    ],
    material: "Silk-cashmere / wool-silk",
    tier: "private", image: "/wardrobe/tonal-zip-system.webp", register: "R036", klass: "D",
    note: "Exact supplied MADE SAiNT board. Seven-color product reference, not seven approved finished SKUs.",
  },
  {
    id: "s01", code: "MS-S01", name: "Saint John Tailored Suit", category: "tailoring",
    palettes: ["morning-light"], chips: [{ name: "Camel", hex: "#c4965a" }],
    material: "Luxury suede / tailored blend",
    tier: "signature", image: "/wardrobe/suit-saint-john-camel.webp", klass: "D",
    note: "Existing design board. Cashmere/suede blend needs validation.",
  },
  {
    id: "s02", code: "MS-S02", name: "Saint Michael Tailored Suit", category: "tailoring",
    palettes: ["earth-sky"], chips: [{ name: "Olive", hex: "#6e7a58" }],
    material: "Luxury tailoring cloth",
    tier: "signature", image: "/wardrobe/suit-saint-michael-olive.webp", klass: "D",
    note: "Existing design board. Artwork provenance approval outstanding.",
  },
  {
    id: "s03", code: "MS-S03", name: "Indigo Pinstripe Suit", category: "tailoring",
    palettes: ["blue-hour"], chips: [{ name: "Indigo", hex: "#3d4e6b" }],
    material: "Fine pinstripe wool / linen-denim direction",
    tier: "signature", image: "/wardrobe/course-edit-campaign.webp", register: "R029", klass: "D",
    note: "Existing campaign trio. Product identity as photographed, not a factory sample.",
  },
  {
    id: "s04", code: "MS-S04", name: "Black Minimal Zip Blouson", category: "outerwear",
    palettes: ["after-dark"], chips: [{ name: "Carbon", hex: "#161618" }],
    material: "Luxury wool / blended textile",
    tier: "signature", image: "/wardrobe/blouson-black-zip.webp", klass: "D",
  },
  {
    id: "s05", code: "MS-S05", name: "Art Jacket — Magdalene", category: "outerwear",
    palettes: ["blue-hour"], chips: [{ name: "Mineral Blue", hex: "#6e8eae" }],
    material: "Luxury tailored cloth",
    tier: "signature", image: "/wardrobe/arrival-art-suit-blue.webp", klass: "E",
    note: "Existing artwork-jacket output. Artwork application and production finish pending.",
  },
  {
    id: "a02", code: "MS-A02", name: "Crushed Nylon Travel Trouser", category: "trousers",
    palettes: ["after-dark"], chips: [{ name: "Charcoal", hex: "#3a3a3e" }, { name: "Mauve", hex: "#8d7380" }],
    material: "Crushed technical nylon",
    tier: "atelier", image: "/wardrobe/look-crushed-nylon.webp", klass: "C",
    note: "Previously designed tailoring direction. Material specs pending.",
  },
  {
    id: "a03", code: "MS-A03", name: "Black Knit & Mauve Trouser Look", category: "knitwear",
    palettes: ["earth-sky", "after-dark"], chips: [{ name: "Carbon", hex: "#161618" }, { name: "Mauve", hex: "#8d7380" }],
    material: "Soft knit + tailored trouser",
    tier: "atelier", image: "/wardrobe/look-knit-mauve.webp", klass: "B",
  },
  {
    id: "f01", code: "MS-F01", name: "Class Slipper", category: "footwear",
    palettes: ["after-dark"], chips: [{ name: "Carbon", hex: "#161618" }],
    material: "Premium suede (proposed)",
    tier: "signature", image: "/wardrobe/class-slipper.webp", register: "R049", klass: "E",
    note: "Exact original product asset. Footwear is an allocation exchange, not automatic MTM.",
  },
  {
    id: "f02", code: "MS-F02", name: "Trail Mule — Carbon", category: "footwear",
    palettes: ["after-dark"], chips: [{ name: "Carbon", hex: "#161618" }],
    material: "Nylon ripstop / rugged sole",
    tier: "signature", image: "/wardrobe/mule-carbon.webp", register: "R046", klass: "E",
    note: "MS-TM01. Heel construction and outsole still under review.",
  },
  {
    id: "f03", code: "MS-F03", name: "Trail Mule — Cocoa Sand", category: "footwear",
    palettes: ["morning-light"], chips: [{ name: "Camel", hex: "#c4965a" }, { name: "Stone", hex: "#cbbba4" }],
    material: "Premium textured upper / rubber sole",
    tier: "signature", image: "/wardrobe/mule-cocoa.webp", register: "R046", klass: "E",
  },
  {
    id: "f04", code: "MS-F04", name: "Trail Mule — Dusty Rose", category: "footwear",
    palettes: ["earth-sky"], chips: [{ name: "Dusty Rose", hex: "#c48a82" }],
    material: "Technical upper / rubber outsole",
    tier: "atelier", image: "/wardrobe/mule-dusty-rose.webp", register: "R046", klass: "E",
  },
  {
    id: "f05", code: "MS-F05", name: "Alpine Loop Mule — Sage", category: "footwear",
    palettes: ["earth-sky"], chips: [{ name: "Sage", hex: "#7e8c6c" }, { name: "Powder Blue", hex: "#b5d0e6" }],
    material: "Textured upper / ski-knit lining",
    tier: "atelier", image: "/wardrobe/mule-alpine-sage.webp", register: "R048", klass: "E",
    note: "Original alpine ski-knit reference. Not shoe production approval.",
  },
  {
    id: "f06", code: "MS-F06", name: "Alpine Mule — Glacier", category: "footwear",
    palettes: ["blue-hour"], chips: [{ name: "Powder Blue", hex: "#b5d0e6" }, { name: "Stone", hex: "#cbbba4" }],
    material: "Premium textured upper",
    tier: "atelier", image: "/wardrobe/mule-alpine-glacier.webp", register: "R048", klass: "E",
  },
  {
    id: "rn01", code: "MS-RN-01", name: "Lifestyle Runner — Navy Intrecciato", category: "footwear",
    palettes: ["blue-hour"], chips: [{ name: "Midnight", hex: "#2c323d" }, { name: "Sand", hex: "#b4a387" }],
    material: "Woven calf, sand mesh, nub-lug sole",
    tier: "signature", image: "/stories/navy-intrecciato.webp", klass: "E",
    note: "Locked studio colorway. Founding Edition pre-order at $695.",
  },
  {
    id: "rn02", code: "MS-RN-02", name: "Lifestyle Runner — Espresso", category: "footwear",
    palettes: ["after-dark"], chips: [{ name: "Chocolate", hex: "#3a2e28" }],
    material: "Calf suede, technical mesh, oxblood lining",
    tier: "signature", image: "/stories/espresso-oxblood.webp", klass: "E",
  },
  {
    id: "rn03", code: "MS-RN-03", name: "Lifestyle Runner — Graphite", category: "footwear",
    palettes: ["after-dark"], chips: [{ name: "Graphite", hex: "#4a4a4e" }],
    material: "Embossed calf suede, tonal",
    tier: "signature", image: "/stories/graphite-tonal.webp", klass: "E",
  },
  {
    id: "rn04", code: "MS-RN-04", name: "Lifestyle Runner — Chalk", category: "footwear",
    palettes: ["blue-hour"], chips: [{ name: "Ivory", hex: "#e6ddd0" }, { name: "Midnight", hex: "#1b2838" }],
    material: "Bouclé suede, navy canvas",
    tier: "signature", image: "/stories/chalk-navy.webp", klass: "E",
    note: "Locked studio colorway. Founding Edition pre-order at $595.",
  },
  {
    id: "rn05", code: "MS-RN-05", name: "Lifestyle Runner — Navy and Rust", category: "footwear",
    palettes: ["earth-sky"], chips: [{ name: "Midnight", hex: "#2c323d" }, { name: "Rust", hex: "#8a4a28" }],
    material: "Woven calf, rust canvas",
    tier: "atelier", image: "/stories/navy-weave-rust.webp", klass: "E",
  },
  {
    id: "rn06", code: "MS-RN-06", name: "Lifestyle Runner — Washed Denim", category: "footwear",
    palettes: ["blue-hour"], chips: [{ name: "Mineral Blue", hex: "#93a8b9" }, { name: "Midnight", hex: "#1b2838" }],
    material: "Two-tone selvedge-style denim",
    tier: "signature", image: "/stories/washed-denim.webp", klass: "E",
    note: "Locked studio colorway. Founding Edition pre-order at $545.",
  },
  {
    id: "a01", code: "MS-A01", name: "Denim-Trim Duffel", category: "accessories",
    palettes: ["morning-light"], chips: [{ name: "Butter Yellow", hex: "#e4c45c" }, { name: "Denim Blue", hex: "#6a86a3" }],
    material: "Premium denim / trim",
    tier: "atelier", image: "/wardrobe/duffel-butter.webp", register: "R067", klass: "B",
    note: "Original product image. Bag-material specification pending.",
  },
  {
    id: "denim-look", code: "MS-LOOK-01", name: "Washed Denim with Pastel Knitwear", category: "denim",
    palettes: ["morning-light", "earth-sky"],
    chips: [{ name: "Butter Yellow", hex: "#e4c45c" }, { name: "Dusty Rose", hex: "#c48a82" }, { name: "Sage", hex: "#7e8c6c" }],
    material: "Portuguese denim candidate, pastel knit",
    tier: "signature", image: "/wardrobe/denim-pastel-knit.webp", klass: "D",
    note: "Existing coordinated styling reference, not an isolated approved SKU photo.",
  },
];

export const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
