"use client";

import { useCreateTask, useTasks } from "../hooks";
import { TaskComposer } from "./TaskComposer";
import { TaskList } from "./TaskList";

export function TasksView() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="mt-2 text-slate-600">Capture requests and keep Donna&apos;s task list current.</p>
      </div>

      <TaskComposer
        isSubmitting={createTaskMutation.isPending}
        onSubmit={async (input) => {
          await createTaskMutation.mutateAsync(input);
        }}
      />

      {error ? (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Could not load tasks. Is the backend running?
        </div>
      ) : null}

      {createTaskMutation.error ? (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Could not create task. {createTaskMutation.error.message}
        </div>
      ) : null}

      <div className="mt-8">
        <TaskList tasks={tasks} isLoading={isLoading} />
      </div>
    </div>
  );
}
