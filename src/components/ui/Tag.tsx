import type { ReactNode } from "react";

/** Small bordered chip used for tech stacks and metadata. */
export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-card px-2 py-1 text-[0.68rem] leading-none text-muted">
      {children}
    </span>
  );
}
