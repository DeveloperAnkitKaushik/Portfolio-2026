import SectionHeading from "../ui/SectionHeading";
import MagneticGrid from "./MagneticGrid";
import { STACK } from "@/data/stack";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function Stack() {
  return (
    <section id="skills" className="py-32" aria-label="Tech stack">
      <div className="maincontainer">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={0}>
          <SectionHeading
            eyebrow="My Tech Stack"
            title={
              <>
                What I
                <br />
                Use
              </>
            }
            description="I utilize a comprehensive suite of modern technologies to build robust, scalable, and high-performance digital solutions."
          />
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={40} duration={0.8} delay={0.2}>
          <MagneticGrid className="mt-16 grid grid-cols-6 gap-y-10 sm:grid-cols-8 lg:grid-cols-13">
            {STACK.map(({ name, Icon }) => (
              <div key={name} className="grid place-items-center">
                {/*
                  The tooltip lives inside the magnetic element so it travels with
                  the icon as the cursor pulls it, instead of detaching.
                */}
                <span
                  data-magnetic
                  className="group relative block text-fg/85 transition-colors duration-200 hover:text-fg"
                  style={{ willChange: "transform" }}
                >
                  <Icon size={30} aria-label={name} role="img" />

                  <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-line bg-panel px-2 py-1 text-[0.68rem] leading-none text-fg opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {name}
                  </span>
                </span>
              </div>
            ))}
          </MagneticGrid>
        </AnimatedContent>
      </div>
    </section>
  );
}
