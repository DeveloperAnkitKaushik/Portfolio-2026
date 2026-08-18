import { FiDownload, FiMail } from "react-icons/fi";
import RotatingWord from "./RotatingWord";
import TechOrbit from "./TechOrbit";
import Button from "../ui/Button";
import IntroGate from "../ui/IntroGate";
import AnimatedContent from "../reactbits/AnimatedContent";
import { HERO, AvailabilityStatus } from "@/data/hero";

const statusConfig: Record<AvailabilityStatus, { color: string; text: string }> = {
  "available": { color: "bg-green-500", text: "Available for work" },
  "on-demand": { color: "bg-yellow-500", text: "Available on demand" },
  "not-available": { color: "bg-red-500", text: "Currently booked" },
};

/** Each line lands 0.2s after the one above it. */
const STEP = 0.2;

export default function Hero() {
  const currentStatus = statusConfig[HERO.status] || statusConfig["available"];

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-1 items-center justify-center overflow-hidden"
    >
      <TechOrbit />

      <div className="maincontainer relative z-10 flex flex-col items-center text-center">
        <IntroGate>
          <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={STEP * 0}>
            <span className="font-display-mono inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] backdrop-blur">
              <span className={`h-1.5 w-1.5 rounded-full ${currentStatus.color}`} />
              {currentStatus.text}
            </span>
          </AnimatedContent>

          <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={STEP * 1}>
            <h1 className="mt-7 text-xl font-normal tracking-tight sm:text-2xl md:text-[1.7rem]">
              {HERO.headline}
            </h1>
          </AnimatedContent>

          <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={STEP * 2}>
            <RotatingWord
              words={HERO.roles}
              className="mt-1 block font-display text-[3.25rem] font-black leading-[1.05] tracking-tight sm:text-7xl md:text-[5.5rem]"
            />
          </AnimatedContent>

          <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={STEP * 3}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-[0.95rem]">
              {HERO.description}
            </p>
          </AnimatedContent>

          <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={STEP * 4}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="#contact" icon={<FiMail size={15} />}>
                Let&rsquo;s Talk
              </Button>
              <Button as="a" href="/resume.pdf" variant="secondary" icon={<FiDownload size={15} />}>
                Resume
              </Button>
            </div>
          </AnimatedContent>
        </IntroGate>
      </div>
    </section>
  );
}
