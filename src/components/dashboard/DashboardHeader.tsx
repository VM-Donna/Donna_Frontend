import { CalendarDays } from "lucide-react";

type DashboardHeaderProps = {
  now: Date;
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

export function DashboardHeader({ now }: DashboardHeaderProps) {
  return (
    <header className="py-7">
      <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm shadow-[var(--accent-ring)]">
                <CalendarDays aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">{formatDisplayDate(now)}</p>
                <h1 className="text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-4xl">Donna</h1>
              </div>
            </div>
            <div className="mt-5 max-w-2xl">
              <p className="text-xl font-semibold text-[var(--text-primary)]">{getGreeting(now)}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Here&apos;s your executive brief for today: calendar pressure, priorities, inbox signals, and habits in one calm view.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">Mode</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Plan-first</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">Autonomy</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Approval-ready</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
