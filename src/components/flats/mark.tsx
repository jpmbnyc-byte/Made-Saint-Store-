import { lightness, mix } from "@/lib/color";
import { INK } from "./textures";

/** The M side mark, same geometry as public/brand/m-mark.svg (local units, before skew). */
export const M_PATH = "M58 204 L104 66 Q116 32 140 60 L232 168 Q250 188 268 168 L360 60 Q384 32 396 66 L442 204";
const OUTER = 54;
const INNER = 14;

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
  return lightness(overlay) > 0.72
    ? { fill: mix(overlay, "#000000", 0.09), keyline: mix(overlay, "#000000", 0.22) }
    : { fill: mix(overlay, "#ffffff", 0.17), keyline: mix(overlay, "#000000", 0.3) };
}

/** Inline M with a keyline border; the channel shows the panel underneath. */
export function MMark({ uid, placement, tone, clip }: { uid: string; placement: MarkPlacement; tone: MarkTone; clip?: string }) {
  const { tx, ty, sx, sy, lean } = placement;
  const id = `${uid}-m-${placement.id}`;
  const k = 3.2 / Math.min(sx, sy);
  const e = 1.4 / Math.min(sx, sy);
  const layer = (key: string, outer: number, inner: number, fill: string) => (
    <>
      <mask id={`${id}-${key}`} maskUnits="userSpaceOnUse" x="-200" y="-100" width="1000" height="440">
        <path d={M_PATH} fill="none" stroke="#fff" strokeWidth={outer} strokeLinecap="round" strokeLinejoin="round" />
        <path d={M_PATH} fill="none" stroke="#000" strokeWidth={inner} strokeLinecap="round" strokeLinejoin="round" />
      </mask>
      <rect x="-200" y="-100" width="1000" height="440" fill={fill} mask={`url(#${id}-${key})`} />
    </>
  );
  return (
    <g clipPath={clip ? `url(#${clip})` : undefined}>
      <g transform={`translate(${tx} ${ty}) skewX(${lean}) scale(${sx} ${sy})`}>
        {layer("ink", OUTER + 2 * k + e, Math.max(1, INNER - e), INK)}
        {layer("key", OUTER + 2 * k, INNER, tone.keyline)}
        {layer("fill", OUTER, INNER + k, tone.fill)}
      </g>
    </g>
  );
}
