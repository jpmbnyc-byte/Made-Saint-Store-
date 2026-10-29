import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_MODEL, type Usage } from "./spec";

export type GenerationRequest = {
  prompt: string;
  size: "1024x1536" | "1536x1024";
  referenceFiles: string[];
};

export type GenerationResult = {
  bytes: Buffer;
  usage: Usage | null;
  model: typeof IMAGE_MODEL;
};

const ENDPOINT_EDIT = "https://api.openai.com/v1/images/edits";
const ENDPOINT_GENERATE = "https://api.openai.com/v1/images/generations";

export function providerConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}

/** JSON body for a documented Images API call. References use the edits endpoint. */
export async function buildRequest(input: GenerationRequest) {
  const shared = {
    model: IMAGE_MODEL,
    prompt: input.prompt,
    n: 1,
    size: input.size,
    quality: "high" as const,
    background: "opaque" as const,
    output_format: "png" as const,
    moderation: "auto" as const,
  };
  if (input.referenceFiles.length === 0) {
    return { url: ENDPOINT_GENERATE, body: shared, kind: "generations" as const };
  }
  const images = [];
  for (const file of input.referenceFiles.slice(0, 4)) {
    const raw = await readFile(file);
    const png = await sharp(raw).rotate().resize({ width: 1536, height: 1536, fit: "inside", withoutEnlargement: true }).png().toBuffer();
    images.push({ image_url: `data:image/png;base64,${png.toString("base64")}` });
  }
  return { url: ENDPOINT_EDIT, body: { ...shared, images }, kind: "edits" as const };
}

export function publicToFile(src: string) {
  const clean = src.replace(/^\//, "");
  return path.join(process.cwd(), "public", clean);
}

export async function generateImage(input: GenerationRequest): Promise<GenerationResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY is not set. No image was requested.");
  }
  const request = await buildRequest(input);
  let lastError = "Image request failed.";
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(request.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.body),
    });
    if (response.status === 429 || response.status >= 500) {
      lastError = `Provider returned ${response.status}.`;
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      continue;
    }
    const payload = (await response.json()) as {
      data?: { b64_json?: string }[];
      usage?: Usage;
      error?: { message?: string; type?: string; code?: string };
    };
    if (!response.ok) {
      const code = payload.error?.code ?? payload.error?.type ?? String(response.status);
      throw new Error(payload.error?.message ?? `Image request rejected (${code}). Not retried.`);
    }
    const b64 = payload.data?.[0]?.b64_json;
    if (!b64) throw new Error("Provider returned no image.");
    return { bytes: Buffer.from(b64, "base64"), usage: payload.usage ?? null, model: IMAGE_MODEL };
  }
  throw new Error(lastError);
}
