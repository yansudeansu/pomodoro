import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfoTooltip } from "./InfoTooltip";

describe("InfoTooltip", () => {
  it("does not show tooltip initially", () => {
    render(<InfoTooltip />);
    expect(
      screen.queryByText(/Pomodoro Planning Tips/i)
    ).not.toBeInTheDocument();
  });

  it("shows tooltip on icon click", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);
    const button = screen.getByLabelText(/toggle info/i);
    await user.click(button);
    expect(screen.getByText(/Pomodoro Planning Tips/i)).toBeInTheDocument();
  });

  it("hides tooltip when clicked twice", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);
    const button = screen.getByLabelText(/toggle info/i);
    await user.click(button);
    await user.click(button);
    expect(
      screen.queryByText(/Pomodoro Planning Tips/i)
    ).not.toBeInTheDocument();
  });

  it("renders all tips when open", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);
    await user.click(screen.getByLabelText(/toggle info/i));

    expect(
      screen.getByText(/Work in focused 25-minute blocks/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Max 4 pomodoros per task/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Break big tasks into smaller ones/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Consider meetings & distractions/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Take regular breaks/i)).toBeInTheDocument();
  });

  it("closes the tooltip on blur", async () => {
    const user = userEvent.setup();
    render(
      <>
        <InfoTooltip />
        <button data-testid="outside-button">Outside</button>
      </>
    );

    const toggleButton = screen.getByRole("button", { name: /toggle info/i });

    await user.click(toggleButton);
    expect(screen.getByText(/Pomodoro Planning Tips/i)).toBeInTheDocument();

    await user.click(screen.getByTestId("outside-button"));

    expect(
      screen.queryByText(/Pomodoro Planning Tips/i)
    ).not.toBeInTheDocument();
  });
});
