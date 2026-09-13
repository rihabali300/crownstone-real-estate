import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Send } from "lucide-react";
import { defaultWhatsAppMessage, site, whatsappLink } from "@/data/site";

/** Mobile-only sticky action bar. */
export function MobileCTA({ message }: { message?: string | undefined }) {
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:text-gold";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
      <a
        href={whatsappLink(message ?? defaultWhatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={item}
      >
        <MessageCircle size={17} aria-hidden="true" />
        WhatsApp
      </a>
      <a href={site.phoneHref} className={`${item} border-x border-border`}>
        <Phone size={17} aria-hidden="true" />
        Call
      </a>
      <Link to="/contact" className={item}>
        <Send size={17} aria-hidden="true" />
        Enquire
      </Link>
    </div>
  );
}
