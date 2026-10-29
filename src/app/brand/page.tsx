import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CONCEPT_PALETTE, assignRoles, buildCollection } from "@/lib/collection";
import { STORIES } from "@/lib/stories";
import { RunnerFlat, type RunnerVariant } from "@/components/flats/runner";
import { MARK_PLACEMENTS, tonalMark, type MarkPlacementId } from "@/components/flats/mark";

export const metadata: Metadata = {
  title: "MADE SAiNT · wave side mark",
  description: "Placement study and specification for the molded TPU wave on both quarter panels of the runner.",
  robots: { index: false, follow: false },
};

const PAPER = "#f4f0e6";
/** Heel-to-toe length on the lateral flat, in flat units, and a US 9 last length in mm. */
const FLAT_LENGTH = 526;
const LAST_MM = 275;
const MM = LAST_MM / FLAT_LENGTH;

const RULES = [
  ["Length", "Centred at half the shoe length, spanning about 37% to 63%: the mark owns the midfoot, between the heel overlay and the toe."],
  ["Top", "Tucked against the eyestay, as if the lacing sits on it. No gap that makes it float."],
  ["Bottom", "Ends on the lower overlay, about a sixth of the side height above the midsole. Never on the foam."],
  ["Height", "Fills about 80% of the side between eyestay and midsole."],
  ["Lean", "15° forward, the italic of the letter, not the rake of the panels."],
  ["Layering", "Sits on top of every panel and crosses the seams, so it reads as one graphic, not a panel filler."],
  ["Keyline", "A border a step darker than the mark separates it from mesh and suede."],
  ["Front", "Stops short of the forefoot flex zone."],
];

const STUDY: { id: MarkPlacementId; verdict: "Locked" | "Previous" | "Alternative" | "Rejected"; points: string[] }[] = [
  {
    id: "midfoot",
    verdict: "Locked",
    points: [
      "Placed by the 9060 rules: centred at half length, top tucked under the eyestay, bottom on the lower overlay",
      "Crosses the mesh window and the saddle, so it holds the side together",
      "Stops before the forefoot flex zone, so the overlay does not stiffen the crease",
    ],
  },
  {
    id: "quarter",
    verdict: "Previous",
    points: ["Sat too far back and ran down to the midsole, so it read as a heel graphic", "The 20° rake fought the letter's own italic"],
  },
  {
    id: "window",
    verdict: "Alternative",
    points: ["Contained in the rear mesh window, cheapest to make", "Too small to carry the brand from across a room"],
  },
  {
    id: "full",
    verdict: "Rejected",
    points: ["Reads as borrowed from the 700 MNVN", "Runs through the forefoot flex zone, where bonded film cracks"],
  },
];

const tone = { Locked: "bg-[#2f5d3a] text-white", Previous: "bg-[#22201d]/10", Alternative: "bg-[#22201d]/10", Rejected: "bg-[#9a3b2c]/12 text-[#9a3b2c]" };

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
  const q = MARK_PLACEMENTS.midfoot;
  const tones = tonalMark(hero.colors.quarter);
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
              A long three-peak zig-zag wave in molded TPU, not a letter M and not a stitched channel. It sits on the quarter mesh
              of both the lateral and the medial, peaks toward the laces, tonal to the overlay, keylined a step darker. Placement
              follows the 9060 midfoot rules; the wave is our own.
            </p>
            <a href="/brand/m-mark.svg" download className="mt-4 inline-block font-mono text-[11px] tracking-[0.1em] uppercase underline underline-offset-4">
              Download vector
            </a>
          </div>
        </section>

        <section className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-5">
          <h2 className="font-serif text-3xl">What the 9060 teaches</h2>
          <p className="mt-1 max-w-3xl text-[13px] text-[#22201d]/65">Measured from the lateral view of the New Balance 9060, applied to our locked flat.</p>
          <dl className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {RULES.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[90px_1fr] gap-3 border-t border-[#22201d]/10 pt-3 text-[13px]">
                <dt className="font-mono text-[10px] tracking-[0.1em] text-[#22201d]/55 uppercase">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Placement</h2>
          <p className="mt-1 max-w-3xl text-[13px] text-[#22201d]/65">
            Four positions on the locked lateral flat, all tonal. The red band is the forefoot flex zone, where the upper creases on every step.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {STUDY.map((s) => {
              const variant: RunnerVariant = { mark: s.id, guides: true };
              return (
                <div key={s.id} className={`rounded-xl border bg-[#fbf8f2] p-4 ${s.verdict === "Locked" ? "border-[#22201d] shadow-sm" : "border-[#22201d]/15"}`}>
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
            <h2 className="font-serif text-3xl">Specification, locked</h2>
            <RunnerFlat colors={hero.colors} view="lateral" paper={PAPER} variant={{ mark: "midfoot" }} className="mt-3 [&_svg]:h-auto [&_svg]:w-full" />
          </div>
          <dl className="divide-y divide-[#22201d]/10 self-center text-[13px]">
            {[
              ["Position", "Lateral and medial quarter panels, matching pair. Four marks on a pair."],
              ["Size, US 9", `About ${markW} × ${markH} mm. Grade with the pattern, not by a fixed size.`],
              ["Lean", `${Math.abs(q.lean)}° forward`],
              ["Span", "37% to 63% of length from the heel"],
              ["Top", "Tucked against the eyestay edge, under the third and fourth eyelets"],
              ["Bottom", "About 5 mm above the midsole line, on the lower overlay"],
              ["Swatch", `Fill ${tones.fill}, keyline ${tones.keyline} on overlay ${hero.colors.quarter}`],
              ["Colour", "Tonal only: mark one step lighter than the overlay, keyline one step darker"],
              ["Stroke", "Solid molded TPU, about 8 mm wide, three peaks toward the laces"],
              ["Material", "Glossy molded TPU, tonal to the overlay. Silver or contrast versions are not used."],
              ["Process", "Molded and bonded to the quarter window on the closed upper before lasting"],
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
          <p className="mt-1 max-w-3xl text-[13px] text-[#22201d]/65">Locked placement, tonal on every story. The tone is derived from each colorway&apos;s overlay.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((r) => {
              const t = tonalMark(r.colors.quarter);
              return (
                <div key={r.story} className="rounded-xl border border-[#22201d]/15 bg-[#fbf8f2] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-serif text-xl">{r.storyData?.name}</p>
                    <span className="flex gap-1">
                      {[r.colors.quarter, t.fill, t.keyline].map((h) => <span key={h} className="size-4 rounded-sm border border-black/15" style={{ background: h }} title={h} />)}
                    </span>
                  </div>
                  <RunnerFlat colors={r.colors} view="lateral" paper={PAPER} variant={{ textures: r.textures, grid: false, mark: "midfoot" }} className="mt-2 [&_svg]:h-auto [&_svg]:w-full" />
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Renders, tonal</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["/hero/look1-runner-hero.webp", "/hero/look3-runner-inverse.webp", "/hero/look2-mule-tonal.webp"].map((f) => (
              <Image key={f} src={f} alt="Tonal M render" width={1280} height={720} className="w-full rounded-xl" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
