"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

export type PreviewFrame = {
  src: string;
  alt: string;
  caption?: string;
};

/** High-resolution look / piece study opened from wardrobe assembly thumbs. */
export function WardrobePreview({
  frame,
  onClose,
}: {
  frame: PreviewFrame | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = Boolean(frame);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open) {
      if (!node.open) node.showModal();
      document.body.style.overflow = "hidden";
    } else if (node.open) {
      node.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="ms-wardrobe-preview fixed inset-0 z-[80] m-0 h-full max-h-none w-full max-w-none border-0 bg-[#1c1a17]/55 p-0 backdrop:bg-transparent"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      {frame ? (
        <div className="flex min-h-full items-center justify-center px-3 py-8 sm:px-6">
          <div className="relative grid w-full max-w-[1100px] overflow-hidden border border-[#1c1a17]/12 bg-[#f5f0e8] text-[#1c1a17] shadow-[0_24px_80px_rgba(28,26,23,0.28)] md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
            <div className="relative min-h-[55vh] bg-[#e7e0d4] md:min-h-[70vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={frame.src} alt={frame.alt} className="absolute inset-0 h-full w-full object-contain object-top" />
            </div>
            <div className="flex flex-col justify-between gap-6 p-5 md:p-7">
              <div>
                <p className="text-[11px] tracking-[0.18em] text-[#1c1a17]/50 uppercase">Study · full frame</p>
                <h2 id={titleId} className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                  {frame.alt}
                </h2>
                {frame.caption ? <p className="mt-4 text-[15px] leading-relaxed text-[#1c1a17]/70">{frame.caption}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#1c1a17] px-5 text-[11px] tracking-[0.16em] uppercase"
              >
                <X size={16} strokeWidth={1.25} aria-hidden="true" />
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

export function PreviewTrigger({
  src,
  alt,
  caption,
  className,
  imgClassName,
  onOpen,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  onOpen: (frame: PreviewFrame) => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-label={`View ${alt}`}
      onClick={(event) => {
        event.stopPropagation();
        onOpen({ src, alt, caption });
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={imgClassName} />
      {children}
    </button>
  );
}
