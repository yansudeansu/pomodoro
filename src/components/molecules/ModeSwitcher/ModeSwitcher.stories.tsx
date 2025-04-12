import type { Meta, StoryObj } from '@storybook/react'
import { ModeSwitcher } from './ModeSwitcher'
import { PomodoroProvider } from '../../../context/PomodoroContext'

const meta: Meta<typeof ModeSwitcher> = {
  title: 'Molecules/ModeSwitcher',
  component: ModeSwitcher,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PomodoroProvider>
        <Story />
      </PomodoroProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The `ModeSwitcher` allows users to toggle between Pomodoro, Short Break, and Long Break modes. Active mode is highlighted.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ModeSwitcher>

export const Default: Story = {}
