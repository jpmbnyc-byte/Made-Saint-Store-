import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.cwd(), "src");

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const rel = specifier.slice(2);
    const target = path.join(root, rel);
    const file = target.endsWith(".json") ? target : `${target}.ts`;
    return nextResolve(pathToFileURL(file).href, context);
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && !path.extname(specifier)) {
    return nextResolve(`${specifier}.ts`, context);
  }
  return nextResolve(specifier, context);
}
