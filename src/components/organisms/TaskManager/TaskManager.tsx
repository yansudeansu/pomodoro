import { Button } from '../../atoms/Button/Button';
import { TaskInput } from '../../molecules/TaskInput/TaskInput';
import { TaskList } from '../../molecules/TaskList/TaskList';
import { Task } from '../../../types';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import styles from './TaskManager.module.css';

export interface TaskManagerProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
  onDeleteTask: (task: Task) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  inputValue,
  onInputChange,
  onAddTask,
  onDeleteTask,
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
        <Button onClick={onAddTask} data-testid="add-task-button">
          Add
        </Button>
      </div>
      <TaskList onDeleteTask={onDeleteTask} />
    </div>
  );
};
