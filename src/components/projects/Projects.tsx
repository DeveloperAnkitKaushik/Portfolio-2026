"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/data/projects";

/**
 * Scroll-driven project showcase.
 *
 * A tall spacer holds a sticky full-height viewport containing nothing but the
 * card, centred. Scroll position through the spacer picks the active project
 * and the cards crossfade in place. Scrolling back up reverses the mapping.
 */
export default function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let queued = false;
    let frame = 0;

    const update = () => {
      queued = false;
      const pin = pinRef.current;
      if (!pin) return;

      const { top, height } = pin.getBoundingClientRect();
      // Progress through the pinned range only, 0 → 1.
      const scrollable = height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : 0;

      const index = Math.min(
        PROJECTS.length - 1,
        Math.max(0, Math.round(progress * (PROJECTS.length - 1)))
      );
      setActive((prev) => (prev === index ? prev : index));
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
    <section id="projects" aria-label="Selected projects">
      {/* The cards carry h3s but the section had no heading of its own — the
          h2 keeps the document outline intact for crawlers without touching
          the pinned-scroll layout. */}
      <h2 className="sr-only">Selected projects by Ankit Kaushik</h2>
      {/* Tall spacer: its scroll range is what drives the active project. */}
      <div ref={pinRef} style={{ height: `${PROJECTS.length * 100}vh` }}>
        <div className="sticky top-0 grid h-dvh place-items-center overflow-hidden">
          {/* Every card occupies the same grid cell so only opacity changes. */}
          {PROJECTS.map((project, i) => (
            <div
              key={project.slug}
              className="maincontainer col-start-1 row-start-1 transition-opacity duration-500 ease-out"
              style={{ opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
              // Only the visible card should be reachable by tab or pointer.
              inert={i !== active ? true : undefined}
            >
              <ProjectCard
                project={project}
                index={i}
                total={PROJECTS.length}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
