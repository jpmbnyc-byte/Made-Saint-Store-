"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useBag } from "@/components/line/store";
import { removeBagItem } from "@/lib/closet";
import { productById, runnerHref } from "@/lib/business";
import { lineByRef } from "@/lib/line";
import { customerName } from "@/lib/line-shop";
import { formatUsd, listPriceFor } from "@/lib/pricing";

export function CheckoutBag() {
  const bag = useBag();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const rows = useMemo(() => {
    return bag.data.items.map((item) => {
      const kind = item.kind ?? "runner";
      const runner = kind === "runner" ? productById(item.productId) : null;
      const line = kind === "line" ? lineByRef(item.productId) : null;
      const price = listPriceFor(item.productId);
      const label = runner?.name ?? (line ? customerName(line) : item.productId);
      const href = runner ? runnerHref(runner.id) : line ? `/line/${line.ref.toLowerCase()}` : "/line";
      return { item, kind, label, price, href, image: runner?.image ?? null };
    });
  }, [bag.data.items]);

  const runners = rows.filter((row) => row.kind === "runner");
  const apparel = rows.filter((row) => row.kind === "line");
  const runnerTotal = runners.reduce((sum, row) => sum + (row.price ?? 0) * row.item.qty, 0);
  const apparelTotal = apparel.reduce((sum, row) => sum + (row.price ?? 0) * row.item.qty, 0);

  async function checkoutRunner(productId: string, size: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, email, name }),
      });
      const json = (await res.json()) as { error?: string; mode?: string; redirect?: string; id?: string };
      if (!res.ok) throw new Error(json.error ?? "Checkout failed.");
      if (json.mode === "stripe" && json.redirect) {
        window.location.href = json.redirect;
        return;
      }
      window.location.href = json.redirect ?? `/shop/confirmed?r=${json.id ?? ""}&product=${productId}&size=${size}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setBusy(false);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="mt-12 border border-[#1c1a17]/12 bg-white/40 p-8">
        <p className="text-[15px] leading-relaxed text-[#1c1a17]/75">Your checkout bag is empty.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/shop" className="inline-flex h-12 items-center bg-[#B03236] px-5 text-[11px] tracking-[0.16em] text-white uppercase">
            Shop footwear
          </Link>
          <Link href="/line" className="inline-flex h-12 items-center border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase">
            Browse the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-10">
      <ul className="divide-y divide-[#1c1a17]/10 border-y border-[#1c1a17]/10">
        {rows.map((row) => (
          <li key={`${row.kind}-${row.item.productId}-${row.item.size}-${row.item.color ?? ""}`} className="flex flex-wrap items-center gap-4 py-5">
            {row.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.image} alt="" className="h-20 w-20 object-contain bg-[#efefed]" />
            ) : (
              <span className="inline-flex h-20 w-20 items-center justify-center bg-[#efefed] text-[10px] tracking-[0.14em] uppercase text-[#1c1a17]/45">
                {row.kind}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <Link href={row.href} className="font-serif text-[1.25rem] leading-tight hover:opacity-70">
                {row.label}
              </Link>
              <p className="mt-1 text-[12px] text-[#1c1a17]/60">
                {row.kind === "runner" ? `Size ${row.item.size}` : row.item.size ? `Preference ${row.item.size}` : "Size confirmed with quotation"}
                {row.item.color ? ` · ${row.item.color}` : ""}
              </p>
              <p className="mt-1 text-[14px] tabular-nums">{row.price != null ? formatUsd(row.price) : "Enquire"}</p>
            </div>
            <button
              type="button"
              className="text-[11px] tracking-[0.14em] uppercase text-[#B03236]"
              onClick={() => bag.commit(removeBagItem(bag.data, row.item.productId, row.item.size, row.kind))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {runners.length > 0 ? (
        <section className="space-y-4 border border-[#1c1a17]/12 bg-white/50 p-6">
          <h2 className="font-serif text-2xl">Footwear checkout</h2>
          <p className="text-[14px] text-[#1c1a17]/70">
            Total {formatUsd(runnerTotal)}. When card checkout is configured you continue to payment; otherwise the house records a reservation and confirms by email.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-[11px] tracking-[0.14em] uppercase">
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-11 w-full border border-[#1c1a17]/20 bg-white px-3 text-base normal-case tracking-normal" required />
            </label>
            <label className="text-[11px] tracking-[0.14em] uppercase">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-11 w-full border border-[#1c1a17]/20 bg-white px-3 text-base normal-case tracking-normal" required />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            {runners.map((row) => (
              <button
                key={`pay-${row.item.productId}-${row.item.size}`}
                type="button"
                disabled={busy || !email || !name}
                className="inline-flex h-12 items-center bg-[#B03236] px-5 text-[11px] tracking-[0.16em] text-white uppercase disabled:opacity-40"
                onClick={() => checkoutRunner(row.item.productId, row.item.size)}
              >
                Checkout {row.label.split("—").pop()?.trim() ?? "pair"}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {apparel.length > 0 ? (
        <section className="space-y-4 border border-[#1c1a17]/12 bg-white/50 p-6">
          <h2 className="font-serif text-2xl">Apparel quotation</h2>
          <p className="text-[14px] text-[#1c1a17]/70">
            List total {formatUsd(apparelTotal)}. These pieces are confirmed by written quotation before production — not an instant card charge.
          </p>
          <Link
            href={`/wardrobe?${new URLSearchParams({
              ref: apparel.map((row) => row.item.productId).join(","),
              note: apparel.map((row) => `${row.label}${row.price != null ? ` ${formatUsd(row.price)}` : ""}`).join("; "),
            }).toString()}#introduction`}
            className="inline-flex h-12 items-center bg-[#1c1a17] px-5 text-[11px] tracking-[0.16em] text-[#f5f0e8] uppercase"
          >
            Request quotation
          </Link>
        </section>
      ) : null}

      {error ? <p className="text-sm text-[#B03236]">{error}</p> : null}
    </div>
  );
}
