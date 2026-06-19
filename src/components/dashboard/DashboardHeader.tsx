"use client";

import { CalendarCheck2, CheckCircle2, Mail, Moon, Sun } from "lucide-react";
import { DonnaLogo } from "@/components/brand/DonnaLogo";
import { useThemeSettings } from "@/theme/ThemeProvider";

type DashboardHeaderProps = {
  stats: Array<{
    label: string;
    value: number;
  }>;
};

const statIcons = [CalendarCheck2, CheckCircle2, Mail];

export function DashboardHeader({ stats }: DashboardHeaderProps) {
  const { mode, setMode } = useThemeSettings();
  const isDark = mode === "dark";

  return (
    <header className="py-4">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
        <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-center">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <DonnaLogo
                  className="items-center gap-4"
                  markClassName="h-16 w-16 sm:h-20 sm:w-20"
                />
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
