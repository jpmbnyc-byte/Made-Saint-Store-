import assert from "node:assert/strict";
import test from "node:test";
import { PRODUCTS, SERIES_ORDER, SERIES_PLATE, productsIn } from "./business";

test("the runner series keep the handoff colorways and the price order", () => {
  assert.deepEqual(SERIES_ORDER, ["1101", "1213", "0929"]);
  assert.equal(productsIn("1101").length, 6);
  assert.equal(productsIn("1213").length, 7);
  assert.equal(productsIn("0929").length, 3);
  const names = productsIn("1213").map((product) => product.name.split("—").pop()?.trim());
  assert.deepEqual(names, ["Espresso", "Olive", "Mineral Blue", "Midnight", "Chestnut", "Sacred Light", "Graphite"]);
  for (const product of productsIn("0929")) assert.equal(product.usd, 490);
  for (const product of [...productsIn("1101"), ...productsIn("1213")]) assert.equal(product.usd, 550);
  assert.ok(productsIn("1101")[0].usd >= productsIn("1213")[0].usd);
  assert.ok(productsIn("1101")[0].usd > productsIn("0929")[0].usd);
  assert.equal(SERIES_PLATE["0929"].src.endsWith("name-0929.webp"), true);
  assert.equal(SERIES_PLATE["1101"].src.endsWith("name-1101.webp"), true);
  assert.equal(SERIES_PLATE["1213"].alt, "MADE Saint 1213 v1");
  const espresso = PRODUCTS.find((product) => product.id === "ms-runner-1213-espresso");
  assert.equal(espresso?.series, "1213");
  assert.equal(espresso?.materials.includes("29 Gris Medio mesh"), true);
  assert.equal(PRODUCTS.some((product) => product.id === "ms-runner-1101-espresso"), false);
  assert.equal(PRODUCTS.some((product) => product.series === "0929" && product.name.includes("Chestnut")), false);
  const sacred = PRODUCTS.find((product) => product.id === "ms-runner-1213-sacred-light");
  assert.equal(sacred?.series, "1213");
  assert.equal(sacred?.name.includes("Sacred Light"), true);
});
