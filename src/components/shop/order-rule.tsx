import { CAMPAIGN, campaignStatus, fmtDate, shipWindow } from "@/lib/business";

export const ORDER_STEPS = [
  {
    n: "1",
    when: "Now",
    title: "Choose",
    body: "Pick one founding colorway and a size. The reservation is placed today.",
  },
  {
    n: "2",
    when: `By ${fmtDate(CAMPAIGN.closes)}`,
    title: "Confirm",
    body: `That colorway is cut only if ${CAMPAIGN.threshold} pairs are reserved by ${fmtDate(CAMPAIGN.closes)}. Below that, every reservation for it is refunded in full.`,
  },
  {
    n: "3",
    when: shipWindow(),
    title: "Make",
    body: `A confirmed run is cut in Felgueiras and ships ${shipWindow()}.`,
  },
] as const;

export function orderWindowLine(now = new Date()) {
  const status = campaignStatus(now);
  if (status === "upcoming") {
    return `You may reserve now. The public window opens ${fmtDate(CAMPAIGN.opens)} and closes ${fmtDate(CAMPAIGN.closes)}.`;
  }
  if (status === "open") {
    return `Reservations close ${fmtDate(CAMPAIGN.closes)}.`;
  }
  return "The founding window has closed. The list is open for the next run.";
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
