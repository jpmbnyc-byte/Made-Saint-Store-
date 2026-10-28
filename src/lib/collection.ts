import catalog from "@/data/mees-catalog.json";
import { chroma, deltaE, hexToLab, mix, normalizeHex, withLightness } from "@/lib/color";

export type Role = "ground" | "body" | "depth" | "signal" | "bridge";
export type Tone = Role | "bodyTint" | "bodyShade";
export type Texture = "suede" | "mesh" | "knit" | "jersey" | "lace" | "rubber" | "ripstop" | "smooth" | "woven" | "metal" | "thread" | "print";
export type StyleId = "runner" | "mule";
export type RecipeId = "hero" | "tonal" | "inverse";

export type Swatch = { hex: string; w: number };
export type Article = { id: string; ref: string; path: string; name: string; family: string; swatches: Swatch[] };
export type Sole = { id: string; path: string; name: string; family: string; label: string; sizes: string; fits: string[]; note: string; swatches: Swatch[] };

export const ARTICLES = catalog.articles as Article[];
export const SOLES = catalog.soles as Sole[];
export const FAMILY_LABEL = catalog.families as Record<string, string>;

export const ROLE_INFO: Record<Role, { label: string; job: string }> = {
  ground: { label: "Ground", job: "Mesh, lining, laces, label base" },
  body: { label: "Body", job: "Suede overlays, the shell" },
  depth: { label: "Depth", job: "Outsole, sockliner" },
  signal: { label: "Signal", job: "Emblem, print accent" },
  bridge: { label: "Bridge", job: "Midsole band, logo tab" },
};

export type Component = {
  id: string;
  label: string;
  group: "Upper" | "Lining" | "Trim" | "Bottom" | "Decoration";
  texture: Texture;
  /** MEES families to source from. Empty = not in the MEES library, specify as a trim. */
  families: string[];
  /** Reuse another component's article (cut from the same hide or roll). */
  sameAs?: string;
  sole?: boolean;
  spec: string;
};

export type Style = {
  id: StyleId;
  name: string;
  short: string;
  status: string;
  components: Component[];
  recipes: Record<RecipeId, Record<string, Tone>>;
};

const SUEDE = ["suede", "vegan-suede"];

