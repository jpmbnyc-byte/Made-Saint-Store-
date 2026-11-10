import { PLEDGE } from "@/lib/impact";

export function Pledge({ tone = "light" }: { tone?: "light" | "ink" }) {
  const muted = tone === "ink" ? "text-[#1c1a17]/75" : "text-[#41505b]";
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] text-[#8d7349] uppercase">{PLEDGE.line}</p>
      <p className={`mt-4 font-serif text-3xl leading-snug text-[#1c1a17] md:text-4xl`}>{PLEDGE.promise}</p>
      <p className={`mt-5 max-w-xl text-[16px] leading-relaxed ${muted}`}>{PLEDGE.dedication}</p>
      <p className={`mt-4 max-w-xl text-[15px] leading-relaxed ${muted}`}>{PLEDGE.growth}</p>
    </div>
  );
}
