import { useId } from "react";
import { STYLES, type Texture } from "@/lib/collection";
import { mix } from "@/lib/color";
import { INK, Pattern, cr, type Pt } from "./textures";

export type RunnerVariant = { textures?: Record<string, Texture>; grid?: boolean; label?: "woven" | "printed" };
type Props = { colors: Record<string, string>; view: "lateral" | "top"; paper?: string; className?: string; variant?: RunnerVariant };
type ViewProps = { uid: string; colors: Record<string, string>; paper: string; variant: RunnerVariant };

const comps = STYLES.runner.components;

function Defs({ uid, colors, variant }: { uid: string; colors: Record<string, string>; variant: RunnerVariant }) {
  const grid = variant.grid ?? true;
  return (
    <defs>
      {comps.map((c) => (
        <Pattern
          key={c.id}
          id={`${uid}-${c.id}`}
          texture={c.id === "midsole" ? (grid ? "print" : "rubber") : variant.textures?.[c.id] ?? c.texture}
          hex={colors[c.id]}
          accent={colors.print}
          extra={mix(colors.label, "#ffffff", 0.4)}
        />
      ))}
    </defs>
  );
}

/* ---------- Lateral, toe right ---------- */

const L_UPPER =
  "M 44 198 C 34 160 36 122 52 100 C 60 90 74 86 88 90 C 120 98 160 112 196 114 C 220 115 238 108 252 98 L 268 70 C 276 60 300 58 318 64 C 330 70 336 80 340 92 C 380 118 430 140 480 158 C 520 168 552 170 570 178 C 556 190 525 199 480 200 L 44 198 Z";
const L_MIDSOLE =
  "M 38 194 L 480 198 C 525 197 556 186 574 174 C 582 188 574 206 554 216 C 532 225 505 229 470 229 L 64 231 C 46 230 36 216 38 194 Z";
const L_OUTSOLE = "M 56 228 L 470 227 C 510 227 542 220 560 210 C 566 222 552 236 520 240 L 70 242 C 56 242 50 236 52 230 Z";
const L_QUARTER = "M 0 0 L 190 0 L 190 110 C 176 128 156 146 152 166 C 150 180 168 186 200 186 L 352 186 L 352 260 L 0 260 Z";
const L_SADDLE = "M 278 104 C 296 136 316 170 330 200 L 386 200 C 366 168 344 134 320 108 Z";
const L_MUDGUARD = "M 352 260 L 352 186 C 390 184 420 178 446 170 C 480 160 540 158 600 168 L 600 260 Z";
const L_TONGUE = "M 250 104 L 266 70 C 276 58 302 56 320 63 C 332 70 338 82 342 96 L 342 112 L 250 112 Z";
const L_EYESTAY =
  "M 236 100 C 280 96 320 100 344 96 C 384 120 432 142 484 160 L 476 178 C 428 166 386 148 352 128 C 316 122 276 124 242 128 Z";
const L_LINING = "M 50 106 C 58 96 72 92 88 95 C 120 103 160 117 196 119 C 220 120 236 114 250 106";
const L_EYELETS: Pt[] = [[266, 113], [300, 112], [336, 112], [372, 123], [408, 140], [444, 156]];
const L_LUGS: Pt[] = [
  [44, 224], [50, 236],
  ...Array.from({ length: 33 }, (_, i) => [62 + i * 14, 245] as Pt),
  [532, 241], [547, 235], [559, 225], [567, 213],
];

