export type Lab = { L: number; a: number; b: number };

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function normalizeHex(input: string): string | null {
  const s = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(s)) return "#" + s.split("").map((c) => c + c).join("");
  if (/^[0-9a-f]{6}$/.test(s)) return "#" + s;
  return null;
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = normalizeHex(hex) ?? "#000000";
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((c) => Math.round(clamp01(c) * 255).toString(16).padStart(2, "0")).join("");
}

export function rgbToOklab([r, g, b]: [number, number, number]): Lab {
  const lr = toLinear(r), lg = toLinear(g), lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function oklabToRgb({ L, a, b }: Lab): [number, number, number] {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    toGamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toGamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toGamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

export const hexToLab = (hex: string) => rgbToOklab(hexToRgb(hex));
export const labToHex = (lab: Lab) => rgbToHex(oklabToRgb(lab));
export const chroma = (lab: Lab) => Math.hypot(lab.a, lab.b);

/** OKLab Euclidean distance ×100, so 1 unit is roughly one just-noticeable step. */
export function deltaE(x: string | Lab, y: string | Lab): number {
  const p = typeof x === "string" ? hexToLab(x) : x;
  const q = typeof y === "string" ? hexToLab(y) : y;
  return Math.hypot(p.L - q.L, p.a - q.a, p.b - q.b) * 100;
}

export function mix(x: string, y: string, t: number): string {
  const p = hexToLab(x), q = hexToLab(y);
  return labToHex({ L: p.L + (q.L - p.L) * t, a: p.a + (q.a - p.a) * t, b: p.b + (q.b - p.b) * t });
}

/** Set OKLab lightness, scaling chroma down toward the extremes so the color stays in gamut. */
export function withLightness(hex: string, L: number, chromaScale = 1): string {
  const p = hexToLab(hex);
  const edge = Math.min(1, 4 * L * (1 - L) + 0.15);
  const k = chromaScale * edge;
  return labToHex({ L, a: p.a * k, b: p.b * k });
}

export function lightness(hex: string) {
  return hexToLab(hex).L;
}

/** Text color that reads on top of a fill. */
export function inkOn(hex: string) {
  return lightness(hex) > 0.62 ? "#1c1b19" : "#f7f3ea";
}

/** k-means in OKLab over raw RGB pixels, ignoring near-white paper. */
export function extractPalette(pixels: Uint8ClampedArray, k = 5): string[] {
  const pts: Lab[] = [];
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 200) continue;
    const lab = rgbToOklab([pixels[i] / 255, pixels[i + 1] / 255, pixels[i + 2] / 255]);
    if (lab.L > 0.9 && chroma(lab) < 0.03) continue;
    pts.push(lab);
  }
  if (pts.length < k) return [];
  const sorted = [...pts].sort((p, q) => p.L - q.L);
  let centers = Array.from({ length: k }, (_, i) => sorted[Math.floor(((i + 0.5) / k) * sorted.length)]);
  let counts = new Array(k).fill(0);
  for (let iter = 0; iter < 14; iter++) {
    const sums = centers.map(() => ({ L: 0, a: 0, b: 0 }));
    counts = new Array(k).fill(0);
    for (const p of pts) {
      let best = 0, bd = Infinity;
      centers.forEach((c, j) => {
        const d = (p.L - c.L) ** 2 + (p.a - c.a) ** 2 + (p.b - c.b) ** 2;
        if (d < bd) { bd = d; best = j; }
      });
      sums[best].L += p.L; sums[best].a += p.a; sums[best].b += p.b;
      counts[best]++;
    }
    centers = centers.map((c, j) => (counts[j] ? { L: sums[j].L / counts[j], a: sums[j].a / counts[j], b: sums[j].b / counts[j] } : c));
  }
  const out: string[] = [];
  centers
    .map((c, j) => ({ c, n: counts[j] }))
    .filter((x) => x.n / pts.length > 0.02)
    .sort((x, y) => y.n - x.n)
    .forEach(({ c }) => {
      if (out.every((h) => deltaE(h, c) > 7)) out.push(labToHex(c));
    });
  return out;
}
