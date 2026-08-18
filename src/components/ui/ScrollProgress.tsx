"use client";

import { useEffect, useRef } from "react";

/**
 * Page-scroll progress bar pinned to the top of the viewport. Writes the
 * transform directly from a rAF loop rather than through state, so scrolling
 * never triggers a React render.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const bar = barRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9600] h-[3px] bg-transparent" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-fg"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
