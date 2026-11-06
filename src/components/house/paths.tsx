import Link from "next/link";
import { OFFERINGS } from "@/lib/private-client";

const SHOWN = [
  { id: "piece", href: "#edition", cta: "Reserve a pair", detail: "One founding colorway. The price on the slider is the price." },
  { id: "look", href: "#looks", cta: "Open a look", detail: "The clothes are listed under the photograph. Only a founding pair is added." },
  { id: "season", href: "/wardrobe#commission", cta: "Commission", detail: "A planning target until a price is approved. The annual wardrobe starts at $20,000." },
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
            <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#41505b]">{item.detail}</p>
            <Link href={item.href} className="mt-6 text-[11px] tracking-[0.16em] text-[#2a3746] uppercase underline decoration-[#c0a477] underline-offset-4">
              {item.cta}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
