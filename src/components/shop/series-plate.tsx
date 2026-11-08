import { Wordmark } from "@/components/house/wordmark";
import type { SeriesId } from "@/lib/business";

const SCALE = {
  sm: { mark: "h-[18px]", num: "text-[26px]" },
  md: { mark: "h-6 sm:h-7", num: "text-[40px] sm:text-[48px]" },
  lg: { mark: "h-7 sm:h-8", num: "text-[52px] sm:text-[68px]" },
} as const;

/** Logo and series number, set the way a sneaker product title is set. */
export function SeriesPlate({
  series,
  size = "md",
  tone = "dark",
  className = "",
}: {
  series: SeriesId;
  size?: keyof typeof SCALE;
  tone?: "dark" | "light";
  className?: string;
}) {
  const scale = SCALE[size];
  const ink = tone === "light" ? "text-[#f5f0e8]" : "text-[#1c1a17]";
  return (
    <div className={`flex items-center gap-2.5 ${ink} ${className}`} role="img" aria-label={`MADE Saint ${series}`}>
      <Wordmark alt="" priority={false} tone={tone} className={`${scale.mark} w-auto`} />
      <span aria-hidden="true" className={`font-sans font-medium leading-[0.8] tracking-[-0.065em] ${scale.num}`}>
        {series}
      </span>
    </div>
  );
}
