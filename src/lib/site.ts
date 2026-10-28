/** Public origin for the shop. Override with SITE_URL locally or in Vercel env. */
export const PRODUCTION_ORIGIN = "https://madesaint.store";

export function siteOrigin(req?: { headers: { get: (name: string) => string | null } }) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_ORIGIN;
  if (req) {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    if (host) {
      const proto = req.headers.get("x-forwarded-proto") ?? (process.env.VERCEL ? "https" : "http");
      return `${proto}://${host}`;
    }
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return PRODUCTION_ORIGIN;
}
