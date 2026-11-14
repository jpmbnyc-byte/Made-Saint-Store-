import { CampaignBanner } from "@/components/house/campaign-banner";
import { copy } from "@/lib/copy";

/**
 * Hero: brand first. Fashion-led enquiry CTAs from the site copy pack.
 * Photograph stays clean — copy below the image.
 */
export function EditorialHero() {
  return (
    <CampaignBanner
      src="/collection/hero-cast.webp"
      alt="Sand printed jersey over a light blue shirt and brown tie — Cast 003"
      kicker={copy.home.hero.eyebrow}
      title={copy.home.hero.heading}
      body=""
      chips={[]}
      primary={{ href: "/shop#1101", label: copy.home.hero.primaryAction }}
      secondary={{ href: "/line", label: copy.home.hero.secondaryAction }}
      priority
      compact
      heading="h1"
    />
  );
}
