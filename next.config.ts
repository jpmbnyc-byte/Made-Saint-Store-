import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Apex → www is handled in the Vercel domain settings. Do not bounce the other way.
  ...(staticExport
    ? {}
    : {
        async redirects() {
          return [
            { source: "/shop/1213/:slug", destination: "/shop/ms-runner-1213-:slug", permanent: true },
            { source: "/shop/ms-runner-1223-sacred-light", destination: "/shop/ms-runner-1213-sacred-light", permanent: true },
            { source: "/shop/ms-runner-1101-espresso", destination: "/shop/ms-runner-1213-espresso", permanent: true },
            { source: "/shop/ms-runner-1101-olive", destination: "/shop/ms-runner-1213-olive", permanent: true },
            { source: "/shop/ms-runner-1101-mineral-blue", destination: "/shop/ms-runner-1213-mineral-blue", permanent: true },
            { source: "/shop/ms-runner-1101-midnight", destination: "/shop/ms-runner-1213-midnight", permanent: true },
            { source: "/shop/ms-runner-1101-chestnut", destination: "/shop/ms-runner-1213-chestnut", permanent: true },
            { source: "/shop/ms-runner-1101-graphite", destination: "/shop/ms-runner-1213-graphite", permanent: true },
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
