import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TaskCard } from "@/features/tasks/components/TaskCard";
import type { Task } from "@/features/tasks/types/task.types";

const task: Task = {
  id: "task_123",
  title: "Book dentist appointment",
  description: "Find a dentist near me and book something next week",
  status: "pending",
  source: "manual",
  important: true,
  urgent: false,
  dueAt: "2026-06-10T16:00:00Z",
  createdAt: "2026-06-08T12:00:00Z",
  updatedAt: "2026-06-08T12:00:00Z"
};

describe("TaskCard", () => {
  it("renders task data", () => {
    render(<TaskCard task={task} />);

    expect(screen.getByText("Book dentist appointment")).toBeInTheDocument();
    expect(
      screen.getByText("Find a dentist near me and book something next week")
    ).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText("Important")).toBeInTheDocument();
  });
});
