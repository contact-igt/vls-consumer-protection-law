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
        hover && "transition-[box-shadow,transform] duration-200 ease-out pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
