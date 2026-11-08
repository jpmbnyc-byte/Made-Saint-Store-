import Image from "next/image";

const SRC = {
  dark: "/brand/wordmark.png",
  light: "/brand/wordmark-light.png",
} as const;

export function Wordmark({
  tone = "dark",
  className = "h-7 w-auto sm:h-9",
  alt = "MADE Saint",
  priority = true,
}: {
  tone?: keyof typeof SRC;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt={alt}
      width={1864}
      height={462}
      priority={priority}
      className={className}
    />
  );
}
