import type { Meta, StoryObj } from '@storybook/react';
import StatusHistory from './StatusHistory';

const meta: Meta<typeof StatusHistory> = {
  title: 'Organisms/StatusHistory',
  component: StatusHistory,
  parameters: {
    docs: {
      description: {
        component:
          '`StatusHistory` shows service uptime percentage over the last hour, a visual history bar, and last checked time.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusHistory>;

const mockHistory: { timestamp: string; status: 'up' | 'down' }[] = [
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'down' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'down' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
  { timestamp: new Date().toISOString(), status: 'up' },
];

export const Default: Story = {
  args: {
    history: mockHistory,
  },
};
