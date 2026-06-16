"use client";

import { useState } from "react";
import { CheckCircle2, Plus, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type CreateAction = "task" | "habit";

type FloatingCreateButtonProps = {
  onSelect: (action: CreateAction) => void;
};

const actions: Array<{
  id: CreateAction;
  label: string;
  icon: typeof CheckCircle2;
}> = [
  {
    id: "task",
    label: "Create task",
    icon: CheckCircle2
  },
  {
    id: "habit",
    label: "Create habit",
    icon: Sparkles
  }
];

export function FloatingCreateButton({ onSelect }: FloatingCreateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function selectAction(action: CreateAction) {
    onSelect(action);
    setIsOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isOpen ? (
        <div className="w-52 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow-lifted)]">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                onClick={() => selectAction(action.id)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                {action.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? "Close create menu" : "Open create menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          "flex h-14 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[var(--shadow-lifted)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
          isOpen && "px-4"
        )}
      >
        {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Plus aria-hidden="true" className="h-5 w-5" />}
        <span>{isOpen ? "Close" : "Create"}</span>
      </button>
    </div>
  );
}
