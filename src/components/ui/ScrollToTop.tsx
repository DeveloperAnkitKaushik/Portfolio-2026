"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { getLenis } from "../SmoothScroll";

/** Appears once the page is scrolled past a screen; returns to the top. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const lenis = getLenis();
    // Go through Lenis when it's running so the trip is eased, not jumped.
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={toTop}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      className={`cursor-target fixed bottom-6 right-6 z-[9400] grid h-11 w-11 place-items-center rounded-xl border border-line bg-card text-fg backdrop-blur transition-[opacity,transform] duration-300 hover:bg-fg/10 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FiArrowUp size={17} />
    </button>
  );
}
