import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopFooter, ShopHeader } from "@/components/shop/chrome";
import { ARCHIVE_CHAPTERS, archiveChapterBySlug } from "@/lib/archive-chapters";
import { runnerHref } from "@/lib/business";
import { copy } from "@/lib/copy";

export function generateStaticParams() {
  return ARCHIVE_CHAPTERS.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const chapter = archiveChapterBySlug((await params).slug);
  if (!chapter) return { title: "Archive chapter" };
  return {
    title: chapter.title,
    description: chapter.line,
  };
}

export default async function ArchiveChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const chapter = archiveChapterBySlug((await params).slug);
  if (!chapter) notFound();

  const enquireHref = `/wardrobe#introduction?look=${encodeURIComponent(chapter.slug)}`;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1c1a17]">
      <ShopHeader />
      <main>
        <article className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
          <p className="ms-kicker">
            {chapter.number} · {chapter.palette}
          </p>
          <h1 className="ms-display mt-4">{chapter.title}</h1>
          <p className="ms-lede mt-4 max-w-2xl">{chapter.line}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <figure className="relative aspect-[3/4] overflow-hidden bg-[#efefed]">
              <Image
                src={chapter.primary.src}
                alt={chapter.primary.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
              <figcaption className="sr-only">{chapter.primary.label}</figcaption>
            </figure>

            <div>
              <h2 className="font-serif text-2xl tracking-[-0.01em]">{copy.wardrobe.piecesHeading}</h2>
              <ul className="mt-4 space-y-2 border-t border-[#1c1a17]/10 pt-4">
                {chapter.pieceNotes.map((note) => (
                  <li key={note} className="text-[15px] leading-relaxed text-[#1c1a17]/75">
                    {note}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={enquireHref} className="ms-cta inline-flex bg-[#1c1a17] text-[#f5f0e8]">
                  {copy.wardrobe.enquireLookAction}
                </Link>
                <Link
                  href={`/closet?saveLook=${encodeURIComponent(chapter.slug)}`}
                  className="ms-cta inline-flex border border-[#1c1a17]/25"
                >
                  {copy.wardrobe.saveLookAction}
                </Link>
              </div>

              {chapter.runnerId ? (
                <p className="mt-6">
                  <Link
                    href={runnerHref(chapter.runnerId)}
                    className="inline-flex border-b border-[#1c1a17]/40 pb-0.5 text-[14px]"
                  >
                    View the pictured runner
                  </Link>
                </p>
              ) : null}

              {chapter.alternates.length > 0 ? (
                <div className="mt-10">
                  <h2 className="font-serif text-2xl tracking-[-0.01em]">Alternate views</h2>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                    {chapter.alternates.map((view) => (
                      <li key={view.src}>
                        <a href={view.src} aria-label={`Enlarge ${view.alt}`} className="block">
                          <figure
                            className="relative overflow-hidden bg-[#efefed]"
                            style={{ aspectRatio: view.width && view.height ? view.width / view.height : 4 / 5 }}
                          >
                            <Image
                              src={view.src}
                              alt={view.alt}
                              fill
                              sizes="(min-width: 640px) 20vw, 45vw"
                              className="object-contain"
                            />
                          </figure>
                        </a>
                        <p className="mt-2 text-[12px] tracking-[0.08em] text-[#1c1a17]/55 uppercase">
                          {view.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-14">
            <Link href="/wardrobe/archive" className="inline-flex border-b border-[#1c1a17] pb-1 text-[14px]">
              {copy.wardrobe.archiveAllAction}
            </Link>
          </p>
        </article>
      </main>
      <ShopFooter />
    </div>
  );
}
