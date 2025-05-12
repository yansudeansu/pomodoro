import React from 'react';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { AppIcons } from '../../atoms/Icons/Icons';
import { Input } from '../../atoms/Input/Input';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { UIOnlyTask } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import styles from './TaskList.module.css';

export const TaskList: React.FC = () => {
  const { tasks, setTasks, mode, setGlobalPomodoros } = usePomodoroContext();

  const toggleTask = (id: string) => {
    const now = new Date().toISOString();

    let shouldAddToGlobal = false;
    let shouldRemoveFromGlobal = false;

    setTasks((prev) =>
      prev.map((task) => {
        const t = task as UIOnlyTask;
        if (t.id !== id) return t;

        const willBeCompleted = !t.completed;
        if (willBeCompleted) {
          shouldAddToGlobal = true;
        } else {
          shouldRemoveFromGlobal = true;
        }

        return {
          ...t,
          completed: willBeCompleted,
          completedPomodoros: willBeCompleted
            ? t.pomodoros
            : Math.min(t.completedPomodoros, t.previousCompletedPomodoros ?? 0),
          previousCompletedPomodoros: willBeCompleted ? t.completedPomodoros : undefined,
        };
      })
    );

    if (shouldAddToGlobal) {
      setGlobalPomodoros((prev) => [...prev, { id: uuidv4(), completedAt: now }]);
    } else if (shouldRemoveFromGlobal) {
      setGlobalPomodoros((prevStats) =>
        prevStats.filter((entry) => {
          const entryDate = new Date(entry.completedAt);
          const isToday =
            entryDate.getFullYear() === new Date().getFullYear() &&
            entryDate.getMonth() === new Date().getMonth() &&
            entryDate.getDate() === new Date().getDate();
          return !isToday;
        })
      );
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addPomodoro = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id && task.pomodoros < 4
          ? {
              ...task,
              pomodoros: task.pomodoros + 1,
              completed: false,
            }
          : task
      )
    );
  };

  const removePomodoro = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id || task.pomodoros <= 1) return task;

        const newPomodoros = task.pomodoros - 1;

        return {
          ...task,
          pomodoros: newPomodoros,
          completedPomodoros: Math.min(task.completedPomodoros, newPomodoros),
          completed: false,
        };
      })
    );
  };

  const handleTitleChange = (id: string, value: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, title: value } : task)));
  };

  return (
    <div className={styles.list}>
      {tasks.map((task) => {
        const checkboxId = `task-${task.id}`;
        const PomodoroIcon = AppIcons.sparkle;
        const PomodoroDoneIcon = AppIcons.sparkles;

        return (
          <div key={task.id} className={styles.task}>
            <div className={styles.left}>
              <div className={styles.taskContent}>
                <Checkbox
                  id={checkboxId}
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  mode={mode}
                />
                <Input
                  value={task.title}
                  size={task.title.length || 1}
                  onChange={(e) => handleTitleChange(task.id, e.target.value)}
                  borderless
                  className={task.completed ? styles.completed : ''}
                />
              </div>

              <div className={styles.pomodoroWrapper}>
                <div className={styles.pomodoroIcons}>
                  {[...Array(task.pomodoros)].map((_, i) => {
                    const Icon =
                      task.completed || i < task.completedPomodoros
                        ? PomodoroDoneIcon
                        : PomodoroIcon;
                    return <Icon key={i} size={16} />;
                  })}
                </div>
                {task.pomodoros > 1 && (
                  <IconButton
                    icon="remove"
                    label="Remove pomodoro"
                    size="small"
                    variant="danger"
                    onClick={() => removePomodoro(task.id)}
                  />
                )}
                {task.pomodoros < 4 && (
                  <IconButton
                    icon="add"
                    label="Add pomodoro"
                    size="small"
                    variant="success"
                    onClick={() => addPomodoro(task.id)}
                  />
                )}
              </div>
            </div>

            <IconButton
              icon="trash"
              label="Delete task"
              size="small"
              variant="danger"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        );
      })}
    </div>
  );
};
