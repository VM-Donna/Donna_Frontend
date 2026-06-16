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
  status: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueTime?: string;
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
  completed: boolean;
  streak?: number;
};

export type DashboardData = {
  events: CalendarEvent[];
  tasks: DashboardTask[];
  emails: EmailSummary[];
  habits: Habit[];
};

export type ThemeMode = "light" | "dark";

export type AccentColor = "navy" | "indigo" | "emerald" | "violet" | "rose" | "amber";
