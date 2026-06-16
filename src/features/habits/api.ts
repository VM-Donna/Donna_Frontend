import { apiClient } from "@/lib/apiClient";
import type {
  CreateHabitInput,
  Habit,
  HabitApiResponse,
  HabitListApiResponse,
  UpdateHabitCompletionInput,
  UpdateHabitInput
} from "./types";

function mapHabitFromApi(habit: HabitApiResponse): Habit {
  return {
    id: habit.id,
    name: habit.name,
    description: habit.description,
    frequency: habit.frequency,
    completed: habit.completed,
    streak: habit.streak,
    createdAt: habit.createdAt,
    updatedAt: habit.updatedAt
  };
}

export async function getHabits(date: string): Promise<Habit[]> {
  const response = await apiClient<HabitListApiResponse>(`/api/habits?date=${date}`);
  return response.items.map(mapHabitFromApi);
}

export async function createHabit(input: CreateHabitInput): Promise<Habit> {
  const habit = await apiClient<HabitApiResponse>("/api/habits", {
    method: "POST",
    body: input
  });

  return mapHabitFromApi(habit);
}

export async function updateHabit(habitId: string, input: UpdateHabitInput): Promise<Habit> {
  const habit = await apiClient<HabitApiResponse>(`/api/habits/${habitId}`, {
    method: "PATCH",
    body: input
  });

  return mapHabitFromApi(habit);
}

export async function updateHabitCompletion(
  habitId: string,
  input: UpdateHabitCompletionInput
): Promise<Habit> {
  const habit = await apiClient<HabitApiResponse>(`/api/habits/${habitId}/completion`, {
    method: "PATCH",
    body: input
  });

  return mapHabitFromApi(habit);
}
