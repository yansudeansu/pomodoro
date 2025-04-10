import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PomodoroPage } from "./PomodoroPage";
import { usePomodoroContext } from "../../../context/PomodoroContext";

vi.mock("../../../context/PomodoroContext", async () => {
  const actual = await vi.importActual("../../../context/PomodoroContext");
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

vi.mock("../../organisms/PomodoroTimer/PomodoroTimer", () => ({
  PomodoroTimer: () => <div data-testid="pomodoro-timer" />,
}));

vi.mock("../../organisms/TaskManager/TaskManager", () => ({
  TaskManager: () => <div data-testid="task-manager" />,
}));

beforeEach(() => {
  vi.mocked(usePomodoroContext).mockReturnValue({
    mode: "pomodoro",
  } as any);
});

describe("PomodoroPage", () => {
  it("renders PomodoroTimer and TaskManager", () => {
    render(<PomodoroPage />);
    expect(screen.getByTestId("pomodoro-timer")).toBeInTheDocument();
    expect(screen.getByTestId("task-manager")).toBeInTheDocument();
  });

  it("applies mode class based on current mode", () => {
    const { container } = render(<PomodoroPage />);
    const main = container.querySelector("main");
    expect(main?.className).toContain("pomodoro");
  });

  it.each(["short_break", "long_break"] as const)(
    "applies correct mode class for mode '%s'",
    (mode) => {
      vi.mocked(usePomodoroContext).mockReturnValue({ mode } as any);
      const { container } = render(<PomodoroPage />);
      const main = container.querySelector("main");
      expect(main?.className).toContain(mode);
    }
  );
});
