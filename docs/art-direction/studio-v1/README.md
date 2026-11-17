# Global charcoal studio pass — blocked draft

This branch contains source reconciliation and production acceptance checks. It does **not** implement the finished photographic pass and must not be merged as though it does. Existing production image assignments are intact. No retouched image has been approved or deployed.

The direction is one neutral charcoal studio, a broad upper-left key and readable shadows, with small fill differences between product, lookbook and campaign. Preserve garment color, product construction, face, fit, print, logos, hair, cords and hardware. The original direction references and full audit are in the supplied `MADE_SAiNT_Global_Studio_Pass_2026-11-16.zip`; the four production briefs included here retain that scope.

## Source reconciliation

- Main baseline: `25ae5e209dbd74e6dea1fff129319e66d17e371e`.
- Live audit: 200 raster paths across 97 linked routes; 197 photographic/composite candidates and three graphic exceptions.
- Repository: 977 raster files; 978 inventoried paths including the missing Trail Mule source.
- Additional scope review: 159 repository candidates. Their existence does not establish that they are currently deployed. Review runtime/template/CMS usage before treating coverage as complete.
- Preserve 619 supplier material-reference images used for textile/sole selection. Regrading them would alter the evidence used for material selection; they are distinct from campaign, lookbook and product photography.
- `inventory.json` records dimensions, hashes, literal source owners, baseline route owners and exact-byte alias groups. It includes the material catalogue's constructed thumbnail paths. It is not a complete runtime dependency graph or evidence of visual approval.

## Verified blockers

- `/line/f60.webp` is absent from the repository and was missing on the live audit.
- Brown Mesh's `/runners/1213/1101-brown-atelier.webp` remains an incorrect blush variant; recover the approved Brown Mesh angle instead of recoloring it.
- Four wardrobe sources remain only 298 × 232. Solène's principal portrait remains 432 × 576. No clean replacement master for those exact frames has been established.
- Capsule `large` derivatives are 1536 × 1024, matching the ordinary plates. All twelve repository PNG files labelled `masters` are also 1536 × 1024; they provide no additional pixel dimensions.
- A new Solène charcoal proof rendered successfully, but jersey lettering and small print changed. It was rejected for production, is not assigned in the application and is not an approved resolution upgrade. Do not batch that result across the catalogue.

## Workflow

1. Run `npm run imagery:audit`. Use `-- --write` only after reviewing source changes; commit the refreshed inventory.
2. Resolve the 159 `review_scope` candidates in `scope.json.decisions`, keyed by original source path, including aliases and retired/internal media. Each decision needs `disposition` (`retouch` or a reasoned `preserve_...` exception), `reason`, `reviewedBy` and `reviewedAt`. Then regenerate the inventory. Baseline photographic scope stays intact. Do not silently discard photographs.
3. Recover clean approved originals for source blockers and retouch the actual image masters. Produce versioned files under `public/art/studio-v1/`, deriving aliases and responsive variants from the same master. Inspect every output at full size.
4. Populate `production.json.replacements` by original source path using the fields enforced by `scripts/studio-audit.mjs`. Record source/output/master hashes, local master path, editor, reviewer/date, dimensions, maximum render size, source recovery and all six visual checks. Keep originals intact. No fields are pre-approved.
5. Run `npm run test:studio` and `npm run imagery:release`. The latter is expected to fail on this draft. Passing it establishes asset records only; integrate those mappings into all actual image owners, gallery/zoom/social/desktop/mobile paths, and check for double grading.
6. Complete repository tests, lint, production build and visual checks at 390 px and 1440 px plus zoom. Follow `07_QA_AND_MERGE.md`; verify the real main commit and deployment separately.

The draft intentionally introduces no CSS filter, photographic overlay, changed product assignment or invented replacement for a missing source.
