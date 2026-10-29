/**
 * 2027 line, from the 29 Oct 2026 pricing framework.
 * Retail figures are proposed list prices. They are not checkout prices.
 * Wholesale, landed cost, and margin stay off this file.
 * Four collaboration concepts are omitted: licensing is not established.
 */

export type LineTier = "CORE" | "VELOCITY" | "GRAIL";
export type LineStatus = "proposed" | "held";

export type LineProduct = {
  ref: string;
  name: string;
  tier: LineTier;
  category: string;
  colors: string;
  material: string;
  retail: number | null;
  status: LineStatus;
};

export type Frame = {
  n: number;
  alt: string;
  /** Product pages that may show this frame. Empty means lookbook only. */
  refs: string[];
};

export const LINE: LineProduct[] = [
  { ref: "R020", name: "Essential black top", tier: "CORE", category: "Essentials", colors: "Black", material: "Long-staple cotton jersey, heavyweight; proposed", retail: 145, status: "proposed" },
  { ref: "R043", name: "Arch script dad hat", tier: "CORE", category: "Headwear", colors: "Black; stone", material: "Cotton twill cap with stitched wordmark; proposed", retail: 110, status: "proposed" },
  { ref: "R042", name: "Triangle chenille patch cap", tier: "CORE", category: "Headwear", colors: "Ivory; stone", material: "Cotton twill cap with chenille patch; proposed", retail: 125, status: "proposed" },
  { ref: "R045", name: "Triangle trucker cap", tier: "CORE", category: "Headwear", colors: "TBC", material: "Cotton-poly mesh trucker construction; blend TBC", retail: 115, status: "proposed" },
  { ref: "R017", name: "Essential sweatpant", tier: "CORE", category: "Sweats", colors: "Heather; black", material: "Heavy cotton French terry; elastane content TBC", retail: 225, status: "proposed" },
  { ref: "R014", name: "Saint Gabriel illustrated hoodie", tier: "CORE", category: "Sweats", colors: "TBC", material: "Cotton French terry with artwork; weight and blend TBC", retail: 325, status: "proposed" },
  { ref: "R018", name: "Saint Gabriel jogger", tier: "CORE", category: "Sweats", colors: "TBC", material: "Dense cotton French terry; blend TBC", retail: 245, status: "proposed" },
  { ref: "R012", name: "Saint Jerome camouflage hoodie", tier: "CORE", category: "Sweats", colors: "Camouflage", material: "Dense cotton French terry fleece; GSM and fiber content TBC", retail: 295, status: "proposed" },
  { ref: "R019", name: "Saint script shorts", tier: "CORE", category: "Sweats", colors: "Light; heather", material: "Loopback cotton French terry; blend TBC", retail: 175, status: "proposed" },
  { ref: "R015", name: "Vintage Madonna crewneck", tier: "CORE", category: "Sweats", colors: "Black; cream; indigo wash; navy", material: "100% cotton loopback French terry, 9 oz. Design brief; not mill-certified", retail: 260, status: "proposed" },
  { ref: "R016", name: "Vintage wordmark crewneck", tier: "CORE", category: "Sweats", colors: "Black; cream; indigo wash; navy", material: "100% cotton loopback French terry, 9 oz. Design brief; not mill-certified", retail: 245, status: "proposed" },
  { ref: "R013", name: "Washed slate logo hoodie", tier: "CORE", category: "Sweats", colors: "Slate", material: "Garment-washed cotton French terry; weight and blend TBC", retail: 245, status: "proposed" },
  { ref: "R041", name: "Jorts", tier: "CORE", category: "Active leisure", colors: "TBC", material: "Denim jorts; fiber and weight TBC", retail: 295, status: "proposed" },
  { ref: "R039", name: "Leisure vest", tier: "CORE", category: "Active leisure", colors: "TBC", material: "Washed technical mesh and woven trim; fiber and GSM TBC", retail: 350, status: "proposed" },
  { ref: "R038", name: "Washed mesh track jacket", tier: "CORE", category: "Active leisure", colors: "TBC", material: "Washed technical mesh and woven trim; fiber and GSM TBC", retail: 495, status: "proposed" },
  { ref: "R040", name: "Wide leisure pant", tier: "CORE", category: "Active leisure", colors: "TBC", material: "Washed technical mesh and woven trim; fiber and GSM TBC", retail: 395, status: "proposed" },
  { ref: "R044", name: "Wordmark cap", tier: "CORE", category: "Headwear", colors: "Black/yellow; black/white", material: "Duplicate to reconcile. No separate material claim", retail: null, status: "held" },

  { ref: "R067", name: "Denim-trim duffel", tier: "VELOCITY", category: "Accessories", colors: "Butter yellow; peach; pale green", material: "Denim trim specified. Body fabric and handles are not established", retail: 590, status: "proposed" },
  { ref: "R028", name: "Black speckled tapered jean", tier: "VELOCITY", category: "Course Edit", colors: "Black speckle", material: "Heavyweight black denim; composition TBC", retail: 625, status: "proposed" },
  { ref: "R027", name: "Cobalt double-zip jacket", tier: "VELOCITY", category: "Course Edit", colors: "Cobalt", material: "Compact technical cotton-nylon twill direction; proposed, not selected", retail: 1150, status: "proposed" },
  { ref: "R032", name: "Grouped-stripe trouser", tier: "VELOCITY", category: "Course Edit", colors: "Black, mocha, and sand stripe", material: "Wool-cotton textured stripe direction; proposed, not selected", retail: 850, status: "proposed" },
  { ref: "R031", name: "Grouped-stripe zip jacket", tier: "VELOCITY", category: "Course Edit", colors: "Black, mocha, and sand stripe", material: "Wool-cotton textured stripe direction; proposed, not selected", retail: 1150, status: "proposed" },
  { ref: "R030", name: "Pinstripe tapered trouser", tier: "VELOCITY", category: "Course Edit", colors: "Indigo pinstripe", material: "Linen-cotton denim-like pinstripe direction; blend ratio TBC", retail: 850, status: "proposed" },
  { ref: "R029", name: "Pinstripe zip jacket", tier: "VELOCITY", category: "Course Edit", colors: "Indigo pinstripe", material: "Linen-cotton denim-like pinstripe direction; blend ratio TBC", retail: 1450, status: "proposed" },
  { ref: "R033", name: "Caddie Coverall", tier: "VELOCITY", category: "Coveralls", colors: "Vintage blue chambray", material: "Cotton chambray direction; weight and composition TBC", retail: 1350, status: "proposed" },
  { ref: "R024", name: "Ice-blue jean", tier: "VELOCITY", category: "Denim", colors: "Ice blue", material: "Premium cotton denim direction; weight and stretch content TBC", retail: 595, status: "proposed" },
  { ref: "R022", name: "Washed brown trucker", tier: "VELOCITY", category: "Denim", colors: "Washed brown", material: "Portuguese denim candidate; cotton content and weight TBC", retail: 925, status: "proposed" },
  { ref: "R023", name: "Washed charcoal jean", tier: "VELOCITY", category: "Denim", colors: "Charcoal", material: "Premium cotton denim direction; weight and stretch content TBC", retail: 595, status: "proposed" },
  { ref: "R048", name: "Alpine Loop Mule", tier: "VELOCITY", category: "Footwear", colors: "Sage; powder blue; black", material: "Textured technical upper, rope laces; fiber and sole TBC", retail: 575, status: "proposed" },
  { ref: "N015", name: "City Leather Mule", tier: "VELOCITY", category: "Footwear", colors: "Stone; midnight; espresso", material: "Goatskin leather or suede upper proposed. Natural footbed and a rugged sole are proposed, not confirmed", retail: 795, status: "proposed" },
  { ref: "R047", name: "D-ring mule", tier: "VELOCITY", category: "Footwear", colors: "Stone; black", material: "Pebbled leather upper; leather type and outsole TBC", retail: 795, status: "proposed" },
  { ref: "N016", name: "Leather-Free Technical Slip-On", tier: "VELOCITY", category: "Footwear", colors: "Black; stone; olive", material: "Ripstop polyester upper with TPU and PU structure; sole compound TBC", retail: 495, status: "proposed" },
  { ref: "N001", name: "Suede Runner — Plum / Ivory", tier: "VELOCITY", category: "Footwear", colors: "Plum; ivory; blush", material: "Goatskin suede overlays, open ivory mesh, textile lining, rounded rubber lug outsole. Swatch pending", retail: 695, status: "proposed" },
  { ref: "R046", name: "Trail Mule", tier: "VELOCITY", category: "Footwear", colors: "Carbon; stone; taupe; midnight; olive; cocoa; powder blue", material: "DWR nylon ripstop upper. A wide rugged sole is intended; compound TBC", retail: 450, status: "proposed" },
  { ref: "R010", name: "Integrated shirt-and-tie jersey", tier: "VELOCITY", category: "Jerseys", colors: "Blue, white, and navy; sage, burgundy, and pink; further city variants", material: "Polyester jersey body and cotton woven collar and sleeve extensions; percentages and weight TBC", retail: 390, status: "proposed" },
  { ref: "R011", name: "Integrated turtleneck jersey", tier: "VELOCITY", category: "Jerseys", colors: "Ochre and chocolate; city variants TBC", material: "Polyester jersey body and a bamboo-viscose blend layer. Design brief", retail: 350, status: "proposed" },
  { ref: "R035", name: "Camel twill short jacket", tier: "VELOCITY", category: "Outerwear", colors: "Camel", material: "Stretch cotton denim or twill. The reference cloth is inspiration, not the sourced cloth", retail: 1450, status: "proposed" },
  { ref: "R034", name: "Garage/Harrington jacket", tier: "VELOCITY", category: "Outerwear", colors: "Carbon; chambray blue; sand", material: "Dense cotton twill or chambray; cloth selection TBC", retail: 1295, status: "proposed" },
  { ref: "R021", name: "Saint Gabriel matte puffer", tier: "VELOCITY", category: "Outerwear", colors: "Black", material: "Matte technical shell. Insulation and shell fiber TBC. No down claim", retail: 975, status: "proposed" },
  { ref: "R001", name: "Madonna, Child and Saint Anne rugby", tier: "VELOCITY", category: "Rugby", colors: "TBC", material: "Premium polyester jersey body, cotton-rich rib collar and cuffs. Fiber breakdown not approved", retail: 325, status: "proposed" },
  { ref: "R004", name: "Saint Catherine striped rugby", tier: "VELOCITY", category: "Rugby", colors: "TBC", material: "Premium polyester jersey body, cotton-rich rib collar and cuffs. Fiber breakdown not approved", retail: 325, status: "proposed" },
  { ref: "R003", name: "Saint George rugby", tier: "VELOCITY", category: "Rugby", colors: "TBC", material: "Premium polyester jersey body, cotton-rich rib collar and cuffs. Fiber breakdown not approved", retail: 325, status: "proposed" },
  { ref: "R002", name: "Saint John rugby", tier: "VELOCITY", category: "Rugby", colors: "Blue stripe", material: "Premium polyester jersey body, cotton-rich rib collar and cuffs. Fiber breakdown not approved", retail: 325, status: "proposed" },
  { ref: "R007", name: "Saint Jerome Oxford", tier: "VELOCITY", category: "Shirts", colors: "Light blue", material: "Long-staple cotton Oxford shirting. 100% cotton proposed", retail: 450, status: "proposed" },
  { ref: "R008", name: "Saint Michael check shirt", tier: "VELOCITY", category: "Shirts", colors: "Tonal check", material: "Brushed cotton check or flannel; yarn and composition TBC", retail: 495, status: "proposed" },
  { ref: "N003", name: "Crushed Nylon Tailored Trouser", tier: "VELOCITY", category: "Tailoring", colors: "Black; charcoal; mauve", material: "Crushed-finish technical nylon; elastane and finish TBC", retail: 895, status: "proposed" },
  { ref: "R005", name: "Illustrated stripe rugby variants", tier: "VELOCITY", category: "Rugby", colors: "Green stripe; black and grey stripe", material: "May overlap the coded rugby styles. No separate price", retail: null, status: "held" },
  { ref: "R006", name: "Illustrated collared top", tier: "VELOCITY", category: "Shirts", colors: "Cream; black", material: "Earlier collared illustration. No separate price", retail: null, status: "held" },
  { ref: "R009", name: "Blue illustrated long sleeve", tier: "VELOCITY", category: "Shirts", colors: "Blue", material: "Earlier illustrated long sleeve. No separate price", retail: null, status: "held" },
  { ref: "R050", name: "Additional numbered shoe explorations", tier: "VELOCITY", category: "Footwear", colors: "TBC", material: "Earlier palette and shape studies. No separate price", retail: null, status: "held" },

  { ref: "N004", name: "Butter Yellow Goatskin Suede Duffel", tier: "GRAIL", category: "Accessories", colors: "Butter yellow", material: "Fine-nap suede body proposed. Lining, hardware, and reinforcement TBC", retail: 1495, status: "proposed" },
  { ref: "N013", name: "Camel Leather Private Backpack", tier: "GRAIL", category: "Accessories", colors: "Camel", material: "Full-grain leather body direction; tannage, lining, and hardware TBC", retail: 1950, status: "proposed" },
  { ref: "R051", name: "Flap drawstring backpack", tier: "GRAIL", category: "Accessories", colors: "Tan", material: "Leather or premium technical canvas under consideration", retail: 1450, status: "proposed" },
  { ref: "R057", name: "Icon Jacket", tier: "GRAIL", category: "Atelier concepts", colors: "Neutral; cobalt studies", material: "Suede and cashmere, or double-face wool, jacket direction. Cloth not selected", retail: 2950, status: "proposed" },
  { ref: "R059", name: "Monastic Vest", tier: "GRAIL", category: "Atelier concepts", colors: "Neutral; cobalt studies", material: "Wool-cashmere double-face vest direction. Cloth not selected", retail: 1250, status: "proposed" },
  { ref: "R060", name: "Odyssey Trouser", tier: "GRAIL", category: "Atelier concepts", colors: "Neutral; cobalt studies", material: "Compact wool-silk tailoring cloth direction. Cloth not selected", retail: 1250, status: "proposed" },
  { ref: "R056", name: "Pilgrim Cape", tier: "GRAIL", category: "Atelier concepts", colors: "Neutral; cobalt studies", material: "Double-face wool-cashmere cape cloth proposed. Cloth not selected", retail: 3450, status: "proposed" },
  { ref: "R058", name: "Relic Knit", tier: "GRAIL", category: "Atelier concepts", colors: "Neutral; cobalt studies", material: "Mohair-cashmere hand-knit direction; blend TBC", retail: 1450, status: "proposed" },
  { ref: "R025", name: "Double-zip Saint Michael jacket", tier: "GRAIL", category: "Denim", colors: "TBC", material: "Premium denim body; cotton content and weight TBC", retail: 1250, status: "proposed" },
  { ref: "R026", name: "Washed varsity jacket", tier: "GRAIL", category: "Denim", colors: "Black and tonal", material: "Heavy washed denim body; composition TBC", retail: 1195, status: "proposed" },
  { ref: "R049", name: "Class Slipper", tier: "GRAIL", category: "Footwear", colors: "Black and graphite; other colors TBC", material: "Fine-nap suede upper and a cashmere lining are proposed. Neither is approved", retail: 1280, status: "proposed" },
  { ref: "N002", name: "Chevron Mohair-Cashmere Mock Neck", tier: "GRAIL", category: "Knitwear", colors: "Charcoal; cream; mauve", material: "Mohair-cashmere yarn, chevron knit; blend and gauge TBC", retail: 1395, status: "proposed" },
  { ref: "N014", name: "Fine Cashmere Turtleneck", tier: "GRAIL", category: "Knitwear", colors: "Butter yellow; powder; graphite", material: "100% cashmere is the target. Yarn origin and grade are unverified", retail: 995, status: "proposed" },
  { ref: "R064", name: "Aperture Shirt", tier: "GRAIL", category: "Light studies", colors: "Light and color studies", material: "Cotton-silk poplin shirting direction. Cloth not selected", retail: 850, status: "proposed" },
  { ref: "R063", name: "Atmosphere Knit", tier: "GRAIL", category: "Light studies", colors: "Light and color studies", material: "Cashmere-silk fine-gauge knit direction. Cloth not selected", retail: 1350, status: "proposed" },
  { ref: "R062", name: "Ghirri Jacket", tier: "GRAIL", category: "Light studies", colors: "Light and color studies", material: "Linen-silk jacket cloth direction. Cloth not selected", retail: 1850, status: "proposed" },
  { ref: "R066", name: "Horizon Trouser", tier: "GRAIL", category: "Light studies", colors: "Light and color studies", material: "Wool-silk tailored trouser cloth direction. Cloth not selected", retail: 995, status: "proposed" },
  { ref: "R061", name: "Light Coat", tier: "GRAIL", category: "Light studies", colors: "Light and color studies", material: "Double-face cashmere-wool coat direction. Cloth not selected", retail: 2850, status: "proposed" },
  { ref: "R065", name: "Terrain Blouson", tier: "GRAIL", category: "Light studies", colors: "Light and color studies", material: "Silk-cashmere blouson direction. Cloth not selected", retail: 2250, status: "proposed" },
  { ref: "N017", name: "Denim-Cashmere Overshirt", tier: "GRAIL", category: "Outerwear", colors: "Charcoal; mushroom", material: "Cotton denim outer and a cashmere knit inset or lining. Bill of materials TBC", retail: 1750, status: "proposed" },
  { ref: "N005", name: "Arrival Silk-Cashmere Zip Jacket", tier: "GRAIL", category: "Private Wardrobe", colors: "Midnight; stone; camel", material: "Silk-cashmere cloth; exact blend and weight TBC", retail: 1950, status: "proposed" },
  { ref: "N006", name: "Arrival Tailored Trouser", tier: "GRAIL", category: "Private Wardrobe", colors: "Midnight; stone; camel", material: "Fine wool-silk or silk-cashmere tailoring cloth; selection TBC", retail: 1095, status: "proposed" },
  { ref: "N009", name: "Double-Face Overshirt", tier: "GRAIL", category: "Private Wardrobe", colors: "Camel; charcoal; navy", material: "Double-face wool-cashmere fabric proposed; blend TBC", retail: 1850, status: "proposed" },
  { ref: "N007", name: "Fine-Gauge Knit Polo", tier: "GRAIL", category: "Private Wardrobe", colors: "Navy; ecru; mushroom", material: "Cashmere-silk fine-gauge knit proposed; fiber ratio TBC", retail: 795, status: "proposed" },
  { ref: "N010", name: "Leisure Blouson", tier: "GRAIL", category: "Private Wardrobe", colors: "Black; stone; olive", material: "Silk-cashmere or double-face wool-cashmere; fabric route TBC", retail: 1850, status: "proposed" },
  { ref: "N008", name: "Luxury Rugby", tier: "GRAIL", category: "Private Wardrobe", colors: "Navy; ecru; dark red", material: "Heavy cotton piqué or cotton-silk interlock; selection TBC", retail: 850, status: "proposed" },
  { ref: "R037", name: "Matching tapered dress slack", tier: "GRAIL", category: "Tailored sets", colors: "Blue; camel; olive", material: "Coordinated silk-cashmere blend direction; percentage TBC", retail: 1150, status: "proposed" },
  { ref: "R036", name: "Silk-cashmere shirt jacket", tier: "GRAIL", category: "Tailored sets", colors: "Blue; camel; olive", material: "Silk-cashmere woven jacket direction; silk and cashmere percentage and weight TBC", retail: 2250, status: "proposed" },
  { ref: "N011", name: "Suede / Cashmere Suit Jacket", tier: "GRAIL", category: "Tailored sets", colors: "Mauve; olive; charcoal", material: "Cashmere tailoring textile with suede detailing; placement TBC", retail: 2850, status: "proposed" },
  { ref: "N012", name: "Suede / Cashmere Suit Trouser", tier: "GRAIL", category: "Tailored sets", colors: "Mauve; olive; charcoal", material: "Cashmere-wool tailoring cloth with optional suede trim; final bill of materials TBC", retail: 1450, status: "proposed" },
];

