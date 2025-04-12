import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PomodoroPage } from './PomodoroPage'
import { PomodoroProvider, usePomodoroContext } from '../../../context/PomodoroContext'

const WithMockedContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PomodoroProvider>
      <MockedValues>{children}</MockedValues>
    </PomodoroProvider>
  )
}

const MockedValues: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTasks, setMode } = usePomodoroContext()

  useEffect(() => {
    const defaultTasks = [
      {
        id: '1',
        title: 'Design UI for Timer',
        completed: false,
        pomodoros: 2,
        completedPomodoros: 1,
      },
      {
        id: '2',
        title: 'Review task manager UI',
        completed: false,
        pomodoros: 1,
        completedPomodoros: 0,
      },
    ]

    setTasks(defaultTasks)
    setMode('pomodoro')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

const meta: Meta<typeof PomodoroPage> = {
  title: 'Pages/PomodoroPage',
  component: PomodoroPage,
  decorators: [
    (Story) => (
      <WithMockedContext>
        <Story />
      </WithMockedContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`PomodoroPage` is the main page that brings together the Pomodoro timer and task management. It displays the timer and allows users to manage tasks and Pomodoros.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PomodoroPage>

export const Default: Story = {
  args: {},
}
