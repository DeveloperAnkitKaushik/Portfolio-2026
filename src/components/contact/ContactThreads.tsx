"use client";

import { useTheme } from "../ThemeProvider";
import WebThreads from "../reactbits/WebThreads";

/**
 * Threads layer behind the contact bento. Dark theme only.
 *
 * Returning null rather than hiding with CSS means the WebGL context is never
 * created on the light theme — no canvas, no render loop, nothing to repaint
 * during the theme wipe.
 *
 * The shader works in normalised uv, so the fan's size is a fraction of this
 * box, not a pixel value — growing the box scales the threads with it rather
 * than giving them room. What decides whether they clip is
 *
 *   maxAmplitude = spread * 0.5 * (1 + (threadCount - 1) * taper)
 *
 * measured from the centre, against the 0.5 that's actually available. The
 * component defaults come to 0.54, which is why the outer threads were cut
 * off. At 0.12/0.8 below it's 0.30 — clear of the edges, and a narrower
 * ribbon. Height is fixed here so the band's on-screen thickness is set in one
 * place.
 */
export default function ContactThreads() {
  const { theme } = useTheme();

  if (theme !== "dark") return null;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[30rem] w-screen -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <WebThreads
        color1="#5227FF"
        color2="#FF9FFC"
        color3="#FFFFFF"
        speed={0.2}
        threadCount={6}
        frequency={5}
        spread={0.12}
        taper={0.8}
        position={0.5}
        fanMode="center"
        glow={0.02}
        falloff={0.6}
        thickness={1.1}
        brightness={0.9}
        opacity={1}
        mirror
        shimmer={false}
        grain
        grainIntensity={0.05}
        mouseInteraction
        mouseStrength={0.3}
      />
    </div>
  );
}
