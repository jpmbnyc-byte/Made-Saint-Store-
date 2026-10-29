import { workNext } from "../src/lib/atelier/jobs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

for (;;) {
  const result = await workNext();
  console.log(JSON.stringify(result));
  if (!result.worked && result.reason === "No open batch.") break;
  if (!result.worked && result.reason?.startsWith("Spend")) break;
  await sleep(result.worked ? 400 : 200);
}
