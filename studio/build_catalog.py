#!/usr/bin/env python3
"""Build the MEES sourcing catalog used by the Collection Studio.

Reads MEES's public Google Drive folders (linked from https://mees.productions/links/),
tags every material photo with a texture family, and extracts the swatch colors that
appear on each card. Output: src/data/mees-catalog.json.

Texture tags are visual reads of supplier photos. Article names, compounds and
minimums must be confirmed with MEES before anything is ordered.
"""

from __future__ import annotations

import concurrent.futures as cf
import html
import io
import json
import re
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / ".cache"
OUT = ROOT.parent / "src" / "data" / "mees-catalog.json"
UA = {"User-Agent": "Mozilla/5.0"}

FOLDERS = {
    "LEATHER": "1tDBW90vO-QQr4_aHIgSd_azAwEXFNfnT",
    "VEGAN LEATHER": "11L4wt50kNMxIaxGo4qtOx1iuzUb55ESa",
    "MESH": "10Vuf12YJv-wltq-29lrZQQLuk3XP-q3F",
    "TEXTILES": "1cmEkRPbL-kHpBdKFFnzRTRkR8NQgFELF",
    "TEXTILES RECYCLED NATURAL": "1k1JH5MsvwPaTliMo6z7GpbJl9igFLuc_",
    "SOCK KNITWEAR": "1vFP0Emz6mmQplSTehGJgYvNjcYj6z6oc",
    "CORDS BANDS": "1o2UOFJ3d74nHZX_VmnJ24mnRqmsvkelK",
    "SOLE COLORS": "1bpJaKJqq10bNHaiStBFpvF1R6p_ER1-t",
}

FAMILY_LABEL = {
    "suede": "Suede / nubuck leather",
    "leather-smooth": "Smooth or grained calf leather",
    "leather-exotic": "Embossed or printed exotic leather",
    "leather-patent": "Patent leather",
    "leather-quilted": "Quilted leather",
    "vegan-suede": "Microsuede (vegan)",
    "vegan-smooth": "Vegan leather, smooth or grained",
    "vegan-exotic": "Vegan leather, embossed or printed",
    "vegan-crackle": "Vegan leather, crinkled / waxed",
    "mesh": "Air mesh / sports mesh",
    "stretch": "Stretch lycra / lining jersey",
    "knit": "Engineered knit",
    "canvas": "Canvas / twill",
    "nylon": "Technical nylon (Cordura-type)",
    "felt": "Wool felt",
    "pile": "Velvet / corduroy / pile",
    "print": "Printed or patterned textile",
    "check": "Check / plaid textile",
    "natural": "Linen / natural weave",
    "cork": "Cork sheet",
    "neoprene": "Neoprene",
    "laces": "Lace cord",
    "tape": "Tape / ribbon (nastro)",
    "sole-color": "Sole compound colors",
}


def ranges(*spans):
    out = set()
    for s in spans:
        if isinstance(s, int):
            out.add(s)
        else:
            out.update(range(s[0], s[1] + 1))
    return out


# Indexes refer to the crawl order below (folder order, then Drive listing order).
# They come from reviewing contact sheets of every photo.
TAGS = [
    ("skip", ranges(0, 227, 247, (563, 593), 643)),
    ("suede", ranges(56, 173, 177, 213, (230, 233))),
    ("leather-patent", ranges(116)),
    ("leather-quilted", ranges((184, 186))),
    ("leather-exotic", ranges((1, 11), (20, 54), (120, 130), (152, 157), 226, 228)),
    ("vegan-suede", ranges(272, 273)),
    ("vegan-crackle", ranges(260, (265, 268))),
    ("vegan-exotic", ranges(237, 238, 239, 244, 245, 249, 258, 261, 269, 274)),
    ("stretch", ranges(276, 284, 285, 315, 316, 328)),
    ("cork", ranges(336, 337, 338)),
    ("neoprene", ranges(418, 419, 489)),
    ("nylon", ranges(387, 388, (378, 383), 398, 399, (480, 487))),
    ("felt", ranges((329, 332), (384, 386), (389, 397), 476)),
    ("pile", ranges(335, 354, (413, 416), 433, 436, 447, 449, (450, 452), 503, 505, 513, 523, 531)),
    ("check", ranges(421, 456, 458, 497, 535, 537)),
    ("natural", ranges(339, 353, 417, 441, 524, 525)),
    ("print", ranges(333, (341, 352), 412, (420, 431), 434, 435, (437, 440), (442, 446), (461, 468),
                     490, (498, 502), 504, (506, 512), (514, 522), (526, 534), (541, 547))),
    ("mesh", ranges((275, 327), (470, 475), (491, 496))),
    ("knit", ranges((548, 562), (594, 621))),
    ("laces", ranges((622, 637))),
    ("tape", ranges((638, 642))),
    ("sole-color", ranges((644, 648))),
]


