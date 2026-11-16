import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mast } from "@/components/house/mast";
import { ShopFooter } from "@/components/shop/chrome";
import { CapsuleDetail } from "@/components/wardrobe/capsule-detail";
import { CAPSULES, capsuleBySlug } from "@/lib/capsules";

export function generateStaticParams() {
  return CAPSULES.map((capsule) => ({ slug: capsule.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const capsule = capsuleBySlug((await params).slug);
  return {
    title: capsule ? `${capsule.title} — Capsules` : "Capsule",
    description: capsule?.line ?? "A MADE SAiNT Private Wardrobe capsule.",
  };
}

export default async function CapsulePage({ params }: { params: Promise<{ slug: string }> }) {
  const capsule = capsuleBySlug((await params).slug);
  if (!capsule) notFound();

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <Mast />
      <CapsuleDetail capsule={capsule} />
      <ShopFooter />
    </div>
  );
}
