"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Gentle fade-up on scroll into view. Content is visible by default (before
 * hydration, or if JavaScript never runs) so crawlers, no-JS visitors, and
 * slow connections always see full content — the reveal animation only ever
 * hides content once client-side JS has confirmed it starts off-screen.
 */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) {
      setIsVisible(true);
      setIsReady(true);
      return;
    }

    setIsReady(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hidden = isReady && !isVisible;

  return (
    <div
      ref={ref}
      style={isVisible ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(isVisible && "animate-fade-up", hidden && "opacity-0", className)}
    >
      {children}
    </div>
  );
}
