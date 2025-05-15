import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalPomodoro, Mode, Task } from '../types';

export interface PomodoroContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  resetTimer: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  pomodoroCount: number;
  setPomodoroCount: React.Dispatch<React.SetStateAction<number>>;
  activeTaskId: string | null;
  setActiveTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  incrementCompletedPomodoros: () => void;
  globalPomodoros: GlobalPomodoro[];
  setGlobalPomodoros: React.Dispatch<React.SetStateAction<GlobalPomodoro[]>>;
  skipCycle: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

const MODE_DEFAULTS: Record<Mode, number> = {
  pomodoro: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60,
};

const TASKS_STORAGE_KEY = 'pomodoro-tasks';

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MODE_DEFAULTS['pomodoro']);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [globalPomodoros, setGlobalPomodoros] = useState<GlobalPomodoro[]>(() => {
    const stored = localStorage.getItem('global-pomodoros');
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const resetTimer = () => {
    setTimeLeft(MODE_DEFAULTS[mode]);
    setIsRunning(false);
  };

  const handleSetMode = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODE_DEFAULTS[newMode]);
    setIsRunning(false);
  };

  const skipCycle = () => {
    if (mode === 'pomodoro') {
      incrementCompletedPomodoros();
      setGlobalPomodoros((prev) => [
        ...prev,
        {
          id: uuidv4(),
          completedAt: new Date().toISOString(),
        },
      ]);
    }

    const nextCount = mode === 'pomodoro' ? pomodoroCount + 1 : pomodoroCount;
    setPomodoroCount(nextCount);

    const nextMode =
      mode === 'pomodoro' ? (nextCount % 4 === 0 ? 'long_break' : 'short_break') : 'pomodoro';

    setMode(nextMode);
    setTimeLeft(MODE_DEFAULTS[nextMode]);
    setIsRunning(false);
  };

  const incrementCompletedPomodoros = () => {
    if (!activeTaskId) return;

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== activeTaskId) return task;

        const newCompleted = task.completedPomodoros + 1;
        const isNowFullyComplete = newCompleted >= task.pomodoros;

        return {
          ...task,
          completedPomodoros: newCompleted,
          completed: isNowFullyComplete ? true : task.completed,
        };
      })
    );
  };

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('global-pomodoros', JSON.stringify(globalPomodoros));
  }, [globalPomodoros]);

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        setMode: handleSetMode,
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
        globalPomodoros,
        setGlobalPomodoros,
        skipCycle,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoroContext must be used within PomodoroProvider');
  }
  return context;
};
