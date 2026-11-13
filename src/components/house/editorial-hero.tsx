import { CampaignBanner } from "@/components/house/campaign-banner";

const LOOK_CHIPS = [
  { href: "/line/looks/sand-jersey", label: "Sand jersey" },
  { href: "/line/looks/blue-jersey", label: "Blue jersey" },
  { href: "/line/looks/butter-mock", label: "Butter mock" },
  { href: "/line/looks/malik", label: "Malik" },
  { href: "/line/lookbook", label: "Lookbook" },
];

/**
 * Hero: one clean Cast look photograph — no text on the image.
 * Copy and CTAs sit below. Brand marks live on the garments and runners.
 */
export function EditorialHero() {
  return (
    <CampaignBanner
      src="/collection/hero-cast.webp"
      alt="Sand printed jersey over a light blue shirt and brown tie — Cast 003"
      kicker="MADE SAiNT"
      title="Once sinner. Made Saint."
      body="The collection, worn. Explore the 1101, or open the looks."
      chips={LOOK_CHIPS}
      primary={{ href: "/shop#1101", label: "Explore 1101" }}
      secondary={{ href: "/line/lookbook", label: "View the lookbook" }}
      priority
      tall
      heading="h1"
    />
  );
}
