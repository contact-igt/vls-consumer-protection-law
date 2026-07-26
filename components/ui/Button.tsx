import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 min-h-11";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red-600 text-white shadow-card hover:bg-brand-red-700 active:bg-brand-red-800",
  secondary: "bg-brand-black text-white hover:bg-brand-ink active:bg-black",
  outline:
    "border-2 border-brand-black text-brand-black bg-transparent hover:bg-brand-black hover:text-white",
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
