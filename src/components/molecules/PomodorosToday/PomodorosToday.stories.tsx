import type { Meta, StoryObj } from '@storybook/react';
import { PomodorosToday } from './PomodorosToday';
import { PomodoroProvider } from '../../../context/PomodoroContext';
import { GlobalPomodoro } from '../../../types';

type PomodorosTodayStoryProps = {
  count: number;
};

const meta: Meta<PomodorosTodayStoryProps> = {
  title: 'Molecules/PomodorosToday',
  component: PomodorosToday,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 0 },
      defaultValue: 3,
      description: 'Number of Pomodoros completed today',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`PomodorosToday` displays the number of Pomodoro sessions completed today. It only renders when at least one has been completed.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<PomodorosTodayStoryProps>;

// Create a wrapper story component that injects mocked context based on `count`
export const Default: Story = {
  render: (args) => {
    const now = new Date().toISOString();
    const mockPomodoros: GlobalPomodoro[] = Array.from({ length: args.count }, (_, i) => ({
      id: `${i + 1}`,
      completedAt: now,
    }));

    localStorage.setItem('global-pomodoros', JSON.stringify(mockPomodoros));
    localStorage.setItem('pomodoro-tasks', JSON.stringify([]));

    return (
      <PomodoroProvider>
        <PomodorosToday />
      </PomodoroProvider>
    );
  },
  args: {
    count: 2,
  },
};
