# Global charcoal studio pass — partial integration

This branch connects twelve reviewed charcoal edits covering thirteen source paths. They include the Stone Velour lookbook entry, three archive alternates, and the five active 1101 colorways with their existing lateral views. Versioned web images and recovered source masters are in `public/art/studio-v1/`. The shared resolver reads `production.json`. Browser acceptance and the remaining 314 source paths in the remap are outstanding. The Vercel preview requires sign-in.

The direction is one neutral charcoal studio, a broad upper-left key and readable shadows, with small fill differences between product, lookbook and campaign. Preserve garment color, product construction, face, fit, print, logos, hair, cords and hardware. The original direction references and full audit are in the supplied `MADE_SAiNT_Global_Studio_Pass_2026-11-16.zip`; the four production briefs included here retain that scope.

## Source reconciliation

- Main baseline: `25ae5e209dbd74e6dea1fff129319e66d17e371e`.
- Live audit: 200 raster paths across 97 linked routes; 197 photographic/composite candidates and three graphic exceptions.
- Repository: 977 raster files; 978 inventoried paths including the missing Trail Mule source.
- Additional scope review: 159 repository candidates classified. Include 130 in retouch review and preserve 29 brand graphics, original capsule masters, and São Roque location references. The retouch queue now contains 327 paths. Verify runtime/template/CMS usage before assigning derivatives.
- Preserve 619 supplier material-reference images used for textile/sole selection. Regrading them would alter the evidence used for material selection; they are distinct from campaign, lookbook and product photography.
- `inventory.json` records dimensions, hashes, literal source owners, baseline route owners and exact-byte alias groups. It includes the material catalogue's constructed thumbnail paths. It is not a complete runtime dependency graph or evidence of visual approval.

## Verified blockers

- `/line/f60.webp` was deliberately removed in PR #62 with the titled and misfiled mule imagery. The audit found a stale reference. Recover clean Trail Mule photography for any future placement.
- PR #82 removed the incorrect blush variant from the Brown Mesh source gallery. The matching Brown Mesh Atelier view still needs a verified original if the angle is reinstated.
- Four wardrobe sources remain only 298 × 232. Solène's principal portrait remains 432 × 576. No clean replacement master for those exact frames has been established.
- Capsule `large` derivatives are 1536 × 1024, matching the ordinary plates. All twelve repository PNG files labelled `masters` are also 1536 × 1024; they provide no additional pixel dimensions.
- A new Solène charcoal proof rendered successfully, but jersey lettering and small print changed. It was rejected for production, is not assigned in the application and is not an approved resolution upgrade. Do not batch that result across the catalogue.

## Workflow

1. Run `npm run imagery:audit`. Use `-- --write` only after reviewing source changes; commit the refreshed inventory.
2. Use the recorded scope in `scope.json.decisions` to review runtime routes, aliases, and retired/internal media before assigning retouched derivatives. Regenerate the inventory after any scope adjustments.
3. Recover clean approved originals for source blockers and retouch the actual image masters. Produce versioned files under `public/art/studio-v1/`, deriving aliases and responsive variants from the same master. Inspect every output at full size.
4. Populate `production.json.replacements` by original source path using the fields enforced by `scripts/studio-audit.mjs`. Record source/output/master hashes, local master path, editor, reviewer/date, dimensions, maximum render size, source recovery and all six visual checks. Keep originals intact. No fields are pre-approved.
5. Run `npm run test:studio` and `npm run imagery:release`. The latter is expected to fail on this draft. Passing it establishes asset records only; integrate those mappings into all actual image owners, gallery/zoom/social/desktop/mobile paths, and check for double grading.
6. Complete repository tests, lint, production build and visual checks at 390 px and 1440 px plus zoom. Follow `07_QA_AND_MERGE.md`; verify the real main commit and deployment separately.

The draft intentionally introduces no CSS filter, photographic overlay, changed product assignment or invented replacement for a missing source.

## Static snapshot export

The standard Next.js build succeeds. The optional static snapshot export fails because `src/app/line/[ref]/page.tsx` awaits `searchParams` during export. Existing tracked snapshots were restored after that failed attempt. The current integration requires the Next.js deployment for updated page mappings.
