import Image from "next/image";
import Link from "next/link";
import { ARCHIVE_CHAPTERS, FEATURED_ARCHIVE_CHAPTERS } from "@/lib/archive-chapters";
import { copy } from "@/lib/copy";

export function ArchiveGrid({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const chapters = featuredOnly ? FEATURED_ARCHIVE_CHAPTERS : ARCHIVE_CHAPTERS;

  return (
    <section
      id="archive"
      className="scroll-mt-28 border-t border-[#1c1a17]/10 bg-[#f7f7f5] text-[#1c1a17]"
      aria-labelledby="archive-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">The archive</p>
        <h2 id="archive-heading" className="ms-title mt-3">
          {copy.wardrobe.archiveHeading}
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={`/wardrobe/archive/${chapter.slug}`} className="group block">
                <span className="ms-studio-stage relative block aspect-[3/4] overflow-hidden">
                  <Image
                    src={chapter.primary.src}
                    alt={chapter.primary.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="mt-4 block text-[11px] tracking-[0.16em] text-[#1c1a17]/45 uppercase">
                  {chapter.number} · {chapter.palette}
                </span>
                <span className="mt-1 block font-serif text-2xl leading-tight tracking-[-0.01em]">
                  {chapter.title}
                </span>
                <span className="mt-2 block text-[14px] leading-relaxed text-[#1c1a17]/65">
                  {chapter.line}
                </span>
                <span className="mt-3 inline-flex border-b border-[#1c1a17]/30 pb-0.5 text-[14px]">
                  {chapter.action}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {featuredOnly ? (
          <Link
            href="/wardrobe/archive"
            className="mt-10 inline-flex border-b border-[#1c1a17] pb-1 text-[14px]"
          >
            {copy.wardrobe.archiveAllAction}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
