import { cn } from "@/lib/utils";

type DonnaMarkProps = {
  className?: string;
  framed?: boolean;
};

type DonnaLogoProps = {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
};

export function DonnaMark({ className, framed = false }: DonnaMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={cn("h-10 w-10 text-[var(--accent)]", className)}
      fill="none"
    >
      {framed ? (
        <>
          <rect x="4" y="4" width="56" height="56" rx="16" className="fill-[var(--accent)]" />
          <rect
            x="7"
            y="7"
            width="50"
            height="50"
            rx="14"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
        </>
      ) : null}
      <g className={framed ? "text-[var(--accent-contrast)]" : undefined}>
        <ellipse
          cx="32"
          cy="32"
          rx="25.5"
          ry="13.5"
          transform="rotate(-22 32 32)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4.6"
          opacity="0.78"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="9.4"
          transform="rotate(-22 32 32)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <path
          d="M19 15h13.8C45.2 15 53 21.7 53 32s-7.8 17-20.2 17H19V15Zm11 10.3v13.4h3.1c5.8 0 9.4-2.5 9.4-6.7s-3.6-6.7-9.4-6.7H30Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          d="M31 19.5h2.3c8.9 0 14.4 4.8 14.4 12.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
          opacity="0.22"
        />
        <path
          d="M49 14.8 50.6 19l4.2 1.6-4.2 1.6L49 26.4l-1.6-4.2-4.2-1.6 4.2-1.6L49 14.8Z"
          fill="currentColor"
        />
        <circle
          cx="49"
          cy="20.6"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="1.4"
        />
      </g>
    </svg>
  );
}

export function DonnaLogo({ className, markClassName, showTagline = true }: DonnaLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <DonnaMark framed className={markClassName} />
      <div className="min-w-0">
        <p className="text-lg font-semibold uppercase tracking-[0.22em] text-[var(--text-primary)]">
          Donna
        </p>
        {showTagline ? (
          <p className="text-xs font-medium text-[var(--text-secondary)]">AI Executive Assistant</p>
        ) : null}
      </div>
    </div>
  );
}
