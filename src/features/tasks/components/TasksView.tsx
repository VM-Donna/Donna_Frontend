"use client";

import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { useTasks } from "../hooks";
import { TaskList } from "./TaskList";

export function TasksView() {
  const { data, isLoading, error } = useTasks();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="mt-2 text-slate-600">
          This page reads from the backend via the central API client.
        </p>
      </div>

      {isLoading ? <LoadingState label="Loading tasks..." /> : null}
      {error ? <ErrorState message="Could not load tasks. Is the backend running?" /> : null}
      {data ? <TaskList tasks={data.items} /> : null}
    </div>
  );
}
