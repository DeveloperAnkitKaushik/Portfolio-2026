"use client";

import { useEffect, useState, type ReactNode } from "react";

export const INTRO_DONE_EVENT = "portfolio-intro-done";

/**
 * Holds its children back until the preloader is out of the way.
 *
 * Scroll-triggered animations fire on whatever is in view at mount, and an
 * ancestor's opacity doesn't stop something from counting as visible — so
 * without this the hero's stagger plays out behind the preloader and is over
 * before the curtain lifts. Mounting late means the reveal starts on the frame
 * the page actually becomes visible.
 */
export default function IntroGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "done") {
      // Not a synchronous setState in the effect body — this defers a frame,
      // which also lets layout settle before ScrollTrigger measures.
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }

    const onDone = () => setReady(true);
    window.addEventListener(INTRO_DONE_EVENT, onDone, { once: true });
    return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
