/**
 * The 1213 runner. A sculpted-sole family, separate from the 0929.
 * 1213 is the working series name. No price is listed. Materials are not confirmed.
 * Each colorway uses only the photograph supplied for it.
 */

export type RangeView = {
  src: string;
  label: string;
  alt: string;
};

export type RangeReference = {
  src: string;
  alt: string;
  caption: string;
};

export type RangeColorway = {
  slug: string;
  name: string;
  palette: string;
  line: string;
  image: string;
  views: RangeView[];
  references?: RangeReference[];
};

const worn = "Worn study. Not a client. The bag is a styling reference. It is not included, and it is not for sale.";

export const RANGE_1213: RangeColorway[] = [
  {
    slug: "espresso",
    name: "MADE SAiNT 1213 Runner — Espresso",
    palette: "Chocolate / Taupe / Sand",
    line: "A deep chocolate upper, taupe accents, cream laces, and a warm sand sole.",
    image: "/runners/1213/espresso.webp",
    views: [
      { src: "/runners/1213/espresso.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Espresso, three-quarter" },
    ],
  },
  {
    slug: "olive",
    name: "MADE SAiNT 1213 Runner — Olive",
    palette: "Olive / Sage / Ivory",
    line: "Open olive mesh, sage overlays, and an ivory signature.",
    image: "/runners/1213/olive.webp",
    views: [
      { src: "/runners/1213/olive.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Olive, three-quarter" },
    ],
  },
  {
    slug: "mineral-blue",
    name: "MADE SAiNT 1213 Runner — Mineral Blue",
    palette: "Mineral Blue / Mist / Ivory",
    line: "Tonal blues, a pale signature, an ivory sole, and a muted red heel accent.",
    image: "/runners/1213/mineral-blue.webp",
    views: [
      { src: "/runners/1213/mineral-blue.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Mineral Blue, three-quarter" },
    ],
  },
  {
    slug: "midnight",
    name: "MADE SAiNT 1213 Runner — Midnight",
    palette: "Navy / Ice Blue / Ivory",
    line: "Deep navy overlays, pale blue panels, an ivory sole, and a gum-colored tread.",
    image: "/runners/1213/midnight.webp",
    views: [
      { src: "/runners/1213/midnight.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Midnight, three-quarter" },
    ],
  },
  {
    slug: "chestnut",
    name: "MADE SAiNT 1213 Runner — Chestnut",
    palette: "Chestnut / Chocolate / Charcoal",
    line: "Chestnut overlays and dark chocolate panels above a sculpted charcoal sole.",
    image: "/runners/1213/chestnut.webp",
    views: [
      { src: "/runners/1213/chestnut.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Chestnut, three-quarter" },
    ],
  },
  {
    slug: "sacred-light",
    name: "MADE SAiNT 1213 Runner — Sacred Light",
    palette: "Deep Plum / Pale Gold / Ivory",
    line: "Deep plum and pale gold, with a sculpted ivory sole. An angel is printed on the insole.",
    image: "/runners/1213/sacred-light.webp",
    views: [
      { src: "/runners/1213/sacred-light.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Sacred Light, three-quarter" },
      { src: "/runners/1213/sacred-light-profile.webp", label: "Profile", alt: "MADE SAiNT 1213 Runner — Sacred Light, profile" },
      { src: "/runners/1213/sacred-light-overhead.webp", label: "Overhead", alt: "MADE SAiNT 1213 Runner — Sacred Light, overhead" },
      { src: "/runners/1213/sacred-light-rear.webp", label: "Rear", alt: "MADE SAiNT 1213 Runner — Sacred Light, rear" },
      { src: "/runners/1213/sacred-light-worn-plum.webp", label: "Worn, plum", alt: `MADE SAiNT 1213 Runner — Sacred Light, worn with a plum bag. ${worn}` },
      { src: "/runners/1213/sacred-light-worn-butter.webp", label: "Worn, butter", alt: `MADE SAiNT 1213 Runner — Sacred Light, worn with a butter bag. ${worn}` },
    ],
    references: [
      {
        src: "/runners/1213/shoulder-bag-plum.webp",
        alt: "A plum shoulder bag, shown as a styling reference",
        caption: "A plum shoulder bag. A styling reference. Not included with the pair, and not for sale.",
      },
      {
        src: "/runners/1213/tongue-wallet.webp",
        alt: "A lace-on tongue wallet shown beside the Sacred Light runner",
        caption: "A lace-on tongue wallet, shown beside the runner. Not included, and not for sale.",
      },
    ],
  },
  {
    slug: "graphite",
    name: "MADE SAiNT 1213 Runner — Graphite",
    palette: "Black / Graphite / Pewter",
    line: "Black mesh, graphite overlays, pewter accents, and a dark sculpted sole.",
    image: "/runners/1213/graphite.webp",
    views: [
      { src: "/runners/1213/graphite.webp", label: "Three-quarter", alt: "MADE SAiNT 1213 Runner — Graphite, three-quarter" },
    ],
  },
];

export const rangeBySlug = (slug: string) => RANGE_1213.find((colorway) => colorway.slug === slug);

export const colorName = (name: string) => name.split("—").pop()?.trim() || name;
