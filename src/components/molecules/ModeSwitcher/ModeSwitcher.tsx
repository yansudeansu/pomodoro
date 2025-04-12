import React from 'react';
import styles from './ModeSwitcher.module.css';
import { Button } from '../../atoms/Button/Button';
import { usePomodoroContext } from '../../../context/PomodoroContext';

const modes = ['pomodoro', 'short_break', 'long_break'] as const;

export const ModeSwitcher: React.FC = () => {
  const { mode, setMode } = usePomodoroContext();

  return (
    <div className={styles.container}>
      {modes.map((m) => (
        <Button key={m} onClick={() => setMode(m)} variant={mode === m ? 'active' : 'default'}>
          {m.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
        </Button>
      ))}
    </div>
  );
};
