import type { Metadata } from "next";
import { LaunchDashboard } from "@/components/launch/dashboard";

export const metadata: Metadata = {
  title: "MADE SAiNT · Launch plan",
  description: "Pricing, pre-order economics, cash flow against MEES terms, and the go-to-market plan.",
  robots: { index: false, follow: false },
};

export default function LaunchPage() {
  return (
    <LaunchDashboard
      tally={{ pairs: {}, waitlist: {}, bySize: {} }}
      reservations={null}
      adminProtected
      payments="mock"
      now={new Date().toISOString()}
    />
  );
}
