import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.madesaint.store" }],
        destination: "https://madesaint.store/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
