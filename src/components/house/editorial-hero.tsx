import { CampaignBanner } from "@/components/house/campaign-banner";

/**
 * Hero: sand jersey Cast look. Shorter opening frame so the look CTA sits
 * in the first screen. Photograph stays clean — copy below the image.
 */
export function EditorialHero() {
  return (
    <CampaignBanner
      src="/collection/hero-cast.webp"
      alt="Sand printed jersey over a light blue shirt and brown tie — Cast 003"
      kicker="MADE SAiNT"
      title="Once sinner. Made Saint."
      body="The sand jersey, worn. Enquire about the printed jersey, or open the look."
      chips={[]}
      primary={{ href: "/line/looks/sand-jersey", label: "View this look" }}
      secondary={{ href: "/wardrobe?ref=R010&look=sand-jersey&color=Sand&image=%2Fcollection%2Fsand-jersey.webp&match=1101%20Runner%20%E2%80%94%20Brown%20Mesh#introduction", label: "Enquire about this look" }}
      priority
      compact
      heading="h1"
    />
  );
}
