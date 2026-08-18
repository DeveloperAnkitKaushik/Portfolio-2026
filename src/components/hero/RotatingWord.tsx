"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type RotatingWordProps = {
  words: string[];
  /** Seconds each word stays fully readable. */
  hold?: number;
  className?: string;
};

/**
 * Swaps between words with a blur-and-fade rather than a slide — the word
 * defocuses out and the next one resolves in on the spot.
 */
export default function RotatingWord({ words, hold = 2.6, className }: RotatingWordProps) {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wordRef.current;
    if (!el || words.length < 2) return;

    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((_, i) => {
      const next = words[(i + 1) % words.length];
      tl.to(el, {
        opacity: 0,
        filter: "blur(14px)",
        duration: 0.32,
        ease: "power2.in",
        delay: hold,
      });
      tl.set(el, { textContent: next });
      tl.to(el, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.36,
        ease: "power2.out",
      });
    });

    return () => {
      tl.kill();
    };
  }, [words, hold]);

  return (
    <span ref={wordRef} className={className} style={{ willChange: "filter, opacity" }}>
      {words[0]}
    </span>
  );
}
