# MADE SAiNT — studio production, merge and screenshot audit plan

Prepared 16 November 2026. Working PR: [#81](https://github.com/jpmbnyc-byte/Made-Saint-Store-/pull/81). Branch: `art/global-studio-tonal-pass`.

**Goal:** deliver the complete charcoal studio treatment across active campaign, lookbook and product photography, preserve MADE SAiNT designs, merge the verified implementation to main, then prove the live result with desktop/mobile screenshots and an issue register.

## Current evidence

At the status check for commit `0443a70e4d36dae9c52cf1554e7af83ccb266cf8`, both Vercel preview statuses were successful. PR #81 was open, draft and unmerged. These checks establish successful preview builds, not a completed visual audit. A later implementation commit must earn its own checks.

The prior local validation recorded 56 application tests plus seven studio tests passing, lint passing and the production build passing. The inventory covers 200 live-audit paths, 977 repository raster files and one additional missing path. It includes 197 baseline photographic/composite candidates, 159 additional scope-review candidates, and 619 supplier material references plus three baseline graphics to preserve. These are path counts, not counts of unique photographs or completed retouches.

Approved production replacements: **zero**. The new Solène proof was rejected because fine jersey print/lettering changed. No finished visual treatment has been merged. This document is a work plan; it contains no new screenshot audit or visual-approval claim.

## 1. Resolve sources and establish the actual release scope

Trace every active image through data records, components, dynamic routes, galleries, mobile/desktop sources, zoom, saved closet, request thumbnails, related products and photographic social previews. Resolve the 159 additional candidates in `scope.json`, recording a reason and review for each decision. Use the inventory's 88 exact-byte alias groups as a starting point; identify resized/cropped derivatives separately by provenance and visual comparison.

| Blocker | Required action | Evidence needed to close it |
|---|---|---|
| Solène jersey print/lettering drift | Reject the generated proof as a production master; recover the best approved original and use the protected-subject workflow below | Original/output comparison of face, full print, wordmark and sleeve badge at native resolution |
| `/line/f60.webp` missing | Search the repository history and the user's actual archive for the correct Trail Mule technical pack | Verified correct design, usable source dimensions and working intended route; no invented technical evidence |
| Brown Mesh atelier image shows blush | Recover the correct Brown Mesh angle; if unavailable, remove the incorrect angle and use only verified Brown Mesh views | Every displayed gallery frame agrees with the selected product/colorway |
| Four 298 × 232 wardrobe sources | Recover clean individual photographs for `arrival-trouser-look`, `blouson-black-zip`, `jacket-black-denim` and `look-knit-mauve` | Exact garment/fit match; no screenshot UI, clipped garment or reconstructed print |
| Solène principal portrait, 432 × 576 | Recover the exact high-resolution portrait; otherwise identify an existing approved same-look photograph suitable for all affected placements | Identity, outfit and framing match; measured dimensions support the intended display |
| M-charm/headwrap and other undersized sources | Recover their original approved exports; preserve the exact cord, opening, mesh and satin construction | Mechanism and texture review plus adequate native resolution |
| Capsule “masters” and large exports, all 1536 × 1024 | Locate the original larger exports if available; otherwise size and limit enlargement honestly to the available source | Both people/outfits remain intact; no enlarged pixels described as recovered detail |

Search the user's linked archive and relevant Library assets by product and visual identity; filenames alone do not establish a match. Search repository history for deleted originals. Record the original path/hash and recovered source relationship. Do not substitute another product or recolor a wrong variant.

If an exact frame cannot be recovered, use a verified existing same-product alternative or retire a redundant/incorrect image usage while retaining adequate buying detail. Record the change explicitly and verify every former usage. Update the release validator to support such documented retirements and verified replacements; do not bypass it with blanket exceptions. A unique unresolved product image stays a release blocker.

Supplier material swatches retain their reference colors. Pure wordmarks, illustrations, technical linework and documentary place images need appropriate explicit treatment decisions; photographic cells inside a composite still require review. The release must account for every active campaign, lookbook and product image.

## 2. Protect the subject before changing the studio

Use a layered editor capable of masks and local tonal adjustments. Keep the original full-resolution subject as the source layer. Create separate masks for background/floor, subject edges, cast shadow, and protected branding/construction details.

- Preserve the source face/body, fit, fabric pattern, crests, lettering, shoe panels, laces, cord mechanism and hardware. Retain original pixels in these areas; do not ask a generative model to redraw the complete garment/person as the primary production method.
- Replace the background/floor on a separate layer. Match the approved neutral charcoal family, broad upper-left key and believable contact shadows. Work carefully around hair, mesh openings, straps and translucent fabric.
- Apply restrained, nondestructive local light/color adjustments to the original subject. Retain the photographed material colors and shadow texture. If a source needs relighting that cannot be achieved faithfully, use another approved source or retain a blocker.
- If generative assistance is used for the stage, keep its editable region outside the protected subject. No changed branding is accepted because the overall image looks attractive. Restore details from the original aligned layer where possible; reject the result if geometry or legibility cannot be preserved.
- For collages and technical packs, edit photographic cells separately and rebuild the composition with original text and linework. Derive card, full and enlargement versions from one reviewed master.

No global CSS filter, hover grading or dark overlay counts as this photographic pass.

## 3. Validate a representative proof set, then produce the full batch

Start with eight sources covering: (1) Solène's printed jersey; (2) a dark full-length look; (3) a pale full-length look; (4) a mesh runner with emblem; (5) headwrap/cord/transparent material; (6) a paired capsule; (7) an ensemble campaign; (8) the Private Wardrobe delivery scene. Use the actual affected sources, not newly invented garments.

For every proof, compare source and output at native resolution with detail crops for branding, texture, face/hair, garment edges and footwear. Check geometry, identity, color, texture, background/contact shadow and all usage assignments. Digital inspection cannot establish a calibrated physical textile match without a calibrated reference.

If a proof fails, fix the method on that source before applying it to the family. Once the method passes, process the remaining unique masters in reviewable family batches. Inspect every master, not only the eight examples. Keep originals and layered edits; export sRGB derivatives only at supported resolutions. Required image pixels must support the largest intended CSS display size and target device pixel ratio. Upscaling is not source recovery.

## 4. Integrate approved assets and enforce coverage

Populate `production.json` with actual approved source/master/output hashes, reviewer/date, dimensions, intended render limits, source-resolution notes and six visual checks. Keep proof, rejected and approved states distinct.

Implement one shared versioned image mapping through the existing data owners/components. Update all active usages, including gallery angles, zoom, saved items, related products, homepage slides, request imagery and social previews. Keep static-export copies and transformed-image caches consistent with the production pipeline. Remove any inherited effects that double-grade the processed photographs. Preserve product IDs, prices, swatches, enquiry behavior, cream/ivory UI and genuine graphic content.

Run:

```bash
npm run imagery:audit
npm run imagery:release
npm run test:studio
npm test
npm run lint
npm run build
```

Extend meaningful checks for shared mapping coverage, variant agreement, missing files and any documented image retirements. Reconcile against current main before release. Tests or build success do not replace visual review.

## 5. Audit the completed preview with screenshots before merge

Capture the current live baseline before implementation and the completed preview at matching viewports: desktop **1440 × 1000** and mobile **390 × 844**. Record the URL, environment, commit, viewport, page/state and capture time for every accepted screenshot. Wait for fonts and images to settle; reject loading, blank, obstructed or wrong-state captures. Inspect the exact saved files.

| Surface | Required states and checks |
|---|---|
| Homepage | Every image slide and desktop/mobile crop; text contrast, LCP image and no exposure shift |
| Lookbook | Full grid and every look detail; consistent stage, intact branding, full silhouette |
| Campaign | Each active photographic composition; every person/prop preserved, coherent shared light |
| Footwear | Every active product/colorway and gallery angle, related cards and maximum zoom; consistent construction and variant |
| Apparel/product detail | Main image, alternates and macros; cloth/print fidelity and adequate detail |
| Private Wardrobe | Service hero, archive, request thumbnails and all twelve paired capsules; preserve arrival story and both outfits |
| Saved closet/bag | Saved piece/look and reload; correct approved thumbnails, working links and unchanged enquiry/bag eligibility |

Create an all-assets contact sheet, inspect every approved full-size image, and capture detail evidence for critical branding/mechanisms. For each distinct gallery/zoom UI, test keyboard operation and focus behavior; inspect the remaining states for regressions. Check broken requests and image sizes as well as what screenshots show. Screenshots alone cannot prove source provenance, full keyboard accessibility or performance.

Store paired evidence under `qa/studio-v1/<commit>/<environment>/`, with numbered desktop/mobile files and an index linking each image to its page, state, source IDs and findings. Report each issue with screenshot/step, severity, reproduction, fix and retest result. Keep screenshots free of personal, measurement and payment data by using dummy local/test state.

**Preview gate:** every active photographic usage accounted for; all replacement records complete; zero missing/wrong-variant images, altered branding, clipped products or unresolved major visual/functional defects; commands pass; actual preview deployment for the candidate commit succeeds. Any remaining minor issue must be named, not hidden in an average score.

## 6. Merge the completed pass and audit production

After the preview gate passes, mark PR #81 ready, follow the repository's review/check requirements and merge to main under the user's existing authorization. Do not bypass branch protections. Record the merge SHA and wait for the production deployment associated with that SHA to succeed.

Repeat the screenshot matrix on the live production domain using the same viewport/state labels. Compare production against the accepted preview for missing assets, stale caches, wrong crops, variant drift and changed overlays. Retest enquiries, galleries and saved imagery without sending real customer enquiries or placing orders.

If deployment fails, repair deployment before reporting success. If production introduces a major visual/product regression, revert the image-map/asset release through a focused revert or restore the prior deployment using the repository's established process. Preserve source masters and document the failure.

**Final evidence:** merged PR and main SHA; production deployment/URL; active source and unique master counts; approved/retired/graphic/reference counts; all check results; screenshot index with before/preview/live comparisons; resolved issue register and any specifically limited residual findings. Claim the global pass complete only after the live screenshot audit passes.

## Work order and completion rule

Execute in order: source recovery and scope → eight proofs → family production and per-image QA → full integration → preview screenshot audit → merge → live screenshot audit. Source recovery and proof fidelity are the first critical dependencies. Do not promise a completion date until they pass. No further conversational merge permission is needed for this already-authorized release; technical or repository review requirements still apply.
