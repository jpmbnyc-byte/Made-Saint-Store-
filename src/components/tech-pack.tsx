"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  bom,
  callouts,
  colorways,
  gradedGirth,
  gradedStick,
  openItems,
  sequence,
  sheets,
  sizes,
  spec,
  stitches,
  type SheetId,
} from "@/lib/spec";
import {
  ExplodedShoe,
  HeelElevation,
  LateralShoe,
  PatternSheet,
  PlanShoe,
  SectionShoe,
  SoleShoe,
  ToeElevation,
} from "@/components/draw/shoe";

function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <div className={large ? "wordmark wordmark-lg" : "wordmark"}>
      <span className="made">MADE</span>
      <span className="saint">
        SA<span className="idot">ı</span>NT
      </span>
    </div>
  );
}

function SheetFrame({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className="sheet" id={sheets[index].id}>
      <header className="sheet-head">
        <Wordmark />
        <div className="sheet-title">
          <p>MS-01 HALO · {spec.file}</p>
          <h2>
            <span>{num}</span> {title}
          </h2>
        </div>
        <div className="stamp">Proto · Rev {spec.revision}</div>
      </header>
      <div className="sheet-body">{children}</div>
      <footer className="titleblock">
        <div>
          <b>Style</b>
          <span>{spec.style}</span>
        </div>
        <div>
          <b>Name</b>
          <span>{spec.name}</span>
        </div>
        <div>
          <b>Rev / date</b>
          <span>
            {spec.revision} · {spec.date}
          </span>
        </div>
        <div>
          <b>Reference</b>
          <span>{spec.reference}</span>
        </div>
        <div>
          <b>Units</b>
          <span>mm · do not scale</span>
        </div>
        <div>
          <b>Build</b>
          <span>Cemented cupsole</span>
        </div>
        <div>
          <b>Sheet</b>
          <span>
            {num} / {String(sheets.length).padStart(2, "0")}
          </span>
        </div>
      </footer>
    </article>
  );
}

