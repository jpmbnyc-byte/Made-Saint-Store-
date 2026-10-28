import type { Metadata } from "next";
import { listReservations, tally } from "@/lib/preorders";
import { stripeEnabled } from "@/lib/stripe";
import { isAdmin } from "@/lib/admin";
import { LaunchDashboard } from "@/components/launch/dashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "MADE SAiNT · Launch plan",
  description: "Pricing, pre-order economics, cash flow against MEES terms, and the go-to-market plan.",
};

export default async function LaunchPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const rows = await listReservations();
  const admin = isAdmin(token);
  return (
    <LaunchDashboard
      tally={tally(rows)}
      reservations={admin ? rows : null}
      adminProtected={Boolean(process.env.ADMIN_TOKEN)}
      payments={stripeEnabled() ? "stripe" : "mock"}
      now={new Date().toISOString()}
    />
  );
}
