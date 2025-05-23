import React from 'react';
import styles from './TimerControls.module.css';
import { Button } from '../../atoms/Button/Button';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { playStartSound } from '../../../utils/sound';
import { requestNotificationPermission } from '../../../utils/notifications';

export const TimerControls: React.FC = () => {
  const { isRunning, setIsRunning, tasks, setActiveTaskId, skipCycle } = usePomodoroContext();

  const handleStartPause = () => {
    if (!isRunning) {
      requestNotificationPermission();
      playStartSound();

      const firstUnfinished = tasks.find((task) => task.completedPomodoros < task.pomodoros);

      if (firstUnfinished) {
        setActiveTaskId(firstUnfinished.id);
      }
    }

    setIsRunning(!isRunning);
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleStartPause} size="large" variant={isRunning ? 'active' : 'default'}>
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <IconButton icon="skip" onClick={skipCycle} size="big" label="Skip ahead" />
    </div>
  );
};
