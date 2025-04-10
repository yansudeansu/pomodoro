import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TimerDisplay } from "./TimerDisplay";

describe("TimerDisplay", () => {
  it("formats and displays time as mm:ss", () => {
    render(<TimerDisplay time={150} />);
    expect(screen.getByText("02:30")).toBeInTheDocument();
  });

  it("pads minutes and seconds with leading zeros", () => {
    render(<TimerDisplay time={65} />);
    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("displays 00:00 when time is zero", () => {
    render(<TimerDisplay time={0} />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("uses the 'timer' variant of Text", () => {
    render(<TimerDisplay time={10} />);
    const element = screen.getByText("00:10");
    expect(element.className).toContain("timer");
  });
});
