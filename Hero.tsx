import heroImage from "@/assets/hero-dubai.jpg";
import { usePointerDepth } from "@/hooks/use-pointer-depth";
import { ActionLink } from "./ActionButton";

export function Hero() {
  const depth = usePointerDepth<HTMLElement>(1);

  return (
    <section
      ref={depth.ref}
      onPointerMove={depth.onPointerMove}
      onPointerLeave={depth.onPointerLeave}
      className="hero-scene relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-20"
    >
      <div className="hero-depth-background absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Dubai skyline at golden hour"
          width={1920}
          height={1088}
          className="animate-hero-zoom size-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/40" />
      <div className="hero-architectural-lines absolute inset-0 -z-10" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-depth-content mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p
          className="animate-rise eyebrow"
          style={{ animationDelay: "120ms" }}
        >
          Crownstone Real Estate · Dubai • UAE
        </p>

        <h1
          className="animate-rise mt-6 max-w-3xl text-balance text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "220ms" }}
        >
          Find Your Place
          <span className="block text-gold">in Dubai.</span>
        </h1>

        <p
          className="animate-rise mt-6 max-w-xl font-display text-lg text-foreground/90 sm:text-2xl"
          style={{ animationDelay: "320ms" }}
        >
          Premium properties. Exceptional locations. Smarter real estate decisions.
        </p>

        <p
          className="animate-rise mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground"
          style={{ animationDelay: "400ms" }}
        >
          Discover carefully selected residential and investment opportunities across
          Dubai with a real estate team focused on helping you make confident property
          decisions.
        </p>

        <div
          className="animate-rise mt-9 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "480ms" }}
        >
          <ActionLink to="/properties">Explore Properties</ActionLink>
          <ActionLink to="/contact" variant="outline">
            Speak With an Expert
          </ActionLink>
        </div>

        <p
          className="animate-rise mt-10 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground"
          style={{ animationDelay: "560ms" }}
        >
          Dubai Real Estate • Residential • Investment • Brokerage
        </p>

        <div className="mt-12 hidden items-center gap-4 sm:flex">
          <span className="eyebrow-muted">Scroll to explore</span>
          <span className="relative h-12 w-px overflow-hidden bg-border">
            <span className="animate-scroll-line absolute inset-0 bg-gold" />
          </span>
        </div>
      </div>
    </section>
  );
}
