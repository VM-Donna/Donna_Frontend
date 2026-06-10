export type TaskStatus = "pending" | "in_progress" | "blocked" | "completed";

export type TaskSource = "manual" | "email" | "calendar" | "system";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  source: TaskSource;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  source: TaskSource;
};

export type TaskApiResponse = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  source: TaskSource;
  createdAt: string;
  updatedAt: string;
};

export type TaskListApiResponse = {
  items: TaskApiResponse[];
};
