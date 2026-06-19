"use client";

import { CalendarCheck2, CheckCircle2, Mail, Moon, Sparkles, Sun } from "lucide-react";
import { useThemeSettings } from "@/theme/ThemeProvider";

type DashboardHeaderProps = {
  now: Date;
  stats: Array<{
    label: string;
    value: number;
  }>;
};

function getGreeting(date: Date): string {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(date);
}

const statIcons = [CalendarCheck2, CheckCircle2, Mail];

export function DashboardHeader({ now, stats }: DashboardHeaderProps) {
  const { mode, setMode } = useThemeSettings();
  const isDark = mode === "dark";

  return (
    <header className="py-5">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
        <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-center">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm shadow-[var(--accent-ring)]">
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {formatDisplayDate(now)}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                      Donna
                    </h1>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                      Executive OS
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                onClick={() => setMode(isDark ? "light" : "dark")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {isDark ? (
                  <Sun aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Moon aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="mt-4 max-w-2xl">
              <p className="text-lg font-semibold text-[var(--text-primary)]">{getGreeting(now)}</p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
                Calendar pressure, open priorities, and inbox signals in one calm morning brief.
              </p>
            </div>
          </div>

          <section className="grid gap-3 sm:grid-cols-3" aria-label="Executive summary">
            {stats.map((item, index) => {
              const Icon = statIcons[index] ?? CalendarCheck2;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
                        {item.value}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </header>
  );
}
