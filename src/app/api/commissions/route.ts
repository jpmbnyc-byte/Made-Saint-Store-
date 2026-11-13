import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin";
import { parseCommission, reviewCommission } from "@/lib/commission";
import { createCommission, listCommissions } from "@/lib/commissions";
import { lineByRef } from "@/lib/line";
import { customerName, lookBySlug } from "@/lib/line-shop";
import { lookById } from "@/lib/looks";
import { pieceById } from "@/lib/private-client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdmin(req.nextUrl.searchParams.get("token"))) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ commissions: await listCommissions() });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Send the commission as JSON." }, { status: 400 });
  }
  const parsed = parseCommission(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const draft = parsed.value;
  const look = draft.lookId ? lookById(draft.lookId) : undefined;
  const cast = draft.collectionLook ? lookBySlug(draft.collectionLook) : undefined;
  const line = draft.lineRef ? lineByRef(draft.lineRef) : undefined;
  const pieces = draft.pieceIds.map((id) => pieceById(id)!);
  const review = reviewCommission(draft.fit);
  const lineLabel = line
    ? [line.ref, customerName(line), draft.lineColor, draft.lineSize ? `size ${draft.lineSize}` : ""]
        .filter(Boolean)
        .join(" · ")
    : "";
  const record = await createCommission({
    ...draft,
    ...review,
    lookName: cast ? cast.title : look?.name ?? "",
    pieceNames: [
      ...pieces.map((piece) => piece.name),
      ...draft.matchingPieces,
    ],
    lineName: lineLabel,
  });
  return NextResponse.json({ ok: true, id: record.id });
}
