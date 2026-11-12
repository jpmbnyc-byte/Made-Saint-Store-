import Image from "next/image";
import Link from "next/link";

const MATERIALS = [
  {
    src: "/hero/leather-navy.webp",
    alt: "MADE SAiNT navy full-grain leather runner — lateral hero view against limestone plaster",
    label: "Full-grain leather",
    note: "Underlit · Navy",
    crop: "object-[center_35%] scale-[1.15]",
  },
  {
    src: "/opening/butter-hand.webp",
    alt: "Brown mesh runner — dark chocolate suede and tan open mesh",
    label: "Brown mesh",
    note: "Hand crop",
    crop: "object-[center_40%] scale-[1.4]",
  },
  {
    src: "/opening/mesh-rose-plinth.webp",
    alt: "Rose mesh runner beside its sole — perforated mesh panel detail",
    label: "Perforated mesh",
    note: "Study crop",
    crop: "object-[center_60%] scale-[1.35]",
  },
  {
    src: "/runners/navy-ivory-detail.webp",
    alt: "Navy / Ivory runner — wave and sole as a construction detail",
    label: "Wave & sole",
    note: "Detail crop",
    crop: "object-center scale-[1.25]",
  },
];

export function MaterialStudy() {
  return (
    <section
      id="materials"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f5f0e8]"
      aria-labelledby="material-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 max-w-xl">
          <p className="ms-kicker">Surface & construction</p>
          <h2 id="material-heading" className="ms-display mt-4">
            What your hands
            <br />
            will tell you first.
          </h2>
          <p className="ms-lede mt-5">
            Close frames of woven calf, bouclé suede, perforated mesh, and nub-lug rubber. Design previews until a physical sample is confirmed.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {MATERIALS.map((m, i) => (
            <figure key={m.src} className={i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}>
              <div
                className="ms-underlit relative overflow-hidden"
                style={{ aspectRatio: i === 0 ? "1 / 1" : "3 / 4" }}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 768px) 50vw, 100vw"
                      : "(min-width: 768px) 25vw, 50vw"
                  }
                  className={`ms-detail-crop object-cover ${m.crop}`}
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2 flex items-baseline gap-2">
                <span className="text-[12px] font-medium text-[#1c1a17]">{m.label}</span>
                <span className="text-[11px] text-[#1c1a17]/45">{m.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-[12px] leading-relaxed text-[#1c1a17]/45">
            Leather studies can be requested. A price is not listed, and a ship date is not promised. The priced colorways are Navy / Ivory, Navy / Sand, and Washed / Indigo.
          </p>
          <Link href="/shop#1101" className="ms-link text-[#1c1a17]">
            Enquire about 1101
          </Link>
        </div>
      </div>
    </section>
  );
}
