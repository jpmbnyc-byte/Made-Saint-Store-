import type { Metadata } from "next";
import { FeaturedView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "The 2027 line",
  description: "Featured looks from the 2027 line. Garments are made through an enquiry. Founding runners are requested from the shop.",
};

export default function LinePage() {
  return <FeaturedView />;
}
