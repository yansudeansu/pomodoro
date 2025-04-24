import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PomodoroPage } from './PomodoroPage';
import { usePomodoroContext, PomodoroContextType } from '../../../context/PomodoroContext';

vi.mock('../../../context/PomodoroContext', async () => {
  const actual = await vi.importActual<typeof import('../../../context/PomodoroContext')>(
    '../../../context/PomodoroContext'
  );
  return {
    ...actual,
    usePomodoroContext: vi.fn(),
  };
});

vi.mock('uuid', () => ({
  v4: () => 'mock-id',
}));

vi.mock('../../organisms/PomodoroTimer/PomodoroTimer', () => ({
  PomodoroTimer: () => <div data-testid="pomodoro-timer" />,
}));

const mockedUsePomodoroContext = vi.mocked(usePomodoroContext);

const mockSetTasks = vi.fn();

const createMockContext = (overrides: Partial<PomodoroContextType>): PomodoroContextType => ({
  mode: 'pomodoro',
  setMode: vi.fn(),
  isRunning: false,
  setIsRunning: vi.fn(),
  timeLeft: 1500,
  setTimeLeft: vi.fn(),
  resetTimer: vi.fn(),
  tasks: [],
  setTasks: mockSetTasks,
  pomodoroCount: 0,
  setPomodoroCount: vi.fn(),
  activeTaskId: null,
  setActiveTaskId: vi.fn(),
  incrementCompletedPomodoros: vi.fn(),
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mockedUsePomodoroContext.mockReturnValue(createMockContext({ mode: 'pomodoro' }));
});

describe('PomodoroPage', () => {
  it('renders PomodoroTimer and TaskManager', () => {
    render(<PomodoroPage />);
    expect(screen.getByTestId('pomodoro-timer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('applies mode class based on current mode', () => {
    const { container } = render(<PomodoroPage />);
    const main = container.querySelector('main');
    expect(main?.className).toContain('pomodoro');
  });

  it.each(['short_break', 'long_break'] as const)(
    "applies correct mode class for mode '%s'",
    (mode) => {
      mockedUsePomodoroContext.mockReturnValue(createMockContext({ mode }));
      const { container } = render(<PomodoroPage />);
      const main = container.querySelector('main');
      expect(main?.className).toContain(mode);
    }
  );

  it('adds a task when button is clicked', async () => {
    const user = userEvent.setup();
    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'New Task');
    await user.click(button);

    expect(mockSetTasks).toHaveBeenCalledWith(expect.any(Function));

    const updateFn = mockSetTasks.mock.calls[0][0];
    const updated = updateFn([]);
    expect(updated[0]).toMatchObject({
      id: 'mock-id',
      title: 'New Task',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    });

    expect((screen.getByPlaceholderText(/add a new task/i) as HTMLInputElement).value).toBe('');
  });

  it('adds a task on Enter key press', async () => {
    const user = userEvent.setup();
    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Enter Task{Enter}');

    expect(mockSetTasks).toHaveBeenCalled();
  });

  it('does not add an empty task', async () => {
    const user = userEvent.setup();
    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockSetTasks).not.toHaveBeenCalled();
  });
});
