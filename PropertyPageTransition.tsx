import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Mobile-app style horizontal slide between the properties listing and a
 * property detail page. Only those two transitions are animated; every other
 * navigation renders exactly as before.
 *
 * Uses the Web Animations API on a wrapper element so route components are
 * never remounted and the router's own scroll restoration keeps working.
 */
export function PropertyPageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const popAt = useRef(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prevPath = useRef(pathname);

  // Native browser/phone back or forward button.
  useEffect(() => {
    const onPopState = () => {
      popAt.current = Date.now();
      // Keep history restoration from animating as a vertical smooth scroll.
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      window.setTimeout(() => {
        root.style.scrollBehavior = "";
      }, 800);
      const el = ref.current;
      if (!el || reducedMotion()) return;
      // Slide the detail page out to the right as history unwinds.
      if (window.location.pathname.startsWith("/properties/")) {
        clampOverflow(
          el.animate(
            [
              { transform: "translateX(0)", opacity: 1 },
              { transform: "translateX(28%)", opacity: 0 },
            ],
            { duration: 220, easing: EASE, fill: "forwards" },
          ),
        );
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const from = prevPath.current;
    const to = pathname;
    prevPath.current = to;
    if (from === to) return;

    const isBack = Date.now() - popAt.current < 900;
    const detailToList =
      isBack && from.startsWith("/properties/") && to === "/properties";
    const listToDetail =
      !isBack && from === "/properties" && to.startsWith("/properties/");
    if (!detailToList && !listToDetail) return;

    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.getAnimations().forEach((a) => a.cancel());
      return;
    }

    el.getAnimations().forEach((a) => a.cancel());
    clampOverflow(
      el.animate(
        [
          {
            transform: `translateX(${detailToList ? "-22%" : "22%"})`,
            opacity: 0,
          },
          { transform: "translateX(0)", opacity: 1 },
        ],
        { duration: 300, easing: EASE },
      ),
    );
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}

/** Prevents the sliding element from creating a horizontal scrollbar. */
function clampOverflow(animation: Animation) {
  const root = document.documentElement;
  root.style.overflowX = "hidden";
  const restore = () => {
    root.style.overflowX = "";
  };
  animation.finished.then(restore).catch(restore);
}
