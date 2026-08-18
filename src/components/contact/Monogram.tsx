import { CONTACT } from "@/data/contact";

/**
 * Placeholder wordmark. The reference uses a custom-drawn "AB" glyph — swap
 * this for a real SVG path when you have one.
 */
export default function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      role="img"
      aria-label={`${CONTACT.initials} monogram`}
    >
      <text
        x="100"
        y="78"
        textAnchor="middle"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "88px",
          fontWeight: 800,
          letterSpacing: "-0.06em",
        }}
      >
        {CONTACT.initials}
      </text>
    </svg>
  );
}
