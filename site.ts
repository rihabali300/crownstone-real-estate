/**
 * Central brand + contact configuration.
 * Replace the [PLACEHOLDER] values with Crownstone's verified details.
 */
export const site = {
  name: "Crownstone Real Estate",
  shortName: "Crownstone",
  tagline: "Properties | Real Estate | Broker",
  positioning: "Dubai's & GCC leading Real Estate Agency.",
  description:
    "Crownstone Real Estate — Dubai property, brokerage and real estate opportunities.",
  phone: "+971 55 348 4491",
  phoneHref: "tel:+971553484491",
  whatsappNumber: "971553484491",
  instagramHandle: "@crownstonerealestate",
  instagramUrl: "https://www.instagram.com/crownstonerealestate/",
  /** Instagram direct-message deep link. Replace the handle if it changes. */
  instagramDmUrl: "https://ig.me/m/crownstonerealestate",

  email: "[Email]",
  officeAddress: "[Office Address]",
  legal: {
    companyName: "[Company Legal Name]",
    tradeLicence: "[Trade Licence Number]",
    reraNumber: "[RERA / ORN Number]",
    brokerRegistration: "[Broker Registration Number]",
  },
} as const;

export const defaultWhatsAppMessage =
  "Hi Crownstone Real Estate, I'd like to enquire about Dubai properties.";

export function whatsappLink(message: string = defaultWhatsAppMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function propertyWhatsAppMessage(propertyName: string) {
  return `Hi Crownstone Real Estate, I'm interested in ${propertyName}. Please share more details.`;
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Services", to: "/services" },
  { label: "Locations", to: "/locations" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
] as const;
