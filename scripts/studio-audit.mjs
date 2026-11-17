import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "docs/art-direction/studio-v1");
const raster = /\.(avif|gif|jpe?g|png|webp)$/i;
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const json = async (file) => JSON.parse(await readFile(file, "utf8"));

async function walk(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const file = path.join(folder, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }));
  return files.flat().sort();
}

function localFile(src) {
  if (!src.startsWith("/") || src.startsWith("//") || src.includes("\\")) throw new Error(`Invalid local image path: ${src}`);
  const file = path.resolve(root, "public", src.slice(1));
  if (!file.startsWith(path.join(root, "public") + path.sep)) throw new Error(`Image path escapes public: ${src}`);
  return file;
}

const QA = ["geometry", "identity", "color", "texture", "background", "all_usages"];

/** Release checks deliberately fail closed; a generated proof is never an approval. */
export async function releaseErrors(inventory, production, inspect) {
  const errors = [];
  const targets = new Map();
  const records = production.replacements ?? {};
  for (const asset of inventory.assets) {
    if (asset.disposition.startsWith("preserve_")) continue;
    if (asset.disposition === "review_scope") {
      errors.push(`${asset.source}: scope has not been reviewed`);
      continue;
    }
    const record = records[asset.source];
    if (!record || record.status !== "approved") {
      errors.push(`${asset.source}: no approved replacement`);
      continue;
    }
    if (record.sourceSha256 !== asset.sha256 || !asset.sha256) errors.push(`${asset.source}: source is missing or changed`);
    if (!record.masterSource || !record.masterSha256 || !record.editor || !record.reviewedBy || !record.reviewedAt) errors.push(`${asset.source}: incomplete provenance/review`);
    if (asset.blockers.length && !record.sourceResolution) errors.push(`${asset.source}: source blocker has no resolution`);
    if (!QA.every((name) => record.qa?.[name] === true)) errors.push(`${asset.source}: visual QA incomplete`);
    if (!record.target?.startsWith("/art/studio-v1/")) {
      errors.push(`${asset.source}: replacement must be versioned under /art/studio-v1/`);
      continue;
    }
    const output = await inspect(record.target);
    const master = record.masterSource ? await inspect(record.masterSource) : null;
    if (!output) errors.push(`${asset.source}: replacement missing`);
    else {
      if (output.sha256 !== record.outputSha256 || output.sha256 === asset.sha256) errors.push(`${asset.source}: output hash is unverified or unchanged`);
      if (output.width !== record.width || output.height !== record.height) errors.push(`${asset.source}: output dimensions do not match`);
      if (!(record.maxRenderWidth > 0 && record.maxRenderHeight > 0) || output.width < record.maxRenderWidth || output.height < record.maxRenderHeight) errors.push(`${asset.source}: inadequate output resolution`);
    }
    if (!master || master.sha256 !== record.masterSha256) errors.push(`${asset.source}: master provenance does not match`);
    else if (output && (output.width > master.width || output.height > master.height)) errors.push(`${asset.source}: output exceeds master resolution`);
    if (asset.sha256) {
      const previous = targets.get(asset.sha256);
      if (previous && previous !== record.target) errors.push(`${asset.source}: identical source aliases resolve to different masters`);
      targets.set(asset.sha256, record.target);
    }
  }
  const sources = new Set(inventory.assets.map((asset) => asset.source));
  for (const source of Object.keys(records)) if (!sources.has(source)) errors.push(`${source}: replacement source is absent from the inventory`);
  return errors;
}

