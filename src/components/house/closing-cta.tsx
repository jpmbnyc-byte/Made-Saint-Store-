import Link from "next/link";
import { copy } from "@/lib/copy";

export function ClosingCta() {
  return (
    <section className="ms-liquid border-t border-[#1c1a17]/10" aria-label="Choose your path">
      <div className="relative z-[1] mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-px bg-[#1c1a17]/10 md:grid-cols-2">
          <div className="flex flex-col bg-[#f5f0e8] p-8 md:p-12">
            <p className="ms-kicker text-[#B03236]">{copy.home.runner.eyebrow}</p>
            <h2 className="ms-title mt-4">{copy.home.runner.heading}</h2>
            <p className="ms-lede mt-5 max-w-sm flex-1">{copy.home.service.body}</p>
            <div className="mt-8">
              <Link
                href="/shop#1101"
                className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
              >
                {copy.home.runner.action}
              </Link>
            </div>
          </div>

          <div className="flex flex-col bg-[#ede6d8] p-8 md:p-12">
            <p className="ms-kicker">{copy.home.wardrobe.eyebrow}</p>
            <h2 className="ms-title mt-4">{copy.home.wardrobe.heading}</h2>
            <p className="ms-lede mt-5 max-w-sm flex-1">{copy.home.wardrobe.body}</p>
            <div className="mt-8">
              <Link
                href="/wardrobe"
                className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349]"
              >
                {copy.home.wardrobe.action}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
