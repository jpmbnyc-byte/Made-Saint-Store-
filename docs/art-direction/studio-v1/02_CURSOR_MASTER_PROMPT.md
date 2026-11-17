# CURSOR MASTER PROMPT — implement and merge the global studio pass

You are editing the existing production repository for MADE SAiNT at https://www.madesaint.store/. The user has authorized this artistic image pass across the site and explicitly said: “Merge it to main.” Carry the work through implementation, validation and merge when the release criteria below pass. Keep the current website, catalogue and business behavior intact.

## Intended result

All photographic media should belong to the same neutral-charcoal studio world as the two approved trouser images in `references/`: a broad upper-left key, sculptural but readable shadows, a quiet matte floor, authentic texture and accurate garment color. This includes lookbook, campaign, product views, capsule plates, archive frames, the service hero, macros, cards, galleries, lightboxes and desktop/mobile hero variants. Use small purposeful differences in fill and contrast by role; do not create separate unrelated visual worlds.

This is a production asset pass, not a global dark CSS filter and not a new set of clothes. Preserve every model, garment, fit, print, crest, shoe panel, logo, cord mechanism, hardware finish, variant and material. Do not copy ISAIA branding or substitute reference garments. Do not apply the trouser palette to other products.

## 1. Establish the correct source and protect existing work

Read repository instructions, identify the app and canonical production URL, inspect Git status and existing build commands. Confirm this is the repository that serves MadeSaint.store. Do not edit the separate fit or tonal demo projects.

If the working tree contains unrelated changes, create an isolated worktree from the actual `origin/main`. Use a focused branch such as `art/global-studio-tonal-pass`. Preserve uncommitted work. Do not force-push or change permissions. The supplied package is an audit/handoff; it is not an already implemented branch.

## 2. Reconcile the complete media graph

Use `04_ASSET_MANIFEST.json` and `03_ASSET_ACTIONS.csv` as the baseline: 200 raster paths discovered across 97 linked routes, plus two decorative SVG assets. Search the real source for all references from public assets, product records, gallery arrays, content/CMS records, CSS backgrounds, `picture` sources, `srcset`, modals/lightboxes, desktop/mobile art direction, campaign composites, social previews, structured metadata and client-only/unlinked routes.

Extend the inventory for everything missed by public discovery. Do not stop at the first screen or the DOM's currently selected gallery image. Trace repeated media through all usages and resolve aliases to one canonical processed master. In particular, card/full/large capsule files must be generated from the same master rather than retouched independently. Report coverage after source reconciliation, not just the baseline's count.

## 3. Resolve source blockers first

- `/line/f60.webp` is a missing Trail Mule technical pack on `/line/r046`.
- `/runners/1213/1101-brown-atelier.webp` shows blush/pink mesh in the Brown Mesh gallery. Locate the correct approved variant before grading.
- Four `/wardrobe/` files are only 298 × 232 and contain screenshot/contact-sheet framing: `arrival-trouser-look`, `blouson-black-zip`, `jacket-black-denim`, `look-knit-mauve`.
- `/collection/solene.webp` is 432 × 576; two related terracotta aliases are 512 × 682.
- M-charm and headwrap hero source files are 525 × 682 and 498 × 682.
- The twelve `*-large.webp` capsule files are still 1536 × 1024, not true large enlargement masters.

Recover clean, approved masters from the project's actual archive/assets. Use supplied source manifests to identify the right product; do not scrape unrelated images or invent missing product evidence. Do not convert a wrong shoe variant into the correct one by recoloring it. Do not generate fake seam, crest or label detail as “upscaling.” Record unrecoverable inputs as blockers and do not describe the release as complete while they remain.

## 4. Produce the actual retouched masters

Follow `01_AUDIT_AND_DIRECTION.md` and `06_RETOUCH_PROMPTS.md`. Use an image-editing/retouching tool capable of subject masks, background replacement and local tonal work, or supplied production-grade retouched masters. Keep the original files intact and create versioned outputs, for example `/art/studio-v1/...`, adapting to the existing media pipeline.

Protect the subject before changing the stage. Recover hair edges, mesh openings, hands, cords, laces and semi-transparent fabric. Build believable contact shadows. Match background depth and key direction throughout. Preserve face/body identity, camera angle, pose, full silhouette and actual product color. Never flatten velvet, de-crinkle intentional nylon, smooth real pores, remove seams or paint metallic highlights onto suede.

For campaign groups, preserve all people and their placement; create one coherent shared studio light. For seated models, retain a physically plausible neutral support at the same height. For the Private Wardrobe service hero, preserve the boxes, garment bag, fitting/arrival story and necessary support furniture. For plates/collages, obtain original cells, retouch photographs and rebuild the composition while preserving text, linework and organization. Technical drawings and genuine founder/brand artwork must remain clear graphic material.

