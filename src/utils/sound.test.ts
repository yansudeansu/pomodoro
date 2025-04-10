import { describe, it, vi, expect, beforeEach } from "vitest";
import { playAlarm, playStartSound } from "./sound";

const playMock = vi.fn();

beforeEach(() => {
  playMock.mockClear();

  (globalThis.Audio as any) = vi.fn(() => ({
    play: playMock,
  }));
});

describe("sound", () => {
  it("plays alarm sound", () => {
    playAlarm();
    expect(globalThis.Audio).toHaveBeenCalledWith("/alarm.mp3");
    expect(playMock).toHaveBeenCalled();
  });

  it("plays start sound", () => {
    playStartSound();
    expect(globalThis.Audio).toHaveBeenCalledWith("/start.mp3");
    expect(playMock).toHaveBeenCalled();
  });
});
