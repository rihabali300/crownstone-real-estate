import { Quote } from "lucide-react";

export function TestimonialCard({
  author,
  detail,
}: {
  author: string;
  detail: string;
}) {
  return (
    <article className="flex h-full flex-col border border-border bg-card p-8">
      <Quote size={22} className="text-gold" aria-hidden="true" />
      <p className="mt-6 flex-1 font-display text-xl leading-relaxed text-muted-foreground">
        Client testimonial will appear here once approved by Crownstone.
      </p>
      <footer className="mt-8 border-t border-border pt-5">
        <p className="text-sm text-foreground">{author}</p>
        <p className="eyebrow-muted mt-1">{detail}</p>
      </footer>
    </article>
  );
}