async function inspect(src) {
  try {
    const bytes = await readFile(localFile(src));
    const metadata = await sharp(bytes).metadata();
    return { width: metadata.width, height: metadata.height, sha256: sha(bytes), bytes: bytes.length };
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function inventory() {
  const baseline = await json(path.join(directory, "baseline.json"));
  const scope = await json(path.join(directory, "scope.json"));
  const bySource = new Map(baseline.assets.map((asset) => [asset.source, asset]));
  const publicFiles = (await walk(path.join(root, "public"))).filter((file) => raster.test(file) && !file.includes("/art/studio-v1/"));
  const sourceFiles = (await walk(path.join(root, "src"))).filter((file) => /\.(tsx?|jsx?|json|css)$/.test(file));
  const owners = new Map();
  const add = (src, file) => {
    if (src.startsWith("/art/studio-v1/")) return;
    if (!owners.has(src)) owners.set(src, new Set());
    owners.get(src).add(path.relative(root, file));
  };
  for (const file of sourceFiles) {
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(/["'`(](\/[\w./%+ -]+\.(?:avif|gif|jpe?g|png|webp))(?:[?#[\]"'`)\s]|$)/gi)) add(match[1], file);
  }
  // These runtime paths are constructed from catalogue records rather than literals.
  const materials = await json(path.join(root, "src/data/mees-catalog.json"));
  for (const item of [...materials.articles, ...materials.soles]) add(`/mees/thumbs/${item.id}.webp`, path.join(root, "src/lib/collection.ts"));
  const sources = new Set([...bySource.keys(), ...publicFiles.map((file) => "/" + path.relative(path.join(root, "public"), file)), ...owners.keys()]);
  for (const [source, decision] of Object.entries(scope.decisions)) {
    if (!sources.has(source) || bySource.has(source)) throw new Error(`Scope decisions must identify additional repository candidates: ${source}`);
    if (!decision.reason || !decision.reviewedBy || !decision.reviewedAt || !(decision.disposition === "retouch" || decision.disposition.startsWith("preserve_"))) throw new Error(`Incomplete scope review: ${source}`);
  }
  const assets = [];
  for (const source of [...sources].sort()) {
    const info = await inspect(source);
    const original = bySource.get(source);
    const blockers = [...(original?.blockers ?? [])];
    if (!info) blockers.push("missing_repository_source");
    if (original?.sha256 && info && original.sha256 !== info.sha256) blockers.push("changed_since_live_audit");
    const disposition = original?.disposition ?? scope.decisions[source]?.disposition ?? (source.startsWith("/mees/") ? "preserve_material_reference" : "review_scope");
    assets.push({ source, ...info, baseline: Boolean(original), disposition, blockers,
      ...(scope.decisions[source] ? { scopeReview: scope.decisions[source] } : {}),
      ...(original?.canonicalSource ? { canonicalSource: original.canonicalSource } : {}),
      sourceOwners: [...(owners.get(source) ?? [])].sort(),
      routes: original?.routes ?? [],
    });
  }
  const groups = new Map();
  for (const asset of assets) if (asset.sha256) {
    if (!groups.has(asset.sha256)) groups.set(asset.sha256, []);
    groups.get(asset.sha256).push(asset.source);
  }
  return { schemaVersion: 1, baselineCommit: baseline.commit,
    coverage: "All public raster files, literal src references, material catalogue templates, and the 200-path/97-route live audit. Repository-only candidates require scope review; not a claim that every file is deployed. Other dynamic/CMS usages still require runtime verification.",
    summary: { baselinePaths: baseline.assets.length, repositoryRasters: publicFiles.length, inventoriedPaths: assets.length,
      retouchRequired: assets.filter((a) => a.disposition === "retouch").length,
      scopeReview: assets.filter((a) => a.disposition === "review_scope").length,
      preservedReferences: assets.filter((a) => a.disposition.startsWith("preserve_")).length,
      missingSources: assets.filter((a) => !a.sha256).length },
    identicalSourceGroups: [...groups.values()].filter((group) => group.length > 1), assets };
}

async function main() {
  const result = await inventory();
  const output = path.join(directory, "inventory.json");
  if (process.argv.includes("--write")) await writeFile(output, JSON.stringify(result, null, 2) + "\n");
  else {
    const expected = await readFile(output, "utf8");
    if (expected !== JSON.stringify(result, null, 2) + "\n") throw new Error("Studio inventory is stale; run npm run imagery:audit -- --write and review the changes.");
  }
  console.log(JSON.stringify(result.summary));
  if (process.argv.includes("--release")) {
    const errors = await releaseErrors(result, await json(path.join(directory, "production.json")), inspect);
    if (errors.length) {
      console.error(`Studio release blocked (${errors.length} findings):\n${errors.slice(0, 12).join("\n")}\nSee inventory.json and production.json for the complete source state.`);
      process.exitCode = 1;
    } else console.log("Asset approval checks passed. Integration, build, browser QA and deployment checks remain required.");
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
