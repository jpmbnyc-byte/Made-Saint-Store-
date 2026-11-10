"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { offerLine, productById } from "@/lib/business";

export function ReserveForm({
  productId,
  priceUsd,
  payments,
  sizes,
}: {
  productId: string;
  priceUsd: number;
  payments: "stripe" | "mock";
  sizes: readonly string[];
}) {
  const router = useRouter();
  const requested = useSearchParams().get("size");
  const [size, setSize] = useState<string | null>(requested && sizes.includes(requested) ? requested : null);
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
      const text = await res.text();
      let json: { error?: string; mode?: string; redirect?: string; id?: string } = {};
      try {
        json = JSON.parse(text) as typeof json;
      } catch {
        throw new Error("Reservations are temporarily unavailable. Write to us and we will hold your size.");
      }
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      if (json.mode === "stripe" && json.redirect) window.location.href = json.redirect;
      else router.push(json.redirect ?? `/shop/confirmed?r=${json.id ?? ""}&product=${productId}&size=${size}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <legend className="text-[11px] tracking-[0.16em] uppercase">Size · US men&apos;s</legend>
        <div className="mt-3 grid grid-cols-4 gap-1.5 min-[380px]:grid-cols-6">
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
        <p className="mt-2 text-[12px] text-[#1c1a17]/55">Between sizes, take the half size up.</p>
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
        {busy ? <Loader2 className="size-4 animate-spin" /> : payments === "stripe" ? <Lock className="size-3.5" /> : null}
        {payments === "stripe" ? `Order this pair · $${priceUsd}` : `Request this pair · no payment today`}
      </button>
      <p className="text-center text-sm leading-relaxed text-[#1c1a17]/70">
        {payments === "stripe"
          ? `Secure checkout by Stripe. ${offerLine(productById(productId)?.series ?? "0929")}`
          : `No payment is taken today. Your name, size, and email are recorded as a request at the listed price of $${priceUsd}. ${offerLine(productById(productId)?.series ?? "0929")}`}
      </p>
    </form>
  );
}
