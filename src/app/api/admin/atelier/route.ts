import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin";
import { atelierCatalog, testPlanSelection } from "@/lib/atelier/catalog";
import { createBatch, planBatch, publishJob, requeue, reviewJob, setBatchStatus, summary, workNext, type PlanLine } from "@/lib/atelier/jobs";
import { CAMPAIGNS, MODELS, SLOTS, STUDIOS } from "@/lib/atelier/models";
import { providerConfigured } from "@/lib/atelier/provider";
import { IMAGE_MODEL, PROVIDER_LIMITS, VIEWS } from "@/lib/atelier/spec";
import { readDb } from "@/lib/atelier/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function tokenOf(request: Request, body?: { token?: string }) {
  return body?.token || request.headers.get("x-admin-token") || new URL(request.url).searchParams.get("token");
}

export async function GET(request: Request) {
  if (!isAdmin(tokenOf(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await readDb();
  const lines: PlanLine[] = testPlanSelection().map((line) => ({ ...line, views: VIEWS.map((view) => view.id) }));
  return NextResponse.json({
    catalog: atelierCatalog(),
    models: MODELS,
    studios: STUDIOS,
    campaigns: CAMPAIGNS,
    slots: SLOTS,
    views: VIEWS,
    limits: PROVIDER_LIMITS,
    model: IMAGE_MODEL,
    configured: providerConfigured(),
    testPlan: planBatch(lines),
    summary: await summary(),
    jobs: db.jobs,
    batches: db.batches,
    published: db.published,
  });
}

const bodySchema = z.object({
  token: z.string().optional(),
  action: z.enum(["plan", "create", "work", "pause", "cancel", "resume", "review", "requeue", "publish"]),
  lines: z
    .array(
      z.object({
        productId: z.string(),
        colorwayId: z.string(),
        modelId: z.string(),
        views: z.array(z.enum(["hero", "three-quarter", "reverse", "detail", "study"])),
      }),
    )
    .optional(),
  confirm: z.string().optional(),
  ceilingUsd: z.number().nullable().optional(),
  batchId: z.string().optional(),
  jobId: z.string().optional(),
  decision: z.enum(["approved", "rejected"]).optional(),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "The request did not match the atelier schema." }, { status: 400 });
  const body = parsed.data;
  if (!isAdmin(tokenOf(request, body))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    switch (body.action) {
      case "plan":
        return NextResponse.json(planBatch(body.lines ?? []));
      case "create":
        if (body.confirm !== "APPROVE BATCH") {
          return NextResponse.json({ error: "Type APPROVE BATCH before a paid batch can be queued." }, { status: 400 });
        }
        return NextResponse.json(await createBatch(body.lines ?? [], body.ceilingUsd ?? null));
      case "work":
        return NextResponse.json(await workNext());
      case "pause":
        await setBatchStatus(body.batchId ?? "", "paused");
        return NextResponse.json({ ok: true });
      case "cancel":
        await setBatchStatus(body.batchId ?? "", "cancelled");
        return NextResponse.json({ ok: true });
      case "resume":
        await setBatchStatus(body.batchId ?? "", "queued");
        return NextResponse.json({ ok: true });
      case "review":
        await reviewJob(body.jobId ?? "", body.decision ?? "rejected");
        return NextResponse.json({ ok: true });
      case "requeue":
        await requeue(body.jobId ?? "");
        return NextResponse.json({ ok: true });
      case "publish":
        return NextResponse.json(await publishJob(body.jobId ?? ""));
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
