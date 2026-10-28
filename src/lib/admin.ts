import "server-only";

/** With ADMIN_TOKEN set, reservation details need ?token=…; without it they are only shown in development. */
export function isAdmin(token: string | null | undefined) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return process.env.NODE_ENV !== "production";
  return token === expected;
}
