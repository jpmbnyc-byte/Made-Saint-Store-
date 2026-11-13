import { FRAMES, LINE, frameSrc, lineByRef, usd, type LineProduct } from "@/lib/line";
import { FRAME_PX, frameLarge, listedLine } from "@/lib/imagery";

export type UseCase = "Tailoring" | "Everyday" | "Leisure";

export type LookPiece = {
  ref: string;
  role: string;
  /** The colorway this photograph shows. Taken from the catalog, not guessed from a similar style. */
  color: string;
};

export type LookOffer = {
  href: string;
  name: string;
  price: string;
  detail: string;
  kind: "runner" | "enquire";
};

export type CollectionLook = {
  slug: string;
  number: string;
  title: string;
  use: UseCase;
  image: string;
  alt: string;
  frames: { n: number; alt: string }[];
  pieces: LookPiece[];
  styling: string[];
  series?: "courtyard";
  offers?: LookOffer[];
  /** Left off public grids when the look repeats another photograph of the same pieces. */
  listed?: boolean;
};

const piece = (ref: string, role: string, color?: string): LookPiece => {
  const product = lineByRef(ref);
  if (color && product?.colors.toLowerCase().includes(color.toLowerCase())) {
    return { ref, role, color };
  }
  return { ref, role, color: product?.colors ?? "Color not confirmed" };
};

const runnerOffer = (id: string, name: string, price = "$550"): LookOffer => ({
  href: `/shop/${id}`,
  name,
  price,
  detail: "Delivery is confirmed with your quotation.",
  kind: "runner",
});

const enquireOffer = (name: string): LookOffer => ({
  href: "/wardrobe#introduction",
  name,
  price: "Enquire",
  detail: "Made to order. Enquire with the house.",
  kind: "enquire",
});

