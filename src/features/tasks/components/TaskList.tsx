import { CheckSquare, LoaderCircle } from "lucide-react";
import { EmptyPanel } from "@/components/ui/EmptyPanel";
import { Card } from "@/components/ui/Card";
import type { Task } from "../types/task.types";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  isLoading?: boolean;
};

export function TaskList({ tasks, isLoading = false }: TaskListProps) {
  if (isLoading) {
    return (
      <Card className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin text-[var(--accent)]" />
        Loading tasks...
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyPanel
        icon={<CheckSquare aria-hidden="true" className="h-5 w-5" />}
        title="No tasks yet"
        description="Capture your first request and Donna will keep it here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
