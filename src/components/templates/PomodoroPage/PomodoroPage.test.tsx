import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PomodoroPage } from './PomodoroPage';
import { usePomodoroContext, PomodoroContextType } from '../../../context/PomodoroContext';
import { Task } from '../../../types';
import { StatusEntry } from '../../organisms/StatusHistory/StatusHistory';
import { useStatusHistory } from '../../../hooks/useStatusHistory';

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

vi.mock('../../molecules/WeeklyChart/WeeklyChart', () => ({
  default: () => <div data-testid="weekly-chart">Mocked Chart</div>,
}));

vi.mock('../../organisms/StatusHistory/StatusHistory', () => ({
  default: ({ history, onClose }: { history: StatusEntry[]; onClose: () => void }) => (
    <div data-testid="status-history">
      entries: {history.length}
      <button onClick={onClose}>Close Status Modal</button>
    </div>
  ),
}));

vi.mock('../../../hooks/useStatusHistory', async () => {
  const actual = await vi.importActual<typeof import('../../../hooks/useStatusHistory')>(
    '../../../hooks/useStatusHistory'
  );
  return {
    ...actual,
    useStatusHistory: vi.fn(),
  };
});

const mockedUsePomodoroContext = vi.mocked(usePomodoroContext);

const mockSetTasks = vi.fn();

const mockedUseStatusHistory = vi.mocked(useStatusHistory);

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
  globalPomodoros: [],
  setGlobalPomodoros: vi.fn(),
  pomodoroCount: 0,
  setPomodoroCount: vi.fn(),
  activeTaskId: null,
  setActiveTaskId: vi.fn(),
  incrementCompletedPomodoros: vi.fn(),
  skipCycle: vi.fn(),
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mockedUsePomodoroContext.mockReturnValue(createMockContext({ mode: 'pomodoro' }));
  mockedUseStatusHistory.mockReturnValue({
    showStatus: false,
    statusHistory: [],
    handleStatusClick: vi.fn(),
    handleCloseStatusModal: vi.fn(),
  });
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

  it('deletes a task and shows undo toast', async () => {
    const user = userEvent.setup();
    const taskToDelete: Task = {
      id: '1',
      title: 'Task to delete',
      completed: false,
      pomodoros: 2,
      completedPomodoros: 0,
    };

    let currentTasks = [taskToDelete];
    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          const newTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
          currentTasks = newTasks;
        },
      })
    );

    render(<PomodoroPage />);

    const deleteButton = screen.getByLabelText(/delete task/i);
    await user.click(deleteButton);

    const toast = await screen.findByTestId('toast');
    expect(toast).toHaveTextContent('Task "Task to delete" deleted');

    const undoButton = screen.getByRole('button', { name: /undo/i });
    await user.click(undoButton);

    expect(currentTasks).toContainEqual(taskToDelete);
  });

  it('dismisses toast automatically without delay (mocked timeout)', async () => {
    vi.useFakeTimers();

    const taskToDelete: Task = {
      id: '1',
      title: 'Auto-dismissed task',
      completed: false,
      pomodoros: 2,
      completedPomodoros: 0,
    };

    let currentTasks = [taskToDelete];

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          currentTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
        },
      })
    );

    render(<PomodoroPage />);

    await act(async () => {
      screen.getByLabelText(/delete task/i).click();
      vi.runAllTimers();
    });

    await act(() => Promise.resolve());

    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('closes the toast when close button is clicked', async () => {
    const user = userEvent.setup();

    const taskToDelete: Task = {
      id: '1',
      title: 'Closable task',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    let currentTasks = [taskToDelete];
    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          currentTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
        },
      })
    );

    render(<PomodoroPage />);
    await user.click(screen.getByLabelText(/delete task/i));

    expect(screen.getByTestId('toast')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close toast/i });
    await user.click(closeButton);

    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });

  it('clears the previous toast timeout when showing a new one', async () => {
    const user = userEvent.setup();

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout').mockImplementation(() => {});

    const taskToDelete1: Task = {
      id: '1',
      title: 'First Task',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };
    const taskToDelete2: Task = {
      id: '2',
      title: 'Second Task',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    let currentTasks = [taskToDelete1, taskToDelete2];
    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          currentTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
        },
      })
    );

    render(<PomodoroPage />);

    await user.click(screen.getAllByLabelText(/delete task/i)[0]);

    await user.click(screen.getAllByLabelText(/delete task/i)[0]);

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });

  it('toggles the WeeklyChart visibility when the chart button is clicked', async () => {
    const user = userEvent.setup();

    render(<PomodoroPage />);

    expect(screen.queryByTestId('weekly-chart')).not.toBeInTheDocument();

    const chartButton = screen.getByRole('button', { name: /show weekly statistics/i });
    await user.click(chartButton);

    await screen.findByText(/loading chart/i);
    expect(await screen.findByTestId('weekly-chart')).toBeInTheDocument();

    await user.click(chartButton);
    expect(screen.queryByTestId('weekly-chart')).not.toBeInTheDocument();
  });

  it('does not render the status modal when showStatus=false', () => {
    mockedUseStatusHistory.mockReturnValue({
      showStatus: false,
      statusHistory: [],
      handleStatusClick: vi.fn(),
      handleCloseStatusModal: vi.fn(),
    });

    render(<PomodoroPage />);

    expect(screen.queryByTestId('status-history')).not.toBeInTheDocument();
    expect(screen.queryByTestId('status-loading')).not.toBeInTheDocument();
  });

  it('renders the status modal with history and closes via onClose', async () => {
    const onClose = vi.fn();
    mockedUseStatusHistory.mockReturnValue({
      showStatus: true,
      statusHistory: [{ timestamp: '2025-08-14T12:00:00.000Z', status: 'up' }],
      handleStatusClick: vi.fn(),
      handleCloseStatusModal: onClose,
    });

    render(<PomodoroPage />);

    const panel = await screen.findByTestId('status-history');
    expect(panel).toHaveTextContent('entries: 1');

    await userEvent.click(screen.getByRole('button', { name: /close status modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the status modal with empty history when statusHistory is null', async () => {
    const onClose = vi.fn();
    mockedUseStatusHistory.mockReturnValue({
      showStatus: true,
      statusHistory: null,
      handleStatusClick: vi.fn(),
      handleCloseStatusModal: onClose,
    });

    render(<PomodoroPage />);

    const panel = await screen.findByTestId('status-history');
    expect(panel).toHaveTextContent('entries: 0');
  });
});
