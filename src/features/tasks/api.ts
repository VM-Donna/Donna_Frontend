import { apiClient } from "@/lib/api-client";
import type { TaskListResponse } from "./types";

export function getTasks() {
  return apiClient<TaskListResponse>("/v1/tasks");
}
