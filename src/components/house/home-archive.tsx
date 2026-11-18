import Image from "next/image";
import Link from "next/link";
import { HOME_ARCHIVE_CHAPTERS } from "@/lib/archive-chapters";
import { copy } from "@/lib/copy";

/** Selected archive chapters on the homepage. */
export function HomeArchive() {
  return (
    <section
      id="archive"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f7f7f5] text-[#1c1a17]"
      aria-labelledby="home-archive-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">{copy.home.archive.eyebrow}</p>
        <h2 id="home-archive-heading" className="ms-title mt-3">
          {copy.home.archive.heading}
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_ARCHIVE_CHAPTERS.map((chapter) => (
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
                  {chapter.number}
                </span>
                <span className="mt-1 block font-serif text-2xl leading-tight tracking-[-0.01em]">
                  {chapter.title}
                </span>
                <span className="mt-2 block text-[14px] leading-relaxed text-[#1c1a17]/65">
                  {chapter.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/wardrobe#archive"
          className="mt-10 inline-flex border-b border-[#1c1a17] pb-1 text-[14px] text-[#1c1a17]"
        >
          {copy.home.archive.action}
        </Link>
      </div>
    </section>
  );
}
