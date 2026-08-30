"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. Keep small — this should read as calm, not busy. */
  delay?: number;
};

/**
 * Progressive-enhancement scroll reveal. Content is visible by default; the
 * hidden starting state only applies once `data-js="on"` is on <html>, and the
 * whole effect is disabled under prefers-reduced-motion (see globals.css).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Very old browsers: reveal immediately by touching the DOM directly, so
    // the effect never triggers a cascading render.
    if (typeof IntersectionObserver === "undefined") {
      element.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
