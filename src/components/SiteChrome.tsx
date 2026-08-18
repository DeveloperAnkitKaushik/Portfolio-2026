"use client";

import { useEffect, useState, type ReactNode } from "react";
import Preloader from "./Preloader";
import TargetCursor from "./reactbits/TargetCursor";
import TopBar from "./TopBar";
import SmoothScroll from "./SmoothScroll";
import AnchorScroll from "./AnchorScroll";
import ScrollProgress from "./ui/ScrollProgress";
import ScrollToTop from "./ui/ScrollToTop";
import { useTheme } from "./ThemeProvider";
import { INTRO_DONE_EVENT } from "./ui/IntroGate";

/**
 * Client-side shell that owns the intro sequence and the custom cursor.
 * Wraps the page so it can resolve into view as the preloader slides away —
 * the blur clearing is what makes the reveal read as one motion with the slide.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const { theme } = useTheme();

  // The cursor paints a flat colour with no blend mode, so it has to be told
  // which theme it is on — a fixed white one is invisible on the light theme.
  const cursorColor = theme === "dark" ? "#fafafa" : "#111111";

  // Scroll reveals hold until the intro is out of the way. Without this the
  // hero counts as "in view" behind the preloader and its stagger is spent
  // before the curtain lifts.
  useEffect(() => {
    if (!revealed) return;
    document.documentElement.dataset.intro = "done";
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, [revealed]);

  return (
    <>
      <Preloader onComplete={() => setRevealed(true)} />

      <div
        className="flex flex-1 flex-col transition-[opacity,filter] duration-[900ms] ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          // Once the reveal is done the filter is dropped entirely: any filter
          // value, blur(0px) included, makes this a containing block and would
          // break `position: fixed` for anything rendered inside it.
          filter: revealed ? "none" : "blur(12px)",
        }}
      >
        {children}
      </div>

      {/* Kept outside the blurred wrapper so the fixed header and the menu
          overlay position against the viewport. */}
      <div
        className="transition-opacity duration-700 ease-out"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <TopBar />
        <ScrollProgress />
        <ScrollToTop />
      </div>

      {revealed && <SmoothScroll />}
      <AnchorScroll />

      {revealed && (
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
          cursorColor={cursorColor}
          cursorColorOnTarget={cursorColor}
        />
      )}
    </>
  );
}