export const STYLES: Record<StyleId, Style> = {
  runner: {
    id: "runner",
    name: "Bubble-lug runner",
    short: "Runner",
    status: "Locked flat from founder concept, two views",
    components: [
      { id: "mudguard", label: "Mudguard", group: "Upper", texture: "suede", families: SUEDE, spec: "Wraps the toe to the midsole line. Cut nap toward heel." },
      { id: "eyestay", label: "Eyestay", group: "Upper", texture: "suede", families: SUEDE, sameAs: "mudguard", spec: "6 eyelets per side. Same hide as mudguard." },
      { id: "saddle", label: "Saddle strap", group: "Upper", texture: "suede", families: SUEDE, sameAs: "mudguard", spec: "Diagonal strap splitting the two mesh windows." },
      { id: "quarter", label: "Quarter / heel panel", group: "Upper", texture: "suede", families: SUEDE, sameAs: "mudguard", spec: "Curved front edge. Heel counter sits behind it." },
      { id: "tongue", label: "Tongue", group: "Upper", texture: "suede", families: SUEDE, sameAs: "mudguard", spec: "Padded. Carries the woven label." },
      { id: "mesh", label: "Base mesh / windows", group: "Upper", texture: "mesh", families: ["mesh", "knit"], spec: "Visible in the front and rear windows. Backed with foam scrim." },
      { id: "lining", label: "Collar lining", group: "Lining", texture: "jersey", families: ["stretch", "mesh", "vegan-suede"], spec: "Padded collar roll and tongue back." },
      { id: "laces", label: "Laces", group: "Trim", texture: "lace", families: ["laces"], spec: "Flat or oval. Length set at sampling." },
      { id: "eyelets", label: "Eyelets", group: "Trim", texture: "metal", families: [], spec: "Hidden-ring or painted metal, matched to the overlay." },
      { id: "label", label: "Woven tongue label", group: "Decoration", texture: "woven", families: [], spec: "Winged emblem from the founder file. Wordmark MADE SAiNT." },
      { id: "emblem", label: "Emblem thread", group: "Decoration", texture: "thread", families: [], spec: "Woven into the label. Shared across the collection." },
      { id: "midsole", label: "Midsole / foxing band", group: "Bottom", texture: "rubber", families: ["sole-color"], sole: true, spec: "Separate midsole layer on the nub-lug unit." },
      { id: "print", label: "Grid print on band", group: "Decoration", texture: "print", families: [], spec: "Tattersall grid, pad or screen printed on the band." },
      { id: "outsole", label: "Outsole, round nub lugs", group: "Bottom", texture: "rubber", families: ["sole-color"], sole: true, spec: "Bubble lugs wrap up the edge." },
      { id: "sockliner", label: "Sockliner", group: "Lining", texture: "suede", families: ["vegan-suede", "stretch"], spec: "Topcover printed MADE SAiNT at the heel." },
      { id: "thread", label: "Stitching thread", group: "Trim", texture: "thread", families: [], spec: "Tone-on-tone to the overlay." },
    ],
    recipes: {
      hero: { mudguard: "body", eyestay: "body", saddle: "body", quarter: "body", tongue: "body", mesh: "ground", lining: "ground", laces: "ground", eyelets: "body", label: "ground", emblem: "signal", midsole: "bridge", print: "signal", outsole: "depth", sockliner: "depth", thread: "body" },
      tonal: { mudguard: "body", eyestay: "body", saddle: "body", quarter: "body", tongue: "body", mesh: "bodyTint", lining: "ground", laces: "bodyTint", eyelets: "body", label: "ground", emblem: "signal", midsole: "bodyTint", print: "body", outsole: "bodyShade", sockliner: "bodyShade", thread: "body" },
      inverse: { mudguard: "depth", eyestay: "depth", saddle: "depth", quarter: "depth", tongue: "depth", mesh: "bodyTint", lining: "ground", laces: "ground", eyelets: "depth", label: "ground", emblem: "signal", midsole: "ground", print: "signal", outsole: "body", sockliner: "depth", thread: "depth" },
    },
  },
  mule: {
    id: "mule",
    name: "MS-TM01 Trail Mule",
    short: "Trail Mule",
    status: "Locked flat, Rev B technical package",
    components: [
      { id: "shell", label: "Shell", group: "Upper", texture: "ripstop", families: ["nylon", "canvas"], spec: "One-piece vamp and quarter. Padded with 3 mm foam." },
      { id: "collar", label: "Collar roll", group: "Upper", texture: "ripstop", families: ["nylon", "canvas"], sameAs: "shell", spec: "Rolled from the shell. Back seam hidden in the roll." },
      { id: "grid", label: "Grid print on shell", group: "Decoration", texture: "print", families: [], spec: "Fine grid, screen printed before cutting." },
      { id: "lining", label: "Lining", group: "Lining", texture: "jersey", families: ["stretch", "mesh"], spec: "Full sock lining." },
      { id: "tab", label: "Logo tab", group: "Trim", texture: "smooth", families: ["vegan-smooth", "leather-smooth"], spec: "Instep collar, debossed wordmark." },
      { id: "outsole", label: "Outsole, wave wall", group: "Bottom", texture: "rubber", families: ["sole-color"], sole: true, spec: "Wave sidewall, blunt toe bumper." },
      { id: "footbed", label: "Footbed topcover", group: "Lining", texture: "suede", families: ["vegan-suede"], spec: "Printed MADE SAiNT at the heel." },
      { id: "thread", label: "Stitching thread", group: "Trim", texture: "thread", families: [], spec: "Tone-on-tone to the shell." },
    ],
    recipes: {
      hero: { shell: "body", collar: "body", grid: "ground", lining: "ground", tab: "bridge", outsole: "depth", footbed: "bodyShade", thread: "body" },
      tonal: { shell: "bodyTint", collar: "bodyTint", grid: "ground", lining: "ground", tab: "body", outsole: "bodyShade", footbed: "body", thread: "bodyTint" },
      inverse: { shell: "depth", collar: "depth", grid: "bridge", lining: "ground", tab: "signal", outsole: "body", footbed: "depth", thread: "depth" },
    },
  },
};

export const RECIPES: Record<RecipeId, { label: string; idea: string }> = {
  hero: { label: "Hero", idea: "The concept read: body overlays on a light ground, dark sole, one signal accent." },
  tonal: { label: "Tonal", idea: "Everything in the body family, light to dark. Signal survives only in the emblem." },
  inverse: { label: "Inverse", idea: "Depth takes the overlays, the ground goes to the sole edge." },
};

export const CONCEPT_PALETTE = ["#e4dccd", "#7f5f65", "#3d2c31", "#d6a994", "#c8383a"];

