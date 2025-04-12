import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `Checkbox` component allows users to mark a task as complete. It visually adapts to the current mode (Pomodoro, Short Break, Long Break).',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    mode: {
      control: 'radio',
      options: ['pomodoro', 'short_break', 'long_break'],
      description: 'The current timer mode, used for styling',
    },
    onChange: { action: 'toggled' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(args.checked ?? false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => {
          setChecked(!checked)
          args.onChange?.()
        }}
      />
    )
  },
  args: {
    checked: false,
    mode: 'pomodoro',
  },
}

export const PomodoroChecked: Story = {
  args: {
    checked: true,
    mode: 'pomodoro',
  },
}

export const PomodoroUnchecked: Story = {
  args: {
    checked: false,
    mode: 'pomodoro',
  },
}

export const ShortBreakChecked: Story = {
  args: {
    checked: true,
    mode: 'short_break',
  },
}

export const LongBreakChecked: Story = {
  args: {
    checked: true,
    mode: 'long_break',
  },
}
