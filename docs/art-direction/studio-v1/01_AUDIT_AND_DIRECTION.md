# MADE SAiNT — one house light

**Recommendation:** move the photographic collection into one neutral charcoal studio world. Use a broad, directional light from upper camera-left, rich midtones, open shadows and quiet matte backgrounds. Keep the clothes' actual colors and construction. Let small changes in fill and framing distinguish campaign, lookbook and product work.

This should feel like the approved trouser portraits: assured, tactile, precise and expensive. The site should feel photographed under one art director, with each frame serving its subject.

## What was inspected

Audit date: November 16, 2026. Site: https://www.madesaint.store/.

| Scope | Result |
| --- | --- |
| Linked public routes retrieved | 97, all returned HTTP 200 in the crawl |
| Raster image paths discovered | 200, including serialized capsule enlargements and social image |
| Raster sources retrieved | 199; one source returned 404 |
| Photographic/composite candidates for the pass | 197 paths, including the missing Trail Mule source |
| Graphic exceptions | Wordmark, founder illustration and wordmark-only OG image |
| Additional decorative CSS resources | `/brand/liquid.svg` and `/brand/grain.svg`, explicitly recorded as UI graphics |
| Non-logo retrieved images under 1600 px on the long edge | 151 of 197; this includes photographic and composite/illustration media |
| Non-logo retrieved images under 1024 px on the long edge | 9 |
| Visual review | All 199 retrieved raster sources in labeled contact sheets; representative originals also opened individually |
| Live browser review | Homepage, lookbook, campaign, footwear index, Brown Mesh gallery, Private Wardrobe, Miami Arrival capsule and Fine Cashmere Turtleneck detail |

The source inventory records actual deployed source dimensions rather than Next.js requested resize widths. A requested `w=3840` is not evidence of a 3840-pixel original. Only source-level checks cover the other 89 routes; they were not each visually inspected in-browser. No mobile viewport, every hover state, every gallery interaction, private CMS or repository-only media was audited. A repository reconciliation is required for full coverage.

## Current photographic problem

The clothing has a recognizable voice, but the images move between sunlit limestone, ochre walls, golf courses, coral stairs, white product cutouts, warm beige shoe still lifes, burgundy drapery, upholstered rooms and gray studio sets. Their light direction, background warmth, shadow density and image scale vary. Beside one another, these frames feel assembled from different sessions.

Several images already have a useful gray-studio foundation. Keep those subjects and refine the background tone and light response. Outdoor frames need careful subject separation and reconstruction of the environment. A dark filter cannot make these two situations equivalent.

## Numbered browser evidence

| Step | Surface and inspected state | General health | Evidence and change |
| --- | --- | --- | --- |
| 01 | Homepage, rotating hero including cap/mark studies | Visually mixed | Tight warm cap imagery and material macros compete with differently styled hero assets. The source inventory also contains cool runner artwork and warm process panels. Rebuild each photographic master to the shared light; art-direct desktop/mobile separately. |
| 02 | `/line/lookbook`, first rows | Inconsistent lighting/background | Solène's ochre outdoor frame sits next to Sage's warm mottled studio wall. Both subjects can belong to the same charcoal world without changing their garments or poses. |
| 03 | `/line/campaign`, campaign and look frames | Weak tonal continuity | Ruins/coastline ensemble plates, outdoor jersey imagery and other reused looks carry different stage settings. Apply the common environment to all photographic panels, with slightly more directional campaign contrast. |
| 04 | `/shop`, footwear grid | Consistent within some groups; inconsistent across families | 1101 pairs use beige ground; 1213 and 0929 originals include pale neutral studio backgrounds. Standardize the stage, apparent product scale and contact shadows across series. |
| 05 | Brown Mesh product gallery | Strong main detail; gallery source error | Main hero is warm and sun-streaked. `/runners/1213/1101-brown-atelier.webp` shows pink/blush mesh despite placement on Brown Mesh. Correct the source before retouching, rather than grading a wrong variant. |
| 06 | `/wardrobe`, service hero | Clear service idea; separate visual world | Preserve the person, wardrobe boxes, garment bag and fitting/arrival idea. Make the backdrop and support surfaces quiet charcoal and neutralize the lighting. Do not reduce this to an empty portrait and lose the service proposition. |
| 07 | Miami Arrival paired capsule | Clear paired structure; warm outdoor mismatch | Preserve both people, their sides, garments, footwear and shared palette. Replace the background as one scene with one shadow system. The detail page must continue to show the full paired plate. |
| 08 | `/line/n014`, Fine Cashmere Turtleneck | Styling evidence; limited isolated product evidence | The inspected page uses a layered full outfit rather than an isolated turtleneck. Retouch that actual frame; do not invent an unseen standalone garment or infer hidden construction. |

Accepted session screenshots: `01-home.jpg`, `02-lookbook.jpg`, `03-campaign.jpg`, `04-shop.jpg`, `05-product-gallery.jpg`, `06-private-wardrobe.jpg`, `07-capsule.jpg`, `08-apparel-detail.jpg`. Exact captured bytes were saved under the session's shared audit directory and inspected. They are not bundled here. The source paths and contact-sheet IDs provide persistent media evidence.

