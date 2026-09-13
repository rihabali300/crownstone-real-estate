import { MessageCircle } from "lucide-react";
import { defaultWhatsAppMessage, whatsappLink } from "@/data/site";

/** Fixed floating WhatsApp entry point. Message is context-aware on property pages. */
export function WhatsAppButton({ message }: { message?: string | undefined }) {
  return (
    <a
      href={whatsappLink(message ?? defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Crownstone on WhatsApp"
      className="animate-soft-pulse fixed bottom-24 right-4 z-40 inline-flex min-h-11 items-center gap-3 rounded-full bg-gold px-4 py-3 text-primary-foreground transition-all duration-300 ease-lux hover:-translate-y-0.5 hover:bg-gold-soft md:bottom-6 md:right-6"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.18em] md:inline">
        Chat With Us
      </span>
    </a>
  );
}
