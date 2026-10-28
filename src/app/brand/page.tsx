import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CONCEPT_PALETTE, assignRoles, buildCollection } from "@/lib/collection";
import { STORIES } from "@/lib/stories";
import { mix } from "@/lib/color";
import { RunnerFlat, type RunnerVariant } from "@/components/flats/runner";
import { MARK_PLACEMENTS, type MarkPlacementId } from "@/components/flats/mark";

export const metadata: Metadata = {
  title: "MADE SAiNT · M side mark",
  description: "Placement study and specification for the reflective M side mark on the runner.",
};

const PAPER = "#f4f0e6";
const REFLECTIVE = "#b9bbbd";
/** Heel-to-toe length on the lateral flat, in flat units, and a US 9 last length in mm. */
const FLAT_LENGTH = 526;
const LAST_MM = 275;
const MM = LAST_MM / FLAT_LENGTH;

const STUDY: { id: MarkPlacementId; verdict: "Recommended" | "Alternative" | "Rejected"; points: string[] }[] = [
  {
    id: "quarter",
    verdict: "Recommended",
    points: [
      "Owns the side of the shoe like the reference, but stays behind the flex zone, so the film never creases",
      "Leans with the saddle and the eyestay, so the M reads as motion, not a sticker",
      "Bridges the heel overlay and the mesh window; peaks tuck under the eyestay, feet stop on the midsole line",
      "Crosses the quarter overlay and mesh: bond it to the closed upper before lasting",
    ],
  },
  {
    id: "window",
    verdict: "Alternative",
    points: [
      "The quiet option: contained in the rear mesh window, no seams crossed",
      "Can be cut from one piece and bonded to the flat mesh panel, the cheapest to make",
      "Too small to carry the brand from across a room",
    ],
  },
  {
    id: "full",
    verdict: "Rejected",
    points: [
      "Closest to the 700 MNVN, and that is the problem: it reads as borrowed",
      "Runs through the forefoot flex zone, where bonded film cracks and lifts within weeks",
      "Fights the saddle and mudguard lines instead of working with them",
    ],
  },
  {
    id: "heel",
    verdict: "Rejected",
    points: [
      "Tidy, but the heel counter is already where the tongue label leads the eye",
      "Lost in the curve of the heel from the side",
    ],
  },
];

const tone = { Recommended: "bg-[#2f5d3a] text-white", Alternative: "bg-[#22201d]/10", Rejected: "bg-[#9a3b2c]/12 text-[#9a3b2c]" };

function looks() {
  const tones = assignRoles(CONCEPT_PALETTE);
  return buildCollection(
    tones,
    STORIES.map((s) => ({ style: "runner" as const, recipe: "hero" as const, story: s.id })),
  );
}