export type Tones = Record<Tone, string> & { derived: Role[]; unused: string[] };

/** Assign the user's colors to roles. Anything missing is derived, and flagged as derived. */
export function assignRoles(input: string[]): Tones {
  const colors = [...new Set(input.map((c) => normalizeHex(c)).filter((c): c is string => !!c))];
  const pool = colors.length ? [...colors] : [...CONCEPT_PALETTE];
  const derived: Role[] = [];
  const take = (hex: string) => pool.splice(pool.indexOf(hex), 1)[0];

  let signal: string | undefined;
  const byChroma = [...pool].sort((x, y) => chroma(hexToLab(y)) - chroma(hexToLab(x)));
  const top = byChroma[0];
  if (top && pool.length >= 2 && chroma(hexToLab(top)) > (pool.length >= 4 ? 0.08 : 0.13)) signal = take(top);

  const byL = [...pool].sort((x, y) => hexToLab(y).L - hexToLab(x).L);
  let ground = byL[0] && hexToLab(byL[0]).L > 0.75 && pool.length > 1 ? take(byL[0]) : undefined;
  const darkest = byL[byL.length - 1];
  let depth = darkest && pool.includes(darkest) && hexToLab(darkest).L < 0.45 && pool.length > 1 ? take(darkest) : undefined;

  let body = [...pool].sort((x, y) => Math.abs(hexToLab(x).L - 0.55) - Math.abs(hexToLab(y).L - 0.55))[0];
  if (body) take(body);
  else {
    derived.push("body");
    body = ground && depth ? mix(ground, depth, 0.5) : ground ? withLightness(ground, 0.52, 3) : depth ? withLightness(depth, 0.55, 1.2) : "#7f5f65";
  }
  if (!ground) { derived.push("ground"); ground = withLightness(body, 0.91, 0.3); }
  if (!depth) { derived.push("depth"); depth = withLightness(body, 0.3, 0.8); }
  if (!signal) { derived.push("signal"); signal = "#c8383a"; }

  let bridge = [...pool].sort((x, y) => Math.abs(hexToLab(x).L - 0.74) - Math.abs(hexToLab(y).L - 0.74))[0];
  if (bridge) take(bridge);
  else {
    bridge = derived.includes("signal") ? mix(ground, body, 0.3) : mix(ground, signal, 0.3);
    derived.push("bridge");
  }

  return {
    ground, body, depth, signal, bridge,
    bodyTint: mix(body, ground, 0.55),
    bodyShade: mix(body, depth, 0.5),
    derived,
    unused: pool,
  };
}

export type Verdict = "on-card" | "lab-dip" | "custom" | "trim";

export const VERDICT_INFO: Record<Verdict, { label: string; tone: string; rule: string }> = {
  "on-card": { label: "On card", tone: "bg-emerald-700 text-white", rule: "ΔE under 2.5: order the card color, confirm on the physical swatch." },
  "lab-dip": { label: "Lab dip", tone: "bg-amber-500 text-black", rule: "ΔE 2.5 to 8: same article, request a lab dip to the target." },
  custom: { label: "Dye to target", tone: "bg-rose-700 text-white", rule: "ΔE over 8: nothing close on the card, custom dye with a minimum." },
  trim: { label: "Trim spec", tone: "bg-neutral-600 text-white", rule: "Not in the MEES library. Specify the target to MEES for trim sourcing." },
};

export type Match = { article: Article; cardHex: string; dE: number };

export type Line = {
  component: Component;
  tone: Tone;
  hex: string;
  match?: Match;
  alternatives: Match[];
  verdict: Verdict;
  sole?: Sole;
  reused: boolean;
};

export type SlotConfig = { style: StyleId; recipe: RecipeId };
export type SlotResult = SlotConfig & { index: number; colors: Record<string, string>; lines: Line[] };

function nearest(article: Article, target: string): Match {
  let best = { hex: article.swatches[0]?.hex ?? "#000000", d: Infinity };
  for (const s of article.swatches) {
    if (s.w < 0.05) continue;
    const d = deltaE(target, s.hex);
    if (d < best.d) best = { hex: s.hex, d };
  }
  return { article, cardHex: best.hex, dE: best.d };
}

const verdictFor = (dE: number): Verdict => (dE < 2.5 ? "on-card" : dE < 8 ? "lab-dip" : "custom");

/** A used article wins if it is within this many ΔE of the best fresh option. */
const REUSE_BONUS = 1.5;

