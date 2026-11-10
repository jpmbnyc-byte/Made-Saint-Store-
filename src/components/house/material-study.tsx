import Image from "next/image";

const MATERIALS = [
  {
    src: "/hero/leather-navy.webp",
    alt: "MADE SAiNT navy full-grain leather runner — lateral hero view against limestone plaster",
    label: "Full-grain leather",
    note: "Navy · Leather",
  },
  {
    src: "/opening/butter-hand.webp",
    alt: "Butter leather runner held in hand — panel construction and colour detail",
    label: "Butter leather",
    note: "Hand study",
  },
  {
    src: "/opening/mesh-rose-plinth.webp",
    alt: "Rose mesh runner beside its sole — perforated mesh panel detail",
    label: "Perforated mesh",
    note: "Study",
  },
  {
    src: "/opening/mesh-rose-overhead.webp",
    alt: "Rose and brown mesh runners overhead — compositional view of the sole and upper",
    label: "Overhead composition",
    note: "Mesh study",
  },
];

export function MaterialStudy() {
  return (
    <section
      id="materials"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f5f0e8]"
      aria-labelledby="material-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24 md:px-8">
        <div className="mb-12 max-w-xl">
          <p className="text-[11px] tracking-[0.28em] text-[#8d7349] uppercase">Surface & construction</p>
          <h2
            id="material-heading"
            className="mt-4 font-serif leading-[0.95] text-[#1c1a17]"
            style={{ fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.03em" }}
          >
            What your hands
            <br />
            will tell you first.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#41505b]">
            Woven calf, bouclé suede, perforated mesh, and nub-lug rubber. Each panel is chosen for feel, not effect.
          </p>
        </div>

        {/* Asymmetric material grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {MATERIALS.map((m, i) => (
            <figure key={m.src} className={i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}>
              <div
                className="ms-resin relative overflow-hidden bg-[#ede6d8]"
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
                  className="object-cover"
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

        <p className="mt-8 text-[12px] leading-relaxed text-[#1c1a17]/45">
          Leather studies can be requested. A price is not listed, and a ship date is not promised. The priced colorways are Navy / Ivory, Navy / Sand, and Washed / Indigo.
        </p>
      </div>
    </section>
  );
}
