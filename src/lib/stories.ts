import type { Texture } from "@/lib/collection";

/** A component in a story: exact color, its texture, and optionally narrower MEES families or pinned cards. */
export type StoryPart = { hex: string; texture?: Texture; families?: string[]; pin?: string[]; material: string };

export type Story = {
  id: string;
  name: string;
  image: string;
  read: string;
  /** Components dropped from the locked flat in this story. */
  omit: string[];
  label: "printed" | "woven";
  parts: Record<string, StoryPart>;
  flags?: string[];
};

const WOVEN_PIN = ["MEES-021", "MEES-020"];
const DENIM_PIN = ["MEES-364"];
const BOUCLE_PIN = ["MEES-433", "MEES-523"];

const overlays = (p: StoryPart, smooth?: StoryPart) => ({
  mudguard: p, saddle: p, quarter: p,
  eyestay: smooth ?? p, tongue: smooth ?? p,
});

export const STORIES: Story[] = [
  {
    id: "navy-intrecciato",
    name: "Navy intrecciato",
    image: "/stories/navy-intrecciato.webp",
    read: "Woven navy leather on the toe, sides and heel; smooth navy eyestay and tongue; sand perforated mesh; navy jersey lining; navy nub sole.",
    omit: ["print", "emblem"],
    label: "printed",
    parts: {
      ...overlays(
        { hex: "#2c323d", texture: "intrecciato", families: ["leather-exotic"], pin: WOVEN_PIN, material: "Woven leather (intrecciato)" },
        { hex: "#363c47", texture: "smooth", families: ["leather-smooth"], material: "Smooth calf" },
      ),
      mesh: { hex: "#b4a387", texture: "perf", material: "Perforated mesh" },
      lining: { hex: "#3b4766", material: "Jersey lining" },
      laces: { hex: "#2a3547", material: "Flat lace" },
      eyelets: { hex: "#2c323d", material: "Painted eyelet" },
      label: { hex: "#5a6580", material: "Printed tongue wordmark" },
      thread: { hex: "#2c323d", material: "Thread" },
      midsole: { hex: "#292f3c", material: "Sole compound" },
      outsole: { hex: "#292f3c", material: "Sole compound" },
      sockliner: { hex: "#232a3a", material: "Microsuede" },
    },
    flags: ["MEES has woven-effect embossed leathers (MEES-020, MEES-021), not hand-woven. Ask MEES whether they can source true intrecciato; it costs well above the estimate here."],
  },
  {
    id: "espresso-oxblood",
    name: "Espresso / oxblood",
    image: "/stories/espresso-oxblood.webp",
    read: "Espresso suede overlays, black mesh, oxblood terry lining and oxblood print, dark brown nub sole.",
    omit: ["print", "emblem"],
    label: "printed",
    parts: {
      ...overlays({ hex: "#3a2e28", texture: "suede", families: ["suede", "vegan-suede"], material: "Suede" }),
      mesh: { hex: "#1b1b1b", texture: "mesh", material: "Air mesh" },
      lining: { hex: "#6e2232", texture: "jersey", material: "Terry / jersey lining" },
      laces: { hex: "#241c19", material: "Flat lace" },
      eyelets: { hex: "#2c2420", material: "Painted eyelet" },
      label: { hex: "#8a2a3c", material: "Printed tongue wordmark" },
      thread: { hex: "#3a2e28", material: "Thread" },
      midsole: { hex: "#2c2725", material: "Sole compound" },
      outsole: { hex: "#2c2725", material: "Sole compound" },
      sockliner: { hex: "#161212", material: "Microsuede" },
    },
  },
  {
    id: "graphite-tonal",
    name: "Graphite tonal",
    image: "/stories/graphite-tonal.webp",
    read: "Charcoal snake-embossed suede, black mesh, black lining, tonal grey print, black nub sole.",
    omit: ["print", "emblem"],
    label: "printed",
    parts: {
      ...overlays({ hex: "#404042", texture: "emboss", families: ["leather-exotic", "vegan-exotic"], material: "Embossed suede" }),
      mesh: { hex: "#252527", texture: "mesh", material: "Air mesh" },
      lining: { hex: "#2a2a2b", material: "Jersey lining" },
      laces: { hex: "#222224", material: "Flat lace" },
      eyelets: { hex: "#303032", material: "Painted eyelet" },
      label: { hex: "#5a5b60", material: "Printed tongue wordmark" },
      thread: { hex: "#404042", material: "Thread" },
      midsole: { hex: "#2f2f30", material: "Sole compound" },
      outsole: { hex: "#2f2f30", material: "Sole compound" },
      sockliner: { hex: "#1a1a1a", material: "Microsuede" },
    },
  },
  {
    id: "chalk-navy",
    name: "Chalk / navy",
    image: "/stories/chalk-navy.webp",
    read: "White bouclé-suede overlays, navy canvas windows, white lining and laces, navy print, navy-black nub sole.",
    omit: ["print", "emblem"],
    label: "printed",
    parts: {
      ...overlays({ hex: "#e4e3e3", texture: "boucle", families: ["pile", "felt"], pin: BOUCLE_PIN, material: "Bouclé / terry" }),
      mesh: { hex: "#1c2433", texture: "canvas", families: ["canvas"], material: "Canvas" },
      lining: { hex: "#e8e8ea", material: "Jersey lining" },
      laces: { hex: "#ececee", material: "Flat lace" },
      eyelets: { hex: "#e4e3e3", material: "Painted eyelet" },
      label: { hex: "#1d2a44", material: "Printed tongue wordmark" },
      thread: { hex: "#e4e3e3", material: "Thread" },
      midsole: { hex: "#25282d", material: "Sole compound" },
      outsole: { hex: "#25282d", material: "Sole compound" },
      sockliner: { hex: "#1a2236", material: "Microsuede" },
    },
    flags: ["White bouclé shows dirt. Ask MEES about a stain-resistant finish."],
  },
  {
    id: "navy-weave-rust",
    name: "Navy weave / rust",
    image: "/stories/navy-weave-rust.webp",
    read: "Woven navy leather throughout the overlays, rust canvas windows, grey lining, rust print, navy nub sole.",
    omit: ["print", "emblem"],
    label: "printed",
    parts: {
      ...overlays({ hex: "#262f36", texture: "intrecciato", families: ["leather-exotic"], pin: WOVEN_PIN, material: "Woven leather (intrecciato)" }),
      mesh: { hex: "#6e3521", texture: "canvas", families: ["canvas"], material: "Canvas" },
      lining: { hex: "#6f7479", material: "Jersey lining" },
      laces: { hex: "#212931", material: "Flat lace" },
      eyelets: { hex: "#262f36", material: "Painted eyelet" },
      label: { hex: "#a5532f", material: "Printed tongue wordmark" },
      thread: { hex: "#262f36", material: "Thread" },
      midsole: { hex: "#1d262e", material: "Sole compound" },
      outsole: { hex: "#1d262e", material: "Sole compound" },
      sockliner: { hex: "#313233", material: "Microsuede" },
    },
    flags: ["Same woven leather as Navy intrecciato. Order both from one hide lot."],
  },
  {
    id: "washed-denim",
    name: "Washed denim",
    image: "/stories/washed-denim.webp",
    read: "Light washed denim overlays, raw indigo denim windows, navy lining, light denim laces, navy print, black nub sole.",
    omit: ["print", "emblem"],
    label: "printed",
    parts: {
      ...overlays({ hex: "#7e97ab", texture: "denim", families: ["canvas"], pin: DENIM_PIN, material: "Washed denim" }),
      mesh: { hex: "#1d2534", texture: "denim", families: ["canvas"], pin: DENIM_PIN, material: "Raw denim" },
      lining: { hex: "#22304a", material: "Jersey lining" },
      laces: { hex: "#7f99b7", material: "Flat lace" },
      eyelets: { hex: "#7e97ab", material: "Painted eyelet" },
      label: { hex: "#102036", material: "Printed tongue wordmark" },
      thread: { hex: "#7e97ab", material: "Thread" },
      midsole: { hex: "#282b32", material: "Sole compound" },
      outsole: { hex: "#282b32", material: "Sole compound" },
      sockliner: { hex: "#1a2232", material: "Microsuede" },
    },
    flags: ["MEES-364 is quilted denim. Ask MEES for the same denim unquilted."],
  },
];

export const storyById = (id?: string) => STORIES.find((s) => s.id === id);
