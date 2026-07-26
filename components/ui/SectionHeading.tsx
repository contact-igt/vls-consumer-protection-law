import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-red-600">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-brand-gray-600 sm:text-lg">{description}</p>}
    </div>
  );
}
