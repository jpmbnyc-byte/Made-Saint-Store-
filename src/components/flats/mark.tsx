import { lightness, mix } from "@/lib/color";

/** Retired zig-zag. Kept so older placement math still typechecks. It is not drawn. */
export const M_PATH =
  "M58 204 L100 66 Q112 32 136 60 L180 168 Q196 188 212 168 L256 60 Q270 32 284 60 L328 168 Q344 188 360 168 L404 60 Q418 32 432 66 L442 204";

export type MarkPlacementId = "midfoot" | "quarter" | "window" | "full";

export type MarkPlacement = {
  id: MarkPlacementId;
  name: string;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  lean: number;
};

/**
 * Placements on the runner lateral flat (600 × 262, heel x 44, toe x 570). Midfoot follows the 9060 rules:
 * centred at half length, top tucked against the eyestay, bottom on the lower overlay, 15° lean, over the seams.
 */
export const MARK_PLACEMENTS: Record<MarkPlacementId, MarkPlacement> = {
  midfoot: { id: "midfoot", name: "Midfoot", tx: 237.5, ty: 130.7, sx: 0.31, sy: 0.257, lean: -15 },
  quarter: { id: "quarter", name: "Quarter sweep", tx: 132, ty: 130.6, sx: 0.38, sy: 0.285, lean: -20 },
  window: { id: "window", name: "Mesh window", tx: 196, ty: 134, sx: 0.2, sy: 0.24, lean: -14 },
  full: { id: "full", name: "Full length", tx: 86, ty: 113, sx: 0.98, sy: 0.36, lean: -14 },
};

export type MarkTone = { fill: string; keyline: string };

/** Tonal treatment: the mark is the overlay colour a step lighter (or darker on pale overlays), keylined a step darker. */
export function tonalMark(overlay: string): MarkTone {
  const hex = overlay && overlay.startsWith("#") ? overlay : "#7f5f65";
  return lightness(hex) > 0.72
    ? { fill: mix(hex, "#000000", 0.09), keyline: mix(hex, "#000000", 0.22) }
    : { fill: mix(hex, "#ffffff", 0.17), keyline: mix(hex, "#000000", 0.3) };
}

/** The zig-zag side piece is not the house mark. Drawings leave it off. */
export function MMark({ placement }: { uid: string; placement: MarkPlacement; tone?: MarkTone; clip?: string }) {
  void placement;
  return null;
}
