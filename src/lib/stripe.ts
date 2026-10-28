import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/** Stripe over its REST API, so the app has no SDK dependency. Without a key the shop records reservations unpaid. */
export const stripeEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);

function form(obj: Record<string, string | number>) {
  return new URLSearchParams(Object.entries(obj).map(([k, v]) => [k, String(v)])).toString();
}

async function call<T>(method: "GET" | "POST", pathname: string, body?: Record<string, string | number>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body ? form(body) : undefined,
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? `Stripe returned ${res.status}`);
  return json as T;
}

export type CheckoutSession = { id: string; url: string; payment_status: string; metadata?: Record<string, string> };

export function createCheckout(o: {
  reservationId: string;
  name: string;
  description: string;
  amountUsd: number;
  image: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return call<CheckoutSession>("POST", "checkout/sessions", {
    mode: "payment",
    "line_items[0][quantity]": 1,
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": Math.round(o.amountUsd * 100),
    "line_items[0][price_data][product_data][name]": o.name,
    "line_items[0][price_data][product_data][description]": o.description,
    "line_items[0][price_data][product_data][images][0]": o.image,
    customer_email: o.email,
    "shipping_address_collection[allowed_countries][0]": "US",
    client_reference_id: o.reservationId,
    "metadata[reservation]": o.reservationId,
    "payment_intent_data[metadata][reservation]": o.reservationId,
    success_url: o.successUrl,
    cancel_url: o.cancelUrl,
  });
}

export const getCheckout = (id: string) => call<CheckoutSession>("GET", `checkout/sessions/${encodeURIComponent(id)}`);

/** Verifies the Stripe-Signature header (t=…,v1=…) with a five-minute tolerance. */
export function verifyWebhook(payload: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${t}.${payload}`).digest();
  return header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .some((p) => {
      const got = Buffer.from(p.slice(3), "hex");
      return got.length === expected.length && timingSafeEqual(got, expected);
    });
}
