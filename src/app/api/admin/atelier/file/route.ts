import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { atelierRoot, readDb } from "@/lib/atelier/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || request.headers.get("x-admin-token");
  if (!isAdmin(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const jobId = url.searchParams.get("job") ?? "";
  const db = await readDb();
  const job = db.jobs.find((item) => item.id === jobId);
  if (!job?.output) return NextResponse.json({ error: "No file." }, { status: 404 });
  const file = path.join(atelierRoot(), "masters", job.id, job.output.masterFile);
  const bytes = await readFile(file);
  return new NextResponse(new Uint8Array(bytes), { headers: { "Content-Type": "image/png", "Cache-Control": "private, no-store" } });
}
