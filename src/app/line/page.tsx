import type { Metadata } from "next";
import { FeaturedView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "The Line",
  description: "A considered MADE SAiNT collection. Begin with a look; pieces are confirmed through enquiry.",
};

export default function LinePage() {
  return <FeaturedView />;
}
