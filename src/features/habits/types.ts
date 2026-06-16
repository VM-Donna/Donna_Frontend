export type HabitFrequency = "daily" | "weekly";

export type Habit = {
  id: string;
  name: string;
  description?: string;
  frequency: HabitFrequency;
  completed: boolean;
  streak: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateHabitInput = {
  name: string;
  description?: string;
  frequency: HabitFrequency;
};

export type UpdateHabitInput = {
  name?: string;
  description?: string;
  frequency?: HabitFrequency;
};

export type UpdateHabitCompletionInput = {
  date: string;
  completed: boolean;
};

export type HabitApiResponse = Habit;

export type HabitListApiResponse = {
  items: HabitApiResponse[];
};
