import downtown from "@/assets/location-downtown.jpg";
import marina from "@/assets/location-marina.jpg";
import palm from "@/assets/location-palm.jpg";
import architecture from "@/assets/architecture-detail.jpg";

export type Location = {
  name: string;
  slug: string;
  image: string;
  description: string;
  longDescription: string;
};

/**
 * Example location categories for the design.
 * Publish only the areas Crownstone actually services, once confirmed.
 */
export const locations: Location[] = [
  {
    name: "Downtown Dubai",
    slug: "downtown-dubai",
    image: downtown,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Dubai Marina",
    slug: "dubai-marina",
    image: marina,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Palm Jumeirah",
    slug: "palm-jumeirah",
    image: palm,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Business Bay",
    slug: "business-bay",
    image: architecture,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Dubai Hills Estate",
    slug: "dubai-hills-estate",
    image: downtown,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Dubai Creek Harbour",
    slug: "dubai-creek-harbour",
    image: marina,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Jumeirah Village Circle",
    slug: "jumeirah-village-circle",
    image: architecture,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
  {
    name: "Dubai South",
    slug: "dubai-south",
    image: palm,
    description: "[Short location description]",
    longDescription:
      "[Location overview] — replace with Crownstone's own description of the area, the property mix available and the type of buyer or tenant it typically suits.",
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
