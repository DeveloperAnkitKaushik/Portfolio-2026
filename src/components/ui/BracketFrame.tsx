import type { ReactNode } from "react";

/**
 * Four corner brackets drawn around content — the recurring framing motif used
 * on the active journey tab, the contact heading, and the monogram.
 */
export default function BracketFrame({
  children,
  visible = true,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  visible?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const arm = size === "sm" ? "h-2.5 w-2.5" : "h-4 w-4";

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className={`absolute left-0 top-0 border-l-2 border-t-2 border-fg ${arm}`} />
        <span className={`absolute right-0 top-0 border-r-2 border-t-2 border-fg ${arm}`} />
        <span className={`absolute bottom-0 right-0 border-b-2 border-r-2 border-fg ${arm}`} />
        <span className={`absolute bottom-0 left-0 border-b-2 border-l-2 border-fg ${arm}`} />
      </span>
      {children}
    </span>
  );
}
