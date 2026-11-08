import assert from "node:assert/strict";
import test from "node:test";
import { PRODUCTS, SERIES_PLATE, productsIn } from "./business";

test("the runner series use the name plates and Bogner-range prices", () => {
  assert.equal(productsIn("0929").length, 3);
  assert.equal(productsIn("1101").length, 6);
  assert.equal(productsIn("1223").length, 1);
  for (const product of productsIn("0929")) assert.equal(product.usd, 490);
  for (const product of [...productsIn("1101"), ...productsIn("1223")]) assert.equal(product.usd, 550);
  assert.equal(SERIES_PLATE["0929"].src.endsWith("name-0929.webp"), true);
  assert.equal(SERIES_PLATE["1101"].src.endsWith("name-1101.webp"), true);
  assert.equal(SERIES_PLATE["1223"].src.endsWith("name-1223.webp"), true);
  const espresso = PRODUCTS.find((product) => product.id === "ms-runner-1101-espresso");
  assert.equal(espresso?.materials.includes("29 Gris Medio mesh"), true);
  assert.equal(espresso?.materials.includes("Five eyelet pairs"), true);
  assert.match(espresso?.notice ?? "", /fit/i);
  const sacred = PRODUCTS.find((product) => product.id === "ms-runner-1223-sacred-light");
  assert.equal(sacred?.series, "1223");
  assert.equal(sacred?.name.includes("Sacred Light"), true);
});
