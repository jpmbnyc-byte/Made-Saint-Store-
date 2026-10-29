import { PRODUCTS } from "@/lib/business";
import { PIECES, type WardrobePiece } from "@/lib/wardrobe";

/** Published selling prices. Anything else stays pending. */
const APPROVED: Record<string, number> = {
  rn01: 695,
  rn02: 545,
  rn03: 595,
  rn04: 595,
  rn05: 695,
  rn06: 545,
};

const SHOP: Record<string, string> = {
  rn01: "/shop/ms-runner-navy-intrecciato",
  rn02: "/shop/ms-runner-espresso",
  rn03: "/shop/ms-runner-graphite",
  rn04: "/shop/ms-runner-chalk-navy",
  rn05: "/shop/ms-runner-navy-rust",
  rn06: "/shop/ms-runner-washed-denim",
};

export const retailOf = (id: string) => APPROVED[id] ?? null;
export const shopHref = (id: string) => SHOP[id];

export const pieceById = (id: string) => PIECES.find((p) => p.id === id);

export type Pathway = "standard" | "made-to-measure" | "technical-review" | "atelier";

export const OFFERINGS = [
  {
    id: "piece",
    name: "Individual piece",
    investment: "Published retail",
    preliminary: false,
    note: "One garment or pair, from the same silhouettes as a commission.",
  },
  {
    id: "look",
    name: "Complete look",
    investment: "Sum of the pieces",
    preliminary: false,
    note: "Only approved prices are added. A piece without a price stays pending.",
  },
  {
    id: "season",
    name: "Seasonal commission",
    investment: "From $6,500",
    preliminary: true,
    note: "A defined seasonal allocation. The figure is a planning target, not a checkout price.",
  },
  {
    id: "annual",
    name: "Annual private wardrobe",
    investment: "From $20,000",
    preliminary: true,
    commitment: 20000,
    note: "Three collections. The commitment buys the clothing, not a membership.",
  },
  {
    id: "expanded",
    name: "Expanded private wardrobe",
    investment: "From $35,000",
    preliminary: true,
    commitment: 35000,
    note: "A larger allocation and a broader material list. Still a planning target.",
  },
  {
    id: "atelier",
    name: "Atelier commission",
    investment: "Quoted individually",
    preliminary: false,
    note: "Substantial pattern work, unusual construction, or a last that is not on the shelf.",
  },
] as const;

export const LIFESTYLES = [
  {
    id: "arrival",
    n: "01",
    name: "The Arrival",
    purpose: "Travel, hotel arrivals, public appearances.",
    pieces: ["p01", "p02", "p12", "rn04"],
  },
  {
    id: "off-duty",
    n: "02",
    name: "The Off-Duty",
    purpose: "Denim, knitwear, and a runner for ordinary days.",
    pieces: ["p09", "p08", "p07", "rn06"],
  },
  {
    id: "transit",
    n: "03",
    name: "The Transit",
    purpose: "Flights and days spent between cities.",
    pieces: ["p06", "p05", "rn01"],
  },
  {
    id: "occasion",
    n: "04",
    name: "The Occasion",
    purpose: "Tailoring for formal appearances.",
    pieces: ["s01", "s02", "p11"],
  },
  {
    id: "private",
    n: "05",
    name: "The Private Collection",
    purpose: "A wardrobe carried across the three collections.",
    pieces: ["p12", "s03", "p08", "rn04"],
  },
] as const;

export type LifestyleId = (typeof LIFESTYLES)[number]["id"];

export const SEASONS = [
  { id: "01", name: "Arrival", purpose: "Establish the wardrobe", direction: "Tailoring, knitwear, essentials" },
  { id: "02", name: "Transit", purpose: "Expand the days in between", direction: "Outerwear and easier tailoring" },
  { id: "03", name: "Occasion", purpose: "Complete the year", direction: "Formal cloth and exceptional materials" },
] as const;

