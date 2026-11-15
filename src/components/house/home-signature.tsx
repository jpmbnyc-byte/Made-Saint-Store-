import { copy } from "@/lib/copy";

/** Stable house conviction below the rotating hero — not repeated on every slide. */
export function HomeSignature() {
  return (
    <section
      className="border-t border-[#1c1a17]/10 bg-[#f7f7f5] text-[#1c1a17]"
      aria-label="House signature"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
        <p className="font-serif text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
          {copy.home.signature.heading}
        </p>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[#1c1a17]/70 md:text-[17px]">
          {copy.home.signature.body}
        </p>
      </div>
    </section>
  );
}
