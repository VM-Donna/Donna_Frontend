"use client";

import { useMemo, useState } from "react";
import { CalendarCheck2, CheckCircle2, Mail, X } from "lucide-react";
import { createMockDashboardData, formatDateKey } from "@/data/mockDashboardData";
import { HabitComposer } from "@/features/habits/components/HabitComposer";
import { HabitEditorDialog } from "@/features/habits/components/HabitEditorDialog";
import {
  useCreateHabit,
  useHabits,
  useUpdateHabit,
  useUpdateHabitCompletion
} from "@/features/habits/hooks";
import type { Habit } from "@/features/habits/types";
import { TaskComposer } from "@/features/tasks/components/TaskComposer";
import { TaskEditorDialog } from "@/features/tasks/components/TaskEditorDialog";
import { useCreateTask, useTasks, useUpdateTask } from "@/features/tasks/hooks";
import type { Task } from "@/features/tasks/types";
import { DashboardHeader } from "./DashboardHeader";
import { EmailSummaryCard } from "./EmailSummaryCard";
import { FloatingCreateButton } from "./FloatingCreateButton";
import { HabitsCard } from "./HabitsCard";
import { ThreeDayCalendar } from "./ThreeDayCalendar";
import { TodayTasksCard } from "./TodayTasksCard";

type CreateAction = "task" | "habit";

export function DashboardShell() {
  const [today] = useState(() => new Date());
  const [activeAction, setActiveAction] = useState<CreateAction | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const dashboardData = useMemo(() => createMockDashboardData(today), [today]);
  const todayKey = useMemo(() => formatDateKey(today), [today]);
  const { data: tasks = [] } = useTasks();
  const { data: habits = [] } = useHabits(todayKey);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const createHabitMutation = useCreateHabit(todayKey);
  const updateHabitMutation = useUpdateHabit(todayKey);
  const updateCompletionMutation = useUpdateHabitCompletion(todayKey);
  const openTasks = tasks.filter((task) => task.status !== "completed").length;
  const unreadEmails = dashboardData.emails.filter((email) => email.isUnread).length;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6 lg:px-8">
        <DashboardHeader now={today} />

        <section className="mb-5 grid gap-3 md:grid-cols-3" aria-label="Executive summary">
          {[
            { label: "Events scheduled", value: dashboardData.events.length, icon: CalendarCheck2 },
            { label: "Open priorities", value: openTasks, icon: CheckCircle2 },
            { label: "Unread emails", value: unreadEmails, icon: Mail }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
                      {item.value}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <main className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <ThreeDayCalendar baseDate={today} events={dashboardData.events} />

          <aside className="space-y-5">
            <TodayTasksCard
              tasks={tasks}
              onOpenTask={setSelectedTask}
              onCompleteTask={async (task) => {
                await updateTaskMutation.mutateAsync({
                  taskId: task.id,
                  input: { status: "completed" }
                });
              }}
              updatingTaskId={updateTaskMutation.variables?.taskId}
            />
            <EmailSummaryCard emails={dashboardData.emails} />
            <HabitsCard
              habits={habits}
              onOpenHabit={setSelectedHabit}
              onToggleHabit={async (habit) => {
                await updateCompletionMutation.mutateAsync({
                  habitId: habit.id,
                  input: { date: todayKey, completed: !habit.completed }
                });
              }}
              updatingHabitId={updateCompletionMutation.variables?.habitId}
            />
          </aside>
        </main>
      </div>

      <FloatingCreateButton onSelect={setActiveAction} />

      {activeAction ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-4 backdrop-blur-sm sm:items-center">
          <div className="relative w-full max-w-xl">
            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveAction(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            {activeAction === "task" ? (
              <TaskComposer
                isSubmitting={createTaskMutation.isPending}
                onSubmit={async (input) => {
                  await createTaskMutation.mutateAsync(input);
                  setActiveAction(null);
                }}
              />
            ) : (
              <HabitComposer
                isSubmitting={createHabitMutation.isPending}
                onSubmit={async (input) => {
                  await createHabitMutation.mutateAsync(input);
                  setActiveAction(null);
                }}
              />
            )}
          </div>
        </div>
      ) : null}

      <TaskEditorDialog
        task={selectedTask}
        isSubmitting={updateTaskMutation.isPending}
        onClose={() => setSelectedTask(null)}
        onSubmit={async (taskId, input) => {
          await updateTaskMutation.mutateAsync({ taskId, input });
          setSelectedTask(null);
        }}
      />

      <HabitEditorDialog
        habit={selectedHabit}
        isSubmitting={updateHabitMutation.isPending}
        onClose={() => setSelectedHabit(null)}
        onSubmit={async (habitId, input) => {
          await updateHabitMutation.mutateAsync({ habitId, input });
          setSelectedHabit(null);
        }}
      />
    </div>
  );
}
