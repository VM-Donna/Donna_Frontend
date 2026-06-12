"use client";

import { AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCreateTask, useTasks } from "../hooks";
import { TaskComposer } from "./TaskComposer";
import { TaskList } from "./TaskList";

export function TasksView() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Execution"
        title="Tasks"
        description="Capture requests and keep Donna's task list current while the broader planning system comes online."
      />

      <TaskComposer
        isSubmitting={createTaskMutation.isPending}
        onSubmit={async (input) => {
          await createTaskMutation.mutateAsync(input);
        }}
      />

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-sm text-[var(--danger)]"
        >
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          Could not load tasks. Is the backend running?
        </div>
      ) : null}

      {createTaskMutation.error ? (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-sm text-[var(--danger)]"
        >
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          Could not create task. {createTaskMutation.error.message}
        </div>
      ) : null}

      <div>
        <TaskList tasks={tasks} isLoading={isLoading} />
      </div>
    </div>
  );
}
