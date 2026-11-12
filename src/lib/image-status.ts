/** Honest image status for wardrobe boards and product photographs. */

export type ImageStatus = "physical" | "study" | "proposed" | "pending";

export const IMAGE_STATUS_LABEL: Record<ImageStatus, string> = {
  physical: "Physical sample",
  study: "Design preview",
  proposed: "Proposed · not approved",
  pending: "Image pending",
};

/** Short mark for overlays and dense lists. */
export const IMAGE_STATUS_MARK: Record<ImageStatus, string> = {
  physical: "Sample",
  study: "Design preview",
  proposed: "Proposed",
  pending: "Pending",
};

/**
 * Derive status from a wardrobe register note.
 * Default to study when there is a photograph — most boards are design previews.
 */
export function statusFromNote(note?: string, hasImage = true): ImageStatus {
  const text = (note ?? "").toLowerCase();
  if (!hasImage || /image match pending|no verified/.test(text)) return "pending";
  if (/proposed,\s*not approved|a proposed sample|production approval pending/.test(text)) return "proposed";
  if (/\bphysical sample\b/.test(text) && !/not a physical sample/.test(text)) return "physical";
  if (/not a physical sample|reconstruction|campaign look|not a factory sample|design board|product board|technical (?:fashion )?board|standing in|artwork/.test(text)) {
    return "study";
  }
  if (/exact (?:supplied|original) product|original product (?:image|asset)/.test(text)) return "study";
  return hasImage ? "study" : "pending";
}

/** Runner PDPs: photographs shown as design previews until a physical sample is confirmed. */
export function runnerImageStatus(): ImageStatus {
  return "study";
}

export function runnerStatusCopy() {
  return {
    mark: "Design preview",
    line: "Send your preferred size and colour. We will confirm availability, price and delivery before you order.",
  };
}
