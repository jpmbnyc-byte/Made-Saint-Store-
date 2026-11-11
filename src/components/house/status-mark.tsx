import { IMAGE_STATUS_LABEL, IMAGE_STATUS_MARK, type ImageStatus } from "@/lib/image-status";

const TONE: Record<ImageStatus, string> = {
  physical: "bg-[#1c1a17] text-[#f5f0e8]",
  study: "bg-[#f5f0e8]/95 text-[#1c1a17] ring-1 ring-[#1c1a17]/25",
  proposed: "bg-[#c0a477] text-[#1c1a17]",
  pending: "bg-[#1c1a17]/70 text-[#f5f0e8]",
};

export function StatusMark({
  status,
  dark = false,
  full = false,
  className = "",
}: {
  status: ImageStatus;
  dark?: boolean;
  full?: boolean;
  className?: string;
}) {
  const label = full ? IMAGE_STATUS_LABEL[status] : IMAGE_STATUS_MARK[status];
  const tone = dark
    ? status === "proposed"
      ? "bg-[#c0a477] text-[#1c1a17]"
      : "bg-[#f5f0e8]/15 text-[#f5f0e8] ring-1 ring-[#f5f0e8]/25"
    : TONE[status];
  return (
    <span
      className={`inline-flex max-w-full items-center px-2 py-1 text-[10px] tracking-[0.14em] uppercase ${tone} ${className}`}
      title={IMAGE_STATUS_LABEL[status]}
    >
      {label}
    </span>
  );
}
