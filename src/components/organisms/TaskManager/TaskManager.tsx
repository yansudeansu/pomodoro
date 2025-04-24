import React from 'react';
import styles from './TaskManager.module.css';
import { TaskInput } from '../../molecules/TaskInput/TaskInput';
import { Button } from '../../atoms/Button/Button';
import { TaskList } from '../../molecules/TaskList/TaskList';
import { usePomodoroContext } from '../../../context/PomodoroContext';

export interface TaskManagerProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  inputValue,
  onInputChange,
  onAddTask,
  onKeyDown,
}) => {
  const { mode } = usePomodoroContext();

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <TaskInput
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder="Add a new task..."
          mode={mode}
        />
        <Button onClick={onAddTask}>Add</Button>
      </div>
      <TaskList />
    </div>
  );
};
