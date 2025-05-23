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
  const MoreHorizontal = () => <svg data-testid="more-horizontal" />;
  const Close = () => <svg data-testid="close-icon" />;

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
      moreHorizontal: MoreHorizontal,
      close: Close,
    },
  };
});

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders tasks', async () => {
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    const onDeleteTask = vi.fn();

    renderWithProvider(<TaskList onDeleteTask={onDeleteTask} />, {
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

    expect(onDeleteTask).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', title: 'Test Task' })
    );
  });

  it('adds a pomodoro to a task with < 4', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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

  it('applies completed class conditionally', async () => {
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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

    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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

    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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

  it('shows only last completed task when all tasks are completed and collapsed', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
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

    const toggle = await screen.findByLabelText(/collapse tasks/i);
    await user.click(toggle);

    expect(screen.queryByDisplayValue('First Completed')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Most Recent Completed')).toBeInTheDocument();
  });

  it('shows only one active task when collapsed and there are multiple active tasks', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
      tasks: [
        { id: '1', title: 'First', completed: false, pomodoros: 1, completedPomodoros: 0 },
        { id: '2', title: 'Second', completed: false, pomodoros: 1, completedPomodoros: 0 },
        { id: '3', title: 'Third', completed: true, pomodoros: 1, completedPomodoros: 1 },
      ],
    });

    const toggle = screen.queryByLabelText(/collapse tasks/i);
    if (toggle) {
      await user.click(toggle);
    }

    expect(screen.getByDisplayValue('First')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Second')).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue('Third')).not.toBeInTheDocument();
  });

  it('opens and interacts with modal actions on mobile', async () => {
    const user = userEvent.setup();

    vi.resetModules();
    vi.doMock('../../../hooks/useMediaQuery', () => ({
      useMediaQuery: () => true,
    }));

    const { TaskList } = await import('./TaskList');
    const { PomodoroProvider } = await import('../../../context/PomodoroContext');
    const { render, screen, within } = await import('@testing-library/react');

    const tasks = [
      {
        id: '1',
        title: 'Mobile Task',
        completed: false,
        pomodoros: 2,
        completedPomodoros: 1,
      },
    ];

    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
    localStorage.setItem('global-pomodoros', JSON.stringify([]));

    const onDeleteTask = vi.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PomodoroProvider>{children}</PomodoroProvider>
    );

    const { unmount } = render(<TaskList onDeleteTask={onDeleteTask} />, { wrapper });

    const moreBtn = await screen.findByLabelText(/more options/i);
    await user.click(moreBtn);

    const backdrop = await screen.findByTestId('modal-backdrop');
    const modal = within(backdrop);
    const modalTitle = modal.getByText('Mobile Task');
    expect(modalTitle).toBeInTheDocument();

    const addButton = modal.getByLabelText(/add pomodoro/i);
    await user.click(addButton);
    expect(modal.getAllByTestId('pomodoro-icon')).toHaveLength(2);

    const removeButton = modal.getByLabelText(/remove pomodoro/i);
    await user.click(removeButton);
    expect(modal.getAllByTestId('pomodoro-icon')).toHaveLength(1);

    const deleteButton = modal.getByRole('button', { name: /delete task/i });
    await user.click(deleteButton);

    expect(onDeleteTask).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));

    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument();

    unmount();
  });

  it('does not render modal content if task is not found', async () => {
    const user = userEvent.setup();

    vi.resetModules();
    vi.doMock('../../../hooks/useMediaQuery', () => ({
      useMediaQuery: () => true,
    }));

    const { TaskList } = await import('./TaskList');
    const { PomodoroProvider, usePomodoroContext } = await import(
      '../../../context/PomodoroContext'
    );
    const { render, screen } = await import('@testing-library/react');

    const ghostTask = {
      id: 'ghost-task',
      title: 'Ghost Task',
      completed: false,
      pomodoros: 2,
      completedPomodoros: 1,
    };

    localStorage.setItem('pomodoro-tasks', JSON.stringify([ghostTask]));
    localStorage.setItem('global-pomodoros', JSON.stringify([]));

    const Wrapper = () => {
      const { setTasks } = usePomodoroContext();

      React.useEffect(() => {
        setTimeout(() => {
          act(() => {
            setTasks([]);
          });
        }, 100);
        // eslint-disable-next-line react-hooks/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <TaskList onDeleteTask={() => {}} />;
    };

    render(
      <PomodoroProvider>
        <Wrapper />
      </PomodoroProvider>
    );

    const moreBtn = await screen.findByLabelText(/more options/i);
    await user.click(moreBtn);

    await new Promise((r) => setTimeout(r, 300));

    expect(screen.queryByText('Ghost Task')).not.toBeInTheDocument();
    expect(document.querySelector(`.${styles.modalContent}`)).toBeNull();
  });

  it('closes the modal via the close icon button', async () => {
    const user = userEvent.setup();

    vi.resetModules();
    vi.doMock('../../../hooks/useMediaQuery', () => ({
      useMediaQuery: () => true,
    }));

    const { TaskList } = await import('./TaskList');
    const { PomodoroProvider } = await import('../../../context/PomodoroContext');
    const { render, screen } = await import('@testing-library/react');

    const tasks = [
      {
        id: '1',
        title: 'Modal Close Test Task',
        completed: false,
        pomodoros: 2,
        completedPomodoros: 1,
      },
    ];

    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
    localStorage.setItem('global-pomodoros', JSON.stringify([]));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PomodoroProvider>{children}</PomodoroProvider>
    );

    render(<TaskList onDeleteTask={() => {}} />, { wrapper });

    const moreBtn = await screen.findByLabelText(/more options/i);
    await user.click(moreBtn);

    const closeBtn = await screen.findByTestId('modal-close-button');
    await user.click(closeBtn);

    await waitFor(() => {
      const modalContent = document.querySelector(`.${styles.modalContent}`);
      expect(modalContent).not.toBeInTheDocument();
    });
  });

  it('closes the modal via the modal overlay (onClose prop)', async () => {
    const user = userEvent.setup();

    vi.resetModules();
    vi.doMock('../../../hooks/useMediaQuery', () => ({
      useMediaQuery: () => true,
    }));

    const { TaskList } = await import('./TaskList');
    const { PomodoroProvider } = await import('../../../context/PomodoroContext');
    const { render, screen, fireEvent } = await import('@testing-library/react');

    const tasks = [
      {
        id: '1',
        title: 'Overlay Close Task',
        completed: false,
        pomodoros: 2,
        completedPomodoros: 1,
      },
    ];

    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
    localStorage.setItem('global-pomodoros', JSON.stringify([]));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PomodoroProvider>{children}</PomodoroProvider>
    );

    render(<TaskList onDeleteTask={() => {}} />, { wrapper });

    const moreBtn = await screen.findByLabelText(/more options/i);
    await user.click(moreBtn);

    const backdrop = await screen.findByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    if (backdrop) {
      fireEvent.click(backdrop);
    } else {
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    }

    await waitFor(() => {
      const modalContent = document.querySelector(`.${styles.modalContent}`);
      expect(modalContent).not.toBeInTheDocument();
    });
  });

  it('renders checkbox with accessible label', () => {
    renderWithProvider(<TaskList onDeleteTask={() => {}} />, {
      tasks: [
        {
          id: '1',
          title: 'Label Test Task',
          completed: false,
          pomodoros: 1,
          completedPomodoros: 0,
        },
      ],
    });

    const checkbox = screen.getByRole('checkbox', { name: 'Label Test Task' });
    expect(checkbox).toBeInTheDocument();
  });
});
