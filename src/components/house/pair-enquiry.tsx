import Link from "next/link";
import { copy } from "@/lib/copy";

export function PairEnquiry() {
  const { heading, body, action } = copy.home.service;

  return (
    <section id="enquire" className="border-t border-[#1c1a17]/10 bg-[#f5f0e8]" aria-labelledby="pair-enquiry-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <h2 id="pair-enquiry-heading" className="ms-display max-w-2xl">
          {heading}
        </h2>
        <p className="ms-lede mt-5 max-w-xl">{body}</p>
        <Link
          href="/shop#1101"
          className="ms-cta mt-8 inline-flex bg-[#1c1a17] text-[#f5f0e8] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B03236]"
        >
          {action}
        </Link>
      </div>
    </section>
  );
}
