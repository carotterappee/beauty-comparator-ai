"use client";

type Props = { size?: number; className?: string };

export default function MetalBadge({ size = 64, className }: Props) {
  return (
    <div
      aria-label="VelvetMind badge"
      className={className}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: "url(/velvetmind/vm-badge.svg)",
        maskImage: "url(/velvetmind/vm-badge.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        background: [
          "linear-gradient(135deg, #d8b39e 0%, #cfa088 25%, #b47e6a 55%, #e4cabc 85%, #b47e6a 100%)",
          "radial-gradient(120% 70% at 30% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)",
          "radial-gradient(120% 80% at 70% 70%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 60%)",
        ].join(","),
        filter:
          "drop-shadow(0 1px 0 rgba(255,255,255,0.35)) drop-shadow(0 6px 18px rgba(180,126,106,0.25))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.12)",
      }}
    />
  );
}
