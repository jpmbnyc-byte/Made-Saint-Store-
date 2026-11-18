import production from "../../docs/art-direction/studio-v1/production.json" with { type: "json" };

const replacements = production.replacements as Record<string, { status: string; target: string }>;

/** Resolve approved photographs from the same manifest used by the release audit. */
export function studioImage(source: string): string {
  const replacement = replacements[source];
  return replacement?.status === "approved" ? replacement.target : source;
}
