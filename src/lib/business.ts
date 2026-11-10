import { CONCEPT_PALETTE, assignRoles, buildCollection } from "@/lib/collection";
import { DEFAULT_ASSUMPTIONS, costCollection, type Assumptions } from "@/lib/costing";

/**
 * Business layer: price architecture, pre-order campaign, and cash flow against MEES terms.
 * Benchmarks are list prices read from the brands' own US stores (Oct 2026).
 */

export const BENCHMARKS = [
  { brand: "Brunello Cucinelli", item: "Suede and mesh runner", usd: 795, made: "Italy", lining: "Leather", url: "https://www.luxed.com/men/product/brunello-cucinelli-mens-suede-and-mesh-runner-sneakers-377389" },
  { brand: "Brunello Cucinelli", item: "Washed suede sneaker", usd: 1100, made: "Italy", lining: "Leather", url: "https://shop.brunellocucinelli.com/en-us/men/shoes/sneakers/sneakers-251MZUSIGD331CDX01.html" },
  { brand: "Brunello Cucinelli", item: "Nubuck and suede runner", usd: 1400, made: "Italy", lining: "Leather", url: "https://shop.brunellocucinelli.com/en-us/men/shoes/sneakers/nubuck-and-suede-runners-262MZUSNEO355CYR60.html" },
  { brand: "Bogner", item: "Monza, smooth leather", usd: 339, made: "Italy", lining: "Mesh, leather insole", url: "https://www.bogner.com/en-us/p/bogner-monza-sneaker/262-6434-Z069.html" },
  { brand: "Bogner", item: "Newport, leather and textile", usd: 390, made: "Portugal", lining: "Textile", url: "https://www.bogner.com/en-us/p/bogner-sneaker-newport/262-6434-Z086.html" },
  { brand: "Bogner", item: "Cortina, leather and mesh, Vibram", usd: 490, made: "Portugal", lining: "Mesh", url: "https://www.bogner.com/en-us/p/bogner-cortina-sneaker/254-6434-Z059.html" },
  { brand: "Bogner", item: "Bucharest, waxed suede high-top", usd: 550, made: "Italy", lining: "Wool", url: "https://www.bogner.com/en-us/p/bogner-bucharest-high-top-sneakers/254-6434-Z028.html" },
] as const;

/** What the price point demands over the current studio spec, € per pair. Estimates. */
export const LUXURY_SPEC = [
  { item: "Genuine calf suede or nubuck overlays instead of microsuede", eur: 9 },
  { item: "Calf leather lining and leather-covered footbed", eur: 7 },
  { item: "Rigid two-piece box, tissue, cotton dust bag", eur: 6.5 },
  { item: "Spare laces, numbered founding card", eur: 1.5 },
  { item: "Hand finishing and edge painting", eur: 3 },
];
export const LUXURY_UPCHARGE = LUXURY_SPEC.reduce((s, x) => s + x.eur, 0);

export type SeriesId = "1101" | "1213" | "0929";

/** Shop, navigation, and homepage order. 1101 leads, at the top price. */
export const SERIES_ORDER: SeriesId[] = ["1101", "1213", "0929"];

/** The founder's series plates. Each listing uses the plate that names it. */
export const SERIES_PLATE: Record<SeriesId, { src: string; alt: string }> = {
  "1101": { src: "/brand/name-1101.webp", alt: "MADE Saint 1101 v1" },
  "1213": { src: "/brand/name-1223.webp", alt: "MADE Saint 1213 v1" },
  "0929": { src: "/brand/name-0929.webp", alt: "MADE Saint 0929 v1" },
};

export type Product = {
  id: string;
  storyId?: string;
  name: string;
  line: string;
  usd: number;
  image: string;
  series: SeriesId;
  /** Founding 0929 colorways. The private run counts these, not the later series. */
  launch: boolean;
  materials: string[];
  costUsd: number;
  notice?: string;
};

