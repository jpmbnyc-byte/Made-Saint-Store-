/**
 * Geography and Campaign 002 look register.
 *
 * São Roque, São Miguel, Azores — campaign setting (named once; not a travel gallery)
 * São Roque, Oliveira de Azeméis — prospective mainland workshop
 */

export type LookPlate = {
  id: string;
  lookSrc: string;
  lookAlt: string;
  lookName: string;
  pieces: string;
  href: string;
};

export const CAMPAIGN_001 = {
  id: "campaign-001",
  eyebrow: "CAMPAIGN 001",
  title: "Archive · Cap-Haïtien and the north",
  locationLabel: "Milot and the north coast, Haiti",
  body: "Campaign studies of Sans-Souci and the north coast. They are not documentary photographs of a house or a factory, and they are not a Portugal chapter.",
  published: true,
} as const;

export const CAMPAIGN_002 = {
  id: "campaign-002",
  eyebrow: "CAMPAIGN 002",
  title: "Once sinner. Made Saint.",
  locationLabel: "São Roque, São Miguel, Azores",
  placeDetail: "São Roque, Ponta Delgada — coastal parish on São Miguel",
  body: "The collection, worn.",
  published: true,
} as const;

export const WORKSHOP_CHAPTER = {
  id: "portuguese-making",
  eyebrow: "PORTUGUESE MAKING",
  title: "São Roque, Oliveira de Azeméis.",
  body: "Prospective footwear workshop on the mainland. Featured once partnership, manufacture, and image rights are confirmed. Not the Azores editorial setting.",
  action: "Ask about fit",
  published: false,
  notEditorial: true,
} as const;

/** Clothing look register — full looks only, no location composite plates. */
export const AZORES_LOOKS: LookPlate[] = [
  {
    id: "malik-coast",
    lookSrc: "/collection/malik-coast.webp",
    lookAlt: "Malik in a mauve overshirt with a yellow suede sling",
    lookName: "Malik",
    pieces: "Mauve overshirt · yellow sling",
    href: "/line/lookbook",
  },
  {
    id: "camel",
    lookSrc: "/collection/camel.webp",
    lookAlt: "Solène in a camel zip jacket and trouser with bronze 1101 runners",
    lookName: "Solène",
    pieces: "Camel zip set · 1101 Bronze",
    href: "/line/looks/camel",
  },
  {
    id: "forerunner",
    lookSrc: "/collection/forerunner.webp",
    lookAlt: "Inès in the camel Saint John jacket, the back print facing the camera",
    lookName: "Inès",
    pieces: "Saint John jacket",
    href: "/line/looks/forerunner",
  },
  {
    id: "sage",
    lookSrc: "/collection/sage.webp",
    lookAlt: "Ren in a sage fleece set with a pale yellow turtleneck and yellow barrel bag",
    lookName: "Ren",
    pieces: "Sage fleece set · barrel bag",
    href: "/line/looks/sage",
  },
  {
    id: "parachute",
    lookSrc: "/collection/parachute.webp",
    lookAlt: "Amara in the printed jersey with navy parachute trousers and navy 1101 runners",
    lookName: "Amara",
    pieces: "Printed jersey · navy parachute · 1101 Navy",
    href: "/line/looks/parachute",
  },
  {
    id: "solene",
    lookSrc: "/collection/solene.webp",
    lookAlt: "Solène in the printed jersey over a white shirt, navy tie, and black trousers",
    lookName: "Solène",
    pieces: "Printed jersey",
    href: "/line/looks/solene",
  },
  {
    id: "olive",
    lookSrc: "/collection/olive.webp",
    lookAlt: "Lucien in an olive zip set and olive mules",
    lookName: "Lucien",
    pieces: "Olive zip set · mule",
    href: "/line/looks/olive",
  },
  {
    id: "rust",
    lookSrc: "/collection/rust.webp",
    lookAlt: "Inès in a rust cord zip jacket and matching trousers with blush 1101 runners",
    lookName: "Inès",
    pieces: "Rust cord set · 1101 Blush",
    href: "/line/looks/rust",
  },
];

export function campaign002Ready() {
  return CAMPAIGN_002.published;
}

export function workshopChapterReady() {
  return WORKSHOP_CHAPTER.published;
}
