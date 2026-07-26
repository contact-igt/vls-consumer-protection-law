import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

/**
 * TODO(assets): Replace with the official VLS Law Academy logo file once
 * downloaded to public/images/vls/vls-logo.png (see ASSET_SOURCES.md and
 * CONTENT_CHECKLIST.md). This text lockup is a placeholder that mirrors the
 * academy's red/black wordmark styling so the header renders correctly today.
 */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 leading-none", className)}>
      <span className="font-heading text-2xl font-extrabold tracking-tight text-brand-red-600">VLS</span>
      {!compact && (
        <span className="font-heading text-lg font-bold tracking-tight text-brand-black">Law Academy</span>
      )}
    </span>
  );
}
