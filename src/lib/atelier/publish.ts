import type { CatalogView } from "../catalog";
import { readDb } from "./store";

const VIEW_ID: Record<string, string> = {
  "three-quarter": "threequarter",
  reverse: "reverse",
  detail: "detail",
  study: "study",
  hero: "hero",
};

/** Adds published frames. Never replaces the overhead lock. */
export async function withPublished(productId: string, views: CatalogView[]): Promise<CatalogView[]> {
  let published: { view: string; src: string }[] = [];
  try {
    published = (await readDb()).published.filter((item) => item.productId === productId);
  } catch {
    return views;
  }
  const next = [...views];
  const overhead = views[0]?.src;
  for (const item of published) {
    if (item.src === overhead) continue;
    const id = VIEW_ID[item.view] ?? item.view;
    if (id === "product") continue;
    if (next.some((view) => view.id === id)) continue;
    next.push({
      id: id as CatalogView["id"],
      src: item.src,
      label: item.view,
      alt: `Published ${item.view}`,
    });
  }
  return next;
}
