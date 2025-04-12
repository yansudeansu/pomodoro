import React from 'react';
import styles from './PomodoroTimer.module.css';
import { ModeSwitcher } from '../../molecules/ModeSwitcher/ModeSwitcher';
import { TimerControls } from '../../molecules/TimerControls/TimerControls';
import { TimerDisplay } from '../../atoms/TimerDisplay/TimerDisplay';
import { Text } from '../../atoms/Text/Text';
import { InfoTooltip } from '../../molecules/InfoTooltip/InfoTooltip';
import { usePomodoroContext } from '../../../context/PomodoroContext';
import { useTimer } from '../../../hooks/useTimer';

export const PomodoroTimer: React.FC = () => {
  useTimer();

  const { timeLeft, mode } = usePomodoroContext();

  const modeLabel = {
    pomodoro: 'Pomodoro',
    short_break: 'Short Break',
    long_break: 'Long Break',
  }[mode];

  return (
    <div className={styles.container}>
      <ModeSwitcher />

      <div className={styles.titleRow}>
        <Text variant="label">{modeLabel}</Text>
        <InfoTooltip />
      </div>

      <TimerDisplay time={timeLeft} />
      <TimerControls />
    </div>
  );
};
