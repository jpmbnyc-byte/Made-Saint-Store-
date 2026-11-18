import Link from "next/link";

/**
 * Upright house wordmark — never italicized.
 * MADE in roman serif; Saint in upright blackletter display.
 */
export function Wordmark({
  tone = "dark",
  className = "h-7 sm:h-9",
  alt = "MADE Saint",
  priority: _priority = true,
}: {
  tone?: "dark" | "light";
  className?: string;
  alt?: string;
  /** Kept for call-site compatibility with the former Image wordmark. */
  priority?: boolean;
}) {
  const color = tone === "light" ? "text-[#f6f4ef]" : "text-[#1c1a17]";
  return (
    <span className={`ms-wordmark inline-flex items-baseline gap-[0.18em] ${color} ${className}`} aria-label={alt}>
      <span className="ms-wordmark-made tracking-[0.04em]">MADE</span>
      <span className="ms-wordmark-saint tracking-[-0.02em]">Saint</span>
    </span>
  );
}

export function WordmarkLink({
  href = "/",
  tone = "dark",
  className,
}: {
  href?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link href={href} className={`inline-flex items-center ${className ?? ""}`} aria-label="MADE Saint — home">
      <Wordmark tone={tone} />
    </Link>
  );
}
