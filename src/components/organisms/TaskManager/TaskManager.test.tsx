import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskManager } from './TaskManager';
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

vi.mock('../../molecules/TaskList/TaskList', () => ({
  TaskList: () => <div data-testid="mock-task-list" />,
}));

const mockSetTasks = vi.fn();
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
  ...overrides,
});

beforeEach(() => {
  mockSetTasks.mockClear();
  mockedUsePomodoroContext.mockReturnValue(
    createMockContext({
      mode: 'pomodoro',
      setTasks: mockSetTasks,
    })
  );
});

describe('TaskManager', () => {
  it('renders input, button, and task list', () => {
    render(<TaskManager />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-task-list')).toBeInTheDocument();
  });

  it('adds a task when clicking the Add button', async () => {
    const user = userEvent.setup();
    render(<TaskManager />);
    const input = screen.getByPlaceholderText(/add a new task/i);

    await user.type(input, 'My new task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockSetTasks).toHaveBeenCalledWith(expect.any(Function));

    const updater = mockSetTasks.mock.calls[0][0];
    const updatedTasks = updater([]);
    expect(updatedTasks[0]).toMatchObject({
      id: 'mock-id',
      title: 'My new task',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    });

    expect((input as HTMLInputElement).value).toBe('');
  });

  it('adds a task on pressing Enter', async () => {
    const user = userEvent.setup();
    render(<TaskManager />);
    const input = screen.getByPlaceholderText(/add a new task/i);

    await user.type(input, 'Enter task{Enter}');

    expect(mockSetTasks).toHaveBeenCalled();
  });

  it('does not add empty task', async () => {
    const user = userEvent.setup();
    render(<TaskManager />);
    const input = screen.getByPlaceholderText(/add a new task/i);

    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockSetTasks).not.toHaveBeenCalled();
  });
});