def family_for(idx: int, path: str) -> str:
    for fam, idxs in TAGS:
        if idx in idxs:
            return fam
    if path.startswith("LEATHER"):
        return "leather-smooth"
    if path.startswith("VEGAN"):
        return "vegan-smooth"
    if path.startswith("TEXTILES"):
        return "canvas"
    return "skip"


def ls(fid: str):
    url = f"https://drive.google.com/embeddedfolderview?id={fid}#list"
    s = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read().decode("utf-8", "replace")
    out = []
    for m in re.finditer(r'<a href="([^"]+)"[^>]*>.*?class="flip-entry-title">([^<]+)<', s, re.S):
        href, title = html.unescape(m.group(1)), html.unescape(m.group(2)).strip()
        fm = re.search(r"/folders/([\w-]+)", href)
        im = re.search(r"/file/d/([\w-]+)", href)
        if fm:
            out.append(("D", fm.group(1), title))
        elif im:
            out.append(("F", im.group(1), title))
    return out


def crawl():
    items = []

    def walk(path, fid, depth=0):
        for kind, i, t in ls(fid):
            if kind == "D" and depth < 3:
                walk(f"{path} / {t}", i, depth + 1)
            elif kind == "F":
                items.append({"path": path, "id": i, "name": t, "folder": fid})

    for name, fid in FOLDERS.items():
        walk(name, fid)
    return items


def thumb(fid: str, size=320) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    fn = CACHE / f"{fid}_{size}.jpg"
    if not fn.exists() or fn.stat().st_size < 500:
        url = f"https://drive.google.com/thumbnail?id={fid}&sz=w{size}"
        fn.write_bytes(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read())
    return fn


def srgb_to_oklab(rgb: np.ndarray) -> np.ndarray:
    c = rgb / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    l = 0.4122214708 * c[:, 0] + 0.5363325363 * c[:, 1] + 0.0514459929 * c[:, 2]
    m = 0.2119034982 * c[:, 0] + 0.6806995451 * c[:, 1] + 0.1073969566 * c[:, 2]
    s = 0.0883024619 * c[:, 0] + 0.2817188376 * c[:, 1] + 0.6299787005 * c[:, 2]
    l_, m_, s_ = np.cbrt(l), np.cbrt(m), np.cbrt(s)
    return np.stack([
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    ], axis=1)


def swatches(fn: Path, k=10):
    """Dominant swatch colors on a card, with the paper and page background removed."""
    im = Image.open(fn).convert("RGB")
    im.thumbnail((96, 96))
    px = np.asarray(im, dtype=np.float64).reshape(-1, 3)
    lab = srgb_to_oklab(px)
    chroma = np.hypot(lab[:, 1], lab[:, 2])
    keep = ~((lab[:, 0] > 0.86) & (chroma < 0.05))
    px, lab = px[keep], lab[keep]
    if len(px) < 40:
        return []
    rng = np.random.default_rng(7)
    centers = lab[rng.choice(len(lab), size=min(k, len(lab)), replace=False)]
    for _ in range(14):
        d = ((lab[:, None, :] - centers[None, :, :]) ** 2).sum(-1)
        lbl = d.argmin(1)
        for j in range(len(centers)):
            sel = lab[lbl == j]
            if len(sel):
                centers[j] = sel.mean(0)
    out = []
    total = len(lab)
    for j in range(len(centers)):
        sel = px[lbl == j]
        w = len(sel) / total
        if w < 0.03:
            continue
        r, g, b = np.median(sel, axis=0).round().astype(int)
        out.append({"hex": f"#{r:02x}{g:02x}{b:02x}", "w": round(float(w), 3)})
    out.sort(key=lambda s: -s["w"])
    return out[:8]


