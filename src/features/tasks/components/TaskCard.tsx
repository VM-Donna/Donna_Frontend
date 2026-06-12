import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Task } from "../types/task.types";

const statusVariant = {
  pending: "neutral",
  in_progress: "accent",
  blocked: "warning",
  completed: "success"
} as const;

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)]">{task.title}</h3>
          {task.description ? <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{task.description}</p> : null}
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--text-subtle)]">
            <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
            Created {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
        <Badge variant={statusVariant[task.status]} className="shrink-0 capitalize">
          {task.status.replace("_", " ")}
        </Badge>
      </div>
    </article>
  );
}