function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cover({ onJump }: { onJump: (id: SheetId) => void }) {
  return (
    <div className="stack">
      <div className="split">
        <div>
          <p className="kicker">Launch shoe · development specification</p>
          <h3 className="intent-name">
            MS-01 <em>Halo</em>
          </h3>
          <p className="prose">
            One low shoe. Board-lasted calf, cemented into a one-piece cupsole.
            The only ornament is a lapped arc on each quarter — the halo — which
            is also the ring over the i in the wordmark. No overlay, no perforations,
            no foxing stitch, no metal logo.
          </p>
          <p className="prose">
            This Rev A is what a sample room quotes and pulls from. It is not a
            graded production file. The last is design intent until it is digitized.
            The pattern sheet is panel logic, not a nest. Where a picture and a
            figure disagree, the figure in the tables governs.
          </p>
          <dl className="facts">
            <div>
              <dt>Construction</dt>
              <dd>{spec.construction}</dd>
            </div>
            <div>
              <dt>Reference</dt>
              <dd>US M 9 / UK 8 / EU 42.5 / JP 270</dd>
            </div>
            <div>
              <dt>Stacks</dt>
              <dd>
                Heel {spec.dims.heelStack} · forefoot {spec.dims.foreStack} · drop {spec.dims.drop}
              </dd>
            </div>
            <div>
              <dt>First pull</dt>
              <dd>3 pairs, US M 9, RELIC only</dd>
            </div>
          </dl>
        </div>
        <figure className="hero-fig">
          <LateralShoe paint="relic" />
          <figcaption>RELIC · bone calf, ink stitch, gum cupsole. Dimensioned lateral is sheet 02.</figcaption>
        </figure>
      </div>
      <div className="three">
        <section>
          <h3>Pull order</h3>
          <ol className="plain">
            <li>Digitize MS-LAST-01. Photograph it from the side before clicking.</li>
            <li>Click three pairs of RELIC at US M 9. One pair is for the peel test.</li>
            <li>Do not grade, and do not cut VESPER, until the fit sample is signed on sheet 15.</li>
          </ol>
        </section>
        <section>
          <h3>Open before steel</h3>
          <ul className="checks">
            {openItems.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Sheets</h3>
          <ol className="index">
            {sheets.map((sheet, i) => (
              <li key={sheet.id}>
                <button type="button" onClick={() => onJump(sheet.id)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {sheet.title}
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function LateralSheet() {
  const [active, setActive] = useState<number>(3);
  const note = callouts.find((c) => c.n === active) ?? callouts[0];
  return (
    <div className="stack">
      <figure className="draw-frame">
        <LateralShoe markers dims internals active={active} onMarker={setActive} />
      </figure>
      <div className="split align-start">
        <div className="callout-read">
          <p className="kicker">Callout {note.n} · BOM {note.bom}</p>
          <h3>{note.title}</h3>
          <p className="prose">{note.body}</p>
        </div>
        <div className="legend">
          {callouts.map((c) => (
            <button
              key={c.n}
              type="button"
              aria-pressed={c.n === active}
              className={c.n === active ? "on" : ""}
              onClick={() => setActive(c.n)}
            >
              <span>{c.n}</span>
              {c.title}
            </button>
          ))}
        </div>
      </div>
      <Table
        columns={["Figure", "mm", "Where measured", "Tolerance"]}
        rows={[
          ["Overall length", "300", "Sole toe to sole heel, on the ground line", "±1.0"],
          ["Heel stack", "24", "Ground to feather at the heel", "±0.8"],
          ["Forefoot stack", "16", "Ground to feather at the ball", "±0.8"],
          ["Drop", "8", "Heel feather minus forefoot feather", "±1.0"],
          ["Toe spring", "12", "Toe tip of the sole off the ground, ball and heel planted", "±1.5"],
          ["Collar, lateral", "60", "Feather to topline at the achilles, lateral", "±2.0"],
          ["Collar, medial", "56", "Same measure, medial. See sheet 03.", "±2.0"],
          ["Weight", "320 g", "One shoe, US M 9, with lace and sockliner", "±20 g"],
        ]}
      />
    </div>
  );
}

export function TechPack() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.replace("#", "");
      const next = sheets.findIndex((s) => s.id === id);
      if (next >= 0) setIndex(next);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(Math.min(sheets.length - 1, index + 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(Math.max(0, index - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  function go(next: number) {
    setIndex(next);
    const id = sheets[next].id;
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <div className="bench">
      <header className="chrome">
        <div className="chrome-brand">
          <Wordmark />
          <div>
            <strong>MS-01 HALO</strong>
            <p>Rev {spec.revision} · {spec.date}</p>
          </div>
        </div>
        <div className="chrome-actions">
          <Button
            variant="outline"
            size="sm"
            className="nav-btn"
            onClick={() => go(Math.max(0, index - 1))}
            disabled={index === 0}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="nav-btn"
            onClick={() => go(Math.min(sheets.length - 1, index + 1))}
            disabled={index === sheets.length - 1}
          >
            Next
          </Button>
          <Button variant="outline" size="sm" className="nav-btn print-btn" onClick={() => window.print()}>
            Print all sheets
          </Button>
        </div>
      </header>
      <div className="workspace">
        <nav className="rail" aria-label="Sheets">
          {sheets.map((sheet, i) => (
            <button
              key={sheet.id}
              type="button"
              aria-current={i === index ? "page" : undefined}
              onClick={() => go(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {sheet.title}
            </button>
          ))}
        </nav>
        <main>
          {sheets.map((sheet, i) => (
            <div key={sheet.id} className={i === index ? "sheet-slot" : "sheet-slot sheet-hidden"} data-active={i === index}>
              <SheetFrame index={i} title={sheet.title}>
                <SheetBody id={sheet.id} onJump={(id) => go(sheets.findIndex((s) => s.id === id))} />
              </SheetFrame>
            </div>
          ))}
          <p className="hint">Arrow keys move sheets. Print is A3 landscape. Figures are millimetres — do not scale the paper.</p>
        </main>
      </div>
    </div>
  );
}

function SheetBody({ id, onJump }: { id: SheetId; onJump: (id: SheetId) => void }) {
  switch (id) {
    case "cover":
      return <Cover onJump={onJump} />;
    case "lateral":
      return <LateralSheet />;
    case "medial":
      return (
        <div className="stack">
          <figure className="draw-frame">
            <LateralShoe side="medial" internals />
          </figure>
          <div className="note-grid">
            <p>Medial collar finishes at {spec.dims.collarMedial} mm from the feather, 4 mm under the lateral. The halo is the pair of the lateral arc. There is no wordmark on the medial quarter.</p>
            <p>Cut the medial quarter from its own pattern. A mirrored lateral will put the collar too high and the backseam allowance on the wrong edge.</p>
            <p>Eyelets, lace, and binding match the lateral. The heel-tab ring is centered, so it reads from both sides and from the heel elevation.</p>
          </div>
        </div>
      );
    case "plan":
      return (
        <div className="stack">
          <figure className="draw-frame">
            <PlanShoe />
          </figure>
          <div className="note-grid">
            <p>Left shoe, toe to the left. The lower edge of this view is the lateral side. An L is marked in the collar so the sole mold is not cut as a mirror by mistake.</p>
            <p>The halo is two arcs. They stop 12 mm apart at the center of the vamp. Do not stitch them into a closed circle. A closed ring puckers the throat.</p>
            <p>Sole width at the ball is {spec.dims.soleWidthBall} mm. Heel sole width is {spec.dims.soleWidthHeel} mm. The upper sits inside the sole lip; the lip is not an extension of the calf.</p>
          </div>
        </div>
      );
    case "sole":
      return (
        <div className="stack">
          <figure className="draw-frame">
            <SoleShoe />
          </figure>
          <Table
            columns={["Zone", "Spec", "Note"]}
            rows={[
              ["Forefoot", "Herringbone, 2.0 mm deep", "Do not carry the tread through the pivot ring."],
              ["Pivot", "Open ring, 20 mm inside the circle", "Centered under the ball. This is the same ring as the wordmark."],
              ["Shank", "Two shallow gutters, 0.8 mm", "Smooth enough to cement. No lug under the waist."],
              ["Heel", "Four transverse bars", "MS molded in the breast, 8 mm cap, 0.8 mm proud."],
              ["Foxing", "10 mm wall, part of the cup", "16 mm ring recessed at the heel back, 1.0 mm deep, not punched."],
              ["Compound", "RELIC 55±3 A · VESPER 62±3 A", "One mold family. Gum marks floors. Black is non-marking."],
            ]}
          />
        </div>
      );
    case "elevations":
      return (
        <div className="stack">
          <div className="pair">
            <figure className="draw-frame">
              <HeelElevation />
              <figcaption>Heel. Ring sits in the foxing, midway up the wall.</figcaption>
            </figure>
            <figure className="draw-frame">
              <ToeElevation />
              <figcaption>Toe, 30 mm back from the tip. The chisel is a flat, not a peak.</figcaption>
            </figure>
          </div>
          <div className="note-grid">
            <p>Heel sole width {spec.dims.soleWidthHeel} mm. The upper is narrower than the sole. Do not stretch the quarter out to the foxing edge.</p>
            <p>The tab is a mark, not a handle. It rises {spec.dims.heelTab} mm and is stitched around. Do not stitch through the ring.</p>
            <p>If the chisel collapses after de-lasting, the puff is light or it was not seated. Do not correct it with a thicker toe cap.</p>
          </div>
        </div>
      );
    case "section":
      return (
        <div className="stack">
          <figure className="draw-frame">
            <SectionShoe />
          </figure>
          <Table
            columns={["Letter", "Layer", "mm", "Note"]}
            rows={[
              ["A", "Sockliner", "1.2", "Vegetable-tanned leather. Heel taped only."],
              ["B", "Insole board", "2.0", "Cellulose. No steel shank."],
              ["C", "Rubber under the ball", "6", "Inside the cup, not the external stack."],
              ["D", "Rubber under the heel", "8", "Inside the cup. External heel stack is still 24."],
              ["E", "Toe puff", "1.0", "Behind the chisel. Dashed."],
              ["F", "Counter", "1.4", "Molded, under the lining. Dashed."],
              ["—", "Lasting margin", String(spec.dims.lastingMargin), "Folded under the board and cemented into the cup."],
              ["—", "Cup wall", "2.8 min", "Do not thin the foxing to chase weight."],
            ]}
          />
        </div>
      );
    case "exploded":
      return (
        <div className="stack">
          <figure className="draw-frame">
            <ExplodedShoe />
          </figure>
          <p className="prose">
            Order of assembly from the foot down: sockliner, lasted upper, insole board, cupsole.
            The lasting margin is trapped between the board and the cup and is not a fifth part.
            Toe puff and counter stay inside the upper. They are BOM 12 and 11.
          </p>
        </div>
      );
    case "patterns":
      return (
        <div className="stack">
          <figure className="draw-frame">
            <PatternSheet />
          </figure>
          <Table
            columns={["Piece", "Allowance", "Grain", "Pairs"]}
            rows={[
              ["01 Vamp", `Add ${spec.dims.lastingMargin} mm past the feather only`, "Tight across the toe", "Cut as a pair"],
              ["02 Quarter lateral", `Lap ${spec.dims.lap} mm already in the front edge. Backseam ${spec.dims.backseamAllowance} mm. Lasting ${spec.dims.lastingMargin} mm.`, "Heel to toe", "Own pattern"],
              ["03 Quarter medial", "Same allowances. Collar 4 mm lower.", "Heel to toe", "Do not mirror 02"],
              ["04 Tongue", "No lasting allowance", "Heel to toe", "Deboss before stitch"],
              ["08 Binding", "Cut 16 mm on the bias, finish 5 mm", "Bias", "One piece, join hidden under the tongue"],
            ]}
          />
        </div>
      );
    case "bom":
      return (
        <Table
          columns={["Ref", "Component", "Material", "Specification", "Qty / pair", "Note"]}
          rows={bom.map((row) => [row.ref, row.component, row.material, row.spec, row.qty, row.note])}
        />
      );
    case "stitch":
      return (
        <div className="stack">
          <Table
            columns={["Operation", "ISO", "Thread", "Length", "Margin", "Note"]}
            rows={stitches.map((row) => [row.op, row.iso, row.thread, row.length, row.margin, row.note])}
          />
          <div className="note-grid">
            <p>ISO 301 is a lockstitch. Halo thread is Tex 60 so the arc reads as a drawn line. Everything else is Tex 40 and should disappear into the calf.</p>
            <p>Bond target is {spec.dims.bond} N/mm peel after 24 hours. Use the factory’s usual SATRA sole-adhesion method and name it on the quote. Primer must match the gum compound and the black compound separately.</p>
            <p>No cement past the feather. Wipe squeeze-out while it is wet. A painted edge is a reject on this shoe.</p>
          </div>
        </div>
      );
    case "color":
      return (
        <div className="stack">
          <div className="pair">
            {colorways.map((color) => (
              <figure key={color.id} className="draw-frame color-card">
                <LateralShoe paint={color.id === "relic" ? "relic" : "vesper"} />
                <figcaption>
                  <strong>{color.code}</strong> · {color.name}
                </figcaption>
                <ul className="swatches">
                  <li>
                    <i style={{ background: color.swatch.upper }} />
                    Upper · {color.upper}
                  </li>
                  <li>
                    <i style={{ background: color.swatch.stitch, borderColor: color.id === "vesper" ? "#1b1916" : "transparent" }} />
                    Stitch & lace · {color.stitch}
                  </li>
                  <li>
                    <i style={{ background: color.swatch.sole }} />
                    Sole · {color.sole}
                  </li>
                </ul>
                <p className="prose">{color.role}</p>
              </figure>
            ))}
          </div>
          <p className="prose">
            Same last, same patterns, same construction. Only the hide color, the Tex 60, the lace, and the sole compound change.
            The first pull is RELIC. VESPER waits for a signed fit sample. There is no third color in Rev A.
          </p>
        </div>
      );
    case "grade":
      return (
        <div className="stack">
          <div className="note-grid">
            <p>Last MS-LAST-01. Almond chisel, medium fit, unisex. Toe recede 8 mm. Heel elevation in the last is 4 mm. The rest of the {spec.dims.drop} mm drop is in the sole.</p>
            <p>Reference girths at US M 9: ball 248, waist 244, instep 256. Heel width of the last 66. Ball width 98. Stick length {spec.dims.stick}. Insole length {spec.dims.insoleLength}.</p>
            <p>Do not cut this grade until sheet 15 is signed. The proto mold is one cavity, US M 9, left and right.</p>
          </div>
          <Table
            columns={["US M", "US W", "UK", "EU", "Mondo", "Stick", "Ball girth"]}
            rows={sizes.map((size) => [
              size.usM.toFixed(1),
              size.usW.toFixed(1),
              size.uk.toFixed(1),
              size.eu.toFixed(1),
              size.mondo,
              gradedStick(size.usM).toFixed(1),
              gradedGirth(size.usM).toFixed(1),
            ])}
          />
          <p className="prose">
            Length grade is 4.23 mm of stick per US half size from 285 at US M 9. Girth grade is 3.2 mm of ball girth per half size from 248.
            The EU, UK, and mondo columns are the stamps, not the measurements. Stick minus mondo is 15 mm at US M 9 and drifts at the ends of the run. Fit US M 7 and US M 13 before production.
          </p>
        </div>
      );
    case "sequence":
      return (
        <Table
          columns={["Op", "Operation", "Machine", "Specification"]}
          rows={sequence.map((row) => [row.op, row.name, row.machine, row.spec])}
        />
      );
    case "release":
      return (
        <div className="stack">
          <Table
            columns={["Check", "Tolerance", "Reject if"]}
            rows={[
              ["Overall length", "±1.0 mm", "Sole is long or short of 300 at US M 9"],
              ["Stack and drop", "±0.8 stack, ±1.0 drop", "The shoe rocks, or the drop exceeds 9 mm"],
              ["Collar, left vs right", "±2 mm", "One collar stands proud on a pair"],
              ["Halo stitch length", "3.2 ± 0.2 mm", "The arc looks like a topstitch, or it closes the 12 mm gap"],
              ["Stitch margin", "±0.5 mm", "The lap opens, or the stitch walks off the quarter"],
              ["Chisel", "Flat face holds", "The toe rounds after 24 h off the last"],
              ["Bond", `≥ ${spec.dims.bond} N/mm`, "The sacrificed pair peels under the target"],
              ["Cement", "None past the feather", "Squeeze-out is visible, or the edge is painted"],
              ["Eyelets", "Seated, no burr", "A burr on the kid, or a gold/nickel finish"],
              ["Deboss", "0.4 mm, legible", "The ring is cut through, or MADE is off center"],
              ["Weight", "320 ± 20 g", "A shoe leaves that band with lace and sockliner in"],
              ["Pair", "Sits flat", "Twist you can see on a table"],
            ]}
          />
          <div className="signs">
            {["Design", "Pattern", "Last", "Sole", "QC"].map((role) => (
              <div key={role} className="sign">
                <span>{role}</span>
                <i />
                <em>Date</em>
              </div>
            ))}
          </div>
          <p className="prose">
            Rev A is released for a three-pair pull in RELIC at US M 9. Production grading, the VESPER hide, and steel tooling stay closed until the five lines above are signed.
          </p>
        </div>
      );
    default:
      return null;
  }
}
