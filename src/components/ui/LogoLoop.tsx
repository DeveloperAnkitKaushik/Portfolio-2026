import type { ComponentType, ReactNode } from "react";

/**
 * Icon components only — `ElementType` would also admit string tags like
 * "div", which can't take a `size` prop and defeat narrowing on `item.icon`.
 */
type IconComponent = ComponentType<{ size?: number }>;

export type LogoItem = IconComponent | { icon: IconComponent } | { node: ReactNode };

const isRecord = (item: LogoItem): item is { icon: IconComponent } | { node: ReactNode } =>
  typeof item === "object" && item !== null;

type LogoLoopProps = {
  logos: LogoItem[];
  direction?: "up" | "down";
  duration?: number;
  iconSize?: number;
  className?: string;
  itemClassName?: string;
};

/**
 * Vertical seamless marquee loop. Duplicates items so shifting by -50% creates
 * an infinite, invisible seam.
 */
export default function LogoLoop({
  logos,
  direction = "up",
  duration = 20,
  iconSize = 26,
  className = "",
  itemClassName = "text-fg/10",
}: LogoLoopProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className={`overflow-hidden select-none ${className}`}>
      <div
        data-loop-vertical={direction}
        className="flex flex-col gap-6"
        style={{ "--loop-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((item, idx) => {
          let content: ReactNode;
          if (!isRecord(item)) {
            const Icon = item;
            content = <Icon size={iconSize} />;
          } else if ("icon" in item) {
            const Icon = item.icon;
            content = <Icon size={iconSize} />;
          } else {
            content = item.node;
          }

          return (
            <div
              key={idx}
              className={`flex shrink-0 items-center justify-center ${itemClassName}`}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
