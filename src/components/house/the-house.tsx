import Link from "next/link";

export function TheHouse() {
  return (
    <section
      id="the-house"
      className="scroll-mt-24 border-t border-[#1c1a17]/10 bg-[#f2eee8]"
      aria-labelledby="house-heading"
    >
      <div className="mx-auto grid max-w-[980px] items-center gap-10 px-5 py-16 md:grid-cols-[280px_minmax(0,1fr)] md:gap-14 md:px-8 md:py-24">
        <figure className="mx-auto w-full max-w-[280px]">
          <img
            src="/house/founder.webp"
            alt="The founder"
            width={1080}
            height={1258}
            className="h-auto w-full"
          />
          <figcaption className="ms-caption mt-3 text-center text-[12px] tracking-[0.14em] text-[#1c1a17]/55 uppercase">
            The founder
          </figcaption>
        </figure>
        <div>
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
          <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-[#41505b]">
            The line is the founder&apos;s, for grace and a life changed. A purchase does not confer moral or spiritual standing. The house keeps a Christian name and welcomes a client of any belief.
          </p>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#1c1a17]/70">
            Clothes and pairs are made to order and are ready in 4 to 6 weeks. A fitting is not held in person. A remote fitting consultation can be added to a wardrobe request. It has no listed price, and it is not an appointment on a calendar.
          </p>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#1c1a17]/55">
            A request is recorded. Payment is taken only when checkout is connected. The house writes back to the email you give. A response time is not promised. Sacred pictures on a garment are part of the design, and they are labelled as studies until a production photograph exists. The longer account is his to write.
          </p>
          <Link
            href="/brand"
            className="mt-10 inline-flex h-12 items-center border border-[#1c1a17]/30 px-6 text-[12px] tracking-[0.18em] text-[#1c1a17] uppercase transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1a17]"
          >
            The wordmark
          </Link>
        </div>
      </div>
    </section>
  );
}
