import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { PomodoroProvider, usePomodoroContext } from '../../../context/PomodoroContext';
import { TaskList } from './TaskList';
import styles from './TaskList.module.css';

const SetupContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTasks } = usePomodoroContext();

  React.useEffect(() => {
    setTasks([
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
    ]);
  }, [setTasks]);

  return <>{children}</>;
};

const renderWithProvider = (ui: React.ReactElement) =>
  render(
    <PomodoroProvider>
      <SetupContext>{ui}</SetupContext>
    </PomodoroProvider>
  );

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
    },
  };
});

describe('TaskList', () => {
  it('renders tasks', async () => {
    renderWithProvider(<TaskList />);
    expect(await screen.findByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Complete Me')).toBeInTheDocument();
  });

  it('toggles task completion both ways', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />);

    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[1]);
    expect(screen.getByDisplayValue('Complete Me')).not.toHaveClass(styles.completed);

    await user.click(checkboxes[0]);
    expect(screen.getByDisplayValue('Test Task')).toHaveClass(styles.completed);
  });

  it('deletes a task', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />);
    const deleteButtons = screen.getAllByLabelText(/delete task/i);
    await user.click(deleteButtons[0]);
    expect(screen.queryByDisplayValue('Test Task')).not.toBeInTheDocument();
  });

  it('adds a pomodoro to a task with < 4', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />);
    const addButton = screen.getAllByLabelText(/add pomodoro/i)[0];
    await user.click(addButton);
    expect(screen.getAllByTestId('pomodoro-icon')).toHaveLength(2);
  });

  it('does not show add button for task with pomodoros >= 4', () => {
    renderWithProvider(<TaskList />);
    const buttons = screen.getAllByLabelText(/add pomodoro/i);
    expect(buttons.length).toBe(1);
  });

  it('applies completed class conditionally', () => {
    renderWithProvider(<TaskList />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].className).not.toContain(styles.completed);
    expect(inputs[1].className).toContain(styles.completed);
  });

  it('updates task title on input change', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />);
    const input = screen.getByDisplayValue('Test Task');
    await user.clear(input);
    await user.type(input, 'Updated Task');
    expect(input).toHaveValue('Updated Task');
  });

  it('renders completed and incomplete pomodoro icons correctly', () => {
    renderWithProvider(<TaskList />);
    const done = screen.getAllByTestId('done-pomodoro-icon');
    const sparkle = screen.getAllByTestId('pomodoro-icon');

    expect(done.length).toBe(5);
    expect(sparkle.length).toBe(1);
  });

  it('removes a pomodoro from a task with > 1 pomodoro', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TaskList />);

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
});
