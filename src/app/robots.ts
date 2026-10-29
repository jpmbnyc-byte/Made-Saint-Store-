import type { MetadataRoute } from "next";
import { PRODUCTION_ORIGIN } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/launch", "/brand", "/package", "/wardrobe", "/api"],
    },
    host: PRODUCTION_ORIGIN,
  };
}
