import { PRODUCTS } from "../business";
import { PIECES } from "../wardrobe";
import type { ViewId } from "./spec";

export type ColorwayStatus = "approved" | "reference-only";
export type MaterialStatus = "verified" | "directional" | "missing";

export type AtelierColorway = {
  id: string;
  name: string;
  hex: string | null;
  status: ColorwayStatus;
};

export type AtelierReference = {
  id: string;
  /** Path under /public, served as a site path. */
  src: string;
  role: string;
};

export type AtelierProduct = {
  id: string;
  sku: string;
  name: string;
  category: string;
  tier: string;
  material: string;
  materialStatus: MaterialStatus;
  silhouette: string;
  fit: string;
  references: AtelierReference[];
  colorways: AtelierColorway[];
  retailUsd: number | null;
  priceStatus: "approved" | "pending";
  madeToMeasure: "eligible" | "review" | "not-offered";
  productionStatus: string;
  blockers: string[];
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function runner(id: string): AtelierProduct {
  const p = PRODUCTS.find((item) => item.id === id);
  if (!p) throw new Error(`Missing runner ${id}`);
  const material = p.materials.join(", ");
  return {
    id: p.id,
    sku: p.id.replace("ms-runner-", "RN-").toUpperCase(),
    name: p.name,
    category: "footwear",
    tier: "founding",
    material,
    materialStatus: "verified",
    silhouette: "Lifestyle runner. The approved photographs are the construction record, including the three-peak wave on both quarters.",
    fit: "Not a body measurement. Standard size run is on the product page.",
    references: [
      { id: `${p.id}-overhead`, src: p.image, role: "overhead pair" },
      ...(p.id === "ms-runner-espresso"
        ? [{ id: `${p.id}-threequarter`, src: "/hero/look3-runner-inverse.webp", role: "three-quarter pair" }]
        : []),
      ...(p.id === "ms-runner-chalk-navy"
        ? [
            { id: `${p.id}-threequarter`, src: "/hero/look1-runner-hero.webp", role: "three-quarter pair" },
            { id: `${p.id}-detail`, src: "/catalog/ms-runner-chalk-navy/detail.webp", role: "quarter detail" },
          ]
        : []),
    ],
    colorways: [{ id: slug(p.name.replace("Runner, ", "")), name: p.name.replace("Runner, ", ""), hex: null, status: "approved" }],
    retailUsd: p.usd,
    priceStatus: "approved",
    madeToMeasure: "review",
    productionStatus: p.launch ? "Open for reservation" : "Waitlist",
    blockers: [],
  };
}

function piece(id: string): AtelierProduct {
  const p = PIECES.find((item) => item.id === id);
  if (!p) throw new Error(`Missing piece ${id}`);
  const directional = /direction|blend needs|not a factory|pending|not seven approved/i.test(`${p.material} ${p.note ?? ""}`);
  const colorways: AtelierColorway[] = p.chips.map((chip) => ({
    id: slug(chip.name),
    name: chip.name,
    hex: chip.hex,
    status: "reference-only" as const,
  }));
  const blockers = [
    p.image ? "" : "No approved reference image.",
    directional ? "Material or colorway is not a verified production specification." : "",
    "No approved retail price.",
    "No separate logo file. Do not invent a mark.",
  ].filter(Boolean);
  return {
    id: p.id,
    sku: p.code.replace(/^MS-/, ""),
    name: p.name,
    category: p.category,
    tier: p.tier,
    material: p.material,
    materialStatus: directional ? "directional" : p.material ? "verified" : "missing",
    silhouette: p.note ?? "No construction specification beyond the name.",
    fit: "No fit specification on file. Do not infer measurements from a picture.",
    references: p.image ? [{ id: `${p.id}-board`, src: p.image, role: "design board" }] : [],
    colorways: colorways.length ? colorways : [{ id: "unassigned", name: "Unassigned", hex: null, status: "reference-only" }],
    retailUsd: null,
    priceStatus: "pending",
    madeToMeasure: "review",
    productionStatus: "Design board",
    blockers,
  };
}

export const TEST_PRODUCT_IDS = ["ms-runner-espresso", "p01", "s01"] as const;

export function atelierCatalog(): AtelierProduct[] {
  const runners = PRODUCTS.map((p) => runner(p.id));
  const pieces = PIECES.map((p) => piece(p.id));
  return [...runners, ...pieces];
}

export function atelierProduct(id: string) {
  return atelierCatalog().find((p) => p.id === id);
}

export function defaultModelFor(product: AtelierProduct, view: ViewId) {
  if (product.category === "footwear" || product.category === "accessories") return "mod-none";
  if (view === "study" || view === "detail") return "mod-none";
  if (product.id === "p01") return "mod-tall-01";
  return "mod-editorial-01";
}

export function testPlanSelection() {
  const espresso = atelierProduct("ms-runner-espresso");
  const jacket = atelierProduct("p01");
  const suit = atelierProduct("s01");
  if (!espresso || !jacket || !suit) throw new Error("Test products missing from the catalog");
  return [
    { productId: espresso.id, colorwayId: espresso.colorways[0].id, modelId: "mod-none" },
    { productId: jacket.id, colorwayId: "mineral-blue", modelId: "mod-tall-01" },
    { productId: suit.id, colorwayId: "camel", modelId: "mod-editorial-01" },
  ];
}
