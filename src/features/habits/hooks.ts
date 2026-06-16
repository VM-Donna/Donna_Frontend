"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createHabit, getHabits, updateHabit, updateHabitCompletion } from "./api";
import type { CreateHabitInput, UpdateHabitCompletionInput, UpdateHabitInput } from "./types";

export const habitsQueryKey = (date: string) => ["habits", date] as const;

export function useHabits(date: string) {
  return useQuery({
    queryKey: habitsQueryKey(date),
    queryFn: () => getHabits(date)
  });
}

export function useCreateHabit(date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateHabitInput) => createHabit(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: habitsQueryKey(date) });
    }
  });
}

export function useUpdateHabit(date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, input }: { habitId: string; input: UpdateHabitInput }) =>
      updateHabit(habitId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: habitsQueryKey(date) });
    }
  });
}

export function useUpdateHabitCompletion(date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, input }: { habitId: string; input: UpdateHabitCompletionInput }) =>
      updateHabitCompletion(habitId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: habitsQueryKey(date) });
    }
  });
}
