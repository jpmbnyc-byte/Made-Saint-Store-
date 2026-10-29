import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROLES = [
  { role: "card", width: 800, format: "webp" as const },
  { role: "detail", width: 1600, format: "webp" as const },
  { role: "zoom", width: 2400, format: "jpeg" as const },
  { role: "mobile-hero", width: 1080, format: "webp" as const },
  { role: "desktop-hero", width: 1920, format: "webp" as const },
  { role: "editorial", width: 1600, format: "webp" as const },
  { role: "card-avif", width: 800, format: "avif" as const },
];

/** Shrink inside the frame. Never enlarge, never crop. */
export async function writeDerivatives(master: Buffer, dir: string, base: string) {
  await mkdir(dir, { recursive: true });
  const meta = await sharp(master).metadata();
  const sourceW = meta.width ?? 0;
  const written: { role: string; file: string; width: number; height: number; upscaled: false }[] = [];
  for (const role of ROLES) {
    const target = Math.min(role.width, sourceW || role.width);
    const pipeline = sharp(master).resize({ width: target, withoutEnlargement: true });
    const out =
      role.format === "jpeg"
        ? pipeline.jpeg({ quality: 90 })
        : role.format === "avif"
          ? pipeline.avif({ quality: 60 })
          : pipeline.webp({ quality: 82 });
    const buf = await out.toBuffer();
    const info = await sharp(buf).metadata();
    const ext = role.format === "jpeg" ? "jpg" : role.format;
    const file = `${base}_${role.role}.${ext}`;
    await writeFile(path.join(dir, file), buf);
    written.push({ role: role.role, file, width: info.width ?? 0, height: info.height ?? 0, upscaled: false });
  }
  return written;
}
