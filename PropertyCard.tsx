import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Heart, Maximize, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Property } from "@/data/properties";
import { usePointerDepth } from "@/hooks/use-pointer-depth";

export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const depth = usePointerDepth<HTMLElement>(0.75);

  return (
    <article
      ref={depth.ref}
      onPointerMove={depth.onPointerMove}
      onPointerLeave={depth.onPointerLeave}
      className="property-depth-card group relative border border-border bg-card transition-all duration-500 ease-lux hover:border-gold/40"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSaved((v) => !v);
        }}
        aria-label={saved ? `Remove ${property.name} from saved` : `Save ${property.name}`}
        aria-pressed={saved}
        className="property-depth-favorite absolute right-3 top-3 z-10 grid min-h-11 min-w-11 place-items-center text-foreground/80 transition-colors duration-300 hover:text-gold"
      >
        <Heart size={17} className={saved ? "fill-gold text-gold" : ""} aria-hidden="true" />
      </button>

      <Link
        to="/properties/$slug"
        params={{ slug: property.slug }}
        className="block"
        aria-label={`View ${property.name} in ${property.location}`}
      >
        <div className="property-depth-media relative aspect-[3/2] overflow-hidden">
          <img
            src={property.images[0]}
            alt={`[Property Image] ${property.name}, ${property.location}`}
            loading="lazy"
            width={1440}
            height={960}
            className="property-depth-image size-full object-cover transition-transform duration-700 ease-lux"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <span className="absolute left-4 top-4 border border-gold/60 bg-background/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
            {property.featured ? "Featured" : property.status}
          </span>
        </div>

        <div className="p-6">
          <p className="eyebrow-muted">{property.type} • {property.status}</p>
          <h3 className="mt-3 font-display text-2xl leading-tight transition-colors duration-300 group-hover:text-gold">
            {property.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{property.location}</p>

          <p className="mt-5 text-lg tracking-wide text-gold">AED {property.price}</p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <BedDouble size={14} aria-hidden="true" /> {property.bedrooms} Beds
            </li>
            <li className="inline-flex items-center gap-2">
              <Bath size={14} aria-hidden="true" /> {property.bathrooms} Baths
            </li>
            <li className="inline-flex items-center gap-2">
              <Maximize size={14} aria-hidden="true" /> {property.area} sq.ft.
            </li>
          </ul>

          <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-all duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:text-gold">
            View Property
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
