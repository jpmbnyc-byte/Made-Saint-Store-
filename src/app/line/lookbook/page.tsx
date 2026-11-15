import type { Metadata } from "next";
import { LookbookView } from "@/components/line/views";

export const metadata: Metadata = {
  title: "Lookbook — The Line",
  description: "Looks from The Line, arranged by how they are worn, with the pieces each photograph shows.",
};

export default function LookbookPage() {
  return <LookbookView />;
}
