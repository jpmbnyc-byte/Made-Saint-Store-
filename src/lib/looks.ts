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
  /** A poster or a flat. Kept whole. A worn figure is cropped to the body. */
  sheet?: boolean;
  /** Keep the whole figure, including the feet. */
  whole?: boolean;
  /** Left off the public grid when the only image is too small to show. The record stays. */
  listed?: boolean;
  pieces: LookPiece[];
};

export const LOOKS: Look[] = [
  {
    id: "arrival",
    occasion: "business",
    lifestyle: "arrival",
    name: "The Arrival",
    image: "/line/f35.webp",
    alt: "Malik in a navy zip jacket, white layer, and matching trouser, worn full length",
    read: "A hotel, a public day, the hour before the room.",
    whole: true,
    aside: "The shoes in the photograph are brown mules. The chalk runner is an alternative, not the pair on the foot.",
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
    alt: "Malik, Ren, and Lucien in three course suits on a green",
    read: "The course edit. One registered suit, shown with the rest of the sheet.",
    sheet: true,
    aside: "The sheet shows three figures. The registered suit is the indigo pinstripe. The other two are the same edit, not separate reservations. Proposed prices stay on the line.",
    pieces: [{ id: "s03", role: "Suit", shown: true }],
  },
  {
    id: "off-duty",
    occasion: "weekend",
    lifestyle: "off-duty",
    name: "The Off-Duty",
    image: "/line/f28.webp",
    alt: "Malik in a washed denim jacket, yellow knit, jeans, and pale blue hikers",
    read: "An ordinary day. Denim, a knit, nothing scheduled.",
    whole: true,
    aside: "The shoes in the photograph are pale blue hikers. An earlier board showed a tan shoe. The washed-denim runner is an alternative, not either of those shoes.",
    pieces: [
      { id: "rn06", role: "Footwear", shown: false },
    ],
  },
  {
    id: "rose",
    occasion: "weekend",
    lifestyle: "off-duty",
    name: "The Rose Set",
    image: "/line/f50.webp",
    alt: "Inès in a dusty rose zip blouson and trouser, worn over a petrol teal turtleneck",
    read: "A dusty rose blouson, the matching trouser, and a petrol teal turtleneck.",
    whole: true,
    aside: "A worn study, not a client. The shoes are not a founding runner. The product sheets are reconstructions, not physical samples. Cloth is unconfirmed, and no price is listed.",
    pieces: [
      { id: "p06", role: "Blouson", shown: true },
      { id: "p07", role: "Trouser", shown: true },
      { id: "p13", role: "Turtleneck", shown: true },
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
    listed: false,
    aside: "The only photograph on this look is too small to show. The record stays.",
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
    image: "/editorial/saint-john-worn.webp",
    alt: "Lucien in the camel Saint John jacket and trouser, with a cap and a black backpack",
    read: "Camel tailoring for a formal appearance.",
    whole: true,
    aside: "The cap, the backpack, and the shoes are in the photograph. The shoes are not a founding runner, and the backpack is not a listed piece.",
    pieces: [{ id: "s01", role: "Suit", shown: true }],
  },
  {
    id: "saint-michael",
    occasion: "occasion",
    lifestyle: "occasion",
    name: "Saint Michael",
    image: "/hero/saint-michael.webp",
    alt: "Olive Saint Michael jacket and trouser, front and back, on paper",
    read: "Olive tailoring for the same kind of day.",
    sheet: true,
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

export const listedLooks = () => LOOKS.filter((look) => look.listed !== false);

export function looksIn(occasion: OccasionId) {
  return listedLooks().filter((look) => look.occasion === occasion);
}

export function lookById(id: string) {
  return LOOKS.find((look) => look.id === id);
}

export function lookForLifestyle(lifestyle: LifestyleId) {
  return LOOKS.find((look) => look.lifestyle === lifestyle) ?? LOOKS[0];
}

/** Worn figures lose their letterbox. A sheet stays whole, on a phone and on a desk. */
export function lookFrame(look: Look) {
  return look.sheet || look.whole ? "object-contain" : "object-cover object-center";
}

export function resolvePiece(id: string) {
  const piece = pieceById(id);
  if (!piece) throw new Error(`Look piece ${id} is not in the wardrobe register`);
  return piece;
}
