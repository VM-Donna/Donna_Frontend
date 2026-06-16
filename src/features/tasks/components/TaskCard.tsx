import { CheckCircle2, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Task } from "../types/task.types";
import { formatDueDate } from "../utils/dateTime";

const statusVariant = {
  pending: "neutral",
  in_progress: "accent",
  blocked: "warning",
  completed: "success"
} as const;

type TaskCardProps = {
  task: Task;
  onOpen?: (task: Task) => void;
  onStatusChange?: (task: Task) => void;
  isUpdating?: boolean;
};

function getEisenhowerLabels(task: Task): string[] {
  return [task.important ? "Important" : null, task.urgent ? "Urgent" : null].filter(
    Boolean
  ) as string[];
}

export function TaskCard({ task, onOpen, onStatusChange, isUpdating = false }: TaskCardProps) {
  const labels = getEisenhowerLabels(task);
  const dueDate = formatDueDate(task.dueAt);

  return (
    <article
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={() => onOpen?.(task)}
      onKeyDown={(event) => {
        if (!onOpen) {
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(task);
        }
      }}
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)]">{task.title}</h3>
          {task.description ? (
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
              {task.description}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {labels.length > 0 ? (
              labels.map((label) => (
                <Badge key={label} variant="accent">
                  {label}
                </Badge>
              ))
            ) : (
              <Badge>Someday</Badge>
            )}
            {dueDate ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                {dueDate}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge variant={statusVariant[task.status]} className="capitalize">
            {task.status.replace("_", " ")}
          </Badge>
          {task.status !== "completed" && onStatusChange ? (
            <Button
              type="button"
              variant="secondary"
              disabled={isUpdating}
              onClick={(event) => {
                event.stopPropagation();
                onStatusChange(task);
              }}
              className="min-h-8 px-2.5 py-1 text-xs"
            >
              <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
              Done
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
