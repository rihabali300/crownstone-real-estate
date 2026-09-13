import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const actionButtonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-lux disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-gold text-primary-foreground hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[0_16px_34px_-16px_oklch(0.757_0.128_87.5/55%)]",
        outline:
          "border border-foreground/60 text-foreground hover:-translate-y-0.5 hover:border-gold hover:text-gold",
        ghost: "text-muted-foreground hover:text-gold",
      },
      size: {
        md: "px-7 py-3.5",
        sm: "px-5 py-2.5",
        block: "w-full px-7 py-4",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type Variants = VariantProps<typeof actionButtonVariants>;

export function ActionButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return (
    <button
      {...props}
      className={cn(actionButtonVariants({ variant, size }), className)}
    />
  );
}

export function ActionLink({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<typeof Link> & Variants & { children: ReactNode }) {
  return (
    <Link
      {...props}
      className={cn(actionButtonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

export function ActionAnchor({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & Variants) {
  return (
    <a {...props} className={cn(actionButtonVariants({ variant, size }), className)} />
  );
}
