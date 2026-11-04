import Image from "next/image";

const SRC = {
  dark: "/brand/wordmark.png",
  light: "/brand/wordmark-light.png",
} as const;

export function Wordmark({
  tone = "dark",
  className = "h-7 w-auto sm:h-9",
}: {
  tone?: keyof typeof SRC;
  className?: string;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt="MADE Saint"
      width={1864}
      height={462}
      priority
      className={className}
    />
  );
}
