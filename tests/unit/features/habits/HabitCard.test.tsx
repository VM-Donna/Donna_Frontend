import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HabitCard } from "@/features/habits/components/HabitCard";
import type { Habit } from "@/features/habits/types";

const habit: Habit = {
  id: "habit_123",
  name: "Read 20 minutes",
  description: "Before bed",
  frequency: "daily",
  completed: false,
  streak: 4,
  createdAt: "2026-06-08T12:00:00Z",
  updatedAt: "2026-06-08T12:00:00Z"
};

describe("HabitCard", () => {
  it("renders habit data", () => {
    render(<HabitCard habit={habit} />);

    expect(screen.getByText("Read 20 minutes")).toBeInTheDocument();
    expect(screen.getByText("Before bed")).toBeInTheDocument();
    expect(screen.getByText("daily")).toBeInTheDocument();
    expect(screen.getByText("4 day streak")).toBeInTheDocument();
  });

  it("calls toggle without opening the card", () => {
    const onOpen = vi.fn();
    const onToggle = vi.fn();

    render(<HabitCard habit={habit} onOpen={onOpen} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole("checkbox", { name: /toggle read 20 minutes/i }));

    expect(onToggle).toHaveBeenCalledWith(habit);
    expect(onOpen).not.toHaveBeenCalled();
  });
});
