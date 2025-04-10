import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PomodoroTimer } from "./PomodoroTimer";
import { usePomodoroContext } from "../../../context/PomodoroContext";

vi.mock("../../../hooks/useTimer", () => ({
  useTimer: vi.fn(),
}));

vi.mock("../../../context/PomodoroContext", async () => {
  const actual = await vi.importActual("../../../context/PomodoroContext");
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

vi.mock("../../molecules/ModeSwitcher/ModeSwitcher", () => ({
  ModeSwitcher: () => <div data-testid="mode-switcher" />,
}));

vi.mock("../../molecules/TimerControls/TimerControls", () => ({
  TimerControls: () => <div data-testid="timer-controls" />,
}));

vi.mock("../../atoms/TimerDisplay/TimerDisplay", () => ({
  TimerDisplay: ({ time }: { time: number }) => (
    <div data-testid="timer-display">{time}</div>
  ),
}));

vi.mock("../../molecules/InfoTooltip/InfoTooltip", () => ({
  InfoTooltip: () => <div data-testid="info-tooltip" />,
}));

const mockContext = {
  timeLeft: 1500,
  mode: "pomodoro",
};

beforeEach(() => {
  vi.mocked(usePomodoroContext).mockReturnValue(mockContext as any);
});

describe("PomodoroTimer", () => {
  it("calls useTimer on render", async () => {
    const { useTimer } = await import("../../../hooks/useTimer");
    render(<PomodoroTimer />);
    expect(useTimer).toHaveBeenCalled();
  });

  it("renders ModeSwitcher, TimerControls, TimerDisplay, and InfoTooltip", () => {
    render(<PomodoroTimer />);
    expect(screen.getByTestId("mode-switcher")).toBeInTheDocument();
    expect(screen.getByTestId("timer-controls")).toBeInTheDocument();
    expect(screen.getByTestId("info-tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("timer-display")).toHaveTextContent("1500");
  });

  it.each([
    ["pomodoro", "Pomodoro"],
    ["short_break", "Short Break"],
    ["long_break", "Long Break"],
  ])("renders correct label for mode: %s", (mode, expectedLabel) => {
    vi.mocked(usePomodoroContext).mockReturnValue({
      ...mockContext,
      mode,
    } as any);

    render(<PomodoroTimer />);
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });
});
