import type { ReactNode } from "react";
import SpotlightCard from "../reactbits/SpotlightCard";

type Variant = "solid" | "glass";

const VARIANTS: Record<Variant, string> = {
  solid: "border-line bg-card",
  // Translucent so the threads behind stay readable through the tile, with a
  // blur to keep the text on top legible over them.
  glass: "border-fg/10 bg-fg/[0.04] backdrop-blur-xl backdrop-saturate-150",
};

/** Shared surface for the contact bento tiles. */
export default function Card({
  children,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={`rounded-2xl border ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </SpotlightCard>
  );
}
