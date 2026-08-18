"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type PreloaderProps = {
  onComplete?: () => void;
  /** Greetings cycled through in the centre of the screen. */
  words?: string[];
};

const BASE_WORDS = [
  "Hello",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "こんにちは",
  "Ciao",
  "Привет",
];

const END_ICONS = ["Let's go 💀", "Just do it!! 😎", "Fired up 🔥", "Caffeinated ☕️", "Wats up! 👀"];

/** How long the opening and closing greetings sit before moving on. */
const FIRST_HOLD = 0.45;
const LAST_HOLD = 0.7;
/** Crossfade halves for the greetings in between — ~170ms per swap. */
const SWAP_OUT = 0.07;
const SWAP_IN = 0.07;
const SWAP_HOLD = 0.03;

export default function Preloader({ onComplete, words }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  
  const [activeWords] = useState(() => {
    if (words) return words;
    const randomIcon = END_ICONS[Math.floor(Math.random() * END_ICONS.length)];
    return [...BASE_WORDS, randomIcon];
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // First greeting fades up into the centre.
    tl.fromTo(
      wordRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );

    // The rest crossfade in place — no movement, just a fast swap.
    activeWords.slice(1).forEach((word, i) => {
      const isLast = i === activeWords.length - 2;
      tl.to(wordRef.current, {
        opacity: 0,
        duration: SWAP_OUT,
        ease: "none",
      }, i === 0 ? `+=${FIRST_HOLD}` : `+=${SWAP_HOLD}`);
      tl.set(wordRef.current, { textContent: word });
      tl.to(wordRef.current, {
        opacity: 1,
        duration: SWAP_IN,
        ease: "none",
      });
      if (isLast) tl.to({}, { duration: LAST_HOLD });
    });

    // The panel slides away with the last greeting still on it, uncovering the
    // page underneath. The reveal is handed off partway through so the page
    // fade overlaps the slide rather than following it.
    tl.to(root, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
      onStart: () => {
        // Scrolling has to be released *before* the page is revealed. Anything
        // that measures the document on reveal — smooth scroll especially —
        // would otherwise read a clamped height while the body is still locked.
        document.body.style.overflow = "";
        gsap.delayedCall(0.3, () => onComplete?.());
      },
    });

    // ?skipIntro=1 runs the same timeline at warp speed — useful while building
    // the rest of the site, and it keeps the markup identical for hydration.
    if (new URLSearchParams(window.location.search).has("skipIntro")) {
      tl.timeScale(120);
    }

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0a] text-white"
      style={{ willChange: "transform" }}
    >
      <span
        ref={wordRef}
        className="text-3xl font-medium tracking-tight sm:text-[2.75rem]"
        style={{ willChange: "opacity" }}
      >
        {activeWords[0]}
      </span>
    </div>
  );
}
