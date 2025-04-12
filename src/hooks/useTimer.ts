import { useEffect, useRef } from 'react'
import { usePomodoroContext } from '../context/PomodoroContext'
import { playAlarm } from '../utils/sound'

export const useTimer = () => {
  const {
    isRunning,
    setIsRunning,
    setTimeLeft,
    mode,
    setMode,
    pomodoroCount,
    setPomodoroCount,
    incrementCompletedPomodoros,
  } = usePomodoroContext()

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const alarmPlayedRef = useRef(false)
  const pomodoroHandledRef = useRef(false)

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    clearIntervalRef()

    if (isRunning) {
      alarmPlayedRef.current = false
      pomodoroHandledRef.current = false

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (!alarmPlayedRef.current) {
              playAlarm()
              alarmPlayedRef.current = true
            }

            if (!pomodoroHandledRef.current && mode === 'pomodoro') {
              incrementCompletedPomodoros()
              pomodoroHandledRef.current = true
            }

            clearIntervalRef()
            setIsRunning(false)
            autoSwitchMode()
            return 0
          }

          return prev - 1
        })
      }, 1000)
    }

    return () => {
      clearIntervalRef()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning])

  const autoSwitchMode = () => {
    if (mode === 'pomodoro') {
      const nextCount = pomodoroCount + 1
      setPomodoroCount(nextCount)

      if (nextCount % 4 === 0) {
        setMode('long_break')
      } else {
        setMode('short_break')
      }
    } else {
      setMode('pomodoro')
    }
  }
}
