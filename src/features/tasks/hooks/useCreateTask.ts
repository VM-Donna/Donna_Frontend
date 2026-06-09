"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskApi";
import type { CreateTaskInput, Task } from "../types/task.types";
import { tasksQueryKey } from "./useTasks";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(input),
    onSuccess: (task) => {
      queryClient.setQueryData<Task[]>(tasksQueryKey, (currentTasks) => {
        return currentTasks ? [task, ...currentTasks] : [task];
      });
    }
  });
}
