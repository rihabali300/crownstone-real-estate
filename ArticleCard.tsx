import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/40">
      <Link
        to="/insights/$slug"
        params={{ slug: article.slug }}
        className="block overflow-hidden"
        aria-label={article.title}
      >
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={article.image}
            alt={`Editorial imagery for: ${article.title}`}
            loading="lazy"
            width={1440}
            height={960}
            className="size-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{article.category}</p>
        <h3 className="mt-4 font-display text-xl leading-snug sm:text-2xl">
          <Link
            to="/insights/$slug"
            params={{ slug: article.slug }}
            className="transition-colors duration-300 hover:text-gold"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{article.date}</span>
          <Link
            to="/insights/$slug"
            params={{ slug: article.slug }}
            className="inline-flex items-center gap-2 text-foreground transition-colors duration-300 group-hover:text-gold"
          >
            Read Article <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
