import type { AtelierProduct } from "./catalog";
import { modelById, STUDIOS } from "./models";
import { PROMPT_VERSION, STUDIO_HEX, type ViewId } from "./spec";

const VIEW_ASK: Record<ViewId, string> = {
  hero: "Primary frame. Apparel is full length, front, entire garment visible, natural posture. Footwear is a clean product photograph of the pair, no person.",
  "three-quarter": "Same subject and color, three-quarter angle, so the silhouette and construction read. Same light.",
  reverse: "Rear view of the same subject. Show only back construction that the reference supports. Do not invent a heel logo or a back print.",
  detail: "Close crop of the most important material already named: suede nap, knit, cloth, or the footwear quarter. No new decoration.",
  study: "Product only, no person. Footwear is a lateral profile. A garment is a controlled flat lay. Ivory ground.",
};

export function buildPrompt(product: AtelierProduct, colorwayId: string, view: ViewId, modelId: string, studioId = "ivory") {
  const color = product.colorways.find((c) => c.id === colorwayId);
  const model = modelById(modelId);
  const studio = STUDIOS.find((s) => s.id === studioId) ?? STUDIOS[0];
  const lines = [
    "Original MADE SAiNT studio photograph. Quiet luxury, accurate cloth, restrained light.",
    `View: ${VIEW_ASK[view]}`,
    `Product: ${product.name}. Category: ${product.category}.`,
    `Material on file: ${product.material}. Status: ${product.materialStatus}.`,
    `Colorway on file: ${color?.name ?? "unspecified"}. Status: ${color?.status ?? "missing"}.`,
    `Silhouette note: ${product.silhouette}`,
    `Fit note: ${product.fit}`,
    studio.use === "ecom"
      ? `Studio: warm ivory seamless ${STUDIO_HEX}. Soft daylight, short shadow, no props.`
      : `Setting: ${studio.name}. ${studio.note} Use this only for a campaign frame, not for a standard product study.`,
    model && model.id !== "mod-none"
      ? `Model: ${model.name}. ${model.heightCategory}, ${model.proportion}, ${model.genderPresentation}. ${model.stylingNotes} No approved face reference is on file, so this frame cannot claim a locked identity.`
      : "No model. Do not add a person.",
    "Preserve panel geometry, stitching, hardware, and any mark already visible in the reference.",
    "Do not add a price, a size, or a new logo. Do not redesign the garment to fit an invented body.",
    "Do not depict a named athlete or a real private client.",
    product.materialStatus !== "verified" ? "This specification is incomplete. The picture is a study, not a factory approval." : "",
  ].filter(Boolean);
  return { version: PROMPT_VERSION, text: lines.join("\n") };
}
