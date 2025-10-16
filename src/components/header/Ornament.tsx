"use client";

type Props = {
  src: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function Ornament({
  src,
  width = 220,
  height = 28,
  className = "",
}: Props) {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none pointer-events-none ${className}`}
    />
  );
}
