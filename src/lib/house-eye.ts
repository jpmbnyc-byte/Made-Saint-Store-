/** Sitewide photographic doctrine — Made Saint's reading of cloth, not another house's campaign. */

export const HOUSE_EYE = {
  kicker: "The house eye",
  title: "Read the cloth in low light.",
  lede:
    "We photograph for the make, not the theatre. Scenes stay deliberately underlit so the shoulder, the stitch, and the hand of the material hold. Detail crops are tests — not decoration.",
  principles: [
    {
      n: "01",
      title: "Underlit on purpose",
      body: "Side light and a dark ground. Shadow is allowed to keep what is unfinished in the dark, and what is built in the light.",
    },
    {
      n: "02",
      title: "Detail as proof",
      body: "A crop of the collar, sole edge, or welt is a construction check. If the crop cannot stand alone, the piece is not ready to show.",
    },
    {
      n: "03",
      title: "Study before sale",
      body: "Full looks establish the day. Close frames verify the cloth. A study mark means the photograph is a reference — not a hand sample in hand.",
    },
  ],
  closing:
    "MADE SAiNT. Once sinner. Made Saint. The eye belongs to the house; the clothes still have to earn it.",
} as const;

export type DetailCrop = {
  src: string;
  alt: string;
  label: string;
  crop: string;
};

/** Sitewide detail crops — existing Made Saint assets, framed as construction tests. */
export const HOUSE_DETAIL_CROPS: DetailCrop[] = [
  {
    src: "/opening/butter-hand.webp",
    alt: "Butter leather runner held in hand — panel edge and colour under low light",
    label: "Hand crop",
    crop: "object-[center_40%] scale-[1.35]",
  },
  {
    src: "/runners/navy-ivory-detail.webp",
    alt: "Navy / Ivory runner — wave panel and sole edge as a construction crop",
    label: "Sole & wave",
    crop: "object-center scale-[1.2]",
  },
  {
    src: "/editorial/saint-michael-back.webp",
    alt: "Saint Michael jacket back — artwork and shoulder line in an underlit crop",
    label: "Shoulder & back",
    crop: "object-[center_20%] scale-[1.45]",
  },
  {
    src: "/opening/mesh-rose-plinth.webp",
    alt: "Rose mesh runner beside its sole — perforated panel under study light",
    label: "Mesh test",
    crop: "object-[center_55%] scale-[1.3]",
  },
];
