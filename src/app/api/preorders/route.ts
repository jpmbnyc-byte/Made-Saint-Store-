import { NextResponse, type NextRequest } from "next/server";
import { CAMPAIGN, SIZES, campaignStatus, productById, shipWindow } from "@/lib/business";
import { createReservation, listReservations, tally, updateReservation } from "@/lib/preorders";
import { createCheckout, stripeEnabled } from "@/lib/stripe";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function origin(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest) {
  const rows = await listReservations();
  const body: Record<string, unknown> = { ...tally(rows), threshold: CAMPAIGN.threshold, status: campaignStatus(), payments: stripeEnabled() ? "stripe" : "mock" };
  if (isAdmin(req.nextUrl.searchParams.get("token"))) body.reservations = rows;
  return NextResponse.json(body);
}

export async function POST(req: NextRequest) {
  let input: { kind?: string; productId?: string; size?: string; email?: string; name?: string };
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Send the reservation as JSON." }, { status: 400 });
  }
  const product = productById(input.productId ?? "");
  const email = (input.email ?? "").trim().toLowerCase();
  const name = (input.name ?? "").trim().slice(0, 120) || undefined;
  if (!product) return NextResponse.json({ error: "That colorway does not exist." }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  if (input.kind === "waitlist" || !product.launch) {
    const r = await createReservation({ kind: "waitlist", productId: product.id, email, name, amountUsd: 0, status: "reserved" });
    return NextResponse.json({ ok: true, mode: "waitlist", id: r.id });
  }

  if (!SIZES.includes(input.size as (typeof SIZES)[number])) return NextResponse.json({ error: "Choose a size." }, { status: 400 });
  if (campaignStatus() === "closed") return NextResponse.json({ error: "The founding window has closed. Join the list for the next run." }, { status: 409 });

  const amountUsd = product.usd * CAMPAIGN.depositShare;

  if (!stripeEnabled()) {
    const r = await createReservation({ kind: "preorder", productId: product.id, size: input.size, email, name, amountUsd, status: "reserved" });
    return NextResponse.json({ ok: true, mode: "mock", id: r.id, redirect: `/shop/confirmed?r=${r.id}` });
  }

  const r = await createReservation({ kind: "preorder", productId: product.id, size: input.size, email, name, amountUsd, status: "pending" });
  try {
    const base = origin(req);
    const session = await createCheckout({
      reservationId: r.id,
      name: `MADE SAiNT ${product.name}, US ${input.size}`,
      description: `Founding pre-order. Made to order in Portugal, ships ${shipWindow()}. Fully refunded if the run does not reach ${CAMPAIGN.threshold} pairs.`,
      amountUsd,
      image: base + product.image,
      email,
      successUrl: `${base}/shop/confirmed?r=${r.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${base}/shop?cancelled=${product.id}`,
    });
    await updateReservation(r.id, { stripeSession: session.id });
    return NextResponse.json({ ok: true, mode: "stripe", id: r.id, redirect: session.url });
  } catch (e) {
    await updateReservation(r.id, { status: "cancelled" });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Checkout could not start." }, { status: 502 });
  }
}
