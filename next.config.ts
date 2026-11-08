import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Apex → www is handled in the Vercel domain settings. Do not bounce the other way.
  ...(staticExport
    ? {}
    : {
        async redirects() {
          return [
            { source: "/shop/1213/sacred-light", destination: "/shop/ms-runner-1223-sacred-light", permanent: true },
            { source: "/shop/1213/:slug", destination: "/shop/ms-runner-1101-:slug", permanent: true },
          ];
        },
      }),
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
