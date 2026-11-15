import type { Metadata } from "next";
import { CampaignView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "Campaign — The Line",
  description: "Campaign studies and the collection, worn — editorial frames and the looks they connect to.",
};

export default function CampaignPage() {
  return <CampaignView />;
}
