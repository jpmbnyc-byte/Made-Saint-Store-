/**
 * Private Wardrobe archive chapters from the Archive Lookbook (Nov 15, 2026).
 * Chapter titles are editorial names, not evidence of a shoot location.
 * Source IDs locate assets; they are not customer copy.
 */

export type ArchiveView = {
  src: string;
  alt: string;
  label: string;
};

export type ArchiveChapter = {
  slug: string;
  title: string;
  number: string;
  palette: string;
  /** Customer-facing card line */
  line: string;
  action: string;
  primary: ArchiveView;
  alternates: ArchiveView[];
  /** Piece refs available to discuss (line register where known) */
  pieceNotes: string[];
  /** Prefer this runner when linking footwear from the look */
  runnerId?: string;
  featured?: boolean;
};

export const ARCHIVE_CHAPTERS: ArchiveChapter[] = [
  {
    slug: "miami-arrival",
    title: "Miami Arrival",
    number: "01",
    palette: "Pale sage / Butter / Warm white",
    line: "Pale sage, a butter layer and a clean, full-length silhouette.",
    action: "Explore Miami Arrival",
    primary: {
      src: "/wardrobe/archive/miami-arrival-primary.webp",
      alt: "Pale sage zip set over a butter turtleneck with sculptural runners, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/miami-arrival-alt.webp",
        alt: "Alternate view from the Miami Arrival archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Pale sage zip jacket", "Matching trouser", "Butter turtleneck", "Sculptural runner as pictured"],
    runnerId: "ms-runner-1101-butter",
    featured: true,
  },
  {
    slug: "brooklyn-after-dark",
    title: "Brooklyn After Dark",
    number: "02",
    palette: "Black / Grey / Ivory",
    line: "Black outerwear, grey at the neck and a generous trouser line.",
    action: "Explore Brooklyn After Dark",
    primary: {
      src: "/wardrobe/archive/brooklyn-after-dark-primary.webp",
      alt: "Black outerwear with grey at the neck and a generous trouser, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/brooklyn-after-dark-alt.webp",
        alt: "Alternate view from the Brooklyn After Dark archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Black outerwear", "Grey neck layer", "Generous trouser", "Runner as pictured"],
    featured: true,
  },
  {
    slug: "course-to-club",
    title: "Course to Club",
    number: "03",
    palette: "Blue jersey / White shirt / Denim",
    line: "The blue jersey over a shirt and tie. Denim changes the register.",
    action: "Explore Course to Club",
    primary: {
      src: "/wardrobe/archive/course-to-club-primary.webp",
      alt: "Blue printed jersey over a white shirt and navy tie with light wash denim",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/course-to-club-alt.webp",
        alt: "Alternate view from the Course to Club archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Blue printed jersey", "Shirt and tie as styling", "Denim", "Runner as pictured"],
    runnerId: "ms-runner-1101-navy",
    featured: true,
  },
  {
    slug: "camel-residence",
    title: "Camel Residence",
    number: "04",
    palette: "Camel / Ochre / Black",
    line: "Camel tailoring with ochre depth and a black accent.",
    action: "Explore Camel Residence",
    primary: {
      src: "/wardrobe/archive/camel-residence-primary.webp",
      alt: "Camel tailored look from the Camel Residence archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/camel-residence-alt.webp",
        alt: "Alternate view from the Camel Residence archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Camel jacket", "Matching trouser", "Accent pieces as pictured"],
  },
  {
    slug: "olive-saint",
    title: "Olive Saint",
    number: "05",
    palette: "Olive / Chocolate",
    line: "Olive against chocolate — a quiet, grounded register.",
    action: "Explore Olive Saint",
    primary: {
      src: "/wardrobe/archive/olive-saint-primary.webp",
      alt: "Olive and chocolate look from the Olive Saint archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/olive-saint-alt.webp",
        alt: "Alternate view from the Olive Saint archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Olive outer layer", "Chocolate accents", "Trouser as pictured"],
  },
  {
    slug: "blue-hour",
    title: "Blue Hour",
    number: "06",
    palette: "Slate blue / Charcoal / Black",
    line: "Slate blue into charcoal — evening weight without ceremony.",
    action: "Explore Blue Hour",
    primary: {
      src: "/wardrobe/archive/blue-hour-primary.webp",
      alt: "Slate blue and charcoal look from the Blue Hour archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/blue-hour-alt.webp",
        alt: "Alternate view from the Blue Hour archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Slate blue layer", "Charcoal pieces", "Black accents as pictured"],
  },
  {
    slug: "private-departure",
    title: "Private Departure",
    number: "07",
    palette: "Ivory / Burgundy / Butter",
    line: "Ivory and burgundy with a butter note — ready for the road.",
    action: "Explore Private Departure",
    primary: {
      src: "/wardrobe/archive/private-departure-primary.webp",
      alt: "Ivory and burgundy look from the Private Departure archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/private-departure-alt.webp",
        alt: "Alternate view from the Private Departure archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Ivory outer layer", "Burgundy accent", "Butter detail as pictured"],
  },
  {
    slug: "gallery-opening",
    title: "Gallery Opening",
    number: "08",
    palette: "Dusty rose / Petrol / Chocolate",
    line: "Dusty rose against petrol. A close view of color and proportion.",
    action: "Explore Gallery Opening",
    primary: {
      src: "/wardrobe/archive/gallery-opening-primary.webp",
      alt: "Dusty rose set over a petrol turtleneck with chocolate runners, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/gallery-opening-alt.webp",
        alt: "Alternate view from the Gallery Opening archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Dusty rose zip set", "Petrol turtleneck", "Chocolate runner as pictured"],
    runnerId: "ms-runner-1101-butter",
    featured: true,
  },
  {
    slug: "downtown-denim",
    title: "Downtown Denim",
    number: "09",
    palette: "Washed black / Cream / Butter",
    line: "Washed black denim with cream and butter against the city grain.",
    action: "Explore Downtown Denim",
    primary: {
      src: "/wardrobe/archive/downtown-denim-primary.webp",
      alt: "Washed black denim look from the Downtown Denim archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/downtown-denim-alt.webp",
        alt: "Alternate view from the Downtown Denim archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Washed black denim", "Cream layer", "Butter accent as pictured"],
  },
  {
    slug: "winter-tunnel",
    title: "Winter Tunnel",
    number: "10",
    palette: "Taupe / Butter / Grey",
    line: "Taupe, butter and grey — warmth for the in-between hours.",
    action: "Explore Winter Tunnel",
    primary: {
      src: "/wardrobe/archive/winter-tunnel-primary.webp",
      alt: "Taupe and butter look from the Winter Tunnel archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/winter-tunnel-alt.webp",
        alt: "Alternate view from the Winter Tunnel archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Taupe outer layer", "Butter knit", "Grey accents as pictured"],
  },
  {
    slug: "clubhouse-social",
    title: "Clubhouse Social",
    number: "11",
    palette: "Cream jersey / Brown / Light blue",
    line: "A cream jersey with brown and light blue — social without noise.",
    action: "Explore Clubhouse Social",
    primary: {
      src: "/wardrobe/archive/clubhouse-social-primary.webp",
      alt: "Cream jersey look from the Clubhouse Social archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/clubhouse-social-alt.webp",
        alt: "Alternate view from the Clubhouse Social archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Cream printed jersey", "Brown accents", "Light blue layer as pictured"],
  },
  {
    slug: "weekend-residence",
    title: "Weekend Residence",
    number: "12",
    palette: "Petrol teal / Chocolate / Charcoal",
    line: "Petrol teal into chocolate and charcoal — the weekend at ease.",
    action: "Explore Weekend Residence",
    primary: {
      src: "/wardrobe/archive/weekend-residence-primary.webp",
      alt: "Petrol teal and chocolate look from the Weekend Residence archive chapter, full length",
      label: "Primary look",
    },
    alternates: [
      {
        src: "/wardrobe/archive/weekend-residence-alt.webp",
        alt: "Alternate view from the Weekend Residence archive chapter",
        label: "Alternate styling",
      },
    ],
    pieceNotes: ["Petrol teal layer", "Chocolate pieces", "Charcoal accents as pictured"],
  },
];

export const FEATURED_ARCHIVE_CHAPTERS = ARCHIVE_CHAPTERS.filter((chapter) => chapter.featured);

export function archiveChapterBySlug(slug: string) {
  return ARCHIVE_CHAPTERS.find((chapter) => chapter.slug === slug);
}
