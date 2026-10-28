# MADE SAiNT · MS-TM01 Trail Mule

Prototype 001 technical package for one handmade pair. US men’s 12 wide (2E). Powder blue / fog grid / black.

The reference card is the design authority. Drawings are proportion studies for a patternmaker. They are not measured patterns.

## Package

All source files are in `ms-tm01/`:

- `drawings/` — eight editable A3 SVGs
- `pdf/MS-TM01-P001-technical-package.pdf` — A3 landscape
- `patterns/` — provisional DXF nets
- `bom/MS-TM01-bom.csv`
- `manual/MS-TM01-prototype-construction.md`
- `notes/ambiguity-register.md`

Regenerate drawings, DXF, and CSV with:

```bash
python3 ms-tm01/generate.py
```

## View

```bash
npm install
npm run dev
```

The local site shows the eight sheets and links the PDF, the bill of materials, and the construction manual.

## Collection Studio (`/studio`)

Feed a palette and get a three-look collection on the locked flats, with every component matched to a real MEES material card.

- **Palette.** Up to 7 hex colors, typed, picked, or extracted from an image. Share one with `/studio?p=e4dccd,7f5f65,3d2c31`.
- **Roles.** Colors are assigned to Ground (mesh, lining, laces), Body (overlays, shell), Depth (outsole, sockliner), Signal (emblem, print), and Bridge (midsole band, logo tab). Missing roles are derived and marked.
- **Looks.** Each look picks a locked flat (bubble-lug runner or Trail Mule) and a recipe (Hero, Tonal, Inverse). Lining and emblem stay fixed across the collection.
- **Sourcing.** Each component searches only the MEES families that make sense for it, picks the card with the closest swatch (OKLab ΔE ×100), and prefers cards already used elsewhere in the collection. Under 2.5 is on card, 2.5–8 is a lab dip, over 8 is dye to target. Components outside the MEES library are listed as trims to specify.
- **Colorway stories.** Six runner colorways from the founder renders (navy intrecciato, espresso/oxblood, graphite tonal, chalk/navy, navy weave/rust, washed denim). Each fixes exact colors and constructions, pins construction-specific MEES cards where they exist, prints the wordmark on the tongue, and drops the grid band. Share a lineup with `/studio?looks=navy-intrecciato,chalk-navy,washed-denim`.
- **Cost.** Per-pair build-up (materials, trims, sole, make, packaging, freight, duty, development) to retail and margin, per look and for the collection. Per-pair rates are estimates until MEES quotes.
- **Production chat.** Bottom-right. Runs the studio from plain sentences, in the browser, no API key.
- **Export.** Material list CSV and a print layout, one look per page.

Card colors are measured from the MEES photos on Google Drive, so treat every ΔE as a starting point and confirm on physical swatches.

Rebuild the MEES catalog (crawls the public Drive folders, about 20 seconds):

```bash
pip install pillow numpy
python3 studio/build_catalog.py   # writes src/data/mees-catalog.json
python3 studio/make_thumbs.py     # writes public/mees/thumbs/*.webp
```
