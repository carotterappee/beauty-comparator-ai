import Image from "next/image";

export default function VMBadgeSVG({ size = 96, className = "" }) {
  return (
    <Image
      src="/velvetmind/vm-badge.svg"
      alt="Logo VelvetMind"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
