/**
 * Geography and Campaign 002 editorial plates.
 *
 * Two different São Roques:
 * - São Roque, São Miguel, Azores — campaign setting (atmosphere behind looks)
 * - São Roque, Oliveira de Azeméis — prospective mainland workshop (not editorial)
 *
 * Location references are backgrounds for outfits only — never standalone travel frames.
 */

export type LookPlate = {
  id: string;
  lookSrc: string;
  lookAlt: string;
  lookName: string;
  pieces: string;
  href: string;
  /** Quiet setting atmosphere behind the look — not a travel photo. */
  settingSrc?: string;
  settingAlt?: string;
  settingCredit?: string;
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
  body: "The collection worn in Atlantic light — looks first, place as atmosphere.",
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

/**
 * Fashion plates for Campaign 002.
 * Each plate is a complete look. Optional settingSrc is atmosphere only.
 */
export const AZORES_LOOKS: LookPlate[] = [
  {
    id: "malik-coast",
    lookSrc: "/collection/malik-coast.webp",
    lookAlt: "Malik in a mauve overshirt with a yellow suede sling",
    lookName: "Malik",
    pieces: "Mauve overshirt · yellow sling",
    href: "/line/lookbook",
    settingSrc: "/world/azores/praia-sao-roque.webp",
    settingAlt: "",
    settingCredit: "Setting: Praia de São Roque · Mariana Fernandes · CC BY-SA 4.0",
  },
  {
    id: "camel",
    lookSrc: "/collection/camel.webp",
    lookAlt: "Solène in a camel zip jacket and trouser with bronze 1101 runners",
    lookName: "Solène",
    pieces: "Camel zip set · 1101 Bronze",
    href: "/line/looks/camel",
    settingSrc: "/world/azores/igreja-sao-roque.webp",
    settingAlt: "",
    settingCredit: "Setting: Igreja de São Roque · Kritzolina · CC BY-SA 4.0",
  },
  {
    id: "forerunner",
    lookSrc: "/collection/forerunner.webp",
    lookAlt: "Inès in the camel Saint John jacket, the back print facing the camera",
    lookName: "Inès",
    pieces: "Saint John jacket",
    href: "/line/looks/forerunner",
    settingSrc: "/world/azores/fenais-coast.webp",
    settingAlt: "",
    settingCredit: "Setting: Fenais da Luz · Jules Verne Times Two · CC BY-SA 4.0",
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
];

export const AZORES_DETAIL = {
  src: "/runners/navy-ivory-detail.webp",
  alt: "Navy and ivory runner — wave panel and sole edge",
  title: "0929 Navy / Ivory",
  href: "/shop#0929",
} as const;

export function campaign002Ready() {
  return CAMPAIGN_002.published;
}

export function workshopChapterReady() {
  return WORKSHOP_CHAPTER.published;
}
