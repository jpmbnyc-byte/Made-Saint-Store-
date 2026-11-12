import { CampaignBanner } from "@/components/house/campaign-banner";

const LOOK_CHIPS = [
  { href: "/line/looks/solene", label: "Jersey" },
  { href: "/line/looks/sage", label: "Sage" },
  { href: "/line/looks/camel", label: "Terracotta" },
  { href: "/line/looks/malik", label: "Malik" },
  { href: "/line/lookbook", label: "Lookbook" },
];

/**
 * Hero in the ISAIA look register spirit: one dominant campaign image,
 * brand line, two actions — no slideshow player chrome.
 */
export function EditorialHero() {
  return (
    <CampaignBanner
      src="/collection/malik.webp"
      alt="Malik seated in a navy turtleneck — Campaign look"
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
