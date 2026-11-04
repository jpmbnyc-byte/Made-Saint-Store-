import { PRODUCTS } from "@/lib/business";
import { pieceById, retailOf, shopHref, type LifestyleId } from "@/lib/private-client";

/** Occasions a client dresses for. The same three rooms as a lookbook: the day, the weekend, the formal hour. */
export const OCCASIONS = [
  { id: "business", title: "Business", subtitle: "The working day" },
  { id: "weekend", title: "Weekend", subtitle: "Days with nothing on the book" },
  { id: "occasion", title: "Occasion", subtitle: "When the day asks for a suit" },
] as const;

export type OccasionId = (typeof OCCASIONS)[number]["id"];

export type LookPiece = {
  id: string;
  role: string;
  /** In the photograph. A piece offered beside the look is never described as the shoe on the foot. */
  shown: boolean;
};

export type Look = {
  id: string;
  occasion: OccasionId;
  lifestyle: LifestyleId;
  name: string;
  image: string;
  alt: string;
  read: string;
  aside?: string;
  pieces: LookPiece[];
};

export const LOOKS: Look[] = [
  {
    id: "arrival",
    occasion: "business",
    lifestyle: "arrival",
    name: "The Arrival",
    image: "/wardrobe/arrival-trouser-look.webp",
    alt: "Navy zip jacket and matching trouser, worn",
    read: "A hotel, a public day, the hour before the room.",
    pieces: [
      { id: "p01", role: "Jacket", shown: true },
      { id: "p02", role: "Trouser", shown: true },
      { id: "rn04", role: "Footwear", shown: false },
    ],
  },
  {
    id: "course",
    occasion: "business",
    lifestyle: "occasion",
    name: "The Course",
    image: "/wardrobe/course-edit-campaign.webp",
    alt: "Three course suits on a green",
    read: "The course edit. One registered suit, shown with the rest of the sheet.",
    aside: "The sheet shows three figures. The registered suit is the indigo pinstripe. The other two are the same edit, not separate reservations. Proposed prices stay on the line.",
    pieces: [{ id: "s03", role: "Suit", shown: true }],
  },
  {
    id: "off-duty",
    occasion: "weekend",
    lifestyle: "off-duty",
    name: "The Off-Duty",
    image: "/wardrobe/look-knit-mauve.webp",
    alt: "Black knit, mauve trouser, and a tan shoe",
    read: "An ordinary day. Knit, a trouser, nothing scheduled.",
    aside: "The trouser in the photograph is not a separate approved piece.",
    pieces: [
      { id: "p08", role: "Knit", shown: true },
      { id: "rn06", role: "Footwear", shown: false },
    ],
  },
  {
    id: "transit",
    occasion: "weekend",
    lifestyle: "transit",
    name: "The Transit",
    image: "/wardrobe/look-crushed-nylon.webp",
    alt: "Chore jacket, blue knit, charcoal trouser, and a trainer",
    read: "A flight, or a day spent between cities.",
    aside: "The trainer in the photograph is not a founding colorway.",
    pieces: [
      { id: "a02", role: "Trouser", shown: true },
      { id: "rn01", role: "Footwear", shown: false },
    ],
  },
  {
    id: "saint-john",
    occasion: "occasion",
    lifestyle: "occasion",
    name: "Saint John",
    image: "/wardrobe/suit-saint-john-camel.webp",
    alt: "Camel Saint John jacket and trouser, front and back",
    read: "Camel tailoring for a formal appearance.",
    pieces: [{ id: "s01", role: "Suit", shown: true }],
  },
  {
    id: "saint-michael",
    occasion: "occasion",
    lifestyle: "occasion",
    name: "Saint Michael",
    image: "/wardrobe/suit-saint-michael-olive.webp",
    alt: "Olive Saint Michael tailored suit",
    read: "Olive tailoring for the same kind of day.",
    pieces: [{ id: "s02", role: "Suit", shown: true }],
  },
];

export type Offer =
  | { kind: "reserve"; href: string; usd: number }
  | { kind: "waitlist"; href: string; usd: number }
  | { kind: "commission" };

export function offerFor(pieceId: string): Offer {
  const href = shopHref(pieceId);
  const usd = retailOf(pieceId);
  if (!href || usd == null) return { kind: "commission" };
  const product = PRODUCTS.find((p) => href === `/shop/${p.id}`);
  if (product?.launch) return { kind: "reserve", href, usd };
  return { kind: "waitlist", href, usd };
}

/** Only a founding pair is added. A commission and a waitlist stay out of the figure. */
export function reserveTotal(look: Look) {
  return look.pieces.reduce((sum, piece) => {
    const offer = offerFor(piece.id);
    return offer.kind === "reserve" ? sum + offer.usd : sum;
  }, 0);
}

export function looksIn(occasion: OccasionId) {
  return LOOKS.filter((look) => look.occasion === occasion);
}

export function lookById(id: string) {
  return LOOKS.find((look) => look.id === id);
}

export function lookForLifestyle(lifestyle: LifestyleId) {
  return LOOKS.find((look) => look.lifestyle === lifestyle) ?? LOOKS[0];
}

export function resolvePiece(id: string) {
  const piece = pieceById(id);
  if (!piece) throw new Error(`Look piece ${id} is not in the wardrobe register`);
  return piece;
}
