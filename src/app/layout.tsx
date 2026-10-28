import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { PRODUCTION_ORIGIN } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || PRODUCTION_ORIGIN),
  title: {
    default: "MADE SAiNT",
    template: "%s · MADE SAiNT",
  },
  description:
    "Founding Edition runners, made to order in Felgueiras, Portugal. The Private Wardrobe and the MS-TM01 Trail Mule.",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
