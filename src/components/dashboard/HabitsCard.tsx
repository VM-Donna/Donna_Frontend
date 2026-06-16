"use client";

import { useState } from "react";
import { Check, Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Habit } from "@/types/dashboard";

type HabitsCardProps = {
  habits: Habit[];
};

export function HabitsCard({ habits }: HabitsCardProps) {
  const [dailyHabits, setDailyHabits] = useState(habits);
  const completedCount = dailyHabits.filter((habit) => habit.completed).length;

  function toggleHabit(habitId: string) {
    setDailyHabits((currentHabits) =>
      currentHabits.map((habit) => (habit.id === habitId ? { ...habit, completed: !habit.completed } : habit))
    );
  }

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Daily Habits</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            {completedCount} of {dailyHabits.length} complete
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
          <Sparkles aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {dailyHabits.map((habit) => (
          <article
            key={habit.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
              habit.completed && "border-[var(--accent)] bg-[var(--accent-soft)]"
            )}
          >
            <button
              type="button"
              role="checkbox"
              aria-checked={habit.completed}
              aria-label={`Toggle ${habit.name}`}
              onClick={() => toggleHabit(habit.id)}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                habit.completed && "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
              )}
            >
              <Check aria-hidden="true" className="h-4 w-4" />
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-sm font-medium text-[var(--text-primary)]",
                  habit.completed && "text-[var(--accent)]"
                )}
              >
                {habit.name}
              </p>
              {habit.streak ? (
                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                  <Flame aria-hidden="true" className="h-3.5 w-3.5 text-[var(--warning)]" />
                  {habit.streak} day streak
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
