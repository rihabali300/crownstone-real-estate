import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/data/site";

const primaryLinks = [
  { label: "Properties", to: "/properties" },
  { label: "Services", to: "/services" },
  { label: "Locations", to: "/locations" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-28 pt-16 md:pb-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow-muted">Explore</h2>
            <ul className="mt-5 space-y-3">
              {primaryLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow-muted">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold"
                >
                  <Phone size={14} aria-hidden="true" /> {site.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Mail size={14} aria-hidden="true" /> {site.email}
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0" aria-hidden="true" />
                {site.officeAddress}
              </li>
            </ul>
            <h2 className="eyebrow-muted mt-8">Social</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold"
                >
                  <Instagram size={14} aria-hidden="true" /> Instagram
                </a>
              </li>
              <li>[Other verified social links]</li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow-muted">Legal</h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <dl className="mt-8 space-y-2 text-xs leading-relaxed text-muted-foreground">
              <div>
                <dt className="inline">Legal name: </dt>
                <dd className="inline">{site.legal.companyName}</dd>
              </div>
              <div>
                <dt className="inline">Trade licence: </dt>
                <dd className="inline">{site.legal.tradeLicence}</dd>
              </div>
              <div>
                <dt className="inline">RERA / ORN: </dt>
                <dd className="inline">{site.legal.reraNumber}</dd>
              </div>
              <div>
                <dt className="inline">Broker registration: </dt>
                <dd className="inline">{site.legal.brokerRegistration}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Only verified business and regulatory details should be published here.</p>
        </div>
      </div>
    </footer>
  );
}
