import React, { useState } from 'react';
import styles from './PomodoroPage.module.css';
import { PomodoroTimer } from '../../organisms/PomodoroTimer/PomodoroTimer';
import { TaskManager } from '../../organisms/TaskManager/TaskManager';
import { Header } from '../../atoms/Header/Header';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { v4 as uuidv4 } from 'uuid';
import { PomodorosToday } from '../../molecules/PomodorosToday/PomodorosToday';

export const PomodoroPage: React.FC = () => {
  const { setTasks, mode } = usePomodoroContext();
  const [inputValue, setInputValue] = useState('');

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
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTask();
  };

  return (
    <>
      <Header />
      <main className={`${styles.page} ${styles[mode]}`}>
        <PomodoroTimer />
        <PomodorosToday />
        <TaskManager
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
          onAddTask={handleAddTask}
          onKeyDown={handleKeyDown}
        />
      </main>
    </>
  );
};
