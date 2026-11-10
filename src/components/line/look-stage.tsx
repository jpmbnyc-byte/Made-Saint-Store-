"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLLECTION_LOOKS, customerStatus, lookBySlug, lookImage } from "@/lib/line-shop";
import { lineByRef } from "@/lib/line";
import { addPiece, hasPiece, saveLook } from "@/lib/closet";
import { useCloset } from "@/components/line/store";

export function LookStage({ slug }: { slug: string }) {
  const look = lookBySlug(slug);
  const router = useRouter();
  const closet = useCloset();
  const root = useRef<HTMLDivElement>(null);
  const [frameAt, setFrameAt] = useState(0);
  const [note, setNote] = useState("");
  const index = COLLECTION_LOOKS.findIndex((item) => item.slug === slug);
  const prev = COLLECTION_LOOKS[(index - 1 + COLLECTION_LOOKS.length) % COLLECTION_LOOKS.length];
  const next = COLLECTION_LOOKS[(index + 1) % COLLECTION_LOOKS.length];

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const previous = document.activeElement as HTMLElement | null;
    node.querySelector<HTMLElement>("[data-close]")?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") router.push("/line/lookbook");
      if (event.key !== "Tab" || !node) return;
      const items = [...node.querySelectorAll<HTMLElement>("a,button,select")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [router, slug]);

  if (!look || !prev || !next) return null;
  const frame = look.frames[frameAt] ?? look.frames[0];
  const image = lookImage(look, frame);
  const saved = closet.data.groups.some((group) => group.lookId === look.slug);
  const enquireHref = look.pieces[0] ? `/wardrobe?ref=${look.pieces[0].ref}#introduction` : "/wardrobe#introduction";

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={`Look ${look.number}`} className="fixed inset-0 z-50 overflow-y-auto bg-[#f7f7f5] text-[#111]">
      <div className="flex min-h-full flex-col md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="bg-[#f3f3f1] md:sticky md:top-0 md:h-screen">
          <img src={image} alt={frame?.alt ?? look.alt} className="h-[70vh] w-full object-contain md:h-screen" />
        </div>
        <div className="flex flex-col px-5 py-6 md:px-8 md:py-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] tracking-[0.2em] uppercase">Look {look.number}</p>
            <div className="flex items-center gap-2">
              <Link href={`/line/looks/${prev.slug}`} className="inline-flex h-11 items-center px-2 text-[11px] tracking-[0.14em] uppercase">Previous</Link>
              <Link href={`/line/looks/${next.slug}`} className="inline-flex h-11 items-center px-2 text-[11px] tracking-[0.14em] uppercase">Next</Link>
              <Link data-close href="/line/lookbook" className="inline-flex h-11 items-center px-2 text-[11px] tracking-[0.14em] uppercase">Close</Link>
            </div>
          </div>
          <h1 className="mt-6 text-[13px] tracking-[0.16em] uppercase">{look.title}</h1>
          {look.pieces.length > 0 ? (
            <ul className="mt-8 divide-y divide-[#111]/10 border-y border-[#111]/10">
              {look.pieces.map((item) => {
                const product = lineByRef(item.ref);
                const status = product ? customerStatus(product) : null;
                const thumb = lookImage(look);
                const inCloset = hasPiece(closet.data, { productRef: item.ref, color: item.color, size: "", lookId: look.slug });
                return (
                  <li key={item.ref} className="flex gap-4 py-4">
                    <img src={thumb} alt="" className="h-20 w-16 bg-[#f3f3f1] object-contain" />
                    <div className="min-w-0 flex-1">
                      <Link href={`/line/${item.ref.toLowerCase()}`} className="text-[15px] underline underline-offset-4">{product?.name ?? item.role}</Link>
                      <p className="mt-1 text-[12px] text-[#111]/60">{item.color}</p>
                      <p className="mt-1 text-[12px]">{status?.price ? `${status.price} · proposed` : "Enquire"}</p>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <button
                          type="button"
                          className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase"
                          onClick={() => {
                            if (inCloset) {
                              setNote(`${product?.name ?? item.role} is already in My Closet.`);
                              return;
                            }
                            closet.commit(addPiece(closet.data, { productRef: item.ref, kind: "line", color: item.color, size: "", lookId: look.slug }, new Date().toISOString()));
                            setNote(`${product?.name ?? item.role} is in My Closet. Choose a size before any purchase.`);
                          }}
                        >
                          {inCloset ? "In Closet" : "Add to Closet"}
                        </button>
                        <Link href={`/wardrobe?ref=${item.ref}#introduction`} className="inline-flex h-11 items-center text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                          Enquire
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-8 text-[14px] leading-relaxed text-[#111]/70">
              This look is not a listed product. Saving it keeps the photograph in My Closet. An enquiry does not start a checkout.
            </p>
          )}
          {look.styling.map((line) => (
            <p key={line} className="mt-4 text-[13px] leading-relaxed text-[#111]/65">{look.pieces.length ? `Styling item. ${line}` : line}</p>
          ))}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex h-11 items-center border border-[#111] px-4 text-[11px] tracking-[0.14em] uppercase"
              onClick={() => {
                if (saved) {
                  setNote("This look is already in My Closet. Saving does not reserve a piece or lock a price.");
                  return;
                }
                closet.commit(saveLook(closet.data, { slug: look.slug, title: look.title, pieces: look.pieces.map((item) => ({ ref: item.ref, color: item.color })) }, new Date().toISOString()));
                setNote("The look is in My Closet. Saving does not reserve a piece or lock a price.");
              }}
            >
              {saved ? "Look saved" : "Save look to Closet"}
            </button>
            <Link href={enquireHref} className="inline-flex h-11 items-center bg-[#111] px-4 text-[11px] tracking-[0.14em] text-[#f7f7f5] uppercase">
              Enquire
            </Link>
            <Link href="/closet" className="inline-flex h-11 items-center px-2 text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">My Closet</Link>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-[#111]/60">Saving does not reserve stock or lock a price. Mapped garments stay enquiries. Runners are requested from the shop.</p>
          <p className="sr-only" aria-live="polite">{note}</p>
          {note && <p className="mt-3 text-sm">{note}</p>}
          {look.frames.length > 1 && (
            <div className="mt-6 flex gap-2">
              {look.frames.map((item, at) => (
                <button key={item.n} type="button" aria-label={`Frame ${at + 1}`} onClick={() => setFrameAt(at)} className={`h-16 w-12 bg-[#f3f3f1] ${at === frameAt ? "ring-1 ring-[#111]" : ""}`}>
                  <img src={lookImage(look, item)} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
