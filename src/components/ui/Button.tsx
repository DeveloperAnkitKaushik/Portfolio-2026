import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:opacity-90",
  secondary: "border border-line bg-card text-fg backdrop-blur hover:bg-fg/10",
};

const SIZES: Record<Size, string> = {
  sm: "gap-2 px-4 py-2.5 text-[0.8rem]",
  md: "gap-2 px-6 py-3 text-sm",
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Shared action button. Renders as <button> by default, or as any element via
 * `as` — links use `as="a"` so demo/repo actions keep anchor semantics.
 */
export default function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;

  return (
    <Component
      className={`cursor-target inline-flex items-center justify-center rounded-lg font-medium no-underline transition-[background-color,opacity,color] duration-200 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </Component>
  );
}