/** Bogner Cortina, leather and mesh, is $490. The 0929 is that kind of runner. */
const PRICE_MESH = 490;
/** Bogner Bucharest, the top sneaker in the published list, is $550. */
const PRICE_TOP = 550;
/** The 1213 sculpted sole sits at that Bogner price. */
const PRICE_SCULPTED = PRICE_TOP;
/** 1101 is listed first. It shares the confirmed top price, Bogner Bucharest at $550. */
const PRICE_1101 = PRICE_TOP;

/**
 * Price ladder. The base runner sits just above Bogner's top full-price sneaker and well under
 * Cucinelli's mesh runner; construction, not color, moves the price.
 */
const CONSTRUCTION_1101 = [
  "Leather side panels, smooth",
  "29 Gris Medio mesh",
  "Five eyelet pairs",
  "Low rear and a plain tongue back",
  "Brushed sole faces, piano-black rails, matte black traction rubber",
];
const NOTICE_1101 = "Design intent is locked. A sample and tooling are still pending. The photographs do not certify the lining, the tooling, or the fit.";

export const PRODUCTS: Product[] = [
  { id: "ms-runner-chalk-navy", storyId: "chalk-navy", series: "0929", name: "MADE SAiNT 0929 Runner — Navy / Ivory", line: "Ivory suede, navy mesh", usd: PRICE_MESH, image: "/runners/navy-ivory-overhead.webp", launch: true, materials: ["Ivory suede overlays", "Navy mesh", "Nub-lug rubber sole"], costUsd: 0 },
  { id: "ms-runner-navy-intrecciato", storyId: "navy-intrecciato", series: "0929", name: "MADE SAiNT 0929 Runner — Navy / Sand", line: "Navy overlays, sand mesh", usd: PRICE_MESH, image: "/runners/navy-sand-overhead.webp", launch: true, materials: ["Navy mesh and suede overlays", "Sand mesh windows", "Nub-lug rubber sole"], costUsd: 0 },
  { id: "ms-runner-washed-denim", storyId: "washed-denim", series: "0929", name: "MADE SAiNT 0929 Runner — Washed / Indigo", line: "Blue suede, navy mesh", usd: PRICE_MESH, image: "/runners/indigo-overhead.webp", launch: true, materials: ["Blue suede overlays", "Navy mesh", "Light blue laces", "Nub-lug rubber sole"], costUsd: 0 },
  { id: "ms-runner-espresso", storyId: "espresso-oxblood", series: "0929", name: "MADE SAiNT 0929 Runner — Espresso / Oxblood", line: "Espresso suede, oxblood lining", usd: PRICE_MESH, image: "/stories/espresso-oxblood.webp", launch: false, materials: ["Espresso suede", "Technical mesh", "Oxblood terry lining", "Nub-lug rubber sole"], costUsd: 0 },
  { id: "ms-runner-1101-butter", series: "1101", name: "MADE SAiNT 1101 Runner — Butter", line: "Warm yellow leather and ivory wave panels", usd: PRICE_1101, image: "/runners/1213/1101-butter-pair.webp", launch: true, materials: ["Warm yellow leather", "Ivory wave panels", "Braided laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1101-teal", series: "1101", name: "MADE SAiNT 1101 Runner — Teal", line: "Deep teal leather and ivory wave panels", usd: PRICE_1101, image: "/runners/1213/1101-teal-pair.webp", launch: true, materials: ["Deep teal leather", "Ivory wave panels", "Braided laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1101-navy", series: "1101", name: "MADE SAiNT 1101 Runner — Navy", line: "Navy leather and cream wave panels", usd: PRICE_1101, image: "/runners/1213/1101-navy-pair.webp", launch: true, materials: ["Navy leather", "Cream wave panels", "Braided laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1101-bronze", series: "1101", name: "MADE SAiNT 1101 Runner — Bronze", line: "Dark chocolate leather with bronze open-mesh panels", usd: PRICE_1101, image: "/runners/1213/1101-bronze-pair.webp", launch: true, materials: ["Dark chocolate leather", "Bronze open-mesh panels", "Cream laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1101-blush", series: "1101", name: "MADE SAiNT 1101 Runner — Blush", line: "Dark chocolate leather with blush open-mesh panels", usd: PRICE_1101, image: "/runners/1213/1101-blush-pair.webp", launch: true, materials: ["Dark chocolate leather", "Blush open-mesh panels", "Cream laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1101-onyx", series: "1101", name: "MADE SAiNT 1101 Runner — Onyx", line: "Onyx leather and gunmetal wave panels", usd: PRICE_1101, image: "/runners/1213/1101-onyx-pair.webp", launch: true, materials: ["Onyx leather", "Gunmetal wave panels", "Braided laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1213-espresso", series: "1213", name: "MADE SAiNT 1213 Runner — Espresso", line: "Deep chocolate leather, taupe accents, and cream laces", usd: PRICE_SCULPTED, image: "/runners/1213/espresso.webp", launch: true, materials: ["Deep chocolate leather", "Taupe accents", "Cream laces", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1213-olive", series: "1213", name: "MADE SAiNT 1213 Runner — Olive", line: "Olive leather, sage overlays, and an ivory signature", usd: PRICE_SCULPTED, image: "/runners/1213/olive.webp", launch: true, materials: ["Olive leather", "Sage overlays", "Ivory signature", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1213-mineral-blue", series: "1213", name: "MADE SAiNT 1213 Runner — Mineral Blue", line: "Mineral blue leather, a pale signature, and a muted red heel accent", usd: PRICE_SCULPTED, image: "/runners/1213/mineral-blue.webp", launch: true, materials: ["Mineral blue leather", "Pale signature", "Muted red heel accent", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1213-midnight", series: "1213", name: "MADE SAiNT 1213 Runner — Midnight", line: "Deep navy leather and pale blue panels", usd: PRICE_SCULPTED, image: "/runners/1213/midnight.webp", launch: true, materials: ["Deep navy leather", "Pale blue panels", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1213-chestnut", series: "1213", name: "MADE SAiNT 1213 Runner — Chestnut", line: "Chestnut leather and dark chocolate panels", usd: PRICE_SCULPTED, image: "/runners/1213/chestnut.webp", launch: true, materials: ["Chestnut leather", "Dark chocolate panels", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
  { id: "ms-runner-1213-sacred-light", series: "1213", name: "MADE SAiNT 1213 Runner — Sacred Light", line: "Deep plum and pale gold, with a sculpted ivory sole. An angel is printed on the insole", usd: PRICE_SCULPTED, image: "/runners/1213/sacred-light.webp", launch: true, materials: ["Deep plum upper", "Pale gold signature", "Ivory sole", "Angel printed on the insole"], costUsd: 0, notice: "Materials are not confirmed." },
  { id: "ms-runner-1213-graphite", series: "1213", name: "MADE SAiNT 1213 Runner — Graphite", line: "Graphite overlays and pewter accents", usd: PRICE_SCULPTED, image: "/runners/1213/graphite.webp", launch: true, materials: ["Graphite overlays", "Pewter accents", ...CONSTRUCTION_1101], costUsd: 0, notice: NOTICE_1101 },
];

export const productsIn = (series: SeriesId) => PRODUCTS.filter((product) => product.launch && product.series === series);

/** Customer-facing make time. A requested pair is started for that person. */
export const LEAD_TIME = "4 to 6 weeks";

/** US men's sizes the MEES nub sole covers (EU 39–46), with a typical men's size curve. */
export const SIZES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"] as const;
export const SIZE_CURVE: Record<string, number> = { "7": 0.03, "7.5": 0.04, "8": 0.07, "8.5": 0.09, "9": 0.12, "9.5": 0.12, "10": 0.14, "10.5": 0.12, "11": 0.11, "11.5": 0.08, "12": 0.08 };

export type Campaign = {
  opens: string;
  closes: string;
  /** Pairs per colorway needed to place a MEES production order. */
  threshold: number;
  /** Share charged at checkout. 1 = full prepayment. */
  depositShare: number;
  /** Weeks from close to delivery: MEES production 8–12 weeks plus freight and QC. */
  shipWeeks: [number, number];
};

export const CAMPAIGN: Campaign = {
  opens: "2027-02-02",
  closes: "2027-03-02",
  threshold: 120,
  depositShare: 1,
  shipWeeks: [14, 18],
};

export function shipWindow(c: Campaign = CAMPAIGN) {
  const close = new Date(c.closes + "T12:00:00Z");
  const a = new Date(close.getTime() + c.shipWeeks[0] * 7 * 864e5);
  const b = new Date(close.getTime() + c.shipWeeks[1] * 7 * 864e5);
  const f = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  return f(a) === f(b) ? f(a) : `${f(a).split(" ")[0]} to ${f(b)}`;
}

export const fmtDate = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export type CashStep = { when: string; what: string; inUsd: number; outUsd: number; balance: number };

/**
 * Cash timeline for one campaign. MEES terms: design and sampling paid upfront per style,
 * production 50% at order and 50% before dispatch, prices FOB.
 */
export function cashTimeline(o: {
  pairs: number[];
  prices: number[];
  landedUsd: number[];
  fobUsd: number[];
  styles: number;
  devUsdPerStyle: number;
  depositShare: number;
  paymentFee: number;
  marketingUsd: number;
}): CashStep[] {
  const revenue = o.pairs.reduce((s, n, i) => s + n * o.prices[i], 0);
  const fob = o.pairs.reduce((s, n, i) => s + n * o.fobUsd[i], 0);
  const landingOnly = o.pairs.reduce((s, n, i) => s + n * (o.landedUsd[i] - o.fobUsd[i]), 0);
  const dev = o.styles * o.devUsdPerStyle;
  const fees = revenue * o.paymentFee;
  const steps: Omit<CashStep, "balance">[] = [
    { when: "Before launch", what: "MEES design and sampling, paid upfront", inUsd: 0, outUsd: dev },
    { when: "Before launch", what: "Sample shoot, lookbook, launch content", inUsd: 0, outUsd: o.marketingUsd },
    { when: "Pre-order window", what: `Pre-orders collected (${Math.round(o.depositShare * 100)}% at checkout), less card fees`, inUsd: revenue * o.depositShare - fees, outUsd: 0 },
    { when: "Order placed", what: "MEES production, 50% at order", inUsd: 0, outUsd: fob / 2 },
    { when: "Before dispatch", what: "MEES production, final 50%", inUsd: 0, outUsd: fob / 2 },
    { when: "Before dispatch", what: o.depositShare < 1 ? "Balance charged to customers" : "No balance due", inUsd: revenue * (1 - o.depositShare), outUsd: 0 },
    { when: "Arrival", what: "Freight, duty and US fulfilment", inUsd: 0, outUsd: landingOnly },
  ];
  let bal = 0;
  return steps.map((s) => {
    bal += s.inUsd - s.outUsd;
    return { ...s, balance: bal };
  });
}

export function sizeRun(pairs: number) {
  const raw = SIZES.map((s) => ({ size: s, n: Math.round(pairs * SIZE_CURVE[s]) }));
  const diff = pairs - raw.reduce((s, x) => s + x.n, 0);
  raw[6].n += diff;
  return raw;
}

/** US costs per pair after landing. Estimates. */
export const DTC = {
  fulfilmentUsd: 18, // pick, pack, free insured 2-day shipping inside the US
  paymentFee: 0.03, // card processing
  exchangeReserve: 0.04, // share of revenue held for size exchanges and defects
};

export type UnitEconomics = {
  product: Product;
  studioFobEur: number;
  luxuryEur: number;
  fobEur: number;
  dutyEur: number;
  landedEur: number;
  devEur: number;
  landedUsd: number;
  fobUsd: number;
  dtcUsd: number;
  allInUsd: number;
  marginUsd: number;
  margin: number;
  multiple: number;
};

/**
 * Per-pair economics for the launch colorways at luxury spec. Development is charged per colorway
 * (one MEES design plus sampling round each), which is conservative: MEES quotes per style.
 */
export function launchEconomics(pairsPerColorway: number, a: Assumptions = DEFAULT_ASSUMPTIONS): UnitEconomics[] {
  const launch = PRODUCTS.filter((p) => p.launch && p.series === "0929");
  const results = buildCollection(
    assignRoles(CONCEPT_PALETTE),
    launch.map((p) => ({ style: "runner" as const, recipe: "hero" as const, story: p.storyId })),
  );
  const c = costCollection(results, { ...a, units: pairsPerColorway });
  return launch.map((product, i) => {
    const look = c.looks[i];
    const fobEur = look.fob + LUXURY_UPCHARGE;
    const dutyEur = (fobEur * a.duty) / 100;
    const landedEur = fobEur + a.freight + dutyEur;
    const devEur = (a.designFee + a.samplingFee) / Math.max(1, pairsPerColorway);
    const dtcUsd = DTC.fulfilmentUsd + product.usd * (DTC.paymentFee + DTC.exchangeReserve);
    const allInUsd = (landedEur + devEur) * a.fx + dtcUsd;
    return {
      product, studioFobEur: look.fob, luxuryEur: LUXURY_UPCHARGE, fobEur, dutyEur, landedEur, devEur,
      landedUsd: landedEur * a.fx, fobUsd: fobEur * a.fx, dtcUsd, allInUsd,
      marginUsd: product.usd - allInUsd, margin: 1 - allInUsd / product.usd, multiple: product.usd / (landedEur * a.fx),
    };
  });
}

export type CampaignStatus = "upcoming" | "open" | "closed";
export function campaignStatus(now = new Date(), c: Campaign = CAMPAIGN): CampaignStatus {
  if (now < new Date(c.opens + "T05:00:00Z")) return "upcoming";
  if (now > new Date(c.closes + "T05:00:00Z")) return "closed";
  return "open";
}

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

/** 0929 is the only series with a confirmed make time. 1101 and 1213 are still studies. */
export function offerLine(series: SeriesId) {
  if (series === "0929") return `Made to order. Ready in ${LEAD_TIME}.`;
  return "A sample and tooling are still pending. A request records interest at the listed price. A ship date is not promised.";
}

export function statusLine() {
  return "0929 made to order · 1101 and 1213 are studies";
}

export type FundingId = "owner" | "lean" | "render" | "crowd";

export type FundingModel = {
  id: FundingId;
  name: string;
  idea: string;
  /** MEES styles sampled before money comes in: "all" = one per colorway, 1 = one runner, 0 = after the window. */
  sampleFirst: "all" | 1 | 0;
  marketingUsd: number;
  /** Share of revenue lost to the platform and card processing. */
  fee: number;
  /** Weeks added to delivery because sampling happens after the window. */
  extraWeeks: number;
  pros: string[];
  risks: string[];
};

export const FUNDING: FundingModel[] = [
  {
    id: "owner", name: "Owner-funded", sampleFirst: "all", marketingUsd: 15000, fee: DTC.paymentFee, extraWeeks: 0,
    idea: "Sample all three colorways and pay for the shoot and seeding before the window opens. Production is funded by pre-orders.",
    pros: ["Real photographs and try-ons before anyone pays", "Fastest delivery after close"],
    risks: ["About $24k at risk before the first sale"],
  },
  {
    id: "lean", name: "Lean sample", sampleFirst: 1, marketingUsd: 1500, fee: DTC.paymentFee, extraWeeks: 0,
    idea: "Sample one runner in the lead colorway only. The other two colorways are approved from MEES lab dips and material cards. Marketing is founder-led: phone shoot of the sample, the waitlist, private try-ons.",
    pros: ["One real sample to photograph and fit-test", "Keeps the shop and its luxury feel as built"],
    risks: ["About $4.5k still comes from you", "Ask MEES whether colorways of one style need separate sampling fees"],
  },
  {
    id: "render", name: "Render-first pre-order", sampleFirst: 0, marketingUsd: 500, fee: DTC.paymentFee, extraWeeks: 8,
    idea: "Open the window on the photoreal renders, clearly labelled. When a colorway confirms, pay MEES design and sampling from the proceeds, approve the sample, then produce.",
    pros: ["Close to zero owner cash", "Lowest fees, your own customer list and brand"],
    risks: [
      "Stripe often holds a reserve on pre-orders that ship months later; agree it with Stripe before launch",
      "Delivery is about 8 weeks later, for sampling",
      "If the sample fails, refunds must come from funds you have not yet spent: pay MEES only after the sample is approved",
    ],
  },
  {
    id: "crowd", name: "All-or-nothing crowdfunding", sampleFirst: 0, marketingUsd: 500, fee: 0.09, extraWeeks: 10,
    idea: "Run the founding window on Kickstarter or a similar platform with a goal that covers samples, production and landing. Backers are only charged if the goal is met; funds arrive in one payout about two weeks after close.",
    pros: ["Zero owner cash and no payment-processor reserve", "Backers accept the risk of a product in development", "The platform brings some of its own audience"],
    risks: ["About 9% in platform and card fees (estimate)", "Reads less luxurious; keep the page restrained and the price unchanged", "Check the platform's prototype rules; some want a physical sample shown"],
  },
];

/** Cash timeline under a funding model, from the per-pair economics. */
export function fundingTimeline(m: FundingModel, o: {
  pairs: number[];
  prices: number[];
  landedUsd: number[];
  fobUsd: number[];
  devUsdPerStyle: number;
  marketingUsd: number;
}): CashStep[] {
  const colorways = o.pairs.filter((n) => n > 0).length;
  const revenue = o.pairs.reduce((s, n, i) => s + n * o.prices[i], 0);
  const fob = o.pairs.reduce((s, n, i) => s + n * o.fobUsd[i], 0);
  const landing = o.pairs.reduce((s, n, i) => s + n * (o.landedUsd[i] - o.fobUsd[i]), 0);
  const sampleStyles = m.sampleFirst === "all" ? colorways : 1;
  const dev = sampleStyles * o.devUsdPerStyle;
  const inflow = revenue * (1 - m.fee);
  const steps: Omit<CashStep, "balance">[] = [];
  if (m.sampleFirst !== 0) steps.push({ when: "Before launch", what: `MEES design and sampling, ${sampleStyles === 1 ? "one runner" : `${sampleStyles} colorways`}, paid upfront`, inUsd: 0, outUsd: dev });
  steps.push({ when: "Before launch", what: m.marketingUsd >= 5000 ? "Sample shoot, film, seeding" : "Founder-led content and list building", inUsd: 0, outUsd: o.marketingUsd });
  steps.push({
    when: m.id === "crowd" ? "About 2 weeks after close" : "Pre-order window",
    what: m.id === "crowd" ? "Campaign payout, less platform and card fees" : "Pre-orders collected in full, less card fees",
    inUsd: inflow, outUsd: 0,
  });
  if (m.sampleFirst === 0) steps.push({ when: "After close", what: "MEES design and sampling, one runner, paid from proceeds", inUsd: 0, outUsd: dev });
  steps.push({ when: "Sample approved", what: "MEES production, 50% at order", inUsd: 0, outUsd: fob / 2 });
  steps.push({ when: "Before dispatch", what: "MEES production, final 50%", inUsd: 0, outUsd: fob / 2 });
  steps.push({ when: "Arrival", what: "Freight, duty and US fulfilment", inUsd: 0, outUsd: landing });
  let bal = 0;
  return steps.map((s) => {
    bal += s.inUsd - s.outUsd;
    return { ...s, balance: bal };
  });
}
