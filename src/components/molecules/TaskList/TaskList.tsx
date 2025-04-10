import React from "react";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { Text } from "../../atoms/Text/Text";
import { AppIcons } from "../../atoms/Icons/Icons";
import { usePomodoroContext } from "../../../context/PomodoroContext";
import styles from "./TaskList.module.css";

export const TaskList: React.FC = () => {
  const { tasks, setTasks, mode } = usePomodoroContext();

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addPomodoro = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id && task.pomodoros < 4
          ? { ...task, pomodoros: task.pomodoros + 1 }
          : task
      )
    );
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
              <label htmlFor={checkboxId} className={styles.taskContent}>
                <Checkbox
                  id={checkboxId}
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  mode={mode}
                />
                <Text
                  variant="body"
                  className={task.completed ? styles.completed : ""}
                >
                  {task.title}
                </Text>
              </label>

              <div className={styles.pomodoroWrapper}>
                <div className={styles.pomodoroIcons}>
                  {[...Array(task.pomodoros)].map((_, i) => {
                    const Icon =
                      i < (task.completedPomodoros ?? 0)
                        ? PomodoroDoneIcon
                        : PomodoroIcon;
                    return <Icon key={i} size={16} />;
                  })}
                </div>
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
