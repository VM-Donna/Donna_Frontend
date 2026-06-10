import { apiClient } from "@/lib/apiClient";
import type { CreateTaskInput, Task, TaskApiResponse, TaskListApiResponse } from "../types/task.types";

function mapTaskFromApi(task: TaskApiResponse): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    source: task.source,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };
}

export async function getTasks(): Promise<Task[]> {
  const response = await apiClient<TaskListApiResponse>("/api/tasks");
  return response.items.map(mapTaskFromApi);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const task = await apiClient<TaskApiResponse>("/api/tasks", {
    method: "POST",
    body: input
  });

  return mapTaskFromApi(task);
}
