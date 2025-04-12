import React from 'react'
import { Input } from '../../atoms/Input/Input'
import styles from './TaskInput.module.css'

interface TaskInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  id?: string
  mode: 'pomodoro' | 'short_break' | 'long_break'
}

export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  id,
  mode,
}) => {
  return (
    <Input
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={styles[mode]}
    />
  )
}
