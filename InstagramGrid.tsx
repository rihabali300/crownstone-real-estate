import { Instagram } from "lucide-react";
import { instagramTiles } from "@/data/content";
import { site } from "@/data/site";
import { ActionAnchor } from "./ActionButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function InstagramGrid() {
  return (
    <section className="border-y border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Social"
            title="See Dubai Through Crownstone."
            description="Follow Crownstone for property tours, Dubai real estate updates, market insights and new opportunities."
          />
          <Reveal>
            <ActionAnchor
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <Instagram size={15} aria-hidden="true" /> Follow on Instagram
            </ActionAnchor>
            <p className="mt-4 text-xs tracking-[0.14em] text-muted-foreground">
              {site.instagramHandle}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((tile, i) => (
            <Reveal as="li" key={`${tile.caption}-${i}`} delay={i * 60}>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden border border-border"
              >
                <img
                  src={tile.image}
                  alt={tile.caption}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-background/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-3 text-[0.6rem] uppercase tracking-[0.16em] text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {tile.caption}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          Tiles are CMS-managed images, not live Instagram posts.
        </p>
      </div>
    </section>
  );
}
