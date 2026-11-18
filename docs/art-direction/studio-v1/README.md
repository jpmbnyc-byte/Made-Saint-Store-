# Global charcoal studio pass — partial integration + stage chrome

This branch connects twelve reviewed charcoal edits covering thirteen source paths, and applies the shared charcoal studio stage (`.ms-studio-stage`) to product and look media wells sitewide. Versioned web images and recovered source masters are in `public/art/studio-v1/`. The shared resolver reads `production.json`.

**Credit-efficient scope:** ship the already-reviewed photographic remaps and unify letterboxing / gallery wells to the house charcoal stage (`#505352` → `#353837`). Do not treat CSS wells or filters as a substitute for remapping outdoor or mixed-location photographs. Remaining remap inventory stays outstanding until recovered masters are authorized.

## What is live

- Approved 1101 colorway pairs + laterals, Brown Mesh shared master, Stone Velour lookbook entry, and three archive alternates via `studioImage()`.
- Sitewide `.ms-studio-stage` media wells on shop, PDP gallery, Line collection/lookbook, wardrobe archive/capsules, closet, and home product frames.
- No CSS `filter` on photographs as a fake studio pass.

## What is not claimed

- Full photographic remapping of the remaining ~300+ outdoor / mixed-location sources.
- Capsule outdoor plates, campaign ruins/coast frames, and unrecovered low-resolution portraits.

## Workflow

1. Run `npm run imagery:audit`. Use `-- --write` only after reviewing source changes; commit the refreshed inventory.
2. Recover clean approved originals for source blockers and retouch actual image masters into `public/art/studio-v1/`.
3. Populate `production.json.replacements` with the fields enforced by `scripts/studio-audit.mjs`.
4. Run `npm run test:studio` and repository tests / production build. Visual check at 390 px and 1440 px.

The direction references and full audit remain in `01_AUDIT_AND_DIRECTION.md` and `IMPLEMENTATION_AND_SCREENSHOT_PLAN.md`.
