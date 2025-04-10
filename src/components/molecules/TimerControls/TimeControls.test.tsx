import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimerControls } from "./TimerControls";
import { usePomodoroContext } from "../../../context/PomodoroContext";
import { playStartSound } from "../../../utils/sound";

vi.mock("../../../context/PomodoroContext", async () => {
  const actual = await vi.importActual("../../../context/PomodoroContext");
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

vi.mock("../../../utils/sound", () => ({
  playStartSound: vi.fn(),
}));

const mockSetIsRunning = vi.fn();
const mockSetActiveTaskId = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(usePomodoroContext).mockReturnValue({
    isRunning: false,
    setIsRunning: mockSetIsRunning,
    setActiveTaskId: mockSetActiveTaskId,
    tasks: [],
  } as any);
});

describe("TimerControls", () => {
  it("renders Start when not running", () => {
    render(<TimerControls />);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  it("renders Pause when running", () => {
    vi.mocked(usePomodoroContext).mockReturnValue({
      isRunning: true,
      setIsRunning: mockSetIsRunning,
      setActiveTaskId: mockSetActiveTaskId,
      tasks: [],
    } as any);

    render(<TimerControls />);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  it("calls playStartSound and starts timer", async () => {
    const user = userEvent.setup();
    render(<TimerControls />);
    await user.click(screen.getByRole("button"));

    expect(playStartSound).toHaveBeenCalled();
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
  });

  it("sets first unfinished task as active", async () => {
    const user = userEvent.setup();

    vi.mocked(usePomodoroContext).mockReturnValue({
      isRunning: false,
      setIsRunning: mockSetIsRunning,
      setActiveTaskId: mockSetActiveTaskId,
      tasks: [
        { id: "1", pomodoros: 2, completedPomodoros: 2 },
        { id: "2", pomodoros: 3, completedPomodoros: 1 },
      ],
    } as any);

    render(<TimerControls />);
    await user.click(screen.getByRole("button"));

    expect(mockSetActiveTaskId).toHaveBeenCalledWith("2");
  });

  it("does not set active task if all tasks are complete", async () => {
    const user = userEvent.setup();

    vi.mocked(usePomodoroContext).mockReturnValue({
      isRunning: false,
      setIsRunning: mockSetIsRunning,
      setActiveTaskId: mockSetActiveTaskId,
      tasks: [
        { id: "1", pomodoros: 1, completedPomodoros: 1 },
        { id: "2", pomodoros: 2, completedPomodoros: 2 },
      ],
    } as any);

    render(<TimerControls />);
    await user.click(screen.getByRole("button"));

    expect(mockSetActiveTaskId).not.toHaveBeenCalled();
  });
});
