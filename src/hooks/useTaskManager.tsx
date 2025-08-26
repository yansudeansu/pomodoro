import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePomodoroContext } from '../context/PomodoroContext';
import { Task } from '../types';
import { ToastProps } from '../components/atoms/Toast/Toast';

export const useTaskManager = () => {
  const { setTasks } = usePomodoroContext();
  const [inputValue, setInputValue] = useState('');
  const [toast, setToast] = useState<null | ToastProps>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deleteIndexRef = useRef<number>(-1);

  const clearToastTimeout = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
  };

  const showToast = (toastProps: ToastProps, autoHide = true) => {
    clearToastTimeout();
    setToast(toastProps);

    if (autoHide) {
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
        toastTimeoutRef.current = null;
      }, 5000);
    }
  };

  const handleAddTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTask = {
      id: uuidv4(),
      title: trimmed,
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0,
    };

    setTasks((prev) => {
      const updated = [...prev, newTask];

      if (updated.length > 16) {
        showToast({
          message:
            "That's a lot! A full focus day usually includes 10-16 Pomodoros. Are you sure you want this many?",
          onClose: () => {
            clearToastTimeout();
            setToast(null);
          },
        });
      }

      return updated;
    });

    setInputValue('');
  };

  const handleDeleteTask = (task: Task) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === task.id);
      deleteIndexRef.current = index;
      return prev.filter((t) => t.id !== task.id);
    });

    showToast({
      message: `Task "${task.title}" deleted`,
      actionLabel: 'Undo',
      onAction: () => {
        clearToastTimeout();
        setTasks((current) => {
          const before = current.slice(0, deleteIndexRef.current);
          const after = current.slice(deleteIndexRef.current);
          return [...before, task, ...after];
        });
        setToast(null);
      },
      onClose: () => {
        clearToastTimeout();
        setToast(null);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTask();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    toast,
    handleAddTask,
    handleDeleteTask,
    handleKeyDown,
    handleInputChange,
    setToast,
  };
};
