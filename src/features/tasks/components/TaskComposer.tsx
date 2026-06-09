"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
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
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="task-title" className="text-sm font-medium text-slate-700">
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
          <label htmlFor="task-description" className="text-sm font-medium text-slate-700">
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
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {validationError}
          </p>
        ) : null}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add task"}
        </Button>
      </div>
    </form>
  );
}
