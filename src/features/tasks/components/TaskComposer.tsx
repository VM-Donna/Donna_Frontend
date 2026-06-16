"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createTaskSchema } from "../schemas/task.schema";
import type { CreateTaskInput } from "../types/task.types";

type TaskComposerProps = {
  onSubmit: (input: CreateTaskInput) => Promise<void>;
  isSubmitting: boolean;
};

export function TaskComposer({ onSubmit, isSubmitting }: TaskComposerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    const result = createTaskSchema.safeParse({
      title,
      description,
      source: "manual"
    });

    if (!result.success) {
      setValidationError(result.error.issues[0]?.message ?? "Check the task details and try again.");
      return;
    }

    try {
      await onSubmit(result.data);
      setTitle("");
      setDescription("");
    } catch {
      return;
    }
  }

  return (
    <Card className="p-0">
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Capture a request</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Add the raw task now. Donna can prioritize it later.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="task-title" className="text-sm font-semibold text-[var(--text-primary)]">
              Request
            </label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Book dentist appointment"
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="task-description" className="text-sm font-semibold text-[var(--text-primary)]">
              Details
            </label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Find a dentist near me and book something next week"
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          {validationError ? (
            <p role="alert" className="rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm font-medium text-[var(--danger)]">
              {validationError}
            </p>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            <Plus aria-hidden="true" className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Add task"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
