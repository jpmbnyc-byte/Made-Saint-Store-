export const ORDER_STEPS = [
  {
    n: "1",
    when: "Now",
    title: "Choose",
    body: "Pick a colourway and a preferred size.",
  },
  {
    n: "2",
    when: "Enquire",
    title: "Send",
    body: "Send your preferred style, size and colour. We will confirm availability, price and delivery before you order.",
  },
  {
    n: "3",
    when: "Quotation",
    title: "Confirm",
    body: "Delivery is confirmed with your quotation.",
  },
] as const;

export function orderWindowLine() {
  return "Delivery is confirmed with your quotation.";
}

export function OrderRule({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-[#f6f4ef]/70" : "text-[#1c1a17]/70";
  const rule = dark ? "border-[#f6f4ef]/20" : "border-[#1c1a17]/15";

  if (compact) {
    return (
      <ol className={`divide-y ${rule} border-y text-sm leading-relaxed ${muted}`}>
        {ORDER_STEPS.map((step) => (
          <li key={step.n} className="py-3">
            <span className={dark ? "text-[#f6f4ef]" : "text-[#1c1a17]"}>{step.n}. {step.title}. </span>
            <span className={dark ? "text-[#f6f4ef]/55" : "text-[#8d7349]"}>{step.when}. </span>
            {step.body}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {ORDER_STEPS.map((step) => (
        <li key={step.n} className={`border-t pt-4 ${rule}`}>
          <p className={`font-serif text-4xl italic ${dark ? "text-[#f6f4ef]" : "text-[#c0a477]"}`}>{step.n}</p>
          <p className={`mt-3 text-[11px] tracking-[0.16em] uppercase ${dark ? "text-[#f6f4ef]/55" : "text-[#8d7349]"}`}>{step.when}</p>
          <p className={`mt-1 text-[12px] tracking-[0.16em] uppercase ${dark ? "text-[#f6f4ef]" : "text-[#1c1a17]"}`}>{step.title}</p>
          <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
