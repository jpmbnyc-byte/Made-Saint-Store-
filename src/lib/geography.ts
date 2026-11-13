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

/**
 * Clothing look register — Cast 003 full looks only.
 * Portrait frames (≈3:4). No landscape side-crops. No baked-in callout text.
 * Brand marks (MADE SAiNT) live on garments and runners in the photograph.
 */
export const AZORES_LOOKS: LookPlate[] = [
  {
    id: "amara-camel",
    lookSrc: "/collection/amara-camel.webp",
    lookAlt: "Amara in a camel zip set with brown mesh 1101 runners — MADE SAiNT on jacket and tongue",
    lookName: "Amara",
    pieces: "Camel zip set · 1101 Brown Mesh",
    href: "/line/looks/forerunner",
  },
  {
    id: "malik-chair",
    lookSrc: "/collection/malik.webp",
    lookAlt: "Malik seated in a navy turtleneck with MADE SAiNT at the neck and teal 1101 runners",
    lookName: "Malik",
    pieces: "Navy turtleneck · sand trouser · 1101 Teal",
    href: "/line/looks/malik",
  },
  {
    id: "camel",
    lookSrc: "/collection/camel.webp",
    lookAlt: "Lucien in a dusty rose zip set over a teal turtleneck with MADE SAiNT at the neck and brown mesh 1101 runners",
    lookName: "Lucien",
    pieces: "Dusty rose zip set · 1101 Brown Mesh",
    href: "/line/looks/camel",
  },
  {
    id: "sage",
    lookSrc: "/collection/sage.webp",
    lookAlt: "Ren in a sage zip set with a pale yellow turtleneck and brown mesh 1101 runners",
    lookName: "Ren",
    pieces: "Sage zip set · 1101 Brown Mesh",
    href: "/line/looks/sage",
  },
  {
    id: "solene",
    lookSrc: "/collection/solene.webp",
    lookAlt: "Solène in the printed jersey over a white shirt, navy tie, and charcoal trousers",
    lookName: "Solène",
    pieces: "Printed jersey",
    href: "/line/looks/solene",
  },
  {
    id: "forerunner",
    lookSrc: "/collection/forerunner.webp",
    lookAlt: "Amara in a camel zip set with brown mesh 1101 runners",
    lookName: "Amara",
    pieces: "Camel zip set · 1101 Brown Mesh",
    href: "/line/looks/forerunner",
  },
  {
    id: "olive",
    lookSrc: "/collection/lucien-terracotta.webp",
    lookAlt: "Lucien in a dusty rose zip set with brown mesh 1101 runners",
    lookName: "Lucien",
    pieces: "Dusty rose zip set · 1101 Brown Mesh",
    href: "/line/looks/camel",
  },
  {
    id: "rust",
    lookSrc: "/collection/ines-burgundy.webp",
    lookAlt: "Inès on a stool in a butter mock-neck and cream jeans with brown mesh 1101 runners",
    lookName: "Inès",
    pieces: "Butter mock-neck · 1101 Brown Mesh",
    href: "/line/looks/rust",
  },
];

export function campaign002Ready() {
  return CAMPAIGN_002.published;
}

export function workshopChapterReady() {
  return WORKSHOP_CHAPTER.published;
}
