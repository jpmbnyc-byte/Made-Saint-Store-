export type HomeHeroSlide = {
  id: string;
  src: string;
  /** Optional landscape crop for wide viewports */
  desktopSrc?: string;
  alt: string;
  href: string;
  label: string;
  /** object-position hint for cover crops */
  position?: string;
};

/** Full-size home hero sequence — editorial first, then atelier and accessories. */
export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    id: "1101-runner",
    src: "/hero/1101-runner-hero-mobile-2x.webp",
    desktopSrc: "/hero/1101-runner-hero-desktop.webp",
    alt: "MADE SAiNT 1101 runner in motion — a study in form, made for movement",
    href: "/shop#1101",
    label: "The 1101",
    position: "center",
  },
  {
    id: "sand-jersey",
    src: "/hero/slides/02-sand-jersey.webp",
    alt: "Cast 003 in the sand printed jersey over a light blue shirt and brown tie",
    href: "/line/looks/sand-jersey",
    label: "Sand jersey",
    position: "center top",
  },
  {
    id: "atelier-process",
    src: "/hero/slides/03-atelier-process.webp",
    alt: "1101 atelier process — sketches, materials, prototype and finished pair",
    href: "/shop#1101",
    label: "Atelier",
    position: "center",
  },
  {
    id: "plaid-look",
    src: "/hero/slides/04-plaid-look.webp",
    alt: "Cast look in a plum plaid zip jacket and trouser with 1101 runners",
    href: "/wardrobe",
    label: "The look",
    position: "center top",
  },
  {
    id: "m-charm",
    src: "/hero/slides/05-m-charm.webp",
    alt: "MADE SAiNT wave mark in blue on a cord — detail study",
    href: "/line",
    label: "The mark",
    position: "center",
  },
  {
    id: "headwrap",
    src: "/hero/slides/06-headwrap.webp",
    alt: "Brown headwrap fastened with the MADE SAiNT wave mark",
    href: "/line",
    label: "Headwrap",
    position: "center top",
  },
  {
    id: "saint-cap",
    src: "/hero/slides/07-saint-cap.webp",
    alt: "Cream and black MADE SAiNT cap with Saint Michael embroidery",
    href: "/line",
    label: "Cap",
    position: "center",
  },
];
