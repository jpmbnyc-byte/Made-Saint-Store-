export const spec = {
  brand: "MADE SAiNT",
  style: "MS-01",
  name: "HALO",
  file: "MS-01-HALO-TP-A",
  revision: "A",
  date: "19 OCT 2026",
  season: "LAUNCH",
  status: "Sample-room issue",
  construction: "Board-lasted, cemented cupsole",
  reference: "Left shoe · US M 9",
  units: "millimetres",
  sheets: 15,
  dims: {
    overallLength: 300,
    stick: 285,
    insoleLength: 280,
    soleWidthBall: 108,
    soleWidthHeel: 80,
    heelStack: 24,
    foreStack: 16,
    drop: 8,
    toeSpring: 12,
    collarLateral: 60,
    collarMedial: 56,
    foxing: 10,
    tread: 2,
    rubberUnderHeel: 8,
    rubberUnderBall: 6,
    lastingMargin: 14,
    lap: 12,
    backseamAllowance: 8,
    eyeletSpacing: 16,
    eyeletCount: 6,
    laceLength: 1200,
    weight: 320,
    upperSubstance: 1.4,
    bond: 3.5,
    toeBoxHeight: 32,
    heelTab: 14,
  },
} as const;

export type SheetId =
  | "cover"
  | "lateral"
  | "medial"
  | "plan"
  | "sole"
  | "elevations"
  | "section"
  | "exploded"
  | "patterns"
  | "bom"
  | "stitch"
  | "color"
  | "grade"
  | "sequence"
  | "release";

export const sheets: { id: SheetId; title: string }[] = [
  { id: "cover", title: "Cover & intent" },
  { id: "lateral", title: "Lateral" },
  { id: "medial", title: "Medial" },
  { id: "plan", title: "Plan" },
  { id: "sole", title: "Outsole" },
  { id: "elevations", title: "Heel & toe" },
  { id: "section", title: "Section" },
  { id: "exploded", title: "Assembly" },
  { id: "patterns", title: "Pattern logic" },
  { id: "bom", title: "Bill of materials" },
  { id: "stitch", title: "Stitch & bond" },
  { id: "color", title: "Colorways" },
  { id: "grade", title: "Last & grading" },
  { id: "sequence", title: "Sample sequence" },
  { id: "release", title: "Tolerances & release" },
];

export const callouts = [
  { n: 1, bom: "12", title: "Chisel & toe puff", body: "Straight chisel face, raked back. Thermoplastic toe puff, 1.0 mm, holds the flat. Not a pointed toe and not a round toe." },
  { n: 2, bom: "01", title: "Vamp", body: "Full-grain aniline calf, 1.4 mm. Unlined. One piece through the toe. No overlay, no perforations, no mudguard." },
  { n: 3, bom: "—", title: "Halo lap", body: "The only ornament. Quarter laps the vamp 12 mm and is stitched in Tex 60 at 3.2 mm. One arc each side. Do not close the ring across the center." },
  { n: 4, bom: "17", title: "Eyelets", body: "Six pairs. Closed antique-brass eyelets, barrel Ø 4.5 mm. Spacing 16 mm on center. No hooks, no speed loops." },
  { n: 5, bom: "04", title: "Tongue deboss", body: "Blind deboss, 0.4 mm deep, centered 18 mm below the tongue top. MADE over SAiNT. The i-dot is an open ring, 2.4 mm." },
  { n: 6, bom: "02", title: "Quarter", body: "Same calf as the vamp. Front edge is the halo. Lateral and medial are a pair, not the same pattern: medial collar finishes 4 mm lower." },
  { n: 7, bom: "08", title: "Collar binding", body: "Same calf, cut on the bias, skived to 0.7 mm. Finished width 5 mm. Raw edge, no paint, no burnish ink." },
  { n: 8, bom: "07", title: "Heel tab", body: "Rises 14 mm above the collar. Debossed open ring, 6 mm outside diameter. Centered on the backstay. Not a pull loop." },
  { n: 9, bom: "11", title: "Heel counter", body: "Molded thermoplastic counter under the quarter lining. Dashed zone on the drawing. Not visible outside." },
  { n: 10, bom: "16", title: "Foxing", body: "Part of the one-piece cupsole, 10 mm high. No separate foxing strip and no foxing stitch." },
  { n: 11, bom: "16", title: "Tread & pivot", body: "Tread depth 2.0 mm. Herringbone in the forefoot. Open ring molded in the ball pivot. Do not cut a flex groove through the ring." },
  { n: 12, bom: "16", title: "Heel breast", body: "Molded MS, 8 mm cap height, 0.8 mm proud, in the heel. A 16 mm ring is recessed into the heel foxing, 1.0 mm deep, not punched through." },
] as const;

