import { type HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "success" | "warning";
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-blue-100 text-blue-800 border border-blue-200",
      outline: "bg-transparent border border-slate-200 text-slate-600",
      success: "bg-green-100 text-green-800 border border-green-200",
      warning: "bg-amber-100 text-amber-800 border border-amber-200",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Badge.displayName = "Badge";
