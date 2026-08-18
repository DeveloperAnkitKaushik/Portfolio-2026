"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Lets other components drive the same scroll instance (e.g. scroll-to-top). */
export const getLenis = () => lenisInstance;

/**
 * Lenis-based smooth scrolling. Lenis hijacks the wheel and animates
 * `window.scrollTo` itself, so native scroll position stays authoritative and
 * anything reading `scrollY` (progress bar, pinned sections) keeps working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch alone — native momentum scrolling feels better on mobile.
      syncTouch: false,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Re-measure once layout has settled. Sections sized in vh, images, and
    // fonts can all land after init, and a stale limit silently caps how far
    // the wheel can travel even though the native scrollbar still goes further.
    const remeasure = requestAnimationFrame(() => lenis.resize());
    const onLoad = () => lenis.resize();
    if (document.readyState !== "complete") {
      window.addEventListener("load", onLoad);
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(remeasure);
      window.removeEventListener("load", onLoad);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