export const bom: {
  ref: string;
  component: string;
  material: string;
  spec: string;
  qty: string;
  note: string;
}[] = [
  { ref: "01", component: "Vamp", material: "Aniline calf, full grain", spec: "1.3–1.5 mm, target 1.4 mm. Tight direction across the toe.", qty: "2", note: "Unlined. Pair skins within 0.1 mm." },
  { ref: "02", component: "Quarter, lateral", material: "Aniline calf, full grain", spec: "1.4 mm. Stretch heel-to-toe.", qty: "2", note: "Includes 12 mm lap and 8 mm backseam allowance." },
  { ref: "03", component: "Quarter, medial", material: "Aniline calf, full grain", spec: "1.4 mm. Collar 4 mm lower than lateral.", qty: "2", note: "Mirror is not acceptable. Cut from its own pattern." },
  { ref: "04", component: "Tongue", material: "Aniline calf, full grain", spec: "1.4 mm, lined.", qty: "2", note: "Deboss before assembly. See callout 5." },
  { ref: "05", component: "Tongue gusset", material: "Aniline calf", spec: "1.0 mm, skived.", qty: "4", note: "Closes the throat. Bartack at the base." },
  { ref: "06", component: "Eyestay reinforcement", material: "Nonwoven", spec: "0.8 mm × 18 mm.", qty: "4", note: "Under the eyelet row only." },
  { ref: "07", component: "Heel tab", material: "Aniline calf", spec: "1.4 mm. Rises 14 mm.", qty: "2", note: "Deboss the ring before attaching." },
  { ref: "08", component: "Collar binding", material: "Aniline calf, bias", spec: "Cut 16 mm, skive to 0.7 mm, finish 5 mm.", qty: "2", note: "One piece around the collar. No join on the center back." },
  { ref: "09", component: "Quarter lining", material: "Pearl kid", spec: "0.6 mm, color to match the upper.", qty: "4", note: "Vamp stays unlined." },
  { ref: "10", component: "Tongue lining", material: "Pearl kid", spec: "0.6 mm.", qty: "2", note: "Edge sits inside the deboss zone." },
  { ref: "11", component: "Heel counter", material: "Molded thermoplastic", spec: "1.4 mm, skived edge.", qty: "2", note: "Plus a leather counter cover in the lining." },
  { ref: "12", component: "Toe puff", material: "Thermoplastic toe puff", spec: "1.0 mm.", qty: "2", note: "Must hold the chisel flat after de-lasting." },
  { ref: "13", component: "Backseam tape", material: "Nylon tape", spec: "14 mm.", qty: "2", note: "Over the closed backseam, inside." },
  { ref: "14", component: "Insole board", material: "Cellulose insole board", spec: "2.0 mm. No steel shank.", qty: "2", note: "The cupsole is the shank." },
  { ref: "15", component: "Sockliner", material: "Vegetable-tanned leather", spec: "1.2 mm, removable.", qty: "2", note: "Heel only is taped, so it can be lifted. Stamp size, L/R, MS-01, ring." },
  { ref: "16", component: "Cupsole", material: "Compression-molded rubber", spec: "One piece. RELIC 55±3 Shore A. VESPER 62±3 Shore A.", qty: "2", note: "Foxing, tread, pivot ring, heel ring, and MS are in the mold. No separate foxing." },
  { ref: "17", component: "Eyelets", material: "Antique brass, CuZn", spec: "Closed. Barrel Ø 4.5 mm, flange Ø 8.0 mm.", qty: "24", note: "Short barrel for 1.4 mm calf + 0.8 mm reinforcement. No nickel, no gold tone." },
  { ref: "18", component: "Lace", material: "Waxed flat cotton", spec: "8 mm × 1200 mm. Aglet 18 mm, same metal as the eyelet.", qty: "2", note: "RELIC lace is ink. VESPER lace is bone." },
  { ref: "19", component: "Thread, structural", material: "Bonded polyester", spec: "Tex 40. Stitch length 2.2–2.5 mm.", qty: "—", note: "Collar, backseam, eyestay, tongue. Color follows the upper." },
  { ref: "20", component: "Thread, halo", material: "Bonded polyester", spec: "Tex 60. Stitch length 3.2 mm.", qty: "—", note: "RELIC stitch is ink. VESPER stitch is bone. This is the line you should see." },
  { ref: "21", component: "Cement & primer", material: "PU cement + rubber primer", spec: "Primer matched to the sole compound.", qty: "—", note: "State the primer on the quote. Bond target 3.5 N/mm." },
  { ref: "22", component: "Packing", material: "Tissue, cotton bag, board box", spec: "Box 330 × 200 × 110 mm, bone board.", qty: "1 set", note: "Proto dust bag is a drawstring, no zipper. Wordmark on the lid, size sticker inside the lid." },
];

