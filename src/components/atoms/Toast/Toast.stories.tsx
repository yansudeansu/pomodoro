import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `Toast` component displays temporary messages to the user, often used for feedback like deletions or confirmations. Optionally supports an action button (e.g. "Undo") and a close button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: 'Task "Plan sprint" deleted',
    actionLabel: 'Undo',
    onAction: () => alert('Undo clicked'),
    onClose: () => alert('Toast closed'),
  },
};
