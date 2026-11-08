/**
 * MADE SAINT Campaign 001 — Cast Register
 * Status: REFERENCE — portraits are reference images pending founder confirmation
 * of names, character assignments, and image-use permissions per MS Bible v1.1 §05.
 *
 * Do not assign names, infer identities, or publish character copy without founder approval.
 * Third-party brand items visible in reference images (Fendi cast-04, Prada cast-05)
 * are styling references only — not MADE SAINT products.
 */

export type CastStatus = "reference" | "confirmed";

export type CastEntry = {
  id: string;
  src: string;
  /** Descriptive alt for screen readers — no identity inference */
  alt: string;
  /**
   * Working character archetype from Bible §05.
   * Replace with approved character name after founder sign-off.
   */
  archetype: string;
  /** Mood keyword for art direction matching */
  mood: string;
  status: CastStatus;
  /** Name confirmed by founder; null until approved */
  confirmedName: string | null;
  /** Character label confirmed by founder; null until approved */
  confirmedCharacter: string | null;
  /** Hero product assignment; null until approved */
  heroProduct: string | null;
};

export const CAST: CastEntry[] = [
  {
    id: "cast-01",
    src: "/cast/cast-01.webp",
    alt: "Cast reference — elevated editorial portrait against soft pink",
    archetype: "The Angel",
    mood: "angelic / elevated / sacred",
    status: "reference",
    confirmedName: null,
    confirmedCharacter: null,
    heroProduct: null,
  },
  {
    id: "cast-02",
    src: "/cast/cast-02.jpg",
    alt: "Cast reference — high-contrast black and white studio portrait",
    archetype: "The Saint",
    mood: "minimal / controlled / powerful",
    status: "reference",
    confirmedName: null,
    confirmedCharacter: null,
    heroProduct: null,
  },
  {
    id: "cast-03",
    src: "/cast/cast-03.jpg",
    alt: "Cast reference — black and white studio portrait, structured styling",
    archetype: "The Witness",
    mood: "composed / dark romantic / structured",
    status: "reference",
    confirmedName: null,
    confirmedCharacter: null,
    heroProduct: null,
  },
  {
    id: "cast-04",
    src: "/cast/cast-04.jpg",
    alt: "Cast reference — street location portrait against brick wall",
    archetype: "The Sinner",
    mood: "raw / street / urban edge",
    status: "reference",
    confirmedName: null,
    confirmedCharacter: null,
    heroProduct: null,
  },
  {
    id: "cast-05",
    src: "/cast/cast-05.jpg",
    alt: "Cast reference — cinematic coastal portrait, amber light",
    archetype: "The Outsider",
    mood: "cinematic / coastal / searching",
    status: "reference",
    confirmedName: null,
    confirmedCharacter: null,
    heroProduct: null,
  },
  // Sixth cast member — slot reserved, image pending
  // {
  //   id: "cast-06",
  //   src: "/cast/cast-06.jpg",
  //   alt: "",
  //   archetype: "",
  //   mood: "",
  //   status: "reference",
  //   confirmedName: null,
  //   confirmedCharacter: null,
  //   heroProduct: null,
  // },
];

export const confirmedCast = () => CAST.filter((c) => c.status === "confirmed");
export const referenceCast = () => CAST.filter((c) => c.status === "reference");
