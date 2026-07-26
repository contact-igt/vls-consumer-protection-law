import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-card",
        hover && "transition-shadow duration-200 hover:shadow-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
