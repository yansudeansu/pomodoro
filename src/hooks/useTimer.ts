import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePomodoroContext } from '../context/PomodoroContext';
import { playAlarm } from '../utils/sound';
import { useWakeLock } from './useWakeLock';

export function calculateRemainingTime(
  targetTime: number | null,
  now: number = Date.now()
): number {
  return Math.round(((targetTime ?? now) - now) / 1000);
}

export const useTimer = () => {
  const {
    isRunning,
    setIsRunning,
    setTimeLeft,
    timeLeft,
    mode,
    setMode,
    pomodoroCount,
    setPomodoroCount,
    incrementCompletedPomodoros,
    setGlobalPomodoros,
  } = usePomodoroContext();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmPlayedRef = useRef(false);
  const pomodoroHandledRef = useRef(false);
  const targetTimeRef = useRef<number | null>(null);
  const { request, release } = useWakeLock({
    onError: (err, type) => console.warn(`[WakeLock ${type}] ${err.message}`),
  });

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const autoSwitchMode = () => {
    if (mode === 'pomodoro') {
      const nextCount = pomodoroCount + 1;
      setPomodoroCount(nextCount);
      setMode(nextCount % 4 === 0 ? 'long_break' : 'short_break');
    } else {
      setMode('pomodoro');
    }
  };

  useEffect(() => {
    clearIntervalRef();

    if (isRunning) {
      request();

      const now = Date.now();
      const duration = timeLeft;
      targetTimeRef.current = now + duration * 1000;

      alarmPlayedRef.current = false;
      pomodoroHandledRef.current = false;

      intervalRef.current = setInterval(() => {
        const remaining = calculateRemainingTime(targetTimeRef.current, Date.now());

        if (remaining <= 0) {
          if (!alarmPlayedRef.current) {
            playAlarm();
            alarmPlayedRef.current = true;
          }

          if (Notification.permission === 'granted') {
            new Notification("Time's up!", {
              body:
                mode === 'pomodoro'
                  ? 'Take a short break!'
                  : 'Ready to focus? Start your next Pomodoro!',
            });
          }

          if (!pomodoroHandledRef.current && mode === 'pomodoro') {
            incrementCompletedPomodoros();

            setGlobalPomodoros((prev) => [
              ...prev,
              {
                id: uuidv4(),
                completedAt: new Date().toISOString(),
              },
            ]);

            pomodoroHandledRef.current = true;
          }

          clearIntervalRef();
          release();
          setTimeLeft(0);
          setIsRunning(false);
          autoSwitchMode();
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    } else {
      release();
    }

    return () => {
      clearIntervalRef();
      release();
    };

    // eslint-disable-next-line react-hooks/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);
};
