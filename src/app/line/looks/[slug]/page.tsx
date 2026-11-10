import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LookStage } from "@/components/line/look-stage";
import { COLLECTION_LOOKS, lookBySlug } from "@/lib/line-shop";

export function generateStaticParams() {
  return COLLECTION_LOOKS.map((look) => ({ slug: look.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const look = lookBySlug((await params).slug);
  return {
    title: look ? `Look ${look.number} — ${look.title}` : "Lookbook",
    description: look?.alt ?? "A look from the 2027 line.",
  };
}

export default async function LookPage({ params }: { params: Promise<{ slug: string }> }) {
  const look = lookBySlug((await params).slug);
  if (!look) notFound();
  return <LookStage slug={look.slug} />;
}
