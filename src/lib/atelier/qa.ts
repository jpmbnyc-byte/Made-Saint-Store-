import sharp, { type Metadata } from "sharp";
import type { AtelierProduct } from "./catalog";
import type { HouseModel } from "./models";
import { STUDIO_HEX, type ViewId } from "./spec";

export async function assessImage(input: {
  bytes: Buffer;
  requestedSize: string;
  product: AtelierProduct;
  model: HouseModel | undefined;
  view: ViewId;
  studioId: string;
}) {
  const flags: string[] = [];
  let meta: Metadata;
  try {
    meta = await sharp(input.bytes).metadata();
  } catch {
    return { flags: ["File is not a readable image."] };
  }
  if (!meta.width || !meta.height) flags.push("Missing dimensions.");
  const [w, h] = input.requestedSize.split("x").map(Number);
  if (meta.width && meta.height && (Math.abs(meta.width - w) > 16 || Math.abs(meta.height - h) > 16)) {
    flags.push(`Dimensions ${meta.width}×${meta.height} differ from the requested ${input.requestedSize}.`);
  }
  if (input.bytes.length < 8_000) flags.push("File is unusually small.");
  if (input.product.materialStatus !== "verified") flags.push("Material specification is not verified. This cannot be a manufacturing approval.");
  if (input.product.references.length === 0) flags.push("No product reference. Construction was not locked to a photograph.");
  if (input.model && input.model.id !== "mod-none" && input.model.referenceAssetIds.length === 0) {
    flags.push("No approved face reference. Identity consistency is not established, and the provider does not guarantee it.");
  }
  if (input.studioId === "ivory" && meta.width && meta.height) {
    const sample = await sharp(input.bytes).extract({ left: 0, top: 0, width: Math.min(24, meta.width), height: Math.min(24, meta.height) }).removeAlpha().raw().toBuffer();
    const avg = [0, 1, 2].map((ch) => {
      let sum = 0;
      const n = sample.length / 3;
      for (let i = ch; i < sample.length; i += 3) sum += sample[i];
      return sum / n;
    });
    const target = [0xf1, 0xee, 0xe8];
    const drift = Math.max(...avg.map((v, i) => Math.abs(v - target[i])));
    if (drift > 40) flags.push(`Corner sample is far from the studio ground ${STUDIO_HEX}.`);
  }
  if (input.view === "hero" && input.product.category === "footwear" && input.model && input.model.id !== "mod-none") {
    flags.push("Footwear hero should be product-only.");
  }
  flags.push("Automated checks do not prove construction, color, or fit.");
  return { flags, width: meta.width ?? 0, height: meta.height ?? 0 };
}
