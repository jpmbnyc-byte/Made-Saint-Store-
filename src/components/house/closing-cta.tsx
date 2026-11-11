import Link from "next/link";
import { CampaignBanner } from "@/components/house/campaign-banner";
import { customerStatus } from "@/lib/line-shop";
import { lineByRef } from "@/lib/line";

const duffelPrice = customerStatus(lineByRef("R067")!).price ?? "$590";

export function ClosingCta() {
  return (
    <>
      <CampaignBanner
        id="coast"
        src="/world/coastline.webp"
        alt="MADE SAiNT runners, duffel, and tees on the north coast, a campaign study"
        kicker="The north coast · campaign study"
        title="Product, on the coast."
        body="Runners, the denim-trim duffel, and the acid-wash tees at the water. A campaign study of the north coast, not a photograph of a factory or a house."
        chips={[
          { href: "/shop/ms-runner-chalk-navy", label: "0929 Navy / Ivory", price: "$490" },
          { href: "/shop/ms-runner-1101-butter", label: "1101 Butter", price: "$550" },
          { href: "/line/r067", label: "Duffel", price: duffelPrice },
          { href: "/wardrobe#introduction", label: "Tees", price: "Enquire" },
        ]}
        primary={{ href: "/shop#1101", label: "Shop the runners" }}
        secondary={{ href: "/line/lookbook", label: "Shop the looks" }}
      />
      <section
        className="ms-liquid border-t border-[#1c1a17]/10"
        aria-label="Choose your path"
      >
        <div className="relative z-[1] mx-auto max-w-[1100px] px-5 py-16 md:py-24 md:px-8">
          <div className="grid gap-px bg-[#1c1a17]/10 md:grid-cols-2">
            {/* 1101 path */}
            <div className="flex flex-col bg-[#f5f0e8] p-8 md:p-12">
              <p className="ms-kicker text-[#B03236]">1101</p>
              <h2 className="ms-title mt-4">
                The lead runner.
              </h2>
              <p className="ms-lede mt-5 max-w-sm flex-1">
                $550. Live and made to order. Ready in 4 to 6 weeks.
              </p>
              <div className="mt-8">
                <Link
                  href="/shop#1101"
                  className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
                >
                  Explore 1101
                </Link>
              </div>
            </div>

            {/* Private Wardrobe path */}
            <div className="flex flex-col bg-[#ede6d8] p-8 md:p-12">
              <p className="ms-kicker">Private Wardrobe</p>
              <h2 className="ms-title mt-4">
                Begin your
                <br />
                <em className="italic">wardrobe.</em>
              </h2>
              <p className="ms-lede mt-5 max-w-sm flex-1">
                Discover what a private wardrobe is, choose a starting set, keep the pieces you want, then introduce yourself to the house. No cart. No payment on the form.
              </p>
              <div className="mt-8">
                <Link
                  href="/wardrobe"
                  className="ms-cta bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d7349]"
                >
                  Open Private Wardrobe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
