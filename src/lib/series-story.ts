import type { SeriesId } from "@/lib/business";

export type NameDigit = {
  digit: string;
  meaning: string;
};

export type SeriesStory = {
  series: SeriesId;
  date: string;
  feast: string;
  title: string;
  quote: string;
  detail: string;
  parts: string[];
  facts: string[];
  reflection: string[];
  /**
   * Founder’s personal reading of each digit in the series name.
   * Calendar dates are feast days; digit meanings are philosophy, not scriptural numerology.
   */
  nameReading: NameDigit[];
  /** Editorial pair hero for the lead colourway only. */
  editorialHero: string;
  leadProductId: string;
};

/**
 * Founder series stories for the Warm Atelier product pages.
 * Calendar dates are Catholic feast days; digit meanings are personal reflection.
 */
export const SERIES_STORIES: Record<SeriesId, SeriesStory> = {
  "1101": {
    series: "1101",
    date: "November 1",
    feast: "All Saints’ Day",
    title: "A place for you.",
    quote:
      "I see 1101 as an invitation into belonging. A place prepared for you, with its own purpose and part to play.",
    detail: "/runners/atelier/1101-detail.webp",
    editorialHero: "/runners/atelier/1101-hero.webp",
    leadProductId: "ms-runner-1101-butter",
    parts: ["Chocolate suede", "Tan open mesh", "Sculptural sole"],
    facts: [
      "Dark chocolate suede overlays.",
      "Tan open-mesh panels and cream-brown flecked laces.",
      "Bronze midsole with matte black traction rubber.",
    ],
    nameReading: [
      { digit: "1", meaning: "The Father — a pillar of faith" },
      { digit: "1", meaning: "The Son — a pillar of faith" },
      { digit: "0", meaning: "The Holy Spirit — the unbroken circle, returning to the origin of all" },
      { digit: "1", meaning: "You — welcomed into relationship with God" },
    ],
    reflection: [
      "All Saints’ Day honors the saints, both known and unknown. That breadth of belonging lives at the heart of 1101.",
      "The Father. The Son. The Holy Spirit. You.",
      "In my personal reading of the sequence, the first two ones stand as pillars of faith. Zero represents the Holy Spirit through the unbroken circle, returning to the origin of all. The final one represents you: an individual welcomed into relationship with God.",
      "A place has been prepared for you. Your life carries its own purpose, its own responsibility, its own part to play.",
    ],
  },
  "1213": {
    series: "1213",
    date: "December 13",
    feast: "Saint Lucy, Virgin and Martyr",
    title: "Motion, in balance.",
    quote:
      "To me, 1213 represents movement, strength and balanced power. An advance, a return to center, then a further step.",
    detail: "/runners/atelier/1213-hero.webp",
    editorialHero: "/runners/atelier/1213-hero.webp",
    leadProductId: "ms-runner-1213-espresso",
    parts: ["Deep chocolate upper", "Taupe accents", "Cream laces"],
    facts: [
      "Deep chocolate upper in the Espresso colourway.",
      "Taupe details trace the side emblem and heel.",
      "Cream laces complete the Espresso colourway.",
    ],
    nameReading: [
      { digit: "1", meaning: "Advance — movement with intention" },
      { digit: "2", meaning: "Strength — conviction carried into action" },
      { digit: "1", meaning: "Return to center — balance" },
      { digit: "3", meaning: "A further step — the faith to keep becoming" },
    ],
    reflection: [
      "To me, 1213 represents movement, strength and balanced power.",
      "I see a rhythm in the sequence: one, two, one, three. An advance, a return to center, then a further step.",
      "December 13 connects this idea to Saint Lucy. Her witness gives the series a point of reflection: the courage to remain faithful to what you believe.",
      "For MADE SAiNT, motion means moving with intention. Strength means carrying conviction into action. Balance means remaining grounded as you grow. The faith to keep becoming.",
    ],
  },
  "0929": {
    series: "0929",
    date: "September 29",
    feast: "Saints Michael, Gabriel and Raphael, Archangels",
    title: "Endless.",
    quote: "Nine to nine. A daily commitment to receiving God’s perfect fullness.",
    detail: "/runners/atelier/0929-detail.webp",
    editorialHero: "/runners/atelier/0929-hero.webp",
    leadProductId: "ms-runner-chalk-navy",
    parts: ["Ivory suede", "Navy mesh", "Nub-lug sole"],
    facts: [
      "Ivory suede overlays in the Navy / Ivory colourway.",
      "Navy mesh panels in the Navy / Ivory colourway.",
      "A black nub-lug rubber sole.",
    ],
    nameReading: [
      { digit: "0", meaning: "Origin — the space before form" },
      { digit: "9", meaning: "Fullness — receiving what is complete" },
      { digit: "2", meaning: "Contrast — relationship, the human form" },
      { digit: "9", meaning: "Fullness again — nine to nine" },
    ],
    reflection: [
      "To me, 0929 represents the infinite beauty of the world: existence repeating, renewing, forever becoming.",
      "Zero is the origin—the space before form. Nine fills that space with fullness. Two introduces contrast, relationship, man and woman, the human form. Nine returns, bringing fullness again.",
      "Where nine to five marks a working day, nine to nine expresses my daily commitment to receiving God’s perfect fullness.",
      "September 29 grounds this reflection in the celebration of the archangels. For MADE SAiNT, that connection becomes a reminder to recognize the sacred within everyday existence and remain open to beauty as it unfolds.",
    ],
  },
};

export function seriesStory(series: SeriesId) {
  return SERIES_STORIES[series];
}

/** Lead colourway uses approved series parts; other colourways use their own materials only. */
export function breakdownForProduct(
  story: SeriesStory,
  productId: string,
  materials: string[],
  colourwayName: string,
) {
  if (productId === story.leadProductId) {
    return { parts: story.parts, facts: story.facts, leadName: colourwayName };
  }
  const parts = materials.slice(0, 3);
  return {
    parts,
    facts: parts.map((part) => `${part} in the ${colourwayName} colourway.`),
    leadName: colourwayName,
  };
}

