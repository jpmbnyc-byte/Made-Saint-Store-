import { TOKEN_RATES, type Usage } from "./spec";

export function costFromUsage(usage: Usage | null | undefined): number | null {
  if (!usage) return null;
  const imageIn = usage.input_tokens_details?.image_tokens;
  const textIn = usage.input_tokens_details?.text_tokens;
  const imageOut = usage.output_tokens_details?.image_tokens ?? usage.output_tokens;
  if (imageIn == null || textIn == null || imageOut == null) return null;
  const usd =
    (imageIn * TOKEN_RATES.imageInputPerMillionUsd) / 1_000_000 +
    (textIn * TOKEN_RATES.textInputPerMillionUsd) / 1_000_000 +
    (imageOut * TOKEN_RATES.imageOutputPerMillionUsd) / 1_000_000;
  return Math.round(usd * 10_000) / 10_000;
}

export function estimateBatch(imageCount: number) {
  return {
    imageCount,
    usd: null as number | null,
    reason:
      "OpenAI does not publish a fixed output-token count for gpt-image-2.5-sunburst. Actual cost is taken from each response: $8 per million image input tokens, $5 per million text input tokens, $30 per million image output tokens. Cached rates do not apply to the Images API.",
  };
}
