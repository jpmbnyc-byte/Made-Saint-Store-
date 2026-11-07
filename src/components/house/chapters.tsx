"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type View = {
  id: string;
  label: string;
  src: string;
  alt: string;
  fit: "contain" | "cover";
};

type Row = {
  role: string;
  name: string;
  note: string;
  href?: string;
  action?: string;
};

type Chapter = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  ground: string;
  views: View[];
  rows: Row[];
  inquiry: string;
};

const CHAPTERS: Chapter[] = [
  {
    id: "arrival",
    kicker: "Arrival",
    title: "A navy set for the hour before the room.",
    body: "Jacket, a light layer, and a matching trouser, worn as one. The shoes in the photograph are brown mules. They are not a founding runner.",
    ground: "bg-[#f2eee8]",
    views: [
      { id: "look", label: "Full look", src: "/line/f35.webp", alt: "Navy zip jacket, white layer, and matching trouser, worn full length", fit: "contain" },
      { id: "wide", label: "The day", src: "/line/f34.webp", alt: "The same navy set, standing on a course", fit: "contain" },
      { id: "runner", label: "Alternative runner", src: "/stories/chalk-navy.webp", alt: "Chalk and navy founding runner, a product photograph", fit: "contain" },
    ],
    rows: [
      { role: "Jacket", name: "Arrival zip jacket", note: "The navy jacket in the photograph. Commissioned, not reserved." },
      { role: "Layer", name: "White layer", note: "Visible under the jacket. It is not a separate piece on the register." },
      { role: "Trouser", name: "Arrival trouser", note: "Cut to match the jacket in the photograph." },
      { role: "Runner", name: "Chalk", note: "An alternative. Not the brown mule in the photograph.", href: "/shop/ms-runner-chalk-navy", action: "See the pair" },
    ],
    inquiry: "/wardrobe?look=arrival#introduction",
  },
  {
    id: "everyday",
    kicker: "Everyday",
    title: "Denim, a knit, and a day with nothing scheduled.",
    body: "One silhouette, then the jacket flat and the artwork on another denim study. The shoes in the photograph are pale blue hikers, not the washed-denim runner.",
    ground: "bg-[#e9e2d6]",
    views: [
      { id: "look", label: "Full look", src: "/line/f28.webp", alt: "Washed denim jacket, yellow knit, jeans, and pale blue hikers", fit: "contain" },
      { id: "jacket", label: "Jacket", src: "/line/f10.webp", alt: "Washed denim zip jacket with a MADE SAINT wordmark", fit: "contain" },
      { id: "artwork", label: "Artwork", src: "/line/f09.webp", alt: "Back of a washed denim jacket with a Saint Gabriel study", fit: "contain" },
      { id: "runner", label: "Alternative runner", src: "/stories/washed-denim.webp", alt: "Washed denim founding runner, a product photograph", fit: "contain" },
    ],
    rows: [
      { role: "Jacket", name: "Wordmark denim", note: "In the photograph. Not assigned to a style code." },
      { role: "Layer", name: "Yellow knit", note: "In the photograph. Not a separate piece on the register." },
      { role: "Trouser", name: "Washed jean", note: "In the photograph. Not a separate piece on the register." },
      { role: "Runner", name: "Washed denim", note: "An alternative. Not the hiker in the photograph.", href: "/shop/ms-runner-washed-denim", action: "See the pair" },
    ],
    inquiry: "/wardrobe?look=off-duty#introduction",
  },
  {
    id: "saint-john",
    kicker: "Saint John",
    title: "The artwork sits on the garment.",
    body: "A camel jacket and trouser, shown as a study. The back carries Saint John the Forerunner. This is not a client, and it is not a production photograph.",
    ground: "bg-[#f6f1ea]",
    views: [
      { id: "set", label: "The set", src: "/hero/saint-john.webp", alt: "Camel Saint John jacket and trouser, front and back, on paper", fit: "contain" },
      { id: "front", label: "Front", src: "/editorial/saint-john-front.webp", alt: "Front of the camel Saint John jacket", fit: "contain" },
      { id: "back", label: "Back", src: "/editorial/saint-john-back.webp", alt: "Back of the camel Saint John jacket with the sacred artwork", fit: "contain" },
    ],
    rows: [
      { role: "Jacket", name: "Saint John jacket", note: "Front, and the artwork on the back." },
      { role: "Trouser", name: "Matching trouser", note: "Shown with the jacket on the full sheet." },
    ],
    inquiry: "/wardrobe?look=saint-john#introduction",
  },
];

export function Chapters() {
  return (
    <>
      {CHAPTERS.map((chapter) => (
        <ChapterView key={chapter.id} chapter={chapter} />
      ))}
    </>
  );
}

function ChapterView({ chapter }: { chapter: Chapter }) {
  const [viewId, setViewId] = useState(chapter.views[0].id);
  const view = chapter.views.find((item) => item.id === viewId) ?? chapter.views[0];

  return (
    <section id={chapter.id} className={`scroll-mt-24 border-t border-[#1c1a17]/10 ${chapter.ground}`}>
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-16 md:px-8 md:py-24">
        <div>
          <p className="text-sm text-[#B03236]">{chapter.kicker}</p>
          <h2 className="ms-rise mt-3 max-w-xl font-serif text-4xl leading-[1.02] text-[#1c1a17] md:text-6xl">{chapter.title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#3c4650]">{chapter.body}</p>
          <ul className="mt-8 divide-y divide-[#1c1a17]/12 border-y border-[#1c1a17]/12">
            {chapter.rows.map((row) => (
              <li key={row.role} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="text-sm text-[#1c1a17]/55">{row.role}</p>
                  <p className="mt-1 font-serif text-2xl leading-none text-[#1c1a17]">{row.name}</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#3c4650]">{row.note}</p>
                </div>
                {row.href && row.action && (
                  <Link href={row.href} className="mt-1 shrink-0 text-sm text-[#1c1a17] underline decoration-[#B03236] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]">
                    {row.action}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href={chapter.inquiry} className="mt-8 inline-flex h-12 items-center bg-[#1c1a17] px-5 text-sm text-[#f6f4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]">
            Request this in an introduction
          </Link>
        </div>
        <div>
          <div className="relative aspect-[3/4] bg-[#f7f4ef]">
            <Image
              key={view.src}
              src={view.src}
              alt={view.alt}
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              className={`ms-photo ${view.fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label={`${chapter.kicker} views`}>
            {chapter.views.map((item) => {
              const on = item.id === view.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setViewId(item.id)}
                  className={`h-11 border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1a17] ${on ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/20 bg-transparent text-[#1c1a17]"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
