import Link from "next/link";
import { OFFERINGS } from "@/lib/private-client";

const SHOWN = [
  {
    id: "piece",
    href: "#edition",
    cta: "Continue to the pairs",
    includes: [
      "One founding colorway",
      "US men's 7 to 12",
      "The price on the card is the price",
      "Available now",
      "The 0929 is made to order. Ready in 4 to 6 weeks.",
    ],
  },
  {
    id: "look",
    href: "#looks",
    cta: "Open a look",
    includes: [
      "The clothes listed under the photograph",
      "Only a founding pair is added to the figure",
      "A commission stays off that reservation",
      "Business, the weekend, and an occasion",
    ],
  },
  {
    id: "season",
    href: "/wardrobe#introduction",
    cta: "Request an introduction",
    includes: [
      "One season, planned before a price is approved",
      "An annual wardrobe, from $20,000",
      "The figure is a planning target",
      "Nothing here is added at checkout",
    ],
  },
] as const;

export function Paths({ from }: { from: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {SHOWN.map((item) => {
        const offer = OFFERINGS.find((entry) => entry.id === item.id);
        if (!offer) return null;
        const price = item.id === "piece" ? `From $${from}` : offer.investment;
        return (
          <article key={item.id} className="flex flex-col border border-[#c0a477]/70 bg-[#f7f4ef]/80 p-6">
            <p className="text-[11px] tracking-[0.18em] text-[#8d7349] uppercase">{offer.preliminary ? "Planning target" : "Priced"}</p>
            <h3 className="mt-3 font-serif text-4xl text-[#2a3746]">{offer.name}</h3>
            <p className="mt-4 font-serif text-3xl text-[#2a3746]">{price}</p>
            <ul className="mt-5 flex-1 space-y-2 text-[14px] leading-relaxed text-[#41505b]">
              {item.includes.map((line) => (
                <li key={line} className="border-t border-[#c0a477]/40 pt-2">{line}</li>
              ))}
            </ul>
            <Link href={item.href} className="mt-6 text-[11px] tracking-[0.16em] text-[#2a3746] uppercase underline decoration-[#c0a477] underline-offset-4">
              {item.cta}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
