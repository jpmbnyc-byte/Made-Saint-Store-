import { SERIES_PLATE, type SeriesId } from "@/lib/business";

export function SeriesPlate({ series, className = "h-14 w-auto max-w-full object-contain object-left sm:h-16" }: { series: SeriesId; className?: string }) {
  const plate = SERIES_PLATE[series];
  return <img src={plate.src} alt={plate.alt} className={className} />;
}
