import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

/** Lightweight pointer depth that writes compositor-friendly CSS variables. */
export function usePointerDepth<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const update = (event: ReactPointerEvent<T>) => {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const node = event.currentTarget;
    const bounds = node.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.setProperty("--depth-x", `${x * strength}`);
      node.style.setProperty("--depth-y", `${y * strength}`);
    });
  };

  const reset = (event: ReactPointerEvent<T>) => {
    const node = event.currentTarget;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.setProperty("--depth-x", "0");
      node.style.setProperty("--depth-y", "0");
    });
  };

  return { ref, onPointerMove: update, onPointerLeave: reset };
}