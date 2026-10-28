import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MADE SAiNT · Collection Studio",
  description: "Feed a palette, get a three-look collection on the locked flats, sourced from the MEES material library.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