export function interpret(text: string): { lifestyleId: LifestyleId; reply: string } {
  const q = text.toLowerCase();
  if (!q.trim()) {
    return { lifestyleId: "arrival", reply: "Name the occasion. The register will answer with silhouettes that already exist." };
  }
  if (/formal|occasion|celebrat|suit|wedding|gala/.test(q)) {
    return { lifestyleId: "occasion", reply: "The Occasion. The same tailored silhouettes, then a fit review if the standard size will not hold the line." };
  }
  if (/flight|transit|airport|between cities/.test(q)) {
    return { lifestyleId: "transit", reply: "The Transit. Outerwear and a runner already in the house, for days that are mostly movement." };
  }
  if (/denim|everyday|off-duty|weekend|casual/.test(q)) {
    return { lifestyleId: "off-duty", reply: "The Off-Duty. Denim, knit, and the washed-denim runner. Not a separate athletic line." };
  }
  if (/annual|commission|three collection|private wardrobe/.test(q)) {
    return { lifestyleId: "private", reply: "The Private Collection. Three deliveries, one measurement profile, the same designs as the shop." };
  }
  if (/travel|arrival|appearance|basketball|hotel|public|season/.test(q)) {
    return { lifestyleId: "arrival", reply: "The Arrival. Clothing for travel and public days. Exceptional proportions are handled in the fit review, on these silhouettes." };
  }
  return {
    lifestyleId: "arrival",
    reply: "That request is not a separate collection. Starting from The Arrival, which covers travel and appearances.",
  };
}

export type FitInput = {
  height: string;
  chest: string;
  shoulder: string;
  sleeve: string;
  bicep: string;
  waist: string;
  hip: string;
  thigh: string;
  inseam: string;
  shoe: string;
  width: "" | "standard" | "wide" | "extra-wide";
  shoulderStyle: "" | "relaxed" | "structured";
  ease: "" | "close" | "standard" | "generous";
};

export const EMPTY_FIT: FitInput = {
  height: "",
  chest: "",
  shoulder: "",
  sleeve: "",
  bicep: "",
  waist: "",
  hip: "",
  thigh: "",
  inseam: "",
  shoe: "",
  width: "",
  shoulderStyle: "",
  ease: "",
};

const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** Review triggers. They do not certify a fit and they do not price a body. */
export function fitReview(input: FitInput): { measured: boolean; pathway: Pathway; flags: string[] } {
  const height = num(input.height);
  const shoulder = num(input.shoulder);
  const sleeve = num(input.sleeve);
  const bicep = num(input.bicep);
  const thigh = num(input.thigh);
  const inseam = num(input.inseam);
  const shoe = num(input.shoe);
  const measured = [height, shoulder, sleeve, bicep, thigh, inseam, shoe, num(input.chest), num(input.waist)].some((n) => n != null) || input.width !== "";
  const flags: string[] = [];
  if ((height != null && height >= 196) || (sleeve != null && sleeve >= 70) || (inseam != null && inseam >= 90)) {
    flags.push("Extended length. Sleeve and trouser development, so the cuff and the knee stay where the design intends.");
  }
  if (shoulder != null && shoulder >= 52) {
    flags.push("Shoulder and upper back. The jacket silhouette is reviewed before anyone promises the pattern.");
  }
  if ((bicep != null && bicep >= 40) || (thigh != null && thigh >= 66)) {
    flags.push("Arm or thigh volume. Room is added only if the approved line of the garment can survive it.");
  }
  if (input.width === "extra-wide" || (shoe != null && shoe >= 14)) {
    flags.push("Footwear. Length, width, and whether a last exists. This is a technical review, not an automatic size.");
  }
  if (!measured) return { measured: false, pathway: "standard", flags: [] };
  if (flags.length) return { measured: true, pathway: "technical-review", flags };
  return {
    measured: true,
    pathway: "made-to-measure",
    flags: ["Within ordinary made-to-measure range. The patternmaker still confirms the silhouette before cloth is cut."],
  };
}

export const PATHWAY_LABEL: Record<Pathway, string> = {
  standard: "Standard size",
  "made-to-measure": "Made to measure",
  "technical-review": "Technical review",
  atelier: "Atelier quotation",
};

export function allocation(ids: string[], commitment: number) {
  const approved = ids.reduce((sum, id) => sum + (retailOf(id) ?? 0), 0);
  const pending = ids.filter((id) => retailOf(id) == null);
  return { approved, pending: pending.length, commitment, knownRemainder: commitment - approved };
}

export function visiblePieces(ids: readonly string[]): WardrobePiece[] {
  return ids.map(pieceById).filter((p): p is WardrobePiece => Boolean(p));
}

export const RUNNER_COUNT = PRODUCTS.filter((p) => p.launch).length;
