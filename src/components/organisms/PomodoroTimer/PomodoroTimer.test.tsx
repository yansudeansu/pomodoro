import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PomodoroTimer } from './PomodoroTimer';
import { usePomodoroContext, PomodoroContextType } from '../../../context/PomodoroContext';

vi.mock('../../../hooks/useTimer', () => ({
  useTimer: vi.fn(),
}));

vi.mock('../../../context/PomodoroContext', async () => {
  const actual = await vi.importActual<typeof import('../../../context/PomodoroContext')>(
    '../../../context/PomodoroContext'
  );
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

vi.mock('../../molecules/ModeSwitcher/ModeSwitcher', () => ({
  ModeSwitcher: () => <div data-testid="mode-switcher" />,
}));

vi.mock('../../molecules/TimerControls/TimerControls', () => ({
  TimerControls: () => <div data-testid="timer-controls" />,
}));

vi.mock('../../atoms/TimerDisplay/TimerDisplay', () => ({
  TimerDisplay: ({ time }: { time: number }) => <div data-testid="timer-display">{time}</div>,
}));

vi.mock('../../molecules/InfoTooltip/InfoTooltip', () => ({
  InfoTooltip: () => <div data-testid="info-tooltip" />,
}));

const createMockContext = (overrides: Partial<PomodoroContextType> = {}): PomodoroContextType => ({
  mode: 'pomodoro',
  setMode: vi.fn(),
  isRunning: false,
  setIsRunning: vi.fn(),
  timeLeft: 1500,
  setTimeLeft: vi.fn(),
  resetTimer: vi.fn(),
  tasks: [],
  setTasks: vi.fn(),
  pomodoroCount: 0,
  setPomodoroCount: vi.fn(),
  activeTaskId: null,
  setActiveTaskId: vi.fn(),
  incrementCompletedPomodoros: vi.fn(),
  globalPomodoros: [],
  setGlobalPomodoros: vi.fn(),
  skipCycle: vi.fn(),
  ...overrides,
});

const mockedUsePomodoroContext = vi.mocked(usePomodoroContext);

beforeEach(() => {
  mockedUsePomodoroContext.mockReturnValue(createMockContext());
});

describe('PomodoroTimer', () => {
  it('calls useTimer on render', async () => {
    const { useTimer } = await import('../../../hooks/useTimer');
    render(<PomodoroTimer />);
    expect(useTimer).toHaveBeenCalled();
  });

  it('renders ModeSwitcher, TimerControls, TimerDisplay, and InfoTooltip', () => {
    render(<PomodoroTimer />);
    expect(screen.getByTestId('mode-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('timer-controls')).toBeInTheDocument();
    expect(screen.getByTestId('info-tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('timer-display')).toHaveTextContent('1500');
  });

  it.each([
    ['pomodoro', 'Pomodoro'],
    ['short_break', 'Short Break'],
    ['long_break', 'Long Break'],
  ])('renders correct label for mode: %s', (mode, expectedLabel) => {
    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({ mode: mode as PomodoroContextType['mode'] })
    );

    render(<PomodoroTimer />);
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });
});
