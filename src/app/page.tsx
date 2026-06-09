"use client";

import { TaskComposer } from "@/features/tasks/components/TaskComposer";
import { TaskList } from "@/features/tasks/components/TaskList";
import { useCreateTask, useTasks } from "@/features/tasks/hooks";

export default function HomePage() {
  const { data: tasks = [], isLoading, error: loadError } = useTasks();
  const createTaskMutation = useCreateTask();

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950">Donna</h1>
          <p className="mt-3 text-base text-slate-600">
            Your personal executive assistant for capturing and managing requests.
          </p>
        </header>

        <TaskComposer
          isSubmitting={createTaskMutation.isPending}
          onSubmit={async (input) => {
            await createTaskMutation.mutateAsync(input);
          }}
        />

        {loadError ? (
          <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Could not load tasks. {loadError.message}
          </div>
        ) : null}

        {createTaskMutation.error ? (
          <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Could not create task. {createTaskMutation.error.message}
          </div>
        ) : null}

        <section className="mt-8" aria-label="Tasks">
          <TaskList tasks={tasks} isLoading={isLoading} />
        </section>
      </div>
    </main>
  );
}
