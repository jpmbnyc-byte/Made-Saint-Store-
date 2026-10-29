"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function WaitlistForm({ productId }: { productId: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    setError(null);
    try {
      const res = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "waitlist", productId, email }),
      });
      const text = await res.text();
      let json: { error?: string } = {};
      try {
        json = JSON.parse(text) as typeof json;
      } catch {
        throw new Error("The list is temporarily unavailable. Try again in a moment.");
      }
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "done") return <p className="mt-4 text-[13px] text-[#1c1a17]/70">You are on the list. We will write before the run opens.</p>;

  return (
    <form onSubmit={submit} className="mt-4">
      <div className="flex border-b border-[#1c1a17]/30 focus-within:border-[#1c1a17]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#1c1a17]/40"
        />
        <button type="submit" disabled={state === "busy"} className="text-[11px] tracking-[0.16em] uppercase disabled:opacity-50">
          {state === "busy" ? <Loader2 className="size-4 animate-spin" /> : "Join"}
        </button>
      </div>
      {error && <p className="mt-2 text-[12px] text-[#9a2a1f]">{error}</p>}
    </form>
  );
}
