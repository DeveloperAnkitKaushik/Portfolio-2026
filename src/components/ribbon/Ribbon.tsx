import { PiSparkleFill } from "react-icons/pi";
import { RIBBON_WORDS } from "@/data/ribbon";

type BandProps = {
  /** 1 for the bright front strip, a low value for the dim echo behind it. */
  opacity: number;
  /** Tilt in degrees. The two bands use opposite signs so they cross. */
  rotate: number;
  /** "normal" scrolls right-to-left, "reverse" the other way. */
  direction?: "normal" | "reverse";
  duration: string;
};

/**
 * One looping strip of words. The word list is rendered twice back to back so
 * the marquee's `translateX(-50%)` lands exactly on the seam between the two
 * copies and the loop never shows a cut.
 *
 * The left/right fade lives on the strip itself (via `mask-image`), not on the
 * outer section — that's what makes it travel with the tilt instead of reading
 * as a straight vertical cut once the band is rotated. Each band carries its
 * own `rotate`, independent of its neighbour, so they can tilt opposite ways.
 */
function Band({ opacity, rotate, direction = "normal", duration }: BandProps) {
  const loop = [...RIBBON_WORDS, ...RIBBON_WORDS];

  return (
    <div
      // Both bands are centred on the exact same line — no per-band vertical
      // offset. With opposite rotation and no offset, two lines through the
      // same centre point only ever meet at that centre, so the cross always
      // lands in the middle of the section regardless of viewport width.
      // Different offsets were what pushed the crossing point off to one side.
      className="absolute inset-x-0 top-1/2 flex h-14 -translate-y-1/2 items-center overflow-hidden sm:h-16"
      style={{
        rotate: `${rotate}deg`,
        opacity,
        maskImage: "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
        // Built from --fg/--bg rather than a fixed hex, so the ribbon flips
        // white-on-black / black-on-white with the theme on its own — no
        // useTheme or "use client" needed, the CSS variables just repoint when
        // `.light` toggles on <html>. The mix toward --bg at each edge is what
        // gives it a vertical sheen instead of reading as a flat fill.
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--fg) 90%, var(--bg) 10%) 0%, var(--fg) 45%, color-mix(in srgb, var(--fg) 72%, var(--bg) 28%) 100%)",
      }}
    >
      <div
        data-marquee={direction}
        className="flex shrink-0 items-center gap-6 whitespace-nowrap px-4 sm:gap-8"
        style={{ animationDuration: duration }}
      >
        {loop.map((word, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 sm:gap-8">
            {/* text-bg — the token opposite the ribbon's own --fg fill, so it
                stays legible in both themes without a second colour choice. */}
            <span className="font-display-mono text-sm font-bold uppercase tracking-wider text-bg sm:text-base">
              {word}
            </span>
            <PiSparkleFill className="shrink-0 text-bg/80" size={14} />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Diagonal marquee ribbon: a bright strip of words crossed by a dim echo of
 * the same strip tilted the opposite way, both fading to nothing at the
 * edges and scrolling in opposite directions.
 *
 * The section is taller than the strips need at rest because a rotated line's
 * ends swing well past its own centre — at 3° over a ~1800px-wide screen the
 * tips move roughly 50px off the middle before the strip's own height is even
 * added. Too little height here is exactly what clips the words at the far
 * left/right the moment the screen is wide.
 *
 * Purely decorative (the words repeat with no informational content), so the
 * whole section is hidden from assistive tech.
 */
export default function Ribbon() {
  return (
    <section aria-hidden className="relative isolate mt-10 h-56 overflow-hidden bg-bg sm:h-72 lg:h-80">
      <Band opacity={0.16} rotate={4} direction="reverse" duration="26s" />
      <Band opacity={1} rotate={-4} direction="normal" duration="26s" />
    </section>
  );
}
