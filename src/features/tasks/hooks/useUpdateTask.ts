"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/taskApi";
import type { UpdateTaskInput } from "../types/task.types";
import { tasksQueryKey } from "./useTasks";

type UpdateTaskVariables = {
  taskId: string;
  input: UpdateTaskInput;
};

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, input }: UpdateTaskVariables) => updateTask(taskId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksQueryKey });
    }
  });
}
