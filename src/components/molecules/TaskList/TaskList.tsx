import { useState } from 'react';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { AppIcons } from '../../atoms/Icons/Icons';
import { Input } from '../../atoms/Input/Input';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { Task, UIOnlyTask } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import styles from './TaskList.module.css';

interface TaskListProps {
  onDeleteTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onDeleteTask }) => {
  const { tasks, setTasks, mode, setGlobalPomodoros } = usePomodoroContext();
  const [collapsed, setCollapsed] = useState(false);

  const activeTasks = tasks.filter((t) => !t.completed);
  const lastCompleted = [...tasks].reverse().find((t) => t.completed);

  const visibleTasks =
    tasks.length <= 1 || !collapsed
      ? tasks
      : activeTasks.length > 0
        ? activeTasks.slice(0, 1)
        : lastCompleted && [lastCompleted];

  const toggleTask = (id: string) => {
    const now = new Date().toISOString();
    const task = tasks.find((t) => t.id === id)!;

    const willBeCompleted = !task.completed;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: willBeCompleted,
              completedPomodoros: willBeCompleted
                ? t.pomodoros
                : Math.min(t.completedPomodoros, (t as UIOnlyTask).previousCompletedPomodoros ?? 0),
              ...(willBeCompleted
                ? { previousCompletedPomodoros: t.completedPomodoros }
                : { previousCompletedPomodoros: undefined }),
            }
          : t
      )
    );

    if (willBeCompleted) {
      setGlobalPomodoros((prev) => [
        ...prev,
        ...Array.from({ length: task.pomodoros }, () => ({
          id: uuidv4(),
          completedAt: now,
          taskId: id,
        })),
      ]);
    } else {
      const today = new Date();
      setGlobalPomodoros((prev) => {
        const remaining = [...prev];
        let removed = 0;
        const maxToRemove = task.completedPomodoros;

        return remaining.filter((entry) => {
          const entryDate = new Date(entry.completedAt);
          const isToday =
            entryDate.getFullYear() === today.getFullYear() &&
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getDate() === today.getDate();

          const isFromThisTask = entry.taskId === id;

          if (isToday && isFromThisTask && removed < maxToRemove) {
            removed++;
            return false;
          }

          return true;
        });
      });
    }

    const allCompleted = tasks.every((t) => (t.id === id ? !task.completed : t.completed));
    if (allCompleted) {
      setCollapsed(false);
    }
  };

  const handleDelete = (task: Task) => {
    onDeleteTask(task);
  };

  const addPomodoro = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id && task.pomodoros < 4
          ? { ...task, pomodoros: task.pomodoros + 1, completed: false }
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
      {visibleTasks?.map((task, index) => {
        const checkboxId = `task-${task.id}`;
        const isFirstTask = index === 0 && tasks.length > 1;
        const PomodoroIcon = AppIcons.sparkle;
        const PomodoroDoneIcon = AppIcons.sparkles;

        return (
          <div key={task.id} className={isFirstTask ? styles.taskRowWrapper : undefined}>
            {isFirstTask && (
              <div className={styles.chevronWrapper}>
                <IconButton
                  icon={collapsed ? 'chevronDown' : 'chevronUp'}
                  onClick={() => setCollapsed((c) => !c)}
                  label={collapsed ? 'Show all tasks' : 'Collapse tasks'}
                  size="medium"
                />
              </div>
            )}
            <div className={styles.task}>
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
                onClick={() => handleDelete(task)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
