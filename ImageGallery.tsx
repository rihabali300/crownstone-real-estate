import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePointerDepth } from "@/hooks/use-pointer-depth";

export function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const depth = usePointerDepth<HTMLDivElement>(0.45);

  return (
    <div
      ref={depth.ref}
      onPointerMove={depth.onPointerMove}
      onPointerLeave={depth.onPointerLeave}
      className="gallery-depth"
    >
      <div className="gallery-depth-frame aspect-[16/10] overflow-hidden border border-border">
        <img
          src={images[active]}
          alt={`[Property Image] ${title} — view ${active + 1}`}
          width={1440}
          height={960}
          className="gallery-depth-image size-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
          {images.map((image, i) => (
            <li key={`${image}-${i}`} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${title}`}
                aria-current={active === i}
                className={cn(
                  "gallery-depth-thumb block h-20 w-28 overflow-hidden border transition-colors duration-300 sm:h-24 sm:w-36",
                  active === i ? "border-gold" : "border-border hover:border-gold/50",
                )}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
