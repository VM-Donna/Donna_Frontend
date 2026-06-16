import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HabitComposer } from "@/features/habits/components/HabitComposer";

describe("HabitComposer", () => {
  it("does not submit an empty habit name", async () => {
    const onSubmit = vi.fn();

    render(<HabitComposer onSubmit={onSubmit} isSubmitting={false} />);

    fireEvent.click(screen.getByRole("button", { name: /add habit/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a habit name.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid input", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<HabitComposer onSubmit={onSubmit} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText(/^habit$/i), {
      target: { value: "  Morning workout  " }
    });
    fireEvent.change(screen.getByLabelText(/details/i), {
      target: { value: "  Move before work  " }
    });
    fireEvent.change(screen.getByLabelText(/frequency/i), {
      target: { value: "weekly" }
    });
    fireEvent.click(screen.getByRole("button", { name: /add habit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Morning workout",
        description: "Move before work",
        frequency: "weekly"
      });
    });
  });
});
