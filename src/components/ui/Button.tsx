import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, isExternal, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none rounded-lg";

    const variantStyles = {
      primary:
        "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-sm hover:shadow-purple-500/20 shadow-purple-500/10",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-900 border border-slate-700/60 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100",
      outline:
        "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/80",
      ghost:
        "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70",
      link:
        "text-purple-600 hover:text-purple-700 underline-offset-4 hover:underline dark:text-purple-400 dark:hover:text-purple-300 p-0 h-auto",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2 gap-2 h-10",
      lg: "text-base px-6 py-3 gap-2.5 h-12",
    };

    const appliedClasses = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "link" && sizeStyles[size],
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={appliedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={appliedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={appliedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
