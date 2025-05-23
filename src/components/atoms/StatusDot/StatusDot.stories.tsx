import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'Atoms/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`StatusDot` is a small visual indicator of service status: up, down, or unknown.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Up: Story = {
  args: { status: 'up' },
};

export const Down: Story = {
  args: { status: 'down' },
};

export const Unknown: Story = {
  args: { status: 'unknown' },
};
