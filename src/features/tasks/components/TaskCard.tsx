import type { Task } from "../types/task.types";

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-medium">{task.title}</h3>
          {task.description ? <p className="mt-1 text-sm text-slate-600">{task.description}</p> : null}
          <p className="mt-3 text-xs text-slate-500">
            Created {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-700">
          {task.status.replace("_", " ")}
        </span>
      </div>
    </article>
  );
}