/** Outfits whose pieces are the refs already written on the frames. Unmapped garments stay styling notes. */
export const COLLECTION_LOOKS: CollectionLook[] = [
  {
    slug: "solene",
    number: "01",
    title: "Solène jersey",
    use: "Everyday",
    image: "/collection/solene.webp",
    alt: "Solène in the printed jersey over a white shirt, navy tie, and charcoal trousers",
    frames: [],
    pieces: [piece("R010", "Jersey")],
    styling: ["The shirt, the tie, and the trousers are styling. They are not included with the jersey."],
  },
  {
    slug: "sage",
    number: "02",
    title: "Sage",
    use: "Leisure",
    image: "/collection/sage.webp",
    alt: "Ren in a sage zip set with a pale yellow turtleneck and brown mesh 1101 runners",
    frames: [],
    pieces: [piece("N014", "Turtleneck")],
    styling: ["The sage zip set is made to order."],
    offers: [runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "olive",
    number: "03",
    title: "Olive",
    use: "Leisure",
    image: "/collection/lucien-terracotta.webp",
    alt: "Lucien in a dusty rose zip set with brown mesh 1101 runners in a sunlit arcade",
    frames: [],
    pieces: [],
    styling: ["The dusty rose zip set is made to order."],
    offers: [runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "forerunner",
    number: "04",
    title: "Camel set",
    use: "Everyday",
    image: "/collection/forerunner.webp",
    alt: "Amara in a camel zip set with brown mesh 1101 runners — MADE SAiNT on the jacket and tongue",
    frames: [],
    pieces: [piece("N005", "Jacket", "Camel"), piece("N006", "Trouser", "Camel")],
    styling: ["The camel zip set is made to order. MADE SAiNT is embroidered at the chest; the tongue carries the same mark."],
    offers: [runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "duffel",
    number: "05",
    title: "Duffel",
    use: "Everyday",
    image: "/collection/duffel.webp",
    alt: "Inès in a black zip jacket with a yellow denim-trim duffel",
    frames: [],
    pieces: [piece("R067", "Duffel")],
    styling: ["The black jacket is made to order."],
  },
  {
    slug: "jersey",
    number: "06",
    title: "Integrated jersey",
    use: "Everyday",
    image: frameSrc(25),
    alt: "Ren in the printed jersey, shirt, tie, and chinos",
    frames: [25, 6, 7].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [piece("R010", "Jersey")],
    styling: ["The shirt, the tie, and the chinos complete the photograph. They are not included with the jersey."],
    listed: false,
  },
  {
    slug: "day",
    number: "07",
    title: "A day out",
    use: "Leisure",
    image: frameSrc(30),
    alt: "Amara in a beige jacket, printed jersey, shorts, and a brown backpack",
    frames: [30, 29].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [piece("R041", "Shorts"), piece("N013", "Backpack")],
    styling: ["The patterned shirt is styling. It is not a MADE SAiNT product on this look."],
  },
  {
    slug: "rose",
    number: "08",
    title: "Dusty rose",
    use: "Everyday",
    image: frameSrc(50),
    alt: "Inès in a dusty rose zip set over a petrol teal turtleneck",
    frames: [50].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [],
    styling: ["The dusty rose set is made to order."],
  },
  {
    slug: "arrival",
    number: "09",
    title: "Arrival",
    use: "Tailoring",
    image: frameSrc(35),
    alt: "Malik in a navy zip jacket, white layer, and matching trouser, worn full length",
    frames: [35].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [],
    styling: ["The navy set is made to order. The shoes are brown mules, not a founding runner."],
  },
  {
    slug: "velvet",
    number: "10",
    title: "Velvet",
    use: "Leisure",
    image: "/collection/velvet.webp",
    alt: "Lucien in a forest velvet zip jacket and matching trousers",
    frames: [],
    pieces: [],
    styling: ["Forest velvet, made to order."],
  },
  {
    slug: "amara",
    number: "11",
    title: "Amara jersey",
    use: "Leisure",
    image: "/collection/amara.webp",
    alt: "Amara in the printed jersey, tie, blue suede shorts, and cream socks",
    frames: [],
    pieces: [piece("R010", "Jersey")],
    styling: ["The shorts and the socks are styling. They are not included with the jersey."],
  },
  {
    slug: "cobalt",
    number: "12",
    title: "Cobalt",
    use: "Tailoring",
    image: frameSrc(37),
    alt: "Lucien in a cobalt zip jacket, full length, on a course",
    frames: [37, 36, 26].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [piece("R027", "Jacket")],
    styling: ["The brown trouser and the shoes in the photograph are styling. They are not a MADE SAiNT product on this look."],
  },
  {
    slug: "stripe",
    number: "13",
    title: "Grouped stripe",
    use: "Tailoring",
    image: frameSrc(33),
    alt: "Ren in the grouped-stripe suit, full length, on a course",
    frames: [33, 32].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [piece("R031", "Jacket"), piece("R032", "Trouser")],
    styling: [],
  },
  {
    slug: "taupe",
    number: "14",
    title: "Stone velour",
    use: "Leisure",
    image: "/collection/taupe.webp",
    alt: "Ren in a taupe velour zip set with yellow piping, in the limestone arcade",
    frames: [],
    pieces: [],
    styling: ["The velour set is made to order. The cream and yellow shoes in the photograph are not a founding runner."],
    series: "courtyard",
    offers: [enquireOffer("Stone velour set")],
  },
  {
    slug: "midnight",
    number: "15",
    title: "Midnight set",
    use: "Tailoring",
    image: "/collection/midnight.webp",
    alt: "Malik in a navy zip jacket and matching trouser, with a grey and red runner, in the limestone arcade",
    frames: [],
    pieces: [piece("N005", "Jacket", "Midnight"), piece("N006", "Trouser", "Midnight")],
    styling: ["The shoes in the photograph are not a founding runner."],
    series: "courtyard",
    offers: [enquireOffer("Midnight Arrival set")],
  },
  {
    slug: "camel",
    number: "16",
    title: "Terracotta set",
    use: "Tailoring",
    image: "/collection/camel.webp",
    alt: "Lucien in a dusty rose zip set over a teal turtleneck with MADE SAiNT at the neck and brown mesh 1101 runners",
    frames: [],
    pieces: [piece("N005", "Jacket", "Dusty rose"), piece("N006", "Trouser", "Dusty rose")],
    styling: ["MADE SAiNT is embroidered in red at the turtleneck. The tongue carries the same mark."],
    series: "courtyard",
    offers: [runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "parachute",
    number: "17",
    title: "Jersey and navy",
    use: "Everyday",
    image: "/collection/parachute.webp",
    alt: "Amara in the printed jersey over a white shirt and navy tie, with navy parachute trousers and navy 1101 runners",
    frames: [],
    pieces: [piece("R010", "Jersey")],
    styling: ["The shirt, the tie, and the parachute trousers are styling. They are not included with the jersey."],
    series: "courtyard",
    offers: [runnerOffer("ms-runner-1101-navy", "1101 Runner — Navy")],
  },
  {
    slug: "forest",
    number: "18",
    title: "Forest velvet",
    use: "Leisure",
    image: "/collection/forest.webp",
    alt: "Solène in a forest velvet zip jacket and matching trousers, with teal 1101 runners, in the limestone arcade",
    frames: [],
    pieces: [],
    styling: ["Forest velvet, made to order."],
    series: "courtyard",
    offers: [enquireOffer("Forest velvet set"), runnerOffer("ms-runner-1101-teal", "1101 Runner — Teal")],
  },
  {
    slug: "olive-wool",
    number: "19",
    title: "Olive wool",
    use: "Tailoring",
    image: "/collection/olive-wool.webp",
    alt: "Lucien in an olive wool zip jacket and matching trouser, with plum-sole trail mules, in the limestone arcade",
    frames: [],
    pieces: [piece("R046", "Mule")],
    styling: ["The olive wool set is made to order."],
    series: "courtyard",
    offers: [enquireOffer("Olive wool set")],
  },
  {
    slug: "onyx",
    number: "20",
    title: "Onyx",
    use: "Tailoring",
    image: "/collection/onyx.webp",
    alt: "Malik in a navy zip jacket and matching trouser, with onyx 1101 runners, in the limestone arcade",
    frames: [],
    pieces: [piece("N005", "Jacket", "Midnight"), piece("N006", "Trouser", "Midnight")],
    styling: [],
    series: "courtyard",
    offers: [runnerOffer("ms-runner-1101-onyx", "1101 Runner — Onyx")],
  },
  {
    slug: "butter-tee",
    number: "21",
    title: "Butter tee",
    use: "Everyday",
    image: "/collection/tee-butter.webp",
    alt: "Butter acid-wash oversized t-shirt with a red MADE SAiNT collar mark",
    frames: [],
    pieces: [],
    styling: ["Acid-wash cotton with a red gothic MADE Saint mark at the inner collar. Pair with the 1101 Brown Mesh."],
    series: "courtyard",
    offers: [enquireOffer("Acid-wash tee, butter"), runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "denim-tee",
    number: "22",
    title: "Denim tee",
    use: "Everyday",
    image: "/collection/denim-tee.webp",
    alt: "Ren in a denim acid-wash oversized t-shirt, navy trousers, and blush 1101 runners",
    frames: [],
    pieces: [],
    styling: ["Acid-wash cotton with a red gothic MADE Saint mark at the inner collar. The navy trousers complete the photograph."],
    series: "courtyard",
    offers: [enquireOffer("Acid-wash tee, denim"), runnerOffer("ms-runner-1101-blush", "1101 Runner — Blush")],
  },
  {
    slug: "black-tee",
    number: "23",
    title: "Black tee",
    use: "Everyday",
    image: "/collection/black-tee.webp",
    alt: "Amara in a black acid-wash oversized t-shirt, navy trousers, and onyx 1101 runners",
    frames: [],
    pieces: [],
    styling: ["Acid-wash cotton with a red gothic MADE Saint mark at the inner collar. The navy trousers complete the photograph."],
    series: "courtyard",
    offers: [enquireOffer("Acid-wash tee, black"), runnerOffer("ms-runner-1101-onyx", "1101 Runner — Onyx")],
  },
  {
    slug: "rust",
    number: "24",
    title: "Burgundy stool",
    use: "Leisure",
    image: "/collection/ines-burgundy.webp",
    alt: "Inès on a stool in a butter mock-neck and cream jeans with brown mesh 1101 runners",
    frames: [],
    pieces: [piece("N014", "Turtleneck")],
    styling: ["The butter mock-neck and cream jeans complete the photograph."],
    series: "courtyard",
    offers: [runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "malik",
    number: "25",
    title: "Malik chair",
    use: "Everyday",
    image: "/collection/malik.webp",
    alt: "Malik seated in a navy turtleneck with MADE SAiNT at the neck and sand trousers with teal 1101 runners",
    frames: [],
    pieces: [piece("N014", "Turtleneck")],
    styling: ["MADE SAiNT is embroidered in red at the turtleneck. The sand trousers complete the photograph."],
    offers: [enquireOffer("Navy turtleneck"), runnerOffer("ms-runner-1101-teal", "1101 Runner — Teal")],
  },
  {
    slug: "mauve-nylon",
    number: "26",
    title: "Mauve nylon",
    use: "Everyday",
    image: "/collection/mauve-nylon.webp",
    alt: "Mauve crushed-nylon trousers with the navy and ivory 0929 runner",
    frames: [],
    pieces: [piece("N003", "Trouser", "Mauve")],
    styling: [],
    offers: [runnerOffer("ms-runner-chalk-navy", "0929 Runner — Navy / Ivory", "$490")],
  },
  {
    slug: "butter-mock",
    number: "27",
    title: "Butter mock",
    use: "Everyday",
    image: "/collection/butter-mock.webp",
    alt: "Butter mock-neck with a red MADE SAiNT collar mark, black pleated trousers, and butter-tan runners",
    frames: [],
    pieces: [piece("N014", "Turtleneck", "Butter yellow")],
    styling: ["MADE SAiNT is embroidered in red at the mock-neck. The black trousers complete the photograph."],
    offers: [enquireOffer("Butter mock-neck"), runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
  {
    slug: "blue-jersey",
    number: "28",
    title: "Blue jersey",
    use: "Everyday",
    image: "/collection/blue-jersey.webp",
    alt: "Blue printed jersey over a white shirt and navy tie, with black pleated trousers",
    frames: [],
    pieces: [piece("R010", "Jersey")],
    styling: ["The shirt, the tie, and the trousers are styling. They are not included with the jersey."],
    offers: [runnerOffer("ms-runner-1101-navy", "1101 Runner — Navy")],
  },
  {
    slug: "sand-jersey",
    number: "29",
    title: "Sand jersey",
    use: "Everyday",
    image: "/collection/sand-jersey.webp",
    alt: "Sand printed jersey over a light blue shirt and brown tie, with charcoal pleated trousers",
    frames: [],
    pieces: [piece("R010", "Jersey")],
    styling: ["The shirt, the tie, and the trousers are styling. They are not included with the jersey."],
    offers: [runnerOffer("ms-runner-1101-butter", "1101 Runner — Brown Mesh")],
  },
];

export const lookBySlug = (slug: string) => COLLECTION_LOOKS.find((look) => look.slug === slug);

export const publishedLooks = () => COLLECTION_LOOKS.filter((look) => look.listed !== false);

export const COURTYARD_LOOKS = COLLECTION_LOOKS.filter((look) => look.series === "courtyard");

export function lookPriceLine(look: CollectionLook) {
  const garments = look.pieces
    .map((item) => {
      const product = lineByRef(item.ref);
      return product ? customerStatus(product).price : null;
    })
    .filter((price): price is string => Boolean(price));
  const runners = (look.offers ?? []).filter((offer) => offer.kind === "runner").map((offer) => offer.price);
  const parts = [...garments, ...runners];
  return parts.length ? parts.join(" · ") : null;
}

export const lookImage = (look: CollectionLook, frame = look.frames[0]) => (frame?.n ? frameSrc(frame.n) : look.image);

export const looksForRef = (ref: string) => COLLECTION_LOOKS.filter((look) => look.pieces.some((item) => item.ref === ref));

export type EditorialBlock =
  | { kind: "look"; slug: string; wide?: boolean }
  | { kind: "product"; ref: string; frame: number; wide?: boolean }
  | { kind: "still"; src: string; alt: string; wide?: boolean; href?: string; name?: string; price?: string; cta?: string };

export const FEATURED: EditorialBlock[] = [
  { kind: "still", src: "/knit/turtleneck-iconic.webp", alt: "Fine cashmere turtleneck — Cast iconic frame", href: "/line/n014", name: "Cashmere turtleneck", price: "$995", cta: "Enquire" },
  { kind: "look", slug: "sand-jersey", wide: true },
  { kind: "look", slug: "blue-jersey" },
  { kind: "look", slug: "butter-mock" },
  { kind: "look", slug: "malik" },
  { kind: "look", slug: "solene" },
  { kind: "look", slug: "camel" },
  { kind: "look", slug: "parachute" },
  { kind: "look", slug: "rust" },
  { kind: "look", slug: "taupe" },
  { kind: "look", slug: "forest" },
  { kind: "look", slug: "olive-wool", wide: true },
  { kind: "look", slug: "sage" },
  { kind: "look", slug: "olive", wide: true },
  { kind: "look", slug: "forerunner" },
  { kind: "look", slug: "butter-tee" },
  { kind: "look", slug: "denim-tee" },
  { kind: "look", slug: "black-tee" },
  { kind: "still", src: "/collection/tee-black.webp", alt: "Black acid-wash oversized t-shirt with a red MADE SAiNT collar mark", href: "/wardrobe#introduction", name: "Acid-wash tee, black", cta: "Enquire" },
  { kind: "still", src: "/collection/tee-butter.webp", alt: "Butter acid-wash oversized t-shirt with a red MADE SAiNT collar mark", href: "/wardrobe#introduction", name: "Acid-wash tee, butter", cta: "Enquire" },
  { kind: "still", src: "/collection/tee-denim.webp", alt: "Blue denim acid-wash oversized t-shirt with a red MADE SAiNT collar mark", href: "/wardrobe#introduction", name: "Acid-wash tee, denim", cta: "Enquire" },
  { kind: "look", slug: "duffel" },
  { kind: "look", slug: "midnight" },
  { kind: "look", slug: "onyx" },
  { kind: "look", slug: "mauve-nylon" },
  { kind: "look", slug: "amara" },
  { kind: "product", ref: "N014", frame: 61 },
  { kind: "product", ref: "R067", frame: 27, wide: true },
];

export const CAMPAIGN_BLOCKS: EditorialBlock[] = [
  { kind: "still", src: "/world/milot.webp", alt: "Campaign 001 study — Cast 003 in the ruins at Milot", wide: true, href: "/line/lookbook", name: "Milot, Campaign 001", cta: "View the lookbook" },
  { kind: "still", src: "/collection/solene.webp", alt: "Solène in the printed jersey — Cast 003 look", wide: true, href: "/line/looks/solene", name: "Solène jersey", cta: "Shop the look" },
  { kind: "look", slug: "sand-jersey", wide: true },
  { kind: "look", slug: "blue-jersey" },
  { kind: "look", slug: "butter-mock" },
  { kind: "look", slug: "camel", wide: true },
  { kind: "look", slug: "parachute" },
  { kind: "look", slug: "rust" },
  { kind: "look", slug: "taupe" },
  { kind: "look", slug: "forest" },
  { kind: "look", slug: "olive-wool", wide: true },
  { kind: "look", slug: "solene", wide: true },
  { kind: "look", slug: "sage" },
  { kind: "look", slug: "olive", wide: true },
  { kind: "look", slug: "forerunner" },
  { kind: "look", slug: "malik" },
  { kind: "look", slug: "duffel" },
  { kind: "look", slug: "butter-tee" },
  { kind: "look", slug: "denim-tee" },
  { kind: "look", slug: "black-tee" },
  { kind: "still", src: "/collection/tee-black.webp", alt: "Black acid-wash oversized t-shirt with a red MADE SAiNT collar mark", href: "/wardrobe#introduction", name: "Acid-wash tee, black", cta: "Enquire" },
  { kind: "still", src: "/knit/turtleneck-iconic.webp", alt: "Fine cashmere turtleneck — iconic Cast frame", href: "/line/n014", name: "Cashmere turtleneck", price: "$995", cta: "Enquire" },
  { kind: "still", src: "/runners/navy-ivory-worn.webp", alt: "MADE SAiNT 0929 Runner — Navy / Ivory, worn on foot", wide: true, href: "/shop/ms-runner-chalk-navy", name: "0929 Runner — Navy / Ivory", price: "$490" },
  { kind: "still", src: "/world/coastline.webp", alt: "Campaign 001 study — MADE SAiNT product branding on the north coast", wide: true, href: "/shop#1101", name: "Coastline, Campaign 001", cta: "Enquire about 1101" },
  { kind: "still", src: "/collection/malik.webp", alt: "Malik seated in a navy turtleneck and sand trousers with teal 1101 runners", href: "/line/looks/malik", name: "Malik, chair", cta: "Shop the look" },
  { kind: "still", src: "/collection/ines-burgundy.webp", alt: "Inès on a stool with brown mesh 1101 runners", wide: true, href: "/line/looks/rust", name: "Inès, burgundy stool", cta: "Shop the look" },
  { kind: "look", slug: "midnight" },
  { kind: "look", slug: "onyx" },
  { kind: "look", slug: "mauve-nylon" },
  { kind: "look", slug: "day", wide: true },
  { kind: "look", slug: "rose" },
  { kind: "look", slug: "arrival" },
  { kind: "look", slug: "velvet" },
  { kind: "look", slug: "amara" },
  { kind: "product", ref: "R067", frame: 27, wide: true },
];

export function customerStatus(product: LineProduct) {
  if (product.status === "held" || product.retail == null) {
    return { buyable: false as const, label: "Held", price: null as string | null, detail: "This style is not offered." };
  }
  return {
    buyable: false as const,
    label: "Enquire",
    price: usd(product.retail),
    detail: "A list price for the enquiry. This is not a checkout price. Size and cloth are confirmed with the house before an order.",
  };
}

const OWNER_CLAUSE =
  /TBC|proposed|mill-certified|pending|Design brief|not selected|not approved|not confirmed|unverified|to reconcile|No separate|No down|inspiration, not the sourced|not established|under consideration|placeholder/i;

export function customerName(product: LineProduct) {
  return product.name.replace(/Goatskin\s+/gi, "").replace(/\s{2,}/g, " ").trim();
}

export function customerColors(product: LineProduct) {
  const raw = product.colors.trim();
  if (!raw || /^TBC$/i.test(raw)) return "On enquiry";
  const cleaned = raw
    .replace(/\bTBC\b/gi, "")
    .replace(/;\s*further city variants.*/i, "")
    .replace(/;\s*city variants.*/i, "")
    .replace(/;\s*other colors.*/i, "")
    .replace(/;\s*;/g, ";")
    .replace(/;\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return cleaned || "On enquiry";
}

export function customerMaterial(product: LineProduct) {
  const parts = product.material.split(/[.;]/).map((part) => part.trim()).filter(Boolean);
  const kept = parts.filter((part) => !OWNER_CLAUSE.test(part));
  const text = kept
    .join(". ")
    .replace(/\bGoatskin\s+/gi, "")
    .replace(/\b\d+%\s+/g, "")
    .replace(/\b\d+\s*oz\.?\s*/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[;:,.]\s*$/g, "")
    .trim();
  return text || "Cloth is confirmed with the house.";
}

export const listedProducts = () => LINE.filter(listedLine);

export type AssetRole = "on-model" | "product" | "lookbook" | "campaign" | "detail" | "quarantine";

export type AssetRecord = {
  id: string;
  path: string;
  width: number | null;
  height: number | null;
  role: AssetRole;
  productIds: string[];
  colorway: string;
  lookIds: string[];
  campaignId: string | null;
  useCase: UseCase | null;
  focalPoint: string;
  displayOrder: number;
  mapping: "mapped" | "styling-only" | "quarantine";
};

export function lineAssetManifest(): AssetRecord[] {
  return FRAMES.map((frame) => {
    const size = FRAME_PX[frame.n];
    const looks = COLLECTION_LOOKS.filter((look) => look.frames.some((item) => item.n === frame.n));
    const large = frameLarge(frame.n);
    const mapped = frame.refs.length > 0 && large;
    const role: AssetRole = !large ? "quarantine" : frame.alt.toLowerCase().includes("detail") ? "detail" : looks.length ? "lookbook" : "product";
    return {
      id: `f${String(frame.n).padStart(2, "0")}`,
      path: frameSrc(frame.n),
      width: size?.[0] ?? null,
      height: size?.[1] ?? null,
      role,
      productIds: frame.refs,
      colorway: frame.refs.map((ref) => lineByRef(ref)?.colors ?? "").filter(Boolean).join(" · "),
      lookIds: looks.map((look) => look.slug),
      campaignId: looks.length ? "001" : null,
      useCase: looks[0]?.use ?? null,
      focalPoint: size && size[0] > size[1] ? "center" : "top",
      displayOrder: frame.n,
      mapping: !large ? "quarantine" : mapped ? "mapped" : "styling-only",
    };
  });
}

export function catalogDiagnostics() {
  const shown = listedProducts();
  const hidden = LINE.filter((item) => !listedLine(item));
  const quarantine = lineAssetManifest().filter((asset) => asset.mapping === "quarantine");
  const unlinked = lineAssetManifest().filter((asset) => asset.mapping === "styling-only");
  return {
    shown: shown.length,
    hidden: hidden.length,
    hiddenRefs: hidden.map((item) => item.ref),
    quarantine: quarantine.map((asset) => asset.id),
    unlinkedLooks: unlinked.map((asset) => asset.id),
  };
}
