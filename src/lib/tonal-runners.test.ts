import assert from "node:assert/strict";
import test from "node:test";
import { TONAL_RUNNERS, tonalRunner, tonalRunnerHref } from "./tonal-runners";
import { PRODUCTS } from "./business";

test("every tonal colorway maps to a launched runner", () => {
  for (const [id, runner] of Object.entries(TONAL_RUNNERS)) {
    const product = PRODUCTS.find((item) => item.id === runner.productId);
    assert.ok(product, `${id} runner missing`);
    assert.equal(product?.launch, true, `${id} runner not launched`);
    assert.equal(tonalRunner(id)?.productId, runner.productId);
    assert.ok(tonalRunnerHref(id).includes("#title"));
  }
});
