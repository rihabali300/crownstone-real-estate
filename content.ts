import apartment from "@/assets/property-apartment.jpg";
import villa from "@/assets/property-villa.jpg";
import penthouse from "@/assets/property-penthouse.jpg";
import interior from "@/assets/interior-detail.jpg";
import architecture from "@/assets/architecture-detail.jpg";
import downtown from "@/assets/location-downtown.jpg";

export const whyCrownstone = [
  {
    index: "01",
    title: "Property Expertise",
    copy: "Guidance through Dubai's dynamic property market.",
  },
  {
    index: "02",
    title: "Curated Opportunities",
    copy: "Discover properties selected around your requirements and goals.",
  },
  {
    index: "03",
    title: "Personalized Service",
    copy: "Property recommendations tailored to your needs.",
  },
  {
    index: "04",
    title: "Investment Focus",
    copy: "Understand the opportunity behind the property, not just the property itself.",
  },
];

export const services = [
  {
    index: "01",
    title: "Buy a Property",
    copy: "Find a home that fits your lifestyle, location preferences and budget.",
    cta: "Explore Buying",
    image: apartment,
  },
  {
    index: "02",
    title: "Sell Your Property",
    copy: "Position your property effectively and connect with potential buyers.",
    cta: "Talk to Our Team",
    image: villa,
  },
  {
    index: "03",
    title: "Property Investment",
    copy: "Explore Dubai real estate opportunities with a focus on informed decision-making.",
    cta: "Explore Opportunities",
    image: penthouse,
  },
  {
    index: "04",
    title: "Real Estate Consultation",
    copy: "Speak with a property professional about your next move in Dubai real estate.",
    cta: "Book a Consultation",
    image: interior,
  },
];

export type Article = {
  slug: string;
  category: "Market Update" | "Property Guide" | "Myths & Facts";
  title: string;
  date: string;
  image: string;
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "what-buyers-should-know",
    category: "Market Update",
    title:
      "Dubai Real Estate: What Buyers Should Know Before Making a Decision",
    date: "[Date]",
    image: downtown,
    excerpt:
      "[Article summary] — an editorial placeholder for Crownstone's own market commentary.",
    body: [
      "[Article content] — replace this placeholder with Crownstone's own editorial. This template is prepared for market commentary, buyer guidance and practical perspectives written by the Crownstone team.",
      "[Article content] — a second paragraph placeholder. Keep claims factual and avoid performance promises or guaranteed returns.",
    ],
  },
  {
    slug: "dubai-property-myths-vs-facts",
    category: "Myths & Facts",
    title: "Dubai Property Myths vs Facts",
    date: "[Date]",
    image: architecture,
    excerpt:
      "[Article summary] — an editorial placeholder for Crownstone's own market commentary.",
    body: [
      "[Article content] — replace this placeholder with Crownstone's own editorial separating common assumptions from verified information about the Dubai property market.",
      "[Article content] — a second paragraph placeholder. Refer readers to the appropriate UAE authority for legal or financial specifics.",
    ],
  },
  {
    slug: "evaluate-a-property-beyond-price",
    category: "Property Guide",
    title: "How to Evaluate a Property Beyond Its Price",
    date: "[Date]",
    image: interior,
    excerpt:
      "[Article summary] — an editorial placeholder for Crownstone's own market commentary.",
    body: [
      "[Article content] — replace this placeholder with Crownstone's own guidance on assessing location, layout, building quality and long-term suitability.",
      "[Article content] — a second paragraph placeholder for practical checklists or viewing advice.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const team = [
  { name: "[Agent Name]", role: "[Job Title]", phone: "[Phone]", email: "[Email]" },
  { name: "[Agent Name]", role: "[Job Title]", phone: "[Phone]", email: "[Email]" },
  { name: "[Agent Name]", role: "[Job Title]", phone: "[Phone]", email: "[Email]" },
];

export const testimonials = [
  { author: "[Client Name]", detail: "[Property / Service]" },
  { author: "[Client Name]", detail: "[Property / Service]" },
  { author: "[Client Name]", detail: "[Property / Service]" },
];

export const faqs = [
  {
    q: "Can foreigners buy property in Dubai?",
    a: "Non-UAE nationals can own property in designated freehold areas of Dubai. Eligibility, documentation and ownership type depend on the specific development and your circumstances. Requirements can vary depending on your circumstances. Speak with the appropriate UAE professional or authority for specific legal or financial advice.",
  },
  {
    q: "Can Crownstone help me find an investment property?",
    a: "Yes. Share your objectives, preferred locations, property type and budget, and our team can help you review available options and the considerations behind them. Investment decisions should be made based on individual circumstances and appropriate professional advice.",
  },
  {
    q: "What areas of Dubai do you cover?",
    a: "Crownstone focuses on Dubai and the wider UAE and GCC market. The areas shown on this website are examples pending confirmation — contact us and we can confirm current coverage for your requirement.",
  },
  {
    q: "Can I arrange a property viewing?",
    a: "Yes. Message us on WhatsApp or submit an enquiry with the property or area you are interested in, and a Crownstone representative can coordinate a viewing.",
  },
  {
    q: "How do I contact a Crownstone property advisor?",
    a: "The fastest route is WhatsApp on +971 55 348 4491. You can also submit the enquiry form on our contact page and a representative will get back to you.",
  },
  {
    q: "What information do I need before purchasing a property?",
    a: "Typically identification documents, proof of funds or financing pre-approval, and a clear understanding of the transaction and associated fees. Requirements can vary depending on your circumstances. Speak with the appropriate UAE professional or authority for specific legal or financial advice.",
  },
];

export const instagramTiles = [
  { image: penthouse, caption: "Luxury property interior" },
  { image: apartment, caption: "Property tour" },
  { image: downtown, caption: "Dubai skyline" },
  { image: villa, caption: "Property presentation" },
  { image: interior, caption: "Real estate education" },
  { image: architecture, caption: "Market insights" },
];
