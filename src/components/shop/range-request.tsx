"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RangeRequest({ colorway }: { colorway: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const worn = size.trim() ? ` Size noted: ${size.trim().slice(0, 24)}.` : " No size was given.";
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          scope: "piece",
          note: `${colorway}. A price is not listed. No payment is taken with this request.${worn}`,
        }),
      });
      const json = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) throw new Error(json.error ?? "The request could not be recorded.");
      setDone(json.id ?? "recorded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The request could not be recorded.");
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="border border-[#1c1a17]/15 p-5">
        <p className="font-serif text-2xl">The request is recorded.</p>
        <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/70">
          {colorway}. A price is not listed, and no payment was taken. The house writes back. A response time is not promised.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <p className="text-sm leading-relaxed text-[#1c1a17]/70">
        A price is not listed. This records a request and takes no payment. A size run is not confirmed for this runner.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="range-name" className="text-[11px] tracking-[0.16em] uppercase">Name</Label>
          <Input id="range-name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="range-email" className="text-[11px] tracking-[0.16em] uppercase">Email</Label>
          <Input id="range-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="range-size" className="text-[11px] tracking-[0.16em] uppercase">Size you wear</Label>
        <Input id="range-size" value={size} onChange={(e) => setSize(e.target.value)} className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
      </div>
      {error && <p className="text-[13px] text-[#9a2a1f]">{error}</p>}
      <button type="submit" disabled={busy} className="inline-flex h-12 items-center bg-[#1c1a17] px-6 text-[12px] tracking-[0.16em] text-[#f5f0e8] uppercase disabled:opacity-60">
        {busy ? <Loader2 className="size-4 animate-spin" /> : "Request this colorway · no payment"}
      </button>
    </form>
  );
}
