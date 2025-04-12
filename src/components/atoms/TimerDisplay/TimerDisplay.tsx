import React from 'react'
import { Text } from '../Text/Text'

interface TimerDisplayProps {
  time: number
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  return <Text variant="timer">{formatTime(time)}</Text>
}
