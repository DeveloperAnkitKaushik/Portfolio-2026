"use client";

import { useEffect } from "react";
import { getLenis } from "./SmoothScroll";

/**
 * One delegated listener for every in-page `#hash` link — the hero buttons,
 * the sidebar menu, anything added later. Handling it here rather than per
 * link means nothing has to know whether Lenis is running: if it is, the jump
 * is animated through the same instance driving the wheel (letting the browser
 * do a native jump would fight Lenis and snap back); if it isn't — reduced
 * motion, or before the intro finishes — the native smooth scroll takes over.
 */
export default function AnchorScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab, download, middle click) behave natively.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.3 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Keep the URL in step so the section is linkable and the back button
      // works, without letting the hash assignment trigger its own jump.
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
