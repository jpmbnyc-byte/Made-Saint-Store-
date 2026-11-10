"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/business";
import { usd } from "@/lib/line";
import { CollectionChrome } from "@/components/line/chrome";
import { useBag } from "@/components/line/store";
import { emptyBag } from "@/lib/closet";

export default function BagPage() {
  const bag = useBag();
  const rows = bag.data.items.map((item) => ({ item, product: PRODUCTS.find((product) => product.id === item.productId) }));
  const subtotal = rows.reduce((sum, row) => sum + (row.product?.usd ?? 0) * row.item.qty, 0);
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <CollectionChrome view="account" />
      <main className="mx-auto max-w-[720px] px-5 py-10">
        <h1 className="text-[12px] tracking-[0.22em] uppercase">Bag</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-[#111]/70">A pair is requested on its own page. This bag does not take payment, and it does not confirm an order.</p>
        {rows.length === 0 ? (
          <p className="mt-8 text-sm">The bag is empty. <Link href="/shop#1101" className="underline underline-offset-4">The runners</Link> are the pairs that can be requested.</p>
        ) : (
          <ul className="mt-8 divide-y divide-[#111]/10 border-y border-[#111]/10">
            {rows.map(({ item, product }) => (
              <li key={`${item.productId}-${item.size}`} className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p>{product?.name ?? item.productId}</p>
                  <p className="mt-1 text-[13px] text-[#111]/60">Size {item.size} · {product ? usd(product.usd) : "Unavailable"}</p>
                  {product && <Link href={`/shop/${product.id}?size=${item.size}`} className="mt-2 inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">Request this pair</Link>}
                </div>
                <button type="button" className="h-11 text-[11px] tracking-[0.14em] uppercase" onClick={() => bag.commit({ version: 1, items: bag.data.items.filter((row) => !(row.productId === item.productId && row.size === item.size)) })}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        {rows.length > 0 && <p className="mt-6 text-sm">Merchandise {usd(subtotal)}. Tax and shipping are calculated when a pair is requested, not here.</p>}
        {rows.length > 0 && <button type="button" className="mt-4 text-[11px] tracking-[0.14em] uppercase underline underline-offset-4" onClick={() => bag.commit(emptyBag())}>Clear bag</button>}
      </main>
    </div>
  );
}
