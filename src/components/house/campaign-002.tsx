import { CAMPAIGN_002, campaign002Ready } from "@/lib/geography";

/**
 * Campaign 002 — São Roque, São Miguel, Azores.
 * Hidden until approved imagery exists. Do not render an empty “coming soon” block.
 */
export function Campaign002() {
  if (!campaign002Ready()) return null;

  return (
    <section id="campaign-002" className="border-t border-[#1c1a17]/10 bg-[#f4f0e7]" aria-labelledby="campaign-002-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">{CAMPAIGN_002.eyebrow}</p>
        <h2 id="campaign-002-heading" className="ms-display mt-3 max-w-2xl">
          {CAMPAIGN_002.title}
        </h2>
        <p className="ms-meta mt-4">{CAMPAIGN_002.locationLabel}</p>
        <p className="ms-lede mt-5 max-w-xl">{CAMPAIGN_002.body}</p>
      </div>
    </section>
  );
}
