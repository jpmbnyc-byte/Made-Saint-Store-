/**
 * SET12 wardrobe pieces from approved look photography.
 * Apparel is enquire-only — these styles are not named on the 17 Nov 2026 working price sheet.
 * Runner links point at live 0106 shop products.
 */

export type PieceCategory = "knit" | "trouser" | "layer" | "top";

export type WardrobePiece = {
  slug: string;
  name: string;
  color: string;
  category: PieceCategory;
  /** Full-look photograph that shows the piece. */
  image: string;
  alt: string;
  line: string;
  /** Compatible 0106 runner product id, when the look shows one. */
  runnerId?: string;
};

export type WardrobeLook = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  pieceSlugs: string[];
  runnerId?: string;
};

export const WARDROBE_PIECES: WardrobePiece[] = [
  {
    slug: "crew-knit-forest",
    name: "Fine-gauge crew knit",
    color: "Forest",
    category: "knit",
    image: "/looks/set12/forest-mustard.webp",
    alt: "Forest fine-gauge crew knit worn with mustard column trousers",
    line: "Fine-gauge crew. Ribbed cuff and hem.",
    runnerId: "ms-runner-0106-butter-sulphur",
  },
  {
    slug: "column-trouser-mustard",
    name: "Column trouser",
    color: "Mustard",
    category: "trouser",
    image: "/looks/set12/forest-mustard.webp",
    alt: "Mustard column trousers with a sharp crease",
    line: "Flat-front column. Creased leg.",
    runnerId: "ms-runner-0106-butter-sulphur",
  },
  {
    slug: "crew-knit-ivory",
    name: "Fine-gauge crew knit",
    color: "Ivory",
    category: "knit",
    image: "/looks/set12/ivory-forest.webp",
    alt: "Ivory fine-gauge crew knit worn with forest pleated trousers",
    line: "Fine-gauge crew. Soft hand.",
    runnerId: "ms-runner-0106-forest-stone",
  },
  {
    slug: "column-trouser-forest",
    name: "Pleated column trouser",
    color: "Forest",
    category: "trouser",
    image: "/looks/set12/ivory-forest.webp",
    alt: "Forest double-pleated trousers with side adjusters",
    line: "Double pleat. Side adjusters. Creased leg.",
    runnerId: "ms-runner-0106-forest-stone",
  },
  {
    slug: "hoodie-bone",
    name: "Heavyweight hoodie",
    color: "Bone",
    category: "layer",
    image: "/looks/set12/bone-hoodie.webp",
    alt: "Bone heavyweight hoodie with kangaroo pocket",
    line: "Relaxed fleece. Drawcord hood. Rib cuff and hem.",
    runnerId: "ms-runner-0106-butter-sulphur",
  },
  {
    slug: "leisure-trouser-bone",
    name: "Leisure column trouser",
    color: "Bone",
    category: "trouser",
    image: "/looks/set12/bone-hoodie.webp",
    alt: "Bone leisure trousers with a center crease",
    line: "Straight leisure cut. Soft structure.",
    runnerId: "ms-runner-0106-butter-sulphur",
  },
  {
    slug: "zip-knit-taupe",
    name: "Zip knit jacket",
    color: "Warm taupe",
    category: "layer",
    image: "/looks/set12/taupe-zip.webp",
    alt: "Warm taupe zip knit jacket with mock neck",
    line: "Full zip. Mock neck. Fine-gauge knit.",
    runnerId: "ms-runner-0106-rose-taupe",
  },
  {
    slug: "knit-trouser-taupe",
    name: "Knit column trouser",
    color: "Warm taupe",
    category: "trouser",
    image: "/looks/set12/taupe-zip.webp",
    alt: "Warm taupe knit trousers with a center crease",
    line: "Matching knit. Creased leisure column.",
    runnerId: "ms-runner-0106-rose-taupe",
  },
  {
    slug: "column-trouser-rust",
    name: "Corduroy column trouser",
    color: "Rust",
    category: "trouser",
    image: "/looks/set12/ivory-rust.webp",
    alt: "Rust corduroy trousers with an ivory crew knit",
    line: "Fine-wale corduroy. Straight column.",
    runnerId: "ms-runner-0106-rust-espresso",
  },
  {
    slug: "column-trouser-cobalt",
    name: "Pleated column trouser",
    color: "Cobalt",
    category: "trouser",
    image: "/looks/set12/ivory-cobalt.webp",
    alt: "Cobalt double-pleated trousers with an ivory crew",
    line: "Double pleat. Volume through the thigh.",
    runnerId: "ms-runner-0106-cobalt-ivory",
  },
  {
    slug: "knit-polo-ivory",
    name: "Fine-gauge knit polo",
    color: "Ivory",
    category: "top",
    image: "/looks/set12/polo-mauve.webp",
    alt: "Ivory fine-gauge knit polo tucked into mauve trousers",
    line: "Collar and placket. Soft knit hand.",
    runnerId: "ms-runner-0106-rose-taupe",
  },
  {
    slug: "drawstring-trouser-mauve",
    name: "Drawstring column trouser",
    color: "Mauve",
    category: "trouser",
    image: "/looks/set12/polo-mauve.webp",
    alt: "Mauve drawstring trousers with an ivory knit polo",
    line: "Elastic waist. Wide soft column.",
    runnerId: "ms-runner-0106-rose-taupe",
  },
  {
    slug: "crew-knit-charcoal",
    name: "Fine-gauge crew knit",
    color: "Charcoal",
    category: "knit",
    image: "/looks/set12/charcoal-lilac.webp",
    alt: "Charcoal fine-gauge crew knit with lilac trousers",
    line: "Fine-gauge crew. Clean tuck.",
    runnerId: "ms-runner-0106-midnight-pearl",
  },
  {
    slug: "column-trouser-lilac",
    name: "Column trouser",
    color: "Lilac",
    category: "trouser",
    image: "/looks/set12/charcoal-lilac.webp",
    alt: "Lilac column trousers with a charcoal crew",
    line: "Slim column. Creased leg.",
    runnerId: "ms-runner-0106-midnight-pearl",
  },
];

