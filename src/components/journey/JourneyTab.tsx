"use client";

import BracketFrame from "../ui/BracketFrame";

/**
 * Journey switcher tab. The active one is crisp and framed by corner brackets;
 * the inactive ones are genuinely defocused rather than merely dimmed.
 */
export default function JourneyTab({
  label,
  isActive,
  onSelect,
  controls,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  controls: string;
}) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={controls}
      onClick={onSelect}
      className="font-display-mono cursor-target text-sm font-bold uppercase tracking-[0.22em] text-fg transition-[filter,opacity] duration-300"
      style={{
        filter: isActive ? "blur(0px)" : "blur(1px)",
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <BracketFrame visible={isActive} size="sm" className="px-4 py-2.5">
        {label}
      </BracketFrame>
    </button>
  );
}
