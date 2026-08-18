"use client";

import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { JourneyEntry } from "@/data/journey";
import SpotlightCard from "../reactbits/SpotlightCard";

/**
 * Vertical timeline.
 *
 * Each entry's date and marker stick to the left while that entry's card
 * scrolls past, then release as the next entry takes over — the date is pinned
 * inside its own row, so it can never outlive the card it belongs to.
 *
 * The rail behind them is a dim track with a bright fill that grows downward as
 * you read through the list.
 */
export default function Timeline({ entries }: { entries: JourneyEntry[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let queued = false;
    let frame = 0;

    const update = () => {
      queued = false;
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;

      const { top, height } = list.getBoundingClientRect();
      // Measured against the point the dates pin to, so the fill's leading edge
      // sits with whichever entry is currently held on the left.
      const read = window.innerHeight * 0.28 - top;
      const progress = height > 0 ? Math.min(1, Math.max(0, read / height)) : 0;
      fill.style.transform = `scaleY(${progress})`;
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
  }, [entries]);

  return (
    <ol ref={listRef} className="relative mt-14 flex flex-col gap-24">
      {/* Rail: dim track with a bright fill drawn over it. */}
      <div className="absolute inset-y-0 left-0 w-0.5 bg-line" aria-hidden />
      <div
        ref={fillRef}
        className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-fg"
        style={{ willChange: "transform" }}
        aria-hidden
      />

      {entries.map((entry) => (
        <li
          key={entry.id}
          className="relative grid gap-5 pl-9 sm:grid-cols-[12rem_1fr] sm:gap-12 sm:pl-16"
        >
          {/*
            `self-start` keeps this box its natural height so it can travel
            inside the grid row; the row is as tall as the card, which is what
            bounds the stickiness to this entry.
          */}
          <div className="relative sm:sticky sm:top-28 sm:self-start">
            {/*
              Inside the sticky box (not the row) so the dot travels with its
              date; the negative inset walks it back out to the rail, matching
              the row's left padding.
            */}
            <span
              className="absolute -left-9 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-fg bg-bg sm:-left-16 sm:top-3"
              aria-hidden
            />
            <time className="block text-xl font-light leading-tight text-muted sm:text-3xl">
              {entry.period}
            </time>
          </div>

          <SpotlightCard className="rounded-xl border border-line bg-card p-6 backdrop-blur" spotlightColor="rgba(255, 255, 255, 0.04)">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{entry.title}</h3>

              {/* Only rendered when the entry actually carries a link, so an
                  entry with nothing to point at doesn't show a dead icon. */}
              {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${entry.title}`}
                  className="cursor-target mt-0.5 shrink-0 text-muted transition-colors hover:text-fg"
                >
                  <FiArrowUpRight size={18} />
                </a>
              ) : null}
            </div>

            <p className="mt-2 text-[0.8rem] text-muted">
              {entry.org} &bull; {entry.mode}
            </p>

            <ul className="mt-5 flex flex-col gap-3">
              {entry.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-[0.82rem] leading-relaxed text-muted">
                  <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            {/* Grouped courses: one card, one linkable row per course. */}
            {entry.courses?.length ? (
              <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
                {entry.courses.map((course) => (
                  <li key={course.name}>
                    {course.url ? (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-3 text-[0.82rem] text-muted transition-colors hover:text-fg"
                      >
                        <span>{course.name}</span>
                        <FiArrowUpRight
                          size={15}
                          className="cursor-target shrink-0 text-muted transition-colors group-hover:text-fg"
                        />
                      </a>
                    ) : (
                      <span className="flex items-center gap-3 text-[0.82rem] text-muted">
                        {course.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </SpotlightCard>
        </li>
      ))}
    </ol>
  );
}
