import type { Meta, StoryObj } from '@storybook/react';
import { StatusBar } from './StatusBar';

const meta: Meta<typeof StatusBar> = {
  title: 'Molecules/StatusBar',
  component: StatusBar,
  parameters: {
    docs: {
      description: {
        component:
          '`StatusBar` displays the past 12 5-minute service checks as vertical colored bars.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBar>;

const now = Date.now();
const fiveMin = 5 * 60 * 1000;

const generateHistory = (statuses: ('up' | 'down')[]) =>
  statuses
    .map((status, i) => ({
      status,
      timestamp: new Date(now - i * fiveMin).toISOString(),
    }))
    .reverse();

export const Mixed: Story = {
  args: {
    history: generateHistory([
      'up',
      'down',
      'up',
      'up',
      'down',
      'up',
      'up',
      'down',
      'up',
      'up',
      'up',
      'up',
    ]),
  },
};
