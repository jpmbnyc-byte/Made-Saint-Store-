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
