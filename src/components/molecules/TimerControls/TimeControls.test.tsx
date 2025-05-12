import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimerControls } from './TimerControls';
import { usePomodoroContext, PomodoroContextType } from '../../../context/PomodoroContext';
import { playStartSound } from '../../../utils/sound';

vi.mock('../../../context/PomodoroContext', async () => {
  const actual = await vi.importActual<typeof import('../../../context/PomodoroContext')>(
    '../../../context/PomodoroContext'
  );
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

vi.mock('../../../utils/sound', () => ({
  playStartSound: vi.fn(),
}));

const mockSetIsRunning = vi.fn();
const mockSetActiveTaskId = vi.fn();

const mockedUsePomodoroContext = vi.mocked(usePomodoroContext);

const createMockContext = (overrides: Partial<PomodoroContextType>): PomodoroContextType => ({
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
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();

  mockedUsePomodoroContext.mockReturnValue(
    createMockContext({
      isRunning: false,
      setIsRunning: mockSetIsRunning,
      setActiveTaskId: mockSetActiveTaskId,
      tasks: [],
    })
  );
});

describe('TimerControls', () => {
  it('renders Start when not running', () => {
    render(<TimerControls />);
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('renders Pause when running', () => {
    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        isRunning: true,
        setIsRunning: mockSetIsRunning,
        setActiveTaskId: mockSetActiveTaskId,
        tasks: [],
      })
    );

    render(<TimerControls />);
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
  });

  it('calls playStartSound and starts timer', async () => {
    const user = userEvent.setup();
    render(<TimerControls />);
    await user.click(screen.getByRole('button'));

    expect(playStartSound).toHaveBeenCalled();
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
  });

  it('sets first unfinished task as active', async () => {
    const user = userEvent.setup();

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        isRunning: false,
        setIsRunning: mockSetIsRunning,
        setActiveTaskId: mockSetActiveTaskId,
        tasks: [
          {
            id: '1',
            pomodoros: 2,
            completedPomodoros: 2,
            completed: false,
            title: 'T1',
          },
          {
            id: '2',
            pomodoros: 3,
            completedPomodoros: 1,
            completed: false,
            title: 'T2',
          },
        ],
      })
    );

    render(<TimerControls />);
    await user.click(screen.getByRole('button'));

    expect(mockSetActiveTaskId).toHaveBeenCalledWith('2');
  });

  it('does not set active task if all tasks are complete', async () => {
    const user = userEvent.setup();

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        isRunning: false,
        setIsRunning: mockSetIsRunning,
        setActiveTaskId: mockSetActiveTaskId,
        tasks: [
          {
            id: '1',
            pomodoros: 1,
            completedPomodoros: 1,
            completed: true,
            title: 'Done 1',
          },
          {
            id: '2',
            pomodoros: 2,
            completedPomodoros: 2,
            completed: true,
            title: 'Done 2',
          },
        ],
      })
    );

    render(<TimerControls />);
    await user.click(screen.getByRole('button'));

    expect(mockSetActiveTaskId).not.toHaveBeenCalled();
  });
});
