"use client";

import { useMemo, useState } from "react";
import { CalendarCheck2, CheckCircle2, Mail, X } from "lucide-react";
import { createMockDashboardData } from "@/data/mockDashboardData";
import { DashboardHeader } from "./DashboardHeader";
import { EmailSummaryCard } from "./EmailSummaryCard";
import { FloatingCreateButton } from "./FloatingCreateButton";
import { HabitsCard } from "./HabitsCard";
import { ThreeDayCalendar } from "./ThreeDayCalendar";
import { TodayTasksCard } from "./TodayTasksCard";

type CreateAction = "task" | "habit";

function getModalCopy(action: CreateAction): { title: string; body: string } {
  if (action === "task") {
    return {
      title: "Create task coming soon",
      body: "Donna will use this space for quick task capture once the dashboard connects to the task workflow."
    };
  }

  return {
    title: "Create habit coming soon",
    body: "Donna will use this space for habit setup once the habit workflow is ready."
  };
}

export function DashboardShell() {
  const [today] = useState(() => new Date());
  const [activeAction, setActiveAction] = useState<CreateAction | null>(null);
  const dashboardData = useMemo(() => createMockDashboardData(today), [today]);
  const modalCopy = activeAction ? getModalCopy(activeAction) : null;
  const openTasks = dashboardData.tasks.filter((task) => task.status !== "completed").length;
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
                    <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{item.value}</p>
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
            <TodayTasksCard tasks={dashboardData.tasks} />
            <EmailSummaryCard emails={dashboardData.emails} />
            <HabitsCard habits={dashboardData.habits} />
          </aside>
        </main>
      </div>

      <FloatingCreateButton onSelect={setActiveAction} />

      {modalCopy ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-4 backdrop-blur-sm sm:items-center">
          <section className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-slate-950/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">{modalCopy.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{modalCopy.body}</p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveAction(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
