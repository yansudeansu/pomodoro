import React from "react";
import styles from "./PomodoroPage.module.css";
import { PomodoroTimer } from "../../organisms/PomodoroTimer/PomodoroTimer";
import { TaskManager } from "../../organisms/TaskManager/TaskManager";
import { Header } from "../../atoms/Header/Header";
import { usePomodoroContext } from "../../../context/PomodoroContext";

export const PomodoroPage: React.FC = () => {
  const { mode } = usePomodoroContext();

  return (
    <>
      <Header />
      <main className={`${styles.page} ${styles[mode]}`}>
        <PomodoroTimer />
        <TaskManager />
      </main>
    </>
  );
};
