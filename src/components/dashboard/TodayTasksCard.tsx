import { CheckCircle2, Circle, Clock3, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardTask } from "@/types/dashboard";

type TodayTasksCardProps = {
  tasks: DashboardTask[];
};

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-slate-500/15 text-[var(--text-secondary)]",
    icon: Circle
  },
  in_progress: {
    label: "In progress",
    className: "bg-[var(--accent-soft)] text-[var(--accent)]",
    icon: LoaderCircle
  },
  completed: {
    label: "Completed",
    className: "bg-[var(--success-soft)] text-[var(--success)]",
    icon: CheckCircle2
  }
} as const;

const priorityConfig = {
  low: "bg-slate-400",
  medium: "bg-amber-500",
  high: "bg-rose-500"
} as const;

export function TodayTasksCard({ tasks }: TodayTasksCardProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Today&apos;s Tasks</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{tasks.length} active priorities</p>
        </div>
        <div className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
          {tasks.filter((task) => task.status !== "completed").length} open
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((task) => {
          const status = statusConfig[task.status];
          const StatusIcon = status.icon;

          return (
            <article
              key={task.id}
              className={cn(
                "rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)]",
                task.status === "completed" && "opacity-70"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                    task.priority ? priorityConfig[task.priority] : "bg-[var(--accent)]"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium leading-5 text-[var(--text-primary)]",
                      task.status === "completed" && "line-through"
                    )}
                  >
                    {task.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold", status.className)}>
                      <StatusIcon aria-hidden="true" className="h-3 w-3" />
                      {status.label}
                    </span>
                    {task.dueTime ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                        <Clock3 aria-hidden="true" className="h-3 w-3" />
                        {task.dueTime}
                      </span>
                    ) : null}
                    {task.priority ? (
                      <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px] font-medium capitalize text-[var(--text-secondary)]">
                        {task.priority}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
