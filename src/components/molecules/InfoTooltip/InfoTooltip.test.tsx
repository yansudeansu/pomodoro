import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InfoTooltip } from './InfoTooltip';

describe('InfoTooltip', () => {
  it('does not show tooltip initially', () => {
    render(<InfoTooltip />);
    expect(screen.queryByText(/Pomodoro Planning Tips/i)).not.toBeInTheDocument();
  });

  it('shows tooltip on icon click', async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);
    const button = screen.getByLabelText(/toggle info/i);
    await user.click(button);
    expect(screen.getByText(/Pomodoro Planning Tips/i)).toBeInTheDocument();
  });

  it('hides tooltip when clicked twice', async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);
    const button = screen.getByLabelText(/toggle info/i);
    await user.click(button);
    await user.click(button);
    expect(screen.queryByText(/Pomodoro Planning Tips/i)).not.toBeInTheDocument();
  });

  it('renders all tips when open', async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);
    await user.click(screen.getByLabelText(/toggle info/i));

    expect(screen.getByText(/Work in focused 25-minute blocks/i)).toBeInTheDocument();
    expect(screen.getByText(/Max 4 pomodoros per task/i)).toBeInTheDocument();
    expect(screen.getByText(/Break big tasks into smaller ones/i)).toBeInTheDocument();
    expect(screen.getByText(/Consider meetings & distractions/i)).toBeInTheDocument();
    expect(screen.getByText(/Take regular breaks/i)).toBeInTheDocument();
  });

  it('closes the tooltip when clicking the backdrop', async () => {
    const user = userEvent.setup();
    render(<InfoTooltip />);

    await user.click(screen.getByLabelText(/toggle info/i));

    expect(screen.getByText(/Pomodoro Planning Tips/i)).toBeInTheDocument();

    const backdrop = screen.getByTestId('tooltip-backdrop');
    await user.click(backdrop);

    expect(screen.queryByText(/Pomodoro Planning Tips/i)).not.toBeInTheDocument();
  });

  it('closes the tooltip on blur event', async () => {
    render(
      <>
        <InfoTooltip />
        <button data-testid="outside">Outside</button>
      </>
    );

    const iconButton = screen.getByLabelText(/toggle info/i);

    await act(async () => {
      iconButton.focus();
      await userEvent.click(iconButton);
    });

    expect(screen.getByText(/Pomodoro Planning Tips/i)).toBeInTheDocument();

    const outsideButton = screen.getByTestId('outside');

    await act(async () => {
      outsideButton.focus();
    });

    await waitFor(() =>
      expect(screen.queryByText(/Pomodoro Planning Tips/i)).not.toBeInTheDocument()
    );
  });

  it('does not render tooltip or backdrop when closed', () => {
    render(<InfoTooltip />);
    expect(screen.queryByTestId('tooltip-backdrop')).not.toBeInTheDocument();
    expect(screen.queryByText(/Pomodoro Planning Tips/i)).not.toBeInTheDocument();
  });
});
