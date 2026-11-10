import type { Metadata } from "next";
import { FeaturedView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "The 2027 line",
  description: "Featured looks from the 2027 line. Proposed list prices are not checkout prices.",
};

export default function LinePage() {
  return <FeaturedView />;
}