export default function BrandPage() {
  const hero = buildCollection(assignRoles(CONCEPT_PALETTE), [{ style: "runner", recipe: "hero" }])[0];
  const stories = looks();
  const q = MARK_PLACEMENTS.quarter;
  const markW = Math.round((442 - 58 + 54) * q.sx * MM + Math.abs(Math.tan((q.lean * Math.PI) / 180)) * 226 * q.sy * MM);
  const markH = Math.round((204 - 32 + 54) * q.sy * MM);

  return (
    <div className="min-h-screen bg-[#efe9dd] text-[#22201d]">
      <header className="sticky top-0 z-20 border-b border-[#22201d]/10 bg-[#efe9dd]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-serif text-2xl leading-none">MADE SAiNT</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[#22201d]/60 uppercase">M side mark · placement study</p>
          </div>
          <nav className="flex flex-wrap gap-4 font-mono text-[11px] tracking-[0.1em] text-[#22201d]/60 uppercase">
            <Link href="/studio" className="hover:text-[#22201d]">Studio</Link>
            <Link href="/launch" className="hover:text-[#22201d]">Launch plan</Link>
            <Link href="/shop" className="hover:text-[#22201d]">Shop</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-6">
        <section className="grid items-center gap-6 rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-5 md:grid-cols-[320px_1fr]">
          <div className="rounded-lg bg-[#1c1a17] p-6 text-[#b9bbbd]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/m-mark.svg" alt="MADE SAiNT M mark" className="w-full invert" />
          </div>
          <div>
            <h1 className="font-serif text-4xl leading-none">The M</h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#22201d]/75">
              A wide, forward-leaning monoline M with an inline channel, carried over from the nested-bar mark. Bonded reflective film,
              flush, no stitching. Inspired by the scale and finish of the 700 MNVN graphics; the letterform and placement are our own.
            </p>
            <a href="/brand/m-mark.svg" download className="mt-4 inline-block font-mono text-[11px] tracking-[0.1em] uppercase underline underline-offset-4">
              Download vector
            </a>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Placement</h2>
          <p className="mt-1 max-w-3xl text-[13px] text-[#22201d]/65">
            Four positions on the locked lateral flat. The red band is the forefoot flex zone, where the upper creases on every step.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {STUDY.map((s) => {
              const variant: RunnerVariant = { mark: s.id, markColor: REFLECTIVE, guides: true };
              return (
                <div key={s.id} className={`rounded-xl border bg-[#fbf8f2] p-4 ${s.verdict === "Recommended" ? "border-[#22201d] shadow-sm" : "border-[#22201d]/15"}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-2xl">{MARK_PLACEMENTS[s.id].name}</h3>
                    <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase ${tone[s.verdict]}`}>{s.verdict}</span>
                  </div>
                  <RunnerFlat colors={hero.colors} view="lateral" paper={PAPER} variant={variant} className="mt-3 [&_svg]:h-auto [&_svg]:w-full" />
                  <ul className="mt-3 space-y-1 text-[13px]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="mt-2 h-px w-3 shrink-0 bg-[#22201d]/40" />{p}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-5 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl">Specification, quarter sweep</h2>
            <RunnerFlat colors={hero.colors} view="lateral" paper={PAPER} variant={{ mark: "quarter", markColor: REFLECTIVE }} className="mt-3 [&_svg]:h-auto [&_svg]:w-full" />
          </div>
          <dl className="divide-y divide-[#22201d]/10 self-center text-[13px]">
            {[
              ["Position", "Lateral quarter only. Medial side stays clean."],
              ["Size, US 9", `About ${markW} × ${markH} mm. Grade with the pattern, not by a fixed size.`],
              ["Lean", `${Math.abs(q.lean)}° forward, between the eyestay and saddle angles`],
              ["Top", "Leading peak 4 mm below the eyestay edge"],
              ["Bottom", "Feet end 2 mm above the midsole line, never on the foam"],
              ["Rear", "Rear foot on the heel overlay, about 40 mm ahead of the back seam"],
              ["Front", "Ends before the saddle, under half the shoe length; the flex zone starts at 65%"],
              ["Stroke", "Inline channel 2 mm, panel shows through"],
              ["Material", "Heat-transfer reflective film, matte silver or tonal reflective"],
              ["Process", "Bonded after closing, before lasting, on a contoured press"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 py-2">
                <dt className="font-mono text-[10px] tracking-[0.1em] text-[#22201d]/55 uppercase">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Across the colorways</h2>
          <p className="mt-1 max-w-3xl text-[13px] text-[#22201d]/65">
            Quarter sweep on every story. Top row in silver reflective; bottom row in tonal reflective, a shade lighter than the overlay, which only flashes under light.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((r) => {
              const base: RunnerVariant = { textures: r.textures, grid: false, label: r.storyData?.label, mark: "quarter" };
              const overlay = r.colors.quarter;
              return (
                <div key={r.story} className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-3">
                  <p className="font-serif text-xl">{r.storyData?.name}</p>
                  <RunnerFlat colors={r.colors} view="lateral" paper={PAPER} variant={{ ...base, markColor: REFLECTIVE }} className="mt-2 [&_svg]:h-auto [&_svg]:w-full" />
                  <RunnerFlat colors={r.colors} view="lateral" paper={PAPER} variant={{ ...base, markColor: mix(overlay, "#ffffff", 0.22) }} className="mt-1 [&_svg]:h-auto [&_svg]:w-full" />
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Concept renders</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["m-concept-runner-placed", "m-concept-runner-aubergine", "m-concept-mule", "m-concept-runner-oversized"].map((f) => (
              <Image key={f} src={`/brand/${f}.webp`} alt={f} width={1280} height={720} className="w-full rounded-xl" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
