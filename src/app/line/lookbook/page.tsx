import type { Metadata } from "next";
import { LookbookView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "Lookbook — The 2027 line",
  description: "Complete looks from the 2027 line, with the pieces each photograph actually shows.",
};

export default function LookbookPage() {
  return <LookbookView />;
}
