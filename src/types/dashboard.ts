export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  color?: string;
};

export type DashboardTask = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "blocked" | "completed";
  important: boolean;
  urgent: boolean;
  dueAt?: string;
};

export type EmailSummary = {
  id: string;
  sender: string;
  subject: string;
  receivedAt: string;
  isUnread?: boolean;
  importance?: "normal" | "important" | "urgent";
};

export type Habit = {
  id: string;
  name: string;
  description?: string;
  frequency: "daily" | "weekly";
  completed: boolean;
  streak: number;
};

export type DashboardData = {
  events: CalendarEvent[];
  tasks: DashboardTask[];
  emails: EmailSummary[];
  habits: Habit[];
};

export type ThemeMode = "light" | "dark";

export type AccentColor = "navy" | "indigo" | "emerald" | "violet" | "rose" | "amber";