export function buildCollection(tones: Tones, slots: SlotConfig[]): SlotResult[] {
  const used = new Map<string, number>();
  const pickedSole = (style: StyleId) => SOLES.find((s) => s.fits.includes(style));

  return slots.map((slot, index) => {
    const style = STYLES[slot.style];
    const recipe = style.recipes[slot.recipe];
    const colors: Record<string, string> = {};
    const lines: Line[] = [];
    const byId: Record<string, Line> = {};

    for (const component of style.components) {
      const tone = recipe[component.id];
      const hex = tones[tone];
      colors[component.id] = hex;

      if (component.sameAs && byId[component.sameAs]?.match && recipe[component.sameAs] === tone) {
        const parent = byId[component.sameAs];
        const line = { component, tone, hex, match: parent.match, alternatives: [], verdict: parent.verdict, reused: true, sole: undefined };
        lines.push(line); byId[component.id] = line;
        continue;
      }
      if (!component.families.length) {
        const line: Line = { component, tone, hex, alternatives: [], verdict: "trim", reused: false };
        lines.push(line); byId[component.id] = line;
        continue;
      }

      const ranked = ARTICLES.filter((a) => component.families.includes(a.family))
        .map((a) => nearest(a, hex))
        .sort((x, y) => x.dE - y.dE);
      const scored = [...ranked].sort((x, y) => x.dE - (used.has(x.article.id) ? REUSE_BONUS : 0) - (y.dE - (used.has(y.article.id) ? REUSE_BONUS : 0)));
      const match = scored[0];
      const reused = !!match && used.has(match.article.id);
      if (match) used.set(match.article.id, (used.get(match.article.id) ?? 0) + 1);
      const line: Line = {
        component, tone, hex, match,
        alternatives: ranked.filter((m) => m.article.id !== match?.article.id).slice(0, 3),
        verdict: match ? verdictFor(match.dE) : "custom",
        reused,
        sole: component.sole ? pickedSole(slot.style) : undefined,
      };
      lines.push(line); byId[component.id] = line;
    }
    return { ...slot, index, colors, lines };
  });
}

export function summarize(results: SlotResult[]) {
  const articles = new Map<string, { article: Article; uses: { slot: number; component: string; hex: string }[] }>();
  const trims = new Map<string, { label: string; hexes: Set<string> }>();
  const verdicts: Record<Verdict, number> = { "on-card": 0, "lab-dip": 0, custom: 0, trim: 0 };
  for (const r of results) {
    for (const l of r.lines) {
      verdicts[l.verdict]++;
      if (l.match) {
        const e = articles.get(l.match.article.id) ?? { article: l.match.article, uses: [] };
        e.uses.push({ slot: r.index + 1, component: l.component.label, hex: l.hex });
        articles.set(l.match.article.id, e);
      } else {
        const e = trims.get(l.component.label) ?? { label: l.component.label, hexes: new Set<string>() };
        e.hexes.add(l.hex);
        trims.set(l.component.label, e);
      }
    }
  }
  const soles = [...new Set(results.map((r) => SOLES.find((s) => s.fits.includes(r.style))).filter(Boolean))] as Sole[];
  return { articles: [...articles.values()], trims: [...trims.values()], verdicts, soles };
}

export const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const thumbSrc = (id: string) => `/mees/thumbs/${id}.webp`;

export function toCsv(results: SlotResult[]): string {
  const head = ["Slot", "Style", "Colorway recipe", "Component", "Group", "Texture", "Target hex", "Source", "MEES ref", "MEES folder", "MEES file", "Nearest card hex", "Delta E (OKLab x100)", "Verdict", "Sole unit", "Drive link", "Spec"];
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = results.flatMap((r) =>
    r.lines.map((l) => [
      r.index + 1, STYLES[r.style].name, RECIPES[r.recipe].label, l.component.label, l.component.group, l.component.texture, l.hex,
      l.match ? FAMILY_LABEL[l.match.article.family] ?? l.match.article.family : "Trim, outside MEES library",
      l.match?.article.ref ?? "", l.match?.article.path ?? "", l.match?.article.name ?? "",
      l.match?.cardHex ?? "", l.match ? l.match.dE.toFixed(1) : "", VERDICT_INFO[l.verdict].label,
      l.sole ? `${l.sole.path} / ${l.sole.name}` : "", l.match ? driveView(l.match.article.id) : "", l.component.spec,
    ]),
  );
  return [head, ...rows].map((row) => row.map(esc).join(",")).join("\n");
}
