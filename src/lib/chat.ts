import {
  FAMILY_LABEL, RECIPES, STYLES, VERDICT_INFO,
  type RecipeId, type SlotConfig, type SlotResult, type StyleId, type Tones,
} from "@/lib/collection";
import { normalizeHex } from "@/lib/color";
import { eur, pct, usd, type Assumptions, type CollectionCost } from "@/lib/costing";
import { STORIES } from "@/lib/stories";

const STORY_WORDS: [RegExp, string][] = [
  [/\b(navy\s+)?intrecciato\b/, "navy-intrecciato"],
  [/\b(espresso|oxblood)\b/, "espresso-oxblood"],
  [/\bgraphite\b/, "graphite-tonal"],
  [/\bchalk\b/, "chalk-navy"],
  [/\b(navy\s+weave|weave\s*\/?\s*rust|rust\s+canvas)\b/, "navy-weave-rust"],
  [/\b(washed\s+)?denim\b/, "washed-denim"],
];

export type ChatAction =
  | { type: "palette"; colors: string[] }
  | { type: "slot"; index: number; patch: Partial<SlotConfig> }
  | { type: "assume"; patch: Partial<Assumptions> }
  | { type: "export" }
  | { type: "print" }
  | { type: "scroll"; id: string };

export type ChatContext = {
  palette: string[];
  slots: SlotConfig[];
  tones: Tones;
  results: SlotResult[];
  cost: CollectionCost;
  assumptions: Assumptions;
  renders: { key: string; style: StyleId; recipe: RecipeId }[];
  renderKey: (style: StyleId, recipe: RecipeId) => string;
};

export type ChatReply = { text: string; actions: ChatAction[] };

export const NAMED: Record<string, string> = {
  "powder blue": "#93a3ae", "off white": "#efe9dc", "dusty pink": "#c99a9a", "forest green": "#2f4a34",
  cream: "#e9e0cc", ivory: "#f2ecdc", bone: "#e4dccd", sand: "#d6c3a1", tan: "#b48a5e", camel: "#b98a50",
  brown: "#6b4a33", chocolate: "#4a3126", black: "#1d1c1c", charcoal: "#3a3a3c", grey: "#8d8b87", gray: "#8d8b87",
  white: "#f4f2ee", navy: "#22304a", blue: "#3e5c8a", olive: "#4a5a3c", sage: "#9aa58a", forest: "#2f4a34",
  green: "#3f6b47", burgundy: "#6a2433", wine: "#5a2230", red: "#c8383a", rust: "#a24d2a", orange: "#d9733a",
  peach: "#d6a994", pink: "#d9a3a8", mauve: "#7f5f65", lilac: "#b3a2c4", purple: "#5b3f6e", aubergine: "#3d2c31",
  mustard: "#c9a03a", yellow: "#e2c34a", khaki: "#a59a72", stone: "#b9b1a3", slate: "#5d6670", teal: "#2f6b6b",
  espresso: "#3b2a22", oat: "#d8cdb6", clay: "#b06e4f", fog: "#c9ccc9", ink: "#22201d",
};

const ORDINAL: Record<string, number> = { first: 0, one: 0, "1": 0, "01": 0, second: 1, two: 1, "2": 1, "02": 1, third: 2, three: 2, "3": 2, "03": 2 };

function findColors(t: string): string[] {
  const out: { at: number; hex: string }[] = [];
  for (const m of t.matchAll(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|\b[0-9a-f]{6}\b/gi)) {
    const h = normalizeHex(m[0]);
    if (h && (m[0].startsWith("#") || (/[a-f]/i.test(m[0]) && /\d/.test(m[0])))) out.push({ at: m.index ?? 0, hex: h });
  }
  let rest = t;
  for (const name of Object.keys(NAMED).sort((a, b) => b.length - a.length)) {
    const re = new RegExp(`\\b${name}\\b`, "g");
    for (const m of rest.matchAll(re)) out.push({ at: m.index ?? 0, hex: NAMED[name] });
    rest = rest.replace(re, (s) => " ".repeat(s.length));
  }
  return out.sort((a, b) => a.at - b.at).map((x) => x.hex);
}

