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
    "Explore MADE SAiNT footwear, clothing and accessories. Discover the 1101 runner and enquire about a private wardrobe.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MADE SAiNT",
    description: "Once sinner. Made Saint. Explore the 1101 and enquire about a private wardrobe.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MADE SAiNT" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
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
