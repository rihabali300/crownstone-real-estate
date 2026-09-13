import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Location } from "@/data/locations";

export function LocationCard({ location }: { location: Location }) {
  return (
    <Link
      to="/locations/$slug"
      params={{ slug: location.slug }}
      className="group relative block aspect-[4/5] overflow-hidden border border-border"
      aria-label={`Explore properties in ${location.name}`}
    >
      <img
        src={location.image}
        alt={`${location.name}, Dubai`}
        loading="lazy"
        width={1200}
        height={1500}
        className="size-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-lux group-hover:-translate-y-2">
        <span className="block h-px w-10 origin-left scale-x-100 bg-gold transition-transform duration-500 ease-lux group-hover:scale-x-[2.6]" />
        <h3 className="mt-4 font-display text-2xl">{location.name}</h3>
        <p className="mt-2 text-xs text-muted-foreground">{location.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-foreground group-hover:text-gold">
          Explore Properties <ArrowRight size={13} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
