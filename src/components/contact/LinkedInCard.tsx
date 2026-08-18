import { FaLinkedinIn } from "react-icons/fa6";
import {
  SiDocker,
  SiGit,
  SiGraphql,
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
import Card from "../ui/Card";
import LogoLoop from "../ui/LogoLoop";
import { CONTACT } from "@/data/contact";

const COLUMN_1 = [SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql];
const COLUMN_2 = [SiDocker, SiPython, SiNodedotjs, SiMongodb, SiRedis];
const COLUMN_3 = [SiPrisma, SiJavascript, SiGit, SiGraphql, SiHtml5];

export default function LinkedInCard({ className = "" }: { className?: string }) {
  return (
    <Card variant="glass" className={`relative flex flex-col justify-between gap-6 overflow-hidden p-5 ${className}`}>
      {/* 3-column vertical logo loop drifting behind the content */}
      <div
        className="pointer-events-none absolute inset-0 grid grid-cols-3 gap-2 px-2 py-1 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]"
        aria-hidden
      >
        <LogoLoop logos={COLUMN_1} direction="up" duration={22} iconSize={26} />
        <LogoLoop logos={COLUMN_2} direction="down" duration={26} iconSize={26} />
        <LogoLoop logos={COLUMN_3} direction="up" duration={24} iconSize={26} />
      </div>

      <div className="relative z-10">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-fg text-bg">
          <FaLinkedinIn size={24} />
        </span>
      </div>

      <div className="relative z-10">
        <a
          href={CONTACT.linkedin.url}
          target="_blank"
          rel="noreferrer"
          className="cursor-target block w-full truncate rounded-lg border border-line bg-bg/70 px-3 py-2 text-center text-[0.7rem] text-muted backdrop-blur transition-colors hover:text-fg hover:bg-bg/90"
        >
          {CONTACT.linkedin.label}
        </a>
      </div>
    </Card>
  );
}
