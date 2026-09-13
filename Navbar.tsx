import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ActionAnchor } from "./ActionButton";
import { navLinks, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-lux",
        scrolled || open
          ? "glass-panel py-3"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12"
      >
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  className="gold-underline text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ActionAnchor
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            WhatsApp Us
          </ActionAnchor>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid min-h-11 min-w-11 place-items-center border border-border text-foreground transition-colors duration-300 hover:border-gold hover:text-gold lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden">
          <ul className="mt-4 flex flex-col border-t border-border px-5 pt-2 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.to} className="border-b border-border/60">
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  className="block py-4 font-display text-2xl text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-6 sm:px-8">
            <ActionAnchor
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="block"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp Us
            </ActionAnchor>
          </div>
        </div>
      )}
    </header>
  );
}
