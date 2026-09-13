import apartment from "@/assets/property-apartment.jpg";
import villa from "@/assets/property-villa.jpg";
import penthouse from "@/assets/property-penthouse.jpg";
import interior from "@/assets/interior-detail.jpg";
import architecture from "@/assets/architecture-detail.jpg";
import type { Database } from "@/integrations/supabase/types";

export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];

export type PropertyType =
  | "Apartment"
  | "Villa"
  | "Townhouse"
  | "Penthouse"
  | "Commercial"
  | "Land";

/** Display model consumed by the existing property card / detail templates. */
export type Property = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: string;
  currency: string;
  location: string;
  type: string;
  purpose: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  developer: string;
  description: string;
  amenities: string[];
  status: string;
  availability: string;
  featured: boolean;
  published: boolean;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  mapLocation: string;
  video: string;
  brochure: string;
  dateAdded: string;
  investmentNotes: string;
};

export const propertyTypes: PropertyType[] = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Commercial",
  "Land",
];

export const purposeOptions = ["For Sale", "For Rent", "For Investment"] as const;

export const availabilityOptions = ["Available", "Sold", "Off-plan"] as const;

export const propertyStatuses = [
  "For Sale",
  "For Rent",
  "For Investment",
  "Reserved",
  "Sold",
  "Rented",
  "Coming Soon",
  "Off-plan",
];

export const bedroomOptions = ["1", "2", "3", "4", "5", "6"];

export const currencyOptions = ["AED", "USD", "GBP", "EUR", "SAR"];

/** Design placeholders used only when a listing has no uploaded images yet. */
export const placeholderImages = [apartment, interior, architecture, villa, penthouse];

export function fallbackImages(seed: string) {
  const offset = seed.length % placeholderImages.length;
  return [
    placeholderImages[offset]!,
    placeholderImages[(offset + 1) % placeholderImages.length]!,
    placeholderImages[(offset + 2) % placeholderImages.length]!,
  ];
}

export function formatPrice(price: number | null) {
  if (price === null || Number.isNaN(price)) return "[Price]";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price);
}

/** Derived badge: purpose while the listing is available, otherwise its state. */
export function derivedStatus(row: Pick<PropertyRow, "purpose" | "availability">) {
  return row.availability === "Available" ? row.purpose : row.availability;
}

export function toProperty(
  row: PropertyRow,
  imageUrls: string[],
  resolvedVideo?: string,
): Property {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    images: imageUrls.length > 0 ? imageUrls : fallbackImages(row.slug),
    price: formatPrice(row.price),
    currency: row.currency,
    location: row.location,
    type: row.property_type,
    purpose: row.purpose,
    bedrooms: row.bedrooms || "—",
    bathrooms: row.bathrooms || "—",
    area: row.area || "—",
    developer: row.developer || "—",
    description: row.description,
    amenities: row.amenities,
    status: derivedStatus(row),
    availability: row.availability,
    featured: row.featured,
    published: row.published,
    agentName: row.agent_name || "—",
    agentPhone: row.agent_phone || "—",
    agentEmail: row.agent_email || "—",
    mapLocation: row.map_location || "—",
    video: (resolvedVideo !== undefined ? resolvedVideo : row.video_url) || "—",
    brochure: row.brochure_url || "—",
    dateAdded: new Date(row.created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    investmentNotes: row.investment_notes,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\[|\]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
