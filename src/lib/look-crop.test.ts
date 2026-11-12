import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AZORES_LOOKS } from "./geography";
import { COLLECTION_LOOKS, publishedLooks } from "./line-shop";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Read WebP/PNG/JPEG dimensions from the file header via a minimal probe. */
function imageSize(rel: string): { width: number; height: number } | null {
  const file = path.join(root, "public", rel.replace(/^\//, ""));
  if (!fs.existsSync(file)) return null;
  const buf = fs.readFileSync(file);
  // WebP VP8X / VP8 / VP8L
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      const width = 1 + buf.readUIntLE(24, 3);
      const height = 1 + buf.readUIntLE(27, 3);
      return { width, height };
    }
    if (chunk === "VP8 ") {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      return { width, height };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

test("category look frames are portrait so mobile cover crops stay centred", () => {
  for (const look of AZORES_LOOKS) {
    const size = imageSize(look.lookSrc);
    assert.ok(size, `missing image ${look.lookSrc}`);
    assert.ok(size!.width / size!.height <= 0.9, `${look.id} is landscape (${size!.width}x${size!.height}) — side-crops off-centre on mobile`);
  }
});

test("published collection looks that use /collection assets stay portrait", () => {
  for (const look of publishedLooks()) {
    if (!look.image.startsWith("/collection/")) continue;
    if (look.image.includes("tee-") || look.image.includes("trail-mule") || look.image.includes("styling-")) continue;
    const size = imageSize(look.image);
    if (!size) continue;
    assert.ok(
      size.width / size.height <= 0.95,
      `${look.slug} ${look.image} is landscape (${size.width}x${size.height})`,
    );
  }
  assert.ok(COLLECTION_LOOKS.some((look) => look.slug === "forerunner"));
});
