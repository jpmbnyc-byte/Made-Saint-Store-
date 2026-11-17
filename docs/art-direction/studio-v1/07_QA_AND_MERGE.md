# Quality checks and merge contract

## Scope and provenance

- Reconcile the 200 baseline raster paths and two decorative CSS resources with the repository. Add unlinked/dynamic/CMS/video-poster/metadata images discovered there.
- Keep original source files and hashes. Obtain actual clean masters for the P0/low-resolution cases.
- Account for every usage, responsive art-direction variant, card, lightbox, related product, saved item and campaign composite.
- Graphic-only exceptions are explicit: wordmark, founder illustration, wordmark-only OG, decorative UI SVGs, and non-photographic technical cells. An exception must not be used to silently skip photographs embedded in plates.
- Every photographic source must resolve to the approved versioned master or its derived crop. Exact aliases must resolve to the same output.

## Per-image visual acceptance

1. Geometry: original garment cut, rise, pockets, pleat count, hem, shoe shape, tread, panel join and logo placement are intact.
2. Identity: original model, body proportions, face, hands, skin tone and hair are intact.
3. Color: selected product variant is correct; light correction has not created a new colorway. Match approved neutral-lit color references where available. Without a calibrated reference, do not claim measured color fidelity or a physical textile match.
4. Texture: real grain/weave/nap/mesh/stitching/reflective finish remains visible without invented detail, halos or smoothing.
5. Background/light: shared charcoal family, upper-left soft key, readable shadows, convincing contact shadows, no outdoor fragments or mask fringes.
6. Usage: every occurrence, derivative, thumbnail and enlarged view uses the same approved asset family.

Inspect the full processed contact sheet and every image at 100%; add targeted close inspection for crests, prints, hair, mechanisms and shoe panels. Keep those six completed QA results in the manifest. Boolean QA fields are a recorded review result, not a substitute for actually looking.

## Responsive and functional acceptance

- Test at least 390 px and 1440 px viewports, plus a large gallery/zoom view at its actual maximum display size.
- Check homepage carousel desktop/mobile, collection filters, lookbook cards, look detail, campaign, all three shoe series, each product gallery angle, Wardrobe request imagery, twelve paired capsules, archive, closet and related-item media.
- Preserve both people and their sides in every capsule. Full-plate views retain faces, hems and shoes. Do not use `object-cover` to solve a container problem by cutting off the product.
- Product swatch/variant, name, price and image agree. Brown Mesh no longer shows blush in the atelier view. Trail Mule source resolves and is the correct approved design.
- Typography and technical labels remain readable. Keep actual accessibility names and keyboard enlargement controls. Verify overlay contrast in all frames, not just one slide.
- Intrinsic dimensions reserve layout space. Correct `sizes` and crops prevent wrong-resolution downloads. No old/new color drift on hover or carousel transition; no double grading from inherited CSS overlays.
- Inspect encoded derivatives for banding, edge ringing, broken logos and weave loss. Do not request widths beyond the source master. Retain larger clean master files outside lightweight page downloads.
- Run the repository's prescribed checks and production build. Use meaningful media coverage checks and inspect deployment output for missing assets. Fix observed failures; do not invent irrelevant tests.

## Safe merge sequence

The user has already authorized merging this change to main. No new approval conversation is required.

1. Verify correct production repository and clean isolated worktree; inspect applicable repository instructions.
2. Create the focused feature branch from current remote main, without touching unrelated work.
3. Implement complete asset production and integration, resolving P0 issues. Keep a versioned mapping and reversible original sources.
4. Run local required checks/build and finish visual checks. Push the branch and open the repository's normal review/merge path if required.
5. Wait for actual required remote checks. Respect protected-branch and review requirements. Do not force, bypass, or change repository policies.
6. Sync current main. Resolve conflicts carefully, preserving unrelated work; rerun checks affected by the resolution.
7. Merge through the normal supported workflow. Verify the remote main commit or merged PR result, not just a local commit.
8. If deployment is automatic, inspect its returned status. If a separate deploy is within the user's existing workflow, perform it and verify the live result. Distinguish “merged” from “deployed.” Keep an image-map rollback available through normal version control.

Do not merge a partial implementation as the requested complete global pass. Do not label unresolved source limitations as “highest quality.” If an external blocker remains, report the exact assets, failed checks or access problem and the completed work. A local file, a draft PR or a successful build is not proof of a main merge.

## Required completion evidence

Return the actual repository/PR link, verified main commit, local/remote check results, reconciled source count, processed count, legitimate exceptions, source-resolution limits if any, and deployment status. Include representative live desktop/mobile visual evidence only after the real implementation is present.

## This package's current state

No repository changes were possible in the audit session. All 197 photographic/composite candidate paths are queued or source-blocked; none is recorded as approved retouched production media. The included approved trouser portraits are direction references. The release check should fail until real asset production, source recovery and integration are completed.
