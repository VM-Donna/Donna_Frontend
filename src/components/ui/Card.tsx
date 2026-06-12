import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "muted";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  default: "border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]",
  elevated: "border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-lifted)]",
  muted: "border-[var(--border)] bg-[var(--surface-muted)] shadow-none"
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return <div className={cn("rounded-lg border p-5", variantClasses[variant], className)} {...props} />;
}
