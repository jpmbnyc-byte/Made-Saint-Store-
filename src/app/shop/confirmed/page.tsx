import { Suspense } from "react";
import type { Metadata } from "next";
import { ConfirmedClient } from "./client";

export const metadata: Metadata = { title: "Reservation confirmed" };

export default function Confirmed() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6f4ef]" />}>
      <ConfirmedClient />
    </Suspense>
  );
}
