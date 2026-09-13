import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="animate-rise mt-6 max-w-3xl text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="animate-rise mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
