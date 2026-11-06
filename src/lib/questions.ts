import { CAMPAIGN, fmtDate } from "@/lib/business";

export const QUESTIONS = [
  { q: "What happens if a colorway does not reach its run?", a: `Every reservation for that colorway is refunded in full, to the original card, within five business days of ${fmtDate(CAMPAIGN.closes)}. Or you may move it to another colorway.` },
  { q: "Why reserve before the pair is cut?", a: "Made-to-order means no overproduction, no end-of-season markdowns and no warehouse of unsold pairs. You get a pair made for you; we make only what is wanted." },
  { q: "How do they fit?", a: "True to size for most. If you are between sizes, take the half size up. The leather lining relaxes slightly with wear. Size exchanges are free within 30 days of delivery." },
  { q: "Can I cancel?", a: `Yes, for a full refund at any time before ${fmtDate(CAMPAIGN.closes)}, when the order goes to the workshop.` },
  { q: "Will there be a sale?", a: "No. The price is the same for everyone, on the first day and the last." },
  { q: "Can I reserve the leather runners or the 2027 line?", a: "No. The leather runners are shown. The 2027 line is a list of proposed styles and proposed prices. Neither is a checkout." },
  { q: "Caring for suede and woven leather", a: "Brush with a soft crepe or nylon brush after wear. Treat once with a suede protector before the first wear. Store in the dust bag, away from direct sun." },
] as const;
