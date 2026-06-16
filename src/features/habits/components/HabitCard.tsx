import { Check, Flame } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Habit } from "../types";

type HabitCardProps = {
  habit: Habit;
  onOpen?: (habit: Habit) => void;
  onToggle?: (habit: Habit) => void;
  isUpdating?: boolean;
};

export function HabitCard({ habit, onOpen, onToggle, isUpdating = false }: HabitCardProps) {
  return (
    <article
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={() => onOpen?.(habit)}
      onKeyDown={(event) => {
        if (!onOpen) {
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(habit);
        }
      }}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        habit.completed && "border-[var(--accent)] bg-[var(--accent-soft)]"
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={habit.completed}
        aria-label={`Toggle ${habit.name}`}
        disabled={isUpdating}
        onClick={(event) => {
          event.stopPropagation();
          onToggle?.(habit);
        }}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50",
          habit.completed &&
            "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
        )}
      >
        <Check aria-hidden="true" className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {habit.name}
          </h3>
          <Badge variant="neutral" className="capitalize">
            {habit.frequency}
          </Badge>
        </div>
        {habit.description ? (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{habit.description}</p>
        ) : null}
        <p className="mt-2 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
          <Flame aria-hidden="true" className="h-3.5 w-3.5 text-[var(--warning)]" />
          {habit.streak} day streak
        </p>
      </div>
    </article>
  );
}
