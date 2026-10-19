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
POWDER = "#b7c5d2"
POWDER_DEEP = "#8ea3b5"
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


# --- shared side geometry, toe at left, y down. Proportion units, not millimetres. ---

UPPER = [
    (86, 150), (104, 132), (128, 118), (158, 110), (186, 112),
    (206, 104), (228, 98), (250, 102), (266, 114), (274, 132), (270, 150),
]
FOX = [
    (270, 150), (236, 156), (190, 160), (140, 158), (104, 150), (86, 150),
]
SOLE_TOP = [
    (22, 162), (40, 140), (64, 148), (100, 158), (150, 164),
    (200, 160), (240, 150), (276, 146), (300, 156), (304, 168),
]
SOLE_BOTTOM = [
    (304, 168), (296, 182), (260, 192), (180, 196), (100, 194),
    (48, 184), (22, 170), (18, 160), (22, 162),
]
LUG_BASE = [
    (40, 176), (70, 186), (120, 190), (180, 190), (240, 186), (275, 176),
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


def side_shoe(show_grid=True):
    global _clip_n
    _clip_n += 1
    cid = f"up{_clip_n}"
    upper = cr(UPPER + FOX[1:], closed=True)
    sole = cr(SOLE_TOP + SOLE_BOTTOM[1:], closed=True)
    lugs = []
    xs = [36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 286]
    for i, x in enumerate(xs):
        h = 11 + (i % 3)
        top = 190 - (3 if x < 60 or x > 270 else 0)
        w = 8 if i % 4 else 11
        lugs.append(
            f'<path d="M {x} {top} L {x+w*0.2:.1f} {top+h} L {x+w*0.8:.1f} {top+h} L {x+w:.1f} {top}" fill="{SOLE}" stroke="{INK}" stroke-width="0.35"/>'
        )
    grid = ""
    if show_grid:
        lines = []
        for i in range(8):
            yy = 100 + i * 8
            lines.append(f'<line x1="70" y1="{yy}" x2="268" y2="{yy}" stroke="#ffffff" stroke-width="0.25" opacity="0.55"/>')
        for i in range(16):
            xx = 70 + i * 12
            lines.append(f'<line x1="{xx}" y1="96" x2="{xx-6}" y2="160" stroke="#ffffff" stroke-width="0.25" opacity="0.45"/>')
        grid = f'<g clip-path="url(#{cid})">{"".join(lines)}</g>'
    return f'''<g>
      <defs><clipPath id="{cid}"><path d="{upper}"/></clipPath></defs>
      <path d="{sole}" fill="{SOLE}" stroke="{INK}" stroke-width="0.9"/>
      {''.join(lugs)}
      <path d="{upper}" fill="{POWDER}" stroke="{INK}" stroke-width="0.9"/>
      {grid}
      <path d="{cr(UPPER)}" fill="none" stroke="{INK}" stroke-width="0.8"/>
      <path d="{cr([(p[0]+1.5, p[1]+3.2) for p in UPPER[5:]])}" fill="none" stroke="{GRAY}" stroke-width="0.4"/>
      {logo_tab(200, 78, 52, 30)}
      <path d="M 22 162 C 70 150 140 162 220 158 C 270 150 300 156 304 168" fill="none" stroke="#111" stroke-width="0.55"/>
    </g>'''


def plan_shoe():
    sole = cr([
        (40, -36), (22, -22), (16, 0), (22, 22), (40, 36),
        (90, 54), (150, 62), (210, 58), (260, 44),
        (300, 22), (308, 0), (300, -22),
        (260, -44), (210, -58), (150, -62), (90, -54),
    ], closed=True)
    upper = cr([
        (52, -26), (36, -14), (32, 0), (36, 14), (52, 26),
        (96, 40), (156, 46), (210, 42), (250, 28),
        (268, 12), (262, 0), (268, -12),
        (250, -28), (210, -42), (156, -46), (96, -40),
    ], closed=True)
    opening = "M 196 -30 C 240 -24 286 -8 286 0 C 286 8 240 24 196 30 C 176 16 176 -16 196 -30 Z"
    return f'''<g>
      <path d="{sole}" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <path d="{upper}" fill="{POWDER}" stroke="{INK}" stroke-width="0.7"/>
      <path d="{opening}" fill="{POWDER_DEEP}" stroke="{INK}" stroke-width="0.6"/>
      {logo_tab(232, -10, 36, 20)}
      <text x="120" y="3" text-anchor="middle" font-size="5" fill="{SLATE}" font-family="Liberation Sans, sans-serif">ART · SHEET 04</text>
    </g>'''


def front_shoe():
    return f'''<g>
      <path d="M 8 78 H 132 L 128 92 H 12 Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <path d="M 18 78 C 14 62 28 50 46 48 H 94 C 112 50 126 62 122 78 Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <path d="M 48 52 C 52 40 88 40 92 52 L 98 70 H 42 Z" fill="{POWDER}" stroke="{INK}" stroke-width="0.7"/>
      <g fill="{SOLE}" stroke="{INK}" stroke-width="0.3">
        <path d="M 18 92 l 5 12 h 8 l 4 -12"/>
        <path d="M 42 92 l 5 14 h 10 l 5 -14"/>
        <path d="M 74 92 l 5 14 h 10 l 5 -14"/>
        <path d="M 106 92 l 4 12 h 8 l 4 -12"/>
      </g>
    </g>'''


def rear_shoe():
    return f'''<g>
      <path d="M 8 86 H 140 L 134 100 H 14 Z" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      <path d="M 20 86 H 128 L 120 74 H 28 Z" fill="{SOLE_MID}" stroke="{INK}" stroke-width="0.6"/>
      <path d="M 34 74 C 32 50 50 38 74 36 C 98 38 116 50 114 74 Z" fill="{POWDER}" stroke="{INK}" stroke-width="0.75"/>
      <path d="M 46 62 C 50 48 98 48 102 62 C 90 70 58 70 46 62 Z" fill="{POWDER_DEEP}" stroke="{INK}" stroke-width="0.6"/>
      {logo_tab(54, 16, 40, 22)}
      <g fill="{SOLE}" stroke="{INK}" stroke-width="0.3">
        <path d="M 16 100 l 6 12 h 10 l 4 -12"/>
        <path d="M 44 100 l 6 14 h 12 l 5 -14"/>
        <path d="M 78 100 l 6 14 h 12 l 5 -14"/>
        <path d="M 112 100 l 5 12 h 10 l 4 -12"/>
      </g>
    </g>'''


def bottom_shoe():
    outline = cr([
        (40, -36), (22, -20), (16, 0), (22, 20), (40, 36),
        (90, 54), (150, 62), (210, 58), (260, 44),
        (300, 22), (308, 0), (300, -22),
        (260, -44), (210, -58), (150, -62), (90, -54),
    ], closed=True)
    lugs = []
    for row, y in enumerate(range(-40, 48, 16)):
        for col, x in enumerate(range(48, 280, 18)):
            # keep inside a simple ellipse
            nx = (x - 160) / 145
            ny = y / 58
            if nx * nx + ny * ny > 1:
                continue
            lugs.append(
                f'<g transform="translate({x} {y})" fill="{PAPER}" stroke="{INK}" stroke-width="0.35">'
                f'<rect x="-5" y="-1.6" width="10" height="3.2" rx="0.6"/>'
                f'<rect x="-1.6" y="-5" width="3.2" height="10" rx="0.6"/>'
                f'<circle cx="0" cy="0" r="0.7" fill="{INK}" stroke="none"/></g>'
            )
    return f'''<g>
      <path d="{outline}" fill="{SOLE}" stroke="{INK}" stroke-width="0.8"/>
      {''.join(lugs)}
    </g>'''


def footbed_shape():
    return cr([
        (40, 0), (28, 18), (26, 40), (36, 70), (52, 100),
        (70, 130), (78, 160), (70, 188), (48, 200), (40, 188),
        (34, 160), (28, 120), (24, 70), (28, 30),
    ], closed=True)


def sheet(num, title, body, note):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="420mm" height="297mm" viewBox="0 0 420 297">
  <rect width="420" height="297" fill="{PAPER}"/>
  <rect x="6" y="6" width="408" height="285" fill="none" stroke="{INK}" stroke-width="0.6"/>
  <text x="12" y="16" font-family="Liberation Serif, Times New Roman, serif" font-size="7" fill="{INK}">MADE SAiNT</text>
  <text x="78" y="16" font-family="Liberation Sans, sans-serif" font-size="3.6" fill="{SLATE}">MS-TM01 · TRAIL MULE · PROTOTYPE 001 · REV A</text>
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
      {frame(10, 32, 200, 112, "LATERAL · TOE LEFT · LOGO TAB ON THE HEEL COLLAR")}
      <g transform="translate(16 40) scale(0.58)">{side_shoe()}</g>
      {frame(214, 32, 196, 112, "MEDIAL · SAME SILHOUETTE · NO CONFIRMED ASYMMETRY")}
      <g transform="translate(220 40) scale(0.55)">{side_shoe(False)}</g>
      {frame(10, 148, 132, 112, "TOP · TOE LEFT · HEEL OPENING TO THE RIGHT")}
      <g transform="translate(22 168) scale(0.34)">{plan_shoe()}</g>
      {frame(146, 148, 86, 112, "FRONT · TOE BUMPER")}
      <g transform="translate(154 162) scale(0.7)">{front_shoe()}</g>
      {frame(236, 148, 86, 112, "REAR · OPEN COLLAR")}
      <g transform="translate(242 160) scale(0.68)">{rear_shoe()}</g>
      {frame(326, 148, 84, 112, "BOTTOM · GROUND FACE")}
      <g transform="translate(332 176) scale(0.24)">{bottom_shoe()}</g>
      <g font-family="Liberation Sans, sans-serif" font-size="2.8" fill="{INK}">
        <text x="12" y="254">Callouts are visual, not dimensions: 1 rounded toe inside the bumper · 2 ripstop vamp, no confirmed center seam · 3 padded rolled collar · 4 heel logo tab, wordmark MADE / SAiNT · 5 wave sidewall · 6 plus-lug ground face · 7 open heel.</text>
      </g>
    '''
    return sheet(1, "Orthographic set", body, "Reference card is the design authority. Lateral and medial are paired. Elastic gores from the memorandum are not drawn: they are not visible on the card.")


def sheet_02():
    body = f'''
      {frame(10, 34, 250, 150, "LATERAL CONSTRUCTION · BLACK = VISIBLE EDGE · GRAY = HIDDEN OR UNCONFIRMED")}
      <g transform="translate(20 48) scale(0.72)">{side_shoe()}</g>
      <g font-family="Liberation Sans, sans-serif" font-size="3.1" fill="{INK}">
        <text x="268" y="42">UPPER BUILD — OBSERVED VS ASSUMED</text>
        <text x="268" y="52">U1 Shell. Powder-blue grid ripstop.</text>
        <text x="268" y="58">Yardblox A033513 is the named listing.</text>
        <text x="268" y="64">Grid may not be in the plain listing.</text>
        <text x="268" y="74">U2 Collar. Same shell over foam.</text>
        <text x="268" y="80">Image: rolled, tonal, padded.</text>
        <text x="268" y="86">Navy tape is not on the card.</text>
        <text x="268" y="96">U3 Logo tab. Heel collar only.</text>
        <text x="268" y="102">Stitched border. Debossed wordmark.</text>
        <text x="268" y="108">Not a vamp tongue.</text>
        <text x="268" y="118">U4 Lining. Breathable textile.</text>
        <text x="268" y="124">Seen inside the opening. Spec open.</text>
        <text x="268" y="134">U5 Toe puff. Hidden. Memorandum.</text>
        <text x="268" y="140">Not a visible design line.</text>
        <text x="268" y="150">U6 Stabilizer. Memorandum. Test</text>
        <text x="268" y="156">before fusing a 40 GSM shell.</text>
        <text x="268" y="166">No confirmed side seam. No center</text>
        <text x="268" y="172">seam. A short back seam may sit</text>
        <text x="268" y="178">under the logo tab. Unverified.</text>
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
      <g transform="translate(24 58) scale(0.62)">{bottom_shoe()}</g>
      {frame(246, 34, 164, 140, "SIDEWALL PROFILE · WAVE AND TOE BUMPER")}
      <g transform="translate(250 48) scale(0.48)">{side_shoe(False)}</g>
      <g font-family="Liberation Sans, sans-serif" font-size="3.1" fill="{INK}">
        <text x="14" y="186">O1 One black rubber bottom is what the card shows: sidewall, toe bumper, and lug field read as one sculpted unit.</text>
        <text x="14" y="194">O2 A separate rand is not drawn. Add one only if the sourced sole does not already include the raised wall.</text>
        <text x="14" y="202">O3 Lug family on the card: plus-form, multi-directional, with a small center pip. This layout is a schematic, not a mold.</text>
        <text x="14" y="210">O4 Do not name or imply a commercial outsole brand. None has been selected.</text>
        <text x="14" y="218">O5 Bond surface is the cavity and the top of the wall. Its outline comes from the physical sole, not from this drawing.</text>
        <text x="14" y="226">O6 Sidewall top edge is a wave: higher at the toe bumper and the heel, lower through the waist.</text>
        <text x="14" y="234">O7 Toe bumper wraps the round toe. The textile toe sits behind the rubber, not in front of it.</text>
        <text x="14" y="248">Target: US M 12 2E compatible sole. A nominal size 12 sole is not assumed to fit a 2E last.</text>
      </g>
    '''
    return sheet(3, "Outsole construction", body, "No manufacturer is specified. The plus lug is recorded as observed character so a sourced sole can be compared with the card.")


def sheet_04():
    shape = footbed_shape()
    body = f'''
      {frame(10, 34, 180, 220, "FOOTBED PLAN · TOE AT TOP · HEAD OF THE FIGURE TOWARD THE TOE")}
      <g transform="translate(48 44) scale(0.72)">
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
        (36, "5  Logo tab", "heel collar, stitched, not bonded into the sole"),
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
      <g transform="translate(16 40) scale(0.42)">{side_shoe(False)}</g>
      <text x="16" y="132" font-size="3" font-family="Liberation Sans, sans-serif" fill="{SLATE}">ASSEMBLY REFERENCE SILHOUETTE</text>
      <g transform="translate(20 150) scale(0.36)">{bottom_shoe()}</g>
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
        <text x="300" y="160">P04 BINDING is a straight strip.</text>
        <text x="300" y="166">Length comes from the opening</text>
        <text x="300" y="172">after the mock-up. Not drawn to size.</text>
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
        ("U6", "Logo tab", "Coated textile or synthetic", "Stitched, debossed wordmark", "2", "Powder blue", "UNASSIGNED", "Heel collar, not a tongue"),
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
        ("D", "Upper", "Stabilize only after a bond test. Sew the shell, foam, and lining. Roll the collar in the shell cloth. Stitch the logo tab on the heel collar. Deboss or stamp from the wordmark file."),
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
        ["U6", "Logo tab", "Coated textile or synthetic leather", "Stitched perimeter, debossed MADE SAiNT, lowercase i", "2 tabs", "Powder blue", "UNASSIGNED", "Located on the heel collar. The card does not show a vamp tongue.", "OBSERVED"],
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
