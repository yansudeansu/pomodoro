import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PomodoroPage } from './PomodoroPage';
import { usePomodoroContext, PomodoroContextType } from '../../../context/PomodoroContext';
import { Task } from '../../../types';
import { ToastProps } from '../../atoms/Toast/Toast';

let latestToastMessage = '';

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

vi.mock('../../atoms/Toast/Toast', () => ({
  Toast: ({ message, actionLabel, onAction, onClose }: ToastProps) => {
    latestToastMessage = message;
    return (
      <div data-testid="toast">
        <span>{message}</span>
        {actionLabel && <button onClick={onAction}>{actionLabel}</button>}
        {onClose && <button onClick={onClose}>Close toast</button>}
      </div>
    );
  },
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
  globalPomodoros: [],
  setGlobalPomodoros: vi.fn(),
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

  it('dismisses toast automatically without delay (mocked timeout)', () => {
    const setTimeoutMock = vi
      .spyOn(global, 'setTimeout')
      .mockImplementation((fn: () => void): ReturnType<typeof setTimeout> => {
        fn();
        return 0 as unknown as ReturnType<typeof setTimeout>;
      });
    const clearTimeoutMock = vi.spyOn(global, 'clearTimeout').mockImplementation(() => {});

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
    screen.getByLabelText(/delete task/i).click();

    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();

    setTimeoutMock.mockRestore();
    clearTimeoutMock.mockRestore();
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

  it('shows toast if more than 16 tasks are added', async () => {
    const user = userEvent.setup();

    const mockTasks = Array.from({ length: 16 }, (_, i) => ({
      id: `${i}`,
      title: `Task ${i}`,
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    }));

    let currentTasks = [...mockTasks];

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          const updated = typeof updater === 'function' ? updater(currentTasks) : updater;
          currentTasks = updated;
        },
      })
    );

    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Extra Task');
    await user.click(screen.getByTestId('add-task-button'));

    expect(await screen.findByTestId('toast')).toHaveTextContent(/10–16 Pomodoros/);
  });

  it('auto-dismisses the 17+ tasks toast without delay (mocked timeout)', async () => {
    const setTimeoutMock = vi
      .spyOn(global, 'setTimeout')
      .mockImplementation((fn: () => void): ReturnType<typeof setTimeout> => {
        fn(); // fire immediately
        return 0 as unknown as ReturnType<typeof setTimeout>;
      });
    const clearTimeoutMock = vi.spyOn(global, 'clearTimeout').mockImplementation(() => {});

    const user = userEvent.setup();

    const mockTasks = Array.from({ length: 16 }, (_, i) => ({
      id: `${i}`,
      title: `Task ${i}`,
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    }));

    let currentTasks = [...mockTasks];

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          currentTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
        },
      })
    );

    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Extra Task');
    await user.click(screen.getByTestId('add-task-button'));

    expect(latestToastMessage).toMatch(/10–16 Pomodoros/);

    // Wait for toast removal after React handles state update
    await Promise.resolve();

    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();

    setTimeoutMock.mockRestore();
    clearTimeoutMock.mockRestore();
  });

  it('closes the 17+ tasks toast when close button is clicked', async () => {
    const user = userEvent.setup();

    const mockTasks = Array.from({ length: 16 }, (_, i) => ({
      id: `${i}`,
      title: `Task ${i}`,
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    }));

    let currentTasks = [...mockTasks];

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          currentTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
        },
      })
    );

    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'Extra Task');
    await user.click(screen.getByTestId('add-task-button'));

    const toast = await screen.findByTestId('toast');
    expect(toast).toHaveTextContent(/10–16 Pomodoros/);

    const closeButton = screen.getByRole('button', { name: /close toast/i });
    await user.click(closeButton);

    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });

  it('clears the previous toast timeout when showing a new 17+ tasks toast', async () => {
    const user = userEvent.setup();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout').mockImplementation(() => {});

    const mockTasks = Array.from({ length: 16 }, (_, i) => ({
      id: `${i}`,
      title: `Task ${i}`,
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    }));

    let currentTasks = [...mockTasks];

    mockedUsePomodoroContext.mockReturnValue(
      createMockContext({
        tasks: currentTasks,
        setTasks: (updater) => {
          currentTasks = typeof updater === 'function' ? updater(currentTasks) : updater;
        },
      })
    );

    render(<PomodoroPage />);

    const input = screen.getByPlaceholderText(/add a new task/i);

    await user.type(input, 'Extra Task 1');
    await user.click(screen.getByTestId('add-task-button'));

    await user.type(input, 'Extra Task 2');
    await user.click(screen.getByTestId('add-task-button'));

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
