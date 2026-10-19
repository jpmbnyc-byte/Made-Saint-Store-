"use client";

import { useId } from "react";
import { spec } from "@/lib/spec";

export type Paint = "line" | "relic" | "vesper";

const INK = "#1b1916";
const PAPER = "#f4f0e6";

const paints: Record<
  Paint,
  { upper: string; tongue: string; sole: string; stitch: string; line: string }
> = {
  line: { upper: "none", tongue: "#efeae0", sole: "none", stitch: INK, line: INK },
  relic: { upper: "#e4d7c2", tongue: "#efe4d2", sole: "#c6a36a", stitch: INK, line: INK },
  vesper: { upper: "#23211f", tongue: "#2c2a27", sole: "#2a2926", stitch: "#e6dcc8", line: INK },
};

const GROUND = 118;

type Pt = [number, number];

function smoothClosed(pts: Pt[]) {
  const n = pts.length;
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return `${d} Z`;
}

function smoothOpen(pts: Pt[]) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const topline: Pt[] = [
  [18, 100],
  [28, 90],
  [36, 82],
  [50, 78],
  [72, 76],
  [98, 77],
  [122, 80],
  [142, 86],
  [156, 93],
  [168, 84],
  [182, 72],
  [198, 60],
  [214, 50],
  [230, 42],
  [248, 36],
  [266, 32],
  [282, 31],
  [294, 36],
  [304, 48],
  [310, 64],
  [312, 80],
  [310, 94],
];

const featherPts: Pt[] = [
  [310, 94],
  [250, 98],
  [190, 102],
  [120, 102],
  [60, 101],
  [16, 100],
];

const bottomPts: Pt[] = [
  [310, 94],
  [318, 104],
  [314, 114],
  [300, 118],
  [230, 118],
  [120, 118],
  [55, 118],
  [32, 112],
  [20, 104],
  [16, 100],
];

const upperLateral = smoothClosed([...topline, ...featherPts.slice(1)]);
const upperMedial = smoothClosed([
  ...topline.map((point, index) => (index >= 10 ? [point[0], point[1] + 4] : point) as Pt),
  ...featherPts.slice(1),
]);
const solePath = smoothClosed([...[...featherPts].reverse(), ...bottomPts.slice(1)]);

const opening = smoothClosed([
  [166, 90],
  [190, 74],
  [220, 58],
  [258, 46],
  [290, 44],
  [304, 58],
  [300, 76],
  [270, 70],
  [230, 74],
  [190, 86],
]);

const halo = smoothOpen([
  [118, 102],
  [138, 90],
  [156, 82],
  [172, 88],
]);
const haloStitch = smoothOpen([
  [120, 99],
  [138, 92],
  [156, 85],
  [170, 90],
]);

const tongue = smoothClosed([
  [164, 90],
  [188, 74],
  [220, 60],
  [252, 50],
  [270, 48],
  [264, 62],
  [236, 70],
  [200, 82],
  [172, 92],
]);

const tab = smoothClosed([
  [286, 32],
  [294, 22],
  [306, 20],
  [310, 32],
  [300, 38],
  [288, 36],
]);

const eyes: Pt[] = [
  [176, 80],
  [192, 68],
  [208, 58],
  [224, 49],
  [240, 42],
  [256, 36],
];

function Hatch({ id, tone }: { id: string; tone: string }) {
  return (
    <pattern id={id} width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(42)">
      <line x1="0" y1="0" x2="0" y2="3.2" stroke={tone} strokeWidth="0.35" />
    </pattern>
  );
}

function Marker({
  x,
  y,
  n,
  active,
  onPick,
}: {
  x: number;
  y: number;
  n: number;
  active: boolean;
  onPick?: (n: number) => void;
}) {
  return (
    <g
      onClick={() => onPick?.(n)}
      style={{ cursor: onPick ? "pointer" : "default" }}
    >
      <circle cx={x} cy={y} r="5.2" fill={active ? "#8e2c28" : PAPER} stroke={INK} strokeWidth="0.45" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="5.4"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fill={active ? PAPER : INK}
      >
        {n}
      </text>
    </g>
  );
}

