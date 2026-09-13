import { Instagram, MessageCircle } from "lucide-react";
import ctaImage from "@/assets/cta-dubai.jpg";
import { ActionAnchor, ActionLink } from "./ActionButton";
import { Reveal } from "./Reveal";
import { site, whatsappLink } from "@/data/site";


export function CTASection({
  heading = "Ready to Make Your Next Move?",
  copy = "Tell us what you're looking for and a Crownstone property specialist can help you explore your options.",
}: {
  heading?: string;
  copy?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={ctaImage}
        alt="Dubai skyline at twilight"
        loading="lazy"
        width={1920}
        height={1008}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/80" />
      <div className="mx-auto max-w-[1440px] px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-12">
        <Reveal>
          <p className="eyebrow">Speak With Crownstone</p>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl leading-[1.1] sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {copy}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:flex-wrap">
            <ActionAnchor
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp
            </ActionAnchor>
            <ActionAnchor
              href={site.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <Instagram size={15} aria-hidden="true" /> Instagram DM
            </ActionAnchor>
            <ActionLink to="/contact" variant="outline">
              Book a Consultation
            </ActionLink>
          </div>

        </Reveal>
      </div>
    </section>
  );
}
