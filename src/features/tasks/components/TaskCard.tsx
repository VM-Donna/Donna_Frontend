import { Card } from "@/components/ui/Card";
import type { Task } from "../types";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium">{task.title}</h3>
          {task.description ? <p className="mt-1 text-sm text-slate-600">{task.description}</p> : null}
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>{task.priority}</p>
          <p>{task.status}</p>
        </div>
      </div>
    </Card>
  );
}
