import type { Metadata } from "next";
import { AtelierApp } from "@/components/atelier/app";

export const metadata: Metadata = {
  title: "Visual Atelier",
  robots: { index: false, follow: false },
};

export default function VisualAtelierPage() {
  return <AtelierApp />;
}
