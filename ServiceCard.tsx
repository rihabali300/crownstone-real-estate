import { ArrowRight } from "lucide-react";
import { ActionLink } from "./ActionButton";

export function ServiceCard({
  index,
  title,
  copy,
  cta,
  image,
}: {
  index: string;
  title: string;
  copy: string;
  cta: string;
  image: string;
}) {
  return (
    <article className="group grid overflow-hidden border border-border bg-card transition-colors duration-500 ease-lux hover:border-gold/40 md:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[280px]">
        <img
          src={image}
          alt={`${title} — architectural reference imagery`}
          loading="lazy"
          width={1440}
          height={960}
          className="size-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-background/35" />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="eyebrow">Service {index}</p>
        <h3 className="mt-4 font-display text-2xl sm:text-3xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy}</p>
        <ActionLink
          to="/contact"
          variant="outline"
          size="sm"
          className="mt-7 self-start"
        >
          {cta} <ArrowRight size={13} aria-hidden="true" />
        </ActionLink>
      </div>
    </article>
  );
}
