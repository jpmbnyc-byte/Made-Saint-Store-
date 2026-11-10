import Link from "next/link";
import { QUESTIONS } from "@/lib/questions";

const TENSIONS = [
  {
    n: "01",
    title: "A picture is not a pair",
    body: "The 0929 is made to order and ready in 4 to 6 weeks. The 1101 and the 1213 are studies. A ship date is not promised.",
  },
  {
    n: "02",
    title: "A look is not a cart",
    body: "The clothes in a photograph are commissioned. Only a founding pair is added to the price.",
  },
  {
    n: "03",
    title: "The size is chosen now",
    body: "The size sits on the reservation. Between sizes, take the half size up.",
  },
] as const;

const FOR = [
  "You can wait 4 to 6 weeks for a 0929 pair made for you.",
  "You want the published price, the same on the first day and the last.",
  "You are dressing a day. The clothes around the pair are commissioned.",
] as const;

const NOT_FOR = [
  "You need a pair shipped this week.",
  "You want a listed price on a leather study. Those can be requested, and a price is not listed.",
  "You want to check out the 2027 line, or to treat a seasonal figure as a price.",
] as const;

export function Tensions() {
  return (
    <section className="border-t border-[#41505b]/10">
      <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-3 md:px-8 md:py-20">
        {TENSIONS.map((item) => (
          <article key={item.n}>
            <p className="font-serif text-3xl text-[#c0a477] italic">{item.n}</p>
            <h2 className="mt-3 font-serif text-3xl text-[#2a3746]">{item.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#41505b]">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Fit() {
  return (
    <section id="fit" className="scroll-mt-24 border-t border-[#41505b]/10">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">The reservation</p>
        <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-[0.95] text-[#2a3746]">Who this is for.</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">For</h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#41505b]">
              {FOR.map((line) => (
                <li key={line} className="border-t border-[#c0a477]/40 pt-3">{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.16em] text-[#8d7349] uppercase">Not this reservation</h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#41505b]">
              {NOT_FOR.map((line) => (
                <li key={line} className="border-t border-[#41505b]/15 pt-3">{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Questions() {
  return (
    <section id="questions" className="scroll-mt-24 border-t border-[#41505b]/10">
      <div className="mx-auto max-w-[800px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">Before you reserve</p>
        <h2 className="mt-3 font-serif text-5xl text-[#2a3746]">Questions</h2>
        <div className="mt-8 divide-y divide-[#41505b]/15 border-y border-[#41505b]/15">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] text-[#2a3746]">
                {item.q}
                <span className="text-xl leading-none text-[#c0a477] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#41505b]">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[#41505b]">
          The same answers sit on <Link href="/shop#faq" className="underline decoration-[#c0a477] underline-offset-4">the founding edition</Link>.
        </p>
      </div>
    </section>
  );
}
