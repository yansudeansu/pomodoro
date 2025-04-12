import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TaskInput } from './TaskInput';

const meta: Meta<typeof TaskInput> = {
  title: 'Molecules/TaskInput',
  component: TaskInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`TaskInput` is a styled wrapper around the base `Input` atom, used for adding new tasks. It adapts styling based on the current mode (Pomodoro, Short Break, Long Break).',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when input is empty',
    },
    mode: {
      control: 'radio',
      options: ['pomodoro', 'short_break', 'long_break'],
      description: 'Current mode for styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskInput>;

export const Default: Story = {
  args: {
    placeholder: 'Add a new task...',
    mode: 'pomodoro',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    return (
      <TaskInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => console.log('Key down:', e.key)}
      />
    );
  },
};