function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  offset,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  offset: number;
}) {
  const horizontal = Math.abs(y1 - y2) < 0.5;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g fill="none" stroke={INK} strokeWidth="0.28">
      {horizontal ? (
        <>
          <line x1={x1} y1={y1} x2={x1} y2={y1 + offset} />
          <line x1={x2} y1={y2} x2={x2} y2={y2 + offset} />
          <line x1={x1} y1={y1 + offset} x2={x2} y2={y2 + offset} />
          <line x1={x1} y1={y1 + offset - 1.4} x2={x1} y2={y1 + offset + 1.4} />
          <line x1={x2} y1={y2 + offset - 1.4} x2={x2} y2={y2 + offset + 1.4} />
          <text
            x={mx}
            y={y1 + offset - 2.2}
            fill={INK}
            stroke="none"
            fontSize="5.2"
            textAnchor="middle"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          >
            {label}
          </text>
        </>
      ) : (
        <>
          <line x1={x1} y1={y1} x2={x1 + offset} y2={y1} />
          <line x1={x2} y1={y2} x2={x2 + offset} y2={y2} />
          <line x1={x1 + offset} y1={y1} x2={x2 + offset} y2={y2} />
          <text
            x={x1 + offset + (offset > 0 ? 2 : -2)}
            y={my}
            fill={INK}
            stroke="none"
            fontSize="5.2"
            textAnchor={offset > 0 ? "start" : "end"}
            dominantBaseline="central"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
}

export function LateralShoe({
  paint = "line",
  side = "lateral",
  markers = false,
  dims = false,
  internals = false,
  active = null,
  onMarker,
}: {
  paint?: Paint;
  side?: "lateral" | "medial";
  markers?: boolean;
  dims?: boolean;
  internals?: boolean;
  active?: number | null;
  onMarker?: (n: number) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const tone = paints[paint];
  const upper = side === "lateral" ? upperLateral : upperMedial;
  const soleFill = paint === "line" ? `url(#${uid}-hatch)` : tone.sole;
  const upperFill = paint === "line" ? "#f7f3ea" : tone.upper;
  const lining = paint === "vesper" ? "#3a342e" : paint === "relic" ? "#cbbfa8" : "#e6dcc8";
  const viewBox = dims ? "0 8 360 145" : "0 12 336 118";

  return (
    <svg viewBox={viewBox} role="img" aria-label={`${side} view of MS-01 HALO, toe to the left, dimensions in millimetres`}>
      <defs>
        <Hatch id={`${uid}-hatch`} tone={paint === "vesper" ? "#3a3834" : "#b8956a"} />
      </defs>
      <line x1="0" y1={GROUND} x2="348" y2={GROUND} stroke={INK} strokeWidth="0.3" strokeDasharray="1.4 1.8" />

      <path d={solePath} fill={soleFill} stroke={tone.line} strokeWidth="1.15" strokeLinejoin="round" />
      <path d="M 48 110 L 292 110" fill="none" stroke={tone.line} strokeWidth="0.4" />
      <path d={upper} fill={upperFill} stroke={tone.line} strokeWidth="1.2" strokeLinejoin="round" />
      <path d={opening} fill={lining} stroke="none" />
      <path d={tongue} fill={tone.tongue} stroke={tone.line} strokeWidth="0.7" />
      <path d={tab} fill={upperFill} stroke={tone.line} strokeWidth="0.8" />
      <circle cx="300" cy="28" r="2.6" fill="none" stroke={tone.stitch} strokeWidth="0.5" />
      <path d="M 306 40 L 308 94" fill="none" stroke={tone.line} strokeWidth="0.4" />

      <path d={halo} fill="none" stroke={tone.line} strokeWidth="0.85" />
      <path d={haloStitch} fill="none" stroke={tone.stitch} strokeWidth="0.65" strokeDasharray="2 1.15" />

      {eyes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3.1" fill={upperFill} stroke={tone.line} strokeWidth="0.55" />
          <circle cx={x} cy={y} r="1.15" fill={tone.line} />
        </g>
      ))}
      <path
        d={eyes.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y + (i % 2 ? 1.4 : -1.4)}`).join(" ")}
        fill="none"
        stroke={tone.stitch}
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 256 36 L 248 50 M 256 36 L 266 50"
        fill="none"
        stroke={tone.stitch}
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {internals && (
        <g fill="none" stroke={INK} strokeWidth="0.4" strokeDasharray="1.5 1.15">
          <path d="M 24 96 C 36 84 54 74 78 70 C 62 82 42 92 26 98" />
          <path d="M 250 96 C 268 80 288 70 304 74 C 308 84 310 92 308 98" />
          <path d="M 36 90 C 90 92 160 92 230 88 C 270 84 296 80 304 76" />
        </g>
      )}

      {dims && (
        <g>
          <Dim x1={16} y1={GROUND} x2={316} y2={GROUND} label={`${spec.dims.overallLength}`} offset={14} />
          <Dim x1={328} y1={94} x2={328} y2={GROUND} label={`${spec.dims.heelStack}`} offset={12} />
          <Dim x1={120} y1={102} x2={120} y2={GROUND} label={`${spec.dims.foreStack}`} offset={-16} />
          <text x="8" y="18" fontSize="4.2" fill={INK} fontFamily="var(--font-geist-mono), monospace">
            TOE LEFT · SPRING {spec.dims.toeSpring} · DROP {spec.dims.drop} · COLLAR {side === "lateral" ? spec.dims.collarLateral : spec.dims.collarMedial} · DO NOT SCALE
          </text>
        </g>
      )}

      {markers &&
        [
          [1, 34, 84],
          [2, 96, 84],
          [3, 146, 92],
          [4, 224, 46],
          [5, 230, 64],
          [6, 248, 70],
          [7, 268, 38],
          [8, 302, 24],
          [9, 290, 64],
          [10, 220, 110],
          [11, 100, 112],
          [12, 314, 108],
        ].map(([n, x, y]) => (
          <Marker key={n} n={n} x={x} y={y} active={active === n} onPick={onMarker} />
        ))}
    </svg>
  );
}

const soleOutline = `
  M 36 -16
  L 18 -14
  L 18 14
  L 36 16
  C 52 32 78 46 112 52
  C 148 58 184 54 216 46
  C 248 38 276 32 292 26
  C 308 18 314 8 314 0
  C 314 -8 308 -18 292 -26
  C 276 -32 248 -38 216 -46
  C 184 -54 148 -58 112 -52
  C 78 -46 52 -32 36 -16
  Z`;

export function PlanShoe({ paint = "line" }: { paint?: Paint }) {
  const tone = paints[paint];
  const upper = paint === "line" ? "#f7f3ea" : tone.upper;
  return (
    <svg viewBox="-6 -78 340 156" role="img" aria-label="Plan view, left shoe, toe to the left. Lateral edge is the lower edge.">
      <text x="0" y="-68" fontSize="4.2" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        LEFT · TOE LEFT · LOWER EDGE IS LATERAL
      </text>
      <path d={soleOutline} fill={paint === "line" ? "#efe6d4" : tone.sole} stroke={INK} strokeWidth="0.8" transform="translate(0 0)" />
      <path
        d="M 46 -12 L 32 -10 L 32 10 L 46 12
           C 64 26 90 36 122 40
           C 156 44 188 40 218 34
           C 246 28 270 22 286 16
           C 298 10 302 4 302 0
           C 302 -4 298 -10 286 -16
           C 270 -22 246 -28 218 -34
           C 188 -40 156 -44 122 -40
           C 90 -36 64 -26 46 -12 Z"
        fill={upper}
        stroke={INK}
        strokeWidth="0.7"
      />
      <path d="M 116 46 C 140 34 158 20 166 8" fill="none" stroke={tone.stitch} strokeWidth="0.85" strokeDasharray="1.8 1.1" />
      <path d="M 116 -46 C 140 -34 158 -20 166 -8" fill="none" stroke={tone.stitch} strokeWidth="0.85" strokeDasharray="1.8 1.1" />
      <text x="150" y="-16" fontSize="3.3" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        OPEN 12
      </text>
      <ellipse cx="230" cy="0" rx="36" ry="20" fill={PAPER} stroke={INK} strokeWidth="0.6" />
      <path d="M 168 -14 C 190 -18 220 -16 236 -10 L 236 10 C 220 16 190 18 168 14 C 156 8 156 -8 168 -14 Z" fill={tone.tongue} stroke={INK} strokeWidth="0.45" />
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 186 + i * 12;
        return (
          <g key={i}>
            <circle cx={x} cy={-12} r="2" fill={PAPER} stroke={INK} strokeWidth="0.4" />
            <circle cx={x} cy={12} r="2" fill={PAPER} stroke={INK} strokeWidth="0.4" />
          </g>
        );
      })}
      <text x="268" y="3" fontSize="5" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        L
      </text>
      <text x="140" y="72" fontSize="4" fill={INK} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace">
        LATERAL
      </text>
      <text x="140" y="-60" fontSize="4" fill={INK} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace">
        MEDIAL
      </text>
    </svg>
  );
}

export function SoleShoe() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="-6 -78 340 156" role="img" aria-label="Outsole, ground-contact face, left shoe, toe to the left, lateral edge lower.">
      <defs>
        <pattern id={`${uid}-herr`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L4 0 L8 8" fill="none" stroke={INK} strokeWidth="0.4" />
        </pattern>
        <clipPath id={`${uid}-fore`}>
          <path d="M 20 -40 C 40 -48 70 -52 100 -50 C 130 -54 150 -40 150 0 C 150 40 130 54 100 50 C 70 52 40 48 20 40 Z" />
        </clipPath>
      </defs>
      <text x="0" y="-68" fontSize="4.2" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        GROUND FACE · LEFT · LATERAL EDGE LOWER · TOE LEFT
      </text>
      <path d={soleOutline} fill="#efe6d4" stroke={INK} strokeWidth="0.85" />
      <g clipPath={`url(#${uid}-fore)`}>
        <rect x="0" y="-60" width="160" height="120" fill={`url(#${uid}-herr)`} />
      </g>
      <circle cx="118" cy="0" r="16" fill="#f4f0e6" stroke={INK} strokeWidth="0.6" />
      <circle cx="118" cy="0" r="10" fill="none" stroke={INK} strokeWidth="0.7" />
      <path d="M 168 -30 C 190 -22 200 -10 200 0 C 200 10 190 22 168 30" fill="none" stroke={INK} strokeWidth="0.45" />
      <path d="M 176 -26 C 196 -18 206 -8 206 0 C 206 8 196 18 176 26" fill="none" stroke={INK} strokeWidth="0.35" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M ${236 + i * 12} -22 Q ${242 + i * 12} 0 ${236 + i * 12} 22`}
          fill="none"
          stroke={INK}
          strokeWidth="0.7"
        />
      ))}
      <text x="262" y="2" textAnchor="middle" fontSize="8" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        MS
      </text>
      <text x="118" y="2" textAnchor="middle" fontSize="3" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        RING
      </text>
      <text x="70" y="2" textAnchor="middle" fontSize="3.4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        HERRING
      </text>
    </svg>
  );
}

export function HeelElevation() {
  return (
    <svg viewBox="0 0 160 140" role="img" aria-label="Heel elevation, left shoe">
      <line x1="12" y1="118" x2="148" y2="118" stroke={INK} strokeWidth="0.3" strokeDasharray="1 1.2" />
      <path d="M 28 118 L 24 104 H 136 L 132 118 Z" fill="#efe6d4" stroke={INK} strokeWidth="0.8" />
      <path d="M 32 104 H 128" fill="none" stroke={INK} strokeWidth="0.35" />
      <path d="M 40 104 L 46 62 H 114 L 120 104 Z" fill="#f7f3ea" stroke={INK} strokeWidth="0.75" />
      <path d="M 52 62 C 58 48 70 44 80 44 C 90 44 102 48 108 62" fill="#e7dcc6" stroke={INK} strokeWidth="0.6" />
      <path d="M 70 44 C 72 34 88 32 90 44" fill="#f7f3ea" stroke={INK} strokeWidth="0.6" />
      <circle cx="80" cy="100" r="6.5" fill="none" stroke={INK} strokeWidth="0.55" />
      <text x="80" y="18" textAnchor="middle" fontSize="4.2" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        HEEL · {spec.dims.soleWidthHeel} WIDE
      </text>
      <text x="80" y="132" textAnchor="middle" fontSize="3.6" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        RING IN FOXING · NOT THROUGH
      </text>
    </svg>
  );
}

export function ToeElevation() {
  return (
    <svg viewBox="0 0 150 130" role="img" aria-label="Toe elevation, 30 millimetres back from the tip">
      <line x1="16" y1="108" x2="134" y2="108" stroke={INK} strokeWidth="0.3" strokeDasharray="1 1.2" />
      <path d="M 28 108 L 26 96 H 124 L 122 108 Z" fill="#efe6d4" stroke={INK} strokeWidth="0.8" />
      <path
        d="M 40 96 L 48 70 H 102 L 110 96 Z"
        fill="#f7f3ea"
        stroke={INK}
        strokeWidth="0.75"
      />
      <path d="M 52 70 L 56 52 H 94 L 98 70" fill="none" stroke={INK} strokeWidth="0.7" />
      <path d="M 56 52 H 94" fill="none" stroke={INK} strokeWidth="0.45" />
      <path d="M 48 78 H 102" fill="none" stroke={INK} strokeWidth="0.3" strokeDasharray="1.2 1" />
      <text x="75" y="18" textAnchor="middle" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        TOE · 30 BACK FROM TIP
      </text>
      <text x="75" y="122" textAnchor="middle" fontSize="3.6" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        CHISEL FACE FLAT · PUFF BEHIND
      </text>
    </svg>
  );
}

export function SectionShoe() {
  return (
    <svg viewBox="0 0 360 150" role="img" aria-label="Sagittal section, schematic, showing the cupsole cavity">
      <line x1="8" y1="132" x2="250" y2="132" stroke={INK} strokeWidth="0.25" strokeDasharray="1.2 1.4" />
      <path
        d="M 28 118 C 40 126 70 128 110 128 L 200 128 C 220 126 232 120 236 112 L 228 104 L 210 108 L 150 110 L 70 110 C 48 108 36 104 30 98 Z"
        fill="#efe6d4"
        stroke={INK}
        strokeWidth="0.85"
      />
      <path d="M 46 110 H 214" fill={PAPER} stroke={INK} strokeWidth="2.2" />
      <path d="M 50 104 H 210" fill="none" stroke={INK} strokeWidth="0.7" />
      <path
        d="M 30 98 C 48 78 78 70 110 72 C 132 64 156 54 186 50 C 206 48 222 54 230 66 L 228 104"
        fill="#f7f3ea"
        stroke={INK}
        strokeWidth="0.85"
      />
      <path d="M 40 96 C 58 86 78 82 96 84" fill="none" stroke={INK} strokeWidth="0.4" strokeDasharray="1.3 1" />
      <path d="M 186 96 C 202 84 216 78 226 82" fill="none" stroke={INK} strokeWidth="0.4" strokeDasharray="1.3 1" />
      <text x="8" y="12" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        SAGITTAL · SCHEMATIC · CUP CAVITY, NOT A SOLID WEDGE
      </text>
      <g fill={INK} fontSize="3.8" fontFamily="var(--font-geist-mono), monospace">
        <text x="262" y="36">A sockliner 1.2</text>
        <text x="262" y="52">B insole board 2.0</text>
        <text x="262" y="68">C rubber under ball 6</text>
        <text x="262" y="84">D rubber under heel 8</text>
        <text x="262" y="100">E toe puff 1.0</text>
        <text x="262" y="116">F counter 1.4</text>
      </g>
      <g fill={PAPER} stroke={INK} strokeWidth="0.35" fontSize="3.4" fontFamily="var(--font-geist-mono), monospace">
        {[
          [120, 100, "A"],
          [120, 108, "B"],
          [100, 120, "C"],
          [180, 120, "D"],
          [70, 86, "E"],
          [210, 82, "F"],
        ].map(([x, y, letter]) => (
          <g key={String(letter)}>
            <circle cx={Number(x)} cy={Number(y)} r="3.2" />
            <text x={Number(x)} y={Number(y)} textAnchor="middle" dominantBaseline="central" stroke="none" fill={INK}>
              {letter}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function ExplodedShoe() {
  const layers: { y: number; label: string; part: "liner" | "upper" | "board" | "sole" }[] = [
    { y: 22, label: "15  sockliner", part: "liner" },
    { y: 96, label: "01–13  upper", part: "upper" },
    { y: 176, label: "14  insole board", part: "board" },
    { y: 236, label: "16  cupsole", part: "sole" },
  ];
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label="Exploded assembly of MS-01, side view">
      <text x="8" y="14" fontSize="4.2" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        EXPLODED · NUMBERS MATCH THE BOM · TOE LEFT
      </text>
      {layers.map((layer) => (
        <g key={layer.part} transform={`translate(4 ${layer.y}) scale(0.62) translate(0 -18)`}>
          {layer.part === "liner" && (
            <path d="M 48 92 C 120 82 210 80 292 88 L 276 100 L 64 102 Z" fill="#f3ecdf" stroke={INK} strokeWidth="1" />
          )}
          {layer.part === "upper" && (
            <>
              <path d={upperLateral} fill="#f7f3ea" stroke={INK} strokeWidth="1.15" />
              <path d={tongue} fill="#efeae0" stroke={INK} strokeWidth="0.7" />
              <path d={haloStitch} fill="none" stroke={INK} strokeWidth="0.7" strokeDasharray="2 1.1" />
              <path d={tab} fill="#f7f3ea" stroke={INK} strokeWidth="0.7" />
            </>
          )}
          {layer.part === "board" && (
            <path d="M 20 96 L 308 90 L 304 104 L 24 108 Z" fill="#e7e0d2" stroke={INK} strokeWidth="1" />
          )}
          {layer.part === "sole" && <path d={solePath} fill="#efe6d4" stroke={INK} strokeWidth="1.15" />}
        </g>
      ))}
      {layers.map((layer) => (
        <text key={layer.label} x="248" y={layer.y + 28} fontSize="5" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          {layer.label}
        </text>
      ))}
    </svg>
  );
}

function Grain({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={INK} fill="none" strokeWidth="0.4">
      <line x1={x} y1={y} x2={x + 16} y2={y} />
      <path d={`M ${x + 12} ${y - 2} L ${x + 16} ${y} L ${x + 12} ${y + 2}`} />
    </g>
  );
}

export function PatternSheet() {
  return (
    <svg viewBox="0 0 360 210" role="img" aria-label="Schematic upper pieces for MS-01. Not a graded nest.">
      <text x="4" y="10" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
        NET OF THE UPPER · ADD 14 mm LASTING ALLOWANCE · DO NOT ADD IT ON THE LAP
      </text>
      <g>
        <path
          d="M 16 40 C 20 28 36 22 52 24 C 78 28 96 40 104 58 C 110 78 100 96 78 100 C 50 104 24 92 16 74 C 10 60 12 48 16 40 Z"
          fill="#f7f3ea"
          stroke={INK}
          strokeWidth="0.7"
        />
        <Grain x={40} y={62} />
        <text x="48" y="78" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          01 VAMP
        </text>
      </g>
      <g>
        <path
          d="M 130 36 C 150 28 176 30 190 46 C 206 66 208 92 196 108 C 184 122 160 124 142 112 C 128 100 120 78 124 58 C 126 46 128 40 130 36 Z"
          fill="#f7f3ea"
          stroke={INK}
          strokeWidth="0.7"
        />
        <path d="M 142 50 C 160 70 168 92 166 112" fill="none" stroke={INK} strokeWidth="0.45" strokeDasharray="1.4 1" />
        <Grain x={150} y={78} />
        <text x="148" y="96" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          02 QTR LAT
        </text>
      </g>
      <g>
        <path
          d="M 230 40 C 250 34 276 38 288 54 C 302 74 300 98 286 112 C 272 124 248 122 234 108 C 222 96 218 74 224 58 C 226 48 228 44 230 40 Z"
          fill="#f7f3ea"
          stroke={INK}
          strokeWidth="0.7"
        />
        <path d="M 246 56 C 262 76 268 96 264 114" fill="none" stroke={INK} strokeWidth="0.45" strokeDasharray="1.4 1" />
        <text x="244" y="96" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          03 QTR MED
        </text>
        <text x="236" y="108" fontSize="3.2" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          COLLAR −4
        </text>
      </g>
      <g>
        <path d="M 16 132 H 78 C 86 132 90 140 90 148 V 176 H 16 Z" fill="#f7f3ea" stroke={INK} strokeWidth="0.7" />
        <text x="28" y="158" fontSize="4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          04 TONGUE
        </text>
      </g>
      <g>
        <path d="M 104 140 H 150 V 156 H 104 Z" fill="#f7f3ea" stroke={INK} strokeWidth="0.6" />
        <text x="108" y="151" fontSize="3.4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          05 GUSSET ×2
        </text>
      </g>
      <g>
        <path d="M 160 136 H 214 V 150 H 160 Z" fill="#f7f3ea" stroke={INK} strokeWidth="0.6" />
        <text x="164" y="146" fontSize="3.4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          06 EYESTAY
        </text>
      </g>
      <g>
        <path d="M 224 132 H 268 V 168 H 248 L 236 180 H 224 Z" fill="#f7f3ea" stroke={INK} strokeWidth="0.6" />
        <circle cx="246" cy="150" r="4" fill="none" stroke={INK} strokeWidth="0.4" />
        <text x="228" y="164" fontSize="3.4" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          07 TAB
        </text>
      </g>
      <g>
        <path d="M 280 136 H 348 V 148 H 280 Z" fill="#f7f3ea" stroke={INK} strokeWidth="0.6" />
        <text x="286" y="145" fontSize="3.3" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          08 BINDING BIAS
        </text>
        <path d="M 16 188 H 348" stroke={INK} strokeWidth="0.35" strokeDasharray="1 1" />
        <text x="16" y="200" fontSize="3.6" fill={INK} fontFamily="var(--font-geist-mono), monospace">
          GRAIN ARROW IS HEEL TO TOE ON QUARTERS · TIGHT ACROSS THE TOE ON THE VAMP
        </text>
      </g>
    </svg>
  );
}
