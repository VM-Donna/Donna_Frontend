import { apiClient } from "@/lib/apiClient";
import type { CreateTaskInput, Task, TaskApiResponse } from "../types/task.types";

function mapTaskFromApi(task: TaskApiResponse): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    source: task.source,
    createdAt: task.created_at,
    updatedAt: task.updated_at
  };
}

export async function getTasks(): Promise<Task[]> {
  const tasks = await apiClient<TaskApiResponse[]>("/api/tasks");
  return tasks.map(mapTaskFromApi);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const task = await apiClient<TaskApiResponse>("/api/tasks", {
    method: "POST",
    body: input
  });

  return mapTaskFromApi(task);
}
