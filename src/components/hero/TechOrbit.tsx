"use client";

import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

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
    duration: 90,
    dir: "cw",
    icons: [
      { Icon: SiReact, angle: 0, size: 26 },
      { Icon: SiJavascript, angle: 95, size: 22 },
      { Icon: SiTypescript, angle: 170, size: 22 },
      { Icon: SiDocker, angle: 255, size: 30 },
    ],
  },
  {
    radius: 330,
    duration: 130,
    dir: "ccw",
    icons: [
      { Icon: SiPython, angle: 42, size: 40 },
      { Icon: SiPrisma, angle: 105, size: 44 },
      { Icon: SiGithub, angle: 152, size: 34 },
      { Icon: SiGit, angle: 205, size: 28 },
      { Icon: SiPostgresql, angle: 268, size: 38 },
      { Icon: SiTailwindcss, angle: 320, size: 26 },
    ],
  },
  {
    radius: 480,
    duration: 175,
    dir: "cw",
    icons: [
      // Simple Icons dropped the AWS mark for trademark reasons, so react-icons
      // has no SiAmazonwebservices — Redis stands in on that slot for now.
      { Icon: SiRedis, angle: 292, size: 36 },
      { Icon: SiMongodb, angle: 250, size: 44 },
      { Icon: SiNextdotjs, angle: 68, size: 34 },
      { Icon: SiHtml5, angle: 348, size: 32 },
      { Icon: SiNodedotjs, angle: 140, size: 30 },
      { Icon: SiExpress, angle: 22, size: 34 },
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
