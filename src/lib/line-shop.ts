import { FRAMES, LINE, frameSrc, lineByRef, usd, type LineProduct } from "@/lib/line";
import { FRAME_PX, frameLarge, listedLine } from "@/lib/imagery";

export type UseCase = "Tailoring" | "Everyday" | "Leisure";

export type LookPiece = {
  ref: string;
  role: string;
  /** The colorway this photograph shows. Taken from the catalog, not guessed from a similar style. */
  color: string;
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
};

const piece = (ref: string, role: string): LookPiece => {
  const product = lineByRef(ref);
  return { ref, role, color: product?.colors ?? "Color not confirmed" };
};

/** Outfits whose pieces are the refs already written on the frames. Unmapped garments stay styling notes. */
export const COLLECTION_LOOKS: CollectionLook[] = [
  {
    slug: "cobalt",
    number: "01",
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
    number: "02",
    title: "Grouped stripe",
    use: "Tailoring",
    image: frameSrc(33),
    alt: "Ren in the grouped-stripe suit, full length, on a course",
    frames: [33, 32].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [piece("R031", "Jacket"), piece("R032", "Trouser")],
    styling: [],
  },
  {
    slug: "jersey",
    number: "03",
    title: "Integrated jersey",
    use: "Everyday",
    image: frameSrc(25),
    alt: "Ren in the printed jersey, shirt, tie, and chinos",
    frames: [25, 6, 7].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [piece("R010", "Jersey")],
    styling: ["The shirt, the tie, and the chinos are styling. They are not included with the jersey."],
  },
  {
    slug: "day",
    number: "04",
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
    number: "05",
    title: "Dusty rose",
    use: "Everyday",
    image: frameSrc(50),
    alt: "Inès in a dusty rose zip set over a petrol teal turtleneck",
    frames: [50].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [],
    styling: ["A season look. The garments in the photograph are not a listed product, and they are not a checkout price."],
  },
  {
    slug: "arrival",
    number: "06",
    title: "Arrival",
    use: "Tailoring",
    image: frameSrc(35),
    alt: "Malik in a navy zip jacket, white layer, and matching trouser, worn full length",
    frames: [35].map((n) => FRAMES.find((frame) => frame.n === n)!),
    pieces: [],
    styling: ["A season look. The navy set is not a listed product on this photograph. The shoes are brown mules, not a founding runner."],
  },
  {
    slug: "velvet",
    number: "07",
    title: "Velvet",
    use: "Leisure",
    image: "/collection/velvet.webp",
    alt: "Lucien in a forest velvet zip jacket and matching trousers",
    frames: [],
    pieces: [],
    styling: ["A season look. Not a listed price. Enquire to have it made."],
  },
  {
    slug: "sage",
    number: "08",
    title: "Sage",
    use: "Leisure",
    image: "/collection/sage.webp",
    alt: "Ren in a sage fleece set, pale yellow turtleneck, and a yellow barrel bag",
    frames: [],
    pieces: [],
    styling: ["A season look. Not a listed price. The bag and the shoes are in the photograph and are not a founding runner."],
  },
  {
    slug: "solene",
    number: "09",
    title: "Solène jersey",
    use: "Everyday",
    image: "/collection/solene.webp",
    alt: "Solène in the printed jersey over a white shirt and black trousers",
    frames: [],
    pieces: [],
    styling: ["A season look. The jersey print is not mapped to a listed product on this photograph."],
  },
  {
    slug: "amara",
    number: "10",
    title: "Amara jersey",
    use: "Leisure",
    image: "/collection/amara.webp",
    alt: "Amara in the printed jersey, tie, blue suede shorts, and cream socks",
    frames: [],
    pieces: [],
    styling: ["A season look. The shorts and the jersey are not a listed product on this photograph."],
  },
];

export const lookBySlug = (slug: string) => COLLECTION_LOOKS.find((look) => look.slug === slug);

export const lookImage = (look: CollectionLook, frame = look.frames[0]) => (frame?.n ? frameSrc(frame.n) : look.image);

export const looksForRef = (ref: string) => COLLECTION_LOOKS.filter((look) => look.pieces.some((item) => item.ref === ref));

export type EditorialBlock =
  | { kind: "look"; slug: string; wide?: boolean }
  | { kind: "product"; ref: string; frame: number; wide?: boolean }
  | { kind: "still"; src: string; alt: string; wide?: boolean };

export const FEATURED: EditorialBlock[] = [
  { kind: "look", slug: "cobalt" },
  { kind: "look", slug: "stripe" },
  { kind: "look", slug: "rose" },
  { kind: "product", ref: "N015", frame: 12 },
  { kind: "product", ref: "R067", frame: 27, wide: true },
  { kind: "look", slug: "jersey" },
  { kind: "look", slug: "day" },
  { kind: "look", slug: "velvet" },
  { kind: "product", ref: "R043", frame: 1 },
];

export const CAMPAIGN_BLOCKS: EditorialBlock[] = [
  { kind: "look", slug: "cobalt", wide: true },
  { kind: "look", slug: "stripe" },
  { kind: "look", slug: "jersey" },
  { kind: "look", slug: "day", wide: true },
  { kind: "look", slug: "rose" },
  { kind: "look", slug: "arrival" },
  { kind: "look", slug: "velvet" },
  { kind: "look", slug: "sage" },
  { kind: "look", slug: "solene", wide: true },
  { kind: "look", slug: "amara" },
  { kind: "product", ref: "R067", frame: 27, wide: true },
];

export function customerStatus(product: LineProduct) {
  if (product.status === "held" || product.retail == null) {
    return { buyable: false as const, label: "Held", price: null as string | null, detail: "This style is not offered." };
  }
  return {
    buyable: false as const,
    label: "Development preview — available to enquire",
    price: usd(product.retail),
    detail: "The figure is a proposed list price. It is not a checkout price. Cloth and construction stay intentions until a sample is approved. A ship date is not set for this garment.",
  };
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
