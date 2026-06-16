"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatDateKey } from "@/data/mockDashboardData";
import { useCreateHabit, useHabits, useUpdateHabit, useUpdateHabitCompletion } from "../hooks";
import type { Habit } from "../types";
import { HabitComposer } from "./HabitComposer";
import { HabitEditorDialog } from "./HabitEditorDialog";
import { HabitList } from "./HabitList";

export function HabitsView() {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const todayKey = useMemo(() => formatDateKey(new Date()), []);
  const { data: habits = [], isLoading, error } = useHabits(todayKey);
  const createHabitMutation = useCreateHabit(todayKey);
  const updateHabitMutation = useUpdateHabit(todayKey);
  const updateCompletionMutation = useUpdateHabitCompletion(todayKey);

  const mutationError =
    createHabitMutation.error ?? updateHabitMutation.error ?? updateCompletionMutation.error;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Accountability"
        title="Habits"
        description="Track repeatable routines and keep today's completion state current."
      />

      <HabitComposer
        isSubmitting={createHabitMutation.isPending}
        onSubmit={async (input) => {
          await createHabitMutation.mutateAsync(input);
        }}
      />

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-sm text-[var(--danger)]"
        >
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          Could not load habits. Is the backend running?
        </div>
      ) : null}

      {mutationError ? (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-sm text-[var(--danger)]"
        >
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          Could not save habit. {mutationError.message}
        </div>
      ) : null}

      <HabitList
        habits={habits}
        isLoading={isLoading}
        onOpenHabit={setSelectedHabit}
        onToggleHabit={async (habit) => {
          await updateCompletionMutation.mutateAsync({
            habitId: habit.id,
            input: { date: todayKey, completed: !habit.completed }
          });
        }}
        updatingHabitId={updateCompletionMutation.variables?.habitId}
      />

      <HabitEditorDialog
        habit={selectedHabit}
        isSubmitting={updateHabitMutation.isPending}
        onClose={() => setSelectedHabit(null)}
        onSubmit={async (habitId, input) => {
          await updateHabitMutation.mutateAsync({ habitId, input });
          setSelectedHabit(null);
        }}
      />
    </div>
  );
}