## Highest-priority corrections

| Priority | Exact source / placement | Finding | Required action |
| --- | --- | --- | --- |
| P0 | `/line/f60.webp`, used on Trail Mule `/line/r046` | HTTP 404 | Recover the approved Trail Mule technical pack. Keep the technical geometry and required labels legible; no unrelated shoe replacement. |
| P0 | `/runners/1213/1101-brown-atelier.webp` | Visually blush/pink mesh in Brown Mesh gallery | Locate the correct Brown Mesh source; verify against the main Brown Mesh hero and product record. |
| P0 | `/wardrobe/arrival-trouser-look.webp`, `/wardrobe/blouson-black-zip.webp`, `/wardrobe/jacket-black-denim.webp`, `/wardrobe/look-knit-mauve.webp` | Each is only 298 × 232, with screenshot/contact-sheet framing | Recover clean original photographs or separate garment views. Enlarging these will not restore detail. |
| P0 | `/collection/solene.webp` | 432 × 576, reused in multiple contexts | Recover the original. Protect face, jersey print, shirt, trousers and shoes. Do not fabricate higher-resolution product details. |
| P1 | `/hero/slides/05-m-charm.webp`, `/hero/slides/06-headwrap.webp` | Only 525 × 682 and 498 × 682 respectively | Recover larger masters and component panels before wide-hero use. Preserve cord, emblem and mesh/satin construction. |
| P1 | `/wardrobe/capsules/*-large.webp` | All twelve are 1536 × 1024, the same pixel dimensions as the regular plates | Obtain true high-resolution masters for enlarged/lightbox use. A “large” suffix is not a resolution upgrade. |
| P1 | Duplicated aliases | Four exact byte-duplicate groups in the snapshot | Process once per canonical image and reuse the same output; never let aliases drift into different grades. |

Exact duplicate groups: `amara-camel` / `forerunner`; `camel` / `lucien-terracotta`; `collection/malik` / `knit/turtleneck-iconic`; `1101-brown-pair` / `1101-butter-pair`. Other card/full/large families require matching crops from one recovered master even when their encodings differ.

## The shared photographic standard

| Element | House standard | Purpose |
| --- | --- | --- |
| Background | Neutral charcoal seamless, restrained tonal falloff; indicative center `#505352`, edge `#353837` | Gives the colors and silhouette a consistent stage |
| Ground | Matte dark-gray plane near `#454847`, soft natural subject contact | Grounds footwear and hems without reflective showroom gloss |
| Key light | Broad soft source, upper camera-left, around 35–45° to subject | Reveals weave, velvet direction and panel relief |
| White balance | Neutral subject rendering; approximately daylight-neutral, judged against the approved reference | Removes environment casts while preserving actual cloth hue |
| Shadows | Deep but readable; maintain differentiation between black, navy and dark green | Retains the luxurious material information the buyer needs |
| Highlights | Soft rolloff; retain texture in ivory, butter, metallic hardware and satin | Prevents plastic, blown-out surfaces |
| Color | Original garment/skin color protected, with local environmental-cast correction | Makes this an artistic photographic pass rather than a new colorway collection |
| Skin and hair | Real texture, natural complexion, preserved identity and hair silhouette | Keeps models human and consistent |
| Texture | Fine local contrast without halos, waxy denoising, invented weave or excessive clarity | Material quality must remain believable |
| Grain | Very restrained if already part of an editorial master; none added to technical/product evidence | Avoids using artificial grain to hide low source quality |

The HEX values describe backdrop direction, not pixel-flat replacement fills or a new garment palette. Keep the background convincingly lit with a gentle gradient. Avoid bright halos around heads, gray fog, black voids or a theatrical spotlight circle.

## Deliberate nuance within one world

Keep roughly 90% of the photographic treatment shared. Use the remaining nuance for readability and expression, not new locations or arbitrary presets.

| Image role | Controlled adjustment | What stays fixed |
| --- | --- | --- |
| Product / material evidence | Slightly more fill, approximately 2:1 key-to-fill starting point; neutral rendering; complete product silhouette | Same charcoal family, light side, actual color and construction |
| Lookbook / paired capsules | Approximately 3:1 starting point; enough fill to read whole outfits and faces | Same backdrop, ground, soft key, lens character and shadow direction |
| Campaign | Up to approximately 4:1 starting point, gently deeper background and purposeful negative space | Same neutral family and soft directional light; garment detail remains visible |
| Dark garment / dark skin | Add subtle broad separation/fill rather than whitening the subject or adding a luminous cutout rim | Authentic complexion and fabric hue |
| Pale cloth | Slightly reduce highlight intensity; retain weave and seams | Actual ivory/butter/lilac color, rather than gray contamination |
| Velvet / brushed wool | Let the nap respond to key light without painting on exaggerated highlights | True pile and weave scale |
| Hardware / satin / reflective detail | Control specular peaks locally | Actual finish and panel shape; no generic chrome treatment |
| Seated / service scene | Retain necessary chair, bench, boxes, desk or garment bag as neutral foreground props | Pose, support geometry and the scene's commercial meaning |