export const stitches: {
  op: string;
  iso: string;
  thread: string;
  length: string;
  margin: string;
  note: string;
}[] = [
  { op: "Halo lap, each side", iso: "301", thread: "Tex 60", length: "3.2 mm", margin: "8 mm from the quarter edge", note: "Quarter on top of vamp. One row. Do not topstitch a second decorative row." },
  { op: "Backseam", iso: "301 × 2", thread: "Tex 40", length: "2.5 mm", margin: "1.2 mm and 2.8 mm from the folded edge", note: "Closed seam. Tape inside. Join not visible through the tab." },
  { op: "Collar binding", iso: "301", thread: "Tex 40", length: "2.2 mm", margin: "1.5 mm from the finished edge", note: "Binding finish 5 mm. Start and stop under the tongue, not at the back." },
  { op: "Eyestay topstitch", iso: "301", thread: "Tex 40", length: "2.2 mm", margin: "2.0 mm from the throat edge", note: "Stops at the first and last eyelet. Does not cross the halo." },
  { op: "Tongue to gusset", iso: "301", thread: "Tex 40", length: "2.2 mm", margin: "1.8 mm", note: "Bartack 8 mm at the base of the throat, both sides." },
  { op: "Heel tab", iso: "301", thread: "Tex 40", length: "2.2 mm", margin: "1.5 mm", note: "Box the tab. Do not stitch through the debossed ring." },
];

export const sequence: { op: string; name: string; machine: string; spec: string }[] = [
  { op: "01", name: "Click", machine: "Clicker, or hand click for this pull", spec: "Nap heel-to-toe on quarters. Pair within 0.1 mm substance. Pieces on sheet 09 are panel logic, not a nest." },
  { op: "02", name: "Skive", machine: "Skiver", spec: "Lap 12 mm down to 0.6 mm. Collar to 0.7 mm. Lasting margin to 0.8 mm. Backseam 8 mm to 0.7 mm." },
  { op: "03", name: "Reinforce", machine: "Bench", spec: "Toe puff in the chisel. Eyestay tape under the eyelet row. Do not fuse the whole quarter." },
  { op: "04", name: "Halo", machine: "Post-bed, single needle", spec: "Lateral, then medial. Tex 60, 3.2 mm. Open 12 mm at center. See sheet 11." },
  { op: "05", name: "Backseam", machine: "Post-bed", spec: "Two rows. Tape 14 mm inside. Insert the counter before the lining is closed over it." },
  { op: "06", name: "Collar & tab", machine: "Post-bed", spec: "Bias binding, finished 5 mm. Tab centered on the backstay. Ring already debossed." },
  { op: "07", name: "Eyelets", machine: "Eyelet press", spec: "Six pairs, 16 mm centers. Clinch tight. No burr on the kid lining." },
  { op: "08", name: "Tongue", machine: "Post-bed", spec: "Gussets in. Bartack 8 mm. Deboss is already in the tongue. Do not crush it in the clamp." },
  { op: "09", name: "Last", machine: "MS-LAST-01, US M 9", spec: "Board last. Seat the chisel flat. If the crust is firm, mull and leave 24 h. Send a side photo on the last before sole press." },
  { op: "10", name: "Last", machine: "Side, heel, then toe", spec: "Lasting margin 14 mm. Hand lasting is acceptable on this three-pair pull if the margin matches. Not acceptable in production." },
  { op: "11", name: "Set", machine: "Heat setter, or time", spec: "80 seconds if a setter is in the room. Otherwise 24 h on the last. Pound the feather." },
  { op: "12", name: "Sole", machine: "Cement press", spec: "Rough the margin, prime the rubber, cement both faces, dry, press 4 bar for 15 seconds at heel and at forefoot. Wipe squeeze-out while it is wet." },
  { op: "13", name: "Finish", machine: "Bench", spec: "De-last after 30 minutes. Insert the sockliner, heel taped only. Tie the lace in a standard bow." },
  { op: "14", name: "QC", machine: "Against this file", spec: "Mark REV A and the size inside the collar. One pair of the three is sacrificed for the peel test. Do not ship the wearable pairs if peel is under 3.5 N/mm." },
];

