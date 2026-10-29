import { VIEW_FILE, type ViewId } from "./spec";

export function assetBase(sku: string, colorwayId: string, view: ViewId, version: number) {
  const clean = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, "");
  const v = String(version).padStart(2, "0");
  return `MS_${clean(sku)}_${clean(colorwayId)}_${VIEW_FILE[view]}_V${v}`;
}
