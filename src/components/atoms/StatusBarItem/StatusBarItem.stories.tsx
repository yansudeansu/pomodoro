import type { Meta, StoryObj } from '@storybook/react';
import { StatusBarItem } from './StatusBarItem';

const meta: Meta<typeof StatusBarItem> = {
  title: 'Atoms/StatusBarItem',
  component: StatusBarItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`StatusBarItem` represents a single 5-minute segment of service health history.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBarItem>;

export const Up: Story = {
  args: { status: 'up' },
};

export const Down: Story = {
  args: { status: 'down' },
};