export const sizes: { usM: number; usW: number; uk: number; eu: number; mondo: number }[] = [
  { usM: 7, usW: 8.5, uk: 6, eu: 40, mondo: 250 },
  { usM: 7.5, usW: 9, uk: 6.5, eu: 40.5, mondo: 255 },
  { usM: 8, usW: 9.5, uk: 7, eu: 41, mondo: 260 },
  { usM: 8.5, usW: 10, uk: 7.5, eu: 41.5, mondo: 265 },
  { usM: 9, usW: 10.5, uk: 8, eu: 42.5, mondo: 270 },
  { usM: 9.5, usW: 11, uk: 8.5, eu: 43, mondo: 275 },
  { usM: 10, usW: 11.5, uk: 9, eu: 44, mondo: 280 },
  { usM: 10.5, usW: 12, uk: 9.5, eu: 44.5, mondo: 285 },
  { usM: 11, usW: 12.5, uk: 10, eu: 45, mondo: 290 },
  { usM: 11.5, usW: 13, uk: 10.5, eu: 45.5, mondo: 295 },
  { usM: 12, usW: 13.5, uk: 11, eu: 46, mondo: 300 },
  { usM: 13, usW: 14.5, uk: 12, eu: 47.5, mondo: 310 },
];

export function gradedStick(usM: number) {
  const steps = (usM - 9) / 0.5;
  return Math.round((285 + steps * 4.23) * 10) / 10;
}

export function gradedGirth(usM: number) {
  const steps = (usM - 9) / 0.5;
  return Math.round((248 + steps * 3.2) * 10) / 10;
}

export const colorways = [
  {
    id: "relic",
    code: "MS-01-REL",
    name: "RELIC",
    role: "Launch color. Pull this first.",
    upper: "Bone aniline calf. Undyed crust is acceptable if the fat liquor is even.",
    stitch: "Ink",
    sole: "Gum, 55±3 Shore A. It will mark floors. Do not promise non-marking.",
    lace: "Ink",
    swatch: { upper: "#e4d7c2", sole: "#c6a36a", stitch: "#1b1916", lace: "#1b1916" },
  },
  {
    id: "vesper",
    code: "MS-01-VES",
    name: "VESPER",
    role: "Second color. Same patterns, same last, same mold family.",
    upper: "Ink aniline calf. Not corrected grain, not patent.",
    stitch: "Bone",
    sole: "Black, 62±3 Shore A, non-marking compound.",
    lace: "Bone",
    swatch: { upper: "#23211f", sole: "#2a2926", stitch: "#e6dcc8", lace: "#e6dcc8" },
  },
] as const;

export const openItems = [
  "Digitize last MS-LAST-01 from sheet 13 and send a side photograph on the last before any hide is clicked.",
  "Develop patterns on that last. Sheet 09 is panel logic. Add 14 mm lasting allowance beyond the feather. Do not add a second allowance on the lap.",
  "Submit calf for RELIC and VESPER. Approve both in daylight and under 5000 K. No lab dip exists yet.",
  "Cut a silicone or resin sole from this tread plan and approve it before steel. One cavity, US M 9, left and right.",
  "State the rubber primer on the quote. Peel-test one pair. Target 3.5 N/mm. Wearable pairs wait on that number.",
  "Confirm eyelet metal against a chip: antique brass, not gold-tone, not nickel.",
];
