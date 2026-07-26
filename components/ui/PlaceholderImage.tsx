import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label: string;
  className?: string;
  aspect?: "square" | "video" | "portrait";
}

const aspectStyles = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

/**
 * TODO(assets): Replace with an official VLS Law Academy photograph once
 * downloaded — see ASSET_SOURCES.md and CONTENT_CHECKLIST.md. Rendered only
 * while a real image path has not been supplied in data/masterclass.ts.
 */
export function PlaceholderImage({ label, className, aspect = "video" }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-gray-300 bg-brand-gray-100 p-6 text-center",
        aspectStyles[aspect],
        className
      )}
    >
      <ImageOff className="h-8 w-8 text-brand-gray-400" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray-500">{label}</p>
    </div>
  );
}
