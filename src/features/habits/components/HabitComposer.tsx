"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { CreateHabitInput, HabitFrequency } from "../types";

type HabitComposerProps = {
  onSubmit: (input: CreateHabitInput) => Promise<void>;
  isSubmitting: boolean;
};

export function HabitComposer({ onSubmit, isSubmitting }: HabitComposerProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      await onSubmit({
        name: trimmedName,
        description: trimmedDescription || undefined,
        frequency
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not create habit.");
      return;
    }

    setName("");
    setDescription("");
    setFrequency("daily");
  }

  return (
    <Card className="p-0">
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Create a habit</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Track repeatable behavior without adding agent automation yet.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="habit-name"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Habit
            </label>
            <Input
              id="habit-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Morning workout"
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="habit-description"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Details
            </label>
            <Textarea
              id="habit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Move for at least 20 minutes before work"
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="habit-frequency"
              className="text-sm font-semibold text-[var(--text-primary)]"
            >
              Frequency
            </label>
            <select
              id="habit-frequency"
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

          <Button type="submit" disabled={isSubmitting}>
            <Plus aria-hidden="true" className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Add habit"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
