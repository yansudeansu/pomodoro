import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { PomodoroProvider } from '../../../context/PomodoroContext';
import { TaskList } from './TaskList';
import styles from './TaskList.module.css';
import { GlobalPomodoro, Task } from '../../../types';

const SetupContext: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const renderWithProvider = (
  ui: React.ReactElement,
  { globalPomodoros = [], tasks = [] }: { globalPomodoros?: GlobalPomodoro[]; tasks?: Task[] } = {}
) => {
  localStorage.setItem('global-pomodoros', JSON.stringify(globalPomodoros));
  localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));

  return render(
    <PomodoroProvider>
      <SetupContext>{ui}</SetupContext>
    </PomodoroProvider>
  );
};

vi.mock('../../atoms/Icons/Icons', () => {
  const PomodoroIcon = () => <svg data-testid="pomodoro-icon" />;
  const DonePomodoroIcon = () => <svg data-testid="done-pomodoro-icon" />;
  const TrashIcon = () => <svg data-testid="trash-icon" />;
  const AddIcon = () => <svg data-testid="add-icon" />;
  const RemoveIcon = () => <svg data-testid="remove-icon" />;
  const InfoIcon = () => <svg data-testid="info-icon" />;
  const BrainIcon = () => <svg data-testid="brain-icon" />;
  const CalendarIcon = () => <svg data-testid="calendar-icon" />;
  const SplitIcon = () => <svg data-testid="split-icon" />;
  const ChevronDown = () => <svg data-testid="chevron-down" />;
  const ChevronUp = () => <svg data-testid="chevron-up" />;

  return {
    AppIcons: {
      sparkle: PomodoroIcon,
      sparkles: DonePomodoroIcon,
      trash: TrashIcon,
      add: AddIcon,
      remove: RemoveIcon,
      info: InfoIcon,
      brain: BrainIcon,
      calendar: CalendarIcon,
      split: SplitIcon,
      chevronDown: ChevronDown,
      chevronUp: ChevronUp,
    },
  };
});

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders tasks', async () => {
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
        {
          id: '2',
          title: 'Complete Me',
          completed: true,
          pomodoros: 4,
          completedPomodoros: 4,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await userEvent.click(toggleButton);
    }

    expect(await screen.findByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Complete Me')).toBeInTheDocument();
  });

  it('toggles task completion both ways', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
        {
          id: '2',
          title: 'Complete Me',
          completed: true,
          pomodoros: 4,
          completedPomodoros: 4,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await user.click(toggleButton);
    }

    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[1]);
    expect(screen.getByDisplayValue('Complete Me')).not.toHaveClass(styles.completed);

    await user.click(checkboxes[0]);
    expect(screen.getByDisplayValue('Test Task')).toHaveClass(styles.completed);
  });

  it('deletes a task', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
      ],
    });
    const deleteButtons = screen.getAllByLabelText(/delete task/i);
    await user.click(deleteButtons[0]);
    expect(screen.queryByDisplayValue('Test Task')).not.toBeInTheDocument();
  });

  it('adds a pomodoro to a task with < 4', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 1,
          completedPomodoros: 0,
        },
      ],
    });
    const addButton = screen.getAllByLabelText(/add pomodoro/i)[0];
    await user.click(addButton);
    expect(screen.getAllByTestId('pomodoro-icon')).toHaveLength(2);
  });

  it('does not show add button for task with pomodoros >= 4', () => {
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 4,
          completedPomodoros: 0,
        },
      ],
    });
    const buttons = screen.queryAllByLabelText(/add pomodoro/i);
    expect(buttons.length).toBe(0);
  });

  it('applies completed class conditionally', async () => {
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
        {
          id: '2',
          title: 'Task 2',
          completed: true,
          pomodoros: 2,
          completedPomodoros: 2,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await userEvent.click(toggleButton);
    }

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].className).not.toContain(styles.completed);
    expect(inputs[1].className).toContain(styles.completed);
  });

  it('updates task title on input change', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
      ],
    });
    const input = screen.getByDisplayValue('Test Task');
    await user.clear(input);
    await user.type(input, 'Updated Task');
    expect(input).toHaveValue('Updated Task');
  });

  it('renders completed and incomplete pomodoro icons correctly', async () => {
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Mixed Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
        {
          id: '2',
          title: 'Done Task',
          completed: true,
          pomodoros: 3,
          completedPomodoros: 3,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await userEvent.click(toggleButton);
    }

    const done = screen.getAllByTestId('done-pomodoro-icon');
    const sparkle = screen.getAllByTestId('pomodoro-icon');

    expect(done.length).toBe(4);
    expect(sparkle.length).toBe(1);
  });

  it('removes a pomodoro from a task with > 1 pomodoro', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
      ],
    });

    const taskContainers = screen
      .getAllByRole('textbox')
      .map((input) => input.closest(`.${styles.task}`))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    const firstTask = taskContainers[0];
    const firstRemoveButton = within(firstTask).getByLabelText(/remove pomodoro/i);

    expect(within(firstTask).getAllByTestId('done-pomodoro-icon').length).toBe(1);
    expect(within(firstTask).getAllByTestId('pomodoro-icon').length).toBe(1);

    await user.click(firstRemoveButton);

    expect(within(firstTask).queryAllByTestId('done-pomodoro-icon')).toHaveLength(1);
    expect(within(firstTask).queryAllByTestId('pomodoro-icon')).toHaveLength(0);
  });

  it('adds a globalPomodoro entry when task is marked complete', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 1,
        },
      ],
    });

    const checkbox = await screen.findAllByRole('checkbox');

    await act(async () => {
      await user.click(checkbox[0]);
    });

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('global-pomodoros') || '[]');
      expect(stored.length).toBe(2);
      expect(stored[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          completedAt: expect.any(String),
        })
      );
    });
  });

  it('removes globalPomodoro entry when task is unchecked', async () => {
    const user = userEvent.setup();
    const today = new Date();

    renderWithProvider(<TaskList />, {
      globalPomodoros: [{ id: 'abc', taskId: '1', completedAt: today.toISOString() }],
      tasks: [
        {
          id: '1',
          title: 'Complete Me',
          completed: true,
          pomodoros: 1,
          completedPomodoros: 1,
        },
      ],
    });

    const checkbox = await screen.findAllByRole('checkbox');

    await act(async () => {
      await user.click(checkbox[0]);
    });

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('global-pomodoros') || '[]');
      expect(stored).toEqual([]);
    });
  });

  it('does not remove globalPomodoros from other tasks or days when task is unchecked', async () => {
    const user = userEvent.setup();

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    renderWithProvider(<TaskList />, {
      globalPomodoros: [
        {
          id: 'keep-1',
          taskId: 'other-task',
          completedAt: today.toISOString(),
        },
        {
          id: 'keep-2',
          taskId: '1',
          completedAt: yesterday.toISOString(),
        },
      ],
      tasks: [
        {
          id: '1',
          title: 'Target Task',
          completed: true,
          pomodoros: 1,
          completedPomodoros: 1,
        },
      ],
    });

    const checkbox = await screen.findByRole('checkbox');

    await act(async () => {
      await user.click(checkbox);
    });

    await waitFor(() => {
      const stored: GlobalPomodoro[] = JSON.parse(localStorage.getItem('global-pomodoros') || '[]');
      const ids = stored.map((g) => g.id);

      expect(stored).toHaveLength(2);
      expect(ids).toContain('keep-1');
      expect(ids).toContain('keep-2');
    });
  });

  it('only updates the correct task when adding pomodoro', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Should Stay Same',
          completed: false,
          pomodoros: 3,
          completedPomodoros: 0,
        },
        {
          id: '2',
          title: 'Will Be Updated',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 0,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await user.click(toggleButton);
    }

    const addButtons = screen.getAllByLabelText(/add pomodoro/i);
    await user.click(addButtons[1]);

    const taskContainers = screen
      .getAllByRole('textbox')
      .map((input) => input.closest(`.${styles.task}`))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    const firstTask = within(taskContainers[0]).getAllByTestId('pomodoro-icon');
    const secondTask = within(taskContainers[1]).getAllByTestId('pomodoro-icon');

    expect(firstTask).toHaveLength(3);
    expect(secondTask).toHaveLength(3);
  });

  it('only updates the title of the targeted task', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Leave Me Alone',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 0,
        },
        {
          id: '2',
          title: 'Edit Me',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 0,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await user.click(toggleButton);
    }

    const inputs = screen.getAllByRole('textbox');
    await user.clear(inputs[1]);
    await user.type(inputs[1], 'Edited Title');

    expect(inputs[0]).toHaveValue('Leave Me Alone');
    expect(inputs[1]).toHaveValue('Edited Title');
  });

  it('does not affect other tasks when removing pomodoro', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'Unchanged Task',
          completed: false,
          pomodoros: 2,
          completedPomodoros: 0,
        },
        {
          id: '2',
          title: 'Target Task',
          completed: false,
          pomodoros: 3,
          completedPomodoros: 1,
        },
      ],
    });

    const toggleButton = screen.queryByLabelText(/show all tasks/i);
    if (toggleButton) {
      await user.click(toggleButton);
    }

    const removeButtons = screen.getAllByLabelText(/remove pomodoro/i);
    await user.click(removeButtons[1]);

    const taskContainers = screen
      .getAllByRole('textbox')
      .map((input) => input.closest(`.${styles.task}`))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    expect(within(taskContainers[0]).getAllByTestId('pomodoro-icon')).toHaveLength(2);
    expect(within(taskContainers[1]).getAllByTestId('pomodoro-icon')).toHaveLength(1);
  });

  it('shows only last completed task when all tasks are completed and collapsed', () => {
    renderWithProvider(<TaskList />, {
      tasks: [
        {
          id: '1',
          title: 'First Completed',
          completed: true,
          pomodoros: 2,
          completedPomodoros: 2,
        },
        {
          id: '2',
          title: 'Most Recent Completed',
          completed: true,
          pomodoros: 1,
          completedPomodoros: 1,
        },
      ],
    });

    expect(screen.queryByDisplayValue('First Completed')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Most Recent Completed')).toBeInTheDocument();
  });
});
