import Image from "next/image";
import Link from "next/link";
import { HOUSE_DETAIL_CROPS, HOUSE_EYE } from "@/lib/house-eye";

export function HouseEye() {
  return (
    <section
      id="house-eye"
      className="relative scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#12151c] text-[#f5f0e8]"
      aria-labelledby="house-eye-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url('/brand/grain.svg')",
          backgroundSize: "180px 180px",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="ms-on-dark max-w-2xl">
          <p className="ms-kicker text-[#c0a477]">{HOUSE_EYE.kicker}</p>
          <h2 id="house-eye-heading" className="ms-display mt-4">
            Read the cloth
            <br />
            <em className="italic">in low light.</em>
          </h2>
          <p className="ms-lede mt-5 max-w-xl">{HOUSE_EYE.lede}</p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {HOUSE_DETAIL_CROPS.map((crop, i) => (
            <figure
              key={crop.src}
              className={`ms-underlit group relative overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "1 / 1" : "4 / 5" }}
            >
              <Image
                src={crop.src}
                alt={crop.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className={`ms-detail-crop object-cover ${crop.crop}`}
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12151c]/95 via-[#12151c]/40 to-transparent px-3 pb-3 pt-10">
                <span className="block text-[11px] tracking-[0.16em] text-[#f5f0e8]/75 uppercase">{crop.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ol className="mt-14 grid gap-8 border-t border-[#f5f0e8]/10 pt-10 md:grid-cols-3">
          {HOUSE_EYE.principles.map((item) => (
            <li key={item.n} className="ms-on-dark">
              <span className="font-serif text-2xl italic text-[#c0a477]">{item.n}</span>
              <h3 className="mt-3 font-serif text-3xl text-[#f5f0e8]">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#f5f0e8]/65">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#f5f0e8]/10 pt-8">
          <p className="max-w-xl font-serif text-2xl leading-snug text-[#f5f0e8]/85 md:text-3xl">
            {HOUSE_EYE.closing}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop#1101"
              className="ms-cta bg-[#f5f0e8] text-[#1c1a17] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0a477]"
            >
              See the runners
            </Link>
            <Link
              href="/wardrobe"
              className="ms-cta border text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5f0e8]"
              style={{ borderColor: "rgba(245, 240, 232, 0.35)" }}
            >
              Private Wardrobe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