SOLES = [
    # Shortlist from MEES "SOLES catalog". Size range is read from the Drive file name.
    {"id": "171OiJRNfwc7e_hn4cq7EZC2ZafeA_d-1", "path": "SOLES / MEN", "name": "39-46 cs.jpg",
     "family": "sole-nub", "label": "Round nub lugs on a separate midsole layer", "sizes": "EU 39–46",
     "fits": ["runner"], "note": "Closest to the runner's bubble lugs. Midsole layer can carry the printed foxing."},
    {"id": "1_kz17Sq6tK2t3QE-QB58bi0yhhJ76gqe", "path": "SOLES / MEN", "name": "cs - 39-46.jpg",
     "family": "sole-nub", "label": "Dense nub-lug cupsole", "sizes": "EU 39–46",
     "fits": ["runner"], "note": "Second option for the runner. Taller sidewall than the concept."},
    {"id": "1vl9YRVpkDwTc9V1B8SLV7KTkMWqPisvn", "path": "SOLES / UNISEX", "name": "LIV 35-46.jpeg",
     "family": "sole-wall", "label": "Sculpted wave-wall cupsole, chunky block lugs", "sizes": "EU 35–46",
     "fits": ["mule"], "note": "Closest to the Trail Mule wall and toe bumper. Lugs are blocks, not plus-form."},
    {"id": "1j-RXeLRlUskt_c-fEkg4Gi8-PigDJ227", "path": "SOLES / UNISEX", "name": "57343.jpg",
     "family": "sole-wall", "label": "Wavy-wall cupsole, deep lugs", "sizes": "Not stated",
     "fits": ["mule"], "note": "Second option for the Trail Mule. Size range must be confirmed."},
    {"id": "1dZDeLkw9eEjH9xfkS-28b3-Ail4G_PAo", "path": "SOLES / PRE-MADE", "name": "Recycled blended lug unit",
     "family": "sole-flat", "label": "Flat lug unit with plus-form center lugs", "sizes": "Cut to size",
     "fits": ["mule"], "note": "Only plus-form lug in the catalog. No wall, so a rand would be needed."},
]


def main():
    print("crawling MEES Drive…", file=sys.stderr)
    items = crawl()
    print(len(items), "files", file=sys.stderr)

    def work(pair):
        idx, it = pair
        fam = family_for(idx, it["path"])
        if fam == "skip":
            return None
        try:
            sw = swatches(thumb(it["id"]))
        except Exception as e:  # noqa: BLE001
            print("thumb failed", it["name"], e, file=sys.stderr)
            return None
        if not sw:
            return None
        return {
            "id": it["id"],
            "ref": f"MEES-{idx:03d}",
            "path": it["path"],
            "name": it["name"],
            "family": fam,
            "swatches": sw,
        }

    with cf.ThreadPoolExecutor(12) as ex:
        arts = [a for a in ex.map(work, list(enumerate(items))) if a]

    soles = []
    for s in SOLES:
        try:
            s = {**s, "swatches": swatches(thumb(s["id"]))}
        except Exception:  # noqa: BLE001
            s = {**s, "swatches": []}
        soles.append(s)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({
        "source": "https://mees.productions/links/",
        "families": FAMILY_LABEL,
        "articles": arts,
        "soles": soles,
    }, separators=(",", ":")))
    from collections import Counter
    print(Counter(a["family"] for a in arts), file=sys.stderr)
    print("wrote", OUT, len(arts), "articles", file=sys.stderr)


if __name__ == "__main__":
    main()
