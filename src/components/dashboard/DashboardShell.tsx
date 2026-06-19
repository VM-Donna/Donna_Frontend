"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { createMockDashboardData } from "@/data/mockDashboardData";
import { DashboardFocusPanel } from "./DashboardFocusPanel";
import { DashboardHeader } from "./DashboardHeader";
import { FloatingCreateButton } from "./FloatingCreateButton";
import { ThreeDayCalendar } from "./ThreeDayCalendar";

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
        <DashboardHeader
          now={today}
          stats={[
            { label: "Events scheduled", value: dashboardData.events.length },
            { label: "Open priorities", value: openTasks },
            { label: "Unread emails", value: unreadEmails }
          ]}
        />

        <main className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <ThreeDayCalendar baseDate={today} events={dashboardData.events} />
          <DashboardFocusPanel data={dashboardData} />
        </main>
      </div>

      <FloatingCreateButton onSelect={setActiveAction} />

      {modalCopy ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-4 backdrop-blur-sm sm:items-center">
          <section className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-slate-950/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  {modalCopy.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {modalCopy.body}
                </p>
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
