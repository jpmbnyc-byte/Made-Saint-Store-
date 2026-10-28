"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReserveForm({
  productId,
  priceUsd,
  payments,
  closed,
  shipWindow,
  sizes,
}: {
  productId: string;
  priceUsd: number;
  payments: "stripe" | "mock";
  closed: boolean;
  shipWindow: string;
  sizes: readonly string[];
}) {
  const router = useRouter();
  const [size, setSize] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!size) return setError("Choose a size.");
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, email, name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      if (json.mode === "stripe") window.location.href = json.redirect;
      else router.push(json.redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  if (closed) {
    return <p className="border border-[#1c1a17]/15 px-4 py-4 text-sm">The founding window has closed. Join the list below for the next run.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <div className="flex items-baseline justify-between">
          <legend className="text-[11px] tracking-[0.16em] uppercase">Size · US men&apos;s</legend>
          <span className="text-[12px] text-[#1c1a17]/55">Between sizes? Take the half size up.</span>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`h-11 border text-sm tabular-nums transition ${
                size === s ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/20 hover:border-[#1c1a17]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-[11px] tracking-[0.16em] uppercase">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[11px] tracking-[0.16em] uppercase">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
        </div>
      </div>

      {error && <p className="text-[13px] text-[#9a2a1f]">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="flex h-14 w-full items-center justify-center gap-3 bg-[#1c1a17] text-[11px] tracking-[0.2em] text-[#f6f4ef] uppercase transition hover:bg-[#1c1a17]/85 disabled:opacity-60"
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-3.5" />}
        {payments === "stripe" ? `Reserve and pay $${priceUsd}` : `Reserve · $${priceUsd}`}
      </button>
      <p className="text-center text-[12px] leading-relaxed text-[#1c1a17]/55">
        {payments === "stripe"
          ? `Secure checkout by Stripe. Ships ${shipWindow}. Fully refunded if the run is not confirmed.`
          : `Payments are not connected yet: your reservation is recorded and no card is taken. Ships ${shipWindow}.`}
      </p>
    </form>
  );
}
