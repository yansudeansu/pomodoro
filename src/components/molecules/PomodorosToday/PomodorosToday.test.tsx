import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PomodorosToday } from './PomodorosToday';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import type { GlobalPomodoro } from '../../../types';

vi.mock('../../../context/PomodoroContext');

const mockedUsePomodoroContext = usePomodoroContext as unknown as Mock;

const createPomodoro = (offsetDays: number): GlobalPomodoro => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return {
    id: `${offsetDays}`,
    completedAt: date.toISOString(),
  };
};

describe('<PomodorosToday />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when there are no pomodoros', () => {
    mockedUsePomodoroContext.mockReturnValue({
      globalPomodoros: [],
    });

    const { container } = render(<PomodorosToday />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the correct count of today’s pomodoros', () => {
    mockedUsePomodoroContext.mockReturnValue({
      globalPomodoros: [createPomodoro(0), createPomodoro(0)],
    });

    render(<PomodorosToday />);
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('ignores pomodoros from other days', () => {
    mockedUsePomodoroContext.mockReturnValue({
      globalPomodoros: [createPomodoro(-1), createPomodoro(0), createPomodoro(1)],
    });

    render(<PomodorosToday />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
