export type HeightCategory = "standard" | "tall" | "exceptionally-tall" | "none";
export type ProportionCategory =
  | "standard-editorial"
  | "athletic"
  | "broad-shoulder"
  | "larger-lower-body"
  | "product-only";

export type HouseModel = {
  id: string;
  name: string;
  heightCategory: HeightCategory;
  proportion: ProportionCategory;
  genderPresentation: "female" | "male" | "none";
  /** No face, hair, or body photographs are approved yet. Identity cannot be locked. */
  referenceAssetIds: string[];
  stylingNotes: string;
  usage: string;
};

export const MODELS: HouseModel[] = [
  {
    id: "mod-none",
    name: "No model",
    heightCategory: "none",
    proportion: "product-only",
    genderPresentation: "none",
    referenceAssetIds: [],
    stylingNotes: "Product only. No person in the frame.",
    usage: "Footwear and accessory studies.",
  },
  {
    id: "mod-editorial-01",
    name: "House Editorial 01",
    heightCategory: "standard",
    proportion: "standard-editorial",
    genderPresentation: "male",
    referenceAssetIds: [],
    stylingNotes: "Quiet posture, no jewelry, natural skin. A house model, not a client and not a public figure.",
    usage: "Standard e-commerce and campaign frames.",
  },
  {
    id: "mod-tall-01",
    name: "House Tall Athletic 01",
    heightCategory: "exceptionally-tall",
    proportion: "athletic",
    genderPresentation: "male",
    referenceAssetIds: [],
    stylingNotes: "Private-client proportions. Broad shoulder, long limb. Do not stretch a standard body to imply height. Not a named athlete.",
    usage: "Arrival, occasion, and personal-fit frames.",
  },
  {
    id: "mod-editorial-02",
    name: "House Editorial 02",
    heightCategory: "tall",
    proportion: "standard-editorial",
    genderPresentation: "female",
    referenceAssetIds: [],
    stylingNotes: "Quiet posture, no jewelry. A house model, not a client and not a public figure.",
    usage: "Womenswear frames when a product record exists.",
  },
];

export const modelById = (id: string) => MODELS.find((m) => m.id === id);

export const STUDIOS = [
  { id: "ivory", name: "Primary studio", hex: "#F1EEE8", use: "ecom" as const, note: "Warm ivory seamless, soft daylight, a short shadow." },
  { id: "limestone", name: "Limestone interior", hex: "#E4DDD2", use: "editorial" as const, note: "Plaster, neutral floor, empty space." },
  { id: "residence", name: "Quiet residence", hex: "", use: "editorial" as const, note: "Original architectural interior. Not a copied campaign set." },
  { id: "lounge", name: "Private lounge", hex: "", use: "editorial" as const, note: "Restrained furniture, no props that compete with the cloth." },
  { id: "hotel", name: "Hotel entrance", hex: "", use: "editorial" as const, note: "Arrival. No sport signage." },
  { id: "courtyard", name: "Stone courtyard", hex: "", use: "editorial" as const, note: "Daylight, stone, little else." },
  { id: "gallery", name: "Gallery", hex: "", use: "editorial" as const, note: "White volume, one artwork at most, out of focus." },
  { id: "terminal", name: "Travel hall", hex: "", use: "editorial" as const, note: "A quiet hall, not an airport advertisement." },
  { id: "golf", name: "Course edge", hex: "", use: "editorial" as const, note: "Landscape only. No play, no logos of a club." },
  { id: "exterior", name: "Architectural exterior", hex: "", use: "editorial" as const, note: "A plain facade and daylight." },
] as const;

export const CAMPAIGNS = [
  { id: "arrival", title: "The Arrival", modelId: "mod-tall-01", studioId: "hotel", pieces: "Silk-cashmere zip jacket, tailored trouser, fine-gauge polo, footwear." },
  { id: "off-duty", title: "The Off-Duty", modelId: "mod-tall-01", studioId: "residence", pieces: "Denim jacket, relaxed denim, cashmere knit, suede footwear." },
  { id: "transit", title: "The Transit", modelId: "mod-tall-01", studioId: "terminal", pieces: "Luxury rugby, technical trouser, approved footwear." },
  { id: "occasion", title: "The Occasion", modelId: "mod-tall-01", studioId: "gallery", pieces: "Suede-cashmere tailoring, turtleneck, footwear." },
  { id: "personal-fit", title: "The Personal Fit", modelId: "mod-tall-01", studioId: "limestone", pieces: "Made-to-measure tailoring. Fit and shoulder, not a factory documentary." },
] as const;

/** Storefront slots. Empty until an image is published into the slot. */
export const SLOTS = [
  { id: "home-hero", place: "Homepage", label: "Primary editorial hero" },
  { id: "home-hero-alt-1", place: "Homepage", label: "Seasonal hero" },
  { id: "home-hero-alt-2", place: "Homepage", label: "Second seasonal hero" },
  { id: "home-private", place: "Homepage", label: "Private-client introduction" },
  { id: "home-craft", place: "Homepage", label: "Craftsmanship feature" },
  { id: "home-overview", place: "Homepage", label: "Collection overview" },
  { id: "wardrobe-hero", place: "Private Wardrobe", label: "Campaign hero" },
  { id: "wardrobe-season-1", place: "Private Wardrobe", label: "Collection 01" },
  { id: "wardrobe-season-2", place: "Private Wardrobe", label: "Collection 02" },
  { id: "wardrobe-season-3", place: "Private Wardrobe", label: "Collection 03" },
  { id: "wardrobe-fit", place: "Private Wardrobe", label: "Personal fit" },
  { id: "wardrobe-material", place: "Private Wardrobe", label: "Material" },
  { id: "wardrobe-annual", place: "Private Wardrobe", label: "Annual wardrobe" },
] as const;
