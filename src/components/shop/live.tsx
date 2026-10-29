"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/shop/chrome";

type Tally = { pairs?: Record<string, number>; waitlist?: Record<string, number> };

async function loadTally(): Promise<Tally | null> {
  try {
    const res = await fetch("/api/preorders");
    if (!res.ok) return null;
    const text = await res.text();
    return JSON.parse(text) as Tally;
  } catch {
    return null;
  }
}

export function LiveProgress({ productId, of }: { productId: string; of: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    loadTally().then((t) => {
      if (t?.pairs?.[productId] != null) setN(t.pairs[productId]);
    });
  }, [productId]);
  return <Progress n={n} of={of} />;
}

export function LiveWaitlistCount({ productId }: { productId: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    loadTally().then((t) => {
      if (t?.waitlist?.[productId] != null) setN(t.waitlist[productId]);
    });
  }, [productId]);
  return <p className="text-[12px] text-[#1c1a17]/55">{n} on the list</p>;
}

export function CancelledBanner() {
  const params = useSearchParams();
  if (!params.get("cancelled")) return null;
  return (
    <div className="mx-auto max-w-[1320px] px-5 pt-6 md:px-8">
      <p className="border border-[#1c1a17]/15 bg-white/60 px-4 py-3 text-sm">
        Checkout was cancelled and nothing was charged. Your size is not held until payment is complete.
      </p>
    </div>
  );
}
