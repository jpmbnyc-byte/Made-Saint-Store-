import { mix } from "@/lib/color";
import type { Texture } from "@/lib/collection";

export type Pt = readonly [number, number];

/** Closed or open Catmull-Rom spline through the points, as an SVG path. */
export function cr(pts: readonly Pt[], closed = false): string {
  const n = pts.length;
  if (n < 2) return "";
  const at = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return closed ? d + " Z" : d;
}

const dark = (hex: string, t: number) => mix(hex, "#000000", t);
const light = (hex: string, t: number) => mix(hex, "#ffffff", t);

/** Deterministic speckle so suede reads as napped without a noise filter. */
const SPECKS = Array.from({ length: 46 }, (_, i) => {
  const r = Math.sin(i * 12.9898) * 43758.5453;
  const s = Math.sin(i * 78.233) * 12345.6789;
  return [((r - Math.floor(r)) * 14).toFixed(2), ((s - Math.floor(s)) * 14).toFixed(2), i % 3] as const;
});

export function Pattern({ id, texture, hex, accent, extra }: { id: string; texture: Texture; hex: string; accent?: string; extra?: string }) {
  switch (texture) {
    case "suede":
      return (
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={hex} />
          {SPECKS.map(([x, y, k], i) => (
            <circle key={i} cx={x} cy={y} r={k === 0 ? 0.55 : 0.4} fill={k === 1 ? light(hex, 0.16) : dark(hex, 0.14)} opacity={0.75} />
          ))}
        </pattern>
      );
    case "mesh":
      return (
        <pattern id={id} width="6" height="5.2" patternUnits="userSpaceOnUse">
          <rect width="6" height="5.2" fill={hex} />
          <circle cx="1.5" cy="1.3" r="1.05" fill={dark(hex, 0.22)} />
          <circle cx="4.5" cy="3.9" r="1.05" fill={dark(hex, 0.22)} />
        </pattern>
      );
    case "knit":
      return (
        <pattern id={id} width="5" height="4" patternUnits="userSpaceOnUse">
          <rect width="5" height="4" fill={hex} />
          <path d="M0 1 L2.5 3 L5 1" fill="none" stroke={dark(hex, 0.16)} strokeWidth="0.7" />
        </pattern>
      );
    case "jersey":
      return (
        <pattern id={id} width="4" height="2.4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2.4" fill={hex} />
          <line x1="0" y1="0.6" x2="4" y2="0.6" stroke={dark(hex, 0.08)} strokeWidth="0.5" />
        </pattern>
      );
    case "ripstop":
      return (
        <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill={hex} />
          <path d="M0 0.4 H7 M0.4 0 V7" stroke={dark(hex, 0.12)} strokeWidth="0.45" />
        </pattern>
      );
    case "smooth":
      return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light(hex, 0.18)} />
          <stop offset="0.55" stopColor={hex} />
          <stop offset="1" stopColor={dark(hex, 0.12)} />
        </linearGradient>
      );
    case "rubber":
      return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light(hex, 0.06)} />
          <stop offset="1" stopColor={dark(hex, 0.1)} />
        </linearGradient>
      );
    case "print":
      // Tattersall: accent lines over a ground line on the base color.
      return (
        <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill={hex} />
          <path d="M0 2 H9 M2 0 V9" stroke={extra ?? "#ffffff"} strokeWidth="0.55" opacity="0.85" />
          <path d="M0 6.5 H9 M6.5 0 V9" stroke={accent ?? "#c8383a"} strokeWidth="0.55" />
        </pattern>
      );
    default:
      return (
        <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill={hex} />
        </pattern>
      );
  }
}

export const INK = "#22201d";
