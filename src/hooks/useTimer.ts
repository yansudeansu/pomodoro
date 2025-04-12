import { useEffect, useRef } from 'react'
import { usePomodoroContext } from '../context/PomodoroContext'
import { playAlarm } from '../utils/sound'

export function calculateRemainingTime(
  targetTime: number | null,
  now: number = Date.now()
): number {
  return Math.round(((targetTime ?? now) - now) / 1000)
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
  } = usePomodoroContext()

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const alarmPlayedRef = useRef(false)
  const pomodoroHandledRef = useRef(false)
  const targetTimeRef = useRef<number | null>(null)

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const autoSwitchMode = () => {
    if (mode === 'pomodoro') {
      const nextCount = pomodoroCount + 1
      setPomodoroCount(nextCount)
      setMode(nextCount % 4 === 0 ? 'long_break' : 'short_break')
    } else {
      setMode('pomodoro')
    }
  }

  useEffect(() => {
    clearIntervalRef()

    if (isRunning) {
      const now = Date.now()
      const duration = timeLeft
      targetTimeRef.current = now + duration * 1000

      alarmPlayedRef.current = false
      pomodoroHandledRef.current = false

      intervalRef.current = setInterval(() => {
        const remaining = calculateRemainingTime(targetTimeRef.current, Date.now())

        if (remaining <= 0) {
          if (!alarmPlayedRef.current) {
            playAlarm()
            alarmPlayedRef.current = true
          }

          if (!pomodoroHandledRef.current && mode === 'pomodoro') {
            incrementCompletedPomodoros()
            pomodoroHandledRef.current = true
          }

          clearIntervalRef()
          setTimeLeft(0)
          setIsRunning(false)
          autoSwitchMode()
          return
        }

        setTimeLeft(remaining)
      }, 1000)
    }

    return clearIntervalRef
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning])
}
