/**
 * Texture-matched men/women capsules for Private Wardrobe.
 * Curated from the capsule package — no source URLs, hashes, or production notes.
 */

export type CapsuleSide = "men" | "women";

export type CapsuleSwatch = {
  name: string;
  /** Display hex for the named palette chip only — not a product claim. */
  hex: string;
};

export type Capsule = {
  slug: string;
  number: string;
  title: string;
  /** Full paired plate — men left, women right. 1536×1024 (3:2). */
  image: string;
  cardImage: string;
  largeImage: string;
  width: number;
  height: number;
  alt: string;
  men: string;
  women: string;
  palette: CapsuleSwatch[];
  texture: string;
  colorLogic: string;
  line: string;
};

const SWATCH: Record<string, string> = {
  "Pale sage": "#9AAE96",
  Butter: "#E6D5A8",
  "Warm ivory": "#F2EDE4",
  Black: "#1C1A17",
  Graphite: "#5C5A56",
  Ivory: "#F1EBE2",
  Blue: "#3A5F8A",
  White: "#F7F7F5",
  "Ice denim": "#A8BFD0",
  Midnight: "#1A2232",
  Camel: "#B08A5A",
  Taupe: "#8C7B6A",
  Plum: "#6B4A58",
  Olive: "#5F6B4A",
  Charcoal: "#3A3A38",
  Aubergine: "#5A3348",
  Forest: "#3D5A40",
  "Slate blue": "#6A7F94",
  Cream: "#EFE8DA",
  Petrol: "#2F4F55",
  Oxblood: "#6E2C32",
  Rose: "#C48B8F",
  "Burgundy check": "#6B2E3A",
  "Dusty rose": "#C9A0A4",
  Chocolate: "#4A3428",
  "Washed black": "#2A2A28",
  "Ice blue": "#9BB5C9",
  Yellow: "#D4B35A",
  Cocoa: "#6B4E3D",
  "Light blue": "#AFC4D6",
  Indigo: "#3A4A6B",
  "Petrol teal": "#2F5558",
};

