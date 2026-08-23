"use client";

import type { IconType } from "react-icons";
import {
  SiAnthropic,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiGooglegemini,
  SiHuggingface,
  SiLangchain,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";

type OrbitIcon = {
  Icon: IconType;
  /** Degrees clockwise from the top of the ring. */
  angle: number;
  size: number;
};

type Ring = {
  radius: number;
  duration: number;
  dir: "cw" | "ccw";
  icons: OrbitIcon[];
};

const RINGS: Ring[] = [
  {
    radius: 190,
    duration: 80,
    dir: "cw",
    icons: [
      { Icon: SiPython, angle: 0, size: 30 },
      { Icon: SiReact, angle: 90, size: 28 },
      { Icon: TbBrandOpenai, angle: 180, size: 28 },
      { Icon: SiTypescript, angle: 270, size: 26 },
    ],
  },
  {
    radius: 330,
    duration: 120,
    dir: "ccw",
    icons: [
      { Icon: SiLangchain, angle: 30, size: 34 },
      { Icon: SiNextdotjs, angle: 90, size: 32 },
      { Icon: SiFastapi, angle: 150, size: 32 },
      { Icon: SiOllama, angle: 210, size: 34 },
      { Icon: SiTailwindcss, angle: 270, size: 28 },
      { Icon: SiDocker, angle: 330, size: 32 },
    ],
  },
  {
    radius: 480,
    duration: 160,
    dir: "cw",
    icons: [
      { Icon: SiGooglegemini, angle: 15, size: 34 },
      { Icon: SiPostgresql, angle: 60, size: 34 },
      { Icon: SiAnthropic, angle: 105, size: 34 },
      { Icon: SiNodedotjs, angle: 150, size: 32 },
      { Icon: SiHuggingface, angle: 195, size: 34 },
      { Icon: SiFirebase, angle: 240, size: 32 },
      { Icon: SiRedis, angle: 285, size: 34 },
      { Icon: SiVercel, angle: 330, size: 30 },
    ],
  },
];

/**
 * The concentric rings behind the hero. Each ring turns at its own speed and
 * direction; every icon counter-rotates by the same amount so it stays upright.
 */
export default function TechOrbit() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 grid place-items-center overflow-hidden"
      aria-hidden
    >
      <div className="scale-[0.52] sm:scale-[0.7] lg:scale-90 xl:scale-100">
        {RINGS.map((ring) => (
          <div
            key={ring.radius}
            data-dir={ring.dir}
            className="orbit-ring absolute left-1/2 top-1/2 rounded-full border border-line"
            style={
              {
                width: ring.radius * 2,
                height: ring.radius * 2,
                marginLeft: -ring.radius,
                marginTop: -ring.radius,
                "--orbit-duration": `${ring.duration}s`,
              } as React.CSSProperties
            }
          >
            {ring.icons.map(({ Icon, angle, size }, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${ring.radius}px) rotate(${-angle}deg) translate(-50%, -50%)`,
                }}
              >
                <span
                  data-dir={ring.dir}
                  className="orbit-counter block text-icon"
                  style={{ "--orbit-duration": `${ring.duration}s` } as React.CSSProperties}
                >
                  <Icon size={size} />
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
