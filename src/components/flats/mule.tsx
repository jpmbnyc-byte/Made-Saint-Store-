import { useId } from "react";
import { STYLES } from "@/lib/collection";
import { mix } from "@/lib/color";
import { INK, Pattern, cr, type Pt } from "./textures";

type Props = { colors: Record<string, string>; view: "lateral" | "top"; paper?: string; className?: string };

/* Geometry from ms-tm01/generate.py (Rev B), mirrored so the toe points right like the runner. */
const W = 320;
const mx = (pts: Pt[], w = W) => pts.map(([x, y]) => [w - x, y] as Pt);

const SOLE_PTS = mx([[12, 58], [6, 76], [6, 98], [16, 112], [34, 124], [52, 131], [120, 134], [200, 135], [268, 137], [292, 132], [306, 120], [314, 102], [312, 78], [304, 68], [288, 72], [264, 84], [236, 84], [208, 74], [180, 70], [152, 75], [124, 86], [96, 91], [72, 86], [48, 78], [28, 70]]);
const UPPER_PTS = mx([[28, 56], [56, 50], [88, 42], [112, 32], [132, 26], [146, 22], [178, 22], [194, 34], [214, 48], [238, 56], [266, 60], [290, 54], [302, 50], [296, 78], [270, 92], [244, 94], [216, 84], [188, 78], [160, 82], [132, 94], [104, 100], [80, 94], [56, 86], [36, 76], [28, 70]]);
const BITE = mx([[28, 68], [48, 76], [72, 86], [96, 91], [124, 86], [152, 75], [180, 70], [208, 74], [236, 84], [264, 84], [288, 72], [304, 66]]);
const COLLAR = mx([[178, 24], [194, 36], [214, 48], [244, 58], [276, 58], [298, 52]]);

const PW = 334;
const PLAN_SOLE = mx([[18, -10], [16, 0], [18, 10], [28, 40], [52, 68], [96, 88], [160, 98], [220, 94], [268, 76], [298, 48], [314, 20], [318, 0], [314, -20], [298, -48], [268, -76], [220, -94], [160, -98], [96, -88], [52, -68], [28, -40]], PW);
const PLAN_UPPER = mx([[44, -8], [42, 0], [44, 8], [56, 28], [84, 50], [130, 66], [190, 70], [236, 60], [266, 40], [284, 16], [286, 0], [284, -16], [266, -40], [236, -60], [190, -70], [130, -66], [84, -50], [56, -28]], PW);
const OPENING = mx([[176, -52], [230, -60], [272, -36], [286, 0], [272, 36], [230, 60], [176, 52], [164, 0]], PW);

function Defs({ uid, colors }: { uid: string; colors: Record<string, string> }) {
  return (
    <defs>
      {STYLES.mule.components.map((c) => (
        <Pattern key={c.id} id={`${uid}-${c.id}`} texture={c.texture === "print" ? "jersey" : c.texture} hex={colors[c.id]} />
      ))}
    </defs>
  );
}

function Tab({ x, y, w, h, colors, uid }: { x: number; y: number; w: number; h: number; colors: Record<string, string>; uid: string }) {
  const ink = mix(colors.tab, "#000000", 0.45);
  const s = Math.min(w, h) * 0.42;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2.2" fill={`url(#${uid}-tab)`} stroke={INK} strokeWidth="0.7" />
      <rect x={x + 1.6} y={y + 1.6} width={w - 3.2} height={h - 3.2} rx="1.4" fill="none" stroke={ink} strokeWidth="0.35" strokeDasharray="1 0.8" />
      <g fill={ink} fontFamily="Arial, sans-serif" fontWeight="700" textAnchor="middle">
        <text x={x + w / 2} y={y + h * 0.42} fontSize={s * 0.38} letterSpacing="0.6">MADE</text>
        <text x={x + w / 2} y={y + h * 0.42 + s * 0.5} fontSize={s * 0.46} letterSpacing="0.4">SAiNT</text>
      </g>
    </g>
  );
}

