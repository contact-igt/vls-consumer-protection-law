import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "outlineLight" | "ghost";
type ButtonSize = "md" | "lg";

// Scoped to only the properties that actually change — animating every
// property off the GPU is wasteful. active:scale gives every button subtle,
// universal press feedback (100-160ms budget, 0.95-0.98 range).
const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold uppercase tracking-wider transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 min-h-11";

// Each variant owns its border/text/background colors outright rather than
// relying on a caller's className to override them — same-specificity
// Tailwind utilities are ordered by the compiled stylesheet, not by string
// concatenation order, so "later className wins" is not a safe assumption.
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-red-600 text-white shadow-card hover:bg-brand-red-700 active:bg-brand-red-800",
  secondary: "bg-brand-black text-white hover:bg-brand-ink active:bg-black",
  outline:
    "border-2 border-brand-red-600 text-brand-red-600 bg-transparent hover:bg-brand-red-600 hover:text-white",
  outlineLight: "border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-black",
  ghost: "text-brand-black hover:bg-brand-gray-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base sm:text-lg",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    if (href.startsWith("#")) {
      return (
        <a href={href} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
