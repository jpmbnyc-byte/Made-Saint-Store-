import { CampaignBanner } from "@/components/house/campaign-banner";

const LOOK_CHIPS = [
  { href: "/line/looks/solene", label: "Jersey" },
  { href: "/line/looks/sage", label: "Sage" },
  { href: "/line/looks/forerunner", label: "Saint John" },
  { href: "/line/looks/camel", label: "Camel" },
  { href: "/line/lookbook", label: "Lookbook" },
];

/**
 * Hero in the ISAIA look register spirit: one dominant campaign image,
 * brand line, two actions — no slideshow player chrome.
 */
export function EditorialHero() {
  return (
    <CampaignBanner
      src="/collection/solene-campaign.webp"
      alt="Solène wearing the printed jersey — Campaign look"
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
