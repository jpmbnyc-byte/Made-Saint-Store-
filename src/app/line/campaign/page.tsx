import type { Metadata } from "next";
import { CampaignView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "Campaign 001 — The 2027 line",
  description: "Campaign 001, Once sinner. Made Saint. Editorial frames and the looks they connect to.",
};

export default function CampaignPage() {
  return <CampaignView />;
}
