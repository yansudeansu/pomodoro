import React, { useRef, useState } from 'react';
import styles from './PomodoroPage.module.css';
import { Header } from '../../atoms/Header/Header';
import { Toast, ToastProps } from '../../atoms/Toast/Toast';
import { PomodorosToday } from '../../molecules/PomodorosToday/PomodorosToday';
import { PomodoroTimer } from '../../organisms/PomodoroTimer/PomodoroTimer';
import { TaskManager } from '../../organisms/TaskManager/TaskManager';
import { WeeklyChart } from '../../molecules/WeeklyChart/WeeklyChart';
import { getWeeklySummary } from '../../../utils/dates';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { Task } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

export const PomodoroPage: React.FC = () => {
  const { setTasks, mode, globalPomodoros } = usePomodoroContext();
  const [inputValue, setInputValue] = useState('');
  const [toast, setToast] = useState<null | ToastProps>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deleteIndexRef = useRef<number>(-1);
  const [showChart, setShowChart] = useState(false);

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
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

        setToast({
          message:
            'That’s a lot! A full focus day usually includes 10–16 Pomodoros. Are you sure you want this many?',
          onClose: () => {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
            setToast(null);
          },
        });

        toastTimeoutRef.current = setTimeout(() => {
          setToast(null);
          toastTimeoutRef.current = null;
        }, 5000);
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

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 5000);

    setToast({
      message: `Task "${task.title}" deleted`,
      actionLabel: 'Undo',
      onAction: () => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setTasks((current) => {
          const before = current.slice(0, deleteIndexRef.current);
          const after = current.slice(deleteIndexRef.current);
          return [...before, task, ...after];
        });
        setToast(null);
      },
      onClose: () => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToast(null);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTask();
  };

  return (
    <>
      {toast && <Toast {...toast} />}
      <Header onChartClick={() => setShowChart((prev) => !prev)} />
      {showChart && (
        <div className={styles.chartWrapper}>
          <WeeklyChart
            data={getWeeklySummary(globalPomodoros).map((d) => ({
              name: d.date.toLocaleDateString(undefined, { weekday: 'short' }),
              Pomodoros: d.count,
            }))}
          />
        </div>
      )}
      <main className={`${styles.page} ${styles[mode]}`}>
        <PomodoroTimer />
        <PomodorosToday />
        <TaskManager
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onKeyDown={handleKeyDown}
        />
      </main>
    </>
  );
};
