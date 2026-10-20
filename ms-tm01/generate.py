#!/usr/bin/env python3
"""Generate the MS-TM01 Trail Mule prototype package.

Geometry is a visual proportion model taken from the reference card.
It is not a measured last, and it is not a cut file.
"""

from __future__ import annotations

import csv
import math
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DRAW = ROOT / "drawings"
PAT = ROOT / "patterns"
BOM = ROOT / "bom"
REF = ROOT / "reference"

INK = "#1a1a1a"
GRAY = "#9a9a9a"
HAIR = "#c8c8c8"
PAPER = "#f6f5f2"
POWDER = "#93a3ae"
POWDER_DEEP = "#6e808c"
GRID = "#e7eef2"
SLATE = "#4d6274"
SOLE = "#2b2b2b"
SOLE_MID = "#3a3a3a"

NB = "PROVISIONAL — PHYSICAL VALIDATION REQUIRED"


def cr(pts, closed=False):
    pts = [tuple(p) for p in pts]
    n = len(pts)
    if n < 2:
        return ""
    if closed:
        seq = pts
        def at(i):
            return seq[i % n]
        d = f"M {seq[0][0]:.2f} {seq[0][1]:.2f}"
        for i in range(n):
            p0, p1, p2, p3 = at(i - 1), at(i), at(i + 1), at(i + 2)
            c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
            c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
            d += f" C {c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}"
        return d + " Z"
    d = f"M {pts[0][0]:.2f} {pts[0][1]:.2f}"
    for i in range(n - 1):
        p0 = pts[max(0, i - 1)]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[min(n - 1, i + 2)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C {c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}"
    return d


def poly(pts, closed=False):
    d = "M " + " L ".join(f"{x:.2f} {y:.2f}" for x, y in pts)
    return d + (" Z" if closed else "")


# Side master, toe at left, y down.
# Traced from the card's lateral view and checked against the medial view.
# Drawing units are proportions. They are not millimetres.

# Black bottom unit. Wave is the top edge. Ground is nearly flat. Toe and heel are round.
# Points below are sampled from the card's lateral view (toe left).
# The toe and heel are blunt. The ground line is flat. The wave is only the wall.
SOLE_PTS = [
    (12, 58), (6, 76), (6, 98),
    (16, 112), (34, 124), (52, 131),
    (120, 134), (200, 135), (268, 137),
    (292, 132), (306, 120), (314, 102), (312, 78), (304, 68),
    (288, 72), (264, 84), (236, 84), (208, 74),
    (180, 70), (152, 75), (124, 86), (96, 91),
    (72, 86), (48, 78), (28, 70),
]
# Topline has a flat seat so the tab sits on the collar. The bite is pushed
# into the sole so the textile tucks behind the wall instead of floating above it.
UPPER_PTS = [
    (28, 56), (56, 50), (88, 42), (112, 32), (132, 26),
    (146, 22), (178, 22),
    (194, 34), (214, 48), (238, 56), (266, 60), (290, 54), (302, 50),
    (296, 78), (270, 92), (244, 94), (216, 84),
    (188, 78), (160, 82), (132, 94), (104, 100),
    (80, 94), (56, 86), (36, 76), (28, 70),
]
BITE = [
    (28, 68), (48, 76), (72, 86), (96, 91),
    (124, 86), (152, 75), (180, 70), (208, 74),
    (236, 84), (264, 84), (288, 72), (304, 66),
]
COLLAR = [
    (178, 24), (194, 36), (214, 48), (244, 58), (276, 58), (298, 52),
]
# Top view of the same shoe. Length/width from the card's top view: about 1.58, round toe, broad heel.
PLAN_SOLE = [
    (18, -10), (16, 0), (18, 10),
    (28, 40), (52, 68), (96, 88), (160, 98), (220, 94),
    (268, 76), (298, 48), (314, 20), (318, 0),
    (314, -20), (298, -48), (268, -76), (220, -94), (160, -98),
    (96, -88), (52, -68), (28, -40),
]
PLAN_UPPER = [
    (44, -8), (42, 0), (44, 8),
    (56, 28), (84, 50), (130, 66), (190, 70),
    (236, 60), (266, 40), (284, 16), (286, 0),
    (284, -16), (266, -40), (236, -60), (190, -70),
    (130, -66), (84, -50), (56, -28),
]


def wordmark(x, y, size=8, anchor="middle", fill=INK):
    return f'''<g fill="{fill}" font-family="Liberation Sans, sans-serif" font-weight="700">
      <text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size * 0.38:.2f}" letter-spacing="0.6">MADE</text>
      <text x="{x}" y="{y + size * 0.48:.2f}" text-anchor="{anchor}" font-size="{size * 0.46:.2f}" letter-spacing="0.4">SAiNT</text>
    </g>'''


def logo_tab(x, y, w=34, h=22):
    return f'''<g>
      <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2.2" fill="{POWDER}" stroke="{INK}" stroke-width="0.7"/>
      <rect x="{x+1.6}" y="{y+1.6}" width="{w-3.2}" height="{h-3.2}" rx="1.4" fill="none" stroke="{INK}" stroke-width="0.35"/>
      {wordmark(x + w/2, y + h * 0.38, min(w, h) * 0.42)}
    </g>'''


_clip_n = 0


def _y_at(pts, x):
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        lo, hi = (x0, x1) if x0 <= x1 else (x1, x0)
        if lo <= x <= hi and x1 != x0:
            t = (x - x0) / (x1 - x0)
            return y0 + t * (y1 - y0)
    return pts[-1][1]


def _inside(x, y, pts):
    n = len(pts)
    c = False
    j = n - 1
    for i in range(n):
        xi, yi = pts[i]
        xj, yj = pts[j]
        if (yi > y) != (yj > y):
            xint = (xj - xi) * (y - yi) / ((yj - yi) or 1e-9) + xi
            if x < xint:
                c = not c
        j = i
    return c


def side_lugs():
    """Gaps cut into the flat ground line so the teeth read. The wave stays in the wall."""
    parts = []
    x = 46
    while x < 292:
        parts.append(f'<rect x="{x:.1f}" y="118" width="3.4" height="22" fill="{PAPER}"/>')
        x += 17
    return "".join(parts)


def side_shoe(show_grid=True):
    global _clip_n
    _clip_n += 1
    cid = f"up{_clip_n}"
    upper = cr(UPPER_PTS, closed=True)
    sole = cr(SOLE_PTS, closed=True)
    grid = ""
    if show_grid:
        lines = []
        for i in range(9):
            yy = 16 + i * 12
            lines.append(f'<line x1="30" y1="{yy}" x2="310" y2="{yy}" stroke="{GRID}" stroke-width="0.45"/>')
        for i in range(20):
            xx = 36 + i * 14
            lines.append(f'<line x1="{xx}" y1="10" x2="{xx}" y2="96" stroke="{GRID}" stroke-width="0.45"/>')
        grid = f'<g clip-path="url(#{cid})">{"".join(lines)}</g>'
    collar = cr([(x, y + 8) for x, y in COLLAR])
    return f'''<g>
      <defs><clipPath id="{cid}"><path d="{upper}"/></clipPath></defs>
      <path d="{sole}" fill="{SOLE}" stroke="{INK}" stroke-width="0.9"/>
      {side_lugs()}
      <path d="{upper}" fill="{POWDER}" stroke="{INK}" stroke-width="0.85"/>
      {grid}
      <path d="{cr(BITE)}" fill="none" stroke="{INK}" stroke-width="0.9"/>
      <path d="{cr(COLLAR)}" fill="none" stroke="{INK}" stroke-width="0.7"/>
      <path d="{collar}" fill="none" stroke="{GRAY}" stroke-width="0.45"/>
      {logo_tab(146, 4, 32, 22)}
    </g>'''


def plan_shoe():
    sole = cr(PLAN_SOLE, closed=True)
    upper = cr(PLAN_UPPER, closed=True)
    opening = "M 176 -52 C 240 -64 286 -28 286 0 C 286 28 240 64 176 52 C 158 24 158 -24 176 -52 Z"
    lines = []
    for i in range(-3, 5):
        yy = i * 14
        lines.append(f'<line x1="40" y1="{yy}" x2="290" y2="{yy}" stroke="{GRID}" stroke-width="0.5"/>')
    for i in range(16):
        xx = 40 + i * 16
        lines.append(f'<line x1="{xx}" y1="-60" x2="{xx}" y2="60" stroke="{GRID}" stroke-width="0.5"/>')
    return f'''<g>
      <path d="{sole}" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <defs><clipPath id="planup"><path d="{upper}"/></clipPath></defs>
      <path d="{upper}" fill="{POWDER}" stroke="{INK}" stroke-width="0.7"/>
      <g clip-path="url(#planup)">{"".join(lines)}</g>
      <path d="{opening}" fill="{POWDER_DEEP}" stroke="{INK}" stroke-width="0.6"/>
      <text x="230" y="2" text-anchor="middle" font-size="5.5" fill="{PAPER}" font-family="Liberation Sans, sans-serif">FOOTBED</text>
      {logo_tab(138, -9, 36, 18)}
    </g>'''


def front_shoe():
    """Front elevation. Wide and low: thick bumper, a small textile cap, a flat lug line."""
    lugs = []
    x = 8
    while x < 198:
        w = 14 if x > 24 and x < 180 else 10
        lugs.append(f'<path d="M {x} 66 h {w} l -2 12 h -{w-4} Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.3"/>')
        x += w + 4
    return f'''<g>
      <path d="M 4 40 C 2 32 18 26 40 24 H 170 C 192 26 208 32 206 40 L 198 66 H 12 Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <path d="M 28 40 C 24 30 48 24 70 24 H 140 C 162 24 186 30 182 40 Z" fill="{SOLE_MID}" stroke="{INK}" stroke-width="0.45"/>
      <path d="M 78 26 C 86 14 124 14 132 26 L 138 34 H 72 Z" fill="{POWDER}" stroke="{INK}" stroke-width="0.65"/>
      {''.join(lugs)}
    </g>'''


def rear_shoe():
    """Open heel. Wide collar ring, footbed visible, tab seen on edge, flat lug line."""
    lugs = []
    x = 10
    while x < 196:
        w = 14
        lugs.append(f'<path d="M {x} 92 h {w} l -2 12 h -{w-4} Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.3"/>')
        x += w + 4
    return f'''<g>
      <path d="M 6 70 H 204 L 196 92 H 14 Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <path d="M 22 70 H 188 L 176 58 H 34 Z" fill="{SOLE_MID}" stroke="{INK}" stroke-width="0.5"/>
      <path d="M 40 58 C 34 28 58 14 105 12 C 152 14 176 28 170 58 Z" fill="{POWDER}" stroke="{INK}" stroke-width="0.75"/>
      <path d="M 58 54 C 56 34 74 24 105 24 C 136 24 154 34 152 54 Z" fill="{POWDER_DEEP}" stroke="{INK}" stroke-width="0.6"/>
      <text x="105" y="44" text-anchor="middle" font-size="5" fill="{PAPER}" font-family="Liberation Sans, sans-serif">FOOTBED</text>
      {logo_tab(86, 0, 38, 16)}
      {''.join(lugs)}
    </g>'''


def bottom_shoe():
    outline_pts = PLAN_SOLE
    outline = cr(outline_pts, closed=True)
    lugs = []
    for y in range(-86, 90, 24):
        for x in range(36, 300, 26):
            if not _inside(x, y, outline_pts):
                continue
            if not all(_inside(x + dx, y + dy, outline_pts) for dx, dy in ((0, 12), (0, -12), (12, 0), (-12, 0))):
                continue
            lugs.append(
                f'<g transform="translate({x} {y})" fill="{PAPER}" stroke="{INK}" stroke-width="0.45">'
                f'<rect x="-9" y="-2.6" width="18" height="5.2" rx="0.8"/>'
                f'<rect x="-2.6" y="-9" width="5.2" height="18" rx="0.8"/>'
                f'<circle cx="0" cy="0" r="1.15" fill="{INK}" stroke="none"/></g>'
            )
    return f'''<g>
      <path d="{outline}" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      {''.join(lugs)}
    </g>'''


def footbed_shape():
    """Card insole, toe at top. Widths and the mild centerline drift come from the photograph."""
    samples = [
        (4, 22, 0), (16, 34, 1), (32, 42, 2), (52, 48, 4),
        (76, 50, 6), (104, 46, 9), (132, 42, 12), (158, 38, 13),
        (180, 32, 13), (196, 20, 12), (206, 8, 11),
    ]
    cx = 54
    right = [(cx + mx + hw, y) for y, hw, mx in samples]
    left = [(cx + mx - hw, y) for y, hw, mx in reversed(samples)]
    return cr(right + left, closed=True)


def sheet(num, title, body, note):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="420mm" height="297mm" viewBox="0 0 420 297">
  <rect width="420" height="297" fill="{PAPER}"/>
  <rect x="6" y="6" width="408" height="285" fill="none" stroke="{INK}" stroke-width="0.6"/>
  <text x="12" y="16" font-family="Liberation Serif, Times New Roman, serif" font-size="7" fill="{INK}">MADE SAiNT</text>
  <text x="78" y="16" font-family="Liberation Sans, sans-serif" font-size="3.6" fill="{SLATE}">MS-TM01 · TRAIL MULE · PROTOTYPE 001 · REV B</text>
  <text x="300" y="16" font-family="Liberation Sans, sans-serif" font-size="4.2" fill="{INK}">SHEET {num:02d} / 08</text>
  <text x="12" y="24" font-family="Liberation Serif, Times New Roman, serif" font-size="7" fill="{INK}">{title}</text>
  <text x="250" y="24" font-family="Liberation Sans, sans-serif" font-size="3.2" fill="{SLATE}">04 / POWDER BLUE · FOG GRID · US M 12 2E</text>
  <line x1="10" y1="28" x2="410" y2="28" stroke="{INK}" stroke-width="0.35"/>
  {body}
  <line x1="10" y1="268" x2="410" y2="268" stroke="{INK}" stroke-width="0.35"/>
  <text x="12" y="274" font-family="Liberation Sans, sans-serif" font-size="2.7" fill="{INK}">{note}</text>
  <text x="12" y="280" font-family="Liberation Sans, sans-serif" font-size="2.7" fill="{SLATE}">SCALE NTS · PROPORTION MODEL FROM THE REFERENCE CARD · NOT A MEASURED DRAWING · {NB}</text>
  <text x="12" y="286" font-family="Liberation Sans, sans-serif" font-size="2.6" fill="{INK}">WORDMARK STAND-IN: MADE / SAiNT, LOWERCASE i REQUIRED. MATCH THE FOUNDER FILE. DO NOT CUT FROM THIS SHEET.</text>
</svg>
'''


def frame(x, y, w, h, label):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" stroke="{HAIR}" stroke-width="0.3"/><text x="{x+2}" y="{y+5}" font-size="3.1" font-family="Liberation Sans, sans-serif" fill="{SLATE}">{label}</text>'


def sheet_01():
    body = f'''
      {frame(10, 32, 200, 112, "LATERAL · TOE LEFT · TAB ON THE INSTEP COLLAR")}
      <g transform="translate(12 38) scale(0.60)">{side_shoe()}</g>
      {frame(214, 32, 196, 112, "MEDIAL · SAME PROFILE · NO SEPARATE PANEL BREAK")}
      <g transform="translate(216 40) scale(0.56)">{side_shoe()}</g>
      {frame(10, 148, 124, 112, "TOP · TOE LEFT · OPENING TO THE RIGHT")}
      <g transform="translate(14 200) scale(0.36)">{plan_shoe()}</g>
      {frame(138, 148, 96, 112, "FRONT · WIDE BUMPER, LOW CAP")}
      <g transform="translate(142 178) scale(0.42)">{front_shoe()}</g>
      {frame(238, 148, 96, 112, "REAR · OPEN COLLAR, TAB ON EDGE")}
      <g transform="translate(242 164) scale(0.42)">{rear_shoe()}</g>
      {frame(338, 148, 72, 112, "BOTTOM · PLUS LUGS")}
      <g transform="translate(340 192) scale(0.21)">{bottom_shoe()}</g>
      <g font-family="Liberation Sans, sans-serif" font-size="2.8" fill="{INK}">
        <text x="12" y="254">Callouts, visual only: 1 round toe behind the bumper · 2 one-piece ripstop vamp · 3 rolled collar · 4 instep tab, MADE / SAiNT · 5 wave sidewall · 6 flat lug line · 7 open heel with the footbed showing.</text>
      </g>
    '''
    return sheet(1, "Orthographic set", body, "Reference card is the design authority. Lateral and medial are paired. Elastic gores from the memorandum are not drawn: they are not visible on the card.")


def sheet_02():
    body = f'''
      {frame(10, 34, 250, 150, "LATERAL CONSTRUCTION · BLACK = VISIBLE EDGE · GRAY = HIDDEN OR UNCONFIRMED")}
      <g transform="translate(16 46) scale(0.70)">{side_shoe()}</g>
      <g font-family="Liberation Sans, sans-serif" font-size="3.1" fill="{INK}">
        <text x="268" y="42">UPPER BUILD — OBSERVED VS ASSUMED</text>
        <text x="268" y="52">U1 Shell. Powder-blue grid ripstop.</text>
        <text x="268" y="58">Yardblox A033513 is the named listing.</text>
        <text x="268" y="64">Grid may not be in the plain listing.</text>
        <text x="268" y="74">U2 Collar. Same shell over foam.</text>
        <text x="268" y="80">Image: rolled, tonal, padded.</text>
        <text x="268" y="86">Navy tape is not on the card.</text>
        <text x="268" y="96">U3 Logo tab. Instep collar.</text>
        <text x="268" y="102">Centered, stitched, debossed.</text>
        <text x="268" y="108">Not a tongue. Not a backstay label.</text>
        <text x="268" y="118">U4 Lining. Breathable textile.</text>
        <text x="268" y="124">Seen inside the opening. Spec open.</text>
        <text x="268" y="134">U5 Toe puff. Hidden. Memorandum.</text>
        <text x="268" y="140">Not a visible design line.</text>
        <text x="268" y="150">U6 Stabilizer. Memorandum. Test</text>
        <text x="268" y="156">before fusing a 40 GSM shell.</text>
        <text x="268" y="166">No confirmed side seam. No center</text>
        <text x="268" y="172">seam. If the trace needs a close,</text>
        <text x="268" y="178">hide it in the collar roll.</text>
      </g>
      {frame(10, 190, 400, 72, "COLLAR SECTION — SCHEMATIC, THROUGH THE PADDING · THICKNESS NOT MEASURED")}
      <g transform="translate(24 206)">
        <path d="M 10 40 C 30 10 90 8 110 36" fill="none" stroke="{INK}" stroke-width="0.8"/>
        <path d="M 16 40 C 34 18 86 16 104 36" fill="{POWDER}" stroke="{GRAY}" stroke-width="0.5"/>
        <path d="M 22 40 C 38 24 82 22 98 36" fill="#d5dde4" stroke="{GRAY}" stroke-width="0.4"/>
        <text x="120" y="16" font-size="3" font-family="Liberation Sans, sans-serif">A outer ripstop, grid continues over the collar</text>
        <text x="120" y="26" font-size="3" font-family="Liberation Sans, sans-serif">B foam, memorandum 4–6 mm, not measured here</text>
        <text x="120" y="36" font-size="3" font-family="Liberation Sans, sans-serif">C lining, soft, powder-blue family</text>
        <text x="120" y="46" font-size="3" font-family="Liberation Sans, sans-serif">Edge is rolled and tonal on the card. Do not add a contrast binding.</text>
      </g>
    '''
    return sheet(2, "Upper construction", body, "Panel lines that are not visible on the card are omitted. Hidden reinforcements are marked as memorandum items.")


def sheet_03():
    body = f'''
      {frame(10, 34, 230, 140, "GROUND FACE · TOE LEFT · PLUS LUGS AS OBSERVED CHARACTER")}
      <g transform="translate(18 108) scale(0.66)">{bottom_shoe()}</g>
      {frame(246, 34, 164, 140, "SIDEWALL PROFILE · WAVE AND TOE BUMPER")}
      <g transform="translate(248 52) scale(0.46)">{side_shoe(False)}</g>
      <g font-family="Liberation Sans, sans-serif" font-size="3.1" fill="{INK}">
        <text x="14" y="186">O1 One black rubber bottom is what the card shows: sidewall, toe bumper, and lug field read as one sculpted unit.</text>
        <text x="14" y="194">O2 A separate rand is not drawn. Add one only if the sourced sole does not already include the raised wall.</text>
        <text x="14" y="202">O3 Lug family on the card: plus-form, multi-directional, with a small center pip. This layout is a schematic, not a mold.</text>
        <text x="14" y="210">O4 Do not name or imply a commercial outsole brand. None has been selected.</text>
        <text x="14" y="218">O5 Bond surface is the cavity and the top of the wall. Its outline comes from the physical sole, not from this drawing.</text>
        <text x="14" y="226">O6 Sidewall top is a wave: high at the toe bumper, down through the waist, up under the collar, down again, up at the heel.</text>
        <text x="14" y="234">O7 The lug ground line is nearly flat. The wave is in the wall, not in the teeth. Textile toe sits behind the bumper.</text>
        <text x="14" y="248">Target: US M 12 2E compatible sole. A nominal size 12 sole is not assumed to fit a 2E last.</text>
      </g>
    '''
    return sheet(3, "Outsole construction", body, "No manufacturer is specified. The plus lug is recorded as observed character so a sourced sole can be compared with the card.")


def sheet_04():
    shape = footbed_shape()
    body = f'''
      {frame(10, 34, 180, 220, "FOOTBED PLAN · TOE AT TOP · HEAD OF THE FIGURE TOWARD THE TOE")}
      <g transform="translate(36 42) scale(0.78)">
        <path d="{shape}" fill="{POWDER}" stroke="{INK}" stroke-width="0.9"/>
        <rect x="36" y="28" width="36" height="120" fill="none" stroke="{SLATE}" stroke-width="0.4" stroke-dasharray="1.2 0.8"/>
        <text x="54" y="40" text-anchor="middle" font-size="3" fill="{SLATE}" font-family="Liberation Sans, sans-serif">WINGS</text>
        <line x1="54" y1="46" x2="54" y2="118" stroke="{SLATE}" stroke-width="0.35"/>
        <text x="54" y="78" text-anchor="middle" font-size="3" fill="{SLATE}" font-family="Liberation Sans, sans-serif">SPEAR</text>
        <text x="54" y="128" text-anchor="middle" font-size="2.8" fill="{SLATE}" font-family="Liberation Sans, sans-serif">FIGURE</text>
        <text x="54" y="136" text-anchor="middle" font-size="2.8" fill="{SLATE}" font-family="Liberation Sans, sans-serif">UNDERFOOT</text>
        {wordmark(54, 156, 8, "middle", SLATE)}
        <text x="54" y="12" text-anchor="middle" font-size="3" fill="{INK}" font-family="Liberation Sans, sans-serif">TOE</text>
        <text x="54" y="196" text-anchor="middle" font-size="3" fill="{INK}" font-family="Liberation Sans, sans-serif">HEEL</text>
      </g>
      <g font-family="Liberation Sans, sans-serif" font-size="3.1" fill="{INK}">
        <text x="200" y="44">ARTWORK PLACEMENT — NOT PRODUCTION ART</text>
        <text x="200" y="54">Insert the supplied Saint Michael woodcut.</text>
        <text x="200" y="62">Do not redraw it from this sheet.</text>
        <text x="200" y="74">Orientation, locked to the card:</text>
        <text x="200" y="84">Head and wings toward the toe.</text>
        <text x="200" y="92">Spear runs along the footbed.</text>
        <text x="200" y="100">Figure underfoot toward the heel.</text>
        <text x="200" y="108">MADE SAiNT sits beneath the scene,</text>
        <text x="200" y="116">toward the heel. Lowercase i required.</text>
        <text x="200" y="128">Ink: slate, tonal on powder-blue</text>
        <text x="200" y="136">microfiber. It must stay legible.</text>
        <text x="200" y="152">STACK, TOP TO BOTTOM</text>
        <text x="200" y="162">F1 Microfiber topcover, powder blue.</text>
        <text x="200" y="170">F2 Print or transfer. Rub-test it.</text>
        <text x="200" y="178">F3 Cork-latex base, contoured,</text>
        <text x="200" y="186">removable. Source the contour.</text>
        <text x="200" y="194">This outline is the plan view only.</text>
      </g>
      {frame(196, 206, 208, 54, "SECTION ACROSS THE FOREFOOT · SCHEMATIC")}
      <g transform="translate(210 218)">
        <path d="M 10 28 C 40 8 120 8 150 28 L 146 36 C 120 22 40 22 14 36 Z" fill="#d7c4a4" stroke="{INK}" stroke-width="0.6"/>
        <path d="M 14 28 C 40 14 120 14 146 28" fill="none" stroke="{POWDER_DEEP}" stroke-width="2.2"/>
        <text x="0" y="48" font-size="2.8" font-family="Liberation Sans, sans-serif">Cork-latex below. Microfiber skin above. Thicknesses not measured.</text>
      </g>
    '''
    return sheet(4, "Footbed", body, "The dashed window is orientation only. Print from the supplied art file. Confirm the print survives rub and moisture before the pair is walked.")


def sheet_05():
    rows = [
        (36, "5  Logo tab", "instep collar, stitched, not bonded into the sole"),
        (68, "4  Upper shell + collar foam", "ripstop over foam, rolled edge"),
        (100, "3  Lining", "inside the shell"),
        (132, "2  Toe puff + stabilizer", "hidden, memorandum"),
        (164, "1  Insole board", "only if the chosen sole needs one"),
        (196, "0  Rubber bottom unit", "sidewall, bumper, and lugs"),
    ]
    labels = "\n".join(
        f'<text x="250" y="{y}" font-size="3.2" font-family="Liberation Sans, sans-serif" fill="{INK}">{text}</text>'
        f'<text x="250" y="{y+5}" font-size="2.7" font-family="Liberation Sans, sans-serif" fill="{SLATE}">{sub}</text>'
        for y, text, sub in rows
    )
    body = f'''
      <g transform="translate(12 38) scale(0.40)">{side_shoe(False)}</g>
      <text x="16" y="132" font-size="3" font-family="Liberation Sans, sans-serif" fill="{SLATE}">ASSEMBLY REFERENCE SILHOUETTE</text>
      <g transform="translate(16 168) scale(0.32)">{bottom_shoe()}</g>
      {labels}
      <text x="14" y="214" font-size="3.1" font-family="Liberation Sans, sans-serif" fill="{INK}">Order is from the ground up. The footbed is removable and is not in the bond stack.</text>
      <text x="14" y="222" font-size="3.1" font-family="Liberation Sans, sans-serif" fill="{INK}">It is made and fitted after the upper will accept a last, and it must fit the real cavity.</text>
      <text x="14" y="234" font-size="3.1" font-family="Liberation Sans, sans-serif" fill="{INK}">No full heel counter is specified. The card holds its heel shape with collar padding.</text>
      <text x="14" y="242" font-size="3.1" font-family="Liberation Sans, sans-serif" fill="{INK}">If the handmade opening collapses, record that on revision 002 before adding a counter.</text>
      <text x="14" y="254" font-size="3.1" font-family="Liberation Sans, sans-serif" fill="{SLATE}">Footbed art is placed after the topcover is laminated. See sheet 04 for orientation.</text>
    '''
    return sheet(5, "Exploded assembly", body, "Component numbers match the bill of materials. The footbed (F1–F3) is a separate removable assembly.")


def upper_net():
    return [
        (20, 80), (30, 40), (70, 18), (130, 10), (190, 18), (230, 40), (250, 78),
        (236, 92), (200, 84), (160, 96), (120, 84), (70, 96), (36, 110), (18, 100),
    ]


def lining_net():
    return [(x + 6, y + 4) for x, y in upper_net()]


def collar_foam():
    return [(20, 20), (40, 8), (120, 4), (200, 10), (230, 28), (210, 40), (140, 34), (60, 40), (24, 34)]


def footbed_poly():
    return [
        (40, 10), (28, 30), (26, 60), (40, 110), (60, 160), (70, 200),
        (50, 214), (36, 190), (28, 140), (24, 70), (30, 24),
    ]


def logo_poly():
    return [(0, 0), (36, 0), (36, 22), (0, 22)]


def puff_poly():
    return [(0, 10), (12, 0), (40, 0), (52, 10), (40, 22), (12, 22)]


def offset_poly(pts, dist):
    pts = [tuple(p) for p in pts]
    n = len(pts)
    area = sum(pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1] for i in range(n))
    sign = 1 if area > 0 else -1
    out = []
    for i in range(n):
        x0, y0 = pts[i - 1]
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        a = (x1 - x0, y1 - y0)
        b = (x2 - x1, y2 - y1)
        la = math.hypot(*a) or 1
        lb = math.hypot(*b) or 1
        na = (-a[1] / la * sign, a[0] / la * sign)
        nb = (-b[1] / lb * sign, b[0] / lb * sign)
        nx, ny = na[0] + nb[0], na[1] + nb[1]
        ln = math.hypot(nx, ny) or 1
        out.append((x1 + nx / ln * dist, y1 + ny / ln * dist))
    return out


def draw_piece(pts, ox, oy, label, grain=True):
    cut = poly(pts, closed=True)
    allow = poly(offset_poly(pts, 8), closed=True)
    stitch = poly(offset_poly(pts, -3), closed=True)
    cx = sum(p[0] for p in pts) / len(pts) + ox
    cy = sum(p[1] for p in pts) / len(pts) + oy
    g = ""
    if grain:
        g = f'<line x1="{cx-12}" y1="{cy+8}" x2="{cx+14}" y2="{cy+8}" stroke="{SLATE}" stroke-width="0.4"/><path d="M {cx+10} {cy+6} L {cx+14} {cy+8} L {cx+10} {cy+10}" fill="none" stroke="{SLATE}" stroke-width="0.4"/>'
    return f'''<g transform="translate({ox} {oy})">
      <path d="{allow}" fill="none" stroke="{GRAY}" stroke-width="0.35" stroke-dasharray="1.2 0.7"/>
      <path d="{cut}" fill="{POWDER}" stroke="{INK}" stroke-width="0.7"/>
      <path d="{stitch}" fill="none" stroke="{SLATE}" stroke-width="0.3"/>
    </g>
    <text x="{cx}" y="{cy}" text-anchor="middle" font-size="3" font-family="Liberation Sans, sans-serif" fill="{INK}">{label}</text>
    {g}'''


def sheet_06():
    body = f'''
      <text x="12" y="36" font-size="3" font-family="Liberation Sans, sans-serif" fill="{SLATE}">GRAY DASH = 8-UNIT MOCK-UP ALLOWANCE, AN ASSUMPTION. SLATE = STITCH GUIDE 3 UNITS INSIDE THE NET. NEITHER IS A MEASURED SPEC.</text>
      {draw_piece(upper_net(), 16, 48, "P01 UPPER SHELL  ×2")}
      {draw_piece(lining_net(), 200, 56, "P02 LINING  ×2", False)}
      {draw_piece(collar_foam(), 16, 176, "P03 COLLAR FOAM  ×2", False)}
      {draw_piece(logo_poly(), 250, 190, "P05 LOGO TAB  ×2", False)}
      {draw_piece(puff_poly(), 310, 186, "P06 TOE PUFF  ×2", False)}
      <g font-family="Liberation Sans, sans-serif" font-size="2.8" fill="{INK}">
        <text x="300" y="156">No contrast binding.</text>
        <text x="300" y="164">The collar roll is the shell</text>
        <text x="300" y="170">cloth. Do not cut a tape piece</text>
        <text x="300" y="176">for prototype 001.</text>
      </g>
      <text x="12" y="258" font-size="3" font-family="Liberation Sans, sans-serif" fill="{INK}">These nets are proportion studies of the visible surfaces. They are not last-flattened patterns. Trace the real last before any hide is cut.</text>
    '''
    return sheet(6, "Provisional patterns", body, "Grain arrow is the intended heel-to-toe direction of the shell. Confirm warp on the Yardblox swatch. Grid alignment is visual.")


def sheet_07():
    rows = [
        ("U1", "Upper shell", "Yardblox A033513", "DWR stretch crinkle ripstop, 92/8, 40 GSM", "1 yard buy", "Powder blue", "Yardblox — confirm listing", "Grid may be absent on the plain listing"),
        ("U2", "Stabilizer", "Sew-in tricot or nonwoven", "Bond-test before any fuse", "0.5 yard buy", "Neutral", "UNASSIGNED", "40 GSM shell needs a test"),
        ("U3", "Toe puff", "Flexible footwear puff", "Hidden", "1 sheet", "Neutral", "UNASSIGNED", "Memorandum item"),
        ("U4", "Lining", "Breathable textile", "Inside the opening", "0.5 yard buy", "Powder family", "UNASSIGNED", "Exact cloth not on the card"),
        ("U5", "Collar foam", "Soft footwear foam", "4–6 mm named in the memo", "1 sheet", "Neutral", "UNASSIGNED", "Thickness not measured"),
        ("U6", "Logo tab", "Coated textile or synthetic", "Stitched, debossed wordmark", "2", "Powder blue", "UNASSIGNED", "Instep collar, not a tongue"),
        ("U7", "Thread", "Bonded polyester", "Tone-on-tone", "1 set", "Slate / powder", "UNASSIGNED", "Needle and stitch length by test"),
        ("F1", "Footbed base", "Cork-latex, contoured", "Removable, size 12 2E cavity", "1 pair", "Natural", "UNASSIGNED", "Fit the real cavity"),
        ("F2", "Topcover", "Microfiber", "Powder blue", "0.25 yard", "Powder blue", "UNASSIGNED", "Laminate before art"),
        ("F3", "Artwork", "Supplied woodcut file", "Slate ink, abrasion test", "2 + tests", "Slate", "Founder file", "Do not redraw"),
        ("O1", "Rubber bottom", "Black rubber, lugged", "Wide wall and toe bumper", "1 pair", "Black", "UNASSIGNED", "No brand selected"),
        ("A1", "Adhesive", "Flexible footwear contact", "Match rubber and textile", "Small", "—", "UNASSIGNED", "Follow the can and ventilate"),
        ("B1", "Insole board", "Footwear board", "Only if the sole requires it", "1 sheet", "Neutral", "UNASSIGNED", "Omit if the sole is a closed cup"),
    ]
    lines = []
    y = 40
    header = "ID  COMPONENT          MATERIAL                     COLOR           SUPPLIER"
    lines.append(f'<text x="12" y="{y}" font-size="2.8" font-family="Liberation Sans, sans-serif" fill="{SLATE}">{header}</text>')
    y += 6
    for rid, name, mat, spec, qty, color, supplier, note in rows:
        lines.append(f'<text x="12" y="{y}" font-size="2.7" font-family="Liberation Sans, sans-serif" fill="{INK}">{rid}  {name[:16]:<16}  {mat[:28]:<28}  {color[:14]:<14}  {supplier[:28]}</text>')
        y += 4.2
        lines.append(f'<text x="22" y="{y}" font-size="2.4" font-family="Liberation Sans, sans-serif" fill="{SLATE}">{spec} · {qty} · {note}</text>')
        y += 5.4
    body = "\n".join(lines) + f'<text x="12" y="258" font-size="3" font-family="Liberation Sans, sans-serif" fill="{INK}">Buy allowances are from the 19 Oct 2026 memorandum. They are not yields. The CSV is the editable bill.</text>'
    return sheet(7, "Bill of materials", body, "Suppliers other than the named Yardblox listing are unassigned. Do not infer a vendor from a similar product.")


def sheet_08():
    steps = [
        ("A", "Verify", "Swatch the ripstop. Confirm powder blue and whether the white grid is actually in the cloth. Identify a US M 12 2E last and a black sole with a raised wall and a round toe bumper. Do not cut yet."),
        ("B", "Trace", "Tape the last. Trace the feather, the opening, and the sole cavity. Rebuild sheets 02 and 06 on that trace. Retire this proportion model."),
        ("C", "Mock", "Paper or cheap-cloth upper. Check the open heel, the collar height, and the logo-tab position against the card."),
        ("D", "Upper", "Stabilize only after a bond test. Sew the shell, foam, and lining. Roll the collar in the shell cloth. Stitch the logo tab on the instep collar, centered. Deboss or stamp from the wordmark file."),
        ("E", "Footbed", "Fit cork to the cavity. Laminate microfiber. Place the supplied art head-to-toe, wordmark toward the heel. Rub-test a spare."),
        ("F", "Bottom", "Rough and cement per the adhesive sheet. Wipe squeeze-out. Do not add a separate rand if the sole already has the wall."),
        ("G", "Check", "Forefoot clearance, heel retention, level sole, no early separation, collar comfort, art still readable. Record changes as revision 002."),
    ]
    bits = []
    y = 38
    for code, name, text in steps:
        bits.append(f'<text x="14" y="{y}" font-size="4" font-family="Liberation Serif, Times New Roman, serif" fill="{INK}">{code}  {name}</text>')
        # wrap roughly
        words = text.split()
        line = ""
        yy = y + 5
        for w in words:
            trial = (line + " " + w).strip()
            if len(trial) > 118:
                bits.append(f'<text x="14" y="{yy}" font-size="3" font-family="Liberation Sans, sans-serif" fill="{INK}">{line}</text>')
                yy += 4.2
                line = w
            else:
                line = trial
        if line:
            bits.append(f'<text x="14" y="{yy}" font-size="3" font-family="Liberation Sans, sans-serif" fill="{INK}">{line}</text>')
        y = yy + 8
    body = "\n".join(bits)
    return sheet(8, "Prototype sequence", body, "Full tools, adhesive, and QC text is in manual/MS-TM01-prototype-construction.md. One handmade pair. Not certified outdoor footwear.")


def write_svg():
    DRAW.mkdir(parents=True, exist_ok=True)
    sheets = {
        "sheet-01-orthographic.svg": sheet_01(),
        "sheet-02-upper.svg": sheet_02(),
        "sheet-03-outsole.svg": sheet_03(),
        "sheet-04-footbed.svg": sheet_04(),
        "sheet-05-exploded.svg": sheet_05(),
        "sheet-06-patterns.svg": sheet_06(),
        "sheet-07-bom.svg": sheet_07(),
        "sheet-08-sequence.svg": sheet_08(),
    }
    for name, svg in sheets.items():
        (DRAW / name).write_text(svg, encoding="utf-8")
    return list(sheets)


def dxf_pair(name, pts, note):
    def ent(poly_pts, layer):
        lines = ["0", "POLYLINE", "8", layer, "66", "1", "70", "1"]
        for x, y in poly_pts:
            lines += ["0", "VERTEX", "8", layer, "10", f"{x:.3f}", "20", f"{y:.3f}", "30", "0"]
        lines += ["0", "SEQEND", "8", layer]
        return lines

    body = [
        "0", "SECTION", "2", "HEADER",
        "9", "$INSUNITS", "70", "4",
        "0", "ENDSEC",
        "0", "SECTION", "2", "ENTITIES",
    ]
    body += ent(pts, "NET")
    body += ent(offset_poly(pts, 8), "ALLOWANCE_ASSUMPTION")
    body += [
        "0", "TEXT", "8", "NOTE", "10", "0", "20", "-12", "30", "0",
        "40", "3.5", "1", note[:180],
        "0", "ENDSEC", "0", "EOF",
    ]
    (PAT / name).write_text("\n".join(body) + "\n", encoding="utf-8")


def write_dxf():
    PAT.mkdir(parents=True, exist_ok=True)
    note = "PROVISIONAL proportion net. Not a last pattern. 8-unit allowance is a mock-up assumption. " + NB
    pieces = {
        "P01-upper-shell.dxf": upper_net(),
        "P02-lining.dxf": lining_net(),
        "P03-collar-foam.dxf": collar_foam(),
        "P05-logo-tab.dxf": logo_poly(),
        "P06-toe-puff.dxf": puff_poly(),
        "P07-footbed-topcover.dxf": footbed_poly(),
        "P08-footbed-base-outline.dxf": footbed_poly(),
    }
    for name, pts in pieces.items():
        dxf_pair(name, pts, note)
    # combined
    combined = ["0", "SECTION", "2", "HEADER", "9", "$INSUNITS", "70", "4", "0", "ENDSEC", "0", "SECTION", "2", "ENTITIES"]
    xoff = 0
    for name, pts in pieces.items():
        for x, y in pts + [pts[0]]:
            pass
        shift = [(x + xoff, y) for x, y in pts]
        combined += ["0", "POLYLINE", "8", "NET", "66", "1", "70", "1"]
        for x, y in shift:
            combined += ["0", "VERTEX", "8", "NET", "10", f"{x:.3f}", "20", f"{y:.3f}", "30", "0"]
        combined += ["0", "SEQEND", "8", "NET"]
        combined += ["0", "TEXT", "8", "NOTE", "10", str(xoff), "20", "-16", "40", "4", "1", name.replace(".dxf", "")]
        xoff += 280
    combined += ["0", "ENDSEC", "0", "EOF"]
    (PAT / "MS-TM01-patterns-combined.dxf").write_text("\n".join(combined) + "\n", encoding="utf-8")


def write_bom():
    BOM.mkdir(parents=True, exist_ok=True)
    rows = [
        ["U1", "Upper shell", "Solid stretch crinkled DWR nylon ripstop", "Yardblox A033513; 92% nylon / 8% spandex; 40 GSM; confirm grid", "1 yard buy allowance for the pair, not a yield", "Powder blue / fog grid", "Yardblox listing named by the brief — verify the live swatch", "Image shows a white windowpane grid. A plain listing may not include it.", "PROVISIONAL"],
        ["U2", "Upper stabilizer", "Sew-in tricot or nonwoven", "Test a fuse only after a bond trial on the DWR face", "0.5 yard buy allowance", "Neutral", "UNASSIGNED", "Required because 40 GSM is light for a lasted shell.", "FROM MEMORANDUM"],
        ["U3", "Toe puff", "Flexible footwear toe puff", "Hidden under the round toe, behind the bumper", "1 sheet", "Neutral", "UNASSIGNED", "Not a visible style line.", "FROM MEMORANDUM"],
        ["U4", "Upper lining", "Breathable textile", "Seen as a soft interior; exact cloth unspecified", "0.5 yard buy allowance", "Powder-blue family", "UNASSIGNED", "Do not invent a supplier.", "OBSERVED, SPEC OPEN"],
        ["U5", "Collar foam", "Soft footwear foam", "Memorandum names 4–6 mm; card shows a thick rolled collar", "1 sheet", "Neutral", "UNASSIGNED", "Thickness is not a measurement from the image.", "PROVISIONAL"],
        ["U6", "Logo tab", "Coated textile or synthetic leather", "Stitched perimeter, debossed MADE SAiNT, lowercase i", "2 tabs", "Powder blue", "UNASSIGNED", "Centered on the instep collar. Not a vamp tongue and not a backstay label.", "OBSERVED"],
        ["U7", "Thread", "Bonded polyester", "Tone-on-tone; needle chosen on a swatch", "1 set", "Slate or powder", "UNASSIGNED", "Stitch length by test, not by this drawing.", "ASSUMPTION"],
        ["F1", "Footbed base", "Contoured cork-latex", "Removable; must fit the US M 12 2E cavity of the sourced sole", "1 pair", "Natural cork", "UNASSIGNED", "Do not size from the nominal shoe size alone.", "FROM MEMORANDUM"],
        ["F2", "Footbed topcover", "Microfiber", "Powder blue, laminated to F1", "0.25 yard", "Powder blue", "UNASSIGNED", "Matches the card’s footbed ground.", "OBSERVED"],
        ["F3", "Footbed artwork", "Supplied Saint Michael woodcut", "Slate ink; head to the toe; wordmark beneath, toward the heel", "2 prints plus rub-test pieces", "Slate", "Founder-supplied file", "This package does not redraw the woodcut.", "ART FILE REQUIRED"],
        ["O1", "Rubber bottom", "Black rubber with raised sidewall, toe bumper, and plus-form lugs", "Compatible with a US M 12 2E last; brand not selected", "1 pair", "Black", "UNASSIGNED", "Do not describe any commercial sole as chosen.", "UNSOURCED"],
        ["A1", "Adhesive", "Flexible footwear contact cement", "Primer only if the cement maker requires it for that rubber", "Small containers", "—", "UNASSIGNED", "Ventilate. Follow the container.", "FROM MEMORANDUM"],
        ["B1", "Insole board", "Footwear-grade board", "Use only if the sourced sole is not a closed cup", "1 sheet", "Neutral", "UNASSIGNED", "Omit rather than invent a board the sole does not need.", "CONDITIONAL"],
        ["T1", "Last", "US men’s 12 wide, 2E", "Physical last required before patterns are rebuilt", "1", "—", "UNASSIGNED", "Not yet selected.", "REQUIRED"],
    ]
    path = BOM / "MS-TM01-bom.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["component_id", "component", "material", "specification", "quantity", "color", "supplier", "notes", "status"])
        w.writerows(rows)


def write_html(names):
    parts = []
    for name in names:
        svg = (DRAW / name).read_text(encoding="utf-8")
        svg = svg.replace('<?xml version="1.0" encoding="UTF-8"?>', "")
        parts.append(f'<section class="page">{svg}</section>')
    html = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/>
<title>MADE SAiNT MS-TM01 Prototype 001</title>
<style>
  @page {{ size: A3 landscape; margin: 0; }}
  html, body {{ margin: 0; padding: 0; background: #f6f5f2; }}
  .page {{ width: 420mm; height: 297mm; page-break-after: always; break-after: page; }}
  .page svg {{ width: 420mm; height: 297mm; display: block; }}
</style></head><body>
{''.join(parts)}
</body></html>'''
    (DRAW / "package.html").write_text(html, encoding="utf-8")


def main():
    REF.mkdir(parents=True, exist_ok=True)
    src = Path("/home/ubuntu/.cursor/projects/workspace/assets/6923e8a6-ff89-4caa-8442-b5770458956f.png")
    if src.exists():
        shutil.copy(src, REF / "trail-mule-reference-card.png")
    names = write_svg()
    write_dxf()
    write_bom()
    write_html(names)
    pub = ROOT.parent / "public" / "ms-tm01" / "drawings"
    pub.mkdir(parents=True, exist_ok=True)
    for svg in DRAW.glob("sheet-*.svg"):
        shutil.copy(svg, pub / svg.name)
    print("wrote", len(names), "sheets")


if __name__ == "__main__":
    main()
