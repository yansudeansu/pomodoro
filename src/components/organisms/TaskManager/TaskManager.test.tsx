import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskManager, TaskManagerProps } from './TaskManager';
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

vi.mock('../../molecules/TaskList/TaskList', () => ({
  TaskList: () => <div data-testid="mock-task-list" />,
}));

const mockedUsePomodoroContext = vi.mocked(usePomodoroContext);

beforeEach(() => {
  mockedUsePomodoroContext.mockReturnValue({
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
  } satisfies PomodoroContextType);
});

describe('TaskManager', () => {
  const setup = (props?: Partial<TaskManagerProps>) => {
    const defaultProps: TaskManagerProps = {
      inputValue: '',
      onInputChange: vi.fn(),
      onAddTask: vi.fn(),
      onKeyDown: vi.fn(),
      ...props,
    };

    render(<TaskManager {...defaultProps} />);
    return defaultProps;
  };
  it('renders input, button, and task list', () => {
    setup();
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-task-list')).toBeInTheDocument();
  });

  it('calls on InputChange when typing in the input', async () => {
    const user = userEvent.setup();
    const { onInputChange } = setup();
    const input = screen.getByPlaceholderText(/add a new task/i);

    await user.type(input, 'New task');
    expect(onInputChange).toHaveBeenCalled();
  });

  it('calls onAddTask when clicking the button', async () => {
    const user = userEvent.setup();
    const { onAddTask } = setup();

    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(onAddTask).toHaveBeenCalled();
  });

  it('calls onKeyDown when pressing a key in the input', async () => {
    const user = userEvent.setup();
    const { onKeyDown } = setup();
    const input = screen.getByPlaceholderText(/add a new task/i);

    await user.type(input, 'Task{Enter}');

    expect(onKeyDown).toHaveBeenCalled();
  });
});
