import { LEAD_TIME } from "@/lib/business";

export const QUESTIONS = [
  { q: "How long does a pair take?", a: `Made to order. Ready in ${LEAD_TIME}.` },
  { q: "Why made to order?", a: "A pair is started for you. The house does not keep a warehouse of unsold pairs, and it does not mark a pair down at the end of a season." },
  { q: "How do they fit?", a: "The 0929 is true to size for most. If you are between sizes, take the half size up. The leather lining relaxes slightly with wear. The 1101 has no measured fit yet. A fitting is not held in person. A remote fitting consultation can be added to a wardrobe request. Size exchanges are free within 30 days of delivery." },
  { q: "Can I cancel?", a: "A request can be withdrawn before the pair is started. A paid checkout follows the terms shown there." },
  { q: "Will there be a sale?", a: "No. The price is the same for everyone, on the first day and the last." },
  { q: "Can I request the leather runners or the 2027 line?", a: "The priced runners on the shop are available now. Leather studies can be requested, made to order, and a price is not listed. The 2027 line can be requested with a wardrobe. Those proposed prices are not a checkout." },
  { q: "What do the runner numbers mean?", a: "1101 leads the range at $550. 1213 is the sculpted-sole runner, also $550, in seven colorways: Espresso, Olive, Mineral Blue, Midnight, Chestnut, Sacred Light, and Graphite. A sample, the tooling, and a measured fit are still pending, and Sacred Light’s materials are not confirmed. 0929 is the studded-sole runner, $490." },
  { q: "Caring for suede and woven leather", a: "Brush with a soft crepe or nylon brush after wear. Treat once with a suede protector before the first wear. Store in the dust bag, away from direct sun." },
] as const;
