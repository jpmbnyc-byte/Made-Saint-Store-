import { lightness, mix } from "@/lib/color";
import { INK } from "./textures";

/** Three-peak zig-zag wave, same geometry as public/brand/m-mark.svg (local units, before skew). */
export const M_PATH =
  "M58 204 L100 66 Q112 32 136 60 L180 168 Q196 188 212 168 L256 60 Q270 32 284 60 L328 168 Q344 188 360 168 L404 60 Q418 32 432 66 L442 204";
const STROKE = 58;

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

/** Solid molded TPU wave: three peaks toward the laces, keylined, no inline channel. */
export function MMark({ uid, placement, tone, clip }: { uid: string; placement: MarkPlacement; tone?: MarkTone; clip?: string }) {
  if (!placement) return null;
  const { fill, keyline } = tone ?? tonalMark("#7f5f65");
  const { tx, ty, sx, sy, lean } = placement;
  const k = 3.2 / Math.min(sx, sy);
  const e = 1.4 / Math.min(sx, sy);
  return (
    <g clipPath={clip ? `url(#${clip})` : undefined}>
      <g transform={`translate(${tx} ${ty}) skewX(${lean}) scale(${sx} ${sy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={M_PATH} stroke={INK} strokeWidth={STROKE + 2 * k + e} />
        <path d={M_PATH} stroke={keyline} strokeWidth={STROKE + 2 * k} />
        <path d={M_PATH} stroke={fill} strokeWidth={STROKE} />
      </g>
    </g>
  );
}
