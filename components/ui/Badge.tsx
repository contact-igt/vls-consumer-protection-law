import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "red" | "black" | "outline";
}

const variantStyles = {
  red: "bg-brand-red-600 text-white",
  black: "bg-brand-black text-white",
  outline: "border border-brand-red-600 text-brand-red-600 bg-white",
};

export function Badge({ children, className, variant = "red" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
