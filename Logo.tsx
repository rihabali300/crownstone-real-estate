import { Link } from "@tanstack/react-router";
import logo from "@/assets/crownstone-logo.png";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn("flex min-w-0 items-center gap-3", className)}
    >
      <img
        src={logo}
        alt={`${site.name} logo`}
        width={44}
        height={44}
        className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
      />
      {!compact && (
        <span className="min-w-0 leading-none">
          <span className="block truncate font-display text-base tracking-wide text-foreground sm:text-lg">
            Crownstone
          </span>
          <span className="mt-0.5 block text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground">
            Real Estate
          </span>
        </span>
      )}
    </Link>
  );
}
