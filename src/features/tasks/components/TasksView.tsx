"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCreateTask, useTasks, useUpdateTask } from "../hooks";
import type { Task } from "../types/task.types";
import { TaskComposer } from "./TaskComposer";
import { TaskEditorDialog } from "./TaskEditorDialog";
import { TaskList } from "./TaskList";

export function TasksView() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data: tasks = [], isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

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

      {createTaskMutation.error || updateTaskMutation.error ? (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-lg border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-sm text-[var(--danger)]"
        >
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          Could not save task. {(createTaskMutation.error ?? updateTaskMutation.error)?.message}
        </div>
      ) : null}

      <div>
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onOpenTask={setSelectedTask}
          onCompleteTask={async (task) => {
            await updateTaskMutation.mutateAsync({
              taskId: task.id,
              input: { status: "completed" }
            });
          }}
          updatingTaskId={updateTaskMutation.variables?.taskId}
        />
      </div>

      <TaskEditorDialog
        task={selectedTask}
        isSubmitting={updateTaskMutation.isPending}
        onClose={() => setSelectedTask(null)}
        onSubmit={async (taskId, input) => {
          await updateTaskMutation.mutateAsync({ taskId, input });
          setSelectedTask(null);
        }}
      />
    </div>
  );
}
