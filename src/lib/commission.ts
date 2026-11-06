import { lineByRef } from "@/lib/line";
import { lookById } from "@/lib/looks";
import { EMPTY_FIT, OFFERINGS, fitReview, pieceById, type FitInput, type Pathway } from "@/lib/private-client";

export const COMMISSION_SCOPES = OFFERINGS.map((offer) => offer.id);

export type CommissionScope = (typeof COMMISSION_SCOPES)[number];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIT_KEYS = Object.keys(EMPTY_FIT) as (keyof FitInput)[];

export type CommissionDraft = {
  name: string;
  email: string;
  note: string;
  scope: CommissionScope;
  lookId: string;
  pieceIds: string[];
  lineRef: string;
  fit: FitInput;
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
  const scope = typeof body.scope === "string" ? body.scope : "";
  const lookId = typeof body.lookId === "string" ? body.lookId.trim().slice(0, 40) : "";
  const lineRef = typeof body.lineRef === "string" ? body.lineRef.trim().slice(0, 12) : "";
  const pieceIds = Array.isArray(body.pieceIds) ? body.pieceIds.filter((id): id is string => typeof id === "string").slice(0, 12) : [];

  if (!name) return { ok: false, error: "Enter your name." };
  if (!EMAIL.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (!COMMISSION_SCOPES.includes(scope as CommissionScope)) return { ok: false, error: "Choose what you are commissioning." };
  if (lookId && !lookById(lookId)) return { ok: false, error: "That look is not in the house." };
  if (lineRef && !lineByRef(lineRef)) return { ok: false, error: "That style is not on the line." };
  for (const id of pieceIds) {
    if (!pieceById(id)) return { ok: false, error: "That piece is not in the register." };
  }
  if (pieceIds.length === 0 && !lineRef && !note) return { ok: false, error: "Name what you want made, or add a note." };

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

  return { ok: true, value: { name, email, note, scope: scope as CommissionScope, lookId, pieceIds, lineRef, fit } };
}

export function reviewCommission(fit: FitInput): CommissionReview {
  const review = fitReview(fit);
  if (!review.measured) return { pathway: "not-given", flags: [] };
  return { pathway: review.pathway, flags: review.flags };
}
