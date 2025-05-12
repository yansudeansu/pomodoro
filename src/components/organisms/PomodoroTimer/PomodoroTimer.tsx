import React from 'react';
import styles from './PomodoroTimer.module.css';
import { ModeSwitcher } from '../../molecules/ModeSwitcher/ModeSwitcher';
import { TimerControls } from '../../molecules/TimerControls/TimerControls';
import { TimerDisplay } from '../../atoms/TimerDisplay/TimerDisplay';
import { ProgressRing } from '../../atoms/ProgressRing/ProgressRing';
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

  const duration = mode === 'pomodoro' ? 1500 : mode === 'short_break' ? 300 : 900;
  const progress = 1 - timeLeft / duration;

  return (
    <div className={styles.container}>
      <ModeSwitcher />

      <div className={styles.titleRow}>
        <Text variant="label">{modeLabel}</Text>
        <InfoTooltip />
      </div>

      <ProgressRing radius={120} stroke={6} progress={progress}>
        <TimerDisplay time={timeLeft} />
      </ProgressRing>

      <TimerControls />
    </div>
  );
};
