import Link from "next/link";

export function TheHouse() {
  return (
    <section
      id="the-house"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f2eee8]"
      aria-labelledby="house-heading"
    >
      <div className="mx-auto max-w-[840px] px-5 py-20 text-center md:py-28 md:px-8">
        <p className="text-[11px] tracking-[0.28em] text-[#8d7349] uppercase">The House</p>
        <h2
          id="house-heading"
          className="mt-5 font-serif text-[#1c1a17]"
          style={{ fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
        >
          Once sinner.
          <br />
          <em className="italic">Made Saint.</em>
        </h2>
        <p className="mt-7 mx-auto max-w-lg text-[16px] leading-relaxed text-[#41505b]">
          The line is the founder&apos;s, for grace and a life changed. A purchase does not confer moral or spiritual standing. The house keeps a Christian name and welcomes a client of any belief.
        </p>
        <p className="mt-5 mx-auto max-w-lg text-[15px] leading-relaxed text-[#1c1a17]/55">
          Sacred pictures on a garment are part of the design, and they are labelled as studies until a production photograph exists. The longer account is his to write.
        </p>
        <Link
          href="/brand"
          className="mt-10 inline-flex h-12 items-center border border-[#1c1a17]/30 px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]"
        >
          About the house
        </Link>
      </div>
    </section>
  );
}
