"""Write small WebP card thumbnails for every catalog entry into public/mees/thumbs.

Run after build_catalog.py, which fills studio/.cache with the Drive thumbnails.
"""

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / ".cache"
OUT = ROOT.parent / "public" / "mees" / "thumbs"
CATALOG = ROOT.parent / "src" / "data" / "mees-catalog.json"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    cat = json.loads(CATALOG.read_text())
    n = 0
    for item in cat["articles"] + cat["soles"]:
        src = next(iter(sorted(CACHE.glob(f"{item['id']}_*.jpg"), reverse=True)), None)
        if not src:
            continue
        im = Image.open(src).convert("RGB")
        im.thumbnail((160, 160))
        im.save(OUT / f"{item['id']}.webp", "WEBP", quality=72)
        n += 1
    print(f"wrote {n} thumbnails to {OUT}")


if __name__ == "__main__":
    main()
