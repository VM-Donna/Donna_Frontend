"use client";

import { useState } from "react";
import { CheckCircle2, Flame, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardData } from "@/types/dashboard";
import { EmailSummaryCard } from "./EmailSummaryCard";
import { HabitsCard } from "./HabitsCard";
import { TodayTasksCard } from "./TodayTasksCard";

type DashboardFocusPanelProps = {
  data: DashboardData;
};

type FocusTab = "tasks" | "email" | "habits";

const tabs: Array<{
  id: FocusTab;
  label: string;
  icon: typeof CheckCircle2;
}> = [
  { id: "tasks", label: "Priorities", icon: CheckCircle2 },
  { id: "email", label: "Inbox", icon: Mail },
  { id: "habits", label: "Habits", icon: Flame }
];

export function DashboardFocusPanel({ data }: DashboardFocusPanelProps) {
  const [activeTab, setActiveTab] = useState<FocusTab>("tasks");

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-soft)]">
      <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Dashboard focus panel">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                isSelected && "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
              )}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 [&>section]:border-0 [&>section]:bg-transparent [&>section]:p-1 [&>section]:shadow-none">
        {activeTab === "tasks" ? <TodayTasksCard tasks={data.tasks} /> : null}
        {activeTab === "email" ? <EmailSummaryCard emails={data.emails} /> : null}
        {activeTab === "habits" ? <HabitsCard habits={data.habits} /> : null}
      </div>
    </section>
  );
}
