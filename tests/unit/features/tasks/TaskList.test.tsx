import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TaskList } from "@/features/tasks/components/TaskList";

describe("TaskList", () => {
  it("renders an empty state", () => {
    render(<TaskList tasks={[]} />);

    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    expect(screen.getByText(/capture your first request/i)).toBeInTheDocument();
  });
});