function Lateral({ uid, colors, paper }: { uid: string; colors: Record<string, string>; paper: string }) {
  const upper = cr(UPPER_PTS, true);
  return (
    <svg viewBox="-4 -2 328 150" role="img" aria-label="Trail Mule, lateral view">
      <Defs uid={uid} colors={colors} />
      <clipPath id={`${uid}-clip`}>
        <path d={upper} />
      </clipPath>
      <rect x="-4" y="-2" width="328" height="150" fill={paper} />
      <ellipse cx="160" cy="139" rx="150" ry="4" fill="#000" opacity="0.08" />
      <path d={cr(SOLE_PTS, true)} fill={`url(#${uid}-outsole)`} stroke={INK} strokeWidth="0.9" />
      {Array.from({ length: 15 }, (_, i) => W - (46 + i * 17) - 3.4).map((x) => (
        <rect key={x} x={x} y="118" width="3.4" height="22" fill={paper} />
      ))}
      <path d={upper} fill={`url(#${uid}-shell)`} stroke={INK} strokeWidth="0.85" />
      <g clipPath={`url(#${uid}-clip)`} stroke={colors.grid} strokeWidth="0.5" opacity="0.9">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="10" y1={16 + i * 12} x2="290" y2={16 + i * 12} />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <line key={`v${i}`} x1={W - (36 + i * 14)} y1="10" x2={W - (36 + i * 14)} y2="96" />
        ))}
      </g>
      <path d={cr(COLLAR)} fill="none" stroke={`url(#${uid}-lining)`} strokeWidth="5" transform="translate(0 4)" />
      <path d={cr(BITE)} fill="none" stroke={INK} strokeWidth="0.9" />
      <path d={cr(COLLAR)} fill="none" stroke={INK} strokeWidth="0.7" />
      <path d={cr(COLLAR.map(([x, y]) => [x, y + 8] as Pt))} fill="none" stroke={INK} strokeWidth="0.45" opacity="0.6" />
      <Tab x={W - 146 - 32} y={4} w={32} h={22} colors={colors} uid={uid} />
    </svg>
  );
}

function Top({ uid, colors, paper }: { uid: string; colors: Record<string, string>; paper: string }) {
  const upper = cr(PLAN_UPPER, true);
  return (
    <svg viewBox="0 -108 334 216" role="img" aria-label="Trail Mule, top view">
      <Defs uid={uid} colors={colors} />
      <clipPath id={`${uid}-tclip`}>
        <path d={upper} />
      </clipPath>
      <rect x="0" y="-108" width="334" height="216" fill={paper} />
      <path d={cr(PLAN_SOLE, true)} fill={`url(#${uid}-outsole)`} stroke={INK} strokeWidth="0.8" />
      <path d={upper} fill={`url(#${uid}-shell)`} stroke={INK} strokeWidth="0.7" />
      <g clipPath={`url(#${uid}-tclip)`} stroke={colors.grid} strokeWidth="0.5" opacity="0.9">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="40" y1={(i - 3) * 14} x2="296" y2={(i - 3) * 14} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={PW - (40 + i * 16)} y1="-60" x2={PW - (40 + i * 16)} y2="60" />
        ))}
      </g>
      <path d={cr(OPENING, true)} fill={`url(#${uid}-footbed)`} stroke={`url(#${uid}-lining)`} strokeWidth="7" />
      <path d={cr(OPENING, true)} fill="none" stroke={INK} strokeWidth="0.7" />
      <text x={PW - 228} y="3" textAnchor="middle" fontSize="7" letterSpacing="1.2" fill={mix(colors.footbed, colors.lining, 0.7)} fontFamily="Georgia, serif">
        MADE SAiNT
      </text>
      <Tab x={PW - 138 - 36} y={-9} w={36} h={18} colors={colors} uid={uid} />
    </svg>
  );
}

export function MuleFlat({ colors, view, paper = "#f4f0e6", className }: Props) {
  const uid = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return <div className={className}>{view === "lateral" ? <Lateral uid={uid} colors={colors} paper={paper} /> : <Top uid={uid} colors={colors} paper={paper} />}</div>;
}
