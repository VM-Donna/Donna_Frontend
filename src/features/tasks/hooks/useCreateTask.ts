"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskApi";
import type { CreateTaskInput } from "../types/task.types";
import { tasksQueryKey } from "./useTasks";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksQueryKey });
    }
  });
}
