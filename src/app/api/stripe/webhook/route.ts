import { NextResponse, type NextRequest } from "next/server";
import { markPaid, updateReservation } from "@/lib/preorders";
import { verifyWebhook } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type Event = { type: string; data: { object: { id: string; payment_status?: string; metadata?: { reservation?: string } } } };

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not set." }, { status: 501 });
  const payload = await req.text();
  if (!verifyWebhook(payload, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "Bad signature." }, { status: 400 });
  }
  const event = JSON.parse(payload) as Event;
  const obj = event.data.object;
  const id = obj.metadata?.reservation;
  if (id) {
    if (event.type === "checkout.session.completed" && obj.payment_status === "paid") await markPaid(id, obj.id);
    if (event.type === "checkout.session.expired") await updateReservation(id, { status: "cancelled" });
  }
  return NextResponse.json({ received: true });
}
