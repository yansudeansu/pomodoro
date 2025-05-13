import type { Meta, StoryObj } from '@storybook/react';
import WeeklyChart from './WeeklyChart';

const mockData = [
  { name: 'Mon', Pomodoros: 2 },
  { name: 'Tue', Pomodoros: 5 },
  { name: 'Wed', Pomodoros: 8 },
  { name: 'Thu', Pomodoros: 1 },
  { name: 'Fri', Pomodoros: 6 },
  { name: 'Sat', Pomodoros: 0 },
  { name: 'Sun', Pomodoros: 4 },
];

const meta: Meta<typeof WeeklyChart> = {
  title: 'Molecules/WeeklyChart',
  component: WeeklyChart,
  parameters: {
    docs: {
      description: {
        component:
          '`WeeklyChart` displays a bar chart summarizing Pomodoro completions for each day of the current week. The color indicates how productive each day was.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeeklyChart>;

export const Default: Story = {
  args: {
    data: mockData,
  },
};
