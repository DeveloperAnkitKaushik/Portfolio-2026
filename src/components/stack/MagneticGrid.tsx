"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

type MagneticGridProps = {
  children: ReactNode;
  /** Pixels from the cursor at which the pull reaches zero. */
  radius?: number;
  /** Peak displacement, in pixels, for an item right under the cursor. */
  strength?: number;
  /** Peak extra scale for an item right under the cursor. */
  scale?: number;
  className?: string;
};

/**
 * Proximity field: every child inside `radius` of the pointer slides toward it,
 * with the pull falling off to nothing at the edge of the field.
 *
 * This is deliberately not one of the "magnetic" libraries — those attach to a
 * single element and move it on its own hover. Here one pointer position has to
 * move every neighbour at once, so the whole grid is measured up front and each
 * item's offset is written straight to its style in a rAF loop. Nothing goes
 * through React state, so a pointer move never triggers a render.
 */
export default function MagneticGrid({
  children,
  radius = 130,
  strength = 22,
  scale = 0.35,
  className = "",
}: MagneticGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef(0);

  // Centres are cached because reading them per pointer move would force a
  // layout on every frame for every icon.
  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    itemsRef.current = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    centersRef.current = itemsRef.current.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    measure();

    const render = () => {
      frameRef.current = requestAnimationFrame(render);
      const items = itemsRef.current;
      const centers = centersRef.current;
      const pointer = pointerRef.current;

      for (let i = 0; i < items.length; i++) {
        let tx = 0;
        let ty = 0;
        let s = 1;

        if (pointer) {
          const dx = pointer.x - centers[i].x;
          const dy = pointer.y - centers[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.001) {
            // Linear falloff, eased so the centre of the field pulls hardest.
            const pull = (1 - dist / radius) ** 1.6;
            tx = (dx / dist) * pull * strength;
            ty = (dy / dist) * pull * strength;
            s = 1 + pull * scale;
          }
        }

        const el = items[i];
        // Ease toward the target so items drift rather than snap.
        const prev = (el as HTMLElement & { _mag?: { x: number; y: number; s: number } })._mag ?? {
          x: 0,
          y: 0,
          s: 1,
        };
        const next = {
          x: prev.x + (tx - prev.x) * 0.16,
          y: prev.y + (ty - prev.y) * 0.16,
          s: prev.s + (s - prev.s) * 0.16,
        };
        (el as HTMLElement & { _mag?: typeof next })._mag = next;
        el.style.transform = `translate3d(${next.x.toFixed(2)}px, ${next.y.toFixed(2)}px, 0) scale(${next.s.toFixed(3)})`;
      }
    };

    frameRef.current = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
    };
    const onPointerLeave = () => {
      pointerRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measure);
    // Positions shift as the section scrolls past, so re-measure on scroll.
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [measure, radius, strength, scale]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
