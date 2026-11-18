/**
 * Public list prices — aligned to MADE_SAINT_Internal_Working_Price_Sheet_2026-11-17.
 * Displayed figures are enquiry list prices pending an accepted quotation.
 */

import { productById, PRODUCTS } from "@/lib/business";
import { lineByRef } from "@/lib/line";

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Resolve a list price for a shop runner id or Line ref. */
export function listPriceFor(idOrRef: string): number | null {
  const runner = productById(idOrRef);
  if (runner?.launch) return runner.usd;
  const line = lineByRef(idOrRef);
  if (line?.status === "proposed" && line.retail != null) return line.retail;
  return null;
}

export function priceLabel(idOrRef: string): string | null {
  const price = listPriceFor(idOrRef);
  return price == null ? null : formatUsd(price);
}

/** Launch runners eligible for bag / Stripe checkout. */
export function checkoutRunners() {
  return PRODUCTS.filter((product) => product.launch);
}
