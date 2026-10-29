import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Apex → www is handled in the Vercel domain settings. Do not bounce the other way.
  ...(staticExport
    ? {
        output: "export" as const,
        distDir: ".next-export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
