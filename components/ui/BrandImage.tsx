"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: "square" | "video" | "portrait" | "wide";
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  /** Absolute inset-0 fill instead of an aspect-ratio box — for full-bleed
   * backgrounds (e.g. the hero) where the parent section defines the height. */
  fullBleed?: boolean;
  /** Border radius, as a discrete option rather than a className override —
   * "rounded-full" and "rounded-2xl" are equal-specificity Tailwind
   * utilities, so which one wins the cascade depends on stylesheet order,
   * not on which is listed last in a class string. */
  rounded?: "2xl" | "full" | "none";
}

const aspectStyles = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
};

const roundedStyles = {
  "2xl": "rounded-2xl",
  full: "rounded-full",
  none: "",
};

/**
 * Renders a real photograph via next/image, or a quiet brand-colored panel
 * if the file at `src` isn't present yet — never a broken image icon, never
 * a dashed "placeholder" box. The moment the real file lands at this exact
 * path under public/images/vls/, it displays automatically with no further
 * code changes.
 */
export function BrandImage({
  src,
  alt,
  className,
  aspect = "video",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  objectPosition,
  fullBleed = false,
  rounded = "2xl",
}: BrandImageProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden bg-brand-charcoal",
        roundedStyles[rounded],
        fullBleed ? "absolute inset-0" : cn("relative", aspectStyles[aspect]),
        className
      )}
    >
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={objectPosition ? { objectPosition } : undefined}
          className="object-cover"
          onError={() => setErrored(true)}
        />
      )}
      {errored && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-ink to-brand-black">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)",
            }}
          />
          <div className="absolute bottom-0 left-0 h-1 w-16 bg-brand-red-600" />
        </div>
      )}
    </div>
  );
}