export const WARDROBE_LOOKS: WardrobeLook[] = [
  {
    slug: "forest-mustard",
    title: "Forest and mustard",
    image: "/looks/set12/forest-mustard.webp",
    alt: "Forest crew knit, mustard column trousers, and 0106 runners",
    pieceSlugs: ["crew-knit-forest", "column-trouser-mustard"],
    runnerId: "ms-runner-0106-butter-sulphur",
  },
  {
    slug: "ivory-forest",
    title: "Ivory and forest",
    image: "/looks/set12/ivory-forest.webp",
    alt: "Ivory crew knit, forest pleated trousers, and 0106 runners",
    pieceSlugs: ["crew-knit-ivory", "column-trouser-forest"],
    runnerId: "ms-runner-0106-forest-stone",
  },
  {
    slug: "bone-set",
    title: "Bone leisure set",
    image: "/looks/set12/bone-hoodie.webp",
    alt: "Bone hoodie and leisure trousers with 0106 runners",
    pieceSlugs: ["hoodie-bone", "leisure-trouser-bone"],
    runnerId: "ms-runner-0106-butter-sulphur",
  },
  {
    slug: "taupe-zip",
    title: "Warm taupe zip",
    image: "/looks/set12/taupe-zip.webp",
    alt: "Warm taupe zip knit and matching trousers with 0106 runners",
    pieceSlugs: ["zip-knit-taupe", "knit-trouser-taupe"],
    runnerId: "ms-runner-0106-rose-taupe",
  },
  {
    slug: "ivory-rust",
    title: "Ivory and rust",
    image: "/looks/set12/ivory-rust.webp",
    alt: "Ivory crew knit, rust corduroy trousers, and 0106 runners",
    pieceSlugs: ["crew-knit-ivory", "column-trouser-rust"],
    runnerId: "ms-runner-0106-rust-espresso",
  },
  {
    slug: "ivory-cobalt",
    title: "Ivory and cobalt",
    image: "/looks/set12/ivory-cobalt.webp",
    alt: "Ivory crew knit, cobalt pleated trousers, and 0106 runners",
    pieceSlugs: ["crew-knit-ivory", "column-trouser-cobalt"],
    runnerId: "ms-runner-0106-cobalt-ivory",
  },
  {
    slug: "polo-mauve",
    title: "Polo and mauve",
    image: "/looks/set12/polo-mauve.webp",
    alt: "Ivory knit polo, mauve drawstring trousers, and 0106 runners",
    pieceSlugs: ["knit-polo-ivory", "drawstring-trouser-mauve"],
    runnerId: "ms-runner-0106-rose-taupe",
  },
  {
    slug: "charcoal-lilac",
    title: "Charcoal and lilac",
    image: "/looks/set12/charcoal-lilac.webp",
    alt: "Charcoal crew knit, lilac column trousers, and 0106 runners",
    pieceSlugs: ["crew-knit-charcoal", "column-trouser-lilac"],
    runnerId: "ms-runner-0106-midnight-pearl",
  },
];

export function pieceBySlug(slug: string) {
  return WARDROBE_PIECES.find((piece) => piece.slug === slug);
}

export function lookBySlug(slug: string) {
  return WARDROBE_LOOKS.find((look) => look.slug === slug);
}

export function piecesForLook(look: WardrobeLook) {
  return look.pieceSlugs
    .map((slug) => pieceBySlug(slug))
    .filter((piece): piece is WardrobePiece => Boolean(piece));
}

export function pieceHref(slug: string) {
  return `/pieces/${slug}`;
}

export function lookHref(slug: string) {
  return `/pieces/looks/${slug}`;
}

export function enquireHrefForPiece(piece: WardrobePiece) {
  const params = new URLSearchParams({
    ref: piece.slug,
    note: `${piece.name} — ${piece.color}`,
  });
  return `/wardrobe?${params.toString()}#introduction`;
}
