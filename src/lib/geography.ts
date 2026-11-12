/**
 * Geography and campaign frames for the Portugal / Azores plan.
 *
 * Two different São Roques:
 * - São Roque, São Miguel, Azores (Ponta Delgada coastal parish) — Campaign 002 setting
 * - São Roque, Oliveira de Azeméis — prospective mainland workshop (not editorial)
 */

export type FrameKind =
  | "landscape"
  | "arrival"
  | "person"
  | "look"
  | "detail"
  | "context"
  | "maker"
  | "invite";

export type CampaignFrame = {
  id: string;
  kind: FrameKind;
  src: string;
  alt: string;
  title: string;
  caption: string;
  locationLabel: string;
  href?: string;
  /** Prefer wide editorial frames for landscape; keep small refs constrained in UI. */
  wide?: boolean;
  /** Tiny or rights-limited refs should not dominate the first viewport. */
  constrained?: boolean;
  credit?: string;
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
  body: "Atlantic light. Volcanic stone. Sacred architecture and everyday life. The collection belongs in this world.",
  sequenceLine: "Landscape → person → complete look → product detail → maker → fitting invitation.",
  published: true,
  visualizationCaption: "Location reference",
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
 * Site sequence for the Azores world chapter.
 * Accurately located frames are captioned as São Miguel.
 * Unverified towns stay “location reference” without an Azores claim.
 * Workshop remains prospective — no partnership claim.
 */
export const AZORES_SEQUENCE: CampaignFrame[] = [
  {
    id: "landscape-praia",
    kind: "landscape",
    src: "/world/azores/praia-sao-roque.webp",
    alt: "Atlantic beach and volcanic rock at Praia de São Roque, São Miguel, Azores",
    title: "Atlantic coastline",
    caption: "Space and movement — the widest campaign frames.",
    locationLabel: "Praia de São Roque, São Miguel, Azores",
    wide: true,
    credit: "Photo Mariana Fernandes · CC BY-SA 4.0",
  },
  {
    id: "landscape-fenais",
    kind: "landscape",
    src: "/world/azores/fenais-coast.webp",
    alt: "Clifftop Atlantic coastline at Fenais da Luz, São Miguel, Azores",
    title: "Volcanic coast",
    caption: "Coastal light and open ground for full looks.",
    locationLabel: "Fenais da Luz, São Miguel, Azores",
    wide: true,
    credit: "Photo Jules Verne Times Two · CC BY-SA 4.0",
  },
  {
    id: "arrival-garden",
    kind: "arrival",
    src: "/world/azores/garden-entrance.webp",
    alt: "Garden gate framed by ivy pillars and a cobbled crest",
    title: "Garden entrance",
    caption: "Arrival and discovery — an opening frame before a look.",
    locationLabel: "Location reference · garden entrance",
    constrained: true,
  },
  {
    id: "architecture-igreja",
    kind: "person",
    src: "/world/azores/igreja-sao-roque.webp",
    alt: "Igreja de São Roque above the coastal road in São Roque, Ponta Delgada",
    title: "Sacred architecture",
    caption: "Presence without costume — architecture for full-length frames.",
    locationLabel: "Igreja de São Roque, São Roque, Ponta Delgada, São Miguel",
    credit: "Photo Kritzolina · CC BY-SA 4.0",
  },
  {
    id: "person-ease",
    kind: "person",
    src: "/world/azores/blue-tiled-church.webp",
    alt: "A walker with a pack passing a blue-tiled church facade",
    title: "Life continues",
    caption: "Architecture has presence; a person walks past. Bring that ease into the cast.",
    locationLabel: "Location reference · tiled facade and walker",
  },
  {
    id: "context-procession",
    kind: "context",
    src: "/world/azores/procession.webp",
    alt: "A religious procession carried through a sunlit street, documented with respect",
    title: "Devotion and community",
    caption: "Documentary cultural context for the House story — not a fashion set, and not claimed as São Roque.",
    locationLabel: "Location reference · procession",
    wide: true,
  },
  {
    id: "look-malik",
    kind: "look",
    src: "/collection/malik-coast.webp",
    alt: "Malik at the coast in a mauve overshirt with a yellow suede sling",
    title: "Complete look",
    caption: "The cast, worn with ease — walking, pausing, carrying the bag.",
    locationLabel: "Campaign look · coast",
    href: "/line/lookbook",
  },
  {
    id: "look-camel",
    kind: "look",
    src: "/collection/camel.webp",
    alt: "Solène in a camel zip jacket and trouser with bronze 1101 runners",
    title: "Complete look",
    caption: "Clothes at home in light, stone, and quiet streets.",
    locationLabel: "Campaign look",
    href: "/line/looks/camel",
  },
  {
    id: "detail-runner",
    kind: "detail",
    src: "/runners/navy-ivory-detail.webp",
    alt: "Navy and ivory runner — wave panel and sole edge",
    title: "Product detail",
    caption: "After the world and the look — the pair, clear and accurate.",
    locationLabel: "Design preview · 0929 Navy / Ivory",
    href: "/shop#0929",
  },
  {
    id: "maker-workshop",
    kind: "maker",
    src: "/world/azores/workshop-gate.webp",
    alt: "White workshop gate with a Portuguese shoemaker emblem and a black cat",
    title: "Workshop",
    caption: "Tangible making — hands, materials, fitting, finishing. Separate from the Azores chapter.",
    locationLabel: "Prospective reference · São Roque, Oliveira de Azeméis",
    constrained: true,
  },
];

export function campaign002Ready() {
  return CAMPAIGN_002.published;
}

export function workshopChapterReady() {
  return WORKSHOP_CHAPTER.published;
}

export function azoresLandscapeFrames() {
  return AZORES_SEQUENCE.filter((frame) => frame.kind === "landscape");
}
