import { describe, it, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PomodoroProvider, usePomodoroContext } from './PomodoroContext';

const TestComponent = () => {
  const {
    mode,
    setMode,
    isRunning,
    setIsRunning,
    timeLeft,
    setTimeLeft,
    resetTimer,
    tasks,
    setTasks,
    pomodoroCount,
    setPomodoroCount,
    activeTaskId,
    setActiveTaskId,
    incrementCompletedPomodoros,
  } = usePomodoroContext();

  return (
    <div>
      <div data-testid="mode">mode: {mode}</div>
      <div data-testid="is-running">isRunning: {isRunning ? 'true' : 'false'}</div>
      <div data-testid="time-left">timeLeft: {timeLeft}</div>
      <div data-testid="tasks-count">tasks: {tasks.length}</div>
      <div data-testid="pomodoro-count">count: {pomodoroCount}</div>
      <div data-testid="active-task-id">activeTaskId: {activeTaskId ?? 'none'}</div>
      <div data-testid="completed-pomodoros">
        completedPomodoros: {tasks[0]?.completedPomodoros ?? 0}
      </div>

      <button onClick={() => setMode('short_break')}>Set Short Break</button>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setTimeLeft(999)}>Set Time</button>
      <button
        onClick={() =>
          setTasks((prev) => [
            ...prev,
            {
              id: (prev.length + 1).toString(),
              title: `test ${prev.length + 1}`,
              completed: false,
              pomodoros: 2,
              completedPomodoros: 0,
            },
          ])
        }
      >
        Add Task
      </button>
      <button onClick={() => setPomodoroCount(3)}>Set Count</button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={() => setActiveTaskId('1')}>Set Active Task</button>
      <button onClick={incrementCompletedPomodoros}>Increment Pomodoro</button>
      <button
        data-testid="test-incomplete-completion"
        onClick={() => {
          setTasks([
            {
              id: '1',
              title: 'Incomplete task',
              completed: false,
              pomodoros: 3,
              completedPomodoros: 2,
            },
          ]);
          setActiveTaskId('1');
        }}
      >
        Set Incomplete Task
      </button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <PomodoroProvider>
      <TestComponent />
    </PomodoroProvider>
  );

describe('PomodoroContext', () => {
  it('provides default values', () => {
    renderWithProvider();
    expect(screen.getByTestId('mode')).toHaveTextContent('mode: pomodoro');
    expect(screen.getByTestId('is-running')).toHaveTextContent('isRunning: false');
    expect(screen.getByTestId('time-left')).toHaveTextContent('timeLeft: 1500');
    expect(screen.getByTestId('tasks-count')).toHaveTextContent('tasks: 0');
    expect(screen.getByTestId('pomodoro-count')).toHaveTextContent('count: 0');
    expect(screen.getByTestId('active-task-id')).toHaveTextContent('activeTaskId: none');
  });

  it('updates mode and resets timer', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Set Short Break/i));
    expect(screen.getByTestId('mode')).toHaveTextContent('mode: short_break');
    expect(screen.getByTestId('time-left')).toHaveTextContent('timeLeft: 300');
  });

  it('sets isRunning state', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Start/i));
    expect(screen.getByTestId('is-running')).toHaveTextContent('isRunning: true');
  });

  it('sets timeLeft manually', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Set Time/i));
    expect(screen.getByTestId('time-left')).toHaveTextContent('timeLeft: 999');
  });

  it('adds tasks to context', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Add Task/i));
    expect(screen.getByTestId('tasks-count')).toHaveTextContent('tasks: 1');
  });

  it('sets pomodoro count', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Set Count/i));
    expect(screen.getByTestId('pomodoro-count')).toHaveTextContent('count: 3');
  });

  it('resets timer according to current mode', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Set Short Break/i));
    await user.click(screen.getByText(/Reset/i));
    expect(screen.getByTestId('time-left')).toHaveTextContent('timeLeft: 300');
    expect(screen.getByTestId('is-running')).toHaveTextContent('isRunning: false');
  });

  it('sets activeTaskId and increments completedPomodoros', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText(/Add Task/i));
    await user.click(screen.getByText(/Set Active Task/i));
    await act(async () => {
      await user.click(screen.getByText(/Increment Pomodoro/i));
    });

    expect(screen.getByTestId('active-task-id')).toHaveTextContent('activeTaskId: 1');
    expect(screen.getByTestId('completed-pomodoros')).toHaveTextContent('completedPomodoros: 1');
  });

  it('throws if usePomodoroContext is used outside of PomodoroProvider', () => {
    const FaultyComponent = () => {
      usePomodoroContext();
      return <div />;
    };

    expect(() => render(<FaultyComponent />)).toThrow(/must be used within PomodoroProvider/i);
  });

  it('handles malformed localStorage data gracefully', () => {
    localStorage.setItem('pomodoro-tasks', '{not-valid-json');

    renderWithProvider();

    expect(screen.getByTestId('tasks-count')).toHaveTextContent('tasks: 0');
  });

  it('does not complete the task if completedPomodoros is still less than pomodoros', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId('test-incomplete-completion'));
    await user.click(screen.getByText(/Increment Pomodoro/i));

    expect(screen.getByTestId('completed-pomodoros')).toHaveTextContent('completedPomodoros: 3');
  });

  it('initializes globalPomodoros from localStorage and persists changes', async () => {
    const fakeDate = new Date().toISOString();
    localStorage.setItem(
      'global-pomodoros',
      JSON.stringify([{ id: 'abc', completedAt: fakeDate }])
    );

    const TestGlobalPomodoroComponent = () => {
      const { globalPomodoros, setGlobalPomodoros } = usePomodoroContext();

      return (
        <div>
          <div data-testid="initial-id">{globalPomodoros[0]?.id}</div>
          <button
            onClick={() =>
              setGlobalPomodoros((prev) => [...prev, { id: 'def', completedAt: fakeDate }])
            }
          >
            Add Pomodoro
          </button>
        </div>
      );
    };

    render(
      <PomodoroProvider>
        <TestGlobalPomodoroComponent />
      </PomodoroProvider>
    );

    expect(screen.getByTestId('initial-id')).toHaveTextContent('abc');

    const user = userEvent.setup();
    await user.click(screen.getByText('Add Pomodoro'));

    const stored = JSON.parse(localStorage.getItem('global-pomodoros') || '[]');
    expect(stored).toHaveLength(2);
    expect(stored[1].id).toBe('def');
  });

  it('handles malformed globalPomodoros data gracefully', () => {
    localStorage.setItem('global-pomodoros', '{invalid-json');

    const GlobalTestComponent = () => {
      const { globalPomodoros } = usePomodoroContext();
      return <div data-testid="global-count">{globalPomodoros.length}</div>;
    };

    render(
      <PomodoroProvider>
        <GlobalTestComponent />
      </PomodoroProvider>
    );

    expect(screen.getByTestId('global-count')).toHaveTextContent('0');
  });
});
