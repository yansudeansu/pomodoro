import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TaskManager } from './TaskManager'
import { PomodoroProvider, usePomodoroContext } from '../../../context/PomodoroContext'

const WithMockedContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PomodoroProvider>
      <MockedValues>{children}</MockedValues>
    </PomodoroProvider>
  )
}

const MockedValues: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTasks } = usePomodoroContext()

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
  }, [setTasks])

  return <>{children}</>
}

const meta: Meta<typeof TaskManager> = {
  title: 'Organisms/TaskManager',
  component: TaskManager,
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
          '`TaskManager` is an organism responsible for managing tasks, allowing the user to add new tasks and display them in a list. It integrates with the Pomodoro timer to manage Pomodoros per task.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TaskManager>

export const Default: Story = {
  args: {},
}