function findLooks(t: string): number[] {
  if (/\b(all|every|each)\s+(three\s+)?looks?\b/.test(t)) return [0, 1, 2];
  const hits = new Set<number>();
  for (const m of t.matchAll(/\blook\s*#?\s*(0?[123]|one|two|three)\b/g)) hits.add(ORDINAL[m[1]]);
  for (const m of t.matchAll(/\b(first|second|third)\s+look\b/g)) hits.add(ORDINAL[m[1]]);
  return [...hits];
}

const num = (t: string, re: RegExp) => {
  const m = t.match(re);
  return m ? Number(m[1].replace(/,/g, "")) : undefined;
};

function lookCostText(ctx: ChatContext, i: number) {
  const c = ctx.cost.looks[i];
  const r = ctx.results[i];
  return [
    `Look 0${i + 1} · ${STYLES[r.style].short} · ${RECIPES[r.recipe].label}`,
    `Materials ${eur(c.materials)} · trims ${eur(c.trims)} · sole ${eur(c.sole)} · make ${eur(c.make)} · box ${eur(c.packaging)}`,
    `FOB ${eur(c.fob)} → landed ${eur(c.landed)} (freight ${eur(c.freight)}, duty ${eur(c.duty)})`,
    `Development ${eur(c.devPerPair)}/pr → total ${eur(c.totalEur)} = ${usd(c.totalUsd, 2)}`,
    `Retail ${usd(c.retailUsd)} · wholesale ${usd(c.wholesaleUsd)} · margin ${pct(c.dtcMargin)} direct, ${pct(c.wholesaleMargin)} wholesale`,
  ].join("\n");
}

const COMPONENT_WORDS: Record<string, string[]> = {
  mudguard: ["mudguard", "toe"], eyestay: ["eyestay"], saddle: ["saddle", "strap"], quarter: ["quarter", "heel"],
  tongue: ["tongue"], mesh: ["mesh", "window"], lining: ["lining", "collar lining"], laces: ["lace"], eyelets: ["eyelet"],
  label: ["label", "wordmark", "tongue print"], midsole: ["midsole", "foxing", "band"], print: ["print", "grid"], outsole: ["outsole", "sole", "lug"],
  sockliner: ["sockliner", "insole"], thread: ["thread", "stitch"], shell: ["shell", "upper"], collar: ["collar"], grid: ["grid"],
  tab: ["tab", "logo tab"], footbed: ["footbed", "insole"],
};

export const SUGGESTIONS = [
  "Washed denim on look 3",
  "Show the stories",
  "Cost per pair for every look",
  "Palette olive, bone, espresso, rust",
  "Look 2 runner tonal",
  "Set 300 pairs per look and duty 12%",
  "What's sourcing the mudguard on look 1?",
  "Which components need lab dips?",
  "Export the material list",
];

export const HELP = [
  "I run the collection from plain sentences. Try:",
  "• Palette: “use olive, bone, espresso and #c8383a” or “add rust”",
  "• Looks: “look 3 trail mule hero”, “all looks tonal”",
  "• Stories: “navy intrecciato on look 1”, “chalk on look 2”, “stories”, “look 1 clear story”",
  "• Cost: “cost look 1”, “what does the collection cost”",
  "• Assumptions: “300 pairs per look”, “duty 12%”, “freight 3.2”, “fx 1.1”, “markup 4.5”, “make runner 21”, “custom outsole on”",
  "• Sourcing: “what's on the look 1 mudguard”, “lab dips”, “materials”",
  "• Output: “export csv”, “print”, “hero renders”",
].join("\n");

export function interpret(input: string, ctx: ChatContext): ChatReply {
  const t = input.toLowerCase().replace(/[’']/g, "'").trim();
  const actions: ChatAction[] = [];
  const said: string[] = [];
  if (!t) return { text: HELP, actions };
  if (/^(help|\?|what can you do|commands?)\b/.test(t)) return { text: HELP, actions };

  const looks = findLooks(t);

  // Assumptions
  const patch: Partial<Assumptions> = {};
  const units = num(t, /\b(\d[\d,]*)\s*(pairs|pr|units)\b/) ?? num(t, /\b(?:units|pairs|moq|quantity)\s*(?:to|=|of)?\s*(\d[\d,]*)/);
  if (units) patch.units = units;
  const duty = num(t, /\bduty\s*(?:to|=|at|of)?\s*(\d+(?:\.\d+)?)/);
  if (duty !== undefined) patch.duty = duty;
  const freight = num(t, /\bfreight\s*(?:to|=|at|of)?\s*€?(\d+(?:\.\d+)?)/);
  if (freight !== undefined) patch.freight = freight;
  const fx = num(t, /\b(?:fx|exchange(?:\s+rate)?|eur\s*usd|usd per eur)\s*(?:to|=|at|of)?\s*(\d+(?:\.\d+)?)/);
  if (fx) patch.fx = fx;
  const mult = num(t, /\b(?:markup|multiple|multiplier|retail\s*x)\s*(?:to|=|at|of)?\s*(\d+(?:\.\d+)?)/) ?? num(t, /\b(\d+(?:\.\d+)?)\s*x\s*(?:markup|cost)/);
  if (mult) patch.retailMultiple = mult;
  const makeR = num(t, /\b(?:make|labou?r)\s+(?:on\s+)?(?:the\s+)?runner\s*(?:to|=|at)?\s*€?(\d+(?:\.\d+)?)/);
  if (makeR !== undefined) patch.makeRunner = makeR;
  const makeM = num(t, /\b(?:make|labou?r)\s+(?:on\s+)?(?:the\s+)?(?:trail\s+)?mule\s*(?:to|=|at)?\s*€?(\d+(?:\.\d+)?)/);
  if (makeM !== undefined) patch.makeMule = makeM;
  const soleR = num(t, /\bsole\s+(?:unit\s+)?(?:on\s+)?(?:the\s+)?runner\s*(?:to|=|at)?\s*€?(\d+(?:\.\d+)?)/);
  if (soleR !== undefined) patch.soleRunner = soleR;
  const soleM = num(t, /\bsole\s+(?:unit\s+)?(?:on\s+)?(?:the\s+)?(?:trail\s+)?mule\s*(?:to|=|at)?\s*€?(\d+(?:\.\d+)?)/);
  if (soleM !== undefined) patch.soleMule = soleM;
  const sizes = num(t, /\b(\d+)\s*sizes\b/) ?? num(t, /\bsizes\s*(?:to|=)?\s*(\d+)/);
  if (sizes) patch.sizes = sizes;
  if (/custom\s+(outsole|sole|mold)s?\s*(on|yes|true)|use\s+custom\s+(outsole|sole|mold)/.test(t)) patch.customOutsole = true;
  if (/custom\s+(outsole|sole|mold)s?\s*(off|no|false)|catalog\s+soles?/.test(t)) patch.customOutsole = false;
  if (Object.keys(patch).length) {
    actions.push({ type: "assume", patch });
    said.push(
      "Updated " +
        Object.entries(patch)
          .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1").toLowerCase()} → ${typeof v === "boolean" ? (v ? "on" : "off") : v}`)
          .join(", ") + ".",
    );
  }

  // Stories
  const story = STORY_WORDS.find(([re]) => re.test(t))?.[1];
  if (/\bstories\b/.test(t) && !looks.length) {
    said.push(["Colorway stories:", ...STORIES.map((s) => `• ${s.name}: ${s.read}`), "Say “washed denim on look 3” to use one."].join("\n"));
    actions.push({ type: "scroll", id: "stories" });
  } else if (looks.length && /\b(no story|clear story|drop story|palette recipe)\b/.test(t)) {
    for (const i of looks) actions.push({ type: "slot", index: i, patch: { story: undefined } });
    said.push(`Look${looks.length > 1 ? "s" : ""} ${looks.map((i) => `0${i + 1}`).join(", ")} back on the palette recipe.`);
  } else if (story && looks.length && !/\b(cost|price|how much)\b/.test(t)) {
    const st = STORIES.find((s) => s.id === story)!;
    for (const i of looks) actions.push({ type: "slot", index: i, patch: { style: "runner", story } });
    said.push(`Look${looks.length > 1 ? "s" : ""} ${looks.map((i) => `0${i + 1}`).join(", ")} → ${st.name}. ${st.read}${st.flags?.length ? `\nNote: ${st.flags.join(" ")}` : ""}`);
  }

  // Looks
  const style: StyleId | undefined = /\b(trail\s*)?mule\b/.test(t) && !/sole\s+(unit\s+)?(on\s+)?(the\s+)?(trail\s+)?mule|make\s+(on\s+)?(the\s+)?(trail\s+)?mule/.test(t) ? "mule" : /\brunner\b/.test(t) && !/(make|sole)\s+(unit\s+)?(on\s+)?(the\s+)?runner/.test(t) ? "runner" : undefined;
  const recipe = (["hero", "tonal", "inverse"] as RecipeId[]).find((r) => new RegExp(`\\b${r}\\b`).test(t));
  if (looks.length && (style || recipe) && !story && !/\b(cost|price|how much|render)/.test(t)) {
    for (const i of looks) {
      actions.push({ type: "slot", index: i, patch: { ...(style && { style }), ...(recipe && { recipe }) } });
    }
    said.push(`Look${looks.length > 1 ? "s" : ""} ${looks.map((i) => `0${i + 1}`).join(", ")} → ${[style && STYLES[style].short, recipe && RECIPES[recipe].label].filter(Boolean).join(" · ")}.`);
  }

  // Palette
  const colors = story ? [] : findColors(t);
  const paletteIntent = /\b(palette|colou?rs?|colorway|use|try|make it|swap|go|change)\b/.test(t) || colors.length >= 2;
  if (colors.length && /\badd\b/.test(t)) {
    const next = [...new Set([...ctx.palette, ...colors])].slice(0, 7);
    actions.push({ type: "palette", colors: next });
    said.push(`Added ${colors.join(", ")}. Palette is now ${next.length} colors.`);
  } else if (colors.length && /\b(remove|drop)\b/.test(t)) {
    const next = ctx.palette.filter((h) => !colors.includes(h));
    if (next.length) {
      actions.push({ type: "palette", colors: next });
      said.push(`Removed ${colors.join(", ")}.`);
    }
  } else if (colors.length && paletteIntent) {
    actions.push({ type: "palette", colors: colors.slice(0, 7) });
    said.push(`New palette: ${colors.slice(0, 7).join(", ")}. Roles, materials, and costs are recalculated in the studio.`);
  }

  // Questions
  if (/\b(cost|price|retail|margin|landed|fob|how much|budget|cash)\b/.test(t) && !Object.keys(patch).length) {
    if (looks.length) said.push(looks.map((i) => lookCostText(ctx, i)).join("\n\n"));
    else {
      const c = ctx.cost;
      said.push(
        [
          ...c.looks.map((l, i) => `Look 0${i + 1} ${STYLES[l.style].short}: FOB ${eur(l.fob)} · total ${usd(l.totalUsd, 2)} · retail ${usd(l.retailUsd)} · ${pct(l.dtcMargin)}`),
          "",
          `${c.units} pairs. Production ${eur(c.fobTotal, 0)} at FOB, development ${eur(c.devTotal, 0)}, cash out ${eur(c.cashOutEur, 0)} landed.`,
          `Retail value ${usd(c.retailValueUsd)}, blended direct margin ${pct(c.blendedDtcMargin)}.`,
          "Per-pair make, sole, and material rates are estimates until MEES quotes.",
        ].join("\n"),
      );
    }
    actions.push({ type: "scroll", id: "costing" });
  } else if (Object.keys(patch).length) {
    said.push("Nothing else changes. Ask “cost” to see the new numbers.");
  }

  if (/\blab\s*dips?\b|\bdye\b|\bwhat needs\b/.test(t)) {
    const rows = ctx.results.flatMap((r) =>
      r.lines.filter((l) => l.verdict === "lab-dip" || l.verdict === "custom").map((l) => `Look 0${r.index + 1} ${l.component.label}: ${l.match?.article.ref} ΔE ${l.match?.dE.toFixed(1)} → ${VERDICT_INFO[l.verdict].label}`),
    );
    said.push(rows.length ? [...new Set(rows)].join("\n") : "Nothing needs a lab dip. Every sourced component is on card.");
  }

  if (/\b(materials?|consolidat|bom|articles?|cards?)\b/.test(t) && !said.length && !/\b(export|csv|download|spreadsheet)\b/.test(t)) {
    const map = new Map<string, string[]>();
    for (const r of ctx.results) for (const l of r.lines) if (l.match) {
      const k = `${l.match.article.ref} · ${FAMILY_LABEL[l.match.article.family]}`;
      map.set(k, [...(map.get(k) ?? []), `L0${r.index + 1} ${l.component.label}`]);
    }
    said.push([`${map.size} MEES cards across the collection:`, ...[...map].map(([k, v]) => `${k}\n   ${[...new Set(v)].join(", ")}`)].join("\n"));
    actions.push({ type: "scroll", id: "consolidation" });
  }

  const asksSource = /\b(what('s| is)|which|source|sourcing|card|material)\b/.test(t);
  if (asksSource && !said.length) {
    const targets = looks.length ? looks : [0, 1, 2];
    const hits: string[] = [];
    for (const i of targets) {
      const r = ctx.results[i];
      for (const l of r.lines) {
        const words = COMPONENT_WORDS[l.component.id] ?? [l.component.id];
        if (!words.some((w) => t.includes(w))) continue;
        if (l.match) {
          const alts = l.alternatives.map((a) => `${a.article.ref} (ΔE ${a.dE.toFixed(1)})`).join(", ");
          hits.push(`Look 0${i + 1} ${l.component.label}: ${l.match.article.ref}, ${FAMILY_LABEL[l.match.article.family]}, ${l.match.article.path}/${l.match.article.name}. Target ${l.hex}, card ${l.match.cardHex}, ΔE ${l.match.dE.toFixed(1)} → ${VERDICT_INFO[l.verdict].label}.${alts ? ` Alternatives: ${alts}.` : ""}`);
        } else hits.push(`Look 0${i + 1} ${l.component.label}: trim outside the MEES library. Target ${l.hex}. ${l.component.spec}`);
      }
    }
    if (hits.length) said.push(hits.join("\n\n"));
  }

  if (/\b(export|csv|download|spreadsheet)\b/.test(t)) {
    actions.push({ type: "export" });
    said.push("Downloading the material list as CSV. It includes per-pair cost lines.");
  }
  if (/\bprint|pdf\b/.test(t)) {
    actions.push({ type: "print" });
    said.push("Opening the print dialog. Each look prints on its own page.");
  }
  if (/\b(render|hero shot|photo|image|picture)s?\b/.test(t)) {
    const have = ctx.slots.map((s, i) => ({ i, has: ctx.renders.some((r) => r.key === ctx.renderKey(s.style, s.recipe)) }));
    said.push(
      [
        `Renders on file for this palette: ${have.filter((h) => h.has).map((h) => `Look 0${h.i + 1}`).join(", ") || "none"}.`,
        "New photoreal renders are made in the Cursor chat with an image model, using the real MEES swatch photos as references. Ask there with the palette and looks you want, and they land on the look cards.",
      ].join("\n"),
    );
  }

  if (!said.length) {
    return { text: `I didn't catch a change or a question in that.\n\n${HELP}`, actions };
  }
  return { text: said.join("\n\n"), actions };
}
