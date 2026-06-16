"use client";

import { FormEvent, useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Habit, HabitFrequency, UpdateHabitInput } from "../types";

type HabitEditorDialogProps = {
  habit: Habit | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (habitId: string, input: UpdateHabitInput) => Promise<void>;
};

export function HabitEditorDialog({
  habit,
  isSubmitting,
  onClose,
  onSubmit
}: HabitEditorDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!habit) {
      return;
    }

    setName(habit.name);
    setDescription(habit.description ?? "");
    setFrequency(habit.frequency);
    setValidationError(null);
    setSubmitError(null);
  }, [habit]);

  if (!habit) {
    return null;
  }

  const currentHabit = habit;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);
    setSubmitError(null);

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setValidationError("Enter a habit name.");
      return;
    }

    try {
      await onSubmit(currentHabit.id, {
        name: trimmedName,
        description: trimmedDescription || undefined,
        frequency
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not save habit.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-4 backdrop-blur-sm sm:items-center">
      <section className="w-full max-w-lg rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-slate-950/20">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Edit habit</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Adjust the habit definition without touching completion history.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close habit editor"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-habit-name"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Habit
            </label>
            <Input
              id="edit-habit-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="edit-habit-description"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Details
            </label>
            <Textarea
              id="edit-habit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="edit-habit-frequency"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Frequency
            </label>
            <select
              id="edit-habit-frequency"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value as HabitFrequency)}
              disabled={isSubmitting}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)]"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
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
