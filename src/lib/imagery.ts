import { FRAMES, LINE, framesFor, frameSrc, type LineProduct } from "@/lib/line";

/**
 * Pixel sizes of the files already in the repository.
 * A public card uses a frame only when the shorter side is at least 800 pixels.
 * Mees thumbs and the 298px wardrobe boards are recorded here and are not used as heroes.
 */
export const FRAME_PX: Record<number, [number, number]> = {
  1: [1254, 1254], 2: [1254, 1254], 3: [1254, 1254], 4: [1254, 1254], 5: [1254, 1254],
  6: [1086, 1448], 7: [1086, 1448], 8: [1400, 1400], 9: [1086, 1448], 10: [1254, 1254],
  11: [1254, 1254], 12: [1122, 1402], 13: [1122, 1402], 14: [1122, 1402], 15: [1122, 1402],
  16: [1122, 1402], 17: [1122, 1402], 18: [1122, 1402], 19: [1122, 1402], 20: [1122, 1402],
  21: [1122, 1402], 22: [1122, 1402], 23: [1135, 1386], 24: [1024, 1536], 25: [1024, 1536],
  26: [1024, 1536], 27: [1600, 800], 28: [1024, 1536], 29: [1024, 1536], 30: [1024, 1536],
  31: [1024, 1536], 32: [1536, 1024], 33: [1024, 1536], 34: [1536, 1024], 35: [1024, 1536],
  36: [1536, 1024], 37: [1024, 1536], 38: [1024, 1536], 39: [1024, 1536], 40: [1024, 1536],
  41: [1024, 1536], 42: [1024, 1536], 43: [1024, 1536], 44: [1179, 1334], 45: [461, 516],
  46: [461, 503], 47: [574, 1024], 48: [461, 516], 49: [338, 681], 50: [1024, 1536],
  51: [1024, 1536], 52: [1024, 1536], 53: [1024, 1536], 54: [1024, 1536], 55: [1024, 1536],
  56: [1024, 1536], 57: [1024, 1536], 58: [1024, 1536], 59: [1024, 1536],
};

/** Frames that are large on disk but are crops, composites, or known low-resolution panels. */
const HELD_BACK = new Set([34, 45, 46, 47, 48, 49, 54]);

export const MIN_EDGE = 800;

export const frameLarge = (n: number) => {
  const size = FRAME_PX[n];
  if (!size || HELD_BACK.has(n)) return false;
  return Math.min(size[0], size[1]) >= MIN_EDGE;
};

export const publicFrames = () => FRAMES.filter((frame) => frameLarge(frame.n));

export const primaryFrame = (ref: string) => framesFor(ref).find((frame) => frameLarge(frame.n));

export const largeFramesFor = (ref: string) => framesFor(ref).filter((frame) => frameLarge(frame.n));

/** A style appears on the public grid only with a proposed price and a large photograph. */
export const listedLine = (item: LineProduct) => item.status === "proposed" && item.retail != null && Boolean(primaryFrame(item.ref));

export type ImageAssignment = {
  id: string;
  name: string;
  primary: string | null;
  alternates: string[];
  lifestyle: string[];
  width: number | null;
  height: number | null;
  status: "study" | "product-render" | "unassigned";
  confidence: "high" | "review";
  note: string;
};

export function lineAssignments(): ImageAssignment[] {
  return LINE.map((item) => {
    const frames = largeFramesFor(item.ref);
    const primary = frames[0];
    const size = primary ? FRAME_PX[primary.n] : null;
    return {
      id: item.ref,
      name: item.name,
      primary: primary ? frameSrc(primary.n) : null,
      alternates: frames.slice(1).map((frame) => frameSrc(frame.n)),
      lifestyle: [],
      width: size?.[0] ?? null,
      height: size?.[1] ?? null,
      status: primary ? "study" : "unassigned",
      confidence: primary ? "high" : "review",
      note: primary
        ? "Matched to a photograph already linked to this style, and large enough to show."
        : "No photograph in the set is both linked to this style and large enough to show. The record stays in the line data.",
    };
  });
}

/** Matches that were inspected and left unresolved. They are not rendered as product cards. */
export const EDITORIAL_HEROES = [
  { src: "/line/f24.webp", width: 1024, height: 1536 },
  { src: "/line/f34.webp", width: 1536, height: 1024 },
  { src: "/line/f35.webp", width: 1024, height: 1536 },
  { src: "/line/f28.webp", width: 1024, height: 1536 },
  { src: "/line/f50.webp", width: 1024, height: 1536 },
  { src: "/line/f10.webp", width: 1254, height: 1254 },
  { src: "/line/f09.webp", width: 1086, height: 1448 },
  { src: "/hero/saint-john.webp", width: 1856, height: 2304 },
  { src: "/editorial/saint-john-front.webp", width: 928, height: 1198 },
  { src: "/editorial/saint-john-back.webp", width: 928, height: 1198 },
  { src: "/editorial/saint-john-worn.webp", width: 682, height: 1024 },
  { src: "/hero/saint-michael.webp", width: 1792, height: 2400 },
  { src: "/editorial/saint-michael-front.webp", width: 896, height: 1248 },
  { src: "/editorial/saint-michael-back.webp", width: 896, height: 1248 },
  { src: "/stories/chalk-navy.webp", width: 1080, height: 1440 },
  { src: "/stories/washed-denim.webp", width: 1080, height: 1440 },
] as const;

