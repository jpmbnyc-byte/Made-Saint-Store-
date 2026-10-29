#!/usr/bin/env node
/**
 * Prerender the App Router into public/ so a Vercel project whose Output Directory
 * is `public` (static hosting) still serves every page instead of platform 404s.
 */
import { spawnSync } from "node:child_process";
import { cp, mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const api = path.join(root, "src/app/api");
const apiBak = path.join(root, "src/app/_api.static-bak");
const icon = path.join(root, "src/app/icon.tsx");
const iconBak = path.join(root, "src/app/_icon.static-bak.tsx");
const outDir = path.join(root, ".next-export");
const publicDir = path.join(root, "public");

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function cleanSnapshot() {
  for (const name of ["index.html", "404.html", "index.txt", "404.html", "icon.png"]) {
    await rm(path.join(publicDir, name), { force: true });
  }
  await rm(path.join(publicDir, "_next"), { recursive: true, force: true });
  await rm(path.join(publicDir, "ms-static"), { recursive: true, force: true });
  for (const route of ["shop", "launch", "studio", "brand", "wardrobe", "admin"]) {
    const dir = path.join(publicDir, route);
    if (!(await exists(dir))) continue;
    await rm(path.join(dir, "index.html"), { force: true });
    await rm(path.join(dir, "index.txt"), { force: true });
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      await rm(path.join(dir, e.name, "index.html"), { force: true });
      await rm(path.join(dir, e.name, "index.txt"), { force: true });
    }
  }
}

async function rewriteNextPrefix(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await rewriteNextPrefix(p);
      continue;
    }
    if (!/\.(html|txt|js|css|json|map)$/.test(e.name)) continue;
    const buf = await readFile(p, "utf8");
    if (!buf.includes("/_next/")) continue;
    await writeFile(p, buf.replaceAll("/_next/", "/ms-static/"));
  }
}

async function copyHtmlTree(from, to) {
  const entries = await readdir(from, { withFileTypes: true });
  await mkdir(to, { recursive: true });
  for (const e of entries) {
    const src = path.join(from, e.name);
    const dest = path.join(to, e.name);
    if (e.isDirectory()) {
      if (e.name === "_next") {
        await rm(dest, { recursive: true, force: true });
        await cp(src, dest, { recursive: true });
        continue;
      }
      await copyHtmlTree(src, dest);
      continue;
    }
    if (e.name.endsWith(".html") || e.name.endsWith(".txt") || e.name === "icon.png" || e.name === "favicon.ico") {
      await cp(src, dest);
    }
  }
}

let movedApi = false;
let movedIcon = false;
let exitCode = 0;
try {
  await cleanSnapshot();
  if (await exists(api)) {
    await rm(apiBak, { recursive: true, force: true });
    await rename(api, apiBak);
    movedApi = true;
  }
  if (await exists(icon)) {
    await rm(iconBak, { force: true });
    await rename(icon, iconBak);
    movedIcon = true;
  }

  const build = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  if (build.status !== 0) {
    exitCode = build.status ?? 1;
  } else if (!(await exists(outDir))) {
    console.error("next build did not produce out/");
    exitCode = 1;
  } else {
    await copyHtmlTree(outDir, publicDir);
  const nextDir = path.join(publicDir, "_next");
  const staticDir = path.join(publicDir, "ms-static");
  if (await exists(nextDir)) {
    await rm(staticDir, { recursive: true, force: true });
    await rename(nextDir, staticDir);
  }
  await rewriteNextPrefix(publicDir);
  console.log("Copied prerendered HTML into public/ (assets at /ms-static)");
  }
} finally {
  if (movedApi && (await exists(apiBak))) {
    await rm(api, { recursive: true, force: true });
    await rename(apiBak, api);
  }
  if (movedIcon && (await exists(iconBak))) {
    await rm(icon, { force: true });
    await rename(iconBak, icon);
  }
}
process.exit(exitCode);
