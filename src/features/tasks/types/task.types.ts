export type TaskStatus = "pending" | "in_progress" | "blocked" | "completed";

export type TaskSource = "manual" | "email" | "calendar" | "system";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  source: TaskSource;
  important: boolean;
  urgent: boolean;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  source: TaskSource;
  important: boolean;
  urgent: boolean;
  dueAt?: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  important?: boolean;
  urgent?: boolean;
  dueAt?: string | null;
};

export type TaskApiResponse = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  source: TaskSource;
  important: boolean;
  urgent: boolean;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskListApiResponse = {
  items: TaskApiResponse[];
};
