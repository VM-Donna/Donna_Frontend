"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/taskApi";

export const tasksQueryKey = ["tasks"] as const;

export function useTasks() {
  return useQuery({
    queryKey: tasksQueryKey,
    queryFn: getTasks
  });
}
