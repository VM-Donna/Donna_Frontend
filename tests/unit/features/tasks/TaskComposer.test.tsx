import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskComposer } from "@/features/tasks/components/TaskComposer";

describe("TaskComposer", () => {
  it("does not submit an empty title", async () => {
    const onSubmit = vi.fn();

    render(<TaskComposer onSubmit={onSubmit} isSubmitting={false} />);

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a task title.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid input", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TaskComposer onSubmit={onSubmit} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText(/request/i), {
      target: { value: "  Book dentist appointment  " }
    });
    fireEvent.change(screen.getByLabelText(/details/i), {
      target: { value: "  Find a dentist near me  " }
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Book dentist appointment",
        description: "Find a dentist near me",
        source: "manual",
        important: false,
        urgent: false,
        dueAt: undefined
      });
    });
  });
});