function swatches(names: string[]): CapsuleSwatch[] {
  return names.map((name) => ({ name, hex: SWATCH[name] ?? "#8D7349" }));
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type Seed = {
  number: string;
  title: string;
  file: string;
  men: string;
  women: string;
  palette: string[];
  texture: string;
  colorLogic: string;
  line: string;
};

const SEEDS: Seed[] = [
  {
    number: "01",
    title: "Miami Arrival",
    file: "miami-arrival",
    men: "Pale-sage textured zip blouson and pleated trouser, butter roll neck, yellow wave-panel runner.",
    women: "The same sage blouson over a butter roll neck, matching pleated trousers and yellow wave-panel runner.",
    palette: ["Pale sage", "Butter", "Warm ivory"],
    texture: "Fine diagonal cloth, ribbed collar and cuff relief, soft knit at the neck, smooth leather at the shoe.",
    colorLogic: "Butter links the neckline to the yellow shoe; pale sage keeps the outfit quiet.",
    line: "Pale sage and butter — a quiet arrival for him and for her.",
  },
  {
    number: "02",
    title: "Brooklyn After Dark",
    file: "brooklyn-after-dark",
    men: "Black collared zip blouson, graphite roll neck, black pleated trousers and black wave-panel runner.",
    women: "Black blouson and pleated trousers, grey roll neck and black wave-panel runner.",
    palette: ["Black", "Graphite", "Ivory"],
    texture: "Matte cloth, ridged point collar, fine rib knit and a restrained satin finish on the shoe sole.",
    colorLogic: "Grey opens up the all-black look; ivory sole accents provide a small light break.",
    line: "Black outerwear with a graphite note — evening weight without noise.",
  },
  {
    number: "03",
    title: "Course to Club",
    file: "course-to-club",
    men: "Blue printed jersey over a white shirt and navy tie, ice-blue denim, midnight runner.",
    women: "Blue printed jersey over a white shirt and navy tie, black pleated trouser, midnight runner.",
    palette: ["Blue", "White", "Ice denim", "Midnight"],
    texture: "Fine jersey pinstripes and printed motifs against crisp shirting, washed denim or matte tailoring.",
    colorLogic: "White cuffs and shirt collar connect with the runner's cream sole; navy grounds the brighter blue.",
    line: "The blue jersey over shirt and tie — denim or a clean trouser.",
  },
  {
    number: "04",
    title: "Camel Residence",
    file: "camel-residence",
    men: "Camel shirt jacket, butter roll neck, matching pleated dress trousers and quilted taupe slip-on.",
    women: "Camel shirt jacket, butter roll neck, matched trousers and the same taupe slip-on.",
    palette: ["Camel", "Butter", "Taupe", "Plum"],
    texture: "A softly brushed tailored surface, a fine neck knit and the shoe's controlled quilted texture.",
    colorLogic: "Camel and butter form the warm field; the muted plum outsole adds depth below the taupe upper.",
    line: "Camel tailoring with butter at the neck — shared proportions.",
  },
  {
    number: "05",
    title: "Olive Saint",
    file: "olive-saint",
    men: "Olive shirt jacket, butter roll neck, matched olive trousers and aubergine-forest runner.",
    women: "Olive shirt jacket, butter roll neck, charcoal pleated trousers and aubergine-forest runner.",
    palette: ["Olive", "Butter", "Charcoal", "Aubergine", "Forest"],
    texture: "Fine tonal tailoring, soft neck knit and the runner's open mesh with structured overlays.",
    colorLogic: "The forest accent echoes the olive garment; aubergine is a controlled contrast beneath the butter layer.",
    line: "Olive against butter — grounded, with a charcoal option for her.",
  },
  {
    number: "06",
    title: "Blue Hour",
    file: "blue-hour",
    men: "Slate-blue tailored shirt jacket and matched pleated trousers, petrol wave-panel runner.",
    women: "Cream and petrol printed jacket and trouser, petrol roll neck and petrol wave-panel runner.",
    palette: ["Slate blue", "Cream", "Petrol", "Ivory"],
    texture: "Quiet tonal patterned tailoring beside a more expressive printed surface, linked by smooth petrol footwear.",
    colorLogic: "Petrol is shared across both looks; cream lightens the printed option without leaving the blue family.",
    line: "Slate blue into petrol — evening register for both sides.",
  },
  {
    number: "07",
    title: "Private Departure",
    file: "private-departure",
    men: "Ivory textured zip set, butter sling and oxblood-rose runner.",
    women: "Ivory textured zip set, burgundy sling and oxblood-rose runner.",
    palette: ["Ivory", "Butter", "Oxblood", "Rose"],
    texture: "Light angular surface on the set, soft sling texture and open-mesh sneaker panels.",
    colorLogic: "Ivory is the dominant neutral; oxblood and rose anchor the look, with butter as a small accent.",
    line: "Ivory with an oxblood note — ready for the road.",
  },
  {
    number: "08",
    title: "Gallery Opening",
    file: "gallery-opening",
    men: "Burgundy check zip jacket and matching trousers, petrol roll neck and chocolate wave-panel runner.",
    women: "Dusty-rose textured zip blouson and trouser, petrol roll neck and chocolate wave-panel runner.",
    palette: ["Burgundy check", "Dusty rose", "Petrol", "Chocolate"],
    texture: "A disciplined woven check paired with fine diagonal cloth, both grounded by textured chocolate footwear.",
    colorLogic: "Petrol neck layers connect the two warm tailoring options; chocolate shoes soften the contrast.",
    line: "Burgundy check and dusty rose — linked by petrol and chocolate.",
  },
  {
    number: "09",
    title: "Downtown Denim",
    file: "downtown-denim",
    men: "Washed-black zip denim jacket, butter roll neck, ice-blue jean and aubergine-forest runner.",
    women: "Washed-black zip denim jacket, butter roll neck, charcoal jean and aubergine-forest runner.",
    palette: ["Washed black", "Ice blue", "Butter", "Aubergine", "Forest"],
    texture: "Faded denim seams and edge abrasion meet a fine soft knit and structured shoe overlays.",
    colorLogic: "Butter lifts the dark jacket; aubergine and forest provide controlled accents against blue or charcoal denim.",
    line: "Washed black denim with butter — city grain for both.",
  },
  {
    number: "10",
    title: "Winter Tunnel",
    file: "winter-tunnel",
    men: "Taupe tonal-pattern track set, butter roll neck, black Saint patch and yellow wave-panel runner.",
    women: "The same taupe tonal-pattern track set, butter roll neck, black Saint patch and yellow wave-panel runner.",
    palette: ["Taupe", "Butter", "Charcoal", "Yellow"],
    texture: "Fine tonal surface pattern, soft sleeve volume, piping and rib trim balanced by crisp leather footwear.",
    colorLogic: "Butter piping and neck knit connect to yellow shoes; taupe and charcoal keep the palette grounded.",
    line: "Taupe track with butter and yellow — shared for him and her.",
  },
  {
    number: "11",
    title: "Clubhouse Social",
    file: "clubhouse-social",
    men: "Cream and cocoa printed jersey over a light-blue shirt and brown tie, indigo jean and oxblood-rose runner.",
    women: "The same cream and cocoa jersey over a light-blue shirt and brown tie, black pleated trouser and oxblood-rose runner.",
    palette: ["Cream", "Cocoa", "Light blue", "Indigo", "Oxblood", "Rose"],
    texture: "Printed pinstriped jersey and crisp shirting above denim or tailored cloth; open shoe mesh adds a third surface.",
    colorLogic: "Cream and cocoa lead; the oxblood shoe deepens the brown and its rose mesh softens the transition.",
    line: "Cream jersey with cocoa — social without noise.",
  },
  {
    number: "12",
    title: "Weekend Residence",
    file: "weekend-residence",
    men: "Petrol track jacket and trouser, cream base layer, black Saint patch and petrol wave-panel runner.",
    women: "The same petrol track set, cream base layer, black Saint patch and petrol wave-panel runner.",
    palette: ["Petrol teal", "Chocolate", "Charcoal", "Cream"],
    texture: "Raised soft track surface, fine chocolate piping, charcoal ribbing and subtly textured leather footwear.",
    colorLogic: "Petrol repeats from garment to shoe; chocolate piping and cream sole accents provide warmth and light.",
    line: "Petrol teal into chocolate — the weekend at ease.",
  },
];

export const CAPSULES: Capsule[] = SEEDS.map((seed) => {
  const slug = slugify(seed.title);
  return {
    slug,
    number: seed.number,
    title: seed.title,
    image: `/wardrobe/capsules/${seed.file}.webp`,
    cardImage: `/wardrobe/capsules/${seed.file}-card.webp`,
    largeImage: `/wardrobe/capsules/${seed.file}-large.webp`,
    width: 1536,
    height: 1024,
    alt: `${seed.title} capsule — men's look on the left, women's look on the right`,
    men: seed.men,
    women: seed.women,
    palette: swatches(seed.palette),
    texture: seed.texture,
    colorLogic: seed.colorLogic,
    line: seed.line,
  };
});

export function capsuleBySlug(slug: string) {
  return CAPSULES.find((capsule) => capsule.slug === slug);
}

export function capsuleOutfit(capsule: Capsule, side: CapsuleSide) {
  return side === "women" ? capsule.women : capsule.men;
}

export function enquireCapsuleHref(slug: string, side: CapsuleSide = "men") {
  return `/wardrobe?capsule=${encodeURIComponent(slug)}&side=${side}#introduction`;
}
