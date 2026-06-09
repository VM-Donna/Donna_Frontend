import type { Task } from "../types/task.types";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  isLoading?: boolean;
};

export function TaskList({ tasks, isLoading = false }: TaskListProps) {
  if (isLoading) {
    return <p className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
        <h2 className="text-sm font-medium text-slate-900">No tasks yet</h2>
        <p className="mt-1 text-sm text-slate-600">Capture your first request and Donna will keep it here.</p>
      </div>
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
