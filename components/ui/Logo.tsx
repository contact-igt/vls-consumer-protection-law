"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  compact?: boolean;
  onDark?: boolean;
  priority?: boolean;
}

const LOGO_SRC = "/images/vls/vls-logo.png";

/**
 * Renders the official VLS Law Academy logo via next/image. Falls back to a
 * styled text lockup only if the file isn't present at public/images/vls/vls-logo.png
 * — the real logo displays automatically the instant it's added, no code change needed.
 */
export function Logo({ className, compact = false, onDark = false, priority = false }: LogoProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span className={cn("inline-flex items-baseline gap-1.5 leading-none", className)}>
        <span
          className={cn(
            "font-heading text-2xl font-extrabold tracking-tight",
            onDark ? "text-brand-red-400" : "text-brand-red-600"
          )}
        >
          VLS
        </span>
        {!compact && (
          <span className={cn("font-heading text-lg font-bold tracking-tight", onDark ? "text-white" : "text-brand-black")}>
            Law Academy
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-block",
        // The artwork itself is unaltered (never recolored) — on a dark
        // surface it gets a white backing plate instead, since its black
        // icon/wordmark elements have no contrast against a dark background.
        onDark && "rounded-lg bg-white p-1.5",
        compact ? "h-11 w-11" : "h-12 w-12 sm:h-14 sm:w-14",
        className
      )}
    >
      <Image
        src={LOGO_SRC}
        alt="VLS Law Academy"
        fill
        priority={priority}
        sizes="112px"
        className="object-contain"
        onError={() => setErrored(true)}
      />
    </span>
  );
}