function Lateral({ uid, colors, paper, variant }: ViewProps) {
  const f = (id: string) => `url(#${uid}-${id})`;
  return (
    <svg viewBox="0 0 600 262" role="img" aria-label="Runner, lateral view">
      <Defs uid={uid} colors={colors} variant={variant} />
      <clipPath id={`${uid}-clip`}>
        <path d={L_UPPER} />
      </clipPath>
      <rect width="600" height="262" fill={paper} />
      <ellipse cx="310" cy="252" rx="270" ry="6" fill="#000" opacity="0.08" />

      {L_LUGS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7.4" fill={f("outsole")} stroke={INK} strokeWidth="0.8" />
      ))}
      <path d={L_OUTSOLE} fill={f("outsole")} stroke={INK} strokeWidth="0.9" />

      <path d={L_UPPER} fill={f("mesh")} stroke={INK} strokeWidth="1" />
      <g clipPath={`url(#${uid}-clip)`} stroke={INK} strokeWidth="0.9">
        <path d={L_TONGUE} fill={f("tongue")} />
        <path d={L_QUARTER} fill={f("quarter")} />
        <path d={L_SADDLE} fill={f("saddle")} />
        <path d={L_MUDGUARD} fill={f("mudguard")} />
        <path d={L_EYESTAY} fill={f("eyestay")} />
        <path d={L_LINING} fill="none" stroke={f("lining")} strokeWidth="7" />
        <path d={L_LINING} fill="none" stroke={INK} strokeWidth="0.6" transform="translate(0 3.6)" />
      </g>
      <path d={L_UPPER} fill="none" stroke={INK} strokeWidth="1.1" />

      <path d={L_MIDSOLE} fill={f("midsole")} stroke={INK} strokeWidth="1" />

      {variant.label === "printed" ? (
        <g transform="rotate(-9 297 76)" fill={colors.label} fontFamily="Arial, sans-serif" fontWeight="700" textAnchor="middle">
          <text x="297.5" y="74" fontSize="6.2">MADE</text>
          <text x="297.5" y="81.5" fontSize="6.2">SAiNT</text>
        </g>
      ) : (
        <g transform="rotate(-9 297 76)">
          <rect x="284" y="66" width="27" height="20" rx="1.5" fill={colors.label} stroke={INK} strokeWidth="0.7" />
          <rect x="293.5" y="68.5" width="8" height="8" rx="1" fill={colors.emblem} />
          <text x="297.5" y="82.6" textAnchor="middle" fontSize="3.6" fontWeight="700" fill={colors.emblem} fontFamily="Arial, sans-serif">
            MADE SAiNT
          </text>
        </g>
      )}

      {L_EYELETS.map(([x, y], i) => (
        <g key={i}>
          <path d={`M ${x} ${y} L ${x + 16} ${y - 15}`} stroke={INK} strokeWidth="5.4" strokeLinecap="round" />
          <path d={`M ${x} ${y} L ${x + 16} ${y - 15}`} stroke={colors.laces} strokeWidth="3.8" strokeLinecap="round" />
          <circle cx={x} cy={y} r="3.6" fill={colors.eyelets} stroke={INK} strokeWidth="0.7" />
          <circle cx={x} cy={y} r="1.5" fill={INK} />
        </g>
      ))}
      <g fill="none" strokeLinecap="round">
        {["M 296 98 C 268 74 248 90 270 100 C 282 105 290 101 296 98", "M 298 98 C 320 74 344 84 326 98 C 316 104 304 102 298 98", "M 296 98 C 300 122 296 140 286 162", "M 298 98 C 312 120 318 140 316 160"].map((d, i) => (
          <g key={i}>
            <path d={d} stroke={INK} strokeWidth="5" />
            <path d={d} stroke={colors.laces} strokeWidth="3.6" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Top, toe right ---------- */

const CY = 125;
const UPPER_HW: Pt[] = [[40, 0], [46, 30], [60, 48], [90, 60], [140, 63], [200, 60], [250, 58], [300, 64], [360, 74], [420, 80], [470, 78], [515, 68], [548, 52], [566, 30], [574, 0]];
const SOLE_HW: Pt[] = [[26, 0], [30, 26], [42, 50], [70, 66], [140, 74], [200, 71], [250, 69], [300, 75], [360, 86], [420, 92], [470, 90], [515, 80], [550, 64], [574, 40], [586, 0]];

function outline(hw: Pt[]): Pt[] {
  const top = hw.map(([x, w]) => [x, CY - w] as Pt);
  const bottom = hw.slice(1, -1).reverse().map(([x, w]) => [x, CY + w * 1.03] as Pt);
  return [...top, ...bottom];
}

function lugRing(hw: Pt[], step = 12.5): Pt[] {
  const pts: Pt[] = [];
  const dense: Pt[] = [];
  for (let i = 0; i < hw.length - 1; i++) {
    for (let t = 0; t < 1; t += 0.05) {
      dense.push([hw[i][0] + (hw[i + 1][0] - hw[i][0]) * t, hw[i][1] + (hw[i + 1][1] - hw[i][1]) * t]);
    }
  }
  for (const sign of [-1, 1]) {
    let acc = 0;
    for (let i = 1; i < dense.length; i++) {
      const [x0, w0] = dense[i - 1];
      const [x1, w1] = dense[i];
      acc += Math.hypot(x1 - x0, w1 - w0);
      if (acc >= step) {
        acc = 0;
        pts.push([x1, CY + sign * (w1 + 1)]);
      }
    }
  }
  return pts;
}

const mirror = (pts: Pt[]) => pts.map(([x, y]) => [x, 2 * CY - y] as Pt);
const T_UPPER = cr(outline(UPPER_HW), true);
const T_SOLE = cr(outline(SOLE_HW), true);
const T_LUGS = lugRing(SOLE_HW);
const T_QUARTER = "M 0 0 L 236 0 C 226 40 220 80 222 125 C 220 170 226 210 236 250 L 0 250 Z";
const T_REAR: Pt[] = [[232, 76], [270, 70], [312, 68], [318, 94], [272, 98], [236, 100]];
const T_FRONT: Pt[] = [[328, 64], [380, 56], [430, 52], [446, 62], [436, 84], [400, 94], [336, 96]];
const T_SADDLE = ["M 286 125 L 318 125 L 358 0 L 322 0 Z", "M 286 125 L 318 125 L 358 250 L 322 250 Z"];
const T_MUDGUARD = "M 600 0 L 440 0 C 420 50 412 95 414 125 C 412 155 420 200 440 250 L 600 250 Z";
const T_EYESTAY = "M 206 125 C 206 96 226 90 256 92 L 440 100 C 462 104 474 114 474 125 C 474 136 462 146 440 150 L 256 158 C 226 160 206 154 206 125 Z";
const T_OPENING = "M 58 125 C 58 88 96 74 150 76 C 206 78 236 98 238 125 C 236 152 206 172 150 174 C 96 176 58 162 58 125 Z";
const T_TONGUE = "M 212 108 L 452 112 C 460 116 460 134 452 138 L 212 142 C 200 138 200 112 212 108 Z";
const T_EYELET_X = [266, 300, 334, 368, 402, 436];

function Top({ uid, colors, paper, variant }: ViewProps) {
  const f = (id: string) => `url(#${uid}-${id})`;
  return (
    <svg viewBox="0 0 600 250" role="img" aria-label="Runner, top view">
      <Defs uid={uid} colors={colors} variant={variant} />
      <clipPath id={`${uid}-tclip`}>
        <path d={T_UPPER} />
      </clipPath>
      <rect width="600" height="250" fill={paper} />

      {T_LUGS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6.4" fill={f("outsole")} stroke={INK} strokeWidth="0.7" />
      ))}
      <path d={T_SOLE} fill={f("midsole")} stroke={INK} strokeWidth="0.9" />

      <path d={T_UPPER} fill={f("quarter")} stroke={INK} strokeWidth="1" />
      <g clipPath={`url(#${uid}-tclip)`} stroke={INK} strokeWidth="0.85">
        <path d={T_QUARTER} fill={f("quarter")} />
        {[T_REAR, mirror(T_REAR), T_FRONT, mirror(T_FRONT)].map((w, i) => (
          <path key={i} d={cr(w, true)} fill={f("mesh")} />
        ))}
        {T_SADDLE.map((d, i) => (
          <path key={i} d={d} fill={f("saddle")} />
        ))}
        <path d={T_MUDGUARD} fill={f("mudguard")} />
        <path d={T_EYESTAY} fill={f("eyestay")} />
        <path d={T_OPENING} fill={f("sockliner")} />
        <path d={T_OPENING} fill="none" stroke={f("lining")} strokeWidth="11" />
        <path d={T_OPENING} fill="none" stroke={INK} strokeWidth="1" />
        <path d={T_TONGUE} fill={f("tongue")} />
      </g>
      <path d={T_UPPER} fill="none" stroke={INK} strokeWidth="1.1" />

      <text x="140" y="128.5" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill={variant.label === "printed" ? colors.label : mix(colors.sockliner, colors.lining, 0.7)} fontFamily={variant.label === "printed" ? "Arial, sans-serif" : "Georgia, serif"} fontWeight={variant.label === "printed" ? 700 : 400}>
        MADE SAiNT
      </text>

      {variant.label === "printed" ? (
        <g fill={colors.label} fontFamily="Arial, sans-serif" fontWeight="700" textAnchor="middle" transform="rotate(90 229 125)">
          <text x="229" y="122" fontSize="8">MADE</text>
          <text x="229" y="131" fontSize="8">SAiNT</text>
        </g>
      ) : (
        <>
          <rect x="214" y="113" width="28" height="24" rx="1.5" fill={colors.label} stroke={INK} strokeWidth="0.7" />
          <rect x="224" y="116" width="8" height="8" rx="1" fill={colors.emblem} />
          <text x="228" y="132" textAnchor="middle" fontSize="3.8" fontWeight="700" fill={colors.emblem} fontFamily="Arial, sans-serif">
            MADE SAiNT
          </text>
        </>
      )}

      {T_EYELET_X.map((x) => (
        <g key={x}>
          <path d={`M ${x} 101 L ${x} 149`} stroke={INK} strokeWidth="5.6" strokeLinecap="round" />
          <path d={`M ${x} 101 L ${x} 149`} stroke={colors.laces} strokeWidth="4.2" strokeLinecap="round" />
          {[101, 149].map((y) => (
            <circle key={y} cx={x} cy={y} r="3.4" fill={colors.eyelets} stroke={INK} strokeWidth="0.7" />
          ))}
        </g>
      ))}
      <g fill="none" strokeLinecap="round">
        {["M 266 125 C 244 92 226 94 238 110 C 246 120 258 124 266 125", "M 266 125 C 244 158 226 156 238 140 C 246 130 258 126 266 125", "M 266 125 C 284 100 304 84 322 78", "M 266 125 C 288 150 308 166 324 172"].map((d, i) => (
          <g key={i}>
            <path d={d} stroke={INK} strokeWidth="5" />
            <path d={d} stroke={colors.laces} strokeWidth="3.6" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function RunnerFlat({ colors, view, paper = "#f4f0e6", className, variant = {} }: Props) {
  const uid = "r" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const V = view === "lateral" ? Lateral : Top;
  return (
    <div className={className}>
      <V uid={uid} colors={colors} paper={paper} variant={variant} />
    </div>
  );
}