Ratios are production starting points for a retoucher/photographer, not values to claim have been measured from the existing images. The approved visual references take precedence.

## Scope by image family

| Family | Complete treatment |
| --- | --- |
| Lookbook, collection and look details | Retouch canonical masters, then derive cards, hero crops and detail views. Never retouch a card independently of its detail source. |
| Campaign ensembles and coastline composites | Preserve all models, clothes, arrangement and framing. Replace scenery consistently; preserve necessary supports with neutral studio props. Multi-panel pieces must be rebuilt panel by panel from masters. |
| Capsule pairs | One shared scene; both genders retained in original sides. Derive card, full plate and enlargement from the same high-resolution master. |
| Footwear | All series, pair/profile/medial/overhead/rear/on-foot views and macros. Match shoe scale within comparable views; never invent eyelets, logos, tread or missing angles. |
| Hanging/isolated apparel and bags | Keep actual hanger/garment/strap geometry and measured shape. Isolate from busy retail backgrounds. Restore precise contact shadows and genuine material texture. |
| Product contact sheets / front-and-back plates | Obtain separate originals, retouch each photo, rebuild plate with original labels and organization. Do not darken entire rasterized text boards. |
| Process imagery and technical drawings | Retouch photographic cells; preserve drawings and measurement labels as readable graphics on their appropriate neutral field. Never convert technical linework into an atmospheric dark photo. |
| Headwrap / cord / M macro | Protect mechanism, mesh openings, hair, cord alignment and material-layer color response. Only background/exposure changes. |
| Private Wardrobe hero | Keep the luxury professional delivery/fitting story and visible service props; bring surfaces and lighting into the same neutral studio environment. |
| Founder illustration, wordmark and wordmark-only OG graphic | Preserve the artwork. These are intentional graphic exceptions, not missed photographic assets. |

Once a photograph no longer depicts ruins or a coast, its image-specific alt/caption must describe the new studio frame. Preserve any relevant house narrative separately; do not imply the revised frame was photographed in the removed location. Do not rewrite unrelated sales copy or invent a new campaign story.

## Source fidelity and delivery quality

Use the highest-resolution approved source available in the repository or supplied archive, not a rendered screenshot or a previously resized web derivative. Lookbook/full-length masters should usually support at least 2400 × 3200; hero masters should support the intended desktop crop at up to 3840–4096 px width. Product masters should support at least 2400–3200 px on the relevant long edge where source truth permits. These are production targets, not a claim that the deployed originals currently meet them.

Do not enlarge a 298 × 232 or 432 × 576 file and label it “4K quality.” Do not let AI invent print, label, stitching, face or shoe detail to hide unavailable originals. Recover originals; record any remaining source blocker. A faithful smaller image is better evidence than a fabricated larger one, but it does not satisfy the requested highest-quality release.

Keep an archival edit master with masks/layers where supported. Export web derivatives in sRGB. Use actual source-supported sizes, accurate `sizes`/`srcset`, explicit aspect ratio and a separately considered mobile crop. Prefer AVIF/WebP where verified by the project's existing pipeline, retaining a compatible fallback. Start quality testing around 88–92 for principal images and 80–86 for smaller cards, then inspect actual encoded results; do not assume the same numeric setting behaves identically across codecs.

Never upscale for `srcset`. Derive all sizes once from the processed master, preserve dimensions to prevent layout shift, and use versioned URLs to avoid stale transformed-image caches. Keep original product names, prices, IDs, variant links, enquiry state and design-preview disclosures.

## Existing CSS to avoid reactivating

The retrieved stylesheet includes `.ms-underlit`, `.ms-gallery-well img`, `.ms-grain`, `.ms-light-pool` and `.ms-hero-atmosphere` treatments. Some contain brightness/contrast/saturation filters, multiply gradients or colored light pools. Those class names were not present in the 97 captured page HTML files, so this audit does **not** claim they are currently applied to those rendered images. They are a source-review risk: do not reactivate or stack them on top of finished retouching. Inspect actual component usage and remove only image-affecting duplicates when integrating the new masters. Leave unrelated navigation blur and intentional UI artwork alone.

## Accessibility and verification limits

Charcoal images can improve light-text separation but are not proof of accessible contrast. Test actual text-over-image states, keyboard gallery controls and zoom dialogs. Keep at least 4.5:1 for normal text and 3:1 for qualifying large text. Avoid hue-only selected states, preserve useful alt text, and ensure a versioned media resolver does not remove dimensions or accessible names. Those require implementation testing; screenshots alone do not establish compliance.

## Status

This report and media inventory are complete for the stated live-discovery scope. No source code, production images or branches were changed. No merge or deployment occurred. The required next dependency is the actual production repository, followed by source recovery and image-production work. The user's authorization to merge already exists.
