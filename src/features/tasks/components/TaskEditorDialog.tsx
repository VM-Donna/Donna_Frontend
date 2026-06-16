"use client";

import { FormEvent, useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus, UpdateTaskInput } from "../types/task.types";
import { toIsoDateTime, toLocalDateTimeInput } from "../utils/dateTime";

type TaskEditorDialogProps = {
  task: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (taskId: string, input: UpdateTaskInput) => Promise<void>;
};

const statusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "completed", label: "Completed" }
];

export function TaskEditorDialog({ task, isSubmitting, onClose, onSubmit }: TaskEditorDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [important, setImportant] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [dueAt, setDueAt] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!task) {
      return;
    }

    setTitle(task.title);
    setDescription(task.description ?? "");
    setStatus(task.status);
    setImportant(task.important);
    setUrgent(task.urgent);
    setDueAt(toLocalDateTimeInput(task.dueAt));
    setValidationError(null);
    setSubmitError(null);
  }, [task]);

  if (!task) {
    return null;
  }

  const currentTask = task;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);
    setSubmitError(null);

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setValidationError("Enter a task title.");
      return;
    }

    try {
      await onSubmit(currentTask.id, {
        title: trimmedTitle,
        description: trimmedDescription || undefined,
        status,
        important,
        urgent,
        dueAt: toIsoDateTime(dueAt) ?? null
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not save task.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-4 backdrop-blur-sm sm:items-center">
      <section className="w-full max-w-lg rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-slate-950/20">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Edit task</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Tune the status and Eisenhower labels.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close task editor"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-task-title"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Task
            </label>
            <Input
              id="edit-task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="edit-task-description"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Details
            </label>
            <Textarea
              id="edit-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                id: "edit-task-important",
                label: "Important",
                checked: important,
                onChange: setImportant
              },
              { id: "edit-task-urgent", label: "Urgent", checked: urgent, onChange: setUrgent }
            ].map((option) => (
              <label
                key={option.id}
                htmlFor={option.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition",
                  option.checked &&
                    "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                )}
              >
                {option.label}
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.checked}
                  disabled={isSubmitting}
                  onChange={(event) => option.onChange(event.target.checked)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
              </label>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-task-status"
                className="text-sm font-semibold text-[var(--text-primary)]"
              >
                Status
              </label>
              <select
                id="edit-task-status"
                value={status}
                onChange={(event) => setStatus(event.target.value as TaskStatus)}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)]"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-task-due"
                className="text-sm font-semibold text-[var(--text-primary)]"
              >
                Due date
              </label>
              <Input
                id="edit-task-due"
                type="datetime-local"
                value={dueAt}
                onChange={(event) => setDueAt(event.target.value)}
                disabled={isSubmitting}
                className="mt-1"
              />
            </div>
          </div>

          {validationError ? (
            <p
              role="alert"
              className="rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm font-medium text-[var(--danger)]"
            >
              {validationError}
            </p>
          ) : null}

          {submitError ? (
            <p
              role="alert"
              className="rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm font-medium text-[var(--danger)]"
            >
              {submitError}
            </p>
          ) : null}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save aria-hidden="true" className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
