import React, { useState } from "react";
import styles from "./TaskManager.module.css";
import { TaskInput } from "../../molecules/TaskInput/TaskInput";
import { Button } from "../../atoms/Button/Button";
import { TaskList } from "../../molecules/TaskList/TaskList";
import { usePomodoroContext } from "../../../context/PomodoroContext";
import { v4 as uuidv4 } from "uuid";

export const TaskManager: React.FC = () => {
  const { setTasks, mode } = usePomodoroContext();
  const [inputValue, setInputValue] = useState("");

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

    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <TaskInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          mode={mode}
        />
        <Button onClick={handleAddTask}>Add</Button>
      </div>
      <TaskList />
    </div>
  );
};
