import { EmptyState } from "@/components/feedback/EmptyState";
import type { Task } from "../types";
import { TaskCard } from "./TaskCard";

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <EmptyState title="No tasks yet" description="Create your first Donna task from the API." />;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
