import Image from "next/image";
import Link from "next/link";
import { CAPSULES } from "@/lib/capsules";
import { copy } from "@/lib/copy";

export function CapsuleGrid({ limit }: { limit?: number }) {
  const capsules = typeof limit === "number" ? CAPSULES.slice(0, limit) : CAPSULES;
  const { capsulesHeading, capsulesIntro, capsulesAllAction } = copy.wardrobe;

  return (
    <section
      id="capsules"
      className="scroll-mt-28 border-t border-[#1c1a17]/10 bg-[#f7f7f5] text-[#1c1a17]"
      aria-labelledby="capsules-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">Capsules</p>
        <h2 id="capsules-heading" className="ms-title mt-3 max-w-[18ch]">
          {capsulesHeading}
        </h2>
        <p className="mt-4 max-w-[38rem] text-[15px] leading-relaxed text-[#1c1a17]/65">{capsulesIntro}</p>

        <ul className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {capsules.map((capsule, index) => (
            <li key={capsule.slug}>
              <Link href={`/wardrobe/capsules/${capsule.slug}`} className="group block">
                <span className="relative block aspect-[3/2] overflow-hidden bg-[#efefed]">
                  <Image
                    src={capsule.cardImage}
                    alt={capsule.alt}
                    width={capsule.width}
                    height={capsule.height}
                    priority={index < 2}
                    sizes="(min-width: 768px) 44vw, 92vw"
                    className="h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-95"
                  />
                </span>
                <span className="mt-5 block text-[11px] tracking-[0.16em] text-[#1c1a17]/45 uppercase">
                  {capsule.number} · {capsule.palette.map((swatch) => swatch.name).join(" / ")}
                </span>
                <span className="mt-2 block font-serif text-[1.75rem] leading-tight tracking-[-0.02em] md:text-[2rem]">
                  {capsule.title}
                </span>
                <span className="mt-2 block max-w-[36ch] text-[14px] leading-relaxed text-[#1c1a17]/65">
                  {capsule.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {typeof limit === "number" && limit < CAPSULES.length && (
          <div className="mt-12 text-center md:mt-16">
            <Link
              href="/wardrobe/capsules"
              className="inline-flex border-b border-[#1c1a17]/35 pb-1 text-[14px] transition-opacity hover:opacity-70"
            >
              {capsulesAllAction}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
