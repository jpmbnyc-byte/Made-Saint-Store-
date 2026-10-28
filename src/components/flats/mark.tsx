import { INK } from "./textures";

/** The M side mark, same geometry as public/brand/m-mark.svg (local units, before skew). */
export const M_PATH = "M58 204 L104 66 Q116 32 140 60 L232 168 Q250 188 268 168 L360 60 Q384 32 396 66 L442 204";
const OUTER = 54;
const INNER = 14;
const EDGE = 2.4;

export type MarkPlacementId = "window" | "quarter" | "full" | "heel";

export type MarkPlacement = {
  id: MarkPlacementId;
  name: string;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  lean: number;
};

/** Placements on the runner lateral flat (600 × 262, toe right). */
export const MARK_PLACEMENTS: Record<MarkPlacementId, MarkPlacement> = {
  window: { id: "window", name: "Mesh window", tx: 196, ty: 134, sx: 0.2, sy: 0.24, lean: -14 },
  quarter: { id: "quarter", name: "Quarter sweep", tx: 132, ty: 130.6, sx: 0.38, sy: 0.285, lean: -20 },
  full: { id: "full", name: "Full length", tx: 86, ty: 113, sx: 0.98, sy: 0.36, lean: -14 },
  heel: { id: "heel", name: "Heel counter", tx: 58, ty: 128, sx: 0.15, sy: 0.2, lean: -14 },
};

/** Inline double-line M: an ink edge, then the film colour, with the channel showing the panel underneath. */
export function MMark({ uid, placement, color, clip }: { uid: string; placement: MarkPlacement; color: string; clip?: string }) {
  const { tx, ty, sx, sy, lean } = placement;
  const id = `${uid}-m-${placement.id}`;
  const mask = (key: string, outer: number, inner: number) => (
    <mask id={`${id}-${key}`} maskUnits="userSpaceOnUse" x="-200" y="-100" width="1000" height="440">
      <path d={M_PATH} fill="none" stroke="#fff" strokeWidth={outer} strokeLinecap="round" strokeLinejoin="round" />
      <path d={M_PATH} fill="none" stroke="#000" strokeWidth={inner} strokeLinecap="round" strokeLinejoin="round" />
    </mask>
  );
  return (
    <g clipPath={clip ? `url(#${clip})` : undefined}>
      <g transform={`translate(${tx} ${ty}) skewX(${lean}) scale(${sx} ${sy})`}>
        <defs>
          {mask("edge", OUTER + EDGE / Math.min(sx, sy), INNER - EDGE / Math.min(sx, sy))}
          {mask("fill", OUTER, INNER)}
        </defs>
        <rect x="-200" y="-100" width="1000" height="440" fill={INK} mask={`url(#${id}-edge)`} />
        <rect x="-200" y="-100" width="1000" height="440" fill={color} mask={`url(#${id}-fill)`} />
      </g>
    </g>
  );
}
