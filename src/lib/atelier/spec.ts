/**
 * Visual Atelier constants.
 * Image model and rates are taken from the OpenAI image guide and Images API
 * reference as published for GPT Image 2.5. Do not substitute a retired model.
 * https://platform.openai.com/docs/guides/image-generation
 */

export const IMAGE_MODEL = "gpt-image-2.5-sunburst" as const;
export const PROMPT_VERSION = "ms-visual-01" as const;
export const STUDIO_HEX = "#F1EEE8";

/** Published token rates for both GPT Image 2.5 models. Cached rates do not apply to the Images API. */
export const TOKEN_RATES = {
  imageInputPerMillionUsd: 8,
  textInputPerMillionUsd: 5,
  imageOutputPerMillionUsd: 30,
} as const;

export const PROVIDER_LIMITS = [
  "The model can struggle to keep a recurring person or a brand mark consistent across separate generations.",
  "It can miss precise text, including a wordmark.",
  "It can miss exact placement in a layout.",
  "A complex request can take up to two minutes.",
  "OpenAI does not publish a fixed output-token count for this model at a given size and quality, so a batch cannot be priced in dollars before the first response.",
] as const;

export const VIEWS = [
  { id: "hero", file: "HERO", label: "Hero" },
  { id: "three-quarter", file: "THREE-QUARTER", label: "Three-quarter" },
  { id: "reverse", file: "REVERSE", label: "Reverse" },
  { id: "detail", file: "DETAIL", label: "Craftsmanship" },
  { id: "study", file: "STUDY", label: "Product study" },
] as const;

export type ViewId = (typeof VIEWS)[number]["id"];

export const VIEW_FILE: Record<ViewId, string> = {
  hero: "HERO",
  "three-quarter": "THREE-QUARTER",
  reverse: "REVERSE",
  detail: "DETAIL",
  study: "STUDY",
};

export type Usage = {
  input_tokens?: number;
  output_tokens?: number;
  input_tokens_details?: { image_tokens?: number; text_tokens?: number };
  output_tokens_details?: { image_tokens?: number; text_tokens?: number };
};

export function viewSize(category: string, view: ViewId): "1024x1536" | "1536x1024" {
  if (category === "footwear" || category === "accessories") {
    return view === "detail" ? "1024x1536" : "1536x1024";
  }
  return view === "detail" ? "1024x1536" : "1024x1536";
}
