import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModeSwitcher } from "./ModeSwitcher";

vi.mock("../../../context/PomodoroContext", () => {
  return {
    usePomodoroContext: vi.fn(),
  };
});

import { usePomodoroContext } from "../../../context/PomodoroContext";

describe("ModeSwitcher", () => {
  const setMode = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all mode buttons", () => {
    (usePomodoroContext as any).mockReturnValue({
      mode: "pomodoro",
      setMode,
    });

    render(<ModeSwitcher />);

    expect(
      screen.getByRole("button", { name: /pomodoro/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /short break/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /long break/i })
    ).toBeInTheDocument();
  });

  it("highlights the active mode", () => {
    (usePomodoroContext as any).mockReturnValue({
      mode: "short_break",
      setMode,
    });

    render(<ModeSwitcher />);
    const shortBreakBtn = screen.getByRole("button", { name: /short break/i });

    expect(shortBreakBtn.className).toContain("active");
  });

  it("calls setMode with the correct value on click", async () => {
    const user = userEvent.setup();

    (usePomodoroContext as any).mockReturnValue({
      mode: "pomodoro",
      setMode,
    });

    render(<ModeSwitcher />);
    const longBreakBtn = screen.getByRole("button", { name: /long break/i });
    await user.click(longBreakBtn);

    expect(setMode).toHaveBeenCalledWith("long_break");
  });
});
