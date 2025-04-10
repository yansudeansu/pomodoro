import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  PomodoroProvider,
  usePomodoroContext,
} from "../context/PomodoroContext";
import { useTimer } from "./useTimer";
import * as sound from "../utils/sound";

vi.useFakeTimers();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PomodoroProvider>{children}</PomodoroProvider>
);

describe("useTimer", () => {
  let alarmSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    alarmSpy = vi.spyOn(sound, "playAlarm").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllTimers();
    alarmSpy.mockRestore();
  });

  it("starts and decrements the timer", () => {
    const { result } = renderHook(
      () => {
        useTimer();
        return usePomodoroContext();
      },
      { wrapper }
    );

    act(() => {
      result.current.setIsRunning(true);
    });

    act(() => {
      vi.advanceTimersByTime(1000 * 3);
    });

    expect(result.current.timeLeft).toBe(1500 - 3);
  });

  it("plays alarm and switches mode when timer ends", () => {
    const { result } = renderHook(
      () => {
        useTimer();
        return usePomodoroContext();
      },
      { wrapper }
    );

    act(() => {
      result.current.setIsRunning(true);
    });

    act(() => {
      vi.advanceTimersByTime(1500 * 1000);
    });

    expect(alarmSpy).toHaveBeenCalledOnce();
    expect(result.current.isRunning).toBe(false);
    expect(["short_break", "long_break"]).toContain(result.current.mode);
  });

  it("increments pomodoro count and switches to long_break on 4th", async () => {
    const { result } = renderHook(
      () => {
        useTimer();
        return usePomodoroContext();
      },
      {
        wrapper: ({ children }) => (
          <PomodoroProvider>{children}</PomodoroProvider>
        ),
      }
    );

    const simulatePomodoro = async () => {
      await act(() => {
        result.current.setMode("pomodoro");
        result.current.setIsRunning(true);
      });

      await act(() => {
        vi.advanceTimersByTime(1);
      });

      act(() => {
        vi.advanceTimersByTime(1500 * 1000);
        vi.runOnlyPendingTimers();
      });
    };

    for (let i = 0; i < 4; i++) {
      await simulatePomodoro();
    }

    expect(result.current.pomodoroCount).toBe(4);
    expect(result.current.mode).toBe("long_break");
  });

  it("switches back to pomodoro after a break", () => {
    const { result } = renderHook(
      () => {
        useTimer();
        return usePomodoroContext();
      },
      { wrapper }
    );

    act(() => {
      result.current.setMode("short_break");
      result.current.setIsRunning(true);
    });

    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(result.current.mode).toBe("pomodoro");
  });

  it("clears previous interval when creating a new one (lines 21–23)", async () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");

    const { result } = renderHook(
      () => {
        useTimer();
        return usePomodoroContext();
      },
      { wrapper }
    );

    act(() => {
      result.current.setIsRunning(true);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.setIsRunning(false);
    });

    await vi.advanceTimersByTime(0);

    act(() => {
      result.current.setIsRunning(true);
    });

    expect(clearSpy).toHaveBeenCalled();

    clearSpy.mockRestore();
  });
});
