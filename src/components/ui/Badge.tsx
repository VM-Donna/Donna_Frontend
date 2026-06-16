import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "neutral" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  accent: "bg-[var(--accent-soft)] text-[var(--accent)]",
  neutral: "bg-[var(--surface-muted)] text-[var(--text-secondary)]",
  success: "bg-[var(--success-soft)] text-[var(--success)]",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)]"
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold", variantClasses[variant], className)}
      {...props}
    />
  );
}
