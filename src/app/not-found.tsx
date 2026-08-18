"use client";

import { FiArrowLeft } from "react-icons/fi";
import FuzzyText from "@/components/reactbits/FuzzyText";
import Button from "@/components/ui/Button";
import { useTheme } from "@/components/ThemeProvider";

export default function NotFound() {
  const { theme } = useTheme();

  // FuzzyText paints straight onto a <canvas>, so its `color` has to be a
  // literal — a canvas fillStyle doesn't resolve CSS custom properties like
  // var(--fg). Same two hexes SiteChrome already hands the cursor, kept in
  // step with the --fg token values in globals.css.
  const fuzzColor = theme === "dark" ? "#fafafa" : "#111111";

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <FuzzyText
        baseIntensity={0.15}
        hoverIntensity={0.45}
        enableHover
        color={fuzzColor}
        fontSize="clamp(5rem, 20vw, 11rem)"
        fontWeight={900}
      >
        404
      </FuzzyText>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
        This page took a wrong turn somewhere — the route you&rsquo;re looking for doesn&rsquo;t exist.
      </p>

      <Button as="a" href="/" icon={<FiArrowLeft size={15} />} className="mt-8">
        Back to Home
      </Button>
    </main>
  );
}
