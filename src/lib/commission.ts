import { lineByRef } from "@/lib/line";
import { lookBySlug } from "@/lib/line-shop";
import { lookById } from "@/lib/looks";
import { EMPTY_FIT, OFFERINGS, fitReview, pieceById, type FitInput, type Pathway } from "@/lib/private-client";

export const COMMISSION_SCOPES = OFFERINGS.map((offer) => offer.id);

export type CommissionScope = (typeof COMMISSION_SCOPES)[number];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIT_KEYS = Object.keys(EMPTY_FIT) as (keyof FitInput)[];

/** Optional. “Myself” / “Someone else” map onto the stored role values. */
export const INTRODUCTION_ROLES = ["", "wearer", "stylist", "payer", "assistant"] as const;

function normalizeRole(role: string) {
  if (role === "athlete" || role === "myself") return "wearer";
  if (role === "someone-else" || role === "someone_else" || role === "representative" || role === "client") return "stylist";
  return role;
}
export const INTRODUCTION_TIMINGS = ["", "season", "year", "undecided"] as const;
export const INTRODUCTION_BUDGETS = ["", "undisclosed", "seasonal", "annual", "expanded", "quoted"] as const;

export type CommissionDraft = {
  name: string;
  email: string;
  note: string;
  /** Up to five upcoming dressing settings, in the client's words. */
  settings: string;
  /** Desired dates or windows for the clothes, if known. */
  desiredDates: string;
  scope: CommissionScope;
  lookId: string;
  /** Cast / collection look slug (e.g. sand-jersey), separate from wardrobe lookId. */
  collectionLook: string;
  pieceIds: string[];
  lineRef: string;
  lineColor: string;
  lineSize: string;
  lineImage: string;
  /** Customer-selected matching pieces carried from a look (e.g. a runner). */
  matchingPieces: string[];
  fit: FitInput;
  role: (typeof INTRODUCTION_ROLES)[number];
  timing: (typeof INTRODUCTION_TIMINGS)[number];
  budget: (typeof INTRODUCTION_BUDGETS)[number];
  /** Optional add-on. No price. The fitting is remote, and it is not booked as an appointment. */
  remoteFitting: boolean;
  /** Consent to discuss photography and public association only with the house. */
  privacyConsent: boolean;
};

export type CommissionReview = {
  pathway: Pathway | "not-given";
  flags: string[];
};

/** A commission is a request. It does not price a body and it does not reserve a pair. */
export function parseCommission(raw: unknown): { ok: true; value: CommissionDraft } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Send the commission as JSON." };
  const body = raw as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 600) : "";
  const settings = typeof body.settings === "string" ? body.settings.trim().slice(0, 600) : "";
  const desiredDates = typeof body.desiredDates === "string" ? body.desiredDates.trim().slice(0, 200) : "";
  const scope = typeof body.scope === "string" && body.scope ? body.scope : "look";
  const role = normalizeRole(typeof body.role === "string" ? body.role : "");
  const timing = typeof body.timing === "string" ? body.timing : "";
  const budget = typeof body.budget === "string" ? body.budget : "";
  const remoteFitting = body.remoteFitting === true;
  const privacyConsent = body.privacyConsent === true;
  const lookId = typeof body.lookId === "string" ? body.lookId.trim().slice(0, 40) : "";
  const collectionLook = typeof body.collectionLook === "string" ? body.collectionLook.trim().slice(0, 40) : "";
  const lineRef = typeof body.lineRef === "string" ? body.lineRef.trim().slice(0, 12) : "";
  const lineColor = typeof body.lineColor === "string" ? body.lineColor.trim().slice(0, 80) : "";
  const lineSize = typeof body.lineSize === "string" ? body.lineSize.trim().slice(0, 24) : "";
  const lineImage = typeof body.lineImage === "string" ? body.lineImage.trim().slice(0, 160) : "";
  const pieceIds = Array.isArray(body.pieceIds) ? body.pieceIds.filter((id): id is string => typeof id === "string").slice(0, 12) : [];
  const matchingPieces = Array.isArray(body.matchingPieces)
    ? body.matchingPieces.filter((item): item is string => typeof item === "string").map((item) => item.trim().slice(0, 120)).filter(Boolean).slice(0, 8)
    : [];

  if (!name) return { ok: false, error: "Enter your name." };
  if (!EMAIL.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (!COMMISSION_SCOPES.includes(scope as CommissionScope)) return { ok: false, error: "Choose what you are commissioning." };
  if (!INTRODUCTION_ROLES.includes(role as (typeof INTRODUCTION_ROLES)[number])) {
    return { ok: false, error: "Choose who you are ordering for." };
  }
  if (!INTRODUCTION_TIMINGS.includes(timing as (typeof INTRODUCTION_TIMINGS)[number])) return { ok: false, error: "That timing is not recognised." };
  if (!INTRODUCTION_BUDGETS.includes(budget as (typeof INTRODUCTION_BUDGETS)[number])) return { ok: false, error: "That budget range is not one the house uses." };
  if (lookId && !lookById(lookId)) return { ok: false, error: "That look is not in the house." };
  if (collectionLook && !lookBySlug(collectionLook)) return { ok: false, error: "That collection look is not published." };
  if (lineRef && !lineByRef(lineRef)) return { ok: false, error: "That style is not on the line." };
  if (lineImage && !lineImage.startsWith("/")) return { ok: false, error: "That reference image is not valid." };
  for (const id of pieceIds) {
    if (!pieceById(id)) return { ok: false, error: "That piece is not available." };
  }
  if (pieceIds.length === 0 && !lineRef && !collectionLook && !note && !settings) {
    return { ok: false, error: "Name what you want made, the days you dress for, or add a note." };
  }

  const fit = { ...EMPTY_FIT };
  const given = body.fit && typeof body.fit === "object" ? (body.fit as Record<string, unknown>) : {};
  const choices: Partial<Record<keyof FitInput, readonly string[]>> = {
    width: ["", "standard", "wide", "extra-wide"],
    shoulderStyle: ["", "relaxed", "structured"],
    ease: ["", "close", "standard", "generous"],
  };
  for (const key of FIT_KEYS) {
    const value = given[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim().slice(0, 16);
    const allowed = choices[key];
    if (allowed && !allowed.includes(trimmed)) continue;
    fit[key] = trimmed as never;
  }

  return {
    ok: true,
    value: {
      name,
      email,
      note,
      settings,
      desiredDates,
      scope: scope as CommissionScope,
      lookId,
      collectionLook,
      pieceIds,
      lineRef,
      lineColor,
      lineSize,
      lineImage,
      matchingPieces,
      fit,
      role: role as CommissionDraft["role"],
      timing: timing as CommissionDraft["timing"],
      budget: budget as CommissionDraft["budget"],
      remoteFitting,
      privacyConsent,
    },
  };
}

export function reviewCommission(fit: FitInput): CommissionReview {
  const review = fitReview(fit);
  if (!review.measured) return { pathway: "not-given", flags: [] };
  return { pathway: review.pathway, flags: review.flags };
}
