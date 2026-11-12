/** Photographic guidance kept for galleries — not a homepage manifesto. */

export const HOUSE_EYE = {
  kicker: "The house eye",
  title: "Read the cloth clearly.",
  lede: "Full looks establish the day. Close frames show the material. A design-preview mark means the photograph is a visualization.",
  principles: [
    {
      n: "01",
      title: "Underlit when it helps",
      body: "Side light and a quiet ground when the stitch and the hand of the material need to hold.",
    },
    {
      n: "02",
      title: "Detail with purpose",
      body: "A crop of the collar, sole edge, or welt is shown only when it clarifies the piece.",
    },
    {
      n: "03",
      title: "Preview before sale",
      body: "Full looks establish the day. Close frames show the cloth. Design preview means the photograph is a visualization.",
    },
  ],
  closing: "MADE SAiNT. Once sinner. Made Saint.",
} as const;

export type DetailCrop = {
  src: string;
  alt: string;
  label: string;
  crop: string;
};

/** Detail crops for product galleries — existing Made Saint assets. */
export const HOUSE_DETAIL_CROPS: DetailCrop[] = [
  {
    src: "/opening/butter-hand.webp",
    alt: "Butter leather runner held in hand — panel edge and colour",
    label: "Hand crop",
    crop: "object-[center_40%] scale-[1.35]",
  },
  {
    src: "/runners/navy-ivory-detail.webp",
    alt: "Navy / Ivory runner — wave panel and sole edge",
    label: "Sole & wave",
    crop: "object-center scale-[1.2]",
  },
  {
    src: "/editorial/saint-michael-back.webp",
    alt: "Saint Michael jacket back — artwork and shoulder line",
    label: "Shoulder & back",
    crop: "object-[center_20%] scale-[1.45]",
  },
  {
    src: "/opening/mesh-rose-plinth.webp",
    alt: "Rose mesh runner beside its sole — perforated panel",
    label: "Mesh",
    crop: "object-[center_55%] scale-[1.3]",
  },
];
