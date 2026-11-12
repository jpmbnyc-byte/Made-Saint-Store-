/**
 * Geography and campaign gates for the Portugal plan.
 *
 * Two different São Roques:
 * - São Roque, São Miguel, Azores — proposed Campaign 002 editorial setting
 * - São Roque, Oliveira de Azeméis — prospective footwear workshop town (not editorial)
 *
 * Reference JPEGs under docs/portugal-plan/references/ are internal art direction only.
 * They are not cleared commercial assets and must not be published as heroes.
 */

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
  body: "Atlantic light. Volcanic stone. The collection in São Miguel.",
  /** Flip only after approved imagery depicts this setting. */
  published: false,
  visualizationCaption: "Campaign visualization",
} as const;

export const WORKSHOP_CHAPTER = {
  id: "portuguese-making",
  eyebrow: "PORTUGUESE MAKING",
  title: "São Roque, Oliveira de Azeméis.",
  body: "Our footwear is made with Atelier Ortopédico in northern Portugal. From upper stitching to final assembly, each approved specification guides the work.",
  action: "Inside the workshop",
  /** Flip only after partnership, manufacture, and image rights are confirmed. */
  published: false,
  /** Never claim the workshop is the Azores editorial location. */
  notEditorial: true,
} as const;

export function campaign002Ready() {
  return CAMPAIGN_002.published;
}

export function workshopChapterReady() {
  return WORKSHOP_CHAPTER.published;
}