export const FRAMES: Frame[] = [
  { n: 1, alt: "Black cap with an arched MADE SAINT wordmark, worn", refs: ["R043"] },
  { n: 2, alt: "Black cap with an arched MADE SAINT wordmark, front", refs: ["R043"] },
  { n: 3, alt: "Ivory cap with a black triangular patch", refs: ["R042"] },
  { n: 4, alt: "Stone cap with a black triangular patch, worn", refs: ["R042"] },
  { n: 5, alt: "Stone cap, rear wordmark", refs: ["R043"] },
  { n: 6, alt: "Blue jersey worn over a shirt and tie", refs: ["R010"] },
  { n: 7, alt: "Stone jersey worn over a shirt and tie", refs: ["R010"] },
  { n: 8, alt: "Washed denim jacket, back, small saint study", refs: [] },
  { n: 9, alt: "Washed denim jacket, Saint Gabriel back study", refs: [] },
  { n: 10, alt: "Washed denim jacket, front wordmark", refs: [] },
  { n: 11, alt: "Washed denim jacket, front", refs: [] },
  { n: 12, alt: "Brown suede lace mule, pair", refs: ["N015"] },
  { n: 13, alt: "Brown suede lace mule, side", refs: ["N015"] },
  { n: 14, alt: "Brown suede lace mule, three-quarter", refs: ["N015"] },
  { n: 15, alt: "Brown suede lace mule, top", refs: ["N015"] },
  { n: 16, alt: "Brown suede lace mule, front", refs: ["N015"] },
  { n: 17, alt: "Brown suede lace mule, front pair", refs: ["N015"] },
  { n: 18, alt: "Suede mule lace and D-ring", refs: ["N015"] },
  { n: 19, alt: "Black suede lace mule, pair", refs: ["N015"] },
  { n: 20, alt: "Black suede lace mule, side", refs: ["N015"] },
  { n: 21, alt: "Black suede lace mule, front", refs: ["N015"] },
  { n: 22, alt: "Black suede mule, tongue wordmark", refs: ["N015"] },
  { n: 23, alt: "Butter yellow duffel with denim trim", refs: ["R067"] },
  { n: 24, alt: "Denim jacket and trousers, worn at a stone entrance", refs: [] },
  { n: 25, alt: "Printed jersey, shirt, tie, and chinos", refs: ["R010"] },
  { n: 26, alt: "Cobalt zip jacket and brown trouser, worn", refs: ["R027"] },
  { n: 27, alt: "Three denim-trim duffels: butter, peach, and pale green", refs: ["R067"] },
  { n: 28, alt: "Denim jacket, knit, and jean, worn", refs: [] },
  { n: 29, alt: "Tailored jacket and a brown backpack", refs: ["N013"] },
  { n: 30, alt: "Shorts, patterned shirt, and a brown backpack", refs: ["R041", "N013"] },
  { n: 31, alt: "Argyle knit and a brown backpack", refs: ["N013"] },
  { n: 32, alt: "Grouped-stripe jacket and trouser, on a course", refs: ["R031", "R032"] },
  { n: 33, alt: "Grouped-stripe suit, full length, on a course", refs: ["R031", "R032"] },
  { n: 34, alt: "Navy zip set on a course. Not the pinstripe styles", refs: [] },
  { n: 35, alt: "Navy zip set, full length, on a course", refs: [] },
  { n: 36, alt: "Cobalt zip jacket on a course", refs: ["R027"] },
  { n: 37, alt: "Cobalt zip jacket, full length, on a course", refs: ["R027"] },
  { n: 38, alt: "Blue-grey zip leisure set", refs: [] },
  { n: 39, alt: "Blue-grey zip leisure set, back study", refs: [] },
  { n: 40, alt: "Camel zip leisure set", refs: [] },
  { n: 41, alt: "Camel zip leisure set, back study", refs: [] },
  { n: 42, alt: "Olive zip leisure set", refs: [] },
  { n: 43, alt: "Olive zip leisure set, back study", refs: [] },
  { n: 44, alt: "Collar and rib detail", refs: [] },
  { n: 45, alt: "Sage leisure set, cropped frame", refs: [] },
  { n: 46, alt: "Sage leisure set, seated", refs: [] },
  { n: 47, alt: "Sage jacket over a butter neck with a red wordmark", refs: ["N014"] },
  { n: 48, alt: "Sage jacket and butter wordmark neck", refs: ["N014"] },
  { n: 49, alt: "Black jacket over a grey wordmark neck", refs: ["N014"] },
  { n: 50, alt: "Dusty rose zip leisure set", refs: [] },
  { n: 51, alt: "Dusty rose jacket over a teal wordmark neck", refs: ["N014"] },
  { n: 52, alt: "Dusty rose zip leisure set, back", refs: [] },
  { n: 53, alt: "Black jacket and grey wordmark neck", refs: ["N014"] },
  { n: 54, alt: "Black and ivory runner, low-resolution crop. Not a founding colorway", refs: [] },
  { n: 55, alt: "Black zip leisure set", refs: [] },
  { n: 56, alt: "Black jacket, technical trouser, and a yellow crossbody", refs: [] },
  { n: 57, alt: "Black jacket, technical trouser, and a yellow crossbody, front", refs: [] },
  { n: 58, alt: "Mauve jacket and trouser with a yellow crossbody", refs: [] },
  { n: 59, alt: "Mauve jacket and trouser with a yellow crossbody, three-quarter", refs: [] },
];

export const frameSrc = (n: number) => `/line/f${String(n).padStart(2, "0")}.webp`;

export const lineByRef = (ref: string) => LINE.find((item) => item.ref.toLowerCase() === ref.toLowerCase());

export const framesFor = (ref: string) => FRAMES.filter((frame) => frame.refs.includes(ref));

export const pricedLine = () => LINE.filter((item) => item.status === "proposed" && item.retail != null);

export const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
