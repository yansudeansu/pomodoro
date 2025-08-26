import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTaskManager } from './useTaskManager';
import { PomodoroProvider } from '../context/PomodoroContext';
import type { Task } from '../types';

const changeEvent = (value: string): React.ChangeEvent<HTMLInputElement> =>
  ({ target: { value } }) as unknown as React.ChangeEvent<HTMLInputElement>;

const keyEvent = (key: string): React.KeyboardEvent<HTMLInputElement> =>
  ({ key }) as unknown as React.KeyboardEvent<HTMLInputElement>;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PomodoroProvider>{children}</PomodoroProvider>
);

describe('useTaskManager', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.removeItem('pomodoro-tasks');
    localStorage.removeItem('global-pomodoros');
  });

  it('initializes with empty input value and no toast', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    expect(result.current.inputValue).toBe('');
    expect(result.current.toast).toBeNull();
  });

  it('handles input change', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('New task'));
    });

    expect(result.current.inputValue).toBe('New task');
  });

  it('adds a task when input is not empty', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('New task'));
    });

    act(() => {
      result.current.handleAddTask();
    });

    expect(result.current.inputValue).toBe('');
    expect(localStorage.getItem('pomodoro-tasks') ?? '').toContain('New task');
  });

  it('does not add task when input is empty', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    const before = localStorage.getItem('pomodoro-tasks');

    act(() => {
      result.current.handleAddTask();
    });

    expect(result.current.inputValue).toBe('');
    expect(localStorage.getItem('pomodoro-tasks')).toBe(before);
  });

  it('shows toast when adding more than 16 tasks', async () => {
    vi.useRealTimers();
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    for (const i of [...Array(17).keys()]) {
      act(() => {
        result.current.handleInputChange(changeEvent(`Task ${i}`));
      });
      act(() => {
        result.current.handleAddTask();
      });
    }

    await Promise.resolve();

    expect(result.current.toast).not.toBeNull();
    expect(result.current.toast?.message).toContain("That's a lot!");

    act(() => {
      result.current.toast?.onClose?.();
    });
    expect(result.current.toast).toBeNull();
  });

  it('handles delete task with undo functionality', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('Task to delete'));
      result.current.handleAddTask();
    });

    const task: Task = {
      id: 'test-id',
      title: 'Task to delete',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    act(() => {
      result.current.handleDeleteTask(task);
    });

    expect(result.current.toast).toBeTruthy();
    expect(result.current.toast?.message).toContain('Task "Task to delete" deleted');
    expect(result.current.toast?.actionLabel).toBe('Undo');
  });

  it('handles key down for Enter key', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('Task on Enter'));
    });

    act(() => {
      result.current.handleKeyDown(keyEvent('Enter'));
    });

    expect(result.current.inputValue).toBe('');
    expect(localStorage.getItem('pomodoro-tasks') ?? '').toContain('Task on Enter');
  });

  it('does not add task on non-Enter key', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('Task on Space'));
    });

    act(() => {
      result.current.handleKeyDown(keyEvent(' '));
    });

    expect(result.current.inputValue).toBe('Task on Space');
  });

  it('auto-hides toast after 5 seconds', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    const task: Task = {
      id: 'test-id',
      title: 'Task to delete',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    act(() => {
      result.current.handleDeleteTask(task);
    });

    expect(result.current.toast).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.toast).toBeNull();
  });

  it('clears timeout ref when showToast is called again', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.setToast({ message: 'first' });
    });

    act(() => {
      result.current.handleInputChange(changeEvent('Task A'));
      for (let i = 0; i < 17; i++) {
        result.current.handleAddTask();
      }
    });

    expect(result.current.toast).not.toBeNull();
  });

  it('restores task on undo action', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('Undo Task'));
      result.current.handleAddTask();
    });

    const task: Task = {
      id: 'test-id',
      title: 'Undo Task',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    act(() => {
      result.current.handleDeleteTask(task);
    });

    expect(result.current.toast?.actionLabel).toBe('Undo');

    act(() => {
      result.current.toast?.onAction?.();
    });

    expect(localStorage.getItem('pomodoro-tasks') ?? '').toContain('Undo Task');
    expect(result.current.toast).toBeNull();
  });

  it('calls onClose of delete toast', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });

    act(() => {
      result.current.handleInputChange(changeEvent('To be deleted'));
      result.current.handleAddTask();
    });

    const task: Task = {
      id: 'test-id',
      title: 'To be deleted',
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    act(() => {
      result.current.handleDeleteTask(task);
    });

    expect(result.current.toast).not.toBeNull();

    act(() => {
      result.current.toast?.onClose?.();
    });

    expect(result.current.toast).toBeNull();
  });
});
