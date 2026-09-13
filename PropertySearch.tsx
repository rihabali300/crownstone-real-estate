import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "./ActionButton";
import { locations } from "@/data/locations";
import { propertyTypes } from "@/data/properties";

const fieldClass =
  "min-h-11 w-full appearance-none border-b border-border bg-transparent pb-3 pt-1 text-sm text-foreground outline-none transition-colors duration-300 focus:border-gold";

const labelClass = "eyebrow-muted block";

export function PropertySearch() {
  const [purpose, setPurpose] = useState("Buy");
  const [type, setType] = useState("Apartment");
  const [location, setLocation] = useState("Dubai");
  const [budget, setBudget] = useState("Any Budget");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast(
          "Property search will be connected to the Crownstone property database.",
          { description: `${purpose} • ${type} • ${location} • ${budget}` },
        );
      }}
      className="glass-card p-7 sm:p-9"
      aria-label="Property search"
    >
      <div className="flex items-center gap-4">
        <h2 className="font-display text-2xl sm:text-3xl">Find Your Next Property</h2>
        <span className="hairline hidden flex-1 sm:block" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end lg:gap-8">
        <div>
          <label className={labelClass} htmlFor="search-purpose">
            Purpose
          </label>
          <select
            id="search-purpose"
            className={fieldClass}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option>Buy</option>
            <option>Rent</option>
            <option>Invest</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-type">
            Property Type
          </label>
          <select
            id="search-type"
            className={fieldClass}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-location">
            Location
          </label>
          <select
            id="search-location"
            className={fieldClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Dubai</option>
            {locations.map((l) => (
              <option key={l.slug}>{l.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-budget">
            Budget
          </label>
          <select
            id="search-budget"
            className={fieldClass}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>Any Budget</option>
            <option>[Budget range]</option>
            <option>[Budget range]</option>
            <option>[Budget range]</option>
          </select>
        </div>

        <ActionButton type="submit" className="lg:mb-1">
          <Search size={14} aria-hidden="true" /> Search Properties
        </ActionButton>
      </div>
    </form>
  );
}
