import Image from "next/image";
import Link from "next/link";
import { productsIn } from "@/lib/business";
import { copy } from "@/lib/copy";

const colorOf = (name: string) => name.split("—").pop()?.trim() ?? name;

/** 1101 feature on the homepage — full footwear catalogue lives on /shop. */
export function Range1213() {
  const lead = productsIn("1101");
  const colors = lead.map((product) => colorOf(product.name));
  const body =
    colors.length > 0
      ? `Explore ${colors.slice(0, -1).join(", ")}${colors.length > 1 ? " and " : ""}${colors.at(-1)}.`
      : copy.home.runner.body;

  return (
    <section className="border-t border-[#1c1a17]/10 bg-[#f6f4ef]" aria-labelledby="runner-1101-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="ms-kicker">{copy.home.runner.eyebrow}</p>
        <h2 id="runner-1101-heading" className="ms-title mt-3">
          {copy.home.runner.heading}
        </h2>
        <p className="ms-lede mt-4 max-w-xl">{body}</p>
        <Link
          href="/shop#1101"
          className="mt-5 inline-flex border-b border-[#1c1a17] pb-1 text-[14px] text-[#1c1a17]"
        >
          {copy.home.runner.action}
        </Link>
        <ul className="mt-8 flex min-w-0 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {lead.map((product) => (
            <li key={product.id} className="w-36 shrink-0 sm:w-44">
              <Link href={`/shop/${product.id}#gallery`} className="block">
                <span className="relative block aspect-square bg-[#f3f3f1]">
                  <Image src={product.image} alt={product.name} fill sizes="176px" className="object-contain p-2" />
                </span>
                <span className="ms-meta mt-2 block">{colorOf(product.name)}</span>
                <span className="mt-1 block text-[12px] tabular-nums">${product.usd}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 border-t border-[#1c1a17]/10 pt-8">
          <Link href="/shop" className="inline-flex border-b border-[#1c1a17]/40 pb-1 text-[14px] text-[#1c1a17]/75">
            {copy.home.runner.footwearLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
