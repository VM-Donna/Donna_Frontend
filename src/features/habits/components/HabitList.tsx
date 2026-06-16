import { LoaderCircle, Target } from "lucide-react";
import { EmptyPanel } from "@/components/ui/EmptyPanel";
import { Card } from "@/components/ui/Card";
import type { Habit } from "../types";
import { HabitCard } from "./HabitCard";

type HabitListProps = {
  habits: Habit[];
  isLoading?: boolean;
  onOpenHabit?: (habit: Habit) => void;
  onToggleHabit?: (habit: Habit) => void;
  updatingHabitId?: string;
};

export function HabitList({
  habits,
  isLoading = false,
  onOpenHabit,
  onToggleHabit,
  updatingHabitId
}: HabitListProps) {
  if (isLoading) {
    return (
      <Card className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin text-[var(--accent)]" />
        Loading habits...
      </Card>
    );
  }

  if (habits.length === 0) {
    return (
      <EmptyPanel
        icon={<Target aria-hidden="true" className="h-5 w-5" />}
        title="No habits yet"
        description="Create a habit and Donna will track today's progress here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onOpen={onOpenHabit}
          onToggle={onToggleHabit}
          isUpdating={updatingHabitId === habit.id}
        />
      ))}
    </div>
  );
}
