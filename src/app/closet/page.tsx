import type { Metadata } from "next";
import { CollectionChrome } from "@/components/line/chrome";
import { ClosetWorkspace } from "@/components/closet/workspace";

export const metadata: Metadata = {
  title: "My Closet",
  description: "Saved pieces and looks. Selections stay on this browser and are not a reservation.",
};

export default function ClosetPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="account" />
      <ClosetWorkspace />
    </div>
  );
}
