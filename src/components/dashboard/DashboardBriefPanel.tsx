import { BarChart3, CheckCircle2, Flame, Mail, Target } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";

type DashboardBriefPanelProps = {
  data: DashboardData;
};

export function DashboardBriefPanel({ data }: DashboardBriefPanelProps) {
  const completedTasks = data.tasks.filter((task) => task.status === "completed").length;
  const taskCompletion = Math.round((completedTasks / data.tasks.length) * 100);
  const completedHabits = data.habits.filter((habit) => habit.completed).length;
  const habitCompletion = Math.round((completedHabits / data.habits.length) * 100);
  const unreadEmails = data.emails.filter((email) => email.isUnread).length;
  const scheduledHours = data.events.reduce((total, event) => {
    const [startHour, startMinute] = event.startTime.split(":").map(Number);
    const [endHour, endMinute] = event.endTime.split(":").map(Number);
    return total + (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 60;
  }, 0);
  const focusScore = Math.max(
    0,
    Math.min(100, Math.round((taskCompletion + habitCompletion + 76) / 3))
  );
  const scoreMetrics = [
    { label: "Tasks closed", value: taskCompletion, icon: CheckCircle2 },
    { label: "Habits done", value: habitCompletion, icon: Flame },
    { label: "Focus score", value: focusScore, icon: Target }
  ];

  return (
    <section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
      <div className="border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <BarChart3 aria-hidden="true" className="h-4 w-4" />
          <span>Performance dashboard</span>
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Personal operating score
        </h2>
      </div>

      <div className="grid flex-1 gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col justify-between gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {scoreMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <article
                  key={metric.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">
                      {metric.label}
                    </p>
                    <Icon aria-hidden="true" className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">
                    {metric.value}%
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface)]">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Weekly momentum</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  Donna is tracking task closure, habit consistency, schedule load, and inbox
                  pressure.
                </p>
              </div>
              <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                {focusScore >= 70 ? "Healthy pace" : "Needs attention"}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold text-[var(--text-primary)]">
                  {scheduledHours.toFixed(1)}h
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">scheduled load</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[var(--text-primary)]">{unreadEmails}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">unread signals</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[var(--text-primary)]">
                  {completedHabits}/{data.habits.length}
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">habits complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-5 lg:block">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--accent)] opacity-10" />
          <div className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-[var(--accent)] opacity-10" />
          <div className="relative flex h-full flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Executive signal
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                A compact read on whether the day is protected, overloaded, or drifting.
              </p>
            </div>

            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-[var(--accent)]/20 bg-[var(--surface)] shadow-[var(--shadow-soft)]">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[var(--shadow-lifted)]">
                <div className="absolute inset-3 rounded-full border border-white/25" />
                <div className="text-center">
                  <p className="text-4xl font-semibold">{focusScore}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
                    Score
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs leading-5 text-[var(--text-secondary)]">
              Goal: keep the score above 75 by closing priorities and protecting focused time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
