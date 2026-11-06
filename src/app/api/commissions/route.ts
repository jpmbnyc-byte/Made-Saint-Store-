import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin";
import { parseCommission, reviewCommission } from "@/lib/commission";
import { createCommission, listCommissions } from "@/lib/commissions";
import { lineByRef } from "@/lib/line";
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
  const line = draft.lineRef ? lineByRef(draft.lineRef) : undefined;
  const pieces = draft.pieceIds.map((id) => pieceById(id)!);
  const review = reviewCommission(draft.fit);
  const record = await createCommission({
    ...draft,
    ...review,
    lookName: look?.name ?? "",
    pieceNames: pieces.map((piece) => piece.name),
    lineName: line ? `${line.ref} ${line.name}` : "",
  });
  return NextResponse.json({ ok: true, id: record.id });
}