Role profiles are restrained variations of the same master: product fill around 2:1, lookbook around 3:1, campaign up to around 4:1 as starting points, judged visually. Do not bake these ratios into a generic image filter. Subject color accuracy and retained shadow detail take priority.

If the environment cannot produce faithful asset edits, do not simulate completion with CSS or substitute generated designs. Keep original production assignments intact, prepare the remaining integration work and report the precise asset-production blocker.

## 5. Integrate one resolved image system

Use the existing data owners and image components. Introduce a shared manifest/resolver only if needed to ensure one source-of-truth mapping from original asset to versioned master and its derivatives. Centralize role, dimensions, aspect ratio, focal point, responsive crop and alt text. Do not scatter suffix replacements or URL string manipulation through components.

Update every usage: homepage carousel, collection and filters, lookbook cards, look detail galleries, campaign, product tiles and every product gallery angle, wardrobe archive, paired capsules, request-builder thumbnails, saved closet/bag media, service hero, related products, zoom/modal views, mobile crops, and photographic social previews when present. Preserve graphic-only wordmarks, founder illustration, graphic-only OG and decorative UI SVGs.

The deployed stylesheet contains `.ms-underlit`, `.ms-gallery-well img`, `.ms-grain`, `.ms-hero-atmosphere` and `.ms-light-pool` effects. Their selectors exist, but the first two class names were not found in the captured route markup. Inspect source before changing them. Do not activate them as a shortcut. Where photographic usage does apply, remove double-grading, color-tinted atmospheres, animated exposure overlays and hover exposure shifts from the new processed media. Preserve unrelated navigation/backdrop styling and existing accessibility behavior.

Image wrappers may use a neutral loading/background color from the same family, but a CSS background behind an opaque old beige photograph does not replace that photograph's background. A black overlay does not replace its lighting. Do not deliver `filter: brightness(...) contrast(...) saturate(...)`, multiply overlays or hover grading as the artistic implementation.

Keep the site's existing cream/ivory UI, navigation, hierarchy, enquiry behavior, labels, pricing, product IDs, variants and design-preview status. Change alt/captions only where the depicted environment actually changed: a studio group should no longer be literally described as standing in ruins. Preserve brand geography/story elsewhere without inventing shoot provenance.

## 6. Export for highest actual quality

Use clean high-resolution edit masters, sRGB output and consistent encoding. Derive responsive files only at sizes the actual master supports. Start principal-image comparisons around quality 88–92 and cards around 80–86 where compatible with the project's encoder, then inspect textural detail and artifacts. Never emit a 3840-wide derivative from a 432-wide original and claim restored detail.

Give every image intrinsic dimensions/aspect ratio and accurate `sizes`. Preserve `object-fit` and focal points by role: full product and paired plates must remain complete; a hero may have explicit desktop/mobile crops. Reserve layout space, preload only the actual LCP image, and lazy-load offscreen images. Version URLs and invalidate any transformed-image references that would otherwise keep old cached media. Do not repeatedly recompress already compressed web files.

## 7. Verify the entire result

Run repository-prescribed checks and the real production build. Validate all source assignments and aliases. Use the bundled inventory checker as an additional audit aid; it does not replace the repository's own tests or visual verification. Fill the manifest with actual replacement files, master provenance, intended render dimensions and completed QA results.

Inspect a contact sheet of every processed asset and each full-size output at 100%. Compare source versus output for face, geometry, logos, print, fit, color, texture and contact shadows. Check all gallery angles and aliases. Review representative desktop and mobile pages, filters, carousels, enlarged images, closet and related-product states. Product selected color must agree with every image shown. Measure text-over-image contrast and check keyboard gallery controls. Preserve full paired outfits, faces, hems and shoes.

## 8. Merge to main

When the whole scoped pass meets `07_QA_AND_MERGE.md`, commit the focused change, push its branch, run required remote checks and merge to the actual main branch using the repository's normal workflow. Follow branch protection; never bypass it. Sync against the latest main and rerun checks if conflict resolution changes relevant files. No extra conversational approval is needed for the merge the user requested.

Do not merge a partial mixture of new/old photography as if this were the complete global pass. If source recovery, faithful image production, repository permissions or required checks block completion, state the blocker and exact remaining scope. Never claim a merge without a remote merge commit/PR confirmation. Never claim a live deployment without checking deployment evidence.

Final handoff must include the real branch/PR, verified main commit, checks, source count and replacement count, any legitimate graphic exceptions, and deployment state. Be explicit about anything that remains unverified.
