/** Hermes-framed product stills for the mule selection — three views each, no baked titles. */

export type MuleView = "pair" | "side" | "rear" | "top";

export type MuleColorway = {
  id: string;
  family: "trail" | "city" | "class";
  ref: "R046" | "N015" | "R049";
  name: string;
  code: string;
  price: string;
  href: string;
  views: { kind: MuleView; src: string; alt: string }[];
};

const view = (src: string, alt: string, kind: MuleView = "pair") => ({ kind, src, alt });

export const MULE_COLORWAYS: MuleColorway[] = [
  {
    id: "trail-powder",
    family: "trail",
    ref: "R046",
    name: "Powder Blue · Fog Grid",
    code: "04 / POWDER BLUE",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-powder-pair.webp", "Trail Mule — powder blue, pair"),
      view("/mules/hermes/trail-powder-side.webp", "Trail Mule — powder blue, side", "side"),
      view("/mules/hermes/trail-powder-rear.webp", "Trail Mule — powder blue, rear", "rear"),
    ],
  },
  {
    id: "trail-carbon",
    family: "trail",
    ref: "R046",
    name: "Carbon · Graphite",
    code: "01 / CARBON · GRAPHITE",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-carbon-pair.webp", "Trail Mule — carbon, pair"),
      view("/mules/hermes/trail-carbon-side.webp", "Trail Mule — carbon, side", "side"),
      view("/mules/hermes/trail-carbon-rear.webp", "Trail Mule — carbon, rear", "rear"),
    ],
  },
  {
    id: "trail-midnight",
    family: "trail",
    ref: "R046",
    name: "Midnight Slate",
    code: "04 / MIDNIGHT SLATE",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-midnight-pair.webp", "Trail Mule — midnight slate, pair"),
      view("/mules/hermes/trail-midnight-side.webp", "Trail Mule — midnight slate, side", "side"),
      view("/mules/hermes/trail-midnight-rear.webp", "Trail Mule — midnight slate, rear", "rear"),
    ],
  },
  {
    id: "trail-olive",
    family: "trail",
    ref: "R046",
    name: "Olive · Earth",
    code: "05 / OLIVE · EARTH",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-olive-pair.webp", "Trail Mule — olive earth, pair"),
      view("/mules/hermes/trail-olive-side.webp", "Trail Mule — olive earth, side", "side"),
      view("/mules/hermes/trail-olive-rear.webp", "Trail Mule — olive earth, rear", "rear"),
    ],
  },
  {
    id: "trail-cocoa",
    family: "trail",
    ref: "R046",
    name: "Cocoa · Sand",
    code: "06 / COCOA · SAND",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-cocoa-pair.webp", "Trail Mule — cocoa sand, pair"),
      view("/mules/hermes/trail-cocoa-side.webp", "Trail Mule — cocoa sand, side", "side"),
      view("/mules/hermes/trail-cocoa-rear.webp", "Trail Mule — cocoa sand, rear", "rear"),
    ],
  },
  {
    id: "trail-taupe",
    family: "trail",
    ref: "R046",
    name: "Taupe · Espresso",
    code: "03 / TAUPE · ESPRESSO",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-taupe-pair.webp", "Trail Mule — taupe espresso, pair"),
      view("/mules/hermes/trail-taupe-side.webp", "Trail Mule — taupe espresso, side", "side"),
      view("/mules/hermes/trail-taupe-rear.webp", "Trail Mule — taupe espresso, rear", "rear"),
    ],
  },
  {
    id: "trail-rose",
    family: "trail",
    ref: "R046",
    name: "Rose · Graphite",
    code: "07 / ROSE · GRAPHITE",
    price: "$450",
    href: "/line/r046",
    views: [
      view("/mules/hermes/trail-rose-pair.webp", "Trail Mule — rose graphite, pair"),
      view("/mules/hermes/trail-rose-side.webp", "Trail Mule — rose graphite, side", "side"),
      view("/mules/hermes/trail-rose-rear.webp", "Trail Mule — rose graphite, rear", "rear"),
    ],
  },
  {
    id: "city-espresso",
    family: "city",
    ref: "N015",
    name: "Espresso",
    code: "CITY · ESPRESSO",
    price: "$795",
    href: "/line/n015",
    views: [
      view("/mules/hermes/city-espresso-pair.webp", "City Leather Mule — espresso, pair"),
      view("/mules/hermes/city-espresso-side.webp", "City Leather Mule — espresso, side", "side"),
      view("/mules/hermes/city-espresso-rear.webp", "City Leather Mule — espresso, rear", "rear"),
    ],
  },
  {
    id: "city-black",
    family: "city",
    ref: "N015",
    name: "Black",
    code: "CITY · BLACK",
    price: "$795",
    href: "/line/n015",
    views: [
      view("/mules/hermes/city-black-pair.webp", "City Leather Mule — black, pair"),
      view("/mules/hermes/city-black-side.webp", "City Leather Mule — black, side", "side"),
      view("/mules/hermes/city-black-rear.webp", "City Leather Mule — black, rear", "rear"),
    ],
  },
  {
    id: "city-stone",
    family: "city",
    ref: "N015",
    name: "Stone",
    code: "CITY · STONE",
    price: "$795",
    href: "/line/n015",
    views: [
      view("/mules/hermes/city-stone-pair.webp", "City Leather Mule — stone, pair"),
      view("/mules/hermes/city-stone-side.webp", "City Leather Mule — stone, side", "side"),
      view("/mules/hermes/city-stone-rear.webp", "City Leather Mule — stone, rear", "rear"),
    ],
  },
  {
    id: "class-chocolate",
    family: "class",
    ref: "R049",
    name: "Chocolate · Espresso",
    code: "01 / CHOCOLATE · ESPRESSO",
    price: "$1,280",
    href: "/line/r049",
    views: [
      view("/mules/hermes/class-chocolate-pair.webp", "Class Slipper — chocolate espresso, pair"),
      view("/mules/hermes/class-chocolate-side.webp", "Class Slipper — chocolate espresso, side", "side"),
      view("/mules/hermes/class-chocolate-top.webp", "Class Slipper — chocolate espresso, top", "top"),
    ],
  },
  {
    id: "class-black",
    family: "class",
    ref: "R049",
    name: "Black · Graphite",
    code: "02 / BLACK · GRAPHITE",
    price: "$1,280",
    href: "/line/r049",
    views: [
      view("/mules/hermes/class-black-pair.webp", "Class Slipper — black graphite, pair"),
      view("/mules/hermes/class-black-side.webp", "Class Slipper — black graphite, side", "side"),
      view("/mules/hermes/class-black-top.webp", "Class Slipper — black graphite, top", "top"),
    ],
  },
];

export const muleFamilies = () =>
  [
    { id: "trail" as const, title: "Trail Mule", note: "MS-TM01 · seven colorways · three views each" },
    { id: "city" as const, title: "City Leather Mule", note: "N015 · three colorways · three views each" },
    { id: "class" as const, title: "Class Slipper", note: "R049 · two colorways · three views each" },
  ] as const;
