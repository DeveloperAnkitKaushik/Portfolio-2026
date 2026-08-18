import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small label above the title, preceded by a rule. */
  eyebrow?: string;
  title: ReactNode;
  /** Sits to the right of the title on wide screens. */
  description?: ReactNode;
  className?: string;
};

/**
 * Section header used across the page: a ruled eyebrow, a stacked heavy title,
 * and an optional description that moves alongside the title on wide screens.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between ${className}`}>
      <div className="flex flex-col gap-4">
        {eyebrow ? (
          <span className="font-display-mono flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted">
            <span className="h-px w-8 bg-muted" aria-hidden />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="max-w-md text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>

      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted lg:pt-10">{description}</p>
      ) : null}
    </div>
  );
}
