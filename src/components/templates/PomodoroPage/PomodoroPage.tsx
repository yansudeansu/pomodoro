import React from "react";
import styles from "./PomodoroPage.module.css";
import { PomodoroTimer } from "../../organisms/PomodoroTimer/PomodoroTimer";
import { TaskManager } from "../../organisms/TaskManager/TaskManager";
import { usePomodoroContext } from "../../../context/PomodoroContext";

export const PomodoroPage: React.FC = () => {
  const { mode } = usePomodoroContext();

  return (
    <main className={`${styles.page} ${styles[mode]}`}>
      <PomodoroTimer />
      <TaskManager />
    </main>
  );
};
