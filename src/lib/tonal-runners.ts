import { runnerHref } from "@/lib/business";

/** Compatible founding runners for each Tonal Collection colorway. */
export const TONAL_RUNNERS = {
  carbon: {
    productId: "ms-runner-1101-onyx",
    name: "1101 Runner — Onyx",
    price: "$550",
    image: "/runners/1213/1101-onyx-pair.webp",
    note: "Onyx leather against carbon cloth.",
  },
  midnight: {
    productId: "ms-runner-1213-midnight",
    name: "1213 Runner — Midnight",
    price: "$550",
    image: "/runners/1213/midnight.webp",
    note: "Deep navy leather with the midnight tone.",
  },
  indigo: {
    productId: "ms-runner-washed-denim",
    name: "0929 Runner — Washed / Indigo",
    price: "$490",
    image: "/runners/indigo-overhead.webp",
    note: "Washed indigo against the muted blue tone.",
  },
  camel: {
    productId: "ms-runner-1101-butter",
    name: "1101 Runner — Brown Mesh",
    price: "$550",
    image: "/runners/1213/1101-butter-pair.webp",
    note: "Brown mesh with warm camel cloth.",
  },
  sand: {
    productId: "ms-runner-navy-intrecciato",
    name: "0929 Runner — Navy / Sand",
    price: "$490",
    image: "/runners/navy-sand-overhead.webp",
    note: "Navy and sand overlays with the sand tone.",
  },
  ivory: {
    productId: "ms-runner-chalk-navy",
    name: "0929 Runner — Navy / Ivory",
    price: "$490",
    image: "/runners/navy-ivory-overhead.webp",
    note: "Ivory suede with the ivory tone.",
  },
  olive: {
    productId: "ms-runner-1213-olive",
    name: "1213 Runner — Olive",
    price: "$550",
    image: "/runners/1213/olive.webp",
    note: "Olive leather with the olive tone.",
  },
} as const;

export type TonalColorId = keyof typeof TONAL_RUNNERS;

export function tonalRunner(id: string) {
  return TONAL_RUNNERS[id as TonalColorId] ?? null;
}

export function tonalRunnerHref(id: string) {
  const runner = tonalRunner(id);
  return runner ? runnerHref(runner.productId) : "/shop#1101";
}
