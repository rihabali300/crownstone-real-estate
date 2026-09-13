import type { Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import { Reveal } from "./Reveal";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <p className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        No properties match these filters. Please adjust your search or contact
        Crownstone for upcoming listings.
      </p>
    );
  }


  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, i) => (
        <Reveal as="li" key={property.slug} delay={(i % 3) * 90}>
          <PropertyCard property={property} />
        </Reveal>
      ))}
    </ul>
  );
}