export const UNRESOLVED: ImageAssignment[] = [
  {
    id: "p01-photo",
    name: "Arrival Zip Jacket",
    primary: "/line/f35.webp",
    alternates: ["/line/f34.webp"],
    lifestyle: ["/line/f35.webp"],
    width: 1024,
    height: 1536,
    status: "study",
    confidence: "review",
    note: "The photograph is a navy zip set. The registered board for this jacket is a different art-jacket composite at 1200 pixels, and the 298 pixel trouser board is not used. Brown mules are in the photograph.",
  },
  {
    id: "rn04-in-arrival",
    name: "MADE SAiNT 0929 Runner — Navy / Ivory",
    primary: "/stories/chalk-navy.webp",
    alternates: [],
    lifestyle: ["/line/f35.webp"],
    width: 1080,
    height: 1440,
    status: "product-render",
    confidence: "high",
    note: "The chalk runner is not the brown mule in the Arrival photograph. It is offered as an alternative.",
  },
  {
    id: "rn06-in-off-duty",
    name: "MADE SAiNT 0929 Runner — Washed / Indigo",
    primary: "/stories/washed-denim.webp",
    alternates: [],
    lifestyle: ["/line/f28.webp", "/wardrobe/look-knit-mauve.webp"],
    width: 1080,
    height: 1440,
    status: "product-render",
    confidence: "high",
    note: "The Off-Duty photograph shows a pale blue hiker. An earlier board showed a tan shoe. Neither is the washed-denim runner. The runner stays an alternative.",
  },
  {
    id: "denim-gabriel",
    name: "Saint Gabriel denim jacket study",
    primary: "/line/f09.webp",
    alternates: ["/line/f08.webp", "/line/f24.webp"],
    lifestyle: ["/line/f24.webp"],
    width: 1086,
    height: 1448,
    status: "study",
    confidence: "review",
    note: "Artwork and silhouette are clear. No line style is a Saint Gabriel denim jacket. R014 is a hoodie. The frames stay unassigned.",
  },
  {
    id: "denim-wordmark",
    name: "Wordmark denim jacket study",
    primary: "/line/f10.webp",
    alternates: ["/line/f11.webp", "/line/f28.webp"],
    lifestyle: ["/line/f28.webp"],
    width: 1254,
    height: 1254,
    status: "study",
    confidence: "review",
    note: "The worn look and the flat show the same wordmark jacket. p09 is recorded as a black washed denim jacket, so this blue jacket is not assigned to it.",
  },
  {
    id: "s01",
    name: "Saint John",
    primary: "/editorial/saint-john-worn.webp",
    alternates: ["/hero/saint-john.webp", "/editorial/saint-john-front.webp", "/editorial/saint-john-back.webp"],
    lifestyle: ["/editorial/saint-john-worn.webp"],
    width: 682,
    height: 1024,
    status: "study",
    confidence: "high",
    note: "The worn photograph is used at its native 682 by 1024. It is not enlarged. The sheet remains the front-and-back study. The cap, backpack, and shoes are in the photograph and are not assigned to a style. Not a client and not a production photograph.",
  },
  {
    id: "s02",
    name: "Saint Michael",
    primary: "/hero/saint-michael.webp",
    alternates: ["/editorial/saint-michael-front.webp", "/editorial/saint-michael-back.webp"],
    lifestyle: ["/wardrobe/suit-saint-michael-olive.webp"],
    width: 1792,
    height: 2400,
    status: "study",
    confidence: "high",
    note: "Garment study reframed to the same paper-and-board sheet as Saint John. Olive cloth, chest script, and the Saint Michael the Archangel artwork are kept. The front and back files are crops of that sheet. The older 1200 by 900 board stays on the piece record. Not a client and not a production photograph.",
  },
  {
    id: "transit-image",
    name: "The Transit",
    primary: null,
    alternates: [],
    lifestyle: ["/wardrobe/look-crushed-nylon.webp"],
    width: 298,
    height: 232,
    status: "unassigned",
    confidence: "review",
    note: "The only image on the look is a 298 pixel board. It is kept on the record and left off the public grid.",
  },
];
