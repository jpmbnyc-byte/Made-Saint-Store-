"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { offerLine, productById } from "@/lib/business";
import { copy } from "@/lib/copy";

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
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!size) return setError("Choose a preferred size.");
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, email, name, note: note.trim() || undefined }),
      });
      const text = await res.text();
      let json: { error?: string; mode?: string; redirect?: string; id?: string } = {};
      try {
        json = JSON.parse(text) as typeof json;
      } catch {
        throw new Error("Enquiries are temporarily unavailable. Please try again.");
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
        <legend className="text-[11px] tracking-[0.16em] uppercase">{copy.runnerProduct.sizeLabel} · US men&apos;s</legend>
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
        <p className="mt-2 text-[12px] text-[#1c1a17]/70">
          {copy.runnerProduct.sizeHelpAction} Use the note below for your usual size and sizing system if needed.
        </p>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-[11px] tracking-[0.16em] uppercase">{copy.enquiry.nameLabel}</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[11px] tracking-[0.16em] uppercase">{copy.enquiry.emailLabel}</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="h-11 rounded-none border-[#1c1a17]/20 bg-white/60" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="note" className="text-[11px] tracking-[0.16em] uppercase">Note · optional</Label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 400))}
          rows={3}
          placeholder="Usual size, sizing system, or a message for the house"
          className="w-full resize-y rounded-none border border-[#1c1a17]/20 bg-white/60 px-3 py-2 text-sm leading-relaxed"
        />
      </div>

      {error && <p className="text-[13px] text-[#9a2a1f]">{error}</p>}

      <div className="border border-[#1c1a17]/15 px-4 py-3 text-sm leading-relaxed text-[#1c1a17]/75">
        <p className="text-[11px] tracking-[0.14em] text-[#1c1a17] uppercase">Enquiry</p>
        <p className="mt-2">{copy.runnerProduct.body}</p>
        <p className="mt-2">{copy.enquiry.noPayment}</p>
        {payments === "stripe" && (
          <p className="mt-2">Listed reference ${priceUsd}. Checkout, when offered, follows the terms shown there.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={busy}
        className="flex h-14 w-full items-center justify-center gap-3 bg-[#1c1a17] text-[11px] tracking-[0.2em] text-[#f6f4ef] uppercase transition hover:bg-[#1c1a17]/85 disabled:opacity-60"
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : null}
        {busy ? copy.enquiry.submitting : copy.runnerProduct.primaryAction}
      </button>
      <p className="text-center text-sm leading-relaxed text-[#1c1a17]/70">
        {offerLine(productById(productId)?.series ?? "0929")}
      </p>
    </form>
  );
}
